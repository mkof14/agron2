
import React from 'react';
import { TrainingModule } from '../types';

interface Props {
  module: TrainingModule;
}

const TrainingCard: React.FC<Props> = ({ module }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Certified': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'In Progress': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700';
    }
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    const title = encodeURIComponent(`AGRON Certification: ${module.title}`);
    const summary = encodeURIComponent(`I am pursuing the ${module.level} level certification in ${module.category} robotics operations via the AGRON Platform.`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const shareOnX = () => {
    const url = window.location.href;
    const text = encodeURIComponent(`Reviewing institutional robotics training: ${module.id} - ${module.title} on the @AGRON_Network. #Robotics #Certification`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-sm hover:border-agron-blue dark:hover:border-blue-400 transition-colors duration-200 p-6 flex flex-col h-full shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-mono text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">{module.id}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-sm border font-black uppercase tracking-widest ${getStatusColor(module.status)}`}>
          {module.status}
        </span>
      </div>
      
      <h3 className="text-lg font-black text-agron-900 dark:text-white mb-4 uppercase tracking-tight leading-tight">{module.title}</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
           <span className="font-black w-24 uppercase tracking-widest">Level:</span>
           <span className="font-bold text-gray-900 dark:text-gray-200 uppercase">{module.level}</span>
        </div>
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
           <span className="font-black w-24 uppercase tracking-widest">Duration:</span>
           <span className="font-bold text-gray-900 dark:text-gray-200 uppercase">{module.duration}</span>
        </div>
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
           <span className="font-black w-24 uppercase tracking-widest">Category:</span>
           <span className="font-bold text-gray-900 dark:text-gray-200 uppercase">{module.category}</span>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
        <button className="w-full bg-agron-900 dark:bg-white text-white dark:text-agron-900 py-3 text-[10px] font-black hover:bg-agron-accent dark:hover:bg-agron-accent dark:hover:text-white transition-colors uppercase tracking-[0.2em] mb-4">
          Access Secure Module
        </button>
        
        <div className="flex items-center justify-between">
           <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Share Transmission</span>
           <div className="flex gap-3">
              <button 
                onClick={shareOnLinkedIn}
                className="text-gray-400 hover:text-agron-blue transition-colors p-1"
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </button>
              <button 
                onClick={shareOnX}
                className="text-gray-400 hover:text-white transition-colors p-1"
                title="Share on X"
                aria-label="Share on X"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
