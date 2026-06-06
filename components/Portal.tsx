import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, LayoutDashboard, ClipboardList, Award, User, 
  LogOut, Shield, ChevronRight, Activity, Download, Upload, 
  Settings, Key, Fingerprint, Search 
} from 'lucide-react';
import { OperatorProfile as ProfileType, SystemBackup } from '../types';

type PortalView = 'dashboard' | 'training-history' | 'certificates' | 'identity';

const MOCK_TRAINING_HISTORY = [
  { id: "REQ-2024-001", name: "Visual Line of Sight (VLOS)", date: "2024-10-15", status: "Requested" },
  { id: "TRN-2024-88A", name: "Heavy Lift Payload Calibration", date: "2024-08-20", status: "In Progress" },
  { id: "TRN-2024-10C", name: "Foundational Flight (ORL-1)", date: "2024-02-10", status: "Completed", score: 94 },
  { id: "OPS-2023-99X", name: "Urban Interface Recovery", date: "2023-11-05", status: "Completed", score: 88 },
];

const DEFAULT_PROFILE: ProfileType = {
  id: "TC-8821-X",
  fullName: "Alexei Volkov",
  callsign: "VANGUARD",
  clearanceLevel: "L3 - INSTRUCTOR",
  certifications: ["Advanced Night Ops", "Multispectral Survey", "AgOps Spraying", "Urban SAR"],
  flightHours: 145,
  lastAssessmentDate: "2024-05-15"
};

