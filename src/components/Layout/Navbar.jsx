import React from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 h-16 glass-navbar z-30 flex items-center justify-between px-8">
      <div className="flex items-center space-x-4 lg:hidden">
        <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
          <Menu size={20} />
        </button>
        <span className="text-lg font-black text-slate-900">CONTROL</span>
      </div>

      <div className="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 w-72 group focus-within:border-slate-300 transition-all">
        <Search size={16} className="text-slate-400 group-focus-within:text-slate-600" />
        <input 
          type="text" 
          placeholder="Quick search..." 
          className="bg-transparent border-none focus:ring-0 text-xs ml-2 w-full text-slate-800 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-900 transition-all">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white" />
        </button>
        
        <div className="flex items-center space-x-3 pl-4 border-l border-slate-100">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-900 leading-none">Cmdr. Shepard</p>
            <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">Expedition 71</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-slate-400 transition-all">
             <User size={16} className="text-slate-600" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
