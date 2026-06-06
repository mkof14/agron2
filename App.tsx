import React, { Suspense, lazy, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { languages } from './types';

const Dashboard = lazy(() => import('./components/Dashboard'));
const TrainingModules = lazy(() => import('./components/TrainingModules'));
const SimulationGenerator = lazy(() => import('./components/SimulationGenerator'));
const Portal = lazy(() => import('./components/Portal'));
const AdminConsole = lazy(() => import('./components/AdminConsole'));
const LearningPaths = lazy(() => import('./components/LearningPaths'));
const CourseCatalog = lazy(() => import('./components/CourseCatalog'));
const TrustAndCredibility = lazy(() => import('./components/TrustAndCredibility'));
const About = lazy(() => import('./components/About'));
const InvestorRelations = lazy(() => import('./components/InvestorRelations'));
const GovernmentMode = lazy(() => import('./components/GovernmentMode'));
const AgOpsMode = lazy(() => import('./components/AgOpsMode'));
const AILab = lazy(() => import('./components/AILab'));
const PresentationHub = lazy(() => import('./components/PresentationHub'));
const AutonomousWorkforce = lazy(() => import('./components/AutonomousWorkforce'));

interface AppErrorBoundaryState {
  hasError: boolean;
}

const VALID_TABS = new Set([
  'home',
  'about',
  'learning-paths',
  'presentations',
  'workforce',
  'catalog',
  'trust',
  'training',
  'simulation',
  'portal',
  'admin',
  'investors',
  'government',
  'agops',
  'ailab'
]);

const WORKFORCE_SECTION_PREFIX = 'workforce-';

const pageMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: 'AGRON | Controlling Execution in Drone Operations',
    description: 'AGRON controls how drone work gets executed across locations, operators, missions, data, and delivery.'
  },
  about: {
    title: 'About AGRON | Robotics Operations Structure',
    description: 'AGRON builds the operating structure for drone execution, connecting training, data, operations, and delivery.'
  },
  presentations: {
    title: 'AGRON Company Presentation | Interactive Materials',
    description: 'Explore AGRON company presentations, connected materials, video, and deeper operational content.'
  },
  workforce: {
    title: 'AGRON Workforce | Autonomous Workforce Infrastructure',
    description: 'AGRON builds workforce infrastructure for autonomous operations: education, certification, skill passports, staffing, and distributed operations.'
  },
  'learning-paths': {
    title: 'GDA | AGRON Training Capacity',
    description: 'Global Drone Academy provides trained operator capacity and workforce readiness for AGRON operations.'
  },
  agops: {
    title: 'AGRON Platform | Execution Control',
    description: 'AGRON structures mission definition, operator assignment, execution flow, and standardized delivery.'
  },
  ailab: {
    title: 'ISDRI | Spatial Data Research',
    description: 'ISDRI supports AGRON operations with spatial data research, analysis, validation, and reporting.'
  },
  government: {
    title: 'GUARD | Security and Government Operations',
    description: 'GUARD supports authorized operations requiring coordination, timing, compliance, and reliability.'
  },
  investors: {
    title: 'AGRON Investors | Robotics Operations Infrastructure',
    description: 'AGRON presents an execution-control model for scalable drone operations and B2B operational revenue.'
  },
  catalog: {
    title: 'AGRON Resources | Operational Materials',
    description: 'AGRON operational resources and structured materials for drone execution.'
  },
  trust: {
    title: 'AGRON Credibility | Operational Experience',
    description: 'AGRON is built from direct operational experience, trained operators, and real deployment feedback.'
  },
  training: {
    title: 'AGRON Training | Operator Readiness',
    description: 'AGRON training modules support structured operator readiness and mission capability.'
  },
  simulation: {
    title: 'AGRON Simulation | Mission Scenarios',
    description: 'AGRON simulation tools support mission planning, scenario review, and operator preparation.'
  },
  portal: {
    title: 'AGRON Portal | Operations Access',
    description: 'AGRON portal access for operational workflows and structured execution.'
  },
  admin: {
    title: 'AGRON Admin | System Console',
    description: 'AGRON internal system console.'
  }
};

const getTabFromHash = () => {
  if (typeof window === 'undefined') return 'home';
  const hashTab = window.location.hash.replace('#', '').trim();
  if (hashTab.startsWith(WORKFORCE_SECTION_PREFIX)) return 'workforce';
  return VALID_TABS.has(hashTab) ? hashTab : 'home';
};

const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
  const selector = `meta[${attribute}="${name}"]`;
  let tag = document.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
};

const readStorage = (key: string, fallback: string) => {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in restricted browser modes.
  }
};

