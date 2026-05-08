import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SpeedChart = ({ history = [] }) => {
  // Memoize the data formatting to prevent unnecessary re-calculations
  const data = useMemo(() => {
    return history?.map((point) => ({
      // Use a stable timestamp key for the X-axis
      timestamp: point.timestamp,
      time: new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      speed: parseFloat(point.speed?.toFixed(2) || 27600),
    })) || [];
  }, [history]);

  return (
    <div className="glass-card p-6 rounded-2xl bg-white border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2 bg-rose-50 border border-rose-100 px-3 py-1 rounded-lg">
          <div className="w-4 h-2 bg-rose-500 rounded-sm" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Live Velocity Telemetry</span>
        </div>
      </div>
      
      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="1 1" vertical={true} stroke="#f1f5f9" />
            <XAxis 
              dataKey="time" 
              fontSize={8} 
              tick={{ fill: '#94a3b8' }} 
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={30}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis 
              fontSize={8} 
              tick={{ fill: '#94a3b8' }} 
              axisLine={false}
              tickLine={false}
              domain={['auto', 'auto']} // Smoother auto-scaling
              allowDecimals={true}
              tickFormatter={(val) => val.toLocaleString()}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '9px',
                fontWeight: 'bold'
              }}
              labelStyle={{ color: '#64748b', marginBottom: '4px' }}
              isAnimationActive={false} // Prevents tooltip jumpiness
            />
            <Area 
              type="monotone" 
              dataKey="speed" 
              stroke="#ef4444" 
              strokeWidth={2}
              fillOpacity={0.05} 
              fill="#ef4444" 
              isAnimationActive={true}
              animationDuration={800} // Smooth duration
              animationEasing="ease-in-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders of the entire chart
export default React.memo(SpeedChart);
