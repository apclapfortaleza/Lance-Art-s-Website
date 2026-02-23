import React, { useState } from 'react';
import { Search, Palette, Microchip, Github, Heart, ExternalLink, Code2, Server, Database, Globe, BookOpen, Sparkles, Feather, Coffee } from 'lucide-react';
import { useTheme } from './ThemeContext';

const resources = [
  {
    name: "React",
    description: "A JavaScript library for building dynamic, component-based user interfaces.",
    icon: <Code2 />,
    link: "https://react.dev",
    gradient: "from-[#61dafb] to-[#2a7aaf]",
    glow: "rgba(97,218,251,0.35)",
    sketchAccent: "#3b6ca8",
    category: "Framework"
  },
  {
    name: "Vite",
    description: "Next-generation frontend build tool for lightning-fast development.",
    icon: <Sparkles />,
    link: "https://vite.dev",
    gradient: "from-[#bd34fe] to-[#646cff]",
    glow: "rgba(189,52,254,0.35)",
    sketchAccent: "#6b46a8",
    category: "Build Tool"
  },
  {
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid, responsive UI development.",
    icon: <Palette />,
    link: "https://tailwindcss.com",
    gradient: "from-[#38bdf8] to-[#0ea5e9]",
    glow: "rgba(56,189,248,0.35)",
    sketchAccent: "#1a8a7a",
    category: "Styling"
  },
  {
    name: "NestJS",
    description: "Progressive Node.js framework for scalable server-side applications.",
    icon: <Server />,
    link: "https://nestjs.com",
    gradient: "from-[#e0234e] to-[#9b1c31]",
    glow: "rgba(224,35,78,0.35)",
    sketchAccent: "#b8373d",
    category: "Backend"
  },
  {
    name: "Supabase",
    description: "Open-source backend-as-a-service for database, auth, and realtime features.",
    icon: <Database />,
    link: "https://supabase.com",
    gradient: "from-[#3ecf8e] to-[#1a9f68]",
    glow: "rgba(62,207,142,0.35)",
    sketchAccent: "#2d8a4e",
    category: "Database"
  },
  {
    name: "Lucide Icons",
    description: "Beautiful, consistent open-source icon library used throughout the interface.",
    icon: <Feather />,
    link: "https://lucide.dev",
    gradient: "from-[#f97316] to-[#ea580c]",
    glow: "rgba(249,115,22,0.35)",
    sketchAccent: "#b87333",
    category: "Icons"
  },
  {
    name: "Vercel",
    description: "Cloud platform for hosting and deploying the frontend with edge performance.",
    icon: <Globe />,
    link: "https://vercel.com",
    gradient: "from-[#ffffff] to-[#a0a0a0]",
    glow: "rgba(255,255,255,0.2)",
    sketchAccent: "#555",
    category: "Hosting"
  },
  {
    name: "Google",
    description: "Search engine used for research, finding images, and programming tutorials.",
    icon: <Search />,
    link: "https://google.com",
    gradient: "from-[#4285f4] to-[#1a56db]",
    glow: "rgba(66,133,244,0.35)",
    sketchAccent: "#4a6fa5",
    category: "Research"
  },
  {
    name: "Gemini AI",
    description: "AI assistant used for logic, debugging, code architecture, and creative ideas.",
    icon: <Microchip />,
    link: "https://gemini.google.com/app",
    gradient: "from-[#f5b731] to-[#e09100]",
    glow: "rgba(245,183,49,0.35)",
    sketchAccent: "#c48a1a",
    category: "AI"
  },
  {
    name: "GitHub",
    description: "Version control platform hosting the project's source code repository.",
    icon: <Github />,
    link: "https://github.com/apclapfortaleza/Lance-Art-s-Website",
    gradient: "from-[#e6edf3] to-[#8b949e]",
    glow: "rgba(230,237,243,0.2)",
    sketchAccent: "#444",
    category: "Repository"
  },
  {
    name: "Axios",
    description: "Promise-based HTTP client for seamless API requests between frontend and backend.",
    icon: <Code2 />,
    link: "https://axios-http.com",
    gradient: "from-[#5a29e4] to-[#3b1a9e]",
    glow: "rgba(90,41,228,0.35)",
    sketchAccent: "#4e5ba6",
    category: "Library"
  },
  {
    name: "MDN Web Docs",
    description: "Comprehensive documentation for HTML, CSS, and JavaScript web technologies.",
    icon: <BookOpen />,
    link: "https://developer.mozilla.org",
    gradient: "from-[#e66465] to-[#9198e5]",
    glow: "rgba(230,100,101,0.3)",
    sketchAccent: "#9b4a8c",
    category: "Docs"
  },
];

