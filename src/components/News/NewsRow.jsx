import React from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

const NewsRow = ({ article, index }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <div className="flex items-center p-3 bg-[#fdfcfb] border border-slate-200 rounded-xl hover:border-slate-400 transition-all group">
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative w-12 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 shadow-inner">
          <img src={article.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 w-4 h-4 bg-rose-500 text-white text-[8px] font-black flex items-center justify-center rounded-br-lg shadow-sm">
            {index}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest truncate max-w-[120px]">
              {article.source.name}
            </span>
            <span className="text-[9px] font-bold text-slate-400">
              {formattedDate}
            </span>
          </div>
          <h4 className="text-[11px] font-bold text-slate-900 truncate mt-0.5">
            {article.title}
          </h4>
        </div>
      </div>

      <div className="flex items-center space-x-3 ml-4">
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-1.5 text-slate-300 hover:text-slate-900 transition-colors"
        >
          <ExternalLink size={14} />
        </a>
        <button className="p-1.5 bg-rose-50 text-rose-500 rounded-lg shadow-sm">
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
};

export default NewsRow;
