import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BadgeCheck, BrainCircuit, BriefcaseBusiness, CheckCircle2, Factory, Layers3, MapPinned, Network, Route, ShieldCheck, SlidersHorizontal, Workflow } from 'lucide-react';
import BrandLogo from './BrandLogo';

interface Props {
  setActiveTab: (tab: string) => void;
}

const sections = [
  ['workforce-overview', 'Overview'],
  ['workforce-problem', 'Market Gap'],
  ['workforce-services', 'Services'],
  ['workforce-architecture', 'Architecture'],
  ['workforce-operating-model', 'Operating Model'],
  ['workforce-passport', 'Skill Passport'],
  ['workforce-command', 'Employer Center'],
  ['workforce-industries', 'Industries'],
  ['workforce-deployment', 'Deployment'],
  ['workforce-revenue', 'Revenue']
];

const serviceLines = [
  {
    title: 'Autonomous Workforce Infrastructure',
    text: 'A structured system for preparing, verifying, assigning, and managing workers for drone, robotics, AI, and autonomous operations.',
    icon: <Network size={22} />
  },
  {
    title: 'Digital Skill Passport',
    text: 'A verified record of skills, training, mission history, performance metrics, proficiency, and employer feedback.',
    icon: <BadgeCheck size={22} />
  },
  {
    title: 'Employer Command Center',
    text: 'A control interface for talent pool mapping, project staffing, candidate queues, and workforce management.',
    icon: <BriefcaseBusiness size={22} />
  },
  {
    title: 'Experience Bridge',
    text: 'A path from online learning and certification into simulation, remote labs, field exercises, and supervised real missions.',
    icon: <Route size={22} />
  },
  {
    title: 'AI Workforce Engine',
    text: 'Assessment, career recommendations, training recommendations, certification tracking, job matching, and workforce analytics.',
    icon: <BrainCircuit size={22} />
  },
  {
    title: 'Distributed Operations Layer',
    text: 'A 24/7 model connecting operators, specialists, coordinators, employers, mission platforms, and hardware fleets.',
    icon: <MapPinned size={22} />
  }
];

const architectureCore = [
  'Employers',
  'Training',
  'Certification',
  'Operations'
];

const architectureOuter = [
  'Government programs',
  'Mission platforms',
  'Drone fleets',
  'Broad industry',
  'AI systems',
  'Robotics hardware'
];

const architectureLayers = [
  {
    name: 'Demand Layer',
    description: 'Where operational need enters the system.',
    inputs: ['Employers', 'Government programs', 'Mission platforms', 'Industry partners'],
    accent: 'orange'
  },
  {
    name: 'Workforce Layer',
    description: 'Where people are prepared, verified, and organized.',
    inputs: ['Training', 'Certification', 'Skill passport', 'Performance history'],
    accent: 'blue'
  },
  {
    name: 'Execution Layer',
    description: 'Where work is assigned and controlled.',
    inputs: ['Operator allocation', 'Mission coordination', 'Remote operations', 'Quality control'],
    accent: 'cyan'
  },
  {
    name: 'Systems Layer',
    description: 'Where hardware, data, and software connect to the mission.',
    inputs: ['Drone fleets', 'Robotics hardware', 'AI systems', 'Data pipelines'],
    accent: 'slate'
  },
  {
    name: 'Feedback Layer',
    description: 'Where real operations improve readiness and staffing.',
    inputs: ['Mission reviews', 'Employer feedback', 'Performance metrics', 'Training recommendations'],
    accent: 'green'
  }
];

const operatingFlow = [
  ['Demand', 'A company or agency defines the operational need, site, timing, and required capability.'],
  ['Role Map', 'AGRON maps the mission to required roles, licenses, equipment, and proficiency levels.'],
  ['Verification', 'The system checks skill passports, training records, mission history, and availability.'],
  ['Assignment', 'Qualified operators, specialists, and coordinators are assigned to the work package.'],
  ['Execution', 'The mission follows a controlled process with reporting, supervision, and delivery standards.'],
  ['Feedback', 'Results update the worker record, employer view, training path, and future matching logic.']
];

