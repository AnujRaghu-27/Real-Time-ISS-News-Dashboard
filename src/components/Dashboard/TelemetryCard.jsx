import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const TelemetryCard = ({ title, value, unit, data, color }) => {
  return (
    <div className="glass-card p-4 rounded-xl flex flex-col justify-between hover:shadow-md transition-shadow">
      <div>
        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</h4>
        <div className="flex items-baseline space-x-1">
          <span className="text-lg font-bold text-slate-900">{value}</span>
          <span className="text-[8px] font-bold text-slate-400 uppercase">{unit}</span>
        </div>
      </div>
      
      <div className="h-10 mt-3">
        <ResponsiveContainer width="100%" height={40}>
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2} 
              dot={false}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TelemetryCard;
