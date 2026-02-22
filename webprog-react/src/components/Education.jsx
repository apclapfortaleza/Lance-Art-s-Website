import React, { useState } from 'react';
import { BookOpen, Code, GraduationCap, School } from 'lucide-react';

const Education = () => {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [viewMode, setViewMode] = useState('photo'); // 'photo' or 'satellite'
  const [isSystemActive, setIsSystemActive] = useState(false);

  const educationData = [
    // ... (data remains same)
    {
      id: 0,
      school: "Asia Pacific College",
      degree: "Bachelor of Information Technology",
      desc: "Specializing in Software Engineering & Web Technologies",
      icon: <BookOpen size={20} />,
      img: "/assets/apc.jpg",
      map: "https://maps.google.com/maps?q=14.5311124,121.021315&t=k&z=17&ie=UTF8&iwloc=&output=embed",
      color: "blue",
      status: "CURRENT",
      coords: "14.5311° N, 121.0213° E"
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
      status: "COMPLETED",
      coords: "14.5382° N, 120.9969° E"
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
      status: "GRADUATED",
      coords: "14.5457° N, 120.9915° E"
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
      status: "GRADUATED",
      coords: "14.5350° N, 121.0064° E"
    }
  ];

  return (
    <section 
      id="edu" 
      className="py-24 bg-zinc-950 relative overflow-hidden min-h-screen flex flex-col justify-center"
      onMouseEnter={() => setIsSystemActive(true)}
      onClick={() => setIsSystemActive(true)}
      onTouchStart={() => setIsSystemActive(true)}
    >
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className={`container mx-auto px-6 lg:px-12 relative z-10 transition-all duration-1000 ${isSystemActive ? 'opacity-100' : 'opacity-80 scale-95 blur-sm'}`}>
        
        {/* Header Section */}
        <div className={`flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isSystemActive ? 'items-start mb-8 translate-y-0' : 'items-center mb-16 translate-y-20 scale-110'}`}>
          <div className={`flex flex-wrap transition-all duration-1000 ${isSystemActive ? 'justify-start scale-90 origin-left' : 'justify-center'}`}>
            {"Education".split("").map((char, index) => (
              <span 
                key={index}
                style={{ transitionDelay: `${index * 50}ms` }}
                className="text-6xl md:text-9xl font-black tracking-tighter text-white hover:text-blue-400 drop-shadow-[0_0_8px_rgba(255,255,255,0)] hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-125 hover:-translate-y-4 cursor-default inline-block select-none animate-fade-in-up [transition:color_1000ms,transform_300ms,filter_300ms]"
              >
                {char}
              </span>
            ))}
          </div>
          <div className={`h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-all duration-1000 ${isSystemActive ? 'w-full opacity-50' : 'w-64 opacity-20'}`}></div>
        </div>

        {/* View Toggle - Now Inline-Flex to avoid full width stretching */}
        <div className={`flex justify-center transition-all duration-1000 ${isSystemActive ? 'justify-start mb-12' : 'justify-center mb-16'}`}>
          <div className={`inline-flex w-fit bg-zinc-900/50 p-1 rounded-full border border-white/5 backdrop-blur-xl transition-all duration-1000 ${isSystemActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
            <button 
              onClick={() => setViewMode('photo')}
              className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all duration-500 ${viewMode === 'photo' ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              PHOTO_FEED
            </button>
            <button 
              onClick={() => setViewMode('satellite')}
              className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all duration-500 ${viewMode === 'satellite' ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              LIVE_SATELLITE
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Column 1: Display Frame */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="relative group mx-auto lg:mx-0 max-w-lg">
               
               {/* Targeting HUD Overlay */}
               {viewMode === 'satellite' && isSystemActive && (
                  <div className="absolute inset-0 pointer-events-none z-30 animate-[vignette-pulse_4s_infinite]">
                     {/* Static Viewport Brackets */}
                     <div className="absolute inset-0 border-[40px] border-black/20"></div>
                     <div className="absolute inset-4 border border-white/5"></div>
                     
                     <div className="absolute top-4 left-4 flex gap-2">
                        <div className="w-1 h-1 bg-red-500 animate-pulse"></div>
                        <span className="text-[8px] font-mono text-red-500">REC // LIVE_LINK</span>
                     </div>

                     {/* Outer Corners */}
                     <div className="absolute top-0 left-0 w-10 h-10 border-t border-l border-indigo-500/50"></div>
                     <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-indigo-500/50"></div>
                     <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-indigo-500/50"></div>
                     <div className="absolute bottom-0 right-0 w-10 h-10 border-b border-r border-indigo-500/50"></div>

                     {/* Scanning Line overlay */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20"></div>
                  </div>
               )}
               
               {/* Main Display Frame */}
               <div className="relative aspect-video lg:aspect-square rounded-sm overflow-hidden border border-zinc-800 shadow-3xl bg-black group-hover:border-blue-500/50 transition-colors">
                  
                  {/* Standby UI */}
                  {!isSystemActive && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden">
                       <div className="w-full h-full absolute flex items-center justify-center opacity-20">
                          <div className="w-[300px] h-[300px] border border-blue-500/30 rounded-full animate-ping"></div>
                          <div className="absolute w-[150px] h-[150px] border border-indigo-500/20 rounded-full animate-[ping_3s_linear_infinite]"></div>
                       </div>
                       <div className="z-10 flex flex-col items-center gap-6">
                          <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 animate-[loading-bar_3s_infinite] w-0"></div>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                             <span className="text-[10px] font-mono text-blue-400 animate-pulse tracking-[0.4em] uppercase">System Standby</span>
                             <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Awaiting Geolocation Data...</span>
                          </div>
                       </div>
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
                    </div>
                  )}

                  {/* Mode 1: Photo Feed */}
                  <div className={`absolute inset-0 transition-all duration-1000 ${viewMode === 'photo' && isSystemActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
                    <img 
                      src={educationData[hoveredIndex].img}
                      alt="Facility" 
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay"></div>
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400/50 blur-sm animate-[scan_3s_linear_infinite]"></div>
                  </div>

                  {/* Mode 2: Google Maps Satellite View */}
                  <div className={`absolute inset-0 transition-all duration-1000 ${viewMode === 'satellite' && isSystemActive ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'}`}>
                    <iframe 
                      src={educationData[hoveredIndex].map}
                      className="w-full h-full saturate-[0.6] brightness-75 contrast-[1.2] opacity-80 group-hover:opacity-100 transition-all duration-700"
                      loading="lazy"
                      title="Educational Map"
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none bg-blue-500/5 mix-blend-overlay"></div>
                    <div className="absolute inset-0 pointer-events-none border-[15px] border-black/60 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]"></div>
                  </div>

                  {/* Corner Readout HUD */}
                  {isSystemActive && (
                    <div className="hidden sm:flex absolute bottom-4 right-4 bg-black/90 backdrop-blur-md border border-white/10 p-2 rounded text-[9px] font-mono text-blue-400 z-40 flex-col gap-1 shadow-2xl">
                      <span className="flex justify-between gap-4 font-bold text-white mb-1 border-b border-white/10 pb-1">UPLINK: ACTIVE</span>
                      <span className="flex justify-between gap-4">LOC: <span>{educationData[hoveredIndex].coords}</span></span>
                      <span className="flex justify-between gap-4">ALT: <span>2.4KM</span></span>
                      <span className="flex justify-between gap-4 text-blue-500/50 italic">ENCRYPTED_FEED_V.1</span>
                    </div>
                  )}
               </div>
            </div>
          </div>

          {/* Column 2: Records List */}
          <div className="flex-1 w-full order-1 lg:order-2">
            <div className="space-y-3">
              {educationData.map((edu, idx) => (
                <div 
                  key={edu.id}
                  onMouseEnter={() => { 
                    setHoveredIndex(idx);
                    setIsSystemActive(true);
                  }}
                  className={`relative p-5 rounded-sm border transition-all duration-500 cursor-pointer group flex items-start gap-4 ${
                    hoveredIndex === idx && isSystemActive
                    ? 'bg-zinc-900/60 border-blue-500/50 translate-x-3' 
                    : 'bg-transparent border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  <div className={`w-10 h-10 shrink-0 flex items-center justify-center border transition-colors ${
                     hoveredIndex === idx && isSystemActive ? 'bg-blue-500/20 border-blue-500/40 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-zinc-900 border-zinc-800 text-zinc-600'
                  }`}>
                    {edu.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`text-lg font-bold transition-colors ${hoveredIndex === idx && isSystemActive ? 'text-white' : 'text-zinc-500'}`}>
                        {edu.school}
                      </h3>
                      {hoveredIndex === idx && isSystemActive && (
                         <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                      )}
                    </div>
                    <p className={`text-xs font-mono uppercase tracking-widest ${hoveredIndex === idx && isSystemActive ? 'text-blue-400' : 'text-zinc-600'}`}>
                      {edu.degree}
                    </p>
                  </div>
                  
                  <span className="absolute top-2 right-3 text-[8px] font-mono text-zinc-800">0{idx + 1}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/10 rounded font-mono text-[10px] text-zinc-500 leading-relaxed italic transition-opacity tracking-tight">
               &gt; TRACKING_ENTRY_{hoveredIndex}: {educationData[hoveredIndex].desc}
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
        @keyframes vignette-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}} />
    </section>
  );
};

export default Education;
