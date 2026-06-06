import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Activity, Settings, Terminal, 
  Database, Server, Cpu, Globe, 
  Lock, Trash2, Save, Play, ChevronRight, HardHat
} from 'lucide-react';
import SystemDiagnostics from './SystemDiagnostics';

type AdminView = 'dev-profile' | 'diagnostics' | 'github-integration' | 'dashboard';

interface DeployLog {
  time: string;
  type: 'SYS' | 'GH' | 'VERCEL' | 'SEC' | 'DEV';
  msg: string;
  status: 'info' | 'success' | 'warn' | 'err';
}

interface DevProfile {
  name: string;
  engId: string;
  githubHandle: string;
  githubRepoUrl: string;
  role: string;
  node: string;
}

const AdminConsole: React.FC = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<AdminView>('dev-profile');
  const [ghStatus, setGhStatus] = useState<'CONNECTED' | 'DETACHED'>('DETACHED');
  const [githubToken, setGithubToken] = useState('');
  
  const [devProfile, setDevProfile] = useState<DevProfile>(() => {
    const saved = localStorage.getItem('agron_dev_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Infrastructure Engineer',
      engId: 'ENG-4402-DELTA',
      githubHandle: 'mkof14',
      githubRepoUrl: 'https://github.com/mkof14/agron.git',
      role: 'System Architect',
      node: 'USA-IAD-01'
    };
  });

  const [logs, setLogs] = useState<DeployLog[]>([
    { time: new Date().toLocaleTimeString('en-GB'), type: 'SYS', msg: 'Identity Shift Detected: agron platform core.', status: 'info' },
    { time: new Date().toLocaleTimeString('en-GB'), type: 'GH', msg: 'Target Repository: mkof14/agron established.', status: 'success' },
  ]);

  const addLog = (type: DeployLog['type'], msg: string, status: DeployLog['status'] = 'info') => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [{ time, type, msg, status }, ...prev].slice(0, 50));
  };

  const saveDevProfile = () => {
    localStorage.setItem('agron_dev_profile', JSON.stringify(devProfile));
    addLog('DEV', `Identity committed to repository: ${devProfile.githubRepoUrl}`, 'success');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-zinc-900 border border-white/5 rounded-[3rem] p-12 text-center shadow-2xl">
           <div className="w-20 h-20 bg-amber-600 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-10 shadow-xl shadow-amber-600/20">
              <ShieldCheck size={32} />
           </div>
           <h2 className="text-4xl font-black uppercase tracking-tight text-white mb-6 leading-none">Admin Auth</h2>
           <p className="text-slate-500 font-medium uppercase text-[10px] tracking-widest mb-10">Restricted NOC Control Tunnel</p>
           <button 
             onClick={() => setIsAuthenticated(true)}
             className="w-full h-20 bg-amber-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-amber-700 transition-all active:scale-95 shadow-xl shadow-amber-600/20"
           >
              Establish Session
           </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex flex-col lg:flex-row selection:bg-amber-600">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-black/40 border-r border-white/5 flex flex-col p-10 lg:p-12">
         <div className="flex items-center gap-6 mb-16 border-b border-white/5 pb-12">
            <div className="w-12 h-12 bg-amber-600 rounded-2xl flex items-center justify-center text-white">
               <Cpu size={24} />
            </div>
            <div>
               <h1 className="text-2xl font-black uppercase tracking-tighter text-white">agron.noc</h1>
               <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Node_Control_v5.2</div>
            </div>
         </div>

         <nav className="space-y-3 flex-grow">
            <AdminNav active={activeView === 'dev-profile'} onClick={() => setActiveView('dev-profile')} label="System Identity" icon={<Settings size={18}/>} />
            <AdminNav active={activeView === 'github-integration'} onClick={() => setActiveView('github-integration')} label="Deploy Logic" icon={<Server size={18}/>} />
            <AdminNav active={activeView === 'diagnostics'} onClick={() => setActiveView('diagnostics')} label="Test Array" icon={<Activity size={18}/>} />
            <AdminNav active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} label="NOC Visual" icon={<Terminal size={18}/>} />
         </nav>

         <div className="pt-10 border-t border-white/5 mt-auto">
            <button onClick={() => setIsAuthenticated(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors w-full flex items-center gap-3">
               <Lock size={12} /> Terminate Tunnel
            </button>
         </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-8 lg:p-20 overflow-y-auto bg-black">
         <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <h2 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">
               {activeView === 'dev-profile' && 'Identity Core'}
               {activeView === 'diagnostics' && 'Infra Test'}
               {activeView === 'github-integration' && 'Platform Hub'}
               {activeView === 'dashboard' && 'NOC Summary'}
            </h2>
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
               NOC Status: <span className="text-emerald-500 flex items-center gap-2"> <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online </span>
            </div>
         </header>

         <AnimatePresence mode="wait">
            {activeView === 'diagnostics' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                 <SystemDiagnostics />
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 
                 <div className="lg:col-span-2 space-y-12">
                    {activeView === 'dev-profile' && (
                      <div className="bg-zinc-900/50 border border-white/5 rounded-[3rem] p-12 space-y-12">
                         <h3 className="text-2xl font-black uppercase tracking-tight text-white border-b border-white/5 pb-8">Configuration Parameters</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <AdminField label="Repository Root" value={devProfile.githubRepoUrl} onChange={(v) => setDevProfile({...devProfile, githubRepoUrl: v})} />
                            <AdminField label="Engineer Name" value={devProfile.name} onChange={(v) => setDevProfile({...devProfile, name: v})} />
                            <AdminField label="GitHub Handle" value={devProfile.githubHandle} onChange={(v) => setDevProfile({...devProfile, githubHandle: v})} />
                            <div className="flex items-end">
                               <button onClick={saveDevProfile} className="w-full h-16 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-amber-700 transition-all flex items-center justify-center gap-3">
                                  <Save size={18} /> Commit Shift
                               </button>
                            </div>
                         </div>
                      </div>
                    )}

                    {activeView === 'github-integration' && (
                      <div className="bg-zinc-900/50 border border-white/5 rounded-[3rem] p-12 space-y-12">
                         <h3 className="text-2xl font-black uppercase tracking-tight text-white border-b border-white/5 pb-8">Platform Control Hub</h3>
                         <div className="space-y-8">
                            <AdminField label="Personal Access Token" value={githubToken} onChange={setGithubToken} isPassword />
                            <div className="flex gap-4">
                               <button onClick={() => setGhStatus('CONNECTED')} className="flex-1 h-16 border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">Establish Link</button>
                               {ghStatus === 'CONNECTED' && (
                                 <button className="flex-1 h-16 bg-amber-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 hover:bg-amber-700 shadow-xl shadow-amber-600/20">
                                    <Play size={16} /> Deploy Production
                                 </button>
                               )}
                            </div>
                         </div>
                      </div>
                    )}
                 </div>

                 {/* Console / Logs */}
                 <div className="lg:col-span-1">
                    <div className="bg-zinc-950 border border-white/5 rounded-[3rem] h-[600px] flex flex-col overflow-hidden shadow-2xl">
                       <div className="p-8 border-b border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                          <span>NOC_EVENT_LOG</span>
                          <button onClick={() => setLogs([])} className="hover:text-white"><Trash2 size={12} /></button>
                       </div>
                       <div className="flex-grow p-8 overflow-y-auto space-y-4 font-mono text-[11px] text-slate-600">
                          {logs.map((log, i) => (
                            <div key={i} className="flex gap-4 border-b border-white/5 pb-4 last:border-0">
                               <span className="text-slate-800">[{log.time}]</span>
                               <span className="text-amber-600">[{log.type}]</span>
                               <span className={log.status === 'success' ? 'text-emerald-500' : 'text-slate-400'}>{log.msg}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>

              </motion.div>
            )}
         </AnimatePresence>
      </main>

    </div>
  );
};

const AdminNav: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`w-full px-8 py-5 rounded-2xl flex items-center gap-6 transition-all group ${active ? 'bg-amber-600 text-white shadow-xl shadow-amber-600/20' : 'text-slate-500 hover:text-white'}`}
  >
     <div className={`${active ? 'text-white' : 'text-slate-600 group-hover:text-amber-600'} transition-colors`}>{icon}</div>
     <span className="text-xs font-black uppercase tracking-widest">{label}</span>
  </button>
);

const AdminField: React.FC<{ label: string; value: string; onChange: (v: string) => void; isPassword?: boolean }> = ({ label, value, onChange, isPassword }) => (
  <div className="space-y-4 flex-grow">
     <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">{label}</label>
     <input 
        type={isPassword ? 'password' : 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-16 bg-black border border-white/10 rounded-2xl px-6 text-sm font-bold text-white focus:border-amber-600 outline-none transition-colors"
        placeholder="..."
     />
  </div>
);

export default AdminConsole;
