import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Facebook, Instagram } from 'lucide-react';
import { useTheme } from './ThemeContext';

const FIREFLIES = [...Array(65)].map(() => ({
  x: Math.random() * 100 + '%',
  y: Math.random() * 100 + '%',
  size: Math.random() * 5 + 3,
  delay: Math.random() * 5,
  dur: Math.random() * 3 + 3
}));

const Hero = () => {
  const canvasRef = useRef(null);
  const { isSketchMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const [isMouseInHero, setIsMouseInHero] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let particles = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }
      draw() {
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.update();
        p.draw();
      }
      requestAnimationFrame(animate);
    };
    
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLightPos({ x, y });
  };

  return (
    <section 
      id="about" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleHeroMouseMove}
      onMouseEnter={() => setIsMouseInHero(true)}
      onMouseLeave={() => setIsMouseInHero(false)}
    >
      {/* Background Particles Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50 z-0"
      />
      
      {/* Radial Gradient overlay similar to original style */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(24,24,27,1)_100%)] z-0 pointer-events-none"></div>

      {/* Global Fireflies && Shadowy Vibe for Sketch Mode */}
      {isSketchMode && (
        <>
          {/* Shadowy navy radial vignette that follows the cursor using a massive translated div */}
          <div 
            className="absolute z-10 pointer-events-none"
            style={{
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle at center, transparent 25%, rgba(35,40,70,0.3) 45%, rgba(20,25,50,0.7) 65%, rgba(20,25,50,1) 90%)',
              transform: isMouseInHero 
                ? `translate(${(lightPos.x - 50) * 0.5}%, ${(lightPos.y - 50) * 0.5}%)` 
                : 'translate(0%, 0%)',
              transition: isMouseInHero ? 'transform 0.1s ease-out' : 'transform 1.2s ease-out'
            }}
          ></div>
          
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {FIREFLIES.map((f, i) => (
            <div
              key={`global-firefly-${i}`}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: f.x,
                top: f.y,
                width: f.size,
                height: f.size,
                backgroundColor: 'rgba(255,230,150,0.9)',
                boxShadow: '0 0 8px 3px rgba(255,230,150,0.6), 0 0 16px 6px rgba(255,230,150,0.3)',
                animation: `firefly-float ${f.dur}s ease-in-out ${f.delay}s infinite, firefly-glow ${f.dur * 0.7}s ease-in-out ${f.delay}s infinite`,
              }}
            />
          ))}
          </div>
        </>
      )}

      <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 mt-20 lg:mt-0">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <div className="mb-6 flex flex-wrap justify-center lg:justify-start gap-x-4">
            {"Hello! I'm Lance Art".split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-flex whitespace-nowrap">
                {word.split("").map((char, charIndex) => (
                  <span 
                    key={charIndex}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white hover:text-blue-400 drop-shadow-[0_0_8px_rgba(255,255,255,0)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] hover:scale-125 hover:-translate-y-4 cursor-default inline-block select-none [transition:color_1000ms,transform_300ms,filter_300ms]"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </div>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-2xl mx-auto lg:mx-0 font-light">
            My name is Lance Art P. Fortaleza and I am an aspiring full-stack developer!
          </p>
          
          <div className="flex items-center justify-center lg:justify-start gap-6">
            <a href="https://github.com/apclapfortaleza" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-transform hover:scale-110">
              <Github size={28} />
            </a>
            <a href="https://www.linkedin.com/in/lance-art-fortaleza-47299b321" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-blue-500 transition-transform hover:scale-110">
              <Linkedin size={28} />
            </a>
            <a href="https://www.facebook.com/boszlance23/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-blue-600 transition-transform hover:scale-110">
              <Facebook size={28} />
            </a>
            <a href="https://www.instagram.com/lnzlart/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-pink-500 transition-transform hover:scale-110">
              <Instagram size={28} />
            </a>
          </div>
        </div>

        {/* Profile Image / Premium Cyber HUD Reveal OR Sketch Watercolor Frame */}
        <div className="flex-1 flex justify-center lg:justify-end relative">
          
          {isSketchMode ? (
            /* ========== SKETCH MODE: PNG Cover → Melting Paint Reveal ========== */
            <div 
              className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              
              {/* Watercolor splash behind */}
              <div className="absolute inset-0 rounded-full opacity-30 pointer-events-none animate-[gentle-float_10s_ease-in-out_infinite]"
                style={{ background: 'radial-gradient(circle, rgba(225,170,190,0.3) 0%, rgba(170,190,225,0.2) 40%, transparent 70%)' }}
              ></div>

              {/* Portrait container */}
              <div className="relative w-[270px] h-[270px] md:w-[360px] md:h-[360px] rounded-full overflow-hidden"
                style={{
                  border: '3px solid rgba(120,100,80,0.2)',
                  boxShadow: '0 8px 30px rgba(120,100,80,0.15)'
                }}
              >
                {/* Actual photo underneath */}
                <div className="absolute inset-0 bg-[url('/assets/lans.jpg')] bg-cover bg-center"
                  style={{ 
                    filter: 'sepia(0.15) saturate(0.95) brightness(1.05)',
                    transform: isHovered ? 'scale(1)' : 'scale(1.1)',
                    transition: 'transform 1s ease'
                  }}
                ></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(245,240,230,0.3)_100%)]"></div>
              </div>

              {/* PNG painting overlay — melts on hover */}
              <div 
                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none rounded-full overflow-hidden"
                style={{
                  opacity: isHovered ? 0 : 1,
                  transform: isHovered ? 'scale(1.08) translateY(12px)' : 'scale(1) translateY(0)',
                  filter: isHovered ? 'blur(8px)' : 'blur(0px)',
                  transition: 'opacity 1.4s ease, transform 1.2s ease, filter 1s ease'
                }}
              >
                <img 
                  src="/assets/portrait-cover.png" 
                  alt="" 
                  className="w-[140%] h-[140%] object-cover -translate-y-[8%]"
                  draggable="false"
                />
              </div>

              {/* Paint smudge effects around the portrait */}
              <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible" viewBox="0 0 400 400" fill="none"
                style={{
                  opacity: isHovered ? 0 : 1,
                  transition: 'opacity 1.2s ease'
                }}
              >
                <defs>
                  <filter id="smudge">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                  <filter id="smudge-soft">
                    <feGaussianBlur stdDeviation="10" />
                  </filter>
                </defs>
                {/* Top-right smudge */}
                <ellipse cx="330" cy="100" rx="80" ry="28" fill="rgba(55,55,135,0.5)" transform="rotate(-25 330 100)" filter="url(#smudge)" />
                <ellipse cx="350" cy="75" rx="40" ry="16" fill="rgba(55,55,135,0.4)" transform="rotate(-15 350 75)" filter="url(#smudge)" />
                
                {/* Left smudge */}
                <ellipse cx="50" cy="220" rx="70" ry="25" fill="rgba(50,50,130,0.4)" transform="rotate(15 50 220)" filter="url(#smudge)" />
                <ellipse cx="35" cy="190" rx="40" ry="15" fill="rgba(55,55,135,0.3)" transform="rotate(30 35 190)" filter="url(#smudge-soft)" />
                
                {/* Bottom smudge */}
                <ellipse cx="180" cy="365" rx="90" ry="25" fill="rgba(50,50,130,0.4)" transform="rotate(-8 180 365)" filter="url(#smudge)" />
                <ellipse cx="240" cy="375" rx="50" ry="18" fill="rgba(55,55,135,0.3)" transform="rotate(5 240 375)" filter="url(#smudge-soft)" />
                
                {/* Top-left smudge */}
                <ellipse cx="75" cy="70" rx="65" ry="22" fill="rgba(50,50,130,0.45)" transform="rotate(-35 75 70)" filter="url(#smudge)" />
                
                {/* Bottom-right smudge */}
                <ellipse cx="340" cy="310" rx="75" ry="24" fill="rgba(50,50,130,0.4)" transform="rotate(20 340 310)" filter="url(#smudge)" />
                <ellipse cx="360" cy="280" rx="35" ry="14" fill="rgba(55,55,135,0.3)" transform="rotate(40 360 280)" filter="url(#smudge-soft)" />
                
                {/* Small paint drip splatters */}
                <circle cx="365" cy="150" r="12" fill="rgba(50,50,130,0.35)" filter="url(#smudge)" />
                <circle cx="30" cy="300" r="10" fill="rgba(50,50,130,0.3)" filter="url(#smudge)" />
                <circle cx="300" cy="370" r="10" fill="rgba(55,55,135,0.3)" filter="url(#smudge)" />
              </svg>

            </div>
          ) : (
            /* ========== DARK MODE: Original Cyber HUD ========== */
            <div className="relative group cursor-pointer w-[320px] h-[320px] md:w-[450px] md:h-[450px] flex items-center justify-center">
              
              {/* Background Data Cluster (Connection to Canvas) */}
              <div className="absolute inset-x-0 inset-y-0 z-0 opacity-20 pointer-events-none">
                 {[...Array(20)].map((_, i) => (
                   <div key={i} className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse" 
                        style={{ 
                          left: `${50 + (Math.random() - 0.5) * 80}%`, 
                          top: `${50 + (Math.random() - 0.5) * 80}%`,
                          animationDuration: `${2 + Math.random() * 3}s`
                        }}></div>
                 ))}
              </div>

              {/* External HUD Elements (Brackets & Readouts) */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                 {/* Corner Brackets */}
                 <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-blue-500/30 group-hover:border-blue-500 transition-colors duration-500"></div>
                 <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-purple-500/30 group-hover:border-purple-500 transition-colors duration-500"></div>
                 <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-indigo-500/30 group-hover:border-indigo-500 transition-colors duration-500"></div>
                 <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-blue-500/30 group-hover:border-blue-500 transition-colors duration-500"></div>
                 
                 {/* Status Tags */}
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-4 text-[10px] font-mono tracking-widest text-zinc-600 group-hover:text-blue-400 transition-colors">
                    <span>ID: LAF-PROT.001</span>
                    <span className="animate-pulse">● STANDBY</span>
                 </div>
                 
                 {/* Coordinates (Randomized for effect) */}
                 <div className="absolute top-1/2 -right-12 -translate-y-1/2 rotate-90 text-[10px] font-mono text-zinc-700">
                    LAT: 14.5995° N / LONG: 120.9842° E
                 </div>
              </div>

              {/* Rotating Mechanical Rings */}
              <div className="absolute inset-16 z-0 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                 <div className="absolute inset-0 border border-dashed border-blue-500/20 rounded-full animate-[spin_30s_linear_infinite]"></div>
                 <div className="absolute inset-4 border-[2px] border-dashed border-indigo-500/10 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                 <div className="absolute inset-8 border border-zinc-800 rounded-full"></div>
              </div>

              {/* The Tech Container (Polygon with Cyber Borders) */}
              <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] z-20 group-hover:scale-105 transition-all duration-700">
                
                {/* Dual Stroke Neon Border */}
                <div className="absolute -inset-1 border-2 border-blue-500/20 [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] animate-pulse"></div>
                
                {/* Inner Clipping Container */}
                <div className="absolute inset-0 bg-zinc-950 border-2 border-blue-500/30 overflow-hidden [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] group-hover:border-blue-500 transition-colors shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                  
                  {/* Holographic Portrait (Reveals on Hover) */}
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-125 group-hover:scale-100 overflow-hidden">
                     {/* Main Image Layer with Cyber Filter */}
                     <div className="absolute inset-0 bg-[url('/assets/lans.jpg')] bg-cover bg-center transition-all duration-1000 brightness-110 contrast-125 saturate-150 [filter:sepia(0.5)_hue-rotate(185deg)]"></div>
                     
                     {/* Digital "Noise" and Chromatic Aberration Layers */}
                     <div className="absolute inset-0 bg-[url('/assets/lans.jpg')] bg-cover bg-center opacity-30 mix-blend-screen translate-x-[2px] translate-y-[-1px] [filter:sepia(1)_hue-rotate(300deg)_saturate(5)] animate-[hologram-flicker_0.1s_infinite]"></div>
                     <div className="absolute inset-0 bg-[url('/assets/lans.jpg')] bg-cover bg-center opacity-30 mix-blend-screen translate-x-[-2px] translate-y-[1px] [filter:sepia(1)_hue-rotate(100deg)_saturate(5)]"></div>

                     {/* Persistent HUD Overlay on Image */}
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10"></div>
                     <div className="absolute inset-0 z-20 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,100,255,0.05),transparent,rgba(0,100,255,0.05))] bg-[length:100%_2px,3px_100%]"></div>
                     
                     {/* Scanline Sweep (More subtle when revealed) */}
                     <div className="absolute inset-0 z-30 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent h-[10%] w-full animate-[scan_4s_linear_infinite]"></div>
                  </div>

                  {/* Cyber Matrix (Default State) */}
                  <div className="absolute inset-0 z-10 transition-all duration-1000 group-hover:opacity-0 group-hover:scale-125">
                    <div className="absolute inset-0 bg-zinc-950/80"></div>
                    
                    {/* Digital Scanning Grid */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
                    
                    {/* Internal Mechanical UI */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
                       <div className="w-full h-full border border-blue-500/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                          {/* Recursive Box Effect */}
                          <div className="w-24 h-24 border border-blue-400/30 rotate-45 animate-spin"></div>
                          <div className="absolute w-full h-[1px] bg-blue-500/40 animate-[scan_2s_linear_infinite]"></div>
                       </div>
                       
                       <div className="mt-6 flex flex-col items-center gap-1">
                          <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-500 animate-[loading-bar_3s_infinite] w-0"></div>
                          </div>
                          <span className="text-[8px] font-mono text-blue-400/60 uppercase tracking-widest mt-2">Accessing Data...</span>
                       </div>
                    </div>
                  </div>

                  {/* Scanning Glitch Layer */}
                  <div className="absolute inset-0 pointer-events-none bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 mix-blend-overlay"></div>
                </div>
              </div>

              {/* Orbiting Tech Nodes */}
              <div className="absolute inset-0 z-30 pointer-events-none">
                 {[...Array(4)].map((_, i) => (
                   <div key={i} className="absolute w-3 h-3 bg-zinc-950 border border-blue-500 rounded-sm animate-[orbit_10s_linear_infinite]"
                        style={{ 
                          top: '50%', 
                          left: '50%',
                          animationDelay: `${i * -2.5}s`,
                          transformOrigin: `${180 + i * 20}px 0`
                        }}></div>
                 ))}
              </div>
            </div>
          )}
        </div>
        
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          from { top: -20%; }
          to { top: 120%; }
        }
        @keyframes loading-bar {
          0% { width: 0%; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0%; left: 100%; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translate(-50%, -50%); }
          to { transform: rotate(360deg) translate(-50%, -50%); }
        }
        @keyframes hologram-flicker {
          0% { opacity: 0.25; }
          50% { opacity: 0.35; }
          100% { opacity: 0.25; }
        }
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
        @keyframes firefly-float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -15px); }
          50% { transform: translate(-5px, -25px); }
          75% { transform: translate(-15px, -10px); }
        }
        @keyframes firefly-glow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.8); }
        }
      `}} />
    </section>
  );
};

export default Hero;