const deploymentServices = [
  {
    title: 'Enterprise Workforce Setup',
    text: 'Define job families, skill requirements, site needs, reporting formats, and staffing process.'
  },
  {
    title: 'Certification Program Design',
    text: 'Create role-specific learning paths, practical gates, assessment rules, and renewal cycles.'
  },
  {
    title: 'Mission Staffing Operations',
    text: 'Match verified people to real work packages across drones, robotics, AI, and autonomous systems.'
  },
  {
    title: 'Command Center Integration',
    text: 'Connect workforce data, candidate queues, project staffing, and operational reporting.'
  },
  {
    title: 'Government Program Layer',
    text: 'Support workforce readiness programs where traceability, standards, and accountability matter.'
  },
  {
    title: 'Industry Partner Network',
    text: 'Connect hardware vendors, mission operators, training organizations, and employers into one execution model.'
  }
];

const roles = [
  {
    sector: 'Agriculture',
    roles: ['Drone operator', 'BVLOS pilot', 'AI operator', 'Agricultural technology operator', 'Autonomous systems coordinator']
  },
  {
    sector: 'Logistics',
    roles: ['Mission coordinator', 'Fleet manager', 'Automation specialist', 'AI agent manager', 'Workflow manager']
  },
  {
    sector: 'Defense / Security',
    roles: ['Drone operator', 'Mission coordinator', 'Remote operations specialist', 'AI operator', 'Autonomous systems coordinator']
  },
  {
    sector: 'Smart Cities',
    roles: ['Fleet manager', 'Robotics operator', 'Digital twin operator', 'Autonomous systems coordinator']
  },
  {
    sector: 'Energy / Utilities',
    roles: ['Infrastructure inspector', 'BVLOS pilot', 'Remote operations specialist', 'Mapping specialist']
  },
  {
    sector: 'Infrastructure / Construction',
    roles: ['Infrastructure inspector', 'Robotics technician', 'Automation specialist', 'Digital twin operator']
  },
  {
    sector: 'Public Safety / Emergency Response',
    roles: ['Public safety UAV operator', 'Emergency response specialist', 'Mission coordinator']
  },
  {
    sector: 'Mining',
    roles: ['Mapping specialist', 'Robotics technician', 'Remote operations specialist', 'AI operator']
  }
];

const revenue = [
  {
    label: 'B2C',
    items: ['Training programs', 'Certification programs']
  },
  {
    label: 'B2B',
    items: ['Employer subscriptions', 'Talent infrastructure', 'Recruitment services', 'Enterprise workforce solutions']
  },
  {
    label: 'B2G & Strategic',
    items: ['Government programs', 'Industry partnerships']
  }
];

const demandBlocks = [
  {
    title: 'Structural bottleneck',
    text: 'Labor availability, slow education cycles, and aging workforce patterns limit the supply of qualified specialists.'
  },
  {
    title: 'Technology acceleration',
    text: 'AI, robotics, drones, and autonomous systems create demand faster than traditional training systems can respond.'
  },
  {
    title: 'Missing infrastructure',
    text: 'Workers, employers, training programs, and mission operators are not connected through one verified process.'
  }
];

const passportDetails = [
  ['Verified skills', 'Drones, robotics, simulation, remote operations, AI workflows, safety procedures.'],
  ['Training records', 'Completed programs, certification level, renewal status, instructor validation.'],
  ['Performance metrics', 'Accuracy, reliability, mission history, incident record, employer feedback.'],
  ['Proficiency profile', 'Navigation, decision making, perception, learning, safety, collaboration.']
];

const commandDetails = [
  ['Talent pool map', 'Shows available verified candidates and where capacity exists.'],
  ['Project staffing', 'Moves work from requested to assigned, in progress, and completed.'],
  ['Candidate queue', 'Filters people by role, proficiency, rating, and verification status.'],
  ['Workforce management', 'Keeps staffing, assignments, and operational history in one control view.']
];

