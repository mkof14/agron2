
import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import sensible from '@fastify/sensible';
import cookie from '@fastify/cookie';
import crypto from 'crypto';
import { config } from './config';
import prismaPlugin from './plugins/prisma';
import authPlugin from './plugins/auth';
import rbacPlugin from './plugins/rbac';
import loggerPlugin from './plugins/logger';
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';
import publicRequestRoutes from './routes/requests.public';
import adminRequestRoutes from './routes/requests.admin';
import catalogRoutes from './routes/catalog';
import trainingAdminRoutes from './routes/training.admin';
import infraRoutes from './routes/infrastructure';

export const buildApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({
    trustProxy: true,
    logger: true,
    genReqId: (req) => (req.headers['x-request-id'] as string) || crypto.randomUUID(),
  });

  // Security Headers
  await app.register(helmet, {
    contentSecurityPolicy: false
  });

  // Infrastructure Plugins
  await app.register(loggerPlugin);
  await app.register(prismaPlugin);

  // CORS
  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  // Rate Limiting
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // Cookies
  await app.register(cookie, {
    secret: config.security.jwtSecret,
  });

  // Utilities
  await app.register(sensible);

  // Auth & RBAC
  await app.register(authPlugin);
  await app.register(rbacPlugin);

  // Routes
  await app.register(healthRoutes);
  await app.register(authRoutes, { prefix: '/auth' });
  await app.register(publicRequestRoutes, { prefix: '/requests' });
  await app.register(adminRequestRoutes, { prefix: '/admin/requests' });
  await app.register(catalogRoutes, { prefix: '/catalog' });
  await app.register(trainingAdminRoutes, { prefix: '/admin/training' });
  await app.register(infraRoutes, { prefix: '/infra' });

  return app;
};
