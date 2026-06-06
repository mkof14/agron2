import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Database, GraduationCap, Layers3, ShieldCheck } from 'lucide-react';
import { agronCopy, getLang } from './agronCopy';
import BrandLogo from './BrandLogo';

interface Props {
  setActiveTab: (tab: string) => void;
}

const layers = [
  {
    title: 'GDA',
    name: 'Global Drone Academy',
    role: 'Builds the operator base through training, certification, and practical mission readiness.',
    points: ['Operator training', 'Instructor capacity', 'Field discipline', 'Deployment readiness'],
    icon: <GraduationCap size={24} />
  },
  {
    title: 'ISDRI',
    name: 'International Spatial Data Research Institute',
    role: 'Turns terrain, signals, assets, and mission data into analysis before execution starts.',
    points: ['Research', 'Modeling', 'Technology evaluation', 'Decision support'],
    icon: <Database size={24} />
  },
  {
    title: 'AGRON',
    name: 'Platform',
    role: 'Controls the execution path between mission demand, operator capacity, and standardized delivery.',
    points: ['Mission definition', 'Operator assignment', 'Execution control', 'Output standardization'],
    icon: <Layers3 size={24} />
  },
  {
    title: 'GUARD',
    name: 'Operations & Defense',
    role: 'Supports authorized security and defense operations where timing, monitoring, and reliability matter.',
    points: ['Critical infrastructure', 'Airspace monitoring', 'Counter-UAV coordination', 'System operation'],
    icon: <ShieldCheck size={24} />
  }
];

const About: React.FC<Props> = ({ setActiveTab }) => {
  const { i18n } = useTranslation();
  const text = agronCopy[getLang(i18n.language)];

  return (
    <div className="bg-white text-slate-950 dark:bg-[#07111f] dark:text-white">
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0">
          <img src="/presentations/agron-ecosystem-map.jpg" alt="AGRON ecosystem map" width={1600} height={893} loading="eager" decoding="async" className="h-full w-full object-cover opacity-35 brightness-110 dark:opacity-48 dark:brightness-125" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/88 to-white dark:from-[#07111f]/90 dark:via-[#07111f]/86 dark:to-[#07111f]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(245,158,11,0.16),transparent_36%),radial-gradient(circle_at_18%_72%,rgba(59,130,246,0.2),transparent_35%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-6 text-[10px] font-black uppercase tracking-[0.34em] text-amber-600">{text.about.badge}</div>
          <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
            {text.about.title}
          </h1>
          <p className="mt-8 max-w-3xl border-l border-blue-600 pl-6 text-xl font-light leading-relaxed text-slate-600 dark:text-slate-400">
            {text.about.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <h2 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">{text.about.sectionTitle}</h2>
            <p className="max-w-3xl text-lg font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              {text.about.sectionText}
            </p>
          </div>

          <div className="grid gap-5">
            {layers.map((layer, index) => (
              <div key={layer.title} className="group grid gap-5 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_24px_70px_rgba(245,158,11,0.16)] dark:border-blue-300/10 dark:bg-[#0b1628] dark:hover:bg-[#10203a] lg:grid-cols-[10rem_1fr_1fr] lg:items-center">
                <div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-600">{layer.icon}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">Layer {index + 1}</div>
                  <h3 className="text-4xl font-black tracking-tighter">
                    {layer.title === 'AGRON' ? <BrandLogo variant="inline" className="bg-white/90 ring-1 ring-slate-200 dark:bg-white/10 dark:ring-white/10" /> : layer.title}
                  </h3>
                  <div className="text-xs font-black uppercase tracking-widest text-blue-600">{layer.name}</div>
                </div>
                <p className="text-lg font-medium leading-relaxed text-slate-600 dark:text-slate-300">{layer.role}</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {layer.points.map((point) => (
                    <div key={point} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-black uppercase tracking-wider text-slate-500 dark:border-white/10 dark:bg-black dark:text-slate-400">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-blue-600">{text.about.thesis}</div>
            <h2 className="mb-8 text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">
              {text.about.thesisTitle}
            </h2>
            <div className="space-y-5 text-lg font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              {text.about.thesisText.map((item) => <p key={item}>{item}</p>)}
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft-xl dark:border-blue-300/10 dark:bg-[#0b1628] dark:shadow-[0_0_55px_rgba(59,130,246,0.12)]">
            <h3 className="mb-6 text-2xl font-black tracking-tight">{text.about.chain}</h3>
            {['Analysis', 'Training', 'Execution Control', 'Mission Operations', 'Feedback Loop'].map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-slate-200 py-4 text-sm font-black uppercase tracking-widest last:border-0 dark:border-white/10">
                <span>{item}</span>
                <ArrowRight size={15} className="text-blue-600" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-[2rem] bg-slate-950 p-8 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">{text.about.ctaTitle}</h2>
            <p className="mt-2 text-sm font-medium text-slate-400">{text.about.ctaText}</p>
          </div>
          <button onClick={() => setActiveTab('presentations')} className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 text-[10px] font-black uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-blue-glow">
            {text.common.openDeck} <ArrowRight size={15} className="transition group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
