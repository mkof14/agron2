import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Moon, Sun, ChevronDown, Menu as MenuIcon, X, LayoutGrid, Terminal, Shield, Activity, Sparkles, Cpu } from 'lucide-react';
import { languages } from '../types';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  theme: string;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, theme, toggleTheme }) => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? 'py-1' : 'py-2'}`}>
      <div className={`max-w-7xl mx-auto px-8 transition-all duration-700 ${scrolled ? 'scale-[0.98]' : 'scale-100'}`}>
        <div className={`relative transition-all duration-700 ${scrolled ? 'bg-white/95 dark:bg-black/95' : 'bg-white/60 dark:bg-black/40'} backdrop-blur-3xl border ${scrolled ? 'border-agron-200 dark:border-white/10' : 'border-slate-200 dark:border-white/10'} rounded-[2.5rem] px-8 h-16 flex items-center justify-between shadow-soft-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${scrolled ? 'shadow-blue-glow border-agron-blue/30' : ''}`}>
          
          {/* Logo */}
	          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => setActiveTab('home')}>
	             <div className="relative flex items-center">
	                <BrandLogo variant="nav" className="transition group-hover:scale-[1.03]" />
	             </div>
	          </div>

          {/* Desktop Nav */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex">
	             <NavItem theme={theme} scrolled={scrolled} active={activeTab === 'home'} label={t('nav.home')} onClick={() => setActiveTab('home')} />
	             <NavItem theme={theme} scrolled={scrolled} active={activeTab === 'about'} label={t('nav.about')} onClick={() => setActiveTab('about')} />
	             <NavItem theme={theme} scrolled={scrolled} active={activeTab === 'presentations'} label={t('nav.presentations')} onClick={() => setActiveTab('presentations')} />
	             <NavItem theme={theme} scrolled={scrolled} active={activeTab === 'workforce'} label={t('nav.workforce')} onClick={() => setActiveTab('workforce')} />
	             <NavItem theme={theme} scrolled={scrolled} active={activeTab === 'learning-paths'} label={t('nav.learningPaths')} onClick={() => setActiveTab('learning-paths')} />
	             <NavItem theme={theme} scrolled={scrolled} active={activeTab === 'agops'} label={t('nav.agops')} onClick={() => setActiveTab('agops')} />
	             <NavItem theme={theme} scrolled={scrolled} active={activeTab === 'ailab'} label={t('nav.ailab')} onClick={() => setActiveTab('ailab')} />
	             <NavItem theme={theme} scrolled={scrolled} active={activeTab === 'investors'} label={t('nav.investors')} onClick={() => setActiveTab('investors')} />
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
             {/* Language Dropdown */}
             <div className="relative" ref={langRef}>
               <button 
                 onClick={() => setIsLangOpen(!isLangOpen)}
                 className={`w-12 h-12 rounded-2xl border border-transparent hover:border-agron-blue transition-all flex items-center justify-center group shadow-inner-glow ${scrolled || theme === 'light' ? 'bg-agron-100 dark:bg-agron-900 text-agron-700 dark:text-agron-400' : 'bg-white/10 text-white'}`}
               >
                 <Globe size={18} className="group-hover:rotate-12 transition-transform" />
               </button>
               <AnimatePresence>
                 {isLangOpen && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className="absolute top-full right-0 mt-4 w-56 bg-white dark:bg-agron-900 border border-agron-200 dark:border-white/5 rounded-3xl p-3 shadow-soft-xl dark:shadow-2xl z-50 grid grid-cols-1 gap-1 overflow-hidden"
                   >
                     {languages.map((lang) => (
                       <button 
                         key={lang.code}
                         onClick={() => changeLanguage(lang.code)}
                         className={`flex items-center justify-between px-5 py-3 rounded-2xl hover:bg-agron-50 dark:hover:bg-black transition-colors ${i18n.language === lang.code ? 'bg-agron-blue/10 text-agron-blue' : 'text-agron-500'}`}
                       >
                         <span className="text-[10px] font-black uppercase tracking-widest">{lang.name}</span>
                         <span className="text-lg">{lang.flag}</span>
                       </button>
                     ))}
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>

             {/* Theme Toggle */}
             <button 
               onClick={toggleTheme}
               className={`w-12 h-12 rounded-2xl border border-transparent hover:border-agron-blue transition-all flex items-center justify-center shadow-inner-glow ${scrolled || theme === 'light' ? 'bg-agron-100 dark:bg-agron-900 text-agron-700 dark:text-agron-400' : 'bg-white/10 text-white'}`}
             >
               {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
             </button>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden">
             <button 
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className="w-12 h-12 bg-agron-100 dark:bg-agron-900 rounded-2xl flex items-center justify-center text-agron-900 dark:text-white shadow-inner-glow"
             >
                {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="absolute top-full left-0 w-full px-8 pt-4 lg:hidden z-50"
          >
             <div className="bg-white dark:bg-agron-900 border border-agron-200 dark:border-white/5 rounded-[3rem] p-10 shadow-soft-xl dark:shadow-2xl space-y-4">
                <MobileNavItem label={t('nav.home')} onClick={() => { setActiveTab('home'); setIsMobileMenuOpen(false); }} />
	                <MobileNavItem label={t('nav.about')} onClick={() => { setActiveTab('about'); setIsMobileMenuOpen(false); }} />
	                <MobileNavItem label={t('nav.presentations')} onClick={() => { setActiveTab('presentations'); setIsMobileMenuOpen(false); }} />
	                <MobileNavItem label={t('nav.workforce')} onClick={() => { setActiveTab('workforce'); setIsMobileMenuOpen(false); }} />
	                <MobileNavItem label={t('nav.learningPaths')} onClick={() => { setActiveTab('learning-paths'); setIsMobileMenuOpen(false); }} />
	                <MobileNavItem label={t('nav.agops')} onClick={() => { setActiveTab('agops'); setIsMobileMenuOpen(false); }} />
	                <MobileNavItem label={t('nav.ailab')} onClick={() => { setActiveTab('ailab'); setIsMobileMenuOpen(false); }} />
	                <MobileNavItem label={t('nav.investors')} onClick={() => { setActiveTab('investors'); setIsMobileMenuOpen(false); }} />
                <div className="pt-8 border-t border-agron-100 dark:border-white/5 flex gap-4">
                   <button onClick={toggleTheme} className="flex-1 h-16 bg-agron-50 dark:bg-black rounded-3xl flex items-center justify-center text-agron-900 dark:text-white shadow-inner-glow">
                      {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                   </button>
                   <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex-1 h-16 bg-agron-50 dark:bg-black rounded-3xl flex items-center justify-center text-agron-900 dark:text-white shadow-inner-glow">
                      <Globe size={22} />
                   </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavItem: React.FC<{ active: boolean; label: string; onClick: () => void; scrolled: boolean; theme: string }> = ({ active, label, onClick, scrolled, theme }) => (
  <button 
    onClick={onClick}
    className={`px-3 xl:px-4 h-12 rounded-2xl text-[9px] font-black uppercase tracking-[0.12em] transition-all relative group flex items-center justify-center ${active ? 'text-blue-600 dark:text-blue-400' : (scrolled || theme === 'light' ? 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white' : 'text-slate-300 hover:text-white')}`}
  >
     <span className="relative z-10">{label}</span>
     {active && (
       <motion.div 
         layoutId="nav-pill" 
         className="absolute inset-0 bg-blue-600/10 dark:bg-blue-600/20 rounded-2xl shadow-blue-glow/20 border border-blue-500/20"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.3 }}
       />
     )}
     <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'}`} />
  </button>
);

const MobileNavItem: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full h-16 flex items-center px-10 rounded-3xl bg-agron-50 dark:bg-black text-[10px] font-black uppercase tracking-[0.4em] text-agron-600 dark:text-agron-400 hover:text-agron-blue transition-all active:scale-[0.98] shadow-inner-glow"
  >
     {label}
  </button>
);

export default Navbar;
