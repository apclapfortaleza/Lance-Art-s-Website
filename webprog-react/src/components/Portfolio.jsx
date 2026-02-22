import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';

const projects = [
  {
    id: "delivery",
    title: "(Project Rudy) Delivery App",
    subtitle: "Similar to Grab / Food Panda",
    desc: "A simple mobile delivery app featuring real-time tracking, order management, and a seamless checkout experience.",
    image: "/assets/delivery.png",
    tags: ["Java", "XML", "Android Studio"],
    media: [
      { type: "youtube", src: "https://www.youtube.com/embed/CfkjJd6pFHY", alt: "Delivery Ad Demo Video" },
      { type: "youtube", src: "https://www.youtube.com/embed/cY8D7BRjUfk", alt: "Delivery Ad 2 Video" },
    ],
  },
  {
    id: "game",
    title: "(Friendle) Interactive Choice Game",
    subtitle: "Chatting Strangers Parody",
    desc: "A web-based narrative experience mimicking random chat websites.",
    image: "/assets/chat.png",
    tags: ["JavaScript", "HTML", "CSS"],
  },
  {
    id: "ebook",
    title: "Voice Assisted E-Book",
    subtitle: "Accessibility-focused Reading",
    desc: "A simple python code with voice commands and text-to-speech technology.",
    image: "/assets/Ebook.png",
    tags: ["Python"],
  },
  {
    id: "shoes",
    title: "(DropStock) Shoe Selling Website",
    subtitle: "Community Forum",
    desc: "Developed the social hub of the platform, allowing sneakerheads to discuss trends.",
    image: "/assets/shoe.png",
    tags: ["Outsystems"],
    media: [
      { type: "image", src: "/assets/dropstockdemo.png", alt: "DropStock Demo" },
      { type: "image", src: "/assets/dropstockdemo2.png", alt: "DropStock Demo 2" },
    ],
  },
  {
    id: "matchmake",
    title: "(La-Love) Love Tester",
    subtitle: "Front-end design",
    desc: "A matchmaking website where you measure your chance with your crush.",
    image: "/assets/love.png",
    tags: ["Canva"],
    media: [
      { type: "image", src: "/assets/Matchmakedemo.png", alt: "Matchmake Demo" },
    ],
  },
];

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const [isChanging, setIsChanging] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleProjectChange = (project) => {
    if (activeProject?.id === project.id || isChanging) return;
    
    setIsChanging(true);
    
    // If we already have a project visible, just swap the content smoothly
    if (isDetailsVisible) {
      setIsContentVisible(false); // Fade out content only
      setTimeout(() => {
        setActiveProject(project);
        setActiveMediaIndex(0);
        setIsContentVisible(true); // Fade in new content
        setIsChanging(false);
      }, 500);
    } else {
      // First project selection: Do the full morph
      setIsDetailsVisible(false); 
      setTimeout(() => {
        setActiveProject(project);
        setActiveMediaIndex(0);
        setIsDetailsVisible(true);
        setIsContentVisible(true);
        setIsChanging(false);
      }, 500);
    }
  };

  const nextMedia = () => {
    if (activeProject?.media && activeMediaIndex < activeProject.media.length - 1) {
      setActiveMediaIndex(i => i + 1);
    }
  };

  const prevMedia = () => {
    if (activeProject?.media && activeMediaIndex > 0) {
      setActiveMediaIndex(i => i - 1);
    }
  };

  return (
    <section id="exp" className="py-24 bg-zinc-900 min-h-screen relative overflow-hidden flex items-center">
      
      {/* Enhanced Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[160px] transition-all duration-1000 ${isDetailsVisible ? 'opacity-60 scale-125' : 'opacity-30'}`}></div>
         <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] transition-all duration-1000 ${isDetailsVisible ? 'opacity-40' : 'opacity-10'}`}></div>
         
         {/* Animated Grid Overlay */}
         <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        
        {/* Portfolio Content Wrapper - Enhanced Spacing & Glow */}
        <div className={`transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] w-full flex flex-col ${isDetailsVisible ? 'items-start mb-16' : 'items-center mb-32'}`}>
          <div className={`flex flex-wrap transition-all duration-1000 ${isDetailsVisible ? 'justify-start scale-90 origin-left' : 'justify-center scale-100'}`}>
            {"Portfolio".split("").map((char, index) => (
              <span 
                key={index}
                style={{ transitionDelay: `${index * 50}ms` }}
                className="text-6xl md:text-9xl font-black tracking-tighter text-white hover:text-blue-400 drop-shadow-[0_0_8px_rgba(255,255,255,0)] hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:scale-125 hover:-translate-y-4 cursor-default inline-block select-none animate-fade-in-up [transition:color_1000ms,transform_300ms,filter_300ms]"
              >
                {char}
              </span>
            ))}
          </div>
          <p className={`text-zinc-500 mt-10 text-xl font-medium tracking-wide transition-all duration-500 ${isDetailsVisible ? 'opacity-0 h-0 overflow-hidden mt-0' : 'opacity-100'}`}>
            &gt; Select a project to explore the architecture
          </p>
        </div>

        {/* Project Icons List (Horizontal Staggered) */}
        <div className={`flex flex-wrap gap-4 sm:gap-8 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isDetailsVisible ? 'justify-start mb-12' : 'justify-center mb-20'}`}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                onMouseEnter={() => !isDetailsVisible && !isChanging && handleProjectChange(project)}
                onClick={() => handleProjectChange(project)}
                style={{ transitionDelay: `${index * 100}ms` }}
                className={`group relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 border-2 animate-fade-in-up ${
                  activeProject?.id === project.id 
                  ? 'border-blue-500 scale-110 shadow-[0_30px_60px_rgba(59,130,246,0.4)] z-10 w-28 h-28 sm:w-32 sm:h-32' 
                  : `border-zinc-800/50 opacity-40 hover:opacity-100 hover:scale-105 filter grayscale hover:grayscale-0 shadow-xl ${isDetailsVisible ? 'w-20 h-20 sm:w-24 sm:h-24 grayscale-0' : 'w-28 h-28 sm:w-36 sm:h-36'}`
                }`}
              >
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                  />
                  <div className={`absolute inset-0 bg-blue-600/20 transition-opacity duration-500 ${activeProject?.id === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
                  
                  {/* Selection Indicator */}
                  {activeProject?.id === project.id && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                  )}
              </div>
            ))}
        </div>

        {/* Details Panel with Independent Content Motion */}
        <div className={`w-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isContentVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-98 pointer-events-none'}`}>
          {activeProject && (
            <div className="w-full bg-zinc-950/60 backdrop-blur-3xl rounded-[3rem] p-8 sm:p-16 border border-zinc-700/30 shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden relative group/panel">
              
              {/* Dynamic Shine */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>

              <div className="grid lg:grid-cols-5 gap-16 items-center relative z-10">
                
                {/* Text details with independent timing */}
                <div className={`lg:col-span-3 space-y-8 transition-all duration-700 ${isContentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <span className="h-px w-12 bg-blue-500"></span>
                        <span className="text-blue-500 font-bold tracking-[0.3em] text-xs uppercase">Core Development</span>
                     </div>
                     <h3 className="text-5xl sm:text-7xl font-black text-white tracking-tighter leading-[0.9] py-2 drop-shadow-2xl">
                       {activeProject.title}
                     </h3>
                  </div>
                  
                  <p className="text-2xl sm:text-3xl text-zinc-300 font-medium tracking-tight opacity-80 italic">
                    {activeProject.subtitle}
                  </p>
                  
                  <div className="h-px w-full bg-gradient-to-r from-zinc-700 via-transparent to-transparent"></div>
                  
                  <p className="text-zinc-400 text-lg sm:text-2xl leading-relaxed max-w-2xl font-light">
                    {activeProject.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-6">
                    {activeProject.tags.map(tag => (
                      <span key={tag} className="px-6 py-2.5 bg-zinc-900 border border-zinc-700/50 rounded-2xl text-zinc-400 text-sm font-bold tracking-wider hover:bg-zinc-800 hover:text-white hover:border-blue-500/50 transition-all cursor-default">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Media Content with independent timing */}
                <div className={`lg:col-span-2 transition-all duration-1000 delay-200 ${isContentVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-12 rotate-2'}`}>
                    {activeProject.media && activeProject.media.length > 0 ? (
                      <div className="relative rounded-[2.5rem] overflow-hidden bg-black w-full aspect-square shadow-[0_30px_80px_rgba(0,0,0,0.8)] border border-zinc-800 group hover:border-blue-500/30 transition-all duration-700">
                        {activeProject.media.map((item, idx) => (
                          <div 
                            key={idx} 
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                              idx === activeMediaIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                          >
                            {item.type === 'image' && (
                              <img src={item.src} alt={item.alt} className="w-full h-full object-cover transition-transform duration-[2000ms] hover:scale-110" />
                            )}
                            {item.type === 'youtube' && (
                              <iframe className="w-full h-full" src={item.src} title="Video" allowFullScreen></iframe>
                            )}
                          </div>
                        ))}

                        {/* Controls Overlay */}
                        {activeProject.media.length > 1 && (
                          <>
                            <div className="absolute inset-x-0 bottom-8 flex justify-center gap-3 z-30">
                              {activeProject.media.map((_, idx) => (
                                <button key={idx} onClick={() => setActiveMediaIndex(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeMediaIndex ? 'bg-blue-500 w-10' : 'bg-white/20 w-4 hover:bg-white/40'}`} />
                              ))}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                               <button onClick={prevMedia} className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all"><ChevronLeft size={24} /></button>
                               <button onClick={nextMedia} className="p-3 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all"><ChevronRight size={24} /></button>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-zinc-900 rounded-[2.5rem] border border-dashed border-zinc-800 flex flex-col items-center justify-center text-zinc-600 animate-pulse">
                        <PlayCircle size={64} className="mb-6 opacity-20" />
                        <p className="font-mono text-xs tracking-[0.3em] uppercase">Development // Preview</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
      `}} />
    </section>
  );

};

export default Portfolio;
