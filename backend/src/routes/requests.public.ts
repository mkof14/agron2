import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { randomBytes } from 'crypto';

const publicRequestRoutes: FastifyPluginAsync = async (fastify) => {
  
  fastify.post('/', {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: '1 hour'
      }
    },
    schema: {
      body: z.object({
        fullName: z.string().min(2),
        email: z.string().email(),
        organization: z.string().optional(),
        inquiryType: z.string(),
        sector: z.string(),
        message: z.string().min(10)
      })
    }
  }, async (request, reply) => {
    const data = request.body as {
        fullName: string;
        email: string;
        organization?: string;
        inquiryType: string;
        sector: string;
        message: string;
    };

    // Generate a human-readable reference ID
    const refId = `INC-${new Date().getFullYear()}-${randomBytes(2).toString('hex').toUpperCase()}`;

    const newRequest = await fastify.prisma.request.create({
      data: {
        ...data,
        referenceId: refId,
        status: 'NEW'
      }
    });

    // Create initial audit event
    await fastify.prisma.requestEvent.create({
      data: {
        requestId: newRequest.id,
        type: 'SUBMISSION',
        content: 'Request received via public portal.'
      }
    });

    return reply.status(201).send({ 
      success: true, 
      referenceId: refId,
      message: 'Request received securely.' 
    });
  });
};

export default publicRequestRoutes;