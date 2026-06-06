import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Database, GraduationCap, Layers3, RadioTower, Shield } from 'lucide-react';
import { agronCopy, getLang } from './agronCopy';
import BrandLogo from './BrandLogo';

interface Props {
  setActiveTab: (tab: string) => void;
}

const capabilityGaps = [
  'Right decisions',
  'Highly trained personnel',
  'Unified operations management',
  'Practical mission execution'
];

const ecosystemLayers = [
  {
    title: 'GDA',
    subtitle: 'Global Drone Academy',
    text: 'Operator training, certification, and workforce capacity for unmanned systems.',
    icon: <GraduationCap size={22} />
  },
  {
    title: 'ISDRI',
    subtitle: 'Spatial Data Research',
    text: 'Research, modeling, data analysis, and field validation before execution.',
    icon: <Database size={22} />
  },
  {
    title: 'AGRON',
    subtitle: 'Execution Platform',
    text: 'Mission coordination, operational control, and standardized delivery.',
    icon: <Layers3 size={22} />
  },
  {
    title: 'GUARD',
    subtitle: 'Operations & Defense',
    text: 'Security operations, monitoring, technical readiness, and authorized deployment support.',
    icon: <Shield size={22} />
  }
];

const sectors = [
  'Government & State Sector',
  'Critical Infrastructure',
  'Energy & Power Grids',
  'Oil & Gas',
  'Telecommunications',
  'Logistics & Supply Chain',
  'International Partners'
];

const Dashboard: React.FC<Props> = ({ setActiveTab }) => {
  const { i18n } = useTranslation();
  const text = agronCopy[getLang(i18n.language)];

  return (
    <div className="bg-white text-slate-950 dark:bg-[#07111f] dark:text-white overflow-hidden">
      <section className="relative min-h-screen pt-32 pb-20 px-6 flex items-center">
        <div className="absolute inset-0">
          <img src="/presentations/agron-hero-clean.jpg" alt="AGRON operations background" width={1120} height={1380} loading="eager" decoding="async" fetchPriority="high" className="h-full w-full object-cover opacity-65 brightness-110 contrast-105 dark:opacity-78 dark:brightness-125" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/78 to-slate-900/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(59,130,246,0.28),transparent_35%),radial-gradient(circle_at_75%_70%,rgba(245,158,11,0.18),transparent_38%)]" />
          <div className="absolute left-0 top-0 h-full w-full opacity-35 [background-image:linear-gradient(rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="absolute bottom-16 left-6 right-6 h-px bg-gradient-to-r from-amber-300/0 via-amber-300/55 to-blue-400/0" />
          <div className="absolute left-6 top-32 hidden h-[42vh] w-px bg-gradient-to-b from-blue-400/0 via-blue-400/60 to-amber-300/0 lg:block" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-400/10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.34em] text-amber-300">
              <RadioTower size={15} />
              {text.home.badge}
            </div>
            <h1 className="mb-8 text-6xl font-black uppercase leading-[0.82] tracking-tighter text-white md:text-8xl xl:text-9xl">
              <BrandLogo variant="hero" className="mb-5 drop-shadow-[0_22px_45px_rgba(0,0,0,0.55)]" imgClassName="mix-blend-normal" />
              <span className="block w-fit border-t border-amber-300/55 pt-4 text-4xl leading-none tracking-[0.04em] text-amber-300 md:text-6xl xl:text-7xl">{text.home.title.replace('AGRON', '').trim() || 'Ecosystem'}</span>
            </h1>
            <p className="max-w-3xl border-l border-amber-300/50 pl-6 text-xl font-light leading-relaxed text-slate-300 md:text-2xl">
              {text.home.subtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={() => setActiveTab('about')} className="group inline-flex h-14 items-center gap-3 rounded-2xl bg-blue-600 px-7 text-[10px] font-black uppercase tracking-widest text-white shadow-blue-glow transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.55)]">
                {text.common.exploreSystem} <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </button>
              <button onClick={() => setActiveTab('presentations')} className="group inline-flex h-14 items-center gap-3 rounded-2xl border border-white/20 bg-white/15 px-7 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-300/15 hover:text-amber-100">
                {text.common.presentation}
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative overflow-hidden rounded-[2rem] border border-blue-300/20 bg-slate-900/65 p-6 shadow-[0_0_45px_rgba(37,99,235,0.2)] backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-amber-300 to-transparent" />
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.32em] text-blue-300">{text.home.bottleneck}</div>
            <h2 className="mb-6 text-3xl font-black tracking-tight text-white">{text.home.bottleneckTitle}</h2>
            <div className="grid gap-3">
              {text.home.gaps.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/10 px-4 py-3 text-sm font-bold text-amber-100">
                  <CheckCircle2 size={17} className="text-amber-300" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-blue-600">{text.home.structure}</div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">{text.home.structureTitle}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ecosystemLayers.map((layer) => (
              <div key={layer.title} className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-glow dark:border-blue-300/10 dark:bg-[#0b1628] dark:hover:bg-[#10203a]">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10 text-blue-500">{layer.icon}</div>
                <h3 className="text-3xl font-black tracking-tight">
                  {layer.title === 'AGRON' ? <BrandLogo variant="inline" className="bg-white/90 ring-1 ring-slate-200 dark:bg-white/10 dark:ring-white/10" /> : layer.title}
                </h3>
                <div className="mb-4 text-xs font-black uppercase tracking-widest text-amber-600">{layer.subtitle}</div>
                <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{layer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-28 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-amber-300">Use cases</div>
            <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">{text.home.sectorsTitle}</h2>
            <p className="text-lg font-light leading-relaxed text-slate-400">
              {text.home.sectorsText}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {sectors.map((sector) => (
              <div key={sector} className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-black uppercase tracking-wider text-slate-300">
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-orange-500">Workforce Infrastructure</div>
            <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">From skills to verified autonomous operations.</h2>
            <p className="mb-8 text-lg font-light leading-relaxed text-slate-600 dark:text-slate-300">
              AGRON extends execution control into workforce readiness: training, certification, digital skill passports, employer staffing, and distributed operations.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Digital skill passport', 'Employer command center', 'Practical readiness bridge', 'AI workforce engine'].map((item) => (
                <div key={item} className="rounded-2xl border border-orange-400/25 bg-orange-400/10 px-5 py-4 text-sm font-black uppercase tracking-wider text-orange-700 dark:text-orange-300">
                  {item}
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab('workforce')} className="group mt-8 inline-flex h-14 items-center gap-3 rounded-2xl bg-orange-500 px-7 text-[10px] font-black uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:bg-orange-400">
              View Workforce Architecture <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </button>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.55)] dark:border-white/10 dark:bg-slate-950">
            <img src="/workforce/workforce-command.jpg" alt="AGRON employer command center" width={1600} height={893} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-slate-950">
            <img src="/presentations/agron-credibility.jpg" alt="AGRON credibility" width={1600} height={893} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-blue-600">{text.home.why}</div>
            <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">{text.home.whyTitle}</h2>
            <div className="grid gap-4">
              <CredibilityMetric value="8,500+" label="trained specialists, operators and instructors" />
              <CredibilityMetric value="MoD" label="aligned with Ministry of Defense of Ukraine standards" />
              <CredibilityMetric value="MoE" label="licensed educational base from the Ministry of Education and Science" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] border border-blue-500/20 bg-blue-600 px-8 py-10 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">{text.home.ctaTitle}</h2>
            <p className="mt-2 text-sm font-medium text-blue-100">{text.home.ctaText}</p>
          </div>
          <button onClick={() => setActiveTab('presentations')} className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-white px-7 text-[10px] font-black uppercase tracking-widest text-blue-700 transition hover:-translate-y-0.5 hover:shadow-2xl">
            {text.common.openDeck} <ArrowRight size={15} className="transition group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};

const CredibilityMetric: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-950">
    <div className="mb-1 text-4xl font-black tracking-tighter text-amber-600">{value}</div>
    <div className="text-sm font-bold leading-relaxed text-slate-500 dark:text-slate-400">{label}</div>
  </div>
);

export default Dashboard;
