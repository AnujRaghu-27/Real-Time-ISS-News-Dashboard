import React from 'react';
import { Home, Map, Activity, Settings, Users, Database, BarChart3,Newspaper } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: BarChart3, label: 'Overview', path: '/overview' },
    { icon: Home, label: 'ISS Tracker', path: '/dashboard' },
    { icon: Newspaper, label: 'Global News', path: '/news' },
    { icon: Activity, label: 'Telemetry', path: '#' },
    { icon: Users, label: 'Crew', path: '#' },
    { icon: Database, label: 'Archives', path: '#' },
    { icon: Settings, label: 'Settings', path: '#' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-sidebar z-40 hidden lg:flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-black text-slate-900 flex items-center space-x-2">
          <div className="w-6 h-6 bg-slate-900 rounded-lg flex items-center justify-center">
             <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
          <span>CONTROL</span>
        </h1>
      </div>
      
      <nav className="flex-1 px-3 py-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon size={18} className={`${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="font-semibold text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="glass-card p-4 rounded-2xl border-accent-indigo/20 bg-accent-indigo/5">
          <p className="text-xs text-slate-400 mb-2 uppercase tracking-widest font-semibold">Mission Status</p>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-slate-200">Orbital Nominal</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
