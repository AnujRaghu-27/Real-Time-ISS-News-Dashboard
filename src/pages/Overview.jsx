import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';
import DashboardLayout from '../components/Layout/DashboardLayout';
import OverviewGrid from '../components/Dashboard/OverviewGrid';
import { useISSTracker } from '../hooks/useISSTracker';
import { useNews } from '../hooks/useNews';
import { Loader2 } from 'lucide-react';

const COLORS = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'];

const Overview = () => {
  const { history, loading: issLoading } = useISSTracker();
  const { articles, loading: newsLoading } = useNews('space');

  const performanceData = history?.map((p, i) => ({
    time: new Date(p.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    speed: Math.round(p.speed),
    altitude: parseFloat(p.altitude?.toFixed(1) || 408.5)
  })) || [];

  // Group news by source for distribution chart
  const sourceGroups = articles?.reduce((acc, art) => {
    const source = art.source.name;
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {}) || {};

  const distributionData = Object.entries(sourceGroups).map(([name, value]) => ({
    name,
    value
  })).slice(0, 5);

  if (issLoading && history.length === 0) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="animate-spin text-slate-400 mb-4" size={32} />
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Initializing Uplink...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">SYSTEM OVERVIEW</h2>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Mission Status • Key Performance Indicators</p>
        </div>

        <OverviewGrid />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Performance Chart */}
          <div className="lg:col-span-8 glass-card p-5 rounded-xl flex flex-col h-[350px]">
            <div className="mb-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Velocity & Altitude Trend</h3>
              <p className="text-xs text-slate-500 mt-1">Telemetry stream analysis from Ground Station Alpha.</p>
            </div>
            
            <div className="flex-1">
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    hide 
                  />
                  <YAxis 
                    hide 
                    yId="left"
                    domain={['dataMin - 100', 'dataMax + 100']}
                  />
                  <YAxis 
                    hide 
                    yId="right"
                    orientation="right"
                    domain={['dataMin - 2', 'dataMax + 2']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}
                  />
                  <Line 
                    yId="left"
                    type="monotone" 
                    dataKey="speed" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    dot={false}
                    animationDuration={1500}
                  />
                  <Line 
                    yId="right"
                    type="monotone" 
                    dataKey="altitude" 
                    stroke="#7c3aed" 
                    strokeWidth={3} 
                    dot={false}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center space-x-6 mt-4 pt-4 border-t border-slate-50">
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Velocity</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-violet-600" />
                  <span className="text-[9px] font-bold text-slate-400 uppercase">Altitude</span>
               </div>
            </div>
          </div>

          {/* Source Distribution Chart */}
          <div className="lg:col-span-4 glass-card p-5 rounded-xl flex flex-col h-[350px]">
            <div className="mb-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Media Distribution</h3>
              <p className="text-xs text-slate-500 mt-1">Source breakdown for active news streams.</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-50">
              {distributionData.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-[8px] font-bold text-slate-400 uppercase truncate max-w-[80px]">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Overview;
