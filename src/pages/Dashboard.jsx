import React from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import StatCard from '../components/Dashboard/StatCard';
import ISSTrackerMap from '../components/Dashboard/ISSTrackerMap';
import CrewList from '../components/Dashboard/CrewList';
import SpeedChart from '../components/Dashboard/SpeedChart';
import AnalyticsPanel from '../components/Dashboard/AnalyticsPanel';
import { useISSTracker } from '../hooks/useISSTracker';
import { Navigation, Globe, Zap, RefreshCw, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { position, history, astronauts, locationName, speed, loading, error, refresh } = useISSTracker();

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <AlertCircle size={32} className="text-rose-500 mb-3" />
          <h2 className="text-lg font-bold text-slate-900 mb-1">Connection Lost</h2>
          <p className="text-slate-400 text-sm max-w-xs mb-6">{error}</p>
          <button 
            onClick={refresh}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
          >
            RETRY SYNC
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">ORBITAL OVERVIEW</h2>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Ground Station Alpha • Live Feed</p>
          </div>
          <button 
            onClick={refresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50 group"
          >
            <RefreshCw size={14} className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} text-slate-600`} />
            <span className="font-bold text-[11px] text-slate-900">SYNC TELEMETRY</span>
          </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Coordinates" 
            value={position ? `${position.lat.toFixed(2)}, ${position.lon.toFixed(2)}` : '---'} 
            unit="Lat/Lon" 
            trend={2.4} 
            icon={Navigation} 
            color="bg-blue-500"
          />
          <StatCard 
            title="Ground Speed" 
            value={speed ? Math.round(speed).toLocaleString() : '27,600'} 
            unit="KM/H" 
            trend={0.5} 
            icon={Zap} 
            color="bg-violet-500"
          />
          <StatCard 
            title="Geographic Zone" 
            value={locationName.split(',')[0]} 
            unit={locationName.split(',')[1] || 'Planet Earth'} 
            trend={1.2} 
            icon={Globe} 
            color="bg-emerald-500"
          />
          <StatCard 
            title="Relay Points" 
            value={history.length} 
            unit="Active" 
            trend={100} 
            icon={RefreshCw} 
            color="bg-orange-500"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            <ISSTrackerMap position={position} history={history} />
            <AnalyticsPanel history={history} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <SpeedChart history={history} />
            <div className="flex-1">
              <CrewList astronauts={astronauts} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
