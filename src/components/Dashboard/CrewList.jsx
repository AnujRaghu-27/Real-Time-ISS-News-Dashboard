import React from 'react';
import { User, Rocket } from 'lucide-react';

const CrewList = ({ astronauts }) => {
  return (
    <div className="glass-card p-6 rounded-3xl h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Rocket className="mr-2 text-accent-cyan" size={20} />
          Current Crew
        </h3>
        <span className="px-3 py-1 rounded-full bg-accent-indigo/20 text-accent-indigo text-xs font-bold">
          {astronauts.length} Active
        </span>
      </div>

      <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
        {astronauts.map((person, idx) => (
          <div 
            key={idx}
            className="flex items-center p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4 group-hover:bg-accent-indigo/20 transition-colors">
              <User size={20} className="text-slate-400 group-hover:text-accent-cyan" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">{person.name}</p>
              <p className="text-xs text-slate-500 uppercase tracking-tighter">{person.craft}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrewList;
