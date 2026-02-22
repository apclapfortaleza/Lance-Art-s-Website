import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Heart, X, BookOpen, Grid, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from './ThemeContext';

const galleryItems = [
  { type: "image", src: "/assets/gallery/1.jpg" },
  { type: "image", src: "/assets/gallery/2.jpg" },
  { type: "image", src: "/assets/gallery/3.jpg" },
  { type: "image", src: "/assets/gallery/4.jpg" },
  { type: "image", src: "/assets/gallery/5.png" },
  { type: "image", src: "/assets/gallery/6.jpg" },
  { type: "image", src: "/assets/gallery/7.jpg" },
  { type: "image", src: "/assets/gallery/8.jpg" },
  { type: "video", src: "/assets/gallery/9.mp4" },
  { type: "image", src: "/assets/gallery/10.jpg" },
  { type: "image", src: "/assets/gallery/11.jpg" },
  { type: "image", src: "/assets/gallery/12.jpg" },
  { type: "image", src: "/assets/gallery/13.jpg" },
  { type: "image", src: "/assets/gallery/14.jpg" },
  { type: "image", src: "/assets/gallery/15.jpg" },
  { type: "image", src: "/assets/gallery/16.jpg" },
];

const heartPositions = [
  // Row 1
  { col: 2, row: 1 }, { col: 4, row: 1 }, 
  // Row 2
  { col: 1, row: 2 }, { col: 2, row: 2 }, { col: 3, row: 2 }, { col: 4, row: 2 }, { col: 5, row: 2 },
  // Row 3
  { col: 1, row: 3 }, { col: 2, row: 3 }, { col: 3, row: 3 }, { col: 4, row: 3 }, { col: 5, row: 3 },
  // Row 4
  { col: 2, row: 4 }, { col: 3, row: 4 }, { col: 4, row: 4 },
  // Row 5
  { col: 3, row: 5 }
];

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [bookPage, setBookPage] = useState(0);
  const [turnDirection, setTurnDirection] = useState('next');
  const [isInitialized, setIsInitialized] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const sectionRef = useRef(null);
  const { isSketchMode } = useTheme();

  // Intersection Observer for the cool materialization effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInitialized) {
          setIsInitialized(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isInitialized]);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalBookPages = Math.ceil(galleryItems.length / 2);

  const nextPage = () => {
    setTurnDirection('next');
    setBookPage(p => Math.min(p + 1, totalBookPages - 1));
  };
  const prevPage = () => {
    setTurnDirection('prev');
    setBookPage(p => Math.max(p - 1, 0));
  };

  // Smart Media Component to handle orientations
  const MediaItem = ({ item, className = "", isBook = false }) => {
    const [orientation, setOrientation] = useState('landscape');
    const [isLoaded, setIsLoaded] = useState(false);
    
    if (!item) return null;

    const handleLoad = (e) => {
      const { naturalWidth, naturalHeight } = e.target;
      setOrientation(naturalHeight > naturalWidth ? 'portrait' : 'landscape');
      setIsLoaded(true);
    };

    const handleVideoLoad = (e) => {
      const { videoWidth, videoHeight } = e.target;
      setOrientation(videoHeight > videoWidth ? 'portrait' : 'landscape');
      setIsLoaded(true);
    };

    const content = item.type === 'video' ? (
      <div className={`relative w-full h-full flex items-center justify-center ${isBook ? 'p-2 sm:p-4' : 'p-0'} transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <video 
          src={item.src} 
          className={`max-w-full max-h-full object-contain ${isBook ? 'shadow-[0_10px_40px_rgba(0,0,0,0.4)] border-4 border-white' : 'w-full h-full object-cover'} ${
            orientation === 'portrait' && isBook ? 'h-full w-auto' : ''
          } ${className}`} 
          muted autoPlay loop playsInline preload="auto"
          onLoadedMetadata={handleVideoLoad}
          onMouseOver={(e) => e.target.play()} 
          onMouseOut={(e) => e.target.pause()} 
        />
      </div>
    ) : (
      <div className={`relative w-full h-full flex items-center justify-center transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${isBook ? 'p-2 sm:p-4' : 'p-0'}`}>
        <img 
          src={item.src} 
          alt="Gallery Item" 
          onLoad={handleLoad}
          className={`transition-all duration-700 ${isBook ? 'shadow-[0_10px_40px_rgba(0,0,0,0.4)] border-4 border-white' : ''} max-w-full max-h-full ${
            orientation === 'portrait' && isBook 
              ? 'h-full w-auto object-contain' 
              : 'w-full h-full object-cover'
          } ${className}`} 
        />
        {isBook && (
          <div className="absolute inset-4 pointer-events-none border-[1px] border-black/5 opacity-50"></div>
        )}
      </div>
    );

    return content;
  };

  return (
    <section 
      id="memory-heart" 
      ref={sectionRef}
      className="py-24 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden transition-all duration-700 min-h-screen flex flex-col justify-center"
    >
      
      {/* Moving Laser Sweep Line - The "Life Line" */}
      <div 
        className={`absolute inset-x-0 h-[2px] bg-cyan-400 shadow-[0_0_30px_rgba(6,182,212,1),0_0_60px_rgba(6,182,212,0.5)] z-50 transition-all duration-[2000ms] ease-in-out pointer-events-none ${isInitialized ? 'top-full opacity-0' : 'top-0 opacity-100'}`}
      />

      {/* Holographic Laser Flowers Background - VISIBILITY BOOSTED */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-all duration-[1500ms] ${isInitialized ? 'opacity-100' : 'opacity-0 scale-110 blur-3xl'}`}>
        {/* Hologram Grid/Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_3px,transparent_3px)] bg-[size:100%_4px] animate-scanline"></div>

        {/* Floating Laser Flora Clusters - "Embracing" Layout */}
        <div className={`absolute inset-0 z-0 overflow-hidden transition-all duration-[2000ms] delay-300 ${isInitialized ? 'translate-y-0 scale-100' : 'translate-y-20 scale-110'}`}>
            {/* Top Left Cluster */}
            <div className={`absolute top-[10%] left-[5%] w-64 h-64 transition-transform duration-[2000ms] ${isBookOpen ? '-translate-x-20 -translate-y-10 scale-125' : 'translate-x-0'}`}>
                <svg className="w-full h-full text-cyan-400/40 animate-hologram-float" viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 0 20px rgba(34,211,238,0.6))' }}>
                  <path fill="none" stroke="currentColor" strokeWidth="0.8" d="M100,100 C150,20 190,60 100,100 C10,60 50,20 100,100" 
                        className={isInitialized ? "animate-draw-path" : ""} style={{ strokeDasharray: 600, strokeDashoffset: 600 }} />
                  <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M100,100 C180,50 180,150 100,100 C20,150 20,50 100,100" transform="rotate(60 100 100)" 
                        className={isInitialized ? "animate-draw-path" : ""} style={{ strokeDasharray: 600, strokeDashoffset: 600, animationDelay: '0.2s' }} />
                </svg>
            </div>

            {/* Bottom Right Cluster */}
            <div className={`absolute bottom-[10%] right-[5%] w-80 h-80 transition-transform duration-[2000ms] ${isBookOpen ? 'translate-x-20 translate-y-10 scale-125' : 'translate-x-0'}`}>
                <svg className="w-full h-full text-emerald-400/40 animate-hologram-float-alt" viewBox="0 0 200 200" style={{ filter: 'drop-shadow(0 0 25px rgba(52,211,153,0.5))' }}>
                  <path fill="none" stroke="currentColor" strokeWidth="1" d="M0,200 Q50,150 100,180 T200,100" 
                        className={isInitialized ? "animate-draw-path" : ""} style={{ strokeDasharray: 600, strokeDashoffset: 600 }} />
                </svg>
            </div>

            {/* Side Tendrils - Embracing Animation */}
            <div className="absolute inset-x-[15%] inset-y-[20%] pointer-events-none">
                <svg className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-[80%] text-cyan-400/20" viewBox="0 0 100 400">
                    <path fill="none" stroke="currentColor" strokeWidth="1" d="M0,0 Q80,100 20,200 T80,400" 
                          className={isInitialized ? "animate-draw-path" : ""} style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }} />
                </svg>
                <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-[80%] text-magenta-400/20" viewBox="0 0 100 400">
                    <path fill="none" stroke="currentColor" strokeWidth="1" d="M100,0 Q20,100 80,200 T20,400" 
                          className={isInitialized ? "animate-draw-path" : ""} style={{ strokeDasharray: 1000, strokeDashoffset: 1000, color: '#ff49db' }} />
                </svg>
            </div>
        </div>

            {/* Central Master Cluster */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-full flex items-center justify-center opacity-80">
                <svg className="absolute w-[600px] h-[600px] text-cyan-500/15 animate-hologram-rotate" viewBox="0 0 400 400">
                    {[...Array(12)].map((_, i) => (
                        <g key={i} transform={`rotate(${i * 30} 200 200)`}>
                            <path fill="none" stroke="currentColor" strokeWidth="0.4" d="M200,200 Q250,50 300,200 T200,350" />
                            <circle cx="300" cy="200" r="3" fill="currentColor" className="animate-pulse shadow-lg" />
                        </g>
                    ))}
                </svg>
                
                <svg className="absolute w-[800px] h-[800px] text-magenta-500/10 animate-pulse" viewBox="0 0 400 400">
                    {[...Array(24)].map((_, i) => (
                        <line 
                            key={i} 
                            x1="200" y1="200" 
                            x2={200 + Math.cos(i * 15 * Math.PI / 180) * 300} 
                            y2={200 + Math.sin(i * 15 * Math.PI / 180) * 300} 
                            stroke="currentColor" 
                            strokeWidth="0.2" 
                        />
                    ))}
                </svg>

                {[...Array(20)].map((_, i) => (
                    <svg key={i} className="absolute w-10 h-10 text-cyan-300/30 animate-hologram-float shadow-white" 
                         style={{ 
                            left: `${Math.random() * 100}%`, 
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.4}s`,
                         }} viewBox="0 0 100 100">
                        <path fill="none" stroke="currentColor" strokeWidth="0.8" d="M50,50 Q70,20 90,50 T50,80 Z" />
                    </svg>
                ))}
            </div>
        </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-wrap justify-center mb-12">
          {"Gallery".split("").map((char, index) => (
            <span 
              key={index}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white hover:text-blue-400 drop-shadow-[0_0_8px_rgba(255,255,255,0)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] hover:scale-125 hover:-translate-y-4 cursor-default inline-block select-none [transition:color_1000ms,transform_300ms,filter_300ms]"
            >
              {char}
            </span>
          ))}
        </div>

        <div className="text-center relative inline-block mx-auto w-full">
           
           {/* Book Open/Close Toggle */}
           <div className={`transition-all duration-500 flex justify-center w-full mb-6 ${!isBookOpen ? 'opacity-0 h-0 w-0 overflow-hidden m-0 p-0 pointer-events-none' : 'opacity-100'}`}>
              <button 
                onClick={() => { setIsBookOpen(false); setBookPage(0); }}
                className="flex items-center justify-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full font-bold transition-all text-sm sm:text-base bg-[#3e2723] hover:bg-[#2d1b18] text-[#d4af37] shadow-lg hover:scale-105 active:scale-95 border border-[#5c3a21] shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
              >
                <BookOpen size={20} /> Close Album
              </button>
           </div>
        </div>

        {/* --- ALBUM COVER (HEART LAYOUT) --- */}
        {!isBookOpen && (
          <div className={`w-full max-w-[650px] mx-auto flex flex-col items-center relative z-20 pb-10 transition-all duration-1000 ${isInitialized ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 scale-95 blur-xl pointer-events-none'}`}>
             
             {/* Sketch Mode — Watercolor Flower Decorations Behind Book */}
             {isSketchMode && (
               <div className="absolute inset-0 z-10 pointer-events-none overflow-visible">
                 
                 {/* === TOP-RIGHT: Large peony with cherry blossoms === */}
                 <svg className="absolute -top-20 -right-32 w-80 h-80 animate-[gentle-float_8s_ease-in-out_infinite]" viewBox="0 0 300 300" fill="none">
                   {/* Watercolor splash background */}
                   <circle cx="150" cy="120" r="90" fill="rgba(225,170,185,0.12)" />
                   <circle cx="180" cy="100" r="60" fill="rgba(200,165,210,0.08)" />
                   
                   {/* Main Peony */}
                   <ellipse cx="160" cy="110" rx="45" ry="40" fill="rgba(220,150,165,0.45)" />
                   <ellipse cx="155" cy="105" rx="38" ry="33" fill="rgba(230,165,180,0.5)" />
                   <ellipse cx="160" cy="100" rx="30" ry="26" fill="rgba(238,180,195,0.55)" />
                   <ellipse cx="158" cy="108" rx="22" ry="20" fill="rgba(242,190,205,0.6)" />
                   <ellipse cx="160" cy="105" rx="14" ry="13" fill="rgba(235,175,190,0.65)" />
                   <circle cx="160" cy="105" r="6" fill="rgba(210,140,160,0.5)" />
                   {/* Outer petals */}
                   <ellipse cx="125" cy="90" rx="22" ry="14" fill="rgba(225,160,175,0.35)" transform="rotate(-30 125 90)" />
                   <ellipse cx="195" cy="95" rx="20" ry="12" fill="rgba(225,160,175,0.3)" transform="rotate(25 195 95)" />
                   <ellipse cx="140" cy="140" rx="18" ry="11" fill="rgba(225,160,175,0.3)" transform="rotate(15 140 140)" />
                   <ellipse cx="185" cy="135" rx="20" ry="12" fill="rgba(225,160,175,0.25)" transform="rotate(-10 185 135)" />
                   <ellipse cx="150" cy="70" rx="16" ry="10" fill="rgba(230,170,185,0.3)" transform="rotate(-5 150 70)" />
                   
                   {/* Cherry blossom branch */}
                   <path d="M80,30 Q120,60 140,85" stroke="rgba(100,75,60,0.3)" strokeWidth="2.5" fill="none" />
                   <path d="M140,85 Q160,95 190,80" stroke="rgba(100,75,60,0.25)" strokeWidth="2" fill="none" />
                   <path d="M110,50 Q100,35 85,25" stroke="rgba(100,75,60,0.2)" strokeWidth="1.5" fill="none" />
                   {/* Cherry blossoms on branch */}
                   {[[90, 38], [108, 52], [125, 68], [195, 75]].map(([cx, cy], i) => (
                     <g key={`cb${i}`}>
                       {[0, 72, 144, 216, 288].map(angle => (
                         <ellipse key={angle} cx={cx} cy={cy} rx="8" ry="4" fill={`rgba(240,200,210,${0.45 - i * 0.05})`} transform={`rotate(${angle} ${cx} ${cy})`} />
                       ))}
                       <circle cx={cx} cy={cy} r="2.5" fill="rgba(220,180,100,0.5)" />
                     </g>
                   ))}
                   
                   {/* Small bud */}
                   <ellipse cx="220" cy="55" rx="8" ry="12" fill="rgba(230,175,185,0.35)" transform="rotate(15 220 55)" />
                   <path d="M220,67 Q222,80 225,95" stroke="rgba(110,145,100,0.25)" strokeWidth="1.2" fill="none" />
                   
                   {/* Leaves */}
                   <ellipse cx="100" cy="70" rx="22" ry="9" fill="rgba(130,175,120,0.35)" transform="rotate(-40 100 70)" />
                   <path d="M100,70 L88,62" stroke="rgba(110,150,100,0.3)" strokeWidth="0.8" fill="none" />
                   <ellipse cx="200" cy="120" rx="20" ry="8" fill="rgba(130,175,120,0.3)" transform="rotate(30 200 120)" />
                   <ellipse cx="230" cy="70" rx="14" ry="6" fill="rgba(140,180,130,0.25)" transform="rotate(50 230 70)" />
                 </svg>

                 {/* === BOTTOM-LEFT: Lavender & daisy cluster === */}
                 <svg className="absolute -bottom-24 -left-36 w-80 h-80 animate-[gentle-float_10s_ease-in-out_infinite_reverse]" viewBox="0 0 300 300" fill="none">
                   {/* Watercolor splash */}
                   <circle cx="140" cy="180" r="80" fill="rgba(170,155,210,0.10)" />
                   <circle cx="100" cy="160" r="50" fill="rgba(150,190,140,0.08)" />
                   
                   {/* Lavender sprigs */}
                   {[[70, 260, 70, 110], [95, 270, 95, 120], [55, 250, 60, 130]].map(([x1, y1, x2, y2], i) => (
                     <g key={`lav${i}`}>
                       <path d={`M${x1},${y1} Q${x1 + 3},${(y1 + y2) / 2} ${x2},${y2}`} stroke="rgba(140,120,170,0.35)" strokeWidth="1.8" fill="none" />
                       {[0, 12, 24, 36, 48, 60].map(offset => (
                         <ellipse key={offset} cx={x2 + Math.sin(offset * 0.1) * 3} cy={y2 + offset} rx="4" ry="5.5" fill={`rgba(170,150,205,${0.5 - offset * 0.005})`} transform={`rotate(${offset % 2 === 0 ? -8 : 8} ${x2 + Math.sin(offset * 0.1) * 3} ${y2 + offset})`} />
                       ))}
                     </g>
                   ))}
                   
                   {/* Large daisy */}
                   {[0, 30, 60, 90, 120, 150].map(angle => (
                     <ellipse key={angle} cx="190" cy="200" rx="18" ry="7" fill="rgba(255,245,230,0.55)" transform={`rotate(${angle} 190 200)`} />
                   ))}
                   <circle cx="190" cy="200" r="8" fill="rgba(230,200,100,0.55)" />
                   <circle cx="190" cy="200" r="4" fill="rgba(210,175,70,0.45)" />
                   
                   {/* Second smaller daisy */}
                   {[0, 45, 90, 135].map(angle => (
                     <ellipse key={angle} cx="230" cy="170" rx="10" ry="4.5" fill="rgba(255,245,230,0.4)" transform={`rotate(${angle} 230 170)`} />
                   ))}
                   <circle cx="230" cy="170" r="5" fill="rgba(230,200,100,0.45)" />
                   
                   {/* Eucalyptus leaves */}
                   <path d="M155,260 Q145,230 140,200 Q138,180 145,160" stroke="rgba(110,150,120,0.3)" strokeWidth="1.5" fill="none" />
                   {[165, 180, 195, 210, 230, 245].map((y, i) => (
                     <ellipse key={y} cx={143 + (i % 2 === 0 ? -12 : 12)} cy={y} rx="10" ry="6" fill={`rgba(140,180,145,${0.3 - i * 0.02})`} transform={`rotate(${i % 2 === 0 ? -30 : 30} ${143 + (i % 2 === 0 ? -12 : 12)} ${y})`} />
                   ))}
                   
                   {/* Curving stem */}
                   <path d="M190,215 Q175,240 160,260" stroke="rgba(110,150,100,0.25)" strokeWidth="1.2" fill="none" />
                 </svg>

                 {/* === LEFT SIDE: Trailing vine with roses === */}
                 <svg className="absolute -top-8 -left-20 w-28 h-[110%] animate-[gentle-sway_12s_ease-in-out_infinite]" viewBox="0 0 100 500" fill="none">
                   {/* Main vine */}
                   <path d="M50,0 Q15,60 55,120 Q85,180 35,240 Q5,300 60,360 Q90,420 45,500" stroke="rgba(120,160,110,0.4)" strokeWidth="2" fill="none" />
                   
                   {/* Small roses along vine */}
                   {[[40, 80], [65, 200], [25, 330], [55, 440]].map(([cx, cy], i) => (
                     <g key={`rose${i}`}>
                       <circle cx={cx} cy={cy} r={12 - i} fill={`rgba(220,160,175,${0.4 - i * 0.05})`} />
                       <circle cx={cx} cy={cy} r={8 - i * 0.5} fill={`rgba(232,178,192,${0.5 - i * 0.05})`} />
                       <circle cx={cx} cy={cy} r={4} fill={`rgba(215,148,168,${0.45 - i * 0.05})`} />
                     </g>
                   ))}
                   
                   {/* Leaves along vine */}
                   {[[25, 50, -35], [75, 150, 25], [20, 270, -20], [70, 390, 35], [30, 470, -30]].map(([cx, cy, rot], i) => (
                     <ellipse key={`vl${i}`} cx={cx} cy={cy} rx="14" ry="6" fill={`rgba(135,175,125,${0.35 - i * 0.03})`} transform={`rotate(${rot} ${cx} ${cy})`} />
                   ))}
                   
                   {/* Tiny buds */}
                   <circle cx="55" cy="155" r="3" fill="rgba(230,185,195,0.35)" />
                   <circle cx="40" cy="290" r="3.5" fill="rgba(180,160,210,0.3)" />
                 </svg>

                 {/* === RIGHT SIDE: Cherry blossom branch === */}
                 <svg className="absolute -top-4 -right-20 w-28 h-[105%] animate-[gentle-sway_14s_ease-in-out_infinite_reverse]" viewBox="0 0 100 480" fill="none">
                   {/* Branch */}
                   <path d="M60,0 Q85,50 45,110 Q15,170 65,230 Q95,290 40,350 Q10,410 55,480" stroke="rgba(110,80,65,0.25)" strokeWidth="2.5" fill="none" />
                   <path d="M45,110 Q30,90 15,85" stroke="rgba(110,80,65,0.2)" strokeWidth="1.5" fill="none" />
                   <path d="M65,230 Q80,215 90,200" stroke="rgba(110,80,65,0.18)" strokeWidth="1.5" fill="none" />
                   
                   {/* Cherry blossoms */}
                   {[[55, 55], [40, 130], [20, 90], [70, 255], [88, 210], [35, 370], [60, 430]].map(([cx, cy], i) => (
                     <g key={`ch${i}`}>
                       {[0, 72, 144, 216, 288].map(angle => (
                         <ellipse key={angle} cx={cx} cy={cy} rx={7 + (i % 2) * 2} ry="3.5" fill={`rgba(242,200,212,${0.45 - i * 0.03})`} transform={`rotate(${angle} ${cx} ${cy})`} />
                       ))}
                       <circle cx={cx} cy={cy} r="2" fill="rgba(220,180,100,0.5)" />
                     </g>
                   ))}
                   
                   {/* Falling petals */}
                   <ellipse cx="80" cy="310" rx="5" ry="3" fill="rgba(240,200,210,0.25)" transform="rotate(45 80 310)" />
                   <ellipse cx="25" cy="180" rx="4" ry="2.5" fill="rgba(240,200,210,0.2)" transform="rotate(-30 25 180)" />
                   <ellipse cx="70" cy="400" rx="4" ry="2" fill="rgba(240,200,210,0.2)" transform="rotate(60 70 400)" />
                   
                   {/* Leaves */}
                   {[[30, 75, -25], [75, 175, 30], [25, 310, -35], [65, 400, 20]].map(([cx, cy, rot], i) => (
                     <ellipse key={`bl${i}`} cx={cx} cy={cy} rx="12" ry="5" fill={`rgba(140,178,130,${0.3 - i * 0.03})`} transform={`rotate(${rot} ${cx} ${cy})`} />
                   ))}
                 </svg>

                 {/* === BOTTOM CENTER: Small scattered petals === */}
                 <svg className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120%] h-16 opacity-40" viewBox="0 0 400 50" fill="none">
                   {[20, 65, 120, 180, 230, 285, 340, 370].map((x, i) => (
                     <ellipse key={`sp${i}`} cx={x} cy={15 + (i % 3) * 10} rx={5 + (i % 2) * 2} ry={3 + (i % 2)} fill={i % 3 === 0 ? 'rgba(240,200,210,0.3)' : i % 3 === 1 ? 'rgba(180,165,215,0.25)' : 'rgba(145,180,135,0.25)'} transform={`rotate(${i * 37} ${x} ${15 + (i % 3) * 10})`} />
                   ))}
                 </svg>
               </div>
             )}
             <div 
               className={`w-full bg-[#3e2723] rounded-r-md sm:rounded-r-xl shadow-[20px_20px_40px_rgba(0,0,0,0.6),inset_2px_0_20px_rgba(0,0,0,0.4)] border-y-[10px] border-r-[10px] sm:border-y-[16px] sm:border-r-[16px] border-[#2d1b18] relative overflow-hidden group cursor-pointer hover:shadow-[20px_25px_50px_rgba(0,0,0,0.7)] hover:-translate-y-1 transition-all duration-500 ${isInitialized ? 'animate-glitch-in' : ''}`}
               style={{ aspectRatio: '3/4' }}
               onClick={() => setIsBookOpen(true)}
             >
                {/* Book Spine (Left edge) */}
                <div className={`absolute left-0 top-0 bottom-0 w-10 sm:w-24 z-10 border-r shadow-[5px_0_15px_rgba(0,0,0,0.5)] ${isSketchMode ? 'border-[#8b7355]/30' : 'border-black/30'}`}
                  style={{ background: isSketchMode 
                    ? 'linear-gradient(to right, #7a6245, #9b8060, transparent)' 
                    : 'linear-gradient(to right, #1a0f0d, #2d1b18, transparent)'
                  }}
                ></div>
                {/* Spine grooves */}
                {[20, 50, 80].map(pos => (
                  <div key={pos} className={`absolute left-0 w-10 sm:w-24 h-4 z-20 ${isSketchMode ? 'border-y border-[#8b7355]/25' : 'border-y border-black/60'}`}
                    style={{ 
                      top: `${pos}%`,
                      background: isSketchMode
                        ? 'linear-gradient(to bottom, rgba(100,80,55,0.2), transparent, rgba(100,80,55,0.2))'
                        : 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent, rgba(0,0,0,0.5))'
                    }}
                  ></div>
                ))}

                {/* Cover Stitching */}
                <div className="absolute inset-x-3 inset-y-3 sm:inset-x-5 sm:inset-y-5 border-2 border-dashed border-[#5c3a21]/60 pointer-events-none rounded sm:rounded-xl z-20"></div>

                {/* Gold Titling */}
                <div className="absolute top-10 sm:top-16 left-1/2 -translate-x-1/2 pl-6 sm:pl-10 flex flex-col items-center pointer-events-none w-full z-30 opacity-90">
                   <Heart className={`mb-2 sm:mb-4 w-8 h-8 sm:w-14 sm:h-14 ${isSketchMode ? 'text-[#3d2b1f] fill-[#3d2b1f]/15' : 'text-yellow-600/80 fill-yellow-600/30 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]'}`} />
                   <h3 className={`font-serif italic text-3xl sm:text-7xl tracking-widest text-center font-bold ${isSketchMode ? 'text-[#3d2b1f]' : 'text-[#d4af37] drop-shadow-[0_4px_6px_rgba(0,0,0,1)]'}`}>Our Memories</h3>
                </div>
                
                {/* Heart Grid Collage */}
                <div className="absolute top-[62%] sm:top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 pl-3 sm:pl-12 w-full flex justify-center scale-[0.80] sm:scale-90 z-30">
                  <div className="grid gap-1.5 sm:gap-2.5 max-w-[95%]" 
                       style={{ gridTemplateColumns: 'repeat(5, minmax(35px, 75px))', gridTemplateRows: 'repeat(5, minmax(35px, 75px))' }}>
                    {galleryItems.map((item, index) => {
                      const pos = heartPositions[index];
                      if (!pos) return null;
                      return (
                        <div 
                          key={index} 
                          className="relative group/item overflow-hidden rounded-md sm:rounded-xl cursor-copy border-2 border-[#5c3a21] hover:border-[#d4af37] shadow-[2px_4px_10px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-[1.15] hover:z-40 bg-[#2d1b18]"
                          style={{ gridColumn: pos.col, gridRow: pos.row }}
                          onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                        >
                          <MediaItem 
                            item={item} 
                            className="group-hover/item:opacity-100 opacity-60 transition-opacity duration-300 sepia-[.4] group-hover/item:sepia-0" 
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* "Click to open" hint */}
                <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 flex items-center gap-2 text-[#d4af37] font-serif italic text-sm sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,1)] opacity-80 group-hover:animate-pulse z-30 font-bold">
                   Open Album <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                </div>
             </div>
          </div>
        )}

        {/* --- BOOK LAYOUT (OPEN) --- */}
        {isBookOpen && (
          <div className="w-full max-w-[1000px] mx-auto flex flex-col items-center animate-book-open relative z-20 pb-10">
             
             {/* Book Container */}
             <div 
               className="w-full flex bg-[#fdfaf6] rounded-md sm:rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_20px_rgba(255,255,255,0.05)] border-[10px] sm:border-[16px] border-[#3e2723] relative overflow-hidden group mb-8"
               style={{ aspectRatio: '3/2' }}
             >
                
                {/* Book Spine (Center Shadow) */}
                <div className="absolute top-0 bottom-0 left-1/2 -px-4 -ml-4 sm:-ml-8 w-8 sm:w-16 bg-gradient-to-r from-transparent via-black/30 to-transparent z-40 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/40 z-40 shadow-[0_0_5px_rgba(255,255,255,0.5)]"></div>

                {/* Left Page */}
                <div className="flex-1 bg-[#fffdfa] relative p-3 sm:p-8 sm:pl-12 shadow-[inset_-25px_0_30px_-20px_rgba(0,0,0,0.15)] overflow-hidden [perspective:1000px]">
                   {/* subtle page lines */}
                   <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none z-30"></div>

                    <div 
                       key={`left-${bookPage}`}
                       className={`w-full h-full bg-[#f4f1ea] border border-[#e8dfcf] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] p-2 sm:p-5 relative flex flex-col cursor-pointer hover:bg-[#eae4d8] transition-colors rounded-sm group/page ${turnDirection === 'prev' ? 'animate-page-prev' : turnDirection === 'next' ? 'animate-page-next-left' : ''} origin-right`}
                       onClick={() => galleryItems[bookPage * 2] && setSelectedItem(galleryItems[bookPage * 2])}
                    >
                      {galleryItems[bookPage * 2] ? (
                        <div className="w-full h-full flex flex-col">
                          {/* Image Area - FIXED OVERFLOW AND MARGINS */}
                          <div className="flex-1 relative group-hover/page:scale-[1.01] transition-transform duration-700 flex items-center justify-center overflow-hidden">
                            <MediaItem 
                              item={galleryItems[bookPage * 2]} 
                              isBook={true}
                            />
                          </div>
                          
                          {/* Page Footer (Inside Book) */}
                          <div className="h-10 sm:h-14 mt-2 sm:mt-4 flex items-center justify-between px-2">
                             <button 
                               onClick={(e) => { e.stopPropagation(); prevPage(); }}
                               disabled={bookPage === 0}
                               className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#3e2723]/5 hover:bg-[#3e2723]/10 disabled:opacity-0 rounded-lg text-[#3e2723] font-serif border border-[#3e2723]/20 flex items-center gap-2 transition-all group/btn active:scale-90"
                             >
                               <ChevronLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform stroke-[3]" />
                               <span className="text-[10px] sm:text-xs font-black uppercase tracking-tighter">Back</span>
                             </button>
                             
                             <div className="font-serif text-[#3e2723]/60 text-[10px] sm:text-xs tracking-[0.2em] font-black border-t border-[#3e2723]/10 pt-1">
                               PAGE_{bookPage * 2 + 1}
                             </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-zinc-400 font-serif italic">Blank Page</span>
                        </div>
                      )}
                    </div>
                </div>

                {/* Right Page */}
                <div className="flex-1 bg-[#fffdfa] relative p-3 sm:p-8 sm:pr-12 shadow-[inset_25px_0_30px_-20px_rgba(0,0,0,0.15)] overflow-hidden [perspective:1000px]">
                   {/* subtle page lines */}
                   <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none z-30"></div>

                    <div 
                       key={`right-${bookPage}`}
                       className={`w-full h-full bg-[#f4f1ea] border border-[#e8dfcf] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] p-2 sm:p-5 relative flex flex-col cursor-pointer hover:bg-[#eae4d8] transition-colors rounded-sm group/page ${turnDirection === 'next' ? 'animate-page-next' : turnDirection === 'prev' ? 'animate-page-prev-right' : ''} origin-left`}
                       onClick={() => galleryItems[bookPage * 2 + 1] && setSelectedItem(galleryItems[bookPage * 2 + 1])}
                    >
                      {galleryItems[bookPage * 2 + 1] ? (
                        <div className="w-full h-full flex flex-col">
                          {/* Image Area - FIXED OVERFLOW AND MARGINS */}
                          <div className="flex-1 relative group-hover/page:scale-[1.01] transition-transform duration-700 flex items-center justify-center overflow-hidden">
                             <MediaItem 
                               item={galleryItems[bookPage * 2 + 1]} 
                               isBook={true}
                             />
                          </div>

                          {/* Page Footer (Inside Book) */}
                          <div className="h-10 sm:h-14 mt-2 sm:mt-4 flex items-center justify-between px-2">
                             <div className="font-serif text-[#3e2723]/60 text-[10px] sm:text-xs tracking-[0.2em] font-black border-t border-[#3e2723]/10 pt-1">
                               PAGE_{bookPage * 2 + 2}
                             </div>

                             <button 
                               onClick={(e) => { e.stopPropagation(); nextPage(); }}
                               disabled={bookPage === totalBookPages - 1}
                               className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#3e2723]/5 hover:bg-[#3e2723]/10 disabled:opacity-0 rounded-lg text-[#3e2723] font-serif border border-[#3e2723]/20 flex items-center gap-2 transition-all group/btn active:scale-90"
                             >
                               <span className="text-[10px] sm:text-xs font-black uppercase tracking-tighter">Next</span>
                               <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform stroke-[3]" />
                             </button>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center opacity-60">
                           <Heart className="text-pink-400 mb-3 fill-pink-400 opacity-50 w-8 h-8 sm:w-12 sm:h-12" />
                           <span className="text-zinc-500 font-serif italic text-base sm:text-2xl mt-4">The End...</span>
                        </div>
                      )}
                    </div>
                  </div>
             </div>
          </div>
        )}

      </div>

      {/* Modal Overlay */}
      {selectedItem && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => setSelectedItem(null)}
        >
          {/* Simplified Close Button */}
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white hover:text-cyan-400 transition-all bg-white/10 hover:bg-white/20 rounded-full p-2 sm:p-3 border border-white/20 backdrop-blur z-[10000] shadow-2xl"
            onClick={(e) => { e.stopPropagation(); setSelectedItem(null); }}
          >
            <X size={28} />
          </button>
          
          <div 
            className="w-full h-full flex items-center justify-center pointer-events-none relative"
          >
            {selectedItem.type === 'image' ? (
              <img 
                src={selectedItem.src} 
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-[0_0_100px_rgba(0,0,0,1)] pointer-events-auto border-2 border-white animate-zoom-in relative z-40 bg-zinc-900" 
                alt="Selected full resolution"
                onClick={(e) => e.stopPropagation()} 
              />
            ) : (
              <video 
                src={selectedItem.src} 
                controls autoPlay 
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-[0_0_100px_rgba(0,0,0,1)] pointer-events-auto border-2 border-white animate-zoom-in relative z-40 bg-zinc-900"
                onClick={(e) => e.stopPropagation()} 
              />
            )}
          </div>
        </div>,
        document.body
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes book-open {
          from { opacity: 0; transform: perspective(1200px) rotateX(10deg) scale(0.95); }
          to { opacity: 1; transform: perspective(1200px) rotateX(0deg) scale(1); }
        }
        @keyframes page-turn-next {
          0% { opacity: 0; transform: rotateY(15deg) scale(0.98); }
          20% { opacity: 1; }
          100% { opacity: 1; transform: rotateY(0deg) scale(1); }
        }
        @keyframes page-turn-next-left {
          0% { opacity: 1; transform: rotateY(0deg) scale(0.98); }
          100% { opacity: 1; transform: rotateY(0deg) scale(1); }
        }
        @keyframes page-turn-prev {
          0% { opacity: 0; transform: rotateY(-15deg) scale(0.98); }
          20% { opacity: 1; }
          100% { opacity: 1; transform: rotateY(0deg) scale(1); }
        }
        @keyframes page-turn-prev-right {
          0% { opacity: 1; transform: rotateY(0deg) scale(0.98); }
          100% { opacity: 1; transform: rotateY(0deg) scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-zoom-in {
          animation: zoom-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .animate-book-open {
          animation: book-open 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-page-next {
          animation: page-turn-next 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-page-next-left {
          animation: page-turn-next-left 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-page-prev {
          animation: page-turn-prev 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-page-prev-right {
          animation: page-turn-prev-right 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        /* Hide scrollbar for heart view on mobile but allow scrolling */
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(236,72,153,0.5); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236,72,153,0.8); 
        }

        @keyframes scanline {
          from { transform: translateY(-100%); }
          to { transform: translateY(100%); }
        }
        @keyframes hologram-float {
          0%, 100% { transform: translateY(-10px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(2deg); }
        }
        @keyframes hologram-float-alt {
          0%, 100% { transform: translateY(10px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }
        @keyframes hologram-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        .animate-hologram-float {
          animation: hologram-float 8s ease-in-out infinite;
        }
        .animate-hologram-float-alt {
          animation: hologram-float-alt 10s ease-in-out infinite;
        }
        .animate-hologram-rotate {
          animation: hologram-rotate 40s linear infinite;
        }

        @keyframes glitch-in {
          0% { opacity: 0; transform: scale(1.1); filter: hue-rotate(90deg) brightness(2); }
          10% { opacity: 0.5; transform: scale(1.05); filter: hue-rotate(0deg) brightness(1); }
          15% { opacity: 0; transform: scale(1.1); filter: hue-rotate(180deg) brightness(5); }
          20% { opacity: 1; transform: scale(1); filter: hue-rotate(0deg) brightness(1); }
        }
        .animate-glitch-in {
          animation: glitch-in 0.8s ease-out forwards;
        }

        /* Laser Drawing Path Animation */
        @keyframes draw-path {
          to { stroke-dashoffset: 0; }
        }
        .animate-draw-path {
          animation: draw-path 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* Sketch mode flower animations */
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes gentle-sway {
          0%, 100% { transform: translateX(0px) rotate(0deg); }
          25% { transform: translateX(3px) rotate(0.5deg); }
          75% { transform: translateX(-3px) rotate(-0.5deg); }
        }
      `}} />
    </section>
  );
};

export default Gallery;
