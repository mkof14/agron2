
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Clock, Award, Filter, ArrowRight, Tag } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  focus: string;
  droneClass: string;
  format: string;
  duration: string;
  outcome: string;
}

const CourseCatalog: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const catalogData: { level: string; courses: Course[] }[] = [
    {
      level: "Foundations (ORL-1)",
      courses: [
        { id: "FLT-101", title: "Uncrewed Systems Maintenance", description: "Introduction to airframe inspections and field repair for agricultural platforms.", focus: "Systems", droneClass: "Hardware", format: "Laboratory", duration: "16 Hours", outcome: "Tech Safety Qual" },
        { id: "NAV-101", title: "Flight Principles 101", description: "Understanding lift, drag, and autonomous flight stability logic.", focus: "Flight", droneClass: "Aerodynamics", format: "Classroom", duration: "20 Hours", outcome: "Pilot Technician Cert" }
      ]
    },
    {
      level: "Specialized Ops (ORL-2)",
      courses: [
        { id: "AGR-200", title: "Multispectral Data Analysis", description: "Managing variable rate flow controllers and processing NVDI crop data streams.", focus: "AgOps", droneClass: "Ag-Systems", format: "Simulation", duration: "32 Hours", outcome: "AgOps Specialist L1" },
        { id: "SRV-202", title: "Spatial Data Modeling", description: "Advanced LiDAR data processing for infrastructure auditing and digital twinning.", focus: "Systems", droneClass: "Survey", format: "Simulation", duration: "24 Hours", outcome: "Survey Pilot Qual" }
      ]
    },
    {
      level: "Advanced Mission (ORL-3)",
      courses: [
        { id: "Urb-305", title: "Urban Interface Recovery", description: "High-stress navigation in signal-contested metropolitan corridors.", focus: "Flight", droneClass: "Tactical", format: "Laboratory", duration: "40 Hours", outcome: "Urban Endorsement" },
        { id: "SWM-310", title: "Asset Swarm Synchronization", description: "Managing multiple autonomous assets from a single command node for national scale.", focus: "Operations", droneClass: "Swarm", format: "Command Node", duration: "32 Hours", outcome: "Fleet Mission Manager" }
      ]
    }
  ];

  const filteredCatalog = useMemo(() => {
    return catalogData.map(group => ({
      ...group,
      courses: group.courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             course.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === 'All' || course.focus === activeFilter || course.droneClass === activeFilter;
        return matchesSearch && matchesFilter;
      })
    })).filter(group => group.courses.length > 0);
  }, [searchQuery, activeFilter]);

  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white noise-bg light-depth dark:dark-depth overflow-hidden relative">
      {/* GLOBAL BACKGROUND ENHANCEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-10"></div>
        {/* Animated Data Stream */}
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-blue-500/10 hidden lg:block">
           <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="w-full h-40 bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
      </div>
      
      {/* Header */}
      <section className="relative bg-slate-50 dark:bg-zinc-950 py-32 border-b border-white/5 overflow-hidden">
        {/* Decorative HUD bits */}
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
           <Search size={400} />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-blue-500 font-black text-xs uppercase tracking-[0.5em] mb-6 block">Resource Library</span>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-10 leading-none">
                Course <span className="text-blue-600 italic">Inventory.</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-slate-500 max-w-2xl">
                A comprehensive registry of operational certification modules, from foundational flight mechanics to terminal swarming logic.
              </p>
            </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-8 items-center justify-between">
           <div className="relative w-full md:w-96 group">
             <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
             <input 
               type="text" 
               placeholder="Search registry..." 
               className="w-full bg-slate-100 dark:bg-white/5 border border-transparent focus:border-blue-500/50 rounded-full py-4 pl-14 pr-6 text-sm font-bold placeholder:text-slate-500 outline-none transition-all"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
           
           <div className="flex flex-wrap gap-2">
             {['All', 'Flight', 'Systems', 'AgOps', 'Analysis', 'Operations'].map(f => (
               <button 
                 key={f}
                 onClick={() => setActiveFilter(f)}
                 className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === f ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10'}`}
               >
                 {f}
               </button>
             ))}
           </div>
        </div>
      </section>

      <section className="py-24 px-8 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-32">
          <AnimatePresence mode="popLayout">
            {filteredCatalog.map((group) => (
              <motion.div 
                key={group.level} 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center gap-6 mb-12">
                   <div className="h-[2px] flex-grow bg-blue-600/20"></div>
                   <h2 className="text-3xl font-black uppercase tracking-tighter text-blue-600">{group.level}</h2>
                   <div className="h-[2px] flex-grow bg-blue-600/20"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {group.courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredCatalog.length === 0 && (
            <div className="py-32 text-center">
               <p className="text-2xl font-black uppercase text-slate-500">No matching modules found in the registry.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <motion.button 
    whileHover={{ y: -8, scale: 1.01 }}
    className="w-full text-left bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 p-12 rounded-[3rem] group hover:border-blue-600/50 transition-all shadow-soft-xl hover:shadow-soft-3xl"
  >
    <div className="flex justify-between items-start mb-10">
      <div className="flex items-center gap-3 bg-blue-600/10 text-blue-600 px-4 py-2 rounded-full">
        <Tag size={12} />
        <span className="text-[10px] font-black uppercase tracking-widest">{course.id}</span>
      </div>
      <div className="px-5 py-2 bg-white dark:bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-blue-500 transition-colors">
        {course.format}
      </div>
    </div>

    <h3 className="text-3xl font-black uppercase tracking-tight mb-6 group-hover:text-blue-600 transition-colors">{course.title}</h3>
    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 h-16 line-clamp-2">{course.description}</p>
    
    <div className="grid grid-cols-2 gap-6 pt-10 border-t border-slate-200 dark:border-white/5">
       <div className="flex items-center gap-3 text-slate-400 group-hover:text-amber-500 transition-colors">
          <Clock size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">{course.duration}</span>
       </div>
       <div className="flex items-center gap-3 text-slate-400 group-hover:text-emerald-500 transition-colors">
          <Award size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest truncate">{course.outcome}</span>
       </div>
    </div>
    
    <div className="mt-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
       <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.4em] text-blue-600">
          Enroll Module <ArrowRight size={14} />
       </div>
    </div>
  </motion.button>
);

export default CourseCatalog;
