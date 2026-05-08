import React, { useState } from 'react';
import { useISSTracker } from '../hooks/useISSTracker';
import { useNews } from '../hooks/useNews';
import ISSTrackerMap from '../components/Dashboard/ISSTrackerMap';
import SpeedChart from '../components/Dashboard/SpeedChart';
import NewsRow from '../components/News/NewsRow';
import ChatBotButton from '../components/Dashboard/ChatBotButton';
import { Search, RefreshCw, ChevronDown, Moon, Sun } from 'lucide-react';

const UnifiedDashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [newsSearch, setNewsSearch] = useState('space');
  const { position, history, locationName, speed, loading: issLoading, refresh: refreshISS } = useISSTracker();
  const { articles, loading: newsLoading, refetch: refetchNews } = useNews(newsSearch);

  const handleNewsSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query.trim()) {
      setNewsSearch(query);
      refetchNews(query);
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-6 lg:p-8 ${isDark ? 'bg-slate-950 text-white' : 'bg-[#f8f5f2] text-slate-800'}`}>
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
        <div>
          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-0.5">Mission Control Dashboard</h4>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Real-Time ISS and News Intelligence</h1>
        </div>
        <button 
          onClick={() => setIsDark(!isDark)}
          className="self-end px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center space-x-2"
        >
          {isDark ? <Sun size={12} /> : <Moon size={12} />}
          <span>{isDark ? 'Switch to Light' : 'Switch to Dark'}</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ISS Tracking Main */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-black text-slate-900 tracking-tight uppercase">ISS Live Tracking</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={refreshISS}
                  className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-black uppercase hover:bg-slate-200 transition-all"
                >
                  Refresh Now
                </button>
                <div className="px-3 py-1.5 bg-slate-50 text-slate-400 rounded-lg text-[9px] font-black uppercase border border-slate-100">
                  Auto-Refresh: ON
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Latitude / Longitude</p>
                <p className="text-xs font-bold text-slate-900">
                  {position ? `${position.lat.toFixed(3)}, ${position.lon.toFixed(3)}` : '---'}
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Speed</p>
                <p className="text-xs font-bold text-slate-900">
                  {speed ? `${speed.toFixed(2)} km/h` : '27600.00 km/h'}
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl min-h-[50px]">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Nearest Place</p>
                <p className="text-xs font-bold text-slate-900 line-clamp-1">
                  {locationName || 'Over ocean / remote area'}
                </p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Tracked Positions</p>
                <p className="text-xs font-bold text-slate-900">
                  {history.length}
                </p>
              </div>
            </div>

            <div className="h-[380px] rounded-xl overflow-hidden border border-slate-100 relative shadow-inner">
               <ISSTrackerMap position={position} history={history} />
            </div>
          </div>

          {/* Breaking News */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-black text-slate-900 tracking-tight uppercase">Breaking News</h2>
              <button 
                onClick={() => refetchNews(newsSearch)}
                className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-[9px] font-black uppercase hover:bg-slate-200 transition-all"
              >
                Refresh
              </button>
            </div>

            <form onSubmit={handleNewsSearch} className="flex flex-col md:flex-row items-center gap-2 mb-5">
              <div className="flex-1 flex items-center bg-slate-50 border border-slate-100 rounded-xl px-3 py-1.5 w-full">
                <Search size={12} className="text-slate-400 mr-2" />
                <input 
                  name="search"
                  type="text" 
                  placeholder="Search title, source, author..." 
                  className="bg-transparent border-none focus:ring-0 text-[11px] w-full text-slate-800 placeholder:text-slate-400"
                />
              </div>
              <div className="flex items-center justify-between md:justify-start space-x-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-slate-50 transition-all w-full md:w-auto">
                <span className="text-[11px] font-bold text-slate-600">Sort by Date</span>
                <ChevronDown size={12} className="text-slate-400" />
              </div>
            </form>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
              {newsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="animate-spin text-slate-200" size={24} />
                </div>
              ) : (
                articles.map((article, idx) => (
                  <NewsRow key={idx} article={article} index={idx + 1} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Speed Trend Column */}
        <div className="lg:col-span-4">
           <div className="sticky top-8">
             <SpeedChart history={history} />
           </div>
        </div>
      </div>

      <ChatBotButton />
    </div>
  );
};

export default UnifiedDashboard;