const Portal: React.FC = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [activeView, setActiveView] = useState<PortalView>('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<ProfileType>(() => {
    const saved = localStorage.getItem('agron_operator_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  useEffect(() => {
    const session = sessionStorage.getItem('agron_portal_session');
    if (session === 'active') setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.length > 3) {
      setIsAuthenticated(true);
      sessionStorage.setItem('agron_portal_session', 'active');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('agron_portal_session');
    setAccessCode('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[3rem] p-12 shadow-2xl">
            <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white mb-10 shadow-xl shadow-blue-600/20">
               <Fingerprint size={32} />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tight mb-8">Secure Access Hub</h1>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed uppercase text-xs tracking-widest">Authorized personnel only. Encrypted channel active.</p>
            
            <form onSubmit={handleLogin} className="space-y-6">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Access Identity Code</label>
                  <input 
                    type="password"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="w-full h-16 bg-slate-100 dark:bg-black rounded-2xl px-6 text-center text-xl font-mono border-none focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="••••••••"
                  />
               </div>
               <button className="w-full h-20 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-600/20">
                  Authorize Signal
               </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col lg:flex-row selection:bg-blue-600 selection:text-white">
      
      {/* Sidebar */}
      <aside className="w-full lg:w-80 bg-slate-50 dark:bg-zinc-900 border-r border-slate-200 dark:border-white/5 flex flex-col p-8 lg:p-12">
         <div className="flex items-center gap-6 mb-16 px-4">
            <div className="w-14 h-14 bg-white dark:bg-black rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/10 text-blue-600 font-black">
               {profile.callsign.substring(0, 2)}
            </div>
            <div>
               <div className="text-lg font-black uppercase tracking-tight">{profile.callsign}</div>
               <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{profile.id}</div>
            </div>
         </div>

         <nav className="space-y-2 flex-grow">
            <SideNav active={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} label="Summary" icon={<LayoutDashboard size={20}/>} />
            <SideNav active={activeView === 'training-history'} onClick={() => setActiveView('training-history')} label="History" icon={<ClipboardList size={20}/>} />
            <SideNav active={activeView === 'certificates'} onClick={() => setActiveView('certificates')} label="Credentials" icon={<Award size={20}/>} />
            <SideNav active={activeView === 'identity'} onClick={() => setActiveView('identity')} label="Data Identity" icon={<User size={20}/>} />
         </nav>

         <div className="pt-8 border-t border-slate-200 dark:border-white/5 mt-auto">
            <button onClick={handleLogout} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors w-full px-4 py-4">
               <LogOut size={18} /> Terminate Session
            </button>
         </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-8 lg:p-20 overflow-y-auto">
         <header className="mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            <div>
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2">Authenticated System Access</div>
               <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">
                  {activeView === 'dashboard' && 'Operations Dashboard'}
                  {activeView === 'training-history' && 'Mission History'}
                  {activeView === 'certificates' && 'Certification Vault'}
                  {activeView === 'identity' && 'Operator Record'}
               </h2>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
               Status: <span className="text-emerald-500 flex items-center gap-2"> <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Online_SEC </span>
            </div>
         </header>

         <AnimatePresence mode="wait">
            {activeView === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                 {/* Top Cards */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard label="Flight Hours" value={profile.flightHours.toString()} sub="Verified Airtime" color="blue" />
                    <StatCard label="ORL Tier" value={profile.clearanceLevel.split(' - ')[0]} sub={profile.clearanceLevel.split(' - ')[1]} color="amber" />
                    <StatCard label="Missions" value={MOCK_TRAINING_HISTORY.length.toString()} sub="Completed Sorties" color="emerald" />
                 </div>

                 {/* Notifications / News */}
                 <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[3rem] p-12 flex items-start gap-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white flex-shrink-0">
                       <Activity size={28} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-blue-600">Operational Notice</h3>
                       <p className="text-slate-500 font-medium leading-relaxed max-w-2xl">
                          Your next certification renewal is scheduled in 24 days. Advanced "Urban Interface" modules are now available for Level 3 operators.
                       </p>
                    </div>
                 </div>
              </motion.div>
            )}

            {activeView === 'training-history' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                 <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[3rem] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                       <thead className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          <tr className="border-b border-slate-200 dark:border-white/5">
                             <th className="px-12 py-8">Designation</th>
                             <th className="px-12 py-8">Theater Module</th>
                             <th className="px-12 py-8">Timestamp</th>
                             <th className="px-12 py-8">Outcome</th>
                             <th className="px-12 py-8 text-right underline decoration-blue-600">Metric</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                          {MOCK_TRAINING_HISTORY.map(record => (
                            <tr key={record.id} className="group hover:bg-white dark:hover:bg-black/20 transition-colors">
                               <td className="px-12 py-8 font-mono text-[10px] text-blue-600">{record.id}</td>
                               <td className="px-12 py-8 font-black uppercase text-xs tracking-tight">{record.name}</td>
                               <td className="px-12 py-8 text-xs font-medium text-slate-500">{record.date}</td>
                               <td className="px-12 py-8">
                                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${record.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                     {record.status}
                                  </span>
                               </td>
                               <td className="px-12 py-8 text-right font-black text-xs">{record.score ? `${record.score}%` : '---'}</td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </motion.div>
            )}

            {activeView === 'certificates' && (
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {profile.certifications.map((cert, index) => (
                    <div key={index} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[3rem] p-12 transition-all hover:bg-white dark:hover:bg-zinc-800 hover:shadow-2xl hover:shadow-blue-600/10 group">
                       <Award className="text-blue-600 mb-8 group-hover:scale-110 transition-transform" size={40} />
                       <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{cert}</h3>
                       <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-10">Valid Through 2026 // Auth_Ref: {profile.id}-CRT-{index+1}</div>
                       <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-600 border-b-2 border-blue-600 pb-2">
                          <Download size={14} /> Download Credential
                       </button>
                    </div>
                 ))}
              </motion.div>
            )}

            {activeView === 'identity' && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[4rem] p-12 lg:p-20">
                 <div className="flex justify-between items-center mb-16 border-b border-slate-200 dark:border-white/5 pb-12">
                    <h3 className="text-3xl font-black uppercase tracking-tight">System Data Protocol</h3>
                    <button onClick={() => setIsEditing(!isEditing)} className="px-8 py-3 bg-white dark:bg-black border border-slate-200 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                       {isEditing ? 'Save Changes' : 'Modify Record'}
                    </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="space-y-12">
                       <Field label="Full Operator Name" value={profile.fullName} editing={isEditing} onChange={(val) => setProfile({...profile, fullName: val})} />
                       <Field label="Tactical Callsign" value={profile.callsign} editing={isEditing} onChange={(val) => setProfile({...profile, callsign: val})} />
                       <div className="bg-white dark:bg-black/40 p-8 rounded-3xl border border-slate-100 dark:border-white/5">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">Total Training Flight Hours</label>
                          <div className="text-3xl font-black">{profile.flightHours}h</div>
                       </div>
                    </div>

                    <div className="bg-white dark:bg-black/60 rounded-[3rem] p-12 border border-slate-100 dark:border-white/5 h-fit">
                       <Shield className="text-blue-600 mb-8" size={32} />
                       <h4 className="text-xl font-black uppercase tracking-tight mb-4">Data Portability</h4>
                       <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium uppercase text-xs tracking-wider">AGRON enforces zero-knowledge architecture. All credentials and mission history remain local to your deployment node unless manually exported for audit.</p>
                       <div className="flex flex-col gap-4">
                          <button className="h-16 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                             <Upload size={16} /> Restore from Archive
                          </button>
                          <button className="h-16 border border-slate-200 dark:border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3">
                             <Download size={16} /> Export System Logic
                          </button>
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

const SideNav: React.FC<{ active: boolean; onClick: () => void; label: string; icon: React.ReactNode }> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`w-full px-8 py-6 rounded-[2rem] flex items-center gap-6 transition-all group ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20 scale-105' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
  >
     <div className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`}>{icon}</div>
     <span className="text-sm font-black uppercase tracking-widest">{label}</span>
     {active && <ChevronRight className="ml-auto" size={14} />}
  </button>
);

const StatCard: React.FC<{ label: string; value: string; sub: string; color: string }> = ({ label, value, sub, color }) => (
  <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 p-12 rounded-[3.5rem] group hover:bg-white dark:hover:bg-zinc-800 transition-all hover:shadow-2xl">
     <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8">{label}</div>
     <div className={`text-6xl font-black tracking-tighter mb-2 text-${color}-600`}>{value}</div>
     <div className="text-xs font-bold uppercase text-slate-500 tracking-tight">{sub}</div>
  </div>
);

const Field: React.FC<{ label: string; value: string; editing: boolean; onChange: (v: string) => void }> = ({ label, value, editing, onChange }) => (
  <div className="space-y-4">
     <label className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 block px-4">{label}</label>
     {editing ? (
       <input 
         type="text" 
         value={value} 
         onChange={(e) => onChange(e.target.value)}
         className="w-full h-16 bg-white dark:bg-black rounded-2xl px-6 border-2 border-blue-600/20 focus:border-blue-600 outline-none text-sm font-bold"
       />
     ) : (
       <div className="px-4 text-xl font-black uppercase tracking-tight">{value}</div>
     )}
  </div>
);

export default Portal;
