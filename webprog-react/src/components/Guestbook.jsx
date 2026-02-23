import React, { useState, useEffect } from 'react';
import { Send, MessageSquareHeart, User, Calendar, Sparkles, Quote, PenTool } from 'lucide-react';
import axios from 'axios';
import { useTheme } from './ThemeContext';

const API_URL = 'https://lance-art-s-website-9lao.vercel.app/guestbook/';

const Guestbook = () => {
  const { isSketchMode } = useTheme();
  const [comments, setComments] = useState([]);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Initial load
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      setComments(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching guestbook entries:', err);
      setError('Could not connect to the backend server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;

    try {
      const response = await axios.post(API_URL, {
        name: newName,
        message: newMessage,
      });
      
      // Prepend the new comment to the state immediately
      setComments([response.data, ...comments]);
      setNewName('');
      setNewMessage('');
      setError('');
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to post your message. Please try again.');
    }
  };

  return (
    <section id="guestbook" className={`py-24 min-h-screen flex flex-col justify-center relative overflow-hidden transition-colors duration-700 ${isSketchMode ? 'bg-[#f5f0e6]' : 'bg-zinc-950 border-t border-zinc-800/50'}`}>
      
      {/* Background Decorative Elements */}
      {!isSketchMode ? (
        <>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/graphy.png")' }}></div>
          {/* SVG Scribble Doodles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            {/* Star – top right */}
            <g transform="translate(880, 80)" opacity="0.09">
              <path d="M10,1 L12.5,7 L19,7 L14,11 L15.5,18 L10,14 L4.5,18 L6,11 L1,7 L7.5,7 Z"
                fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinejoin="round" />
            </g>
            {/* Smaller star */}
            <g transform="translate(920, 120)" opacity="0.06">
              <path d="M6,0 L7.5,4.5 L12,4.5 L8.5,7 L9.5,11.5 L6,9 L2.5,11.5 L3.5,7 L0,4.5 L4.5,4.5 Z"
                fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1" strokeLinejoin="round" />
            </g>
            {/* Spiral – top left */}
            <path d="M70,140 C80,130 95,130 95,140 C95,150 80,155 75,145 C70,135 85,125 98,132"
              fill="none" stroke="rgba(146,108,71,0.07)" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray="150" strokeDashoffset="150"
              style={{ animation: 'draw-line 2s ease-out 0.5s forwards' }} />
            {/* Wavy line – middle */}
            <path d="M50,450 Q 90,435 130,450 Q 170,465 210,450 Q 250,435 290,450"
              fill="none" stroke="rgba(146,108,71,0.06)" strokeWidth="1.5" strokeLinecap="round"
              strokeDasharray="300" strokeDashoffset="300"
              style={{ animation: 'draw-line 2.5s ease-out 1s forwards' }} />
            {/* Heart – bottom left */}
            <g transform="translate(100, 700)" opacity="0.08">
              <path d="M12,6 C12,3 9,0 6,3 C3,0 0,3 0,6 C0,11 6,16 6,16 C6,16 12,11 12,6 Z"
                fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.2" strokeLinejoin="round" />
            </g>
            {/* Arrow – right side */}
            <g transform="translate(900, 500)" opacity="0.07">
              <path d="M0,25 Q 8,8 20,0" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M14,-2 L20,0 L16,6" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            {/* X marks */}
            <g transform="translate(830, 300)" opacity="0.05">
              <line x1="0" y1="0" x2="10" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="10" y1="0" x2="0" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
            </g>
            <g transform="translate(60, 350)" opacity="0.05">
              <line x1="0" y1="0" x2="8" y2="8" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
              <line x1="8" y1="0" x2="0" y2="8" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
            </g>
            {/* Dotted trail */}
            <g opacity="0.05">
              {[...Array(6)].map((_, i) => (
                <circle key={i} cx={750 + i * 16} cy={600 + Math.sin(i) * 8} r="1.5" fill="rgba(146,108,71,1)" />
              ))}
            </g>
            {/* Curly bracket */}
            <g transform="translate(50, 200)" opacity="0.05">
              <path d="M0,0 Q -6,12 0,24" fill="none" stroke="rgba(146,108,71,1)" strokeWidth="1.3" strokeLinecap="round" />
            </g>
            {/* Circle scribble */}
            <circle cx="870" cy="680" r="15" fill="none" stroke="rgba(146,108,71,0.05)" strokeWidth="1.3"
              strokeDasharray="100" strokeDashoffset="100"
              style={{ animation: 'draw-line 2s ease-out 1.5s forwards' }} />
            {/* Asterisk */}
            <g transform="translate(450, 60)" opacity="0.06">
              <line x1="5" y1="0" x2="5" y2="10" stroke="rgba(146,108,71,1)" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="0" y1="5" x2="10" y2="5" stroke="rgba(146,108,71,1)" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="1.5" y1="1.5" x2="8.5" y2="8.5" stroke="rgba(146,108,71,1)" strokeWidth="0.9" strokeLinecap="round" />
              <line x1="8.5" y1="1.5" x2="1.5" y2="8.5" stroke="rgba(146,108,71,1)" strokeWidth="0.9" strokeLinecap="round" />
            </g>
          </svg>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes draw-line { to { stroke-dashoffset: 0; } }
          `}} />
        </>
      )}

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block relative">
            {isSketchMode ? (
              <PenTool className="w-12 h-12 mx-auto text-amber-800 mb-4 animate-bounce" />
            ) : (
              <MessageSquareHeart className="w-12 h-12 mx-auto text-blue-500 mb-4 animate-pulse" />
            )}
          </div>
          
          <div className="flex flex-wrap justify-center mb-4">
            {"Guestbook".split("").map((char, index) => (
              <span 
                key={index}
                className={`text-5xl md:text-7xl font-bold tracking-tight transition-all duration-300 cursor-default inline-block select-none hover:scale-125 hover:-translate-y-2
                  ${isSketchMode 
                    ? 'text-amber-900 font-serif drop-shadow-sm' 
                    : 'text-white hover:text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]'}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {char}
              </span>
            ))}
          </div>
          <p className={`${isSketchMode ? 'text-amber-800/70 font-medium italic' : 'text-zinc-400 font-light'} text-lg`}>
            {isSketchMode ? "Leave a lovely note! 🖋️" : "Leave a message in the digital archive! ✨"}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Submission Form */}
          <div className="lg:col-span-5">
            <div className={`p-8 rounded-3xl transition-all duration-500 shadow-2xl
              ${isSketchMode 
                ? 'bg-[#fffdfa] border-2 border-amber-900/10 rotate-[-1deg] hover:rotate-0' 
                : 'bg-zinc-900/50 backdrop-blur-xl border border-white/10 hover:border-blue-500/30'}`}>
              
              <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3
                ${isSketchMode ? 'text-amber-900 font-serif' : 'text-white'}`}>
                <Sparkles className={isSketchMode ? 'text-amber-700' : 'text-blue-400'} size={24} />
                New Entry
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={`block text-sm mb-2 font-medium ${isSketchMode ? 'text-amber-800' : 'text-zinc-400'}`}>Name</label>
                  <div className="relative">
                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 ${isSketchMode ? 'text-amber-600' : 'text-zinc-500'}`} size={18} />
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Your Name..." 
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl transition-all focus:outline-none focus:ring-2
                        ${isSketchMode 
                          ? 'bg-amber-50/50 border-2 border-amber-900/10 text-amber-900 placeholder-amber-400/50 focus:ring-amber-500/30' 
                          : 'bg-zinc-950/80 border border-white/5 text-white placeholder-zinc-600 focus:ring-blue-500/40'}`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm mb-2 font-medium ${isSketchMode ? 'text-amber-800' : 'text-zinc-400'}`}>Message</label>
                  <textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write something nice..." 
                    className={`w-full px-4 py-4 rounded-2xl transition-all focus:outline-none focus:ring-2 resize-none h-32
                      ${isSketchMode 
                        ? 'bg-amber-50/50 border-2 border-amber-900/10 text-amber-900 placeholder-amber-400/50 focus:ring-amber-500/30 font-serif italic' 
                        : 'bg-zinc-950/80 border border-white/5 text-white placeholder-zinc-600 focus:ring-blue-500/40'}`}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-bold transition-all transform active:scale-95 shadow-lg
                    ${isSketchMode 
                      ? 'bg-amber-800 hover:bg-amber-900 text-amber-50' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20'}`}
                >
                  Post Message
                  <Send size={18} />
                </button>
              </form>

              {error && (
                <div className={`mt-6 p-4 rounded-xl border text-sm flex items-center gap-3
                  ${isSketchMode 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Comment Feed */}
          <div className="lg:col-span-7 h-[600px] overflow-y-auto pr-4 custom-scrollbar">
            <div className="space-y-6 pb-8">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                  <div className={`w-12 h-12 rounded-full border-4 mb-4 ${isSketchMode ? 'border-amber-800/30 border-t-amber-800' : 'border-blue-500/30 border-t-blue-500'} animate-spin`}></div>
                  <p className={isSketchMode ? 'text-amber-800/50' : 'text-zinc-500'}>Accessing memories...</p>
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-20 opacity-50">
                  <Quote size={48} className={`mx-auto mb-4 ${isSketchMode ? 'text-amber-800' : 'text-blue-400'}`} />
                  <p className={`text-xl font-light ${isSketchMode ? 'text-amber-900' : 'text-white'}`}>No messages yet. Be the first to leave a mark!</p>
                </div>
              ) : (
                comments.map((comment, index) => (
                  <div 
                    key={comment.id} 
                    className={`p-6 rounded-3xl transition-all duration-300 group
                      ${isSketchMode 
                        ? `bg-white border-2 border-amber-900/10 shadow-[4px_4px_0px_rgba(146,108,71,0.1)] 
                           ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 hover:scale-[1.02]` 
                        : 'bg-zinc-900/30 backdrop-blur-sm border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900/50'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold
                          ${isSketchMode 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                          {comment.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h6 className={`font-bold ${isSketchMode ? 'text-amber-900' : 'text-white group-hover:text-blue-400 transition-colors'}`}>
                            {comment.name}
                          </h6>
                          <div className={`flex items-center gap-2 text-xs ${isSketchMode ? 'text-amber-700/60' : 'text-zinc-500'}`}>
                            <Calendar size={12} />
                            {new Date(comment.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      {isSketchMode && <Quote size={16} className="absolute -left-2 -top-2 text-amber-200" />}
                      <p className={`leading-relaxed text-lg
                        ${isSketchMode 
                          ? 'text-amber-900/80 font-serif italic' 
                          : 'text-zinc-300 group-hover:text-zinc-100 transition-colors'}`}>
                        {comment.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isSketchMode ? 'rgba(146, 108, 71, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isSketchMode ? 'rgba(146, 108, 71, 0.4)' : 'rgba(59, 130, 246, 0.3)'};
        }
      `}} />
    </section>
  );
};

export default Guestbook;
