import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const DroneHero: React.FC = () => {
  const [coords, setCoords] = useState({ lat: 50.4501, lng: 30.5234, alt: 42.8 });

  // Simulate real-time telemetry changes for higher realism
  useEffect(() => {
    const interval = setInterval(() => {
      setCoords(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.0001,
        lng: prev.lng + (Math.random() - 0.5) * 0.0001,
        alt: Math.max(30, Math.min(60, prev.alt + (Math.random() - 0.5) * 2))
      }));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background Atmosphere - Tactical Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-[120px] animate-pulse" />
        
        {/* Tactical Scanning Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]" 
             style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        {/* Radar Scanning Line */}
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-blue-500/20 rounded-full"
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Marquee Text Overlay */}
      <div className="absolute top-[8%] left-0 w-full overflow-hidden pointer-events-none z-20 h-8 flex items-center bg-blue-600/5 backdrop-blur-md border-y border-blue-500/10">
        <div className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-16 px-8"
            >
              <span className="text-[9px] md:text-xs font-black text-blue-400 tracking-[0.4em] uppercase font-mono">
                AGRON: Aerial-Ground Robotics Operations Network
              </span>
              <div className="flex gap-4">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                <div className="w-3 h-0.5 bg-blue-500/30" />
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* The Drone SVG with Motion */}
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.6 }}
        animate={{ 
          y: [0, -40, 15, -25, 5, -12, 0],
          rotateX: [10, 2, 12, 4, 8, 10],
          rotateY: [-15, 15, -10, 10, -5, -15],
          rotateZ: [-5, 6, -3, 4, -2, -5],
          opacity: 1,
          scale: 0.85
        }}
        transition={{ 
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          rotateX: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          rotateY: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          rotateZ: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1.5 },
          scale: { duration: 1.2 }
        }}
        className="relative z-10 w-[240px] md:w-[480px] h-auto pointer-events-none"
      >
        {/* Shadow Projection */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[400px] h-12 bg-black/60 blur-3xl rounded-full scale-110 opacity-70" />
        
        {/* Tactical Encryption Pulse */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-blue-500/20"
              initial={{ width: 0, height: 0, opacity: 0 }}
              animate={{ 
                width: 750, 
                height: 750, 
                opacity: [0, 0.4, 0],
                strokeWidth: ['0.5px', '4px', '0.5px'] 
              }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 2, ease: "easeOut" }}
            />
          ))}
        </div>

        <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full filter drop-shadow-[0_60px_120px_rgba(0,0,0,0.95)]">
          {/* Scanning Field (Holographic effect) */}
          <motion.path 
            d="M400 350 L-100 850 L900 850 Z" 
            fill="url(#scanningFieldGradient)"
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              skewX: [-2, 2, -2]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Heavy Arms - Industrial Detail */}
          <HeavyArm x1={360} y1={300} x2={40} y2={40} color="text-slate-800" />
          <HeavyArm x1={440} y1={300} x2={760} y2={40} color="text-slate-800" />
          <HeavyArm x1={360} y1={360} x2={40} y2={560} color="text-slate-950" />
          <HeavyArm x1={440} y1={360} x2={760} y2={560} color="text-slate-950" />

          {/* Tactical Weapon Pods */}
          <g transform="translate(300, 395)">
             <path d="M0 0 H200 L180 45 H20 L0 0Z" fill="#1e293b" stroke="#020617" strokeWidth="3" />
             <rect x="20" y="10" width="50" height="55" rx="4" fill="#0f172a" />
             <rect x="130" y="10" width="50" height="55" rx="4" fill="#0f172a" />
             {/* Tech accents */}
             <rect x="30" y="20" width="30" height="2" fill="#3b82f6" opacity="0.5" />
             <rect x="140" y="20" width="30" height="2" fill="#3b82f6" opacity="0.5" />
          </g>

          {/* Stealth Hull Structure */}
          <path d="M260 300 L400 210 L540 300 L490 430 L310 430 L260 300Z" fill="url(#stealthHull)" stroke="#1e293b" strokeWidth="2" />
          <path d="M400 210 L400 300 M330 260 L470 260" stroke="white" strokeWidth="1" strokeOpacity="0.15" />
          
          {/* Reactor Gloss Overlay */}
          <path d="M300 240 Q400 210 500 240" stroke="white" strokeWidth="4" strokeOpacity="0.08" fill="none" />
          
          {/* Reactor Core Visualizer */}
          <circle cx="400" cy="275" r="18" fill="url(#reactorGradient)" />
          <motion.circle 
            cx="400" cy="275" r="14" fill="#3b82f6" 
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Enhanced Rotors with Heat Shimmer */}
          <TacticalRotor x={40} y={40} delay={0} color="#10b981" />
          <TacticalRotor x={760} y={40} delay={0.2} color="#10b981" />
          <TacticalRotor x={40} y={560} delay={0.4} color="#ef4444" />
          <TacticalRotor x={760} y={560} delay={0.6} color="#ef4444" />

          {/* Stabilized Sensor Gimbal - Realized as a high-tech pod */}
          <motion.g 
            animate={{ 
              rotateY: [-45, 45, -20, 30, -45],
              rotateX: [-15, 20, -5, 10, -15],
              y: [-2, 2, -2]
            }} 
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} 
            style={{ originX: '400px', originY: '380px' }}
          >
            {/* Gimbal Support Frame */}
            <rect x="360" y="380" width="80" height="25" rx="4" fill="#1e293b" />
            
            {/* Main Sensor Pod Body */}
            <path d="M370 405 L430 405 L440 460 L360 460 Z" fill="#020617" stroke="#334155" strokeWidth="2" />
            <rect x="365" y="405" width="70" height="15" fill="#1e293b" rx="2" />
            
            {/* Multi-Lens Objective */}
            <circle cx="400" cy="435" r="22" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx="400" cy="435" r="16" fill="url(#lensGradient)" />
            
            {/* Recording Light / Active State */}
            <circle cx="410" cy="425" r="4" fill="#ef4444">
               <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" repeatCount="indefinite" />
            </circle>

            {/* Secondary Sensors */}
            <rect x="380" y="445" width="8" height="4" rx="1" fill="#3b82f6" opacity="0.6" />
            <rect x="412" y="445" width="8" height="4" rx="1" fill="#3b82f6" opacity="0.6" />

            {/* Rangefinder Laser Beam */}
            <motion.line 
              x1="400" y1="445" x2="400" y2="850" 
              stroke="#3b82f6" strokeWidth="4" strokeOpacity="0.4"
              animate={{ opacity: [0.1, 0.6, 0.1], x2: [300, 500, 300] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.g>

          <defs>
            <radialGradient id="lensGradient">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="70%" stopColor="#1e3a8a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </radialGradient>
            <radialGradient id="rotorHeat">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="stealthHull" x1="400" y1="220" x2="400" y2="420" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5a67d8" stopOpacity="0.1" />
              <stop offset="0.3" stopColor="#4a5568" />
              <stop offset="0.7" stopColor="#2d3748" />
              <stop offset="1" stopColor="#020617" />
            </linearGradient>
            <radialGradient id="reactorGradient">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="scanningFieldGradient" x1="400" y1="350" x2="400" y2="800" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <filter id="f1" x="0" y="0">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
          </defs>
        </svg>

        {/* Real-time Telemetry Data Floats */}
        <div className="absolute top-[35%] -right-24 hidden lg:block opacity-80 scale-110">
           <motion.div 
             animate={{ opacity: [0.6, 1, 0.6] }}
             transition={{ duration: 0.2, repeat: Infinity }}
             className="text-[7px] font-mono text-blue-400 bg-black/90 px-3 py-2 border-r-4 border-blue-600 backdrop-blur-md shadow-2xl space-y-1"
           >
             <div className="text-emerald-400 border-b border-white/10 pb-1 mb-1 font-bold">NODE_CONNECT: ACTIVE</div>
             <div>LAT: {coords.lat.toFixed(4)}° N</div>
             <div>LNG: {coords.lng.toFixed(4)}° E</div>
             <div>ALT: {coords.alt.toFixed(1)}m AGL</div>
             <div className="flex items-center gap-2">
               <span>PWR:</span>
               <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                 <motion.div className="h-full bg-emerald-500" animate={{ width: ['90%', '88%', '89%'] }} />
               </div>
             </div>
           </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const HeavyArm: React.FC<{ x1: number, y1: number, x2: number, y2: number, color: string }> = ({ x1, y1, x2, y2, color }) => (
  <g className={color}>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="26" strokeLinecap="round" />
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="3 3" />
    {/* Structural hydraulics detail */}
    <rect x={x1 + (x2-x1)*0.4} y={y1 + (y2-y1)*0.4 - 2} width="35" height="5" fill="black" fillOpacity="0.7" transform={`rotate(${Math.atan2(y2-y1, x2-x1) * 180 / Math.PI}, ${x1 + (x2-x1)*0.4}, ${y1 + (y2-y1)*0.4})`} />
  </g>
);

const TacticalRotor: React.FC<{ x: number, y: number, delay: number, color: string }> = ({ x, y, delay, color }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle r="36" fill="#0f172a" stroke="#4a5568" strokeWidth="4" />
    
    {/* Heat Shimmer Effect */}
    <circle r="100" fill="url(#rotorHeat)">
       <animate attributeName="r" values="85;115;85" dur="1.5s" repeatCount="indefinite" />
       <animate attributeName="opacity" values="0.1;0.2;0.1" dur="1.5s" repeatCount="indefinite" />
    </circle>

    <motion.g animate={{ rotate: 360 }} transition={{ duration: 0.08, repeat: Infinity, ease: "linear", delay }}>
      <circle r="95" fill="rgba(255,255,255,0.04)" />
      {/* High Contrast Carbon Fiber Blades */}
      <rect x="-90" y="-12" width="180" height="24" rx="12" fill="#020617" />
      <rect x="-12" y="-90" width="24" height="180" rx="12" fill="#020617" />
      <rect x="-90" y="-1" width="180" height="3" fill="white" fillOpacity="0.1" />
    </motion.g>

    <circle r="16" fill="#1e293b" />
    <circle r="6" fill={color} className="animate-pulse" />
  </g>
);

export default DroneHero;