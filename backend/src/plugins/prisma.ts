
import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { config } from '../config';

const prismaPlugin: FastifyPluginAsync = async (fastify) => {
  const isDetached = !config.db.url || config.db.url === '';

  if (isDetached) {
    fastify.log.warn('AGRON_CORE: DATABASE_URL not found. Booting in Mock Mode.');
    
    const mockPrisma: any = {
      $queryRaw: async () => [{ 1: 1 }],
      $connect: async () => {},
      $disconnect: async () => {},
      $transaction: async (fn: any) => (typeof fn === 'function' ? fn(mockPrisma) : fn),
      user: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async (args: any) => ({ ...args.data, id: 'mock-user-id' }),
        upsert: async () => ({ id: 'mock-user-id', email: 'offline@agron.dev', role: 'TRAINEE' }),
        update: async (args: any) => args.data
      },
      request: {
        findMany: async () => [],
        findUnique: async () => null,
        create: async (args: any) => ({ ...args.data, id: 'mock-req-id', createdAt: new Date() }),
        count: async () => 0
      },
      requestEvent: {
        create: async (args: any) => args.data
      },
      auditLog: {
        create: async (args: any) => args.data
      },
      course: { findMany: async () => [] },
      level: { findMany: async () => [] },
      department: { findMany: async () => [] },
      domain: { findMany: async () => [] }
    };

    fastify.decorate('prisma', mockPrisma);
    return;
  }

  try {
    const prisma = new PrismaClient({
      datasources: { db: { url: config.db.url } },
    });
    await prisma.$connect();
    fastify.decorate('prisma', prisma);
  } catch (err) {
    fastify.log.error('AGRON_CORE: Prisma failover to Mock Mode due to error.');
    fastify.decorate('prisma', { $queryRaw: async () => { throw new Error('DB_OFFLINE'); } } as any);
  }
};

export default fp(prismaPlugin);