const categoryComparison = [
  ['Focus on autonomous / AI technology', 'Slow adaptation', 'Generic', 'Purpose-built'],
  ['Practical mission experience', 'Theoretical only', 'None', 'Remote labs and supervised missions'],
  ['Skill verification', 'Static degree', 'Self-reported', 'Verified digital passport'],
  ['Speed to hire', 'Years', 'Weeks, unverified', 'Immediate, verified']
];

const scrollToWorkforceSection = (id: string) => {
  window.history.pushState(null, '', `#${id}`);
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const AutonomousWorkforce: React.FC<Props> = ({ setActiveTab }) => {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash.startsWith('workforce-')) return;
    window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }, []);

  return (
    <div className="bg-white text-slate-950 dark:bg-[#07111f] dark:text-white">
      <section id="workforce-overview" className="relative min-h-screen overflow-hidden px-6 pb-24 pt-32">
        <div className="absolute inset-0">
          <img src="/workforce/workforce-hero.jpg" alt="AGRON autonomous workforce infrastructure" width={1600} height={893} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover opacity-55 brightness-110 dark:opacity-65 dark:brightness-115" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/82 to-slate-900/45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.26),transparent_34%),radial-gradient(circle_at_82%_70%,rgba(14,165,233,0.22),transparent_38%)]" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[240px_1fr]">
          <VerticalMenu />
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex min-h-[70vh] flex-col justify-end">
            <div className="mb-7 inline-flex w-fit items-center gap-3 rounded-full border border-orange-300/35 bg-orange-400/10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.32em] text-orange-200">
              <Factory size={15} />
              Autonomous Workforce Infrastructure
            </div>
            <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-7xl xl:text-8xl">
              Building the workforce infrastructure for the autonomous economy.
            </h1>
            <p className="mt-8 max-w-3xl border-l border-orange-300/50 pl-6 text-xl font-light leading-relaxed text-slate-300 md:text-2xl">
              A comprehensive system for education, certification, practical readiness, staffing, and autonomous operations.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={() => setActiveTab('presentations')} className="group inline-flex h-14 items-center gap-3 rounded-2xl bg-orange-500 px-7 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_20px_40px_-18px_rgba(249,115,22,0.75)] transition hover:-translate-y-0.5 hover:bg-orange-400">
                Open Materials <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </button>
              <a
                href="#workforce-architecture"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToWorkforceSection('workforce-architecture');
                }}
                className="inline-flex h-14 items-center rounded-2xl border border-white/20 bg-white/15 px-7 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur transition hover:border-sky-300 hover:bg-sky-300/15"
              >
                View Architecture
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[240px_1fr]">
          <VerticalMenu />
          <div className="space-y-24">
            <ProblemSection />
            <ServicesSection />
            <ArchitectureSection />
            <OperatingModelSection />
            <PassportSection />
            <CommandSection />
            <IndustriesSection />
            <DeploymentSection />
            <RevenueSection setActiveTab={setActiveTab} />
          </div>
        </div>
      </main>
    </div>
  );
};

const VerticalMenu: React.FC = () => (
  <aside className="hidden lg:block">
    <div className="sticky top-28 rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-4 backdrop-blur-xl">
      <div className="mb-4 px-3 text-[10px] font-black uppercase tracking-[0.38em] text-slate-400">Sections</div>
      <div className="grid gap-1">
        {sections.map(([href, label]) => (
          <a
            key={href}
            href={`#${href}`}
            onClick={(event) => {
              event.preventDefault();
              scrollToWorkforceSection(href);
            }}
            className="group flex items-center justify-between rounded-2xl px-4 py-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            {label}
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 opacity-0 transition group-hover:opacity-100" />
          </a>
        ))}
      </div>
    </div>
  </aside>
);

