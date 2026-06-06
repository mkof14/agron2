import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Mail } from 'lucide-react';

const ContactForm: React.FC = () => {
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
    <div className="w-full max-w-4xl mx-auto px-6 py-20 border-t border-agron-200 dark:border-white/5">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6 text-agron-blue">
          <Mail size={20} />
          <span className="text-[10px] font-black uppercase tracking-[0.6em]">{t('contact_page.intakeNode')}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6 text-agron-900 dark:text-white">
          {t('contact_page.heroTitle')} <span className="text-agron-blue italic">{t('contact_page.heroTitleItalic')}</span>
        </h2>
        <p className="text-agron-500 dark:text-agron-400 font-medium">
           {t('contact_page.heroSubtitle')}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} key="form">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-agron-900/50 border border-agron-200 dark:border-white/5 rounded-[3rem] p-10 md:p-16 shadow-soft-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <FormField label={t('contact_page.fullName')} name="name" value={formData.name} onChange={handleChange} required />
                <FormField label={t('contact_page.organization')} name="organization" value={formData.organization} onChange={handleChange} />
              </div>
              
              <div className="mb-8">
                <FormField label={t('contact_page.secureEmail')} name="email" value={formData.email} onChange={handleChange} type="email" required />
              </div>

              <div className="mb-10">
                <label className="text-[10px] font-black uppercase tracking-widest text-agron-400 block px-4 mb-4">{t('contact_page.context')}</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-agron-50 dark:bg-black border-2 border-transparent focus:border-agron-blue rounded-3xl p-6 text-sm font-medium outline-none resize-none transition-all"
                  placeholder="..."
                />
              </div>

              <button className="w-full h-20 bg-agron-900 dark:bg-white text-white dark:text-agron-900 rounded-[2rem] font-black uppercase tracking-widest transition-all hover:bg-agron-700 dark:hover:bg-agron-100 active:scale-95 shadow-xl flex items-center justify-center gap-4">
                <Send size={18} /> {t('contact_page.dispatch')}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} key="success" className="bg-emerald-500/10 border border-emerald-500/20 rounded-[3rem] p-20 text-center">
            <CheckCircle2 size={64} className="text-emerald-500 mx-auto mb-8" />
            <h3 className="text-3xl font-black uppercase tracking-tight mb-4 text-agron-900 dark:text-white">{t('contact_page.logged')}</h3>
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-agron-400 mb-8">Reference_ID: {referenceId}</div>
            <p className="text-agron-500 dark:text-agron-400 font-medium max-w-sm mx-auto mb-10">{t('contact_page.logDesc')}</p>
            <button onClick={() => setSubmitted(false)} className="text-xs font-black uppercase tracking-widest text-emerald-500 border-b-2 border-emerald-500 pb-2">{t('contact_page.newThread')}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FormField: React.FC<{ label: string; name: string; value: string; onChange: (e: any) => void; type?: string; required?: boolean }> = ({ label, name, value, onChange, type = 'text', required }) => (
  <div className="space-y-3">
    <label className="text-[10px] font-black uppercase tracking-widest text-agron-400 block px-4 font-mono">{label}</label>
    <input 
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full h-14 bg-agron-50 dark:bg-black border-2 border-transparent focus:border-agron-blue rounded-2xl px-6 text-sm font-bold outline-none transition-all shadow-inner-glow"
      placeholder="..."
    />
  </div>
);

export default ContactForm;
