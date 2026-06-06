import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { config } from '../config';

const authPlugin: FastifyPluginAsync = async (fastify) => {
  // Register JWT
  await fastify.register(fastifyJwt, {
    secret: config.security.jwtSecret,
  });

  // Decorator to protect routes
  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // Cast to any as jwtVerify is injected by @fastify/jwt
      await (request as any).jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
};

export default fp(authPlugin);