import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Database, Play, Trash2, Cpu, Globe, Shield, Activity, Save, X, Search, ChevronRight, Wind } from 'lucide-react';
import { generateSimulationScenario, generateHeroImage } from '../services/geminiService';
import { SimulationScenario } from '../types';

const SimulationGenerator: React.FC = () => {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<'generator' | 'repository'>('generator');
  const [environment, setEnvironment] = useState('Urban Corridor');
  const [complexity, setComplexity] = useState('Standard');
  const [systemType, setSystemType] = useState('Multirotor Platform');
  const [loading, setLoading] = useState(false);
  const [scenario, setScenario] = useState<SimulationScenario | null>(null);
  const [aiStatus, setAiStatus] = useState<'ACTIVE' | 'DETERMINISTIC_MODE'>('ACTIVE');
  
  const [workstationImg, setWorkstationImg] = useState('');

  useEffect(() => {
    const initWorkstation = async () => {
      const url = await generateHeroImage('Advanced multi-screen tactical command center for drone mission control, dark high-tech room with holographic maps.');
      if (url) setWorkstationImg(url);
    };
    initWorkstation();
  }, []);

  const [savedScenarios, setSavedScenarios] = useState<SimulationScenario[]>(() => {
    const saved = localStorage.getItem('agron_mission_vault');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('agron_mission_vault', JSON.stringify(savedScenarios));
  }, [savedScenarios]);

  const handleGenerate = async () => {
    setLoading(true);
    setScenario(null);
    try {
      const result = await generateSimulationScenario(environment, complexity, systemType);
      const resultWithId = { ...result, id: `SYN-${Date.now().toString().slice(-6)}` };
      setScenario(resultWithId);
      setAiStatus('ACTIVE');
    } catch (error: any) {
      setAiStatus('DETERMINISTIC_MODE');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveScenario = () => {
    if (scenario) {
      setSavedScenarios(prev => [scenario, ...prev]);
      setActiveView('repository');
    }
  };

  const deleteScenario = (id: string) => {
    setSavedScenarios(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="bg-white dark:bg-black text-slate-900 dark:text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-zinc-900 pointer-events-none">
           {workstationImg && <img src={workstationImg} className="w-full h-full object-cover opacity-30 scale-105 animate-float" alt="Workstation" />}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-black"></div>
           <div className="absolute inset-0 bg-grid-pattern-dark opacity-20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 text-center text-white">
           <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-4 mb-8 text-blue-400 glass px-6 py-2 rounded-full border-blue-500/20">
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-blue-glow" />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">{t('simulation_page.tagline')}</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-10 leading-[0.8] italic glow-text">
                Simulation <br/><span className="text-blue-500 italic drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">Theater.</span>
              </h1>
              <p className="text-xl md:text-3xl font-light text-slate-300 max-w-4xl mx-auto leading-tight italic opacity-90 border-l-4 border-blue-500/30 pl-8 inline-block text-left">
                AGRON STE generates deterministic flight scenarios using <span className="text-white font-medium">high-fidelity physics models</span> to bridge the gap between simulation and real-world execution.
              </p>
           </motion.div>
        </div>

        {/* Radar Effect in Corner */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 opacity-20 pointer-events-none">
           <div className="absolute inset-0 border-2 border-blue-500 rounded-full"></div>
           <motion.div 
             className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full origin-center"
             animate={{ rotate: 360 }}
             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
           />
        </div>
      </section>

      {/* Main Interface */}
      <section className="py-24 px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          
          {/* Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-b border-slate-200 dark:border-white/5 pb-12">
             <div className="flex gap-4 p-2 bg-slate-100 dark:bg-zinc-900 rounded-[2rem]">
                <NavButton active={activeView === 'generator'} onClick={() => setActiveView('generator')} label="Logic Generator" icon={<Terminal size={14}/>} />
                <NavButton active={activeView === 'repository'} onClick={() => setActiveView('repository')} label="Mission Vault" icon={<Database size={14}/>} />
             </div>
             <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                System Status: <span className="text-emerald-500 flex items-center gap-2"> <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {aiStatus} </span>
             </div>
          </div>

          <AnimatePresence mode="wait">
            {activeView === 'generator' ? (
              <motion.div 
                key="generator"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-12"
              >
                {/* Controls */}
                <div className="space-y-8">
                  <ControlGroup label="Environment" value={environment} onChange={setEnvironment} options={['Urban Corridor', 'Rural Ag-Zone', 'Industrial Park', 'Coastal Perimeter']} />
                  <ControlGroup label="Readiness" value={complexity} onChange={setComplexity} options={['Standard', 'Degraded GPS', 'High Turbulence', 'System Failure']} />
                  <ControlGroup label="Platform" value={systemType} onChange={setSystemType} options={['Multirotor Platform', 'Fixed Wing', 'Heavy Lift VTOL', 'Swarm Array']} />
                  
                  <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full h-24 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl shadow-blue-600/20"
                  >
                    {loading ? <Activity className="animate-spin" /> : <Play size={20} />}
                    {loading ? 'Synthesizing...' : 'Generate Mission Logic'}
                  </button>
                </div>

                {/* Display */}
                <div className="lg:col-span-2">
                   {scenario ? (
                     <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[3rem] overflow-hidden">
                        <div className="p-12 border-b border-slate-200 dark:border-white/5 flex justify-between items-center">
                           <div>
                              <div className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em] mb-2">{scenario.id}</div>
                              <h3 className="text-4xl font-black uppercase tracking-tight">{scenario.title}</h3>
                           </div>
                           <button onClick={() => setScenario(null)} className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl hover:text-red-500 transition-colors">
                              <X size={20} />
                           </button>
                        </div>
                        
                        <div className="p-12 space-y-12">
                           <div className="grid grid-cols-2 gap-8">
                              <DataBox label="Environment" value={scenario.environment} icon={<Wind className="text-blue-500"/>} />
                              <DataBox label="Risk Rating" value={scenario.riskLevel} icon={<Shield className="text-amber-500"/>} />
                           </div>
                           
                           <div>
                              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">Mission Objectives</h4>
                              <div className="space-y-4">
                                {scenario.objectives.map((obj, i) => (
                                  <div key={i} className="bg-white dark:bg-black/40 p-6 rounded-3xl flex items-center gap-6 border border-slate-100 dark:border-white/5">
                                     <div className="text-blue-600 font-black text-xs">0{i+1}</div>
                                     <div className="font-bold uppercase text-xs tracking-tight">{obj}</div>
                                  </div>
                                ))}
                              </div>
                           </div>
                           
                           <button 
                             onClick={saveScenario}
                             className="w-full py-6 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-3"
                           >
                              <Save size={16} /> Archive to Mission Vault
                           </button>
                        </div>
                     </div>
                   ) : (
                     <div className="h-full min-h-[600px] border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[4rem] flex flex-col items-center justify-center text-center p-12">
                        <Terminal className="text-slate-200 dark:text-zinc-800 mb-12" size={64} />
                        <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Awaiting Input Parameters</h3>
                        <p className="text-slate-400 font-medium max-w-sm">Define mission logic on the control panel to initiate simulation construction.</p>
                     </div>
                   )}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="repository"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[4rem] overflow-hidden"
              >
                 <div className="p-12 border-b border-slate-200 dark:border-white/5 flex justify-between items-center bg-white/50 dark:bg-zinc-900/50">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Mission Vault</h3>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{savedScenarios.length} Records Indexed</div>
                 </div>
                 
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="text-[10px] uppercase font-black tracking-widest text-slate-400">
                          <tr>
                             <th className="px-12 py-8">Identity</th>
                             <th className="px-12 py-8">Designation</th>
                             <th className="px-12 py-8">Platform</th>
                             <th className="px-12 py-8">Risk</th>
                             <th className="px-12 py-8 text-right">Delete</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                          {savedScenarios.map(s => (
                            <tr key={s.id} className="group hover:bg-white dark:hover:bg-black/20 transition-colors">
                               <td className="px-12 py-8 font-mono text-[10px] text-blue-600">{s.id}</td>
                               <td className="px-12 py-8 font-black uppercase text-xs tracking-tight">{s.title}</td>
                               <td className="px-12 py-8 text-xs font-medium text-slate-500">{s.platformType}</td>
                               <td className="px-12 py-8">
                                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${s.riskLevel === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                     {s.riskLevel}
                                  </span>
                               </td>
                               <td className="px-12 py-8 text-right">
                                  <button onClick={() => deleteScenario(s.id)} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                                     <Trash2 size={18} />
                                  </button>
                               </td>
                            </tr>
                          ))}
                          {savedScenarios.length === 0 && (
                            <tr>
                               <td colSpan={5} className="py-24 text-center">
                                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No records archived.</p>
                               </td>
                            </tr>
                          )}
                       </tbody>
                    </table>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all ${active ? 'bg-white dark:bg-black text-blue-600 shadow-xl' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
  >
    {icon} {label}
  </button>
);

const ControlGroup: React.FC<{ label: string; value: string; onChange: (v: string) => void; options: string[] }> = ({ label, value, onChange, options }) => (
  <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem]">
     <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6">{label}</label>
     <div className="space-y-2">
        {options.map(opt => (
          <button 
            key={opt}
            onClick={() => onChange(opt)}
            className={`w-full text-left px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-tight transition-all border ${value === opt ? 'bg-blue-600 text-white border-transparent' : 'bg-white dark:bg-black border-slate-200 dark:border-white/5 text-slate-500 hover:border-blue-600/50'}`}
          >
            {opt}
          </button>
        ))}
     </div>
  </div>
);

const DataBox: React.FC<{ label: string; value: string; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-white dark:bg-black/40 p-8 rounded-3xl border border-slate-100 dark:border-white/5">
     <div className="flex items-center gap-4 mb-4">
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
     </div>
     <div className="text-xl font-black uppercase tracking-tight">{value}</div>
  </div>
);

export default SimulationGenerator;