const SectionHeader: React.FC<{ eyebrow: string; title: string; text: string }> = ({ eyebrow, title, text }) => (
  <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
    <div className="max-w-4xl">
      <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-orange-500">{eyebrow}</div>
      <h2 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">{title}</h2>
      <p className="mt-5 max-w-3xl text-lg font-light leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
    </div>
    <button
      onClick={() => scrollToWorkforceSection('workforce-overview')}
      className="group inline-flex h-12 w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 text-[10px] font-black uppercase tracking-widest text-slate-500 transition hover:border-orange-400 hover:text-orange-500 dark:border-white/10 dark:bg-[#0b1628] dark:text-slate-400"
    >
      <ArrowRight size={14} className="rotate-180 transition group-hover:-translate-x-1" />
      Back
    </button>
  </div>
);

const ProblemSection: React.FC = () => (
  <section id="workforce-problem" className="scroll-mt-28">
    <TextHero label="Market Gap" title="Labor shortage meets technological acceleration." text="The autonomous economy needs new roles, verified skills, and practical experience. Traditional systems are too slow and too fragmented." />
    <SectionHeader
      eyebrow="Market Gap"
      title="The demand for autonomous skills is outpacing supply."
      text="AI, robotics, drones, and autonomous systems are growing faster than traditional education and hiring systems can adapt."
    />
    <div className="grid gap-5 lg:grid-cols-3">
      {demandBlocks.map((block) => (
        <InfoPanel key={block.title} title={block.title} items={[block.text]} />
      ))}
    </div>
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <InfoPanel title="Worker dilemma" items={['Workers do not know what to learn.', 'They do not know where to learn.', 'They cannot gain practical experience.', 'The path to hiring is unclear.']} />
      <InfoPanel title="Employer dilemma" items={['Employers face labor shortages.', 'Qualified specialists are hard to find.', 'Skills are difficult to verify.', 'Remote operations staffing is fragmented.']} />
    </div>
  </section>
);

