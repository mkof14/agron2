import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, GraduationCap, Users } from 'lucide-react';
import { agronCopy, getLang } from './agronCopy';

const tracks = [
  {
    title: 'Operator Training',
    text: 'Builds practical UAV operators who can work under defined mission standards.',
    points: ['Flight discipline', 'Mission preparation', 'Safety procedure', 'Deployment readiness']
  },
  {
    title: 'Instructor Capacity',
    text: 'Creates repeatable training methods so operator capacity can scale without losing quality.',
    points: ['Training structure', 'Evaluation', 'Scenario practice', 'Feedback loops']
  },
  {
    title: 'Workforce Readiness',
    text: 'Connects trained people to real mission demand through AGRON execution control.',
    points: ['Availability', 'Certification', 'Assignment', 'Operational control']
  }
];

const LearningPaths: React.FC = () => {
  const { i18n } = useTranslation();
  const text = agronCopy[getLang(i18n.language)];

  return (
    <div className="bg-white text-slate-950 dark:bg-[#07111f] dark:text-white">
      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0">
          <img src="/presentations/agron-gda-hero.jpg" alt="GDA training operations" width={1200} height={900} loading="eager" decoding="async" className="h-full w-full object-cover opacity-35 brightness-110 dark:opacity-52 dark:brightness-125" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 to-white/72 dark:from-[#07111f] dark:via-[#07111f]/90 dark:to-[#07111f]/68" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(245,158,11,0.18),transparent_35%),radial-gradient(circle_at_18%_72%,rgba(59,130,246,0.18),transparent_36%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-amber-500/25 bg-amber-500/10 px-5 py-3 text-[10px] font-black uppercase tracking-[0.34em] text-amber-600">
            <GraduationCap size={15} />
            {text.gda.badge}
          </div>
          <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-tighter md:text-8xl">
            {text.gda.title}
          </h1>
          <p className="mt-8 max-w-3xl border-l border-blue-600 pl-6 text-xl font-light leading-relaxed text-slate-600 dark:text-slate-400">
            {text.gda.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {tracks.map((track) => (
            <div key={track.title} className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-[0_28px_75px_rgba(245,158,11,0.16)] dark:border-blue-300/10 dark:bg-[#0b1628] dark:hover:bg-[#10203a]">
              <Users className="mb-8 text-blue-600" size={28} />
              <h2 className="mb-4 text-3xl font-black tracking-tight">{track.title}</h2>
              <p className="mb-8 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">{track.text}</p>
              <div className="space-y-3">
                {track.points.map((point) => (
                  <div key={point} className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
                    <CheckCircle2 size={16} className="text-amber-500" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-8 text-white shadow-[0_0_70px_rgba(59,130,246,0.18)]">
          <h2 className="mb-4 text-3xl font-black uppercase tracking-tight">{text.gda.metric}</h2>
          <p className="max-w-3xl text-lg font-light leading-relaxed text-slate-400">
            {text.gda.metricText}
          </p>
        </div>
      </section>
    </div>
  );
};

export default LearningPaths;
