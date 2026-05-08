import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, unit, trend, icon: Icon, color }) => {
  const isPositive = trend > 0;

  return (
    <div className="glass-card p-4 rounded-xl group transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className={`p-1.5 rounded-lg bg-slate-50 border border-slate-100`}>
          <Icon size={16} className="text-slate-500" />
        </div>
        <div className={`flex items-center space-x-0.5 text-[10px] font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          <span>{Math.abs(trend)}%</span>
        </div>
      </div>
      
      <div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">{title}</p>
        <div className="flex items-baseline space-x-1">
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{value}</h3>
          <span className="text-slate-400 text-[9px] font-bold uppercase">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