const ServicesSection: React.FC = () => (
  <section id="workforce-services" className="scroll-mt-28">
    <TextHero label="Services" title="From learning to supervised real-world operations." text="AGRON converts training into readiness by connecting certification, simulation, remote labs, field exercises, supervised missions, and employment." />
    <SectionHeader
      eyebrow="Service Lines"
      title="AGRON provides the operating layer for autonomous work."
      text="The service model connects learning, certification, practical experience, verified staffing, and mission execution."
    />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {serviceLines.map((service) => (
        <div key={service.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-orange-400/60 hover:shadow-[0_20px_40px_-24px_rgba(249,115,22,0.65)] dark:border-white/10 dark:bg-[#0b1628]">
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-400/10 text-orange-500">{service.icon}</div>
          <h3 className="mb-3 text-2xl font-black tracking-tight">{service.title}</h3>
          <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">{service.text}</p>
        </div>
      ))}
    </div>
  </section>
);

const ArchitectureSection: React.FC = () => (
  <section id="workforce-architecture" className="scroll-mt-28">
    <TextHero label="Architecture" title="The operating structure behind autonomous workforce delivery." text="The architecture has an inner operating orbit and an outer demand orbit. The inner orbit manages workforce readiness. The outer orbit connects real mission demand and technology systems." />
    <SectionHeader
      eyebrow="Company Architecture"
      title="One infrastructure connecting workforce, systems, and demand."
      text="The AGRON Work Ecosystem organizes the core workflow internally and connects it to public-sector, industry, hardware, AI, and mission demand externally."
    />
    <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1628]">
        <div className="mb-5 flex items-center gap-3">
          <BrandLogo variant="inline" className="bg-slate-100 dark:bg-white/10" />
          <div className="text-[10px] font-black uppercase tracking-[0.32em] text-slate-400">Work Ecosystem</div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {architectureCore.map((item) => (
            <div key={item} className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500"><Layers3 size={18} /></div>
              <div className="text-lg font-black">{item}</div>
            </div>
          ))}
        </div>
        <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />
        <div className="grid gap-3">
          {architectureOuter.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600 dark:border-white/10 dark:bg-black/20 dark:text-slate-300">
              <CheckCircle2 size={16} className="text-orange-500" />
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#081424]">
        <div className="mb-6 text-[10px] font-black uppercase tracking-[0.34em] text-blue-500">Orbit Structure</div>
        <div className="grid gap-5">
          <OrbitBlock title="Inner Orbit" items={architectureCore} text="The controlled internal workflow: employers, training, certification, and operations." />
          <OrbitBlock title="Outer Orbit" items={architectureOuter} text="The external operating environment: public programs, mission platforms, fleets, AI systems, and robotics hardware." />
          <OrbitBlock title="AGRON Core" items={['Standards', 'Verification', 'Assignment', 'Feedback']} text="The core defines how autonomous work is prepared, staffed, executed, and improved." />
        </div>
      </div>
    </div>
    <div className="mt-5 rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#081424]">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-400/30 bg-orange-400/10 text-orange-500">
          <Workflow size={22} />
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.32em] text-orange-500">Architecture Map</div>
          <h3 className="text-2xl font-black tracking-tight">How the company structure works</h3>
        </div>
      </div>
      <div className="grid gap-4 xl:grid-cols-5">
        {architectureLayers.map((layer, index) => (
          <div key={layer.name} className="relative rounded-[1.25rem] border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#0b1628]">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-3xl font-black tracking-tighter text-slate-300 dark:text-slate-700">{String(index + 1).padStart(2, '0')}</span>
              {index < architectureLayers.length - 1 && <ArrowRight size={18} className="hidden text-orange-500 xl:block" />}
            </div>
            <h4 className="mb-2 text-xl font-black tracking-tight">{layer.name}</h4>
            <p className="mb-5 text-xs font-medium leading-relaxed text-slate-500 dark:text-slate-400">{layer.description}</p>
            <div className="grid gap-2">
              {layer.inputs.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-black/20 dark:text-slate-400">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const OperatingModelSection: React.FC = () => (
  <section id="workforce-operating-model" className="scroll-mt-28">
    <TextHero label="Operating Model" title="The missing infrastructure between workers and employers." text="The operating model turns a fragmented labor market into a controlled workforce process with role mapping, verification, assignment, execution, and feedback." />
    <SectionHeader
      eyebrow="Operating Model"
      title="AGRON turns workforce readiness into controlled execution."
      text="The model does not stop at training. It links demand, role mapping, verified capacity, mission assignment, execution, and feedback into one repeatable process."
    />
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1628]">
      <div className="grid gap-4">
        {operatingFlow.map(([title, text], index) => (
          <div key={title} className="grid gap-4 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-black/20 md:grid-cols-[9rem_1fr] md:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-sm font-black text-white">{index + 1}</div>
              <div className="text-lg font-black tracking-tight">{title}</div>
            </div>
            <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-5 grid gap-5 md:grid-cols-3">
      <Metric title="Control Point" value="01" text="Every mission starts with defined requirements." />
      <Metric title="Verification Point" value="02" text="Skills are checked before assignment." />
      <Metric title="Feedback Point" value="03" text="Mission results improve future staffing." />
    </div>
  </section>
);

const PassportSection: React.FC = () => (
  <section id="workforce-passport" className="scroll-mt-28">
    <TextHero label="Skill Passport" title="Verified capability, mission history, and performance evidence." text="The Digital Skill Passport makes capability portable, traceable, and useful for mission staffing." />
    <SectionHeader
      eyebrow="Verification"
      title="The Digital Skill Passport makes capability visible."
      text="The passport converts training and mission experience into a verified operational record."
    />
    <div className="grid gap-5 md:grid-cols-2">
      {passportDetails.map(([title, text]) => (
        <InfoPanel key={title} title={title} items={[text]} />
      ))}
    </div>
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <InfoPanel title="What it records" items={['Verified skills across drones, robotics, simulation, and remote operations.', 'Training records and safety certifications.', 'Performance metrics, mission history, and employer reviews.']} />
      <InfoPanel title="What it solves" items={['Employers see verified capability.', 'Workers build a portable record.', 'Hiring decisions become faster and more structured.']} />
    </div>
  </section>
);

const CommandSection: React.FC = () => (
  <section id="workforce-command" className="scroll-mt-28">
    <TextHero label="Employer Center" title="Verified capacity, project staffing, and candidate control." text="The Employer Command Center gives companies a structured view of people, projects, verification, and assignment status." />
    <SectionHeader
      eyebrow="Employer Operations"
      title="The Employer Command Center manages verified capacity."
      text="Employers can map talent, staff projects, review candidates, and manage autonomous workforce operations through one control layer."
    />
    <div className="grid gap-5 md:grid-cols-2">
      {commandDetails.map(([title, text]) => (
        <InfoPanel key={title} title={title} items={[text]} />
      ))}
    </div>
    <div className="mt-5 grid gap-4 md:grid-cols-3">
      {['Workforce analytics', 'Skill assessment', 'Training recommendations', 'Certification tracking', 'Job matching', 'Career recommendations'].map((item) => (
        <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-black uppercase tracking-widest text-slate-600 dark:border-white/10 dark:bg-[#0b1628] dark:text-slate-300">
          {item}
        </div>
      ))}
    </div>
  </section>
);

const IndustriesSection: React.FC = () => (
  <section id="workforce-industries" className="scroll-mt-28">
    <TextHero label="Industries" title="Role mapping across drones, robotics, AI, and autonomous systems." text="AGRON maps roles by sector and technology type, then connects those roles to training, verification, and operations." />
    <SectionHeader
      eyebrow="Industry Structure"
      title="Autonomous work appears across multiple sectors."
      text="AGRON maps the roles needed across drones, robotics, AI, and autonomous systems, then connects those roles to training, verification, and operations."
    />
    <div className="grid gap-4 md:grid-cols-2">
      {roles.map((row) => (
        <div key={row.sector} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1628]">
          <h3 className="mb-4 text-2xl font-black tracking-tight">{row.sector}</h3>
          <div className="flex flex-wrap gap-2">
            {row.roles.map((role) => (
              <span key={role} className="rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-300">
                {role}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const DeploymentSection: React.FC = () => (
  <section id="workforce-deployment" className="scroll-mt-28">
    <TextHero label="Deployment" title="Implementation layer for workforce and operations programs." text="AGRON can be deployed for enterprises, public programs, mission operators, training organizations, and industry partners." />
    <SectionHeader
      eyebrow="Implementation Services"
      title="AGRON can be deployed as a workforce and operations layer."
      text="The system can support enterprises, public programs, mission operators, training organizations, and hardware partners."
    />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {deploymentServices.map((service) => (
        <div key={service.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0b1628]">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10 text-blue-500">
            <SlidersHorizontal size={21} />
          </div>
          <h3 className="mb-3 text-2xl font-black tracking-tight">{service.title}</h3>
          <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">{service.text}</p>
        </div>
      ))}
    </div>
    <div className="mt-5 rounded-[2rem] border border-orange-400/25 bg-orange-400/10 p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white">
        <ShieldCheck size={22} />
      </div>
      <h3 className="mb-4 text-3xl font-black tracking-tight">Deployment principle</h3>
      <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
        AGRON does not replace employers, operators, or hardware providers. It defines the structure that allows them to work through one verified and controlled operational process.
      </p>
    </div>
  </section>
);

const RevenueSection: React.FC<Props> = ({ setActiveTab }) => (
  <section id="workforce-revenue" className="scroll-mt-28">
    <TextHero label="Revenue" title="Commercial structure for workforce infrastructure." text="The model supports individual training, employer operations, recruitment, enterprise solutions, public programs, and strategic partnerships." />
    <SectionHeader
      eyebrow="Business Model"
      title="Diversified revenue from workforce infrastructure."
      text="The model supports individual training, employer workforce operations, recruitment, enterprise solutions, government programs, and strategic industry partnerships."
    />
    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0b1628]">
        <div className="mb-6 text-[10px] font-black uppercase tracking-[0.34em] text-orange-500">Revenue Logic</div>
        <div className="space-y-4">
          {revenue.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-black/20">
              <div className="mb-3 text-3xl font-black text-orange-500">{item.label}</div>
              <div className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{item.items.join(' / ')}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {revenue.map((item) => (
          <div key={item.label} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0b1628]">
            <div className="mb-4 text-3xl font-black text-orange-500">{item.label}</div>
            <div className="grid gap-3">
              {item.items.map((line) => (
                <div key={line} className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
      <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0b1628]">
        <div className="mb-5 text-[10px] font-black uppercase tracking-[0.34em] text-blue-500">Category Comparison</div>
        <div className="grid gap-3">
          {categoryComparison.map(([area, university, jobBoard, agron]) => (
            <div key={area} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-black/20 dark:text-slate-300 md:grid-cols-[1.2fr_0.9fr_0.9fr_1fr]">
              <span>{area}</span>
              <span className="text-slate-400">{university}</span>
              <span className="text-slate-400">{jobBoard}</span>
              <span className="text-orange-500">{agron}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[2rem] border border-orange-400/25 bg-orange-400/10 p-8">
        <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-orange-500">Category of One</div>
        <h3 className="mb-5 text-3xl font-black tracking-tight">Purpose-built for autonomous work.</h3>
        <p className="mb-8 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
          Traditional universities move slowly. Job boards are generic. AGRON Work Infrastructure combines practical mission experience, verified digital passports, and faster verified staffing.
        </p>
        <button onClick={() => setActiveTab('investors')} className="group inline-flex h-14 items-center gap-3 rounded-2xl bg-slate-950 px-7 text-[10px] font-black uppercase tracking-widest text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950">
          Investor View <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  </section>
);

const InfoPanel: React.FC<{ title: string; items: string[] }> = ({ title, items }) => (
  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1628]">
    <h3 className="mb-5 text-2xl font-black tracking-tight">{title}</h3>
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex gap-3 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">
          <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-orange-500" />
          {item}
        </div>
      ))}
    </div>
  </div>
);

const TextHero: React.FC<{ label: string; title: string; text: string }> = ({ label, title, text }) => (
  <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-[0_25px_70px_-40px_rgba(15,23,42,0.7)] dark:border-white/10 md:p-10">
    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(15,23,42,0.86)),radial-gradient(circle_at_18%_20%,rgba(249,115,22,0.26),transparent_32%),radial-gradient(circle_at_82%_76%,rgba(59,130,246,0.22),transparent_38%)]" />
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />
    <div className="relative z-10">
      <div className="mb-4 w-fit rounded-full border border-orange-300/30 bg-orange-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-orange-200">{label}</div>
      <h3 className="max-w-4xl text-3xl font-black uppercase leading-none tracking-tighter md:text-5xl">{title}</h3>
      <p className="mt-5 max-w-3xl text-sm font-medium leading-relaxed text-slate-300 md:text-base">{text}</p>
    </div>
  </div>
);

const OrbitBlock: React.FC<{ title: string; text: string; items: string[] }> = ({ title, text, items }) => (
  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-black/20">
    <h4 className="mb-2 text-2xl font-black tracking-tight">{title}</h4>
    <p className="mb-4 text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-300">{text}</p>
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-300">
          {item}
        </span>
      ))}
    </div>
  </div>
);

const Metric: React.FC<{ title: string; value: string; text: string }> = ({ title, value, text }) => (
  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-[#0b1628]">
    <div className="mb-4 text-5xl font-black tracking-tighter text-orange-500">{value}</div>
    <h3 className="mb-2 text-xl font-black tracking-tight">{title}</h3>
    <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">{text}</p>
  </div>
);

export default AutonomousWorkforce;
