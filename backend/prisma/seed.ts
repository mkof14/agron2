import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ROLES = [
  { name: 'SuperAdmin', description: 'Full system access. Root authority.' },
  { name: 'Admin', description: 'Platform administrator. Can manage users and content.' },
  { name: 'TrainingManager', description: 'Oversees curriculum and training assignments.' },
  { name: 'Instructor', description: 'Delivers training and conducts assessments.' },
  { name: 'Evaluator', description: 'Conducts final certification exams. Cannot train the same student.' },
  { name: 'SupportAgent', description: 'Customer support and ticket resolution.' },
  { name: 'SalesBD', description: 'Business development and cohort onboarding.' },
  { name: 'GovLiaison', description: 'Manage government/defense sector relationships.' },
  { name: 'Finance', description: 'Billing, invoicing, and contract management.' },
  { name: 'SecurityAuditor', description: 'Read-only access to logs and compliance records.' },
  { name: 'Learner', description: 'Standard student/operator access.' },
];

const PERMISSIONS = [
  // User Management
  { slug: 'user:read', resource: 'user', action: 'read' },
  { slug: 'user:write', resource: 'user', action: 'write' },
  { slug: 'user:delete', resource: 'user', action: 'delete' },
  
  // Training Content
  { slug: 'course:read', resource: 'course', action: 'read' },
  { slug: 'course:write', resource: 'course', action: 'write' }, // Create/Edit Courses
  
  // Session Management
  { slug: 'session:read', resource: 'session', action: 'read' },
  { slug: 'session:write', resource: 'session', action: 'write' }, // Schedule sessions
  
  // Enrollment
  { slug: 'enrollment:read', resource: 'enrollment', action: 'read' },
  { slug: 'enrollment:manage', resource: 'enrollment', action: 'manage' }, // Approve/Deny

  // Simulation
  { slug: 'sim:execute', resource: 'simulation', action: 'execute' },
  { slug: 'sim:review', resource: 'simulation', action: 'review' },
  
  // Requests / Intake
  { slug: 'request:read', resource: 'request', action: 'read' },
  { slug: 'request:write', resource: 'request', action: 'write' },

  // System
  { slug: 'audit:read', resource: 'audit', action: 'read' },
  { slug: 'system:config', resource: 'system', action: 'config' },
];

// LOOKUP DATA
const DEPARTMENTS = [
  { name: 'Systems Operations', slug: 'ops', description: 'Core flight and ground maneuvering.' },
  { name: 'Payload & Sensors', slug: 'payloads', description: 'Data acquisition and interpretation.' },
  { name: 'Maintenance & Logistics', slug: 'maint', description: 'Hardware readiness and fleet management.' },
];

const LEVELS = [
  { name: 'Foundations (ORL-1)', slug: 'orl-1', order: 1 },
  { name: 'Professional Operations (ORL-2)', slug: 'orl-2', order: 2 },
  { name: 'Advanced Mission (ORL-3)', slug: 'orl-3', order: 3 },
  { name: 'Integrated Systems (ORL-4)', slug: 'orl-4', order: 4 },
  { name: 'Instructor (ORL-5)', slug: 'orl-5', order: 5 },
];

const DOMAINS = [
  { name: 'Aerial', slug: 'aerial' },
  { name: 'Ground', slug: 'ground' },
  { name: 'Hybrid', slug: 'hybrid' },
];

async function main() {
  console.log('🌱 Starting RBAC & Training Seed...');

  // 1. Create Permissions
  console.log('... Seeding Permissions');
  for (const perm of PERMISSIONS) {
    await prisma.permission.upsert({
      where: { slug: perm.slug },
      update: {},
      create: perm,
    });
  }

  // 2. Create Roles
  console.log('... Seeding Roles');
  for (const role of ROLES) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: { description: role.description, isSystem: true },
      create: { name: role.name, description: role.description, isSystem: true },
    });
  }

  // 3. Seed Lookups
  console.log('... Seeding Lookups');
  for (const d of DEPARTMENTS) await prisma.department.upsert({ where: { slug: d.slug }, update: {}, create: d });
  for (const l of LEVELS) await prisma.level.upsert({ where: { slug: l.slug }, update: {}, create: l });
  for (const d of DOMAINS) await prisma.domain.upsert({ where: { slug: d.slug }, update: {}, create: d });

  // 4. Assign Default Permissions
  const rolePermMap: Record<string, string[]> = {
    SuperAdmin: PERMISSIONS.map(p => p.slug),
    Admin: [
      'user:read', 'user:write', 
      'course:read', 'course:write', 
      'session:read', 'session:write',
      'enrollment:read', 'enrollment:manage',
      'sim:review', 'audit:read', 'request:read', 'request:write'
    ],
    TrainingManager: [
      'user:read', 
      'course:read', 'course:write', 
      'session:read', 'session:write',
      'enrollment:read', 'enrollment:manage',
      'request:read'
    ],
    Instructor: [
      'user:read', 
      'course:read', 
      'session:read', 
      'enrollment:read',
      'sim:execute', 'sim:review'
    ],
    Learner: ['course:read', 'session:read', 'sim:execute'],
    SalesBD: ['request:read', 'course:read', 'session:read'],
  };

  console.log('... Mapping Permissions to Roles');
  for (const [roleName, permSlugs] of Object.entries(rolePermMap)) {
    const role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) continue;

    for (const slug of permSlugs) {
      const permission = await prisma.permission.findUnique({ where: { slug } });
      if (!permission) continue;

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });
    }
  }

  // 5. Seed SuperAdmin User
  const adminEmail = 'admin@agron.dev';
  console.log('... Seeding SuperAdmin:', adminEmail);
  
  const superAdminRole = await prisma.role.findUnique({ where: { name: 'SuperAdmin' } });
  
  if (superAdminRole) {
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        fullName: 'System Administrator',
        callsign: 'OVERWATCH',
        role: 'SuperAdmin', // Legacy field backup
      }
    });

    // Assign RBAC Role
    await prisma.userRole.upsert({
      where: {
        userId_roleId: {
          userId: adminUser.id,
          roleId: superAdminRole.id
        }
      },
      update: {},
      create: {
        userId: adminUser.id,
        roleId: superAdminRole.id
      }
    });
  }

  console.log('✅ RBAC & Training Seed Complete');
}

main()
  .catch((e) => {
    console.error(e);
    (process as any).exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });