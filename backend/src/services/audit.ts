import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuditLogParams {
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}

export const auditLogger = {
  log: async (params: AuditLogParams) => {
    try {
      const metadata = params.details || {};
      if (params.userAgent) {
        metadata['userAgent'] = params.userAgent;
      }

      await prisma.auditLog.create({
        data: {
          userId: params.userId,
          action: params.action.toUpperCase(),
          resource: params.resource,
          resourceId: params.resourceId,
          metadata: Object.keys(metadata).length > 0 ? JSON.stringify(metadata) : undefined,
          ipAddress: params.ipAddress,
        },
      });
    } catch (error) {
      // Fallback logging if DB fails - vital for audit trails
      console.error('CRITICAL: Failed to write audit log', error, params);
    }
  },
};