import React, { useState, useEffect } from 'react';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState([
    "Initializing Core Systems...",
    "Establishing Neural Uplink...",
    "Decrypting Profile Data...",
    "Syncing Bio-Metric Assets...",
    "Access Granted."
  ]);
  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(prev + diff, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress > (currentMsgIdx + 1) * 20 && currentMsgIdx < messages.length - 1) {
      setCurrentMsgIdx(prev => prev + 1);
    }
    
    if (progress === 100) {
      setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 500);
    }
  }, [progress, currentMsgIdx, messages.length, onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Background Tech Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-dashed border-indigo-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-10">
        {/* Logo/Icon Area */}
        <div className="mb-12 flex justify-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-blue-500/50 rounded-xl rotate-45 animate-pulse"></div>
                <div className="absolute inset-2 border border-indigo-400/30 rotate-[30deg] animate-pulse delay-75"></div>
                <span className="text-4xl font-black text-white tracking-widest">LA</span>
            </div>
        </div>

        {/* Messaging */}
        <div className="h-8 overflow-hidden mb-4">
           <div className="flex flex-col items-center transition-transform duration-500" style={{ transform: `translateY(-${currentMsgIdx * 32}px)` }}>
              {messages.map((msg, i) => (
                <div key={msg} className={`h-8 text-sm font-mono tracking-[0.2em] transition-opacity duration-500 ${currentMsgIdx === i ? 'text-blue-400' : 'text-zinc-600 opacity-0'}`}>
                  {msg}
                </div>
              ))}
           </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative h-[2px] w-full bg-zinc-900 rounded-full overflow-hidden mb-2">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
        </div>

        {/* Percentage Label */}
        <div className="flex justify-between items-center w-full">
            <span className="text-[10px] font-mono text-zinc-700 tracking-tighter uppercase">System Integration</span>
            <span className="text-[10px] font-mono text-blue-500/80 font-black">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute bottom-10 left-10 text-[8px] font-mono text-zinc-800 space-y-1 hidden md:block">
         <div>CPU_LOAD: 84%</div>
         <div>MEMORY_ALLOC: 4.2GB</div>
         <div>CORE_TEMP: 42°C</div>
      </div>
      <div className="absolute bottom-10 right-10 text-[8px] font-mono text-zinc-800 text-right hidden md:block">
         <div>UPLINK_STABLE: TRUE</div>
         <div>ENCRYPTION: AES-256</div>
         <div>HOST: VERCEL_PRODUCTION</div>
      </div>

    </div>
  );
};

export default Preloader;
