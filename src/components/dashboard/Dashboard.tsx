
import React, { useEffect, useState } from 'react';
import InvestmentCard from '../common/InvestmentCard';
import ChartComponent from '../common/ChartComponent';
import { Wallet, TrendingUp, DollarSign, Activity, CreditCard, PiggyBank, Calendar } from 'lucide-react';
import { formatToRupees } from '@/lib/utils';

// Mock data - changed to INR (₹) values (roughly 83 times USD for conversion)
const portfolioData = [
  { name: 'Jan', value: 2000000 },
  { name: 'Feb', value: 2150000 },
  { name: 'Mar', value: 2075000 },
  { name: 'Apr', value: 2240000 },
  { name: 'May', value: 2400000 },
  { name: 'Jun', value: 2650000 },
  { name: 'Jul', value: 2900000 },
  { name: 'Aug', value: 2820000 },
  { name: 'Sep', value: 3070000 },
];

// Changed from const to let to make it clear this is mutable data
// Updated values to INR (multiplied by approx 83)
const investmentsMock = [
  { name: 'Reliance Industries', symbol: 'RELIANCE.NS', value: 441600, change: 10022, changePercentage: 2.32, type: 'stock' },
  { name: 'Tata Motors', symbol: 'TATAMOTORS.NS', value: 355265, change: -7105, changePercentage: -1.96, type: 'stock' },
  { name: 'Bitcoin', symbol: 'BTC', value: 302965, change: 20360, changePercentage: 7.20, type: 'crypto' },
  { name: 'NIFTY 50 ETF', symbol: 'NIFTYBEES.NS', value: 726325, change: 3752, changePercentage: 0.52, type: 'etf' },
  { name: 'Govt Securities', symbol: 'GSEC', value: 259408, change: 1021, changePercentage: 0.40, type: 'bond' },
  { name: 'Infosys', symbol: 'INFY.NS', value: 517986, change: 7092, changePercentage: 1.39, type: 'stock' },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const [investments, setInvestments] = useState<any[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      // Create a mutable copy of the investments array
      setInvestments([...investmentsMock]);
      
      const total = investmentsMock.reduce((sum, item) => sum + item.value, 0);
      setTotalValue(total);
      
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const calculatePercentageChange = () => {
    const totalChange = investments.reduce((sum, item) => sum + item.change, 0);
    const previousTotal = totalValue - totalChange;
    return (totalChange / previousTotal) * 100;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <Wallet size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Portfolio Value</h3>
              <div className="text-2xl font-semibold">
                {loading ? (
                  <div className="animate-pulse h-8 w-40 bg-gray-200 rounded"></div>
                ) : (
                  formatToRupees(totalValue)
                )}
              </div>
            </div>
            {!loading && (
              <div className="ml-auto">
                <div className={`flex items-center ${calculatePercentageChange() >= 0 ? 'text-green-500' : 'text-red-500'} text-sm font-medium`}>
                  {calculatePercentageChange() >= 0 ? (
                    <TrendingUp size={18} className="mr-1" />
                  ) : (
                    <TrendingUp size={18} className="mr-1" />
                  )}
                  {calculatePercentageChange() >= 0 ? '+' : ''}{calculatePercentageChange().toFixed(2)}%
                </div>
                <p className="text-xs text-gray-500">This month</p>
              </div>
            )}
          </div>
          
          <div className="h-72">
            {loading ? (
              <div className="animate-pulse h-full w-full bg-gray-100 rounded-lg"></div>
            ) : (
              <ChartComponent
                data={portfolioData}
                type="area"
                dataKey="value"
                height={280}
                colors={['#0088FE']}
              />
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-4">
              <DollarSign size={20} />
            </div>
            <h3 className="text-sm font-medium text-gray-500">Stocks</h3>
            <div className="text-2xl font-semibold mt-1">
              {loading ? (
                <div className="animate-pulse h-8 w-28 bg-gray-200 rounded mt-1"></div>
              ) : (
                formatToRupees(investments
                  .filter(i => i.type === 'stock')
                  .reduce((sum, i) => sum + i.value, 0))
              )}
            </div>
            {!loading && (
              <div className="text-green-500 text-sm font-medium mt-1">
                +5.2%
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
              <Activity size={20} />
            </div>
            <h3 className="text-sm font-medium text-gray-500">Crypto</h3>
            <div className="text-2xl font-semibold mt-1">
              {loading ? (
                <div className="animate-pulse h-8 w-28 bg-gray-200 rounded mt-1"></div>
              ) : (
                formatToRupees(investments
                  .filter(i => i.type === 'crypto')
                  .reduce((sum, i) => sum + i.value, 0))
              )}
            </div>
            {!loading && (
              <div className="text-purple-500 text-sm font-medium mt-1">
                +12.8%
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <CreditCard size={20} />
            </div>
            <h3 className="text-sm font-medium text-gray-500">ETFs</h3>
            <div className="text-2xl font-semibold mt-1">
              {loading ? (
                <div className="animate-pulse h-8 w-28 bg-gray-200 rounded mt-1"></div>
              ) : (
                formatToRupees(investments
                  .filter(i => i.type === 'etf')
                  .reduce((sum, i) => sum + i.value, 0))
              )}
            </div>
            {!loading && (
              <div className="text-blue-500 text-sm font-medium mt-1">
                +2.1%
              </div>
            )}
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
              <PiggyBank size={20} />
            </div>
            <h3 className="text-sm font-medium text-gray-500">Bonds</h3>
            <div className="text-2xl font-semibold mt-1">
              {loading ? (
                <div className="animate-pulse h-8 w-28 bg-gray-200 rounded mt-1"></div>
              ) : (
                formatToRupees(investments
                  .filter(i => i.type === 'bond')
                  .reduce((sum, i) => sum + i.value, 0))
              )}
            </div>
            {!loading && (
              <div className="text-amber-500 text-sm font-medium mt-1">
                +0.8%
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Investment Portfolio</h2>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
              Add Investment
            </button>
            <a href="/reports" className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
              <Calendar size={16} className="mr-2" />
              Monthly Report
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(6).fill(0).map((_, index) => (
              <div key={index} className="animate-pulse bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-64"></div>
            ))
          ) : (
            investments.map((investment, index) => (
              <InvestmentCard
                key={index}
                name={investment.name}
                symbol={investment.symbol}
                value={investment.value}
                change={investment.change}
                changePercentage={investment.changePercentage}
                type={investment.type}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
