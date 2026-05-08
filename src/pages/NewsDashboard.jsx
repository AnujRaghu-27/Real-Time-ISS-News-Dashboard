import React, { useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import NewsRow from '../components/News/NewsRow';
import { useNews } from '../hooks/useNews';
import { Search, Loader2, AlertCircle, Newspaper, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NewsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('space');
  const { articles, loading, error, refetch } = useNews(searchTerm);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query.trim()) {
      setSearchTerm(query);
      refetch(query);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">GLOBAL FEED</h2>
            <p className="text-slate-400 text-xs font-medium">Monitoring international news streams.</p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-full md:w-80 group focus-within:border-slate-400 transition-all">
            <Search size={14} className="text-slate-400 group-focus-within:text-slate-600" />
            <input 
              name="search"
              type="text" 
              placeholder="Filter topics..." 
              className="bg-transparent border-none focus:ring-0 text-[11px] ml-2 w-full text-slate-800 placeholder:text-slate-400"
            />
          </form>
        </div>

        {error && (
          <div className="glass-card p-8 rounded-xl flex flex-col items-center text-center">
            <AlertCircle size={24} className="text-rose-500 mb-3" />
            <p className="text-slate-600 text-xs font-medium mb-4">{error}</p>
            <button 
              onClick={() => refetch(searchTerm)}
              className="px-4 py-2 bg-slate-900 text-white text-[11px] font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              RETRY FETCH
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-slate-400 mb-3" size={32} />
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Scanning...</p>
          </div>
        ) : (
          <div className="glass-card rounded-xl overflow-hidden border border-slate-100">
            <div className="bg-slate-50/50 px-4 py-3 border-b border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase">Latest Headlines</span>
            </div>
            <motion.div layout className="divide-y divide-slate-50">
              <AnimatePresence>
                {articles.map((article, idx) => (
                  <motion.div
                    key={article.url || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.05 }}
                  >
                    <NewsRow article={article} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};



export default NewsDashboard;
