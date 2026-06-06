
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Cpu, Target, Wind, Shield, Zap, ChevronRight } from 'lucide-react';
import { generateHeroImage } from '../services/geminiService';
import { TrainingModule } from '../types';
import TrainingCard from './TrainingCard';

const TrainingModules: React.FC = () => {
  const { t } = useTranslation();
  const [heroImg, setHeroImg] = useState('');

  useEffect(() => {
    const initVisual = async () => {
      const url = await generateHeroImage('A technical blueprint of various autonomous aerial systems and control nodes, dark professional lighting.');
      if (url) setHeroImg(url);
    };
    initVisual();
  }, []);

  const modules: TrainingModule[] = [
    { id: "FLT-301", title: "Flight Dynamics Advanced", level: "Advanced", duration: "32 Hours", category: "Hardware", status: "In Progress" },
    { id: "NAV-402", title: "Beyond Visual Line of Sight", level: "Advanced", duration: "40 Hours", category: "Flight", status: "Not Started" },
    { id: "GND-205", title: "Field Maintenance Protocols", level: "Foundational", duration: "24 Hours", category: "Systems", status: "Certified" },
    { id: "CFG-500", title: "Instructor: Swarm Configuration", level: "Instructor", duration: "48 Hours", category: "Operations", status: "Not Started" }
  ];

  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white noise-bg light-depth dark:dark-depth overflow-hidden relative">
      {/* GLOBAL GRAPHICS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full animate-float"></div>
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-[0.15]"></div>
        
        {/* Dynamic Scan Line */}
        <div className="absolute inset-x-0 h-px bg-blue-500/20 shadow-[0_0_10px_#3b82f633]">
           <motion.div animate={{ y: ['0vh', '100vh'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="w-full h-full" />
        </div>
      </div>
      
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-zinc-900">
           {heroImg && <img src={heroImg} className="w-full h-full object-cover opacity-40 scale-105 transform-gpu" alt="Training Hero" />}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
        </div>
        
        {/* HUD Elements */}
        <div className="absolute top-20 left-20 hidden lg:block opacity-30 text-[8px] font-mono text-blue-500 space-y-1">
           <div>MODULE_TARGET: OPS_READY</div>
           <div>CURRICULUM_SYNC: 100%</div>
           <div className="w-20 h-0.5 bg-blue-500/30 overflow-hidden">
             <motion.div animate={{ x: [-80, 80] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-blue-500 w-1/2" />
           </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center text-white">
           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-blue-500 font-black text-xs uppercase tracking-[0.5em] mb-8 block">Operational Specialization</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-10 leading-none">
                Mission <br/> <span className="text-blue-600 italic">Mastery.</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-slate-300 max-w-3xl mx-auto leading-relaxed">
                AGRON provides specialized training nodes for every aspect of uncrewed aviation, from hardware maintenance to swarming logic.
              </p>
           </motion.div>
        </div>
      </section>

      {/* ORL Tiers */}
      <section className="py-24 px-8 bg-slate-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
             <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Readiness Levels.</h2>
             <div className="h-1 w-24 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <OrlTier level="01" icon={<Target />} title="Core Flight" desc="Foundational aerodynamics and propulsion systems." />
             <OrlTier level="02" icon={<Cpu />} title="Tactical" desc="Platform-specific dynamics and sensor integration." />
             <OrlTier level="03" icon={<Wind />} title="Endurance" desc="Long-range signal resilience and BVLOS mastery." />
             <OrlTier level="04" icon={<Shield />} title="Command" desc="Multi-drone fleet and swarm coordination protocols." />
          </div>
        </div>
      </section>

      {/* Track List */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
             <h3 className="text-3xl font-black uppercase tracking-tighter">Active Loadout.</h3>
             <button className="flex items-center gap-4 bg-blue-600 text-white px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all hover:gap-6">
                Full Curriculum <ChevronRight size={14} />
             </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map(module => (
              <TrainingCard key={module.id} module={module} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

const OrlTier: React.FC<{ level: string; icon: React.ReactNode; title: string; desc: string }> = ({ level, icon, title, desc }) => (
  <motion.div 
    whileHover={{ x: 10 }}
    className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 p-12 rounded-[3rem] flex flex-col md:flex-row gap-10 items-start md:items-center group"
  >
    <div className="flex-shrink-0 w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-[2rem] flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-soft-xl">
       {React.cloneElement(icon as React.ReactElement, { size: 32 } as any)}
    </div>
    <div className="flex-grow">
       <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Tier_{level}</div>
       <h4 className="text-2xl font-black uppercase mb-3">{title}</h4>
       <p className="text-slate-500 dark:text-slate-400 font-medium">{desc}</p>
    </div>
    <div className="hidden md:block">
       <ChevronRight className="text-slate-200 dark:text-white/10 group-hover:text-blue-600 transition-colors" size={32} />
    </div>
  </motion.div>
);

export default TrainingModules;