const repairLocalState = () => {
  try {
    localStorage.removeItem('agron.presentation.library.v1');
    localStorage.removeItem('agron.presentation.library.v2');
    localStorage.removeItem('agron_session_tab');
  } catch {
    // Ignore storage failures and recover in memory.
  }
};

class AppErrorBoundary extends React.Component<{ children: React.ReactNode; resetKey: string; onRecover: () => void }, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(previousProps: { resetKey: string }) {
    if (this.state.hasError && previousProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error: unknown) {
    console.error('AGRON view failed:', error);
    repairLocalState();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6 py-24">
          <div className="max-w-xl rounded-[2rem] border border-red-500/25 bg-white p-8 text-center shadow-soft-2xl dark:bg-agron-950">
            <div className="mx-auto mb-5 h-12 w-12 rounded-2xl bg-red-500/10" />
            <h1 className="mb-3 text-3xl font-black tracking-tight">View recovery</h1>
            <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500 dark:text-slate-400">
              This section had invalid saved data. Reset local presentation data and reload the page.
            </p>
            <button
              onClick={() => {
                repairLocalState();
                this.props.onRecover();
                this.setState({ hasError: false });
              }}
              className="h-12 rounded-2xl bg-slate-950 px-6 text-[10px] font-black uppercase tracking-widest text-white dark:bg-white dark:text-slate-950"
            >
              Repair view
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const PageFallback: React.FC = () => (
  <div className="flex min-h-[65vh] items-center justify-center px-6 py-24">
    <div className="h-12 w-12 rounded-2xl border border-blue-500/30 bg-blue-500/10 shadow-blue-glow" />
  </div>
);

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeTab, setActiveTab] = useState(() => {
    return getTabFromHash();
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = readStorage('agron_theme', 'dark');
      return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const currentHash = window.location.hash.replace('#', '').trim();
    const hasSectionHash = activeTab === 'workforce' && currentHash.startsWith(WORKFORCE_SECTION_PREFIX);
    const nextHash = activeTab === 'home' ? window.location.pathname : `#${activeTab}`;
    if (!hasSectionHash) {
      window.history.replaceState(null, '', nextHash);
    }
    const meta = pageMeta[activeTab] || pageMeta.home;
    document.title = meta.title;
    updateMetaTag('description', meta.description);
    updateMetaTag('og:title', meta.title, 'property');
    updateMetaTag('og:description', meta.description, 'property');
    updateMetaTag('twitter:title', meta.title);
    updateMetaTag('twitter:description', meta.description);
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const nextTab = getTabFromHash();
      if (nextTab !== activeTab) setActiveTab(nextTab);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    writeStorage('agron_theme', theme);
  }, [theme]);

  useEffect(() => {
    const currentLang = languages.find(l => l.code === i18n.language);
    if (currentLang) {
      document.documentElement.dir = currentLang.dir;
      document.documentElement.lang = currentLang.code;
    }
  }, [i18n.language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Dashboard setActiveTab={setActiveTab} />;
      case 'about': return <About setActiveTab={setActiveTab} />;
      case 'learning-paths': return <LearningPaths />;
      case 'presentations': return <PresentationHub />;
      case 'workforce': return <AutonomousWorkforce setActiveTab={setActiveTab} />;
      case 'catalog': return <CourseCatalog />;
      case 'trust': return <TrustAndCredibility />;
      case 'training': return <TrainingModules />;
      case 'simulation': return <SimulationGenerator />;
      case 'portal': return <Portal />;
      case 'admin': return <AdminConsole />;
      case 'investors': return <InvestorRelations />;
      case 'government': return <GovernmentMode />;
      case 'agops': return <AgOpsMode />;
      case 'ailab': return <AILab />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  if (activeTab === 'admin') {
     return (
        <div className="min-h-screen bg-white dark:bg-black font-sans text-slate-900 dark:text-slate-100">
           <Suspense fallback={<PageFallback />}>
             <AdminConsole />
           </Suspense>
           <div className="fixed bottom-8 right-8 z-50">
              <button 
                onClick={() => setActiveTab('home')} 
                className="px-8 h-14 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-widest hover:border-blue-600 transition-all shadow-2xl shadow-black/20 text-slate-500 dark:text-slate-400"
              >
                 <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> {t('admin.exit')}
              </button>
           </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black font-sans text-slate-900 dark:text-white transition-colors duration-500 selection:bg-blue-600 selection:text-white light-depth dark:dark-depth">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-agron-blue origin-left z-[60]"
        style={{ scaleX }}
      />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "circOut" }}
          >
            <AppErrorBoundary resetKey={activeTab} onRecover={() => setActiveTab('home')}>
              <Suspense fallback={<PageFallback />}>
                {renderContent()}
              </Suspense>
            </AppErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer setActiveTab={setActiveTab} theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default App;