/* ───── Dark-mode card ───── */
const DarkCard = ({ resource }) => (
  <a
    href={resource.link}
    target="_blank"
    rel="noreferrer"
    className="group relative block flex-shrink-0 w-[380px] h-[260px]"
  >
    <div className="relative h-full rounded-3xl overflow-hidden border border-white/[0.06] bg-[#0e0e12] transition-all duration-500
      group-hover:border-white/[0.12] group-hover:scale-[1.03] group-hover:shadow-2xl"
      style={{ boxShadow: `0 0 0px ${resource.glow}` }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 4px 40px ${resource.glow}, 0 0 80px ${resource.glow}`}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 0px ${resource.glow}`}
    >
      {/* Accent gradient bar at top */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${resource.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Subtle radial glow from icon area */}
      <div className={`absolute top-0 left-0 w-[200px] h-[200px] rounded-full bg-gradient-to-br ${resource.gradient} opacity-[0.03] group-hover:opacity-[0.08] blur-[60px] transition-opacity duration-700 pointer-events-none`} />

      <div className="relative h-full p-7 flex flex-col justify-between">
        <div>
          {/* Header: icon + category */}
          <div className="flex items-start justify-between mb-5">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${resource.gradient} p-[1px] shadow-lg`}>
              <div className="w-full h-full rounded-2xl bg-[#0e0e12] flex items-center justify-center group-hover:bg-[#0e0e12]/60 transition-colors duration-500">
                <div className="text-white/90 w-6 h-6">
                  {React.cloneElement(resource.icon, { className: 'w-6 h-6' })}
                </div>
              </div>
            </div>
            <span className={`text-[10px] font-mono tracking-widest uppercase mt-2 px-3 py-1 rounded-full bg-white/[0.03] text-white/25 border border-white/[0.04]
              group-hover:bg-white/[0.06] group-hover:text-white/50 transition-all duration-300`}>
              {resource.category}
            </span>
          </div>

          {/* Name + description */}
          <h3 className="text-xl font-bold text-white/90 mb-2 group-hover:text-white transition-colors duration-300">
            {resource.name}
          </h3>
          <p className="text-white/30 text-sm leading-relaxed group-hover:text-white/50 transition-colors duration-300 line-clamp-2">
            {resource.description}
          </p>
        </div>

        {/* Bottom: visit link */}
        <div className="flex items-center gap-2 text-white/15 group-hover:text-white/50 transition-all duration-300 text-xs mt-4">
          <div className={`w-6 h-[1px] bg-gradient-to-r ${resource.gradient} opacity-0 group-hover:opacity-60 group-hover:w-10 transition-all duration-500`} />
          <ExternalLink size={12} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-400">Visit</span>
        </div>
      </div>
    </div>
  </a>
);

/* ───── Sketch-mode card ───── */
const SketchCard = ({ resource, index }) => (
  <a
    href={resource.link}
    target="_blank"
    rel="noreferrer"
    className={`group relative block flex-shrink-0 w-[340px] transition-all duration-400
      ${index % 3 === 0 ? 'rotate-[1.5deg]' : index % 3 === 1 ? '-rotate-[1.5deg]' : 'rotate-[0.5deg]'}
      hover:rotate-0 hover:scale-[1.04]`}
  >
    <div className="relative bg-[#fffdf8] rounded-2xl p-7 h-full border-2 border-amber-900/10
      shadow-[4px_4px_0_rgba(146,108,71,0.08)] group-hover:shadow-[6px_6px_0_rgba(146,108,71,0.14)]
      group-hover:border-amber-900/20 transition-all duration-400">

      {/* Washi tape decoration */}
      <div className="absolute -top-2 left-8 w-16 h-5 rounded-sm opacity-60 group-hover:opacity-80 transition-opacity"
        style={{ background: resource.sketchAccent + '18', border: `1px solid ${resource.sketchAccent}25`, transform: 'rotate(-2deg)' }} />

      {/* Category */}
      <span className="absolute top-4 right-5 text-[10px] font-serif italic text-amber-700/40 tracking-wide">
        {resource.category}
      </span>

      {/* Icon */}
      <div className="relative w-14 h-14 mb-5 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-dashed group-hover:border-solid transition-all duration-400"
          style={{ borderColor: resource.sketchAccent + '30' }} />
        <div className="absolute inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
          style={{ background: resource.sketchAccent + '08' }} />
        <div style={{ color: resource.sketchAccent }} className="w-6 h-6 group-hover:scale-110 transition-transform duration-300">
          {React.cloneElement(resource.icon, { className: 'w-6 h-6' })}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-amber-900 mb-2 font-serif group-hover:text-amber-800 transition-colors">
        {resource.name}
      </h3>
      <p className="text-amber-800/45 text-sm leading-relaxed font-serif italic group-hover:text-amber-800/65 transition-colors line-clamp-2">
        {resource.description}
      </p>

      {/* Visit */}
      <div className="mt-4 flex items-center gap-2 text-xs text-amber-700/25 group-hover:text-amber-700/55 transition-all duration-300">
        <div className="w-0 group-hover:w-6 h-[1px] transition-all duration-400" style={{ background: resource.sketchAccent + '40' }} />
        <ExternalLink size={11} />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity font-serif italic">explore →</span>
      </div>

      {/* Corner fold */}
      <div className="absolute bottom-0 right-0 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity rounded-br-2xl"
        style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(146,108,71,0.07) 50%)' }} />
    </div>
  </a>
);


/* ───── Single Carousel ───── */
const Carousel = ({ isSketchMode }) => {
  const [isPaused, setIsPaused] = useState(false);

  // Quadruple items for seamless infinite loop
  const duped = [...resources, ...resources, ...resources, ...resources];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left/right fade masks */}
      <div className={`absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none
        ${isSketchMode
          ? 'bg-gradient-to-r from-[#f5f0e6] to-transparent'
          : 'bg-gradient-to-r from-[#08080c] to-transparent'}`}
      />
      <div className={`absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none
        ${isSketchMode
          ? 'bg-gradient-to-l from-[#f5f0e6] to-transparent'
          : 'bg-gradient-to-l from-[#08080c] to-transparent'}`}
      />

      <div
        className="flex gap-6 py-6"
        style={{
          animation: 'scroll-left 60s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
          width: 'max-content',
        }}
      >
        {duped.map((resource, i) =>
          isSketchMode
            ? <SketchCard key={`${resource.name}-${i}`} resource={resource} index={i} />
            : <DarkCard key={`${resource.name}-${i}`} resource={resource} />
        )}
      </div>
    </div>
  );
};


const Footer = () => {
  const { isSketchMode } = useTheme();

  return (
    <footer
      id="resources"
      className={`py-24 min-h-screen flex flex-col justify-center relative overflow-hidden transition-colors duration-700
        ${isSketchMode ? 'bg-[#f5f0e6]' : 'bg-[#08080c] border-t border-white/[0.04]'}`}
    >
      {/* ── Background ── */}
      {!isSketchMode ? (
        <>
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[180px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[180px] pointer-events-none" />

          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }} />

          {/* Floating geometric shapes */}
          <div className="absolute top-[15%] left-[8%] w-20 h-20 border border-blue-500/10 rounded-xl pointer-events-none"
            style={{ animation: 'float-shape 12s ease-in-out infinite', transform: 'rotate(15deg)' }} />
          <div className="absolute top-[25%] right-[12%] w-14 h-14 border border-purple-500/10 rounded-full pointer-events-none"
            style={{ animation: 'float-shape 10s ease-in-out 2s infinite' }} />
          <div className="absolute bottom-[20%] left-[15%] w-10 h-10 border border-indigo-500/10 pointer-events-none"
            style={{ animation: 'float-shape 14s ease-in-out 4s infinite', transform: 'rotate(45deg)' }} />
          <div className="absolute bottom-[30%] right-[8%] w-16 h-16 border border-cyan-500/8 rounded-xl pointer-events-none"
            style={{ animation: 'float-shape 11s ease-in-out 1s infinite', transform: 'rotate(-20deg)' }} />
          <div className="absolute top-[60%] left-[5%] w-6 h-6 bg-blue-400/5 rounded-full pointer-events-none"
            style={{ animation: 'float-shape 9s ease-in-out 3s infinite' }} />
          <div className="absolute top-[10%] right-[30%] w-4 h-4 bg-purple-400/5 rounded-full pointer-events-none"
            style={{ animation: 'float-shape 8s ease-in-out 5s infinite' }} />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </>
      ) : (
        <>
          {/* Paper texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />

          {/* Watercolor washes */}
          <div className="absolute top-0 right-0 w-[40%] h-[40%] pointer-events-none opacity-40"
            style={{ background: 'radial-gradient(ellipse at 80% 20%, rgba(180,140,100,0.15) 0%, transparent 60%)' }} />
          <div className="absolute bottom-0 left-0 w-[35%] h-[35%] pointer-events-none opacity-40"
            style={{ background: 'radial-gradient(ellipse at 20% 80%, rgba(120,150,100,0.12) 0%, transparent 60%)' }} />

          {/* ★ SVG Scribbles & Doodles ★ */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            {/* Swirly spiral – top right */}
            <path d="M85% 12% Q 87% 8%, 90% 12% Q 93% 16%, 89% 18% Q 85% 20%, 83% 16% Q 81% 12%, 85% 10%"
              fill="none" stroke="rgba(146,108,71,0.08)" strokeWidth="2" strokeLinecap="round"
              style={{ animation: 'scribble-draw 3s ease-out forwards' }}
              transform="translate(-40, 0)" />
            <path d="M920,80 C940,60 960,90 940,100 C920,110 900,90 910,75 C920,60 945,55 950,75"
              fill="none" stroke="rgba(146,108,71,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="200" strokeDashoffset="200"
              style={{ animation: 'draw-line 2s ease-out 0.5s forwards' }} />

            {/* Star doodle – top left */}
            <g transform="translate(80, 120)" opacity="0.1">
              <path d="M12,2 L14.5,9 L22,9 L16,13.5 L18,21 L12,16.5 L6,21 L8,13.5 L2,9 L9.5,9 Z"
                fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.5" strokeLinejoin="round" />
            </g>
            <g transform="translate(120, 90)" opacity="0.06">
              <path d="M8,1 L10,6 L15,6 L11,9 L12.5,14 L8,11 L3.5,14 L5,9 L1,6 L6,6 Z"
                fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.2" strokeLinejoin="round" />
            </g>

            {/* Wavy underline scribble – bottom area */}
            <path d="M100,750 Q 160,735 220,750 Q 280,765 340,750 Q 400,735 460,750"
              fill="none" stroke="rgba(146,108,71,0.07)" strokeWidth="2" strokeLinecap="round"
              strokeDasharray="400" strokeDashoffset="400"
              style={{ animation: 'draw-line 2.5s ease-out 1s forwards' }} />

            {/* Arrow doodle – right side */}
            <g transform="translate(920, 400)" opacity="0.08">
              <path d="M0,30 Q 10,10 25,0" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M18,-3 L25,0 L20,7" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Circle scribble – left side */}
            <circle cx="60" cy="500" r="20" fill="none" stroke="rgba(146,108,71,0.06)" strokeWidth="1.5"
              strokeDasharray="130" strokeDashoffset="130"
              style={{ animation: 'draw-line 2s ease-out 1.5s forwards' }} />
            <circle cx="65" cy="498" r="18" fill="none" stroke="rgba(146,108,71,0.04)" strokeWidth="1"
              strokeDasharray="120" strokeDashoffset="120"
              style={{ animation: 'draw-line 2s ease-out 1.8s forwards' }} />

            {/* Xs / crosses */}
            <g transform="translate(200, 180)" opacity="0.06">
              <line x1="0" y1="0" x2="12" y2="12" stroke="rgba(146,108,71,1)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="12" y1="0" x2="0" y2="12" stroke="rgba(146,108,71,1)" strokeWidth="1.5" strokeLinecap="round" />
            </g>
            <g transform="translate(800, 600)" opacity="0.06">
              <line x1="0" y1="0" x2="10" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="10" y1="0" x2="0" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Dotted trail */}
            <g opacity="0.06">
              {[...Array(8)].map((_, i) => (
                <circle key={i} cx={700 + i * 18} cy={200 + Math.sin(i * 0.8) * 12} r="2" fill="rgba(146,108,71,1)" />
              ))}
            </g>

            {/* Small heart doodle */}
            <g transform="translate(150, 650)" opacity="0.08">
              <path d="M10,5 C10,2 7,0 5,2 C3,0 0,2 0,5 C0,9 5,13 5,13 C5,13 10,9 10,5 Z"
                fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.2" strokeLinejoin="round" />
            </g>

            {/* Another spiral – bottom right */}
            <path d="M850,680 C860,670 875,670 875,680 C875,690 860,695 855,685 C850,675 865,665 878,672"
              fill="none" stroke="rgba(146,108,71,0.07)" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray="150" strokeDashoffset="150"
              style={{ animation: 'draw-line 2s ease-out 2s forwards' }} />

            {/* Asterisk / sparkle */}
            <g transform="translate(500, 100)" opacity="0.07">
              <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="0" y1="6" x2="12" y2="6" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="2" y1="2" x2="10" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="1" strokeLinecap="round" />
              <line x1="10" y1="2" x2="2" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Bracket doodle */}
            <g transform="translate(750, 150)" opacity="0.05">
              <path d="M0,0 Q -8,15 0,30" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M20,0 Q 28,15 20,30" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </svg>
        </>
      )}

      <div className="relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-16 px-6">
          {isSketchMode ? (
            <>
              <Coffee className="w-10 h-10 mx-auto text-amber-700 mb-5" />
              <h2 className="text-5xl md:text-6xl font-bold text-amber-900 mb-4 font-serif">
                Resources & Credits
              </h2>
              <p className="text-amber-800/50 max-w-xl mx-auto text-lg font-serif italic">
                The wonderful tools, libraries, and platforms that brought this project to life.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-16 h-[2px] bg-amber-900/15 rounded-full" />
                <Heart size={14} className="text-amber-700/30" />
                <div className="w-16 h-[2px] bg-amber-900/15 rounded-full" />
              </div>
            </>
          ) : (
            <>
              <Heart className="w-10 h-10 mx-auto text-blue-500 mb-6" />
              <div className="flex flex-wrap justify-center mb-4">
                {"Resources & Credits".split("").map((char, index) => (
                  <span
                    key={index}
                    className="text-4xl md:text-6xl font-bold tracking-tight text-white hover:text-blue-400 drop-shadow-[0_0_8px_rgba(255,255,255,0)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] hover:scale-125 hover:-translate-y-4 cursor-default inline-block select-none [transition:color_1000ms,transform_300ms,filter_300ms]"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
              <p className="text-zinc-500 max-w-xl mx-auto text-lg font-light">
                A special thanks to the tools and platforms that made this project possible.
              </p>
            </>
          )}
        </div>

        {/* ── Carousel ── */}
        <div className="mb-20">
          <Carousel isSketchMode={isSketchMode} />
        </div>

        {/* ── Footer bottom ── */}
        <div className="px-6">
          {isSketchMode ? (
            <div className="text-center pt-8 border-t-2 border-dashed border-amber-900/10 max-w-4xl mx-auto">
              <p className="flex items-center justify-center gap-2 text-amber-800/60 font-serif italic text-sm">
                Crafted with <Heart size={14} className="text-red-400 fill-red-400" /> by Lance Art
              </p>
              <p className="text-amber-800/30 text-xs mt-2 font-serif">&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          ) : (
            <div className="text-center pt-8 border-t border-white/[0.04] max-w-4xl mx-auto">
              <p className="flex items-center justify-center gap-2 text-white/30 text-sm">
                Made with <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" /> by
                <span className="text-white/50 font-medium">Lance Art</span>
              </p>
              <p className="text-white/15 text-xs mt-2">&copy; {new Date().getFullYear()} All rights reserved.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float-shape {
          0%, 100% { transform: translateY(0px) rotate(var(--tw-rotate, 0deg)); opacity: 0.6; }
          50% { transform: translateY(-20px) rotate(calc(var(--tw-rotate, 0deg) + 10deg)); opacity: 1; }
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes scribble-draw {
          from { stroke-dashoffset: 100; }
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </footer>
  );
};

export default Footer;
