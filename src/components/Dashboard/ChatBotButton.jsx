import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithAstra } from '../../services/ai';
import { useISSTracker } from '../../hooks/useISSTracker';
import { useNews } from '../../hooks/useNews';

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'astra', text: 'Hello! I am Astra. How can I assist you with the ISS telemetry or mission news today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { locationName, astronauts, position } = useISSTracker();
  const { articles } = useNews('space');
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const context = {
        issLocation: locationName || `${position?.lat}, ${position?.lon}`,
        crew: astronauts || [],
        news: articles.slice(0, 5) || []
      };

      console.log('DEBUG: Initiating chat with context', context);
      const response = await chatWithAstra(input, context);
      setMessages(prev => [...prev, { role: 'astra', text: response }]);
    } catch (error) {
      console.error('DEBUG: Chatbot error', error);
      const errorMsg = error.message.includes('Token') 
        ? 'Invalid AI Token. Please check your .env file.' 
        : error.message;
      setMessages(prev => [...prev, { role: 'astra', text: `System Error: ${errorMsg}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-80 glass-card rounded-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
          >
            <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest">Astra Assistant</h4>
                <p className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">Online • Mission Support</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                <X size={14} />
              </button>
            </div>
            
            <div 
              ref={scrollRef}
              className="h-80 p-4 overflow-y-auto bg-slate-50 flex flex-col space-y-3 custom-scrollbar"
            >
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`max-w-[85%] p-3 rounded-xl text-[11px] leading-relaxed ${
                    msg.role === 'astra' 
                      ? 'bg-white border border-slate-100 rounded-tl-none text-slate-700 shadow-sm' 
                      : 'bg-slate-900 text-white self-end rounded-tr-none shadow-md'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="bg-white border border-slate-100 rounded-xl rounded-tl-none p-3 max-w-[50%] flex items-center space-x-2">
                  <Loader2 size={12} className="animate-spin text-slate-400" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Astra is typing...</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about ISS or News..." 
                className="flex-1 bg-slate-50 border-none focus:ring-0 text-[11px] py-2 px-3 rounded-lg placeholder:text-slate-400"
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />}
      </button>
    </div>
  );
};

export default ChatBotButton;
