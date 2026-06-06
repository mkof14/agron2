import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3, Compass, Cpu, Database, ShieldCheck } from 'lucide-react';
import { agronCopy, getLang } from './agronCopy';

const capabilities = [
  {
    title: 'Research',
    text: 'Multi-source data collection for deep situational awareness.',
    icon: <Compass size={22} />
  },
  {
    title: 'Modeling',
    text: 'Digital twins and scenario building for event forecasting.',
    icon: <BarChart3 size={22} />
  },
  {
    title: 'Technology Evaluation',
    text: 'Feasibility analysis of technologies for specific tasks.',
    icon: <Cpu size={22} />
  },
  {
    title: 'Decision Support',
    text: 'Analytical insights and recommendations for effective management.',
    icon: <Database size={22} />
  },
  {
    title: 'Field Testing',
    text: 'Real-world validation of solutions before deployment.',
    icon: <ShieldCheck size={22} />
  }
];

const AILab: React.FC = () => {
  const { i18n } = useTranslation();
  const text = agronCopy[getLang(i18n.language)];

  return (
    <div className="bg-white text-slate-950 dark:bg-[#07111f] dark:text-white">
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0">
          <img src="/presentations/agron-isdri-hero.jpg" alt="ISDRI analysis layer" width={1280} height={1536} loading="eager" decoding="async" className="h-full w-full object-cover opacity-35 brightness-110 dark:opacity-52 dark:brightness-125" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/70 dark:from-[#07111f] dark:via-[#07111f]/90 dark:to-[#07111f]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.22),transparent_35%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-500/25 bg-amber-500/10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.34em] text-amber-600">
            <Database size={15} />
            {text.isdri.badge}
          </div>
          <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
            {text.isdri.title}
          </h1>
          <p className="mt-8 max-w-3xl border-l border-blue-600 pl-6 text-xl font-light leading-relaxed text-slate-600 dark:text-slate-400">
            {text.isdri.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-5">
          {capabilities.map((item) => (
            <div key={item.title} className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-glow dark:border-blue-300/10 dark:bg-[#0b1628] dark:hover:bg-[#10203a]">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10 text-blue-600">{item.icon}</div>
              <h2 className="mb-4 text-2xl font-black tracking-tight">{item.title}</h2>
              <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft-xl dark:border-blue-300/10 dark:bg-[#0b1628] dark:shadow-[0_0_60px_rgba(59,130,246,0.12)]">
          <h2 className="mb-4 text-3xl font-black uppercase tracking-tight">{text.isdri.finalTitle}</h2>
          <p className="max-w-4xl text-lg font-medium leading-relaxed text-slate-500 dark:text-slate-400">
            {text.isdri.finalText}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AILab;
