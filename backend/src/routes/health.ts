
import { FastifyPluginAsync } from 'fastify';

const healthRoutes: FastifyPluginAsync = async (fastify) => {
  
  fastify.get('/healthz', async () => {
    return { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      node_env: process.env.NODE_ENV || 'production'
    };
  });

  fastify.get('/readyz', async (request, reply) => {
    try {
      // Direct database heartbeat
      await (fastify as any).prisma.$queryRaw`SELECT 1`;
      return { 
        status: 'ready', 
        db: 'connected',
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      // If DB is detached, we still respond but with status 200 (server is up)
      // to avoid Vercel thinking the whole function is dead.
      return { 
        status: 'partial_ready', 
        db: 'detached',
        reason: err instanceof Error ? err.message : 'Unknown',
        timestamp: new Date().toISOString()
      };
    }
  });
};

export default healthRoutes;
