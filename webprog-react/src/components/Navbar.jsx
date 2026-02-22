import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSketchMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Who', href: '#about' },
    { name: 'Education', href: '#edu' },
    { name: 'Portfolio', href: '#exp' },
    { name: 'Hobbies', href: '#hobbies' },
    { name: 'Gallery', href: '#memory-heart' },
    { name: 'Guestbook', href: '#guestbook' },
    { name: 'Resources', href: '#resources' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-900/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-white tracking-tighter">LA<span className="text-blue-500">.</span></a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-zinc-300 hover:text-white transition-colors text-sm font-medium">
              {link.name}
            </a>
          ))}
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="relative w-9 h-9 rounded-full border border-zinc-700 hover:border-zinc-500 flex items-center justify-center transition-all duration-500 hover:scale-110 group overflow-hidden"
            title={isSketchMode ? 'Switch to Dark Mode' : 'Switch to Sketch Mode'}
          >
            <div className={`absolute transition-all duration-500 ${isSketchMode ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'}`}>
              <Moon size={16} className="text-amber-700" />
            </div>
            <div className={`absolute transition-all duration-500 ${!isSketchMode ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
              <Sun size={16} className="text-zinc-400 group-hover:text-yellow-400" />
            </div>
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center transition-all duration-500"
          >
            {isSketchMode ? <Moon size={14} className="text-amber-700" /> : <Sun size={14} className="text-zinc-400" />}
          </button>
          <button 
            className="text-zinc-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 py-4">
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-zinc-300 hover:text-white transition-colors font-medium text-lg w-full text-center py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
