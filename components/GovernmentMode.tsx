import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, HardHat, Radio, ShieldCheck, Wrench } from 'lucide-react';
import { agronCopy, getLang } from './agronCopy';

const guardServices = [
  {
    title: 'Critical Infrastructure Protection',
    text: 'Structured support for state and business assets where monitoring and readiness are required.',
    icon: <HardHat size={22} />
  },
  {
    title: 'Private Air Defense',
    text: 'Authorized deployment and maintenance support for localized airspace security requirements.',
    icon: <ShieldCheck size={22} />
  },
  {
    title: 'Counter-UAV Coordination',
    text: 'Detection, tracking, and response workflows for hostile drone threats under proper authorization.',
    icon: <Radio size={22} />
  },
  {
    title: '24/7 Monitoring',
    text: 'Persistent situational awareness for controlled environments and critical sites.',
    icon: <Eye size={22} />
  },
  {
    title: 'System Operation',
    text: 'Ongoing technical maintenance, readiness checks, and operational support.',
    icon: <Wrench size={22} />
  }
];

const GovernmentMode: React.FC = () => {
  const { i18n } = useTranslation();
  const text = agronCopy[getLang(i18n.language)];

  return (
    <div className="bg-white text-slate-950 dark:bg-[#07111f] dark:text-white">
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0">
          <img src="/presentations/agron-guard-hero.jpg" alt="GUARD operations" width={2500} height={640} loading="eager" decoding="async" className="h-full w-full object-cover opacity-35 brightness-110 dark:opacity-54 dark:brightness-125" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/72 dark:from-[#07111f] dark:via-[#07111f]/90 dark:to-[#07111f]/68" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(245,158,11,0.22),transparent_35%),radial-gradient(circle_at_15%_80%,rgba(59,130,246,0.18),transparent_35%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-500/25 bg-amber-500/10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.34em] text-amber-600">
            <ShieldCheck size={15} />
            {text.guard.badge}
          </div>
          <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
            {text.guard.title}
          </h1>
          <p className="mt-8 max-w-3xl border-l border-blue-600 pl-6 text-xl font-light leading-relaxed text-slate-600 dark:text-slate-400">
            {text.guard.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-blue-600">{text.guard.section}</div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">{text.guard.sectionTitle}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {guardServices.map((service) => (
              <div key={service.title} className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_28px_75px_rgba(245,158,11,0.16)] dark:border-blue-300/10 dark:bg-[#0b1628] dark:hover:bg-[#10203a]">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-600">{service.icon}</div>
                <h3 className="mb-4 text-xl font-black tracking-tight">{service.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-8 text-white shadow-[0_0_70px_rgba(59,130,246,0.18)]">
          <h2 className="mb-4 text-3xl font-black uppercase tracking-tight">{text.guard.noteTitle}</h2>
          <p className="max-w-4xl text-lg font-light leading-relaxed text-slate-400">
            {text.guard.noteText}
          </p>
        </div>
      </section>
    </div>
  );
};

export default GovernmentMode;
