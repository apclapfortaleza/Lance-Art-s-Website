import React, { useState } from 'react';
import { BookOpen, Code, GraduationCap, School, MapPin, ChevronRight, Image, Map } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Education = () => {
  const { isSketchMode } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [viewMode, setViewMode] = useState('satellite');
  const [isSystemActive, setIsSystemActive] = useState(false);

  const educationData = [
    {
      id: 0,
      school: "Asia Pacific College",
      degree: "Bachelor of Information Technology",
      desc: "Specializing in Software Engineering & Web Technologies",
      icon: <BookOpen size={20} />,
      img: "/assets/apc.jpg",
      map: "https://maps.google.com/maps?q=14.5311124,121.021315&t=k&z=17&ie=UTF8&iwloc=&output=embed",
      color: "blue",
      status: "📍 Currently Studying",
      statusDark: "ACTIVE",
      coords: "14.5311° N, 121.0213° E",
      darkGradient: "from-blue-500 to-cyan-500",
      darkGlow: "rgba(59,130,246,0.3)",
      sketchColor: "#3b6ca8",
      sketchBg: "bg-blue-50",
      sketchBorder: "border-blue-300/40",
      sketchText: "text-blue-800"
    },
    {
      id: 1,
      school: "STI Pasay-EDSA",
      degree: "Mobile App & Web Development",
      desc: "Senior Highschool Graduate - Technical Vocational Track",
      icon: <Code size={20} />,
      img: "/assets/sti.jpg",
      map: "https://maps.google.com/maps?q=14.5382306,120.9969267&t=k&z=17&ie=UTF8&iwloc=&output=embed",
      color: "purple",
      status: "🎓 Completed",
      statusDark: "COMPLETED",
      coords: "14.5382° N, 120.9969° E",
      darkGradient: "from-purple-500 to-violet-500",
      darkGlow: "rgba(168,85,247,0.3)",
      sketchColor: "#7c3aed",
      sketchBg: "bg-purple-50",
      sketchBorder: "border-purple-300/40",
      sketchText: "text-purple-800"
    },
    {
      id: 2,
      school: "APEC Schools Roxas",
      degree: "Highschool Graduate",
      desc: "Basic Secondary Education with emphasis on English Proficiency",
      icon: <GraduationCap size={20} />,
      img: "/assets/apec.jpg",
      map: "https://maps.google.com/maps?q=14.5457426,120.9915927&t=k&z=17&ie=UTF8&iwloc=&output=embed",
      color: "indigo",
      status: "✅ Graduated",
      statusDark: "GRADUATED",
      coords: "14.5457° N, 120.9915° E",
      darkGradient: "from-indigo-500 to-blue-500",
      darkGlow: "rgba(99,102,241,0.3)",
      sketchColor: "#4f46e5",
      sketchBg: "bg-indigo-50",
      sketchBorder: "border-indigo-300/40",
      sketchText: "text-indigo-800"
    },
    {
      id: 3,
      school: "Apelo Cruz Elementary School",
      degree: "Elementary Graduate",
      desc: "Primary Education - Fundamental Academic Foundation",
      icon: <School size={20} />,
      img: "/assets/apelo.jpg",
      map: "https://maps.google.com/maps?q=14.5350297,121.0064063&t=k&z=17&ie=UTF8&iwloc=&output=embed",
      color: "emerald",
      status: "✅ Graduated",
      statusDark: "GRADUATED",
      coords: "14.5350° N, 121.0064° E",
      darkGradient: "from-emerald-500 to-teal-500",
      darkGlow: "rgba(16,185,129,0.3)",
      sketchColor: "#047857",
      sketchBg: "bg-emerald-50",
      sketchBorder: "border-emerald-300/40",
      sketchText: "text-emerald-800"
    }
  ];

  const activeEdu = educationData[hoveredIndex];

  return (
    <section 
      id="edu" 
      className={`py-24 relative overflow-hidden min-h-screen flex flex-col justify-center transition-colors duration-700
        ${isSketchMode ? 'bg-[#f0ebe1]' : 'bg-zinc-950'}`}
      onMouseEnter={() => setIsSystemActive(true)}
      onClick={() => setIsSystemActive(true)}
      onTouchStart={() => setIsSystemActive(true)}
    >
      
      {/* Background */}
      {isSketchMode ? (
        <>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />
          <div className="absolute top-0 left-0 w-[35%] h-[40%] pointer-events-none opacity-40"
            style={{ background: 'radial-gradient(ellipse at 15% 20%, rgba(140,190,130,0.2) 0%, transparent 60%)' }} />
          <div className="absolute bottom-0 right-0 w-[30%] h-[35%] pointer-events-none opacity-40"
            style={{ background: 'radial-gradient(ellipse at 85% 80%, rgba(180,155,210,0.15) 0%, transparent 60%)' }} />

          {/* SVG Scribble doodles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            {/* Graduation cap doodle */}
            <g transform="translate(880, 100)" opacity="0.1">
              <path d="M0,12 L15,4 L30,12 L15,20 Z" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinejoin="round" />
              <line x1="15" y1="20" x2="15" y2="28" stroke="rgba(146,108,71,1)" strokeWidth="1.2" />
              <path d="M8,16 L8,22 Q15,26 22,22 L22,16" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1" />
            </g>
            {/* Star */}
            <g transform="translate(100, 650)" opacity="0.08">
              <path d="M8,1 L10,6 L15,6 L11,9 L12.5,14 L8,11 L3.5,14 L5,9 L1,6 L6,6 Z"
                fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.2" strokeLinejoin="round" />
            </g>
            {/* Book doodle */}
            <g transform="translate(60, 180)" opacity="0.07">
              <rect x="0" y="0" width="20" height="26" rx="2" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.2" />
              <line x1="10" y1="0" x2="10" y2="26" stroke="rgba(146,108,71,1)" strokeWidth="0.8" />
              <line x1="3" y1="6" x2="8" y2="6" stroke="rgba(146,108,71,1)" strokeWidth="0.8" strokeLinecap="round" />
              <line x1="3" y1="10" x2="8" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="0.8" strokeLinecap="round" />
              <line x1="12" y1="6" x2="17" y2="6" stroke="rgba(146,108,71,1)" strokeWidth="0.8" strokeLinecap="round" />
              <line x1="12" y1="10" x2="17" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="0.8" strokeLinecap="round" />
            </g>
            {/* Wavy underline */}
            <path d="M700,700 Q740,685 780,700 Q820,715 860,700 Q900,685 940,700"
              fill="none" stroke="rgba(146,108,71,0.06)" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray="300" strokeDashoffset="300"
              style={{ animation: 'edu-draw 2.5s ease-out 1s forwards' }} />
            {/* Pencil doodle */}
            <g transform="translate(850, 450)" opacity="0.08">
              <path d="M0,20 L3,0 L6,20 Z" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1" strokeLinejoin="round" />
              <line x1="3" y1="0" x2="3" y2="-4" stroke="rgba(146,108,71,1)" strokeWidth="0.8" strokeLinecap="round" />
            </g>
            {/* Spiral */}
            <path d="M820,200 C830,190 845,190 845,200 C845,210 830,215 825,205 C820,195 835,185 848,192"
              fill="none" stroke="rgba(146,108,71,0.07)" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray="150" strokeDashoffset="150"
              style={{ animation: 'edu-draw 2s ease-out 0.5s forwards' }} />
            {/* Dotted path */}
            <g opacity="0.05">
              {[...Array(7)].map((_, i) => (
                <circle key={i} cx={120 + i * 14} cy={400 + Math.sin(i * 0.9) * 8} r="1.5" fill="rgba(146,108,71,1)" />
              ))}
            </g>
          </svg>
        </>
      ) : (
        <>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }} />
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] bg-indigo-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

          {/* Floating geometric shapes */}
          <div className="absolute top-[12%] right-[10%] w-16 h-16 border border-blue-500/10 rounded-xl pointer-events-none"
            style={{ animation: 'edu-float 11s ease-in-out infinite', transform: 'rotate(20deg)' }} />
          <div className="absolute top-[55%] left-[6%] w-12 h-12 border border-purple-500/10 rounded-full pointer-events-none"
            style={{ animation: 'edu-float 9s ease-in-out 2s infinite' }} />
          <div className="absolute bottom-[15%] right-[15%] w-8 h-8 border border-indigo-500/10 pointer-events-none"
            style={{ animation: 'edu-float 13s ease-in-out 4s infinite', transform: 'rotate(45deg)' }} />
          <div className="absolute top-[30%] left-[18%] w-5 h-5 bg-blue-400/5 rounded-full pointer-events-none"
            style={{ animation: 'edu-float 8s ease-in-out 1s infinite' }} />
          <div className="absolute bottom-[40%] right-[6%] w-14 h-14 border border-cyan-500/8 rounded-xl pointer-events-none"
            style={{ animation: 'edu-float 10s ease-in-out 3s infinite', transform: 'rotate(-15deg)' }} />
          <div className="absolute top-[70%] right-[30%] w-3 h-3 bg-purple-400/5 rounded-full pointer-events-none"
            style={{ animation: 'edu-float 7s ease-in-out 5s infinite' }} />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
        </>
      )}

      <div className={`container mx-auto px-6 lg:px-12 relative z-10 transition-all duration-1000 ${isSystemActive ? 'opacity-100' : 'opacity-80 scale-95 blur-sm'}`}>
        
        {/* Header */}
        <div className={`flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isSystemActive ? 'items-start mb-8 translate-y-0' : 'items-center mb-16 translate-y-20 scale-110'}`}>
          <div className={`flex flex-wrap transition-all duration-1000 ${isSystemActive ? 'justify-start scale-90 origin-left' : 'justify-center'}`}>
            {"Education".split("").map((char, index) => (
              <span 
                key={index}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`text-6xl md:text-9xl font-black tracking-tighter cursor-default inline-block select-none animate-fade-in-up [transition:color_1000ms,transform_300ms,filter_300ms] hover:scale-125 hover:-translate-y-4
                  ${isSketchMode 
                    ? 'text-amber-900 font-serif hover:text-amber-700 drop-shadow-sm' 
                    : 'text-white hover:text-blue-400 drop-shadow-[0_0_8px_rgba(255,255,255,0)] hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]'}`}
              >
                {char}
              </span>
            ))}
          </div>
          <div className={`h-px transition-all duration-1000 ${isSystemActive ? 'w-full opacity-50' : 'w-64 opacity-20'} 
            ${isSketchMode ? 'bg-gradient-to-r from-transparent via-amber-800/30 to-transparent' : 'bg-gradient-to-r from-transparent via-blue-500 to-transparent'}`} />
        </div>

        {/* View Toggle */}
        <div className={`flex transition-all duration-1000 ${isSystemActive ? 'justify-start mb-12' : 'justify-center mb-16'}`}>
          <div className={`inline-flex w-fit p-1 rounded-full backdrop-blur-xl transition-all duration-1000 ${isSystemActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}
            ${isSketchMode ? 'bg-white/60 border-2 border-amber-900/10' : 'bg-zinc-900/50 border border-white/5'}`}>
            <button 
              onClick={() => setViewMode('photo')}
              className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-wider transition-all duration-500 flex items-center gap-2
                ${viewMode === 'photo' 
                  ? isSketchMode 
                    ? 'bg-amber-800 text-amber-50 shadow-md' 
                    : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                  : isSketchMode
                    ? 'text-amber-700/50 hover:text-amber-800'
                    : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <Image size={13} />
              Photos
            </button>
            <button 
              onClick={() => setViewMode('satellite')}
              className={`px-5 py-2 rounded-full text-[11px] font-bold tracking-wider transition-all duration-500 flex items-center gap-2
                ${viewMode === 'satellite' 
                  ? isSketchMode 
                    ? 'bg-amber-800 text-amber-50 shadow-md' 
                    : 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]' 
                  : isSketchMode
                    ? 'text-amber-700/50 hover:text-amber-800'
                    : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <Map size={13} />
              Map
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Column 1: Display Frame */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="relative group mx-auto lg:mx-0 max-w-lg">
               
               {/* Main Display Frame */}
               {/* Decorative corner accents */}
               {/* Decorative corner accents — Dark mode */}
               {!isSketchMode && isSystemActive && (
                 <>
                   <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-blue-500/30 rounded-tl-lg z-10 pointer-events-none" />
                   <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-purple-500/30 rounded-tr-lg z-10 pointer-events-none" />
                   <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-indigo-500/30 rounded-bl-lg z-10 pointer-events-none" />
                   <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-blue-500/30 rounded-br-lg z-10 pointer-events-none" />
                 </>
               )}
               {/* Decorative washi tapes — Sketch mode */}
               {isSketchMode && isSystemActive && (
                 <>
                   <div className="absolute -top-3 left-8 w-16 h-5 rounded-sm z-10 pointer-events-none"
                     style={{ background: activeEdu.sketchColor + '15', border: `1px solid ${activeEdu.sketchColor}20`, transform: 'rotate(-3deg)' }} />
                   <div className="absolute -top-2 right-12 w-12 h-4 rounded-sm z-10 pointer-events-none"
                     style={{ background: 'rgba(146,108,71,0.06)', border: '1px solid rgba(146,108,71,0.08)', transform: 'rotate(2deg)' }} />
                 </>
               )}

               <div className={`relative aspect-video lg:aspect-square overflow-hidden transition-all duration-500
                 ${isSketchMode 
                   ? 'rounded-2xl border-2 border-amber-900/15 shadow-[6px_6px_0_rgba(146,108,71,0.08)] bg-[#faf7f2]' 
                   : 'rounded-sm border border-zinc-800/50 shadow-2xl bg-black group-hover:border-blue-500/30'}`}>
                  
                  {/* Standby UI */}
                  {!isSystemActive && (
                    <div className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden
                      ${isSketchMode ? 'bg-[#faf7f2]' : 'bg-zinc-950'}`}>
                       {!isSketchMode && (
                         <div className="w-full h-full absolute flex items-center justify-center opacity-20">
                           <div className="w-[300px] h-[300px] border border-blue-500/30 rounded-full animate-ping" />
                           <div className="absolute w-[150px] h-[150px] border border-indigo-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
                         </div>
                       )}
                       <div className={`z-10 flex flex-col items-center gap-4 ${isSketchMode ? 'text-amber-800' : ''}`}>
                          <div className={`w-16 h-1 rounded-full overflow-hidden ${isSketchMode ? 'bg-amber-900/10' : 'bg-zinc-800'}`}>
                             <div className={`h-full animate-[loading-bar_3s_infinite] w-0 ${isSketchMode ? 'bg-amber-700/40' : 'bg-blue-500'}`}></div>
                          </div>
                          <span className={`text-xs tracking-wider ${isSketchMode ? 'font-serif italic text-amber-700/60' : 'font-mono text-zinc-500 animate-pulse uppercase tracking-[0.3em]'}`}>
                            {isSketchMode ? 'tap to explore...' : 'Hover to explore'}
                          </span>
                       </div>
                    </div>
                  )}

                  {/* Mode 1: Photo Feed */}
                  <div className={`absolute inset-0 transition-all duration-1000 ${viewMode === 'photo' && isSystemActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
                    <img 
                      src={activeEdu.img}
                      alt="Facility" 
                      className={`w-full h-full object-cover transition-all duration-700
                        ${isSketchMode ? 'saturate-[0.85] brightness-105' : 'grayscale-[30%] group-hover:grayscale-0'}`}
                      style={isSketchMode ? { filter: 'sepia(0.1) saturate(0.85) brightness(1.05)' } : undefined}
                    />
                    {!isSketchMode && (
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400/50 blur-sm animate-[scan_3s_linear_infinite]"></div>
                    )}
                  </div>

                  {/* Mode 2: Satellite Map */}
                  <div className={`absolute inset-0 transition-all duration-1000 ${viewMode === 'satellite' && isSystemActive ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
                    <iframe 
                      src={activeEdu.map}
                      className={`w-full h-full transition-all duration-700
                        ${isSketchMode ? 'saturate-[0.8] brightness-100' : 'saturate-[0.6] brightness-75 contrast-[1.2] opacity-80 group-hover:opacity-100'}`}
                      loading="lazy"
                      title="Educational Map"
                    ></iframe>
                    {/* Dark mode satellite HUD overlay */}
                    {!isSketchMode && (
                      <>
                        <div className="absolute inset-0 pointer-events-none border-[20px] border-black/50 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]" />
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-blue-500/40" />
                          <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-blue-500/40" />
                          <div className="absolute bottom-2 left-2 w-6 h-6 border-b border-l border-blue-500/40" />
                          <div className="absolute bottom-2 right-2 w-6 h-6 border-b border-r border-blue-500/40" />
                        </div>
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 pointer-events-none">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                          <span className="text-[8px] font-mono text-red-400/80">LIVE</span>
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] opacity-30 pointer-events-none" />
                      </>
                    )}
                  </div>

                  {/* Location badge */}
                  {isSystemActive && (
                    <div className={`absolute bottom-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-xl text-xs backdrop-blur-md
                      ${isSketchMode 
                        ? 'bg-white/80 text-amber-800 font-serif border border-amber-900/10' 
                        : 'bg-black/80 text-blue-400 font-mono border border-white/10'}`}>
                      <MapPin size={12} className={!isSketchMode ? 'animate-pulse' : ''} />
                      <span>{activeEdu.coords}</span>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Column 2: Records List */}
          <div className="flex-1 w-full order-1 lg:order-2">
            <div className="relative space-y-3">
              {/* Timeline connector line */}
              <div className={`absolute left-[25px] top-8 bottom-8 w-[2px] hidden lg:block
                ${isSketchMode ? 'border-l-2 border-dashed border-amber-900/10' : 'bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent'}`} />

              {educationData.map((edu, idx) => (
                <div 
                  key={edu.id}
                  onMouseEnter={() => { 
                    setHoveredIndex(idx);
                    setIsSystemActive(true);
                  }}
                  className={`relative p-5 transition-all duration-500 cursor-pointer group flex items-start gap-4
                    ${isSketchMode 
                      ? `rounded-2xl border-2 ${hoveredIndex === idx && isSystemActive
                          ? `bg-white ${edu.sketchBorder} shadow-[4px_4px_0_rgba(146,108,71,0.08)] translate-x-2 rotate-0`
                          : `bg-transparent border-transparent hover:border-amber-900/8 ${idx % 2 === 0 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]'}`}`
                      : `rounded-xl border ${hoveredIndex === idx && isSystemActive
                          ? 'bg-zinc-900/50 border-white/10 translate-x-3'
                          : 'bg-transparent border-zinc-900/50 hover:border-zinc-800'}`
                    }`}
                >
                  {/* Icon */}
                  <div className={`relative z-10 w-11 h-11 shrink-0 flex items-center justify-center rounded-xl transition-all duration-500
                    ${isSketchMode 
                      ? `border-2 border-dashed ${hoveredIndex === idx && isSystemActive 
                          ? `${edu.sketchBorder} ${edu.sketchText} ${edu.sketchBg}` 
                          : 'border-amber-900/10 text-amber-700/40 bg-[#f0ebe1]'}`
                      : `${hoveredIndex === idx && isSystemActive 
                          ? `bg-gradient-to-br ${edu.darkGradient} text-white shadow-lg` 
                          : 'bg-zinc-900 border border-zinc-800 text-zinc-600'}`
                    }`}
                    style={hoveredIndex === idx && isSystemActive && !isSketchMode ? { boxShadow: `0 0 20px ${edu.darkGlow}` } : undefined}
                  >
                    {edu.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`text-lg font-bold transition-colors truncate
                        ${isSketchMode 
                          ? `font-serif ${hoveredIndex === idx && isSystemActive ? 'text-amber-900' : 'text-amber-800/50'}`
                          : `${hoveredIndex === idx && isSystemActive ? 'text-white' : 'text-zinc-500'}`}`}>
                        {edu.school}
                      </h3>
                      {hoveredIndex === idx && isSystemActive && (
                        <ChevronRight size={16} className={`shrink-0 ml-2 ${isSketchMode ? 'text-amber-700' : 'text-blue-400'} animate-pulse`} />
                      )}
                    </div>
                    <p className={`text-xs tracking-wide
                      ${isSketchMode 
                        ? `font-serif italic ${hoveredIndex === idx && isSystemActive ? edu.sketchText : 'text-amber-700/40'}`
                        : `font-mono uppercase tracking-widest ${hoveredIndex === idx && isSystemActive ? 'text-blue-400' : 'text-zinc-600'}`}`}>
                      {edu.degree}
                    </p>
                    {/* Status badge */}
                    {hoveredIndex === idx && isSystemActive && (
                      <div className={`inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider
                        ${isSketchMode 
                          ? `${edu.sketchBg} ${edu.sketchText} border ${edu.sketchBorder}`
                          : `bg-gradient-to-r ${edu.darkGradient} bg-clip-text text-transparent border border-white/10 px-3`}`}>
                        {isSketchMode ? (
                          <span>{edu.status}</span>
                        ) : (
                          <>
                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse
                              ${edu.statusDark === 'ACTIVE' ? 'bg-green-400' : 'bg-blue-400'}`} />
                            {edu.statusDark}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Index number */}
                  <span className={`absolute top-2 right-3 text-[9px] 
                    ${isSketchMode ? 'font-serif italic text-amber-800/20' : 'font-mono text-zinc-800'}`}>
                    0{idx + 1}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Description box */}
            <div className={`mt-8 p-5 rounded-xl text-sm leading-relaxed transition-all duration-500
              ${isSketchMode 
                ? `bg-white/70 border-2 border-dashed ${activeEdu.sketchBorder} ${activeEdu.sketchText} font-serif italic shadow-[3px_3px_0_rgba(146,108,71,0.05)]` 
                : 'bg-white/[0.02] border border-white/5 text-zinc-500 font-mono text-[11px] tracking-tight'}`}>
               {isSketchMode 
                 ? <span className="flex items-start gap-2">✏️ <em>"{activeEdu.desc}"</em></span>
                 : `> ${activeEdu.desc}`}
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 100%; transform: translateX(0%); }
          100% { width: 0%; transform: translateX(100%); }
        }
        @keyframes edu-float {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); opacity: 0.5; }
          50% { transform: translateY(-18px) rotate(calc(var(--tw-rotate, 0deg) + 8deg)); opacity: 1; }
        }
        @keyframes edu-draw {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </section>
  );
};

export default Education;
