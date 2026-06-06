import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const adminRequestRoutes: FastifyPluginAsync = async (fastify) => {

  // --- GET ALL REQUESTS ---
  // Permission: request:read
  fastify.get('/', {
    onRequest: [fastify.authenticate, fastify.requirePermission('request:read')],
    schema: {
      querystring: z.object({
        page: z.string().optional().default('1'),
        limit: z.string().optional().default('20'),
        status: z.enum(['NEW', 'UNDER_REVIEW', 'APPROVED', 'SCHEDULED', 'COMPLETED', 'CLOSED']).optional(),
      })
    }
  }, async (request, reply) => {
    const { page, limit, status } = request.query as { page: string; limit: string; status?: string };
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;

    const where = status ? { status: status as any } : {};

    const [requests, total] = await Promise.all([
      fastify.prisma.request.findMany({
        where,
        skip,
        take: limitInt,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          referenceId: true,
          fullName: true,
          organization: true,
          inquiryType: true,
          status: true,
          createdAt: true,
          email: true
        }
      }),
      fastify.prisma.request.count({ where })
    ]);

    return {
      data: requests,
      pagination: {
        total,
        page: pageInt,
        limit: limitInt,
        pages: Math.ceil(total / limitInt)
      }
    };
  });

  // --- GET SINGLE REQUEST ---
  // Permission: request:read
  fastify.get('/:id', {
    onRequest: [fastify.authenticate, fastify.requirePermission('request:read')],
    schema: {
      params: z.object({ id: z.string() })
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const reqData = await fastify.prisma.request.findUnique({
      where: { id },
      include: {
        events: {
          orderBy: { createdAt: 'desc' },
          include: {
            actor: {
              select: { fullName: true, email: true }
            }
          }
        }
      }
    });

    if (!reqData) return reply.notFound('Request record not found');

    return reqData;
  });

  // --- UPDATE STATUS ---
  // Permission: request:write (Admin / TrainingManager)
  fastify.put('/:id/status', {
    onRequest: [fastify.authenticate, fastify.requirePermission('request:write')],
    schema: {
      params: z.object({ id: z.string() }),
      body: z.object({
        status: z.enum(['NEW', 'UNDER_REVIEW', 'APPROVED', 'SCHEDULED', 'COMPLETED', 'CLOSED']),
        note: z.string().optional()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { status, note } = request.body as { status: string; note?: string };
    const actorId = request.user.id;

    // 1. Get current status for audit
    const current = await fastify.prisma.request.findUnique({ where: { id } });
    if (!current) return reply.notFound();

    // 2. Update Request
    const updated = await fastify.prisma.request.update({
      where: { id },
      data: { status: status as any }
    });

    // 3. Create Event (Audit)
    await fastify.prisma.requestEvent.create({
      data: {
        requestId: id,
        actorUserId: actorId,
        type: 'STATUS_CHANGE',
        content: JSON.stringify({
          from: current.status,
          to: status,
          note: note || null
        })
      }
    });

    return updated;
  });

  // --- ADD NOTE ---
  // Permission: request:write
  fastify.post('/:id/notes', {
    onRequest: [fastify.authenticate, fastify.requirePermission('request:write')],
    schema: {
      params: z.object({ id: z.string() }),
      body: z.object({
        content: z.string().min(1)
      })
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { content } = request.body as { content: string };
    const actorId = request.user.id;

    // Ensure request exists
    const exists = await fastify.prisma.request.findUnique({ where: { id } });
    if (!exists) return reply.notFound();

    const event = await fastify.prisma.requestEvent.create({
      data: {
        requestId: id,
        actorUserId: actorId,
        type: 'NOTE',
        content: content
      }
    });

    return event;
  });

};

export default adminRequestRoutes;