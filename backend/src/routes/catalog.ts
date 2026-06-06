
import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const catalogRoutes: FastifyPluginAsync = async (fastify) => {

  // --- GET CATALOG ---
  // Public access
  fastify.get('/courses', {
    schema: {
      querystring: z.object({
        department: z.string().optional(),
        level: z.string().optional(),
        domain: z.string().optional(),
        search: z.string().optional(),
      })
    }
  }, async (request, reply) => {
    const { department, level, domain, search } = request.query as {
      department?: string;
      level?: string;
      domain?: string;
      search?: string;
    };

    const where: any = { status: 'ACTIVE' };

    if (department) where.department = { slug: department };
    if (level) where.level = { slug: level };
    if (domain) where.domain = { slug: domain };
    
    if (search) {
      // Enhanced Search: Title, Code, Description, and Summary
      where.OR = [
        { title: { contains: search } },
        { code: { contains: search } },
        { description: { contains: search } },
        { summary: { contains: search } }
      ];
    }

    const courses = await fastify.prisma.course.findMany({
      where,
      include: {
        department: { select: { name: true, slug: true } },
        level: { select: { name: true, slug: true, order: true } },
        domain: { select: { name: true, slug: true } },
      },
      orderBy: { level: { order: 'asc' } }
    });

    return courses;
  });

  // --- GET COURSE DETAILS ---
  fastify.get('/courses/:id', {
    schema: {
      params: z.object({ id: z.string() })
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string };

    const course = await fastify.prisma.course.findUnique({
      where: { id },
      include: {
        department: true,
        level: true,
        domain: true,
        sessions: {
          where: { 
            status: { in: ['SCHEDULED', 'ACTIVE'] },
            startAt: { gt: new Date() } 
          },
          orderBy: { startAt: 'asc' },
          take: 5,
          select: {
            id: true,
            startAt: true,
            endAt: true,
            location: true,
            status: true,
            capacity: true,
            _count: {
              select: { enrollments: true }
            }
          }
        }
      }
    });

    if (!course) return reply.notFound('Course not found');
    return course;
  });

  // --- GET LOOKUP DATA ---
  fastify.get('/metadata', async (request, reply) => {
    const [departments, levels, domains] = await Promise.all([
      fastify.prisma.department.findMany({ orderBy: { name: 'asc' } }),
      fastify.prisma.level.findMany({ orderBy: { order: 'asc' } }),
      fastify.prisma.domain.findMany({ orderBy: { name: 'asc' } }),
    ]);

    return { departments, levels, domains };
  });

};

export default catalogRoutes;
