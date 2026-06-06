import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { generateToken, hashToken } from '../utils/crypto';
import { emailService } from '../services/email';
import { config } from '../config';
import { auditLogger } from '../services/audit';

// Native Date helpers
const addMins = (date: Date, minutes: number) => new Date(date.getTime() + minutes * 60000);
const addDaysDate = (date: Date, days: number) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

const authRoutes: FastifyPluginAsync = async (fastify) => {
  
  // 1. REQUEST MAGIC LINK
  fastify.post('/request-link', {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: '15 minutes'
      }
    },
    schema: {
      body: z.object({
        email: z.string().email(),
      })
    }
  }, async (request, reply) => {
    const { email } = request.body as { email: string };
    const normalizedEmail = email.toLowerCase().trim();

    // Upsert user (Find existing or create placeholder)
    let user = await fastify.prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      user = await fastify.prisma.user.create({
        data: { email: normalizedEmail, role: 'TRAINEE' }
      });
      
      // Audit: New User Created via Auth Flow
      await auditLogger.log({
        userId: user.id,
        action: 'USER_AUTO_PROVISION',
        resource: 'user',
        resourceId: user.id,
        ipAddress: request.ip
      });
    }

    // Generate Token
    const tokenRaw = generateToken(32);
    const tokenHash = hashToken(tokenRaw);

    // Save to DB
    await fastify.prisma.magicLinkToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: addMins(new Date(), 15),
      }
    });

    // Audit: Link Request
    await auditLogger.log({
      userId: user.id,
      action: 'AUTH_LINK_REQUEST',
      resource: 'auth',
      ipAddress: request.ip
    });

    const verifyUrl = `${config.security.frontendUrl}/verify?token=${tokenRaw}&email=${encodeURIComponent(normalizedEmail)}`;

    emailService.sendMagicLink(normalizedEmail, verifyUrl).catch(err => {
      request.log.error(err, 'Failed to send magic link email');
    });

    return reply.send({ message: 'If the email exists, a secure link has been sent.' });
  });

  // 2. VERIFY LINK
  fastify.post('/verify-link', {
    config: {
      rateLimit: {
        max: 10,
        timeWindow: '15 minutes'
      }
    },
    schema: {
      body: z.object({
        token: z.string(),
        email: z.string().email(),
      })
    }
  }, async (request, reply) => {
    const { token, email } = request.body as { token: string, email: string };
    const normalizedEmail = email.toLowerCase().trim();

    const user = await fastify.prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      hashToken(token); // Timing mitigation
      return reply.unauthorized('Invalid or expired token.');
    }

    const tokenHash = hashToken(token);

    const validToken = await fastify.prisma.magicLinkToken.findFirst({
      where: {
        userId: user.id,
        tokenHash,
        usedAt: null,
        expiresAt: { gt: new Date() }
      }
    });

    if (!validToken) {
      // Audit: Failed Login Attempt
      await auditLogger.log({
        userId: user.id,
        action: 'AUTH_LOGIN_FAIL',
        resource: 'auth',
        details: { reason: 'Invalid Token' },
        ipAddress: request.ip
      });
      return reply.unauthorized('Invalid or expired token.');
    }

    await fastify.prisma.$transaction(async (tx) => {
      await tx.magicLinkToken.update({
        where: { id: validToken.id },
        data: { usedAt: new Date() }
      });
      await tx.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      });
    });

    // Audit: Successful Login
    await auditLogger.log({
      userId: user.id,
      action: 'AUTH_LOGIN_SUCCESS',
      resource: 'auth',
      ipAddress: request.ip,
      userAgent: request.headers['user-agent']
    });

    // Create Session
    const refreshTokenRaw = generateToken(64);
    const refreshTokenHash = hashToken(refreshTokenRaw);
    
    await fastify.prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: refreshTokenHash,
        expiresAt: addDaysDate(new Date(), config.security.refreshTokenTtlDays),
        ipAddress: request.ip,
        userAgent: request.headers['user-agent']
      }
    });

    const accessToken = fastify.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role
    }, { expiresIn: config.security.accessTokenTtl });

    reply.setCookie('refresh_token', refreshTokenRaw, {
      path: '/api/auth',
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
    });

    return reply.send({ accessToken, user: { id: user.id, email: user.email, role: user.role } });
  });

  // 3. REFRESH SESSION
  fastify.post('/refresh', async (request, reply) => {
    const refreshTokenRaw = request.cookies.refresh_token;

    if (!refreshTokenRaw) {
      return reply.unauthorized('Missing refresh token');
    }

    const tokenHash = hashToken(refreshTokenRaw);

    const session = await fastify.prisma.session.findUnique({
      where: { sessionToken: tokenHash },
      include: { user: true }
    });

    if (!session || session.expiresAt < new Date()) {
      reply.clearCookie('refresh_token', { path: '/api/auth' });
      return reply.unauthorized('Invalid or expired session');
    }

    // Session Rotation
    const newRefreshTokenRaw = generateToken(64);
    const newRefreshTokenHash = hashToken(newRefreshTokenRaw);

    await fastify.prisma.$transaction([
      fastify.prisma.session.delete({ where: { id: session.id } }),
      fastify.prisma.session.create({
        data: {
          userId: session.userId,
          sessionToken: newRefreshTokenHash,
          expiresAt: addDaysDate(new Date(), config.security.refreshTokenTtlDays),
          ipAddress: request.ip,
          userAgent: request.headers['user-agent']
        }
      })
    ]);

    const accessToken = fastify.jwt.sign({
      id: session.user.id,
      email: session.user.email,
      role: session.user.role
    }, { expiresIn: config.security.accessTokenTtl });

    reply.setCookie('refresh_token', newRefreshTokenRaw, {
      path: '/api/auth',
      httpOnly: true,
      secure: config.env === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
    });

    return reply.send({ accessToken });
  });

  // 4. LOGOUT
  fastify.post('/logout', async (request, reply) => {
    const refreshTokenRaw = request.cookies.refresh_token;
    
    if (refreshTokenRaw) {
      const tokenHash = hashToken(refreshTokenRaw);
      try {
        await fastify.prisma.session.delete({
          where: { sessionToken: tokenHash }
        });
      } catch (e) {
        // Already deleted
      }
    }

    reply.clearCookie('refresh_token', { path: '/api/auth' });
    return reply.send({ message: 'Logged out successfully' });
  });

  // 5. CURRENT USER
  fastify.get('/me', {
    onRequest: [fastify.authenticate]
  }, async (request, reply) => {
    const user = await fastify.prisma.user.findUnique({
      where: { id: request.user.id },
      select: { id: true, email: true, fullName: true, role: true, callsign: true }
    });
    return reply.send({ user });
  });
};

export default authRoutes;