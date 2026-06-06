import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const trainingAdminRoutes: FastifyPluginAsync = async (fastify) => {

  // --- COURSES ---

  // Create Course
  fastify.post('/courses', {
    onRequest: [fastify.authenticate, fastify.requirePermission('course:write')],
    schema: {
      body: z.object({
        title: z.string().min(3),
        code: z.string().min(3),
        summary: z.string(),
        description: z.string().optional(),
        departmentId: z.string(),
        levelId: z.string(),
        domainId: z.string(),
        format: z.string(),
        durationRange: z.string(),
        status: z.enum(['ACTIVE', 'DRAFT', 'RETIRED']).default('DRAFT')
      })
    }
  }, async (request, reply) => {
    const data = request.body as any;

    try {
      const course = await fastify.prisma.course.create({
        data
      });
      return reply.status(201).send(course);
    } catch (e: any) {
      if (e.code === 'P2002') return reply.conflict('Course code already exists');
      throw e;
    }
  });

  // Update Course
  fastify.put('/courses/:id', {
    onRequest: [fastify.authenticate, fastify.requirePermission('course:write')],
    schema: {
      params: z.object({ id: z.string() }),
      body: z.object({
        title: z.string().optional(),
        code: z.string().optional(),
        summary: z.string().optional(),
        description: z.string().optional(),
        departmentId: z.string().optional(),
        levelId: z.string().optional(),
        domainId: z.string().optional(),
        format: z.string().optional(),
        durationRange: z.string().optional(),
        status: z.enum(['ACTIVE', 'DRAFT', 'RETIRED']).optional()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const data = request.body as any;

    const course = await fastify.prisma.course.update({
      where: { id },
      data
    });
    return course;
  });

  // --- SESSIONS ---

  // List Sessions (Admin view, includes historic)
  fastify.get('/sessions', {
    onRequest: [fastify.authenticate, fastify.requirePermission('session:read')],
    schema: {
      querystring: z.object({
        courseId: z.string().optional(),
        status: z.string().optional()
      })
    }
  }, async (request, reply) => {
    const { courseId, status } = request.query as any;
    const where: any = {};
    if (courseId) where.courseId = courseId;
    if (status) where.status = status;

    return fastify.prisma.courseSession.findMany({
      where,
      include: {
        course: { select: { title: true, code: true } },
        instructor: { select: { fullName: true, email: true } },
        _count: { select: { enrollments: true } }
      },
      orderBy: { startAt: 'desc' }
    });
  });

  // Schedule Session
  fastify.post('/sessions', {
    onRequest: [fastify.authenticate, fastify.requirePermission('session:write')],
    schema: {
      body: z.object({
        courseId: z.string(),
        instructorUserId: z.string().optional(),
        startAt: z.string().datetime(),
        endAt: z.string().datetime(),
        location: z.string(),
        classroom: z.string().optional(),
        capacity: z.number().int().positive(),
        status: z.enum(['SCHEDULED', 'ACTIVE', 'CANCELLED']).default('SCHEDULED')
      })
    }
  }, async (request, reply) => {
    const data = request.body as any;

    const session = await fastify.prisma.courseSession.create({
      data
    });
    return reply.status(201).send(session);
  });

  // --- ENROLLMENTS ---

  // Manage Enrollment (Approve/Deny)
  fastify.put('/enrollments/:id/status', {
    onRequest: [fastify.authenticate, fastify.requirePermission('enrollment:manage')],
    schema: {
      params: z.object({ id: z.string() }),
      body: z.object({
        status: z.enum(['APPROVED', 'REJECTED', 'DROPPED', 'COMPLETED']),
        notes: z.string().optional()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const { status, notes } = request.body as any;

    const enrollment = await fastify.prisma.enrollment.update({
      where: { id },
      data: { status, notes }
    });
    
    // Log audit
    await fastify.prisma.auditLog.create({
      data: {
        userId: request.user.id,
        action: `ENROLLMENT_${status}`,
        resource: 'enrollment',
        resourceId: id,
        metadata: JSON.stringify({ notes })
      }
    });

    return enrollment;
  });

};

export default trainingAdminRoutes;