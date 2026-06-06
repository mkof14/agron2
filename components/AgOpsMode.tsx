import React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, ArrowRight, ClipboardList, Cpu, Monitor, RadioTower, Settings2 } from 'lucide-react';
import { agronCopy, getLang } from './agronCopy';

const AgOpsMode: React.FC = () => {
  const { i18n } = useTranslation();
  const text = agronCopy[getLang(i18n.language)];

  return (
    <div className="bg-white text-slate-950 dark:bg-[#07111f] dark:text-white">
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0">
          <img src="/presentations/agron-hero-clean.jpg" alt="AGRON execution operations" width={1120} height={1380} loading="eager" decoding="async" className="h-full w-full object-cover opacity-35 brightness-110 dark:opacity-56 dark:brightness-125" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/72 dark:from-[#07111f] dark:via-[#07111f]/90 dark:to-[#07111f]/68" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.15),transparent_36%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-500/25 bg-blue-500/10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.34em] text-blue-600">
            <Activity size={15} />
            {text.agron.badge}
          </div>
          <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
            {text.agron.title}
          </h1>
          <p className="mt-8 max-w-3xl border-l border-amber-500 pl-6 text-xl font-light leading-relaxed text-slate-600 dark:text-slate-400">
            {text.agron.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 lg:grid-cols-4">
            {text.agron.flow.map(([title, stepText], index) => (
              <div key={title} className="group rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50/70 p-7 transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-glow dark:border-blue-300/10 dark:from-[#0b1628] dark:via-[#0d1d34] dark:to-[#11253f] dark:hover:bg-[#10203a]">
                <div className="mb-8 flex items-center justify-between">
                  <span className="bg-gradient-to-br from-blue-600 to-amber-500 bg-clip-text text-5xl font-black tracking-tighter text-transparent">{String(index + 1).padStart(2, '0')}</span>
                  {index < text.agron.flow.length - 1 && <ArrowRight className="text-slate-300" size={22} />}
                </div>
                <h2 className="mb-4 text-2xl font-black tracking-tight">{title}</h2>
                <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{stepText}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-4xl">
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-amber-600">{text.agron.architectureLabel}</div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">{text.agron.architectureTitle}</h2>
            <p className="mt-5 max-w-3xl text-lg font-light leading-relaxed text-slate-600 dark:text-slate-300">
              {text.agron.architectureText}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {text.agron.architecture.map(([title, itemText], index) => (
              <div key={title} className="rounded-[1.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-amber-50/70 p-6 dark:border-white/10 dark:from-[#0b1628] dark:via-[#0c1c32] dark:to-[#13213a]">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white">{index + 1}</div>
                  <ArrowRight size={18} className="text-amber-500/70" />
                </div>
                <h3 className="mb-3 text-2xl font-black tracking-tight">{title}</h3>
                <p className="text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">{itemText}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 xl:grid-cols-2">
            <OperatingDomain
              icon={<Settings2 size={24} />}
              label={text.agron.managementLabel}
              title={text.agron.managementTitle}
              subtitle={text.agron.managementSubtitle}
              items={text.agron.managementItems}
              tone="amber"
            />
            <OperatingDomain
              icon={<Cpu size={24} />}
              label={text.agron.technologyLabel}
              title={text.agron.technologyTitle}
              subtitle={text.agron.technologySubtitle}
              items={text.agron.technologyItems}
              tone="blue"
            />
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <Capability icon={<ClipboardList size={22} />} title={text.agron.capabilities[0][0]} text={text.agron.capabilities[0][1]} />
          <Capability icon={<RadioTower size={22} />} title={text.agron.capabilities[1][0]} text={text.agron.capabilities[1][1]} />
          <Capability icon={<Monitor size={22} />} title={text.agron.capabilities[2][0]} text={text.agron.capabilities[2][1]} />
        </div>
      </section>
    </div>
  );
};

const OperatingDomain: React.FC<{ icon: React.ReactNode; label: string; title: string; subtitle: string; items: string[]; tone: 'amber' | 'blue' }> = ({ icon, label, title, subtitle, items, tone }) => {
  const toneClass = tone === 'amber'
    ? 'border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-300'
    : 'border-blue-500/25 bg-blue-500/10 text-blue-600 dark:text-blue-300';

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 dark:border-blue-300/10 dark:bg-[#0b1628]">
      <div className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border ${toneClass}`}>{icon}</div>
      <div className={`mb-4 text-[10px] font-black uppercase tracking-[0.34em] ${tone === 'amber' ? 'text-amber-600 dark:text-amber-300' : 'text-blue-600 dark:text-blue-300'}`}>{label}</div>
      <h2 className="mb-5 text-4xl font-black uppercase leading-none tracking-tighter md:text-5xl">{title}</h2>
      <p className="mb-8 max-w-xl text-sm font-medium leading-relaxed text-slate-600 dark:text-slate-400">{subtitle}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-[11px] font-black uppercase tracking-widest text-slate-600 dark:border-white/10 dark:bg-black/20 dark:text-slate-300">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const Capability: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="rounded-[2rem] border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_24px_70px_rgba(245,158,11,0.14)] dark:border-blue-300/10 dark:bg-[#0b1628]">
    <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-600">{icon}</div>
    <h3 className="mb-3 text-2xl font-black tracking-tight">{title}</h3>
    <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{text}</p>
  </div>
);

export default AgOpsMode;
