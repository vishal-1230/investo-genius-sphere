
import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { formatToRupees } from '@/lib/utils';

interface InvestmentCardProps {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercentage: number;
  type: 'stock' | 'crypto' | 'etf' | 'bond';
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  name,
  symbol,
  value,
  change,
  changePercentage,
  type,
}) => {
  const isPositive = change >= 0;
  
  const getTypeColor = () => {
    switch (type) {
      case 'stock':
        return 'bg-blue-100 text-blue-800';
      case 'crypto':
        return 'bg-purple-100 text-purple-800';
      case 'etf':
        return 'bg-green-100 text-green-800';
      case 'bond':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 animate-hover">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center">
            <span className="font-semibold text-lg">{name}</span>
            <span className={`ml-2 text-xs ${getTypeColor()} rounded-full px-2 py-0.5`}>
              {type.toUpperCase()}
            </span>
          </div>
          <span className="text-sm text-gray-500">{symbol}</span>
        </div>
        <div className="bg-gray-100 rounded-full p-2">
          <DollarSign size={18} className="text-gray-600" />
        </div>
      </div>
      
      <div className="mt-3">
        <div className="text-2xl font-semibold">{formatToRupees(value)}</div>
        <div className="flex items-center mt-1">
          {isPositive ? (
            <TrendingUp size={16} className="text-green-500 mr-1" />
          ) : (
            <TrendingDown size={16} className="text-red-500 mr-1" />
          )}
          <span className={`${isPositive ? 'text-green-500' : 'text-red-500'} font-medium`}>
            {isPositive ? '+' : ''}{formatToRupees(change)} ({isPositive ? '+' : ''}{changePercentage.toFixed(2)}%)
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default InvestmentCard;
