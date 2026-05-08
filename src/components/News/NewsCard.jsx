import React from 'react';
import { ExternalLink, Calendar, Globe } from 'lucide-react';

const NewsCard = ({ article }) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col group hover:bg-slate-900/80 transition-colors duration-300">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-accent-cyan uppercase tracking-wider">
            {article.source.name}
          </span>
          <span className="text-slate-500 text-[10px] font-medium uppercase">
            {formattedDate}
          </span>
        </div>

        <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-slate-400 text-xs line-clamp-2 mb-4 flex-1">
          {article.description}
        </p>

        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-accent-indigo/10 text-accent-indigo text-xs font-bold hover:bg-accent-indigo hover:text-white transition-all"
        >
          <span>Read More</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
