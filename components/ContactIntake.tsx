import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Shield, Globe, HardHat, Building2, User, ChevronRight, Mail, MessageSquare } from 'lucide-react';

const ContactIntake: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    inquiryType: 'Individual Training',
    sector: 'Infrastructure',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `INC-${Math.floor(Math.random() * 10000)}-${new Date().getFullYear()}`;
    setReferenceId(id);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white dark:bg-[#020617] text-slate-900 dark:text-white flex flex-col selection:bg-blue-600 selection:text-white overflow-hidden relative">
      {/* GLOBAL BACKGROUND ENHANCEMENTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-10"></div>
        {/* Decorative Circles */}
        <svg viewBox="0 0 1000 1000" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] opacity-[0.03] animate-slow-spin">
           <circle cx="500" cy="500" r="480" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="20 20" />
           <circle cx="500" cy="500" r="300" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>
      
      {/* Hero */}
      <section className="relative py-40 px-8 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center opacity-20 scale-105 transform-gpu"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950"></div>
        
        {/* Tactical HUD Header */}
        <div className="absolute top-24 right-20 hidden lg:block opacity-40">
           <div className="text-[8px] font-mono text-blue-500 space-y-2 text-right">
              <div>INTAKE_NODE: ACTIVE</div>
              <div>ENCRYPTION: AES_256</div>
              <div className="flex gap-1 items-center justify-end">
                 <div className="w-12 h-1 bg-blue-500/30 rounded-full overflow-hidden">
                    <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 4, repeat: Infinity }} className="h-full bg-blue-500" />
                 </div>
                 <span>UPLOADING...</span>
              </div>
           </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-4 mb-4 text-blue-500">
                 <Mail size={20}/>
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">{t('contact_page.intakeNode')}</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-10 text-white leading-none">
                {t('contact_page.heroTitle')} <span className="text-blue-500 italic">{t('contact_page.heroTitleItalic')}</span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-slate-300 max-w-4xl leading-relaxed">
                 {t('contact_page.heroSubtitle')}
              </p>
           </motion.div>
        </div>
      </section>

      {/* Main Interface */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
              
              {/* Paths */}
              <div className="lg:col-span-4 space-y-12">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-4">{t('contact_page.opsRouting')}</div>
                 <h2 className="text-3xl font-black uppercase tracking-tight mb-8">{t('contact_page.inquiryPaths')}</h2>
                 
                 <div className="space-y-8">
                    <PathItem icon={<User size={18}/>} title={t('contact_page.path1Title')} desc={t('contact_page.path1Desc')} />
                    <PathItem icon={<Building2 size={11}/>} title={t('contact_page.path2Title')} desc={t('contact_page.path2Desc')} />
                    <PathItem icon={<Globe size={18}/>} title={t('contact_page.path3Title')} desc={t('contact_page.path3Desc')} />
                 </div>
                 
                 <div className="p-8 bg-slate-50 dark:bg-zinc-900 rounded-[2.5rem] border border-slate-200 dark:border-white/5">
                    <Shield className="text-blue-600 mb-6" size={24} />
                    <h4 className="text-xs font-black uppercase tracking-widest mb-2 text-blue-600">{t('contact_page.secureProtocol')}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{t('contact_page.protocolDesc')}</p>
                 </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-8">
                 <AnimatePresence mode="wait">
                    {!submitted ? (
                      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} key="form">
                        <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[4rem] p-12 lg:p-20 shadow-2xl">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                              <FormField label={t('contact_page.fullName')} name="name" value={formData.name} onChange={handleChange} required />
                              <FormField label={t('contact_page.organization')} name="organization" value={formData.organization} onChange={handleChange} />
                           </div>
                           
                           <div className="mb-10">
                              <FormField label={t('contact_page.secureEmail')} name="email" value={formData.email} onChange={handleChange} type="email" required />
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                              <SelectField label={t('contact_page.category')} name="inquiryType" value={formData.inquiryType} onChange={handleChange} options={[
                                t('contact_page.categories.individual'),
                                t('contact_page.categories.team'),
                                t('contact_page.categories.agops'),
                                t('contact_page.categories.defense')
                              ]} />
                              <SelectField label={t('contact_page.sector')} name="sector" value={formData.sector} onChange={handleChange} options={[
                                t('contact_page.sectors.infra'),
                                t('contact_page.sectors.safety'),
                                t('contact_page.sectors.agri'),
                                t('contact_page.sectors.military')
                              ]} />
                           </div>

                           <div className="mb-12">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-4 mb-4">{t('contact_page.context')}</label>
                              <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full bg-white dark:bg-black border-2 border-transparent focus:border-blue-600 rounded-3xl p-8 text-sm font-medium outline-none resize-none transition-all"
                                placeholder="..."
                              />
                           </div>

                           <button className="w-full h-24 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest transition-all hover:bg-blue-700 active:scale-95 shadow-2xl shadow-blue-600/20 flex items-center justify-center gap-4">
                              <Send size={20} /> {t('contact_page.dispatch')}
                           </button>
                        </form>
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key="success" className="bg-emerald-500/10 border border-emerald-500/20 rounded-[4rem] p-24 text-center">
                         <CheckCircle2 size={80} className="text-emerald-500 mx-auto mb-10" />
                         <h3 className="text-4xl font-black uppercase tracking-tight mb-4">{t('contact_page.logged')}</h3>
                         <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-10">Reference_ID: {referenceId}</div>
                         <p className="text-slate-500 font-medium max-w-sm mx-auto mb-12">{t('contact_page.logDesc')}</p>
                         <button onClick={() => setSubmitted(false)} className="text-xs font-black uppercase tracking-widest text-emerald-500 border-b-2 border-emerald-500 pb-2">{t('contact_page.newThread')}</button>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>

           </div>
        </div>
      </section>

    </div>
  );
};

const PathItem: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <div className="flex gap-6 group hover:bg-slate-50 dark:hover:bg-zinc-800 p-6 rounded-[2rem] transition-all">
     <div className="w-12 h-12 bg-white dark:bg-black rounded-2xl flex items-center justify-center border border-slate-200 dark:border-white/5 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
        {icon}
     </div>
     <div className="flex-1">
        <h4 className="font-black uppercase text-xs tracking-tight mb-1">{title}</h4>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
     </div>
  </div>
);

const FormField: React.FC<{ label: string; name: string; value: string; onChange: (e: any) => void; type?: string; required?: boolean }> = ({ label, name, value, onChange, type = 'text', required }) => (
  <div className="space-y-4">
     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-4">{label}</label>
     <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full h-16 bg-white dark:bg-black border-2 border-transparent focus:border-blue-600 rounded-2xl px-6 text-sm font-bold outline-none transition-all shadow-sm"
        placeholder="..."
     />
  </div>
);

const SelectField: React.FC<{ label: string; name: string; value: string; onChange: (e: any) => void; options: string[] }> = ({ label, name, value, onChange, options }) => (
  <div className="space-y-4">
     <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block px-4">{label}</label>
     <select 
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-16 bg-white dark:bg-black border-2 border-transparent focus:border-blue-600 rounded-2xl px-6 text-sm font-bold outline-none transition-all shadow-sm appearance-none cursor-pointer"
     >
        {options.map(opt => <option key={opt}>{opt}</option>)}
     </select>
  </div>
);

export default ContactIntake;
