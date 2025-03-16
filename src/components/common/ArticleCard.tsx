
import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface ArticleCardProps {
  title: string;
  summary: string;
  date: string;
  readTime: string;
  imageUrl?: string;
  source: string;
  category: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  summary,
  date,
  readTime,
  imageUrl,
  source,
  category,
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all animate-hover">
      {imageUrl && (
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center mb-3 space-x-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {category}
          </span>
          <span className="text-xs text-gray-500">{source}</span>
        </div>
        
        <h3 className="font-semibold text-lg line-clamp-2 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{summary}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
