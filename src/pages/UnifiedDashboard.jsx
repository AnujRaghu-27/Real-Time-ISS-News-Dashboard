import React, { useState } from 'react';
import { useISSTracker } from '../hooks/useISSTracker';
import { useNews } from '../hooks/useNews';
import ISSTrackerMap from '../components/Dashboard/ISSTrackerMap';
import SpeedChart from '../components/Dashboard/SpeedChart';
import NewsRow from '../components/News/NewsRow';
import ChatBotButton from '../components/Dashboard/ChatBotButton';
import { Search, RefreshCw, ChevronDown, Moon, Sun, Loader2 } from 'lucide-react';

const UnifiedDashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [newsSearch, setNewsSearch] = useState('ISS space station');
  const { position, history, locationName, speed, loading: issLoading, refresh: refreshISS } = useISSTracker();
  const { articles, loading: newsLoading, error: newsError, refetch: refetchNews } = useNews(newsSearch);

  const handleNewsSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query.trim()) {
      setNewsSearch(query);
      refetchNews(query);
    }
  };

  return (
    <div className={`min-h-screen p-5 md:p-8 lg:p-10 ${isDark ? 'bg-slate-950 text-white' : 'bg-[#f8f5f2] text-slate-800'}`}>
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Mission Control Dashboard</h4>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Real-Time ISS and News Intelligence</h1>
        </div>
        <button 
          onClick={() => setIsDark(!isDark)}
          className="self-end px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center space-x-2"
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
          <span>Switch to {isDark ? 'Light' : 'Dark'}</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1600px] mx-auto">
        {/* Left Column: Tracking */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">ISS Live Tracking</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={refreshISS}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase hover:bg-slate-200 transition-all flex items-center"
                >
                  {issLoading && <Loader2 size={12} className="animate-spin mr-2" />}
                  Refresh Now
                </button>
                <div className="px-4 py-2 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-black uppercase border border-slate-100">
                  Auto-Refresh: ON
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Latitude / Longitude', value: position ? `${position.lat.toFixed(3)}, ${position.lon.toFixed(3)}` : '---' },
                { label: 'Speed', value: speed ? `${speed.toFixed(2)} km/h` : '27600.00 km/h' },
                { label: 'Nearest Place', value: locationName || 'Over ocean / remote area' },
                { label: 'Tracked Positions', value: history.length }
              ].map((stat, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                  <p className="text-[9px] font-black text-slate-400 uppercase mb-1 tracking-wider">{stat.label}</p>
                  <p className="text-sm font-bold text-slate-900 truncate">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="h-[450px] rounded-xl overflow-hidden border border-slate-100 relative group shadow-inner">
               <ISSTrackerMap position={position} history={history} />
            </div>
          </div>

          {/* News Section */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Breaking News</h2>
              <button 
                onClick={() => refetchNews(newsSearch)}
                className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase hover:bg-slate-200 transition-all flex items-center"
              >
                {newsLoading && <Loader2 size={12} className="animate-spin mr-2" />}
                Refresh
              </button>
            </div>

            <form onSubmit={handleNewsSearch} className="flex flex-col md:flex-row items-center gap-3 mb-6">
              <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 w-full focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
                <Search size={14} className="text-slate-400 mr-2" />
                <input 
                  name="search"
                  type="text" 
                  placeholder="Search title, source, author..." 
                  className="bg-transparent border-none focus:ring-0 text-xs w-full text-slate-800 placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center justify-between md:justify-start space-x-3 bg-white border border-slate-200 rounded-xl px-4 py-2.5 cursor-pointer hover:bg-slate-50 transition-all w-full md:w-auto">
                <span className="text-xs font-bold text-slate-600">Sort by Date</span>
                <ChevronDown size={14} className="text-slate-400" />
              </div>
            </form>

            <div className="space-y-3 min-h-[400px] max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
              {newsLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                  <RefreshCw className="animate-spin mb-4" size={32} />
                  <p className="text-[10px] font-black uppercase tracking-widest">Fetching Headlines...</p>
                </div>
              ) : newsError ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <p className="text-xs font-bold mb-2">{newsError}</p>
                  <button onClick={() => refetchNews(newsSearch)} className="text-[10px] font-black text-blue-500 uppercase underline">Try Again</button>
                </div>
              ) : (
                articles.map((article, idx) => (
                  <NewsRow key={idx} article={article} index={idx + 1} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Speed Chart */}
        <div className="lg:col-span-4">
           <div className="sticky top-10">
             <div className="h-[550px]">
               <SpeedChart history={history} />
             </div>
           </div>
        </div>
      </div>

      <ChatBotButton />
    </div>
  );
};

export default UnifiedDashboard;
