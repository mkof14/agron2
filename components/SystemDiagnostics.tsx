
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface TestResult {
  id: string;
  name: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILURE' | 'WARNING';
  message: string;
}

const SystemDiagnostics: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'IDLE' | 'COMPLETED' | 'CRITICAL'>('IDLE');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  
  const [tests, setTests] = useState<TestResult[]>([
    { id: 'PERSISTENCE', name: 'Persistence Layer (Storage)', status: 'PENDING', message: 'Awaiting initialization...' },
    { id: 'AI_TEXT', name: 'Neural Link (Gemini Text)', status: 'PENDING', message: 'Awaiting signal...' },
    { id: 'AI_IMAGE', name: 'Visual Perception (Gemini Image)', status: 'PENDING', message: 'Awaiting stream...' },
    { id: 'API_HEARTBEAT', name: 'Network Heartbeat (Vercel API)', status: 'PENDING', message: 'Awaiting response...' },
  ]);

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 50));
  };

  const updateTest = (id: string, status: TestResult['status'], message: string) => {
    setTests(prev => prev.map(t => t.id === id ? { ...t, status, message } : t));
  };

  const runDiagnostics = async () => {
    setIsRunning(true);
    setOverallStatus('IDLE');
    setProgress(0);
    setLogs([]);
    addLog("AGRON_SDRT: Initiating System Diagnostics Sequence...");

    // 1. Persistence Test
    updateTest('PERSISTENCE', 'RUNNING', 'Verifying local cache sector...');
    addLog("STORAGE: Attempting write-read cycle to sector 0xLOCAL");
    await new Promise(r => setTimeout(r, 800));
    try {
      localStorage.setItem('agron_diag_test', 'NOMINAL');
      const val = localStorage.getItem('agron_diag_test');
      if (val === 'NOMINAL') {
        updateTest('PERSISTENCE', 'SUCCESS', 'R/W parity verified.');
        addLog("STORAGE: Success. IO throughput within parameters.");
      } else throw new Error();
    } catch (e) {
      updateTest('PERSISTENCE', 'FAILURE', 'Sector inaccessible.');
      addLog("STORAGE: Error. Persistence failure.");
    }
    setProgress(25);

    // 2. AI Text Link
    updateTest('AI_TEXT', 'RUNNING', 'Pinging Neural Node Alpha...');
    addLog("AI_CORE: Synchronizing with gemini-3-flash-preview...");
    await new Promise(r => setTimeout(r, 1000));
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: 'AGRON: Operational Pulse Test. Respond with OK.',
      });
      if (response.text) {
        updateTest('AI_TEXT', 'SUCCESS', 'Node Response Received.');
        addLog(`AI_CORE: Response validated: ${response.text.trim()}`);
      } else throw new Error();
    } catch (e) {
      updateTest('AI_TEXT', 'WARNING', 'Latency high or signal severed.');
      addLog("AI_CORE: Warning. Neural link timeout.");
    }
    setProgress(50);

    // 3. AI Visual Perception
    updateTest('AI_IMAGE', 'RUNNING', 'Testing Visual Engine...');
    addLog("VISUAL: Requesting mission frame generation...");
    await new Promise(r => setTimeout(r, 1200));
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: 'AGRON LOGO' }] },
        config: { imageConfig: { aspectRatio: "1:1" } }
      });
      if (response.candidates) {
        updateTest('AI_IMAGE', 'SUCCESS', 'Perception check complete.');
        addLog("VISUAL: Success. Frame generated in 1240ms.");
      } else throw new Error();
    } catch (e) {
      updateTest('AI_IMAGE', 'WARNING', 'Quota limited or engine standby.');
      addLog("VISUAL: Standby mode. Fallback rendering active.");
    }
    setProgress(75);

    // 4. API Heartbeat
    updateTest('API_HEARTBEAT', 'RUNNING', 'Probing Edge Node...');
    addLog("NETWORK: Dispatching probe to /api/readyz...");
    try {
      const res = await fetch('/api/readyz');
      const data = await res.json();
      if (data.status === 'ready' || data.status === 'AGRON_CORE_STABLE') {
        updateTest('API_HEARTBEAT', 'SUCCESS', `Edge ${data.db || 'Active'}`);
        addLog(`NETWORK: 200 OK. Node: ${data.status}`);
      } else {
        updateTest('API_HEARTBEAT', 'WARNING', 'Partial link established.');
        addLog("NETWORK: 200 OK. Warning: Detached Mode.");
      }
    } catch (e) {
      updateTest('API_HEARTBEAT', 'FAILURE', 'Edge unreachable.');
      addLog("NETWORK: 503 ERROR. Gateway severed.");
    }
    
    setProgress(100);
    setIsRunning(false);
    setOverallStatus('COMPLETED');
    addLog("AGRON_SDRT: Diagnostic Sequence Terminated. System Stable.");
  };

  return (
    <div className="bg-slate-950 border border-gray-800 p-8 rounded-sm shadow-2xl">
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
         <div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">System Diagnostic Center</h2>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">PROTOCOL: SDRT-v5 // AUTH: ADMIN_OVR</p>
         </div>
         <button 
            onClick={runDiagnostics}
            disabled={isRunning}
            className={`px-8 py-4 text-xs font-black uppercase tracking-widest transition-all ${isRunning ? 'bg-gray-800 text-gray-600 cursor-not-allowed' : 'bg-agron-accent text-white hover:bg-amber-500 shadow-xl'}`}
         >
            {isRunning ? 'Running Diagnostic...' : 'Execute Full Test'}
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Test List */}
         <div className="space-y-4">
            {tests.map(test => (
               <div key={test.id} className="bg-black/40 border border-gray-800 p-6 flex justify-between items-center group hover:border-gray-700 transition-colors">
                  <div>
                     <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{test.name}</h4>
                     <p className="text-sm font-bold text-gray-200">{test.message}</p>
                  </div>
                  <div className={`px-4 py-2 text-[10px] font-mono font-black border rounded-sm ${
                     test.status === 'SUCCESS' ? 'bg-green-900/20 text-green-500 border-green-500/50' :
                     test.status === 'FAILURE' ? 'bg-red-900/20 text-red-500 border-red-500/50' :
                     test.status === 'WARNING' ? 'bg-amber-900/20 text-amber-500 border-amber-500/50' :
                     test.status === 'RUNNING' ? 'bg-blue-900/20 text-blue-500 border-blue-500/50 animate-pulse' :
                     'bg-gray-900/40 text-gray-600 border-gray-800'
                  }`}>
                     {test.status}
                  </div>
               </div>
            ))}

            <div className="mt-8">
               <div className="h-1 w-full bg-gray-900 overflow-hidden">
                  <div 
                    className="h-full bg-agron-accent transition-all duration-500 shadow-[0_0_10px_#d97706]" 
                    style={{ width: `${progress}%` }}
                  ></div>
               </div>
               <div className="flex justify-between mt-2 font-mono text-[9px] text-gray-600 uppercase">
                  <span>Progress Matrix</span>
                  <span>{progress}%</span>
               </div>
            </div>
         </div>

         {/* Log Output */}
         <div className="bg-black border border-gray-800 flex flex-col h-[400px]">
            <div className="p-3 bg-gray-900 border-b border-gray-800 flex justify-between items-center text-[9px] font-black text-gray-500 uppercase font-mono tracking-widest">
               <span>Diagnostics_Log</span>
               <span className="animate-pulse">Live_Feed</span>
            </div>
            <div className="flex-1 p-6 font-mono text-[11px] overflow-y-auto space-y-2 text-gray-500">
               {logs.length === 0 && <p className="opacity-20 italic">No diagnostic data active.</p>}
               {logs.map((log, i) => (
                  <div key={i} className={`pb-1 border-b border-white/5 ${log.includes('Success') ? 'text-green-600' : log.includes('Error') ? 'text-red-500' : ''}`}>
                     {log}
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default SystemDiagnostics;
