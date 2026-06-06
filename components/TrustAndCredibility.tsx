import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ShieldCheck, Scale, Eye, Fingerprint, Award, CheckCircle2, AlertTriangle, Binary, HardHat, FileText, Lock, Activity } from 'lucide-react';

const TrustAndCredibility: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-black text-slate-900 dark:text-white flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Hero */}
      <section className="relative py-40 px-8 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-center gap-4 mb-4 text-blue-500">
                 <ShieldCheck size={20}/>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Battle-Tested Foundation</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-10 text-white leading-none">
                Identity of <span className="text-blue-500 italic">Trust.</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-slate-300 max-w-4xl mx-auto leading-relaxed">
                 The AGRON platform is built on a single premise: <span className="text-white font-bold italic">Autonomous systems require human accountability.</span>
              </p>
           </motion.div>
        </div>
      </section>

      {/* Grid Stats */}
      <section className="py-24 px-8 border-b border-slate-200 dark:border-white/5">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <StatBox icon={<CheckCircle2 size={32}/>} label="8,500+" sub="UAV Operators Trained" />
            <StatBox icon={<Activity size={32}/>} label="25,000+" sub="Mission-level Operations" />
            <StatBox icon={<Binary size={32}/>} label="4+ Years" sub="Active Field Deployment" />
         </div>
      </section>

      {/* Pillars */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-6">Structural Integrity</div>
                 <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none italic">
                    Human-in-the-<br/>Loop.
                 </h2>
                 <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12">
                    In an era of automation, AGRON asserts that the ultimate failsafe is a trained human operator. 
                    Our algorithms generate scenarios and track performance metrics, but they do not define readiness. Only Level 5 Instructors verify final capability.
                 </p>
                 <div className="space-y-6">
                    <CheckItem title="Deterministic Simulation" desc="Everything in our theater replicates field telemetry with 99.8% accuracy." />
                    <CheckItem title="Closed Governance" desc="Curriculum is reviewed by a board of aviation and defense experts." />
                    <CheckItem title="Privacy Guard" desc="Strict zero-knowledge architecture for operational mission data." />
                 </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[4rem] p-12 lg:p-20 relative group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[120px] rounded-full group-hover:scale-110 transition-transform"></div>
                 <div className="space-y-10 relative z-10">
                    <div className="p-8 bg-white dark:bg-black rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl">
                       <Scale className="text-blue-600 mb-6" size={32} />
                       <h4 className="text-xl font-black uppercase tracking-tight mb-4">Accountability Hierarchy</h4>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-wider leading-relaxed">System-assigned roles are derived from verified performance logs, preventing identity spoofing or privilege escalation.</p>
                    </div>
                    <div className="p-8 bg-white dark:bg-black rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl">
                       <Fingerprint className="text-blue-600 mb-6" size={32} />
                       <h4 className="text-xl font-black uppercase tracking-tight mb-4">Audit Trail Immutable</h4>
                       <p className="text-xs text-slate-500 font-bold uppercase tracking-wider leading-relaxed">Every operator action in the STE is logged to a write-once ledger for after-action review (AAR).</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Safety Matrix */}
      <section className="py-32 px-8 bg-slate-50 dark:bg-zinc-900 border-y border-slate-200 dark:border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-20 items-center justify-between">
               <div className="max-w-2xl">
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-blue-600">SMS Verification.</h3>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">
                     AGRON adopts the Safety Management System framework used by civil aviation authorities worldwide. We move beyond simple checklists to a culture of systematic risk management.
                  </p>
               </div>
               <div className="w-full lg:w-[500px] bg-white dark:bg-black border border-slate-200 dark:border-white/5 rounded-[3rem] p-12 shadow-2xl">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-10">RAM Matrix_Status: ACTIVE</div>
                  <div className="space-y-6">
                     <MatrixItem label="Loss of C2 Link" action="RTH Protocol Verified" />
                     <MatrixItem label="Cell Deviance" action="Landing Override" />
                     <MatrixItem label="GPS Attenuation" action="ATTI Transition Active" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Standards */}
      <section className="py-40 px-8 text-center">
         <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-black uppercase tracking-tight mb-16">Accredited and Compliant.</h3>
            <div className="flex flex-wrap items-center justify-center gap-20 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
               <span className="text-2xl font-black italic">ISO 27001</span>
               <span className="text-2xl font-black italic">ASTM F38</span>
               <span className="text-2xl font-black italic">NIST 800-53</span>
               <span className="text-2xl font-black italic">FAA Compliant</span>
            </div>
         </div>
      </section>

    </div>
  );
};

const StatBox: React.FC<{ icon: React.ReactNode; label: string; sub: string }> = ({ icon, label, sub }) => (
  <div className="text-center group p-12 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-[3rem] transition-all">
     <div className="text-blue-600 mb-8 flex justify-center group-hover:scale-110 transition-transform">{icon}</div>
     <div className="text-5xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">{label}</div>
     <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{sub}</div>
  </div>
);

const CheckItem: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="flex gap-6 items-start">
     <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 mt-1">
        <CheckCircle2 size={14}/>
     </div>
     <div>
        <h4 className="font-black uppercase text-xs tracking-tight mb-1">{title}</h4>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
     </div>
  </div>
);

const MatrixItem: React.FC<{ label: string; action: string }> = ({ label, action }) => (
  <div className="flex justify-between items-center border-b border-slate-100 dark:border-white/5 pb-4">
     <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">{label}</span>
     <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{action}</span>
  </div>
);

export default TrustAndCredibility;
