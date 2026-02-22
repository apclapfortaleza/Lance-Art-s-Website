import React from 'react';
import { Search, Palette, Microchip, Github, Heart } from 'lucide-react';

const resources = [
  {
    name: "Google Search Engine",
    description: "Used to find images and programming tutorials.",
    icon: <Search className="w-8 h-8 text-blue-500" />,
    link: "https://google.com",
    color: "hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
  },
  {
    name: "Font Awesome / Lucide",
    description: "Scalable vector icons used throughout the interface.",
    icon: <Palette className="w-8 h-8 text-purple-500" />,
    link: "https://lucide.dev",
    color: "hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
  },
  {
    name: "Tailwind CSS",
    description: "Responsive framework for layout and components.",
    icon: <div className="text-cyan-400 font-bold text-2xl">TW</div>,
    link: "https://tailwindcss.com",
    color: "hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
  },
  {
    name: "Gemini AI",
    description: "Help with logic, debugging, and code structure.",
    icon: <Microchip className="w-8 h-8 text-amber-500" />,
    link: "https://gemini.google.com/app",
    color: "hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
  },
  {
    name: "Github",
    description: "Hosted code repository.",
    icon: <Github className="w-8 h-8 text-zinc-100" />,
    link: "https://github.com/apclapfortaleza/Lance-Art-s-Website",
    color: "hover:border-zinc-100/50 hover:shadow-[0_0_20px_rgba(244,244,245,0.2)]"
  },
  {
    name: "React & Vite",
    description: "Frontend framework and rapid build tool.",
    icon: <div className="text-blue-400 font-bold text-2xl">Re</div>,
    link: "https://react.dev",
    color: "hover:border-blue-400/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]"
  },
];

const Footer = () => {
  return (
    <footer id="resources" className="py-24 bg-zinc-950 border-t border-zinc-800 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Resources & Credits</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            A special thanks to the tools and platforms that made this project possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {resources.map((resource, index) => (
            <a 
              key={index}
              href={resource.link}
              target="_blank"
              rel="noreferrer"
              className={`block bg-zinc-900 border border-zinc-800 rounded-2xl p-6 transition-all duration-300 group ${resource.color}`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-zinc-950 rounded-xl group-hover:scale-110 transition-transform">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{resource.name}</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{resource.description}</p>
            </a>
          ))}
        </div>

        <div className="text-center text-zinc-500 border-t border-zinc-800/50 pt-8 flex flex-col items-center gap-2">
          <p className="flex items-center gap-2">
            Made with <Heart size={16} className="text-red-500 fill-red-500" /> by Lance Art
          </p>
          <p className="text-xs">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
