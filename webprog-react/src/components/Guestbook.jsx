import React, { useState, useEffect } from 'react';
import { Send, Trash2, MessageSquareHeart } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/guestbook';

const Guestbook = () => {
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
      setError('Could not connect to the backend server. Make sure NestJS is running on port 3000.');
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setComments(comments.filter(c => c.id !== id));
      setError('');
    } catch (err) {
      console.error('Error deleting comment:', err);
      setError('Failed to delete message.');
    }
  };



  return (
    <section id="guestbook" className="py-24 bg-zinc-950 min-h-screen border-t border-zinc-800 flex flex-col justify-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <MessageSquareHeart className="w-12 h-12 mx-auto text-blue-500 mb-4" />
          <div className="flex flex-wrap justify-center mb-2">
            {"Guestbook".split("").map((char, index) => (
              <span 
                key={index}
                className="text-4xl md:text-5xl font-bold tracking-tight text-white hover:text-blue-400 drop-shadow-[0_0_8px_rgba(255,255,255,0)] hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] hover:scale-125 hover:-translate-y-4 cursor-default inline-block select-none [transition:color_1000ms,transform_300ms,filter_300ms]"
              >
                {char}
              </span>
            ))}
          </div>
          <p className="text-zinc-400">Leave a message below! ✨</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mb-12">
            <div className="flex flex-col gap-4">
              <input 
                type="text" 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Your Name..." 
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow"
                required
              />
              <div className="flex gap-4">
                <textarea 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Your comment..." 
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow resize-none h-14"
                  required
                ></textarea>
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-6 flex items-center justify-center transition-colors shadow-lg"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </form>

          {/* Comment Feed */}
          <div className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-xl mb-6">
                {error}
              </div>
            )}
            
            {isLoading ? (
              <p className="text-zinc-500 text-center italic animate-pulse">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-zinc-500 text-center italic">No comments yet. Be the first!</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-zinc-950/50 border border-zinc-800/50 rounded-2xl p-5 hover:border-zinc-700 transition-colors group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h6 className="text-blue-400 font-medium">{comment.name}</h6>
                      <span className="text-xs text-zinc-600">
                        {new Date(comment.createdAt).toLocaleDateString()} {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <button 
                      onClick={() => handleDelete(comment.id)}
                      className="text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2 rounded-full hover:bg-red-500/10"
                      title="Delete comment"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-zinc-300 leading-relaxed">{comment.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
