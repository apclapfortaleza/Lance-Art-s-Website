import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const Preloader = ({ onComplete }) => {
  const { isSketchMode } = useTheme();
  const [progress, setProgress] = useState(0);
  const [currentMsgIdx, setCurrentMsgIdx] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const darkMessages = [
    "Brewing some pixels... ☕",
    "Convincing the code to cooperate...",
    "Loading awesome things... ✨",
    "Almost there, hang tight! 🚀",
    "Let's go! 🎉"
  ];

  const sketchMessages = [
    "Sharpening pencils... ✏️",
    "Mixing watercolors...",
    "Sketching the outlines... 🎨",
    "Adding finishing touches...",
    "Ready to explore! 🌿"
  ];

  const messages = isSketchMode ? sketchMessages : darkMessages;

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

  if (isSketchMode) {
    return (
      <div className={`fixed inset-0 z-[100] bg-[#f5f0e6] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>

        {/* Paper texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />

        {/* Watercolor washes */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(225,170,190,0.2) 0%, transparent 60%)' }} />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(140,190,130,0.15) 0%, transparent 60%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(160,180,230,0.1) 0%, transparent 50%)' }} />

        {/* SVG Scribble doodles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {/* Stars */}
          <g transform="translate(120, 100)" opacity="0.12">
            <path d="M10,1 L12,7 L18,7 L13,10 L15,16 L10,12.5 L5,16 L7,10 L2,7 L8,7 Z"
              fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinejoin="round" />
          </g>
          <g transform="translate(850, 150)" opacity="0.08">
            <path d="M6,0 L7.5,4.5 L12,4.5 L8.5,7 L9.5,11.5 L6,9 L2.5,11.5 L3.5,7 L0,4.5 L4.5,4.5 Z"
              fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1" strokeLinejoin="round" />
          </g>
          {/* Spiral */}
          <path d="M180,600 C190,590 205,590 205,600 C205,610 190,615 185,605 C180,595 195,585 208,592"
            fill="none" stroke="rgba(146,108,71,0.08)" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray="150" strokeDashoffset="150"
            style={{ animation: 'sketch-draw 2s ease-out 0.5s forwards' }} />
          {/* Heart */}
          <g transform="translate(800, 550)" opacity="0.1">
            <path d="M10,5 C10,2 7,0 5,2 C3,0 0,2 0,5 C0,9 5,13 5,13 C5,13 10,9 10,5 Z"
              fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.2" strokeLinejoin="round" />
          </g>
          {/* Wavy line */}
          <path d="M100,350 Q150,335 200,350 Q250,365 300,350"
            fill="none" stroke="rgba(146,108,71,0.06)" strokeWidth="1.5" strokeLinecap="round"
            strokeDasharray="250" strokeDashoffset="250"
            style={{ animation: 'sketch-draw 2s ease-out 1s forwards' }} />
          {/* X marks */}
          <g transform="translate(750, 100)" opacity="0.07">
            <line x1="0" y1="0" x2="10" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="10" y1="0" x2="0" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
          </g>
          <g transform="translate(200, 500)" opacity="0.06">
            <line x1="0" y1="0" x2="8" y2="8" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="8" y1="0" x2="0" y2="8" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
          </g>
        </svg>

        <div className="relative z-10 w-full max-w-sm px-10">
          {/* Pencil icon area */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-dashed border-amber-900/20 rounded-full"
                style={{ animation: 'sketch-spin 8s linear infinite' }} />
              <div className="absolute inset-3 border border-dashed border-amber-800/10 rounded-full"
                style={{ animation: 'sketch-spin 12s linear infinite reverse' }} />
              <span className="text-3xl font-serif font-bold text-amber-900 tracking-wider italic">LA</span>
            </div>
          </div>

          {/* Message */}
          <div className="h-8 overflow-hidden mb-6 text-center">
            <div className="flex flex-col items-center transition-transform duration-500" style={{ transform: `translateY(-${currentMsgIdx * 32}px)` }}>
              {messages.map((msg, i) => (
                <div key={msg} className={`h-8 text-sm font-serif italic tracking-wide transition-opacity duration-500 ${currentMsgIdx === i ? 'text-amber-800' : 'text-amber-800/0'}`}>
                  {msg}
                </div>
              ))}
            </div>
          </div>

          {/* Ink-style progress bar */}
          <div className="relative h-[3px] w-full bg-amber-900/10 rounded-full overflow-hidden mb-3">
            <div
              className="absolute left-0 top-0 h-full bg-amber-800/60 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress label */}
          <div className="flex justify-between items-center w-full">
            <span className="text-[10px] font-serif italic text-amber-700/40">preparing your canvas</span>
            <span className="text-[10px] font-serif text-amber-800/50 font-bold">{Math.round(progress)}%</span>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes sketch-draw { to { stroke-dashoffset: 0; } }
          @keyframes sketch-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}} />
      </div>
    );
  }

  // ─── Dark Mode: Fun Tech ───
  return (
    <div className={`fixed inset-0 z-[100] bg-[#08080c] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]"
          style={{ animation: 'blob-float 6s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px]"
          style={{ animation: 'blob-float 8s ease-in-out 2s infinite' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px]"
          style={{ animation: 'blob-float 7s ease-in-out 1s infinite' }} />
      </div>

      {/* Dot grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

      {/* Floating emoji particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['✨', '🚀', '💻', '⚡', '🎮', '🎵', '🌙', '💜'].map((emoji, i) => (
          <div key={i} className="absolute text-lg opacity-0"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `emoji-float ${4 + i * 0.5}s ease-in-out ${i * 0.6}s infinite`,
            }}>
            {emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-sm px-10">
        {/* Logo area with orbiting dots */}
        <div className="mb-10 flex justify-center">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Outer orbit ring */}
            <div className="absolute inset-0 rounded-full"
              style={{ animation: 'ring-spin 4s linear infinite' }}>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.6)]" />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_8px_rgba(192,132,252,0.6)]" />
            </div>

            {/* Inner orbit ring */}
            <div className="absolute inset-3 rounded-full"
              style={{ animation: 'ring-spin 3s linear infinite reverse' }}>
              <div className="absolute top-0 right-0 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
            </div>

            {/* Center gradient circle */}
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              style={{ animation: 'gentle-bounce 2s ease-in-out infinite' }}>
              <span className="text-2xl font-black text-white tracking-widest">LA</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="h-8 overflow-hidden mb-6 text-center">
          <div className="flex flex-col items-center transition-transform duration-500" style={{ transform: `translateY(-${currentMsgIdx * 32}px)` }}>
            {messages.map((msg, i) => (
              <div key={msg} className={`h-8 text-sm tracking-wide transition-opacity duration-500 ${currentMsgIdx === i ? 'text-white/80' : 'text-white/0'}`}>
                {msg}
              </div>
            ))}
          </div>
        </div>

        {/* Gradient progress bar */}
        <div className="relative h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden mb-3">
          <div
            className="absolute left-0 top-0 h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
              boxShadow: '0 0 20px rgba(139,92,246,0.4)'
            }}
          />
          {/* Animated shimmer on progress bar */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                animation: 'shimmer 1.5s ease-in-out infinite',
                width: `${progress}%`,
              }} />
          </div>
        </div>

        {/* Progress label */}
        <div className="flex justify-between items-center w-full">
          <span className="text-[10px] text-white/20 tracking-wider">loading vibes</span>
          <span className="text-[10px] text-white/40 font-bold tabular-nums">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Bottom fun text instead of fake system stats */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-[10px] text-white/10 tracking-widest">crafted with 💜 by lance art</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blob-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        @keyframes ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes emoji-float {
          0% { opacity: 0; transform: translateY(20px) scale(0.8); }
          20% { opacity: 0.3; }
          50% { opacity: 0.15; transform: translateY(-30px) scale(1); }
          80% { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(20px) scale(0.8); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}} />
    </div>
  );
};

export default Preloader;
