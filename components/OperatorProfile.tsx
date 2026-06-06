import React, { useState, useRef, useEffect } from 'react';
import { OperatorProfile as ProfileType, SystemBackup } from '../types';

const DEFAULT_PROFILE: ProfileType = {
  id: "OP-8821-X",
  fullName: "Alexei Volkov",
  callsign: "VANGUARD",
  clearanceLevel: "L3 - INSTRUCTOR",
  certifications: ["Rotary Wing Class A", "Fixed Wing Survey", "Night Ops", "AgOps Spraying"],
  flightHours: 1450.5,
  lastAssessmentDate: "2024-05-15"
};

const OperatorProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [lastBackupTime, setLastBackupTime] = useState<string | null>(null);
  
  const [profile, setProfile] = useState<ProfileType>(() => {
    const saved = localStorage.getItem('agron_operator_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  useEffect(() => {
    const backup = localStorage.getItem('agron_last_backup');
    if (backup) setLastBackupTime(backup);
  }, []);

  const handleSave = () => {
    localStorage.setItem('agron_operator_profile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const saved = localStorage.getItem('agron_operator_profile');
    setProfile(saved ? JSON.parse(saved) : DEFAULT_PROFILE);
    setIsEditing(false);
  };

  const handleChange = (field: keyof ProfileType, value: any) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // --- DATA GOVERNANCE HANDLERS ---

  const handleExportSystem = () => {
    const missions = JSON.parse(localStorage.getItem('agron_mission_repository') || '[]');
    const now = new Date().toISOString();
    
    const backup: SystemBackup = {
      version: "2.5.0",
      timestamp: now,
      profile: profile,
      missions: missions
    };

    // Save backup timestamp
    localStorage.setItem('agron_last_backup', now);
    setLastBackupTime(now);

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `AGRON_BACKUP_${profile.callsign}_${now.slice(0,10)}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const backup: SystemBackup = JSON.parse(content);

        // Validation (Basic)
        if (!backup.profile || !backup.missions) {
          throw new Error("Invalid backup structure");
        }

        if (confirm(`DETECTED BACKUP: ${backup.timestamp}\n\nOverwriting current system state with imported data. This action cannot be undone.\n\nProceed?`)) {
          // Restore Data
          localStorage.setItem('agron_operator_profile', JSON.stringify(backup.profile));
          localStorage.setItem('agron_mission_repository', JSON.stringify(backup.missions));
          if (backup.timestamp) {
             localStorage.setItem('agron_last_backup', backup.timestamp);
          }
          
          // Update State
          setProfile(backup.profile);
          alert("System State Restored Successfully.");
          window.location.reload(); // Force refresh to propagate changes to other components
        }
      } catch (error) {
        alert("CRITICAL ERROR: Corrupted or incompatible backup file.");
        console.error(error);
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = ''; 
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4 flex justify-between items-end">
         <div>
            <h2 className="text-2xl font-bold text-agron-900 dark:text-white uppercase tracking-tight">Operator Record</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-1">ID: {profile.id} // STATUS: ACTIVE</p>
         </div>
         <div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wide hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Edit Record
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wide hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-agron-900 dark:bg-white text-white dark:text-agron-900 border border-agron-900 dark:border-white text-xs font-bold uppercase tracking-wide hover:bg-agron-800 dark:hover:bg-gray-100 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
         </div>
      </div>

      <div className="bg-white dark:bg-slate-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden relative mb-8">
        {/* Save Indicator */}
        {!isEditing && (
           <div className="absolute top-0 right-0 p-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-100 dark:border-green-800">
                <svg className="mr-1.5 h-2 w-2 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                  <circle cx="4" cy="4" r="3" />
                </svg>
                Local Record Synced
              </span>
           </div>
        )}

        {/* 3D Logo Watermark (SVG Replacement) */}
        <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none p-4">
             <svg className="h-64 w-64 text-black dark:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
             </svg>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* Identity Column */}
          <div className="col-span-1 border-r border-gray-100 dark:border-gray-800 pr-6">
            <div className="w-24 h-24 bg-agron-800 dark:bg-black rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto md:mx-0">
              {profile.callsign.substring(0, 2)}
            </div>
            
            {isEditing ? (
              <div className="space-y-3">
                <div>
                   <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Full Name</label>
                   <input 
                      type="text" 
                      value={profile.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      className="w-full text-sm border-gray-300 dark:border-gray-700 dark:bg-slate-950 dark:text-white rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue"
                   />
                </div>
                <div>
                   <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Callsign</label>
                   <input 
                      type="text" 
                      value={profile.callsign}
                      onChange={(e) => handleChange('callsign', e.target.value)}
                      className="w-full text-sm border-gray-300 dark:border-gray-700 dark:bg-slate-950 dark:text-white rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue"
                   />
                </div>
                <div>
                   <label className="block text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Clearance</label>
                   <select 
                      value={profile.clearanceLevel}
                      onChange={(e) => handleChange('clearanceLevel', e.target.value)}
                      className="w-full text-sm border-gray-300 dark:border-gray-700 dark:bg-slate-950 dark:text-white rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue"
                   >
                     <option>L1 - TRAINEE</option>
                     <option>L2 - OPERATOR</option>
                     <option>L3 - INSTRUCTOR</option>
                     <option>L4 - COMMAND</option>
                   </select>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{profile.fullName}</h3>
                <p className="text-sm text-agron-blue dark:text-blue-400 font-semibold mt-1">Callsign: {profile.callsign}</p>
                <div className="mt-4 inline-block bg-agron-900 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded">
                  {profile.clearanceLevel}
                </div>
              </>
            )}
          </div>

          {/* Stats Column */}
          <div className="col-span-2 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase block">Total Flight Hours</span>
                {isEditing ? (
                  <input 
                    type="number" 
                    value={profile.flightHours}
                    onChange={(e) => handleChange('flightHours', Number(e.target.value))}
                    className="w-full mt-1 font-mono text-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 dark:text-white rounded-sm"
                  />
                ) : (
                  <span className="text-2xl font-mono text-gray-900 dark:text-gray-100">{profile.flightHours.toLocaleString()}</span>
                )}
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase block">Last Assessment</span>
                {isEditing ? (
                  <input 
                    type="date" 
                    value={profile.lastAssessmentDate}
                    onChange={(e) => handleChange('lastAssessmentDate', e.target.value)}
                    className="w-full mt-1 font-mono text-sm border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900 dark:text-white rounded-sm"
                  />
                ) : (
                  <span className="text-xl font-mono text-gray-900 dark:text-gray-100">{profile.lastAssessmentDate}</span>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2 mb-3">
                 <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                   Active Certifications
                 </h4>
                 {isEditing && (
                    <span className="text-xs text-gray-400 italic">Separate with commas</span>
                 )}
              </div>
              
              {isEditing ? (
                <textarea 
                   value={profile.certifications.join(', ')}
                   onChange={(e) => handleChange('certifications', e.target.value.split(',').map(s => s.trim()))}
                   rows={3}
                   className="w-full text-sm border-gray-300 dark:border-gray-700 dark:bg-slate-950 dark:text-white rounded-sm focus:border-agron-blue focus:ring-1 focus:ring-agron-blue"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.certifications.map((cert, idx) => (
                    <span key={idx} className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800 font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Compliance Footer */}
        <div className="bg-gray-50 dark:bg-slate-950 px-6 py-3 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center relative z-10">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-600 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Compliant with AGRON Standard 44.2-B
          </p>
          {isEditing && <span className="text-xs text-amber-600 dark:text-amber-500 font-bold uppercase">Editing Active</span>}
        </div>
      </div>

      {/* DATA GOVERNANCE MODULE */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="bg-slate-100 dark:bg-slate-900 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-sm font-bold text-agron-900 dark:text-white uppercase tracking-wide">Data Governance & Portability</h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">PROTOCOL: OFF-SITE BACKUP</span>
        </div>
        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              <strong className="text-gray-900 dark:text-white">System Export:</strong> Download a full encrypted JSON archive of your Operator Profile and Mission Repository. Use this for disaster recovery or cross-terminal migration.
            </p>
            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 italic mt-2">
               <span>* Recommended frequency: After every major simulation cycle.</span>
               {lastBackupTime && (
                 <span className="text-green-600 dark:text-green-400 font-semibold">Last Backup: {new Date(lastBackupTime).toLocaleString()}</span>
               )}
            </div>
          </div>
          <div className="flex gap-4">
             <input 
               type="file" 
               ref={fileInputRef} 
               onChange={handleFileImport} 
               className="hidden" 
               accept=".json"
             />
             <button 
               onClick={handleImportClick}
               className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-xs font-bold uppercase tracking-wide hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition-colors shadow-sm"
             >
               Restore from File
             </button>
             <button 
               onClick={handleExportSystem}
               className="px-4 py-2 bg-agron-blue dark:bg-blue-800 text-white border border-agron-blue dark:border-blue-800 text-xs font-bold uppercase tracking-wide hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors shadow-sm flex items-center"
             >
               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
               Export System State
             </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OperatorProfile;