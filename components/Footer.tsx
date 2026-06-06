import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronUp, ArrowUpRight, Sun, Moon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { languages } from '../types';
import ContactForm from './ContactForm';
import BrandLogo from './BrandLogo';

interface FooterProps {
   setActiveTab?: (tab: string) => void;
   theme?: string;
   toggleTheme?: () => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveTab, theme, toggleTheme }) => {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  const openModal = (key: string) => {
    setModalContent({
      title: t(`footer.${key}`),
      content: t(`footer.content.${key}`)
    });
  };

  return (
    <footer className="bg-agron-100 dark:bg-agron-950 text-agron-500 border-t border-agron-200 dark:border-white/5 py-10 px-8 font-sans overflow-hidden transition-colors duration-700 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-agron-blue to-transparent opacity-20"></div>
      
      <div className="max-w-6xl mx-auto mb-8">
        <ContactForm />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Brand */}
	          <div className="lg:col-span-4">
	             <div className="mb-8 relative inline-block group cursor-pointer" onClick={() => setActiveTab?.('home')}>
	                <BrandLogo variant="footer" className="transition group-hover:scale-[1.03]" />
	             </div>
             <p className="text-xl font-light leading-relaxed mb-8 max-w-sm text-agron-600 dark:text-agron-400">
                {t('footer.description')}
             </p>
             <div className="flex flex-wrap gap-3">
                <SocialLink label="YouTube" href="https://www.youtube.com/watch?v=tansFOZdKRo" brand="youtube" />
                <SocialLink label="Facebook" href="https://www.facebook.com/" brand="facebook" />
                <SocialLink label="Instagram" href="https://www.instagram.com/" brand="instagram" />
                <SocialLink label="X" href="https://x.com/" brand="x" />
                <SocialLink label="LinkedIn" href="https://www.linkedin.com/" brand="linkedin" />
             </div>
          </div>

          <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 border-t border-agron-200 dark:border-white/5 pt-12">
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-agron-400 dark:text-agron-600">{t('footer.tacticalHub')}</h4>
                <div className="flex flex-col gap-6 items-start">
                   <FooterLink label={t('nav.home')} onClick={() => setActiveTab?.('home')} />
                   <FooterLink label={t('nav.about')} onClick={() => setActiveTab?.('about')} />
                   <FooterLink label={t('nav.presentations')} onClick={() => setActiveTab?.('presentations')} />
                   <FooterLink label={t('nav.workforce')} onClick={() => setActiveTab?.('workforce')} />
                   <FooterLink label={t('nav.learningPaths')} onClick={() => setActiveTab?.('learning-paths')} />
                   <FooterLink label={t('nav.simulation')} onClick={() => setActiveTab?.('simulation')} />
                   <FooterLink label={t('nav.catalog')} onClick={() => setActiveTab?.('catalog')} />
                </div>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-agron-400 dark:text-agron-600">{t('footer.institutional')}</h4>
                <div className="flex flex-col gap-6 items-start">
                   <FooterLink label={t('nav.investors')} onClick={() => setActiveTab?.('investors')} />
                   <FooterLink label={t('nav.government')} onClick={() => setActiveTab?.('government')} />
                   <FooterLink label={t('nav.agops')} onClick={() => setActiveTab?.('agops')} />
                   <FooterLink label={t('nav.ailab')} onClick={() => setActiveTab?.('ailab')} />
                   <FooterLink label={t('nav.trust')} onClick={() => setActiveTab?.('trust')} />
                </div>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-agron-400 dark:text-agron-600">Resources</h4>
                <div className="flex flex-col gap-6 items-start">
                   <FooterLink label={t('footer.howItWorks')} onClick={() => openModal('howItWorks')} />
                   <FooterLink label={t('footer.learningCenter')} onClick={() => openModal('learningCenter')} />
                   <FooterLink label={t('footer.glossary')} onClick={() => openModal('glossary')} />
                   <FooterLink label={t('footer.faq')} onClick={() => openModal('faq')} />
                   <FooterLink label={t('footer.careers')} onClick={() => openModal('careers')} />
                </div>
             </div>
             <div className="md:col-span-2 lg:col-span-2 space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-agron-400 dark:text-agron-600">Legal Compliance</h4>
                <div className="space-y-6">
                   <p className="text-xs text-agron-500 dark:text-agron-400 leading-relaxed font-medium">
                      {t('footer.legalNote')}
                   </p>
                   <div className="flex flex-wrap gap-x-8 gap-y-4">
                      <FooterLink label={t('footer.privacy')} onClick={() => openModal('privacy')} />
                      <FooterLink label={t('footer.terms')} onClick={() => openModal('terms')} />
                      <FooterLink label={t('footer.cookie')} onClick={() => openModal('cookie')} />
                   </div>
                </div>
             </div>
          </div>

          {/* Language & Info */}
          <div className="lg:col-span-12 flex flex-col items-start lg:items-end gap-8 mt-12 pt-12 border-t border-agron-200 dark:border-white/5">
             <div className="flex items-center gap-6">
                <button 
                  onClick={toggleTheme}
                  className="w-16 h-16 bg-white dark:bg-agron-900 border border-agron-200 dark:border-white/5 rounded-3xl flex items-center justify-center text-agron-500 hover:border-agron-blue transition-all shadow-inner-glow active:scale-95"
                >
                   {theme === 'light' ? <Moon size={22}/> : <Sun size={22}/>}
                </button>

                <div className="relative" ref={langRef}>
                   <button 
                     onClick={() => setIsLangOpen(!isLangOpen)}
                     className="h-16 px-10 bg-white dark:bg-agron-900 border border-agron-200 dark:border-white/5 rounded-3xl flex items-center gap-5 hover:border-agron-blue transition-all group shadow-inner-glow"
                   >
                      <Globe size={20} className="text-agron-blue" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-agron-900 dark:text-white">{languages.find(l => l.code === i18n.language)?.name || 'Language'}</span>
                      <ChevronUp size={18} className={`transition-transform duration-500 ${isLangOpen ? 'rotate-180' : ''}`} />
                   </button>
                   <AnimatePresence>
                      {isLangOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute bottom-full right-0 mb-6 w-64 bg-white dark:bg-agron-900 border border-agron-200 dark:border-white/5 rounded-[2.5rem] p-4 shadow-2xl z-50 grid grid-cols-1 gap-1 overflow-hidden"
                        >
                          {languages.map((lang) => (
                            <button 
                              key={lang.code}
                              onClick={() => changeLanguage(lang.code)}
                              className={`flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-agron-50 dark:hover:bg-black transition-colors ${i18n.language === lang.code ? 'text-agron-blue bg-agron-blue/5' : 'text-agron-500'}`}
                            >
                              <span className="text-[10px] font-black uppercase tracking-widest">{lang.name}</span>
                              <span className="text-xl">{lang.flag}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             </div>

             <div className="lg:text-right">
                <div className="text-[10px] font-black uppercase tracking-[0.8em] text-agron-300 dark:text-agron-700 mb-4">AGRON INC.</div>
                <div className="text-[10px] font-bold text-agron-400 dark:text-agron-600 uppercase tracking-[0.28em] flex items-center gap-3 lg:justify-end">
                   <div className="w-8 h-px bg-agron-300 dark:bg-agron-700"></div>
                   © 2026 AGRON INC. ALL RIGHTS RESERVED.
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* FOOTER MODAL FOR CONTENT */}
      <AnimatePresence>
        {modalContent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-agron-950/80 backdrop-blur-md"
            onClick={() => setModalContent(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-agron-900 w-full max-w-2xl rounded-[3rem] p-12 md:p-20 shadow-2xl relative border border-white/5"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setModalContent(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-agron-50 dark:bg-black flex items-center justify-center hover:bg-agron-blue hover:text-white transition-all shadow-inner-glow"
              >
                <X size={20} />
              </button>
              <h3 className="text-4xl font-black uppercase tracking-tighter text-agron-blue mb-8 italic">{modalContent.title}</h3>
              <p className="text-xl text-agron-600 dark:text-agron-300 font-light leading-relaxed">
                {modalContent.content}
              </p>
              <div className="mt-12 h-1.5 w-16 bg-agron-blue rounded-full"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

const SocialLink: React.FC<{ label: string; href: string; brand: SocialBrand }> = ({ label, href, brand }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    title={label}
    className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-agron-200 bg-white/75 text-slate-500 shadow-inner-glow transition-all hover:-translate-y-0.5 hover:border-agron-blue/60 hover:text-agron-blue hover:shadow-blue-glow/30 active:scale-95 dark:border-white/10 dark:bg-agron-900/70 dark:text-slate-400 dark:hover:text-blue-300"
    aria-label={`Open AGRON on ${label}`}
  >
     <span className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-agron-blue/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
     <SocialIcon brand={brand} />
  </a>
);

type SocialBrand = 'youtube' | 'facebook' | 'instagram' | 'x' | 'linkedin';

const SocialIcon: React.FC<{ brand: SocialBrand }> = ({ brand }) => {
  if (brand === 'youtube') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
        <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10 15.4V8.6l5.8 3.4L10 15.4Z" />
      </svg>
    );
  }
  if (brand === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-none stroke-current stroke-[2.2]">
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="17.2" cy="6.8" r="0.8" className="fill-current stroke-0" />
      </svg>
    );
  }
  if (brand === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
        <path d="M5.3 8.9h3.2v10.2H5.3V8.9Zm1.6-5a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8Zm5.3 5h3.1v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v5.5h-3.2v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v5h-3.2V8.9Z" />
      </svg>
    );
  }
  if (brand === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
        <path d="M14.2 8.1V6.6c0-.7.4-1.1 1.2-1.1h1.7V2.7c-.8-.1-1.6-.2-2.4-.2-2.5 0-4.2 1.5-4.2 4.2v1.4H7.8v3.1h2.7v7.9h3.3v-7.9h2.7l.5-3.1h-3Z" />
      </svg>
    );
  }
  return <span className="text-[14px] font-black leading-none tracking-[-0.04em]">X</span>;
};

const FooterLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button 
    onClick={onClick} 
    className="text-xs font-black uppercase tracking-widest text-agron-500 hover:text-agron-blue flex items-center gap-2 group transition-colors text-left"
  >
     {label}
     <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0 text-agron-blue" />
  </button>
);

export default Footer;
