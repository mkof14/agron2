import fp from 'fastify-plugin';
import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import '@fastify/jwt'; 
import { auditLogger } from '../services/audit';

const rbacPlugin: FastifyPluginAsync = async (fastify) => {
  
  // Helper to fetch full RBAC context for the user
  const getUserRbacContext = async (userId: string) => {
    // Access prisma via casting since we removed global augmentation
    const user = await (fastify as any).prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!user) return null;

    const roles = user.userRoles.map((ur: any) => ur.role.name);
    const permissions = new Set<string>();
    
    user.userRoles.forEach((ur: any) => {
      ur.role.rolePermissions.forEach((rp: any) => {
        permissions.add(rp.permission.slug);
      });
    });

    return { roles, permissions: Array.from(permissions) };
  };

  // --- DECORATORS ---

  fastify.decorate('requireRole', (allowedRoles: string[]) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      // 1. Ensure Authenticated
      try {
        await (request as any).jwtVerify();
      } catch (err) {
        return reply.unauthorized();
      }

      const userId = (request as any).user.id;
      const context = await getUserRbacContext(userId);

      if (!context) return reply.unauthorized('User context not found');

      // 2. Check Role
      const hasRole = context.roles.some((r: string) => allowedRoles.includes(r));
      
      if (!hasRole) {
        // Audit the failed access attempt
        await auditLogger.log({
          userId,
          action: 'ACCESS_DENIED_ROLE',
          resource: 'route',
          details: { path: request.url, requiredRoles: allowedRoles, userRoles: context.roles },
          ipAddress: request.ip
        });
        return reply.forbidden('Insufficient Role Privileges');
      }

      // Attach context for downstream use
      (request as any).user.roles = context.roles;
      (request as any).user.permissions = context.permissions;
    };
  });

  fastify.decorate('requirePermission', (requiredSlug: string) => {
    return async (request: FastifyRequest, reply: FastifyReply) => {
      // 1. Ensure Authenticated
      try {
        await (request as any).jwtVerify();
      } catch (err) {
        return reply.unauthorized();
      }

      const userId = (request as any).user.id;
      const context = await getUserRbacContext(userId);

      if (!context) return reply.unauthorized('User context not found');

      // 2. Check Permission
      // Allow SuperAdmin to bypass everything
      if (context.roles.includes('SuperAdmin')) {
        return;
      }

      if (!context.permissions.includes(requiredSlug)) {
        await auditLogger.log({
          userId,
          action: 'ACCESS_DENIED_PERMISSION',
          resource: 'route',
          details: { path: request.url, requiredPermission: requiredSlug },
          ipAddress: request.ip
        });
        return reply.forbidden(`Missing Permission: ${requiredSlug}`);
      }
      
      (request as any).user.roles = context.roles;
      (request as any).user.permissions = context.permissions;
    };
  });
};

export default fp(rbacPlugin);