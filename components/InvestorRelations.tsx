import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3, CheckCircle2, FileText, ShieldCheck, TrendingUp } from 'lucide-react';
import { agronCopy, getLang } from './agronCopy';

const thesis = [
  'Hardware procurement is moving faster than operator capacity.',
  'Mission results depend on trained personnel and defined processes.',
  'Operational feedback reduces development risk.',
  'AGRON connects research, execution, and deployment capability.'
];

const revenue = [
  'Mission execution',
  'Contracts',
  'Operator capacity',
  'System access',
  'Integrations',
  'Custom deployments'
];

const InvestorRelations: React.FC = () => {
  const { i18n } = useTranslation();
  const text = agronCopy[getLang(i18n.language)];

  return (
    <div className="bg-white text-slate-950 dark:bg-[#07111f] dark:text-white">
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0">
          <img src="/presentations/agron-investor-hero.jpg" alt="AGRON operational credibility" width={1200} height={900} loading="eager" decoding="async" className="h-full w-full object-cover opacity-35 brightness-110 dark:opacity-52 dark:brightness-125" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/70 dark:from-[#07111f] dark:via-[#07111f]/90 dark:to-[#07111f]/68" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(245,158,11,0.18),transparent_35%),radial-gradient(circle_at_15%_70%,rgba(59,130,246,0.18),transparent_35%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-blue-500/25 bg-blue-500/10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.34em] text-blue-600">
            <TrendingUp size={15} />
            {text.investors.badge}
          </div>
          <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
            {text.investors.title}
          </h1>
          <p className="mt-8 max-w-3xl border-l border-amber-500 pl-6 text-xl font-light leading-relaxed text-slate-600 dark:text-slate-400">
            {text.investors.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-amber-600">{text.investors.thesis}</div>
            <h2 className="mb-8 text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">
              {text.investors.thesisTitle}
            </h2>
            <p className="text-lg font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              {text.investors.thesisText}
            </p>
          </div>
          <div className="grid gap-3">
            {thesis.map((item) => (
              <div key={item} className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm font-bold leading-relaxed text-slate-600 transition hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-blue-glow dark:border-blue-300/10 dark:bg-[#0b1628] dark:text-slate-300">
                <CheckCircle2 size={18} className="mt-0.5 flex-none text-blue-600" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-4xl">
            <div className="mb-4 text-[10px] font-black uppercase tracking-[0.34em] text-blue-400">{text.investors.proof}</div>
            <h2 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">
              {text.investors.proofTitle}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <Metric value="8,500+" label="trained UAV specialists, operators and instructors" />
            <Metric value="Live" label="feedback from active operational conditions" />
            <Metric value="Zero" label="margin for uncontrolled execution in critical missions" />
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-soft-xl dark:border-blue-300/10 dark:bg-[#0b1628] dark:shadow-[0_0_60px_rgba(59,130,246,0.12)]">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <BarChart3 size={24} />
            </div>
            <h2 className="mb-6 text-4xl font-black uppercase leading-none tracking-tighter">
              {text.investors.modelTitle}
            </h2>
            <p className="text-lg font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              {text.investors.modelText}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {revenue.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white px-5 py-5 text-sm font-black uppercase tracking-wider text-slate-600 transition hover:-translate-y-0.5 hover:border-amber-500/40 dark:border-blue-300/10 dark:bg-[#0b1628] dark:text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <InvestorNote icon={<ShieldCheck size={22} />} title="Risk reduction" text="Operational feedback, trained personnel, and defined processes reduce execution risk." />
          <InvestorNote icon={<FileText size={22} />} title="Documentation" text="Use the presentation hub to review the AGRON company deck and connected ecosystem materials." />
        </div>
      </section>
    </div>
  );
};

const Metric: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7">
    <div className="mb-3 text-5xl font-black tracking-tighter text-amber-300">{value}</div>
    <p className="text-sm font-bold leading-relaxed text-slate-400">{label}</p>
  </div>
);

const InvestorNote: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-glow dark:border-blue-300/10 dark:bg-[#0b1628]">
    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/25 bg-blue-500/10 text-blue-600">{icon}</div>
    <h3 className="mb-3 text-2xl font-black tracking-tight">{title}</h3>
    <p className="text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{text}</p>
  </div>
);

export default InvestorRelations;
