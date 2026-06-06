import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

const loggerPlugin: FastifyPluginAsync = async (fastify) => {
  
  // 1. Redact sensitive headers in logs
  fastify.addHook('onRequest', async (request) => {
    // Fastify's default logger handles some of this, but we explicitly 
    // ensure the request context is clean.
    if (request.headers.authorization) {
      request.headers.authorization = '[REDACTED]';
    }
    if (request.headers.cookie) {
      // Simplistic redaction; in high security, parse and redact specific cookies
      request.headers.cookie = '[REDACTED]';
    }
  });

  // 2. Audit specific security events (401/403)
  fastify.addHook('onSend', async (request, reply, payload) => {
    if (reply.statusCode === 401 || reply.statusCode === 403) {
      request.log.warn({
        eventId: 'SECURITY_EVENT',
        statusCode: reply.statusCode,
        ip: request.ip,
        path: request.url,
        method: request.method,
        userId: request.user?.id || 'anonymous'
      }, 'Access Denied / Authentication Failure');
    }
  });

  // 3. Ensure Request ID is present in response headers for tracing
  fastify.addHook('onResponse', async (request, reply) => {
    reply.header('X-Request-ID', request.id);
  });
};

export default fp(loggerPlugin);