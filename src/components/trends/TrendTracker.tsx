
import React, { useState, useEffect } from 'react';
import ChartComponent from '../common/ChartComponent';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  BarChart, 
  Calendar,
  AlertCircle,
  Brain
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const trendData = {
  nifty50: {
    daily: [
      { name: 'Apr 01', value: 22100 },
      { name: 'Apr 02', value: 22250 },
      { name: 'Apr 03', value: 22400 },
      { name: 'Apr 04', value: 22300 },
      { name: 'Apr 05', value: 22500 },
      { name: 'Apr 06', value: 22650 },
      { name: 'Apr 07', value: 22800 },
      { name: 'Apr 08', value: 22950 },
      { name: 'Apr 09', value: 23100 },
      { name: 'Apr 10', value: 23000 },
      { name: 'Apr 11', value: 23200 },
      { name: 'Apr 12', value: 23300 },
      { name: 'Apr 13', value: 23400 },
      { name: 'Apr 14', value: 23600 },
    ],
    weekly: [
      { name: 'Week 1', value: 22000 },
      { name: 'Week 2', value: 22500 },
      { name: 'Week 3', value: 23000 },
      { name: 'Week 4', value: 22800 },
      { name: 'Week 5', value: 23200 },
      { name: 'Week 6', value: 23400 },
      { name: 'Week 7', value: 23600 },
      { name: 'Week 8', value: 24000 },
    ],
    monthly: [
      { name: 'Jan', value: 20000 },
      { name: 'Feb', value: 20800 },
      { name: 'Mar', value: 21500 },
      { name: 'Apr', value: 22000 },
      { name: 'May', value: 22800 },
      { name: 'Jun', value: 23500 },
      { name: 'Jul', value: 23800 },
      { name: 'Aug', value: 24200 },
      { name: 'Sep', value: 24500 },
      { name: 'Oct', value: 25000 },
      { name: 'Nov', value: 24800 },
      { name: 'Dec', value: 25200 },
    ],
  },
  sensex: {
    daily: [
      { name: 'Apr 01', value: 72500 },
      { name: 'Apr 02', value: 72800 },
      { name: 'Apr 03', value: 73200 },
      { name: 'Apr 04', value: 73000 },
      { name: 'Apr 05', value: 73500 },
      { name: 'Apr 06', value: 73800 },
      { name: 'Apr 07', value: 74200 },
      { name: 'Apr 08', value: 74500 },
      { name: 'Apr 09', value: 74800 },
      { name: 'Apr 10', value: 74600 },
      { name: 'Apr 11', value: 75000 },
      { name: 'Apr 12', value: 75500 },
      { name: 'Apr 13', value: 75800 },
      { name: 'Apr 14', value: 76200 },
    ],
    weekly: [
      { name: 'Week 1', value: 72000 },
      { name: 'Week 2', value: 73000 },
      { name: 'Week 3', value: 74000 },
      { name: 'Week 4', value: 73800 },
      { name: 'Week 5', value: 74500 },
      { name: 'Week 6', value: 75000 },
      { name: 'Week 7', value: 76000 },
      { name: 'Week 8', value: 77000 },
    ],
    monthly: [
      { name: 'Jan', value: 68000 },
      { name: 'Feb', value: 69500 },
      { name: 'Mar', value: 71000 },
      { name: 'Apr', value: 72000 },
      { name: 'May', value: 73500 },
      { name: 'Jun', value: 74800 },
      { name: 'Jul', value: 76000 },
      { name: 'Aug', value: 77500 },
      { name: 'Sep', value: 78000 },
      { name: 'Oct', value: 79500 },
      { name: 'Nov', value: 79000 },
      { name: 'Dec', value: 80000 },
    ],
  },
  futures: {
    daily: [
      { name: 'Apr 01', value: 22150 },
      { name: 'Apr 02', value: 22300 },
      { name: 'Apr 03', value: 22450 },
      { name: 'Apr 04', value: 22350 },
      { name: 'Apr 05', value: 22550 },
      { name: 'Apr 06', value: 22700 },
      { name: 'Apr 07', value: 22850 },
      { name: 'Apr 08', value: 23000 },
      { name: 'Apr 09', value: 23150 },
      { name: 'Apr 10', value: 23050 },
      { name: 'Apr 11', value: 23250 },
      { name: 'Apr 12', value: 23350 },
      { name: 'Apr 13', value: 23450 },
      { name: 'Apr 14', value: 23650 },
    ],
    weekly: [
      { name: 'Week 1', value: 22050 },
      { name: 'Week 2', value: 22550 },
      { name: 'Week 3', value: 23050 },
      { name: 'Week 4', value: 22850 },
      { name: 'Week 5', value: 23250 },
      { name: 'Week 6', value: 23450 },
      { name: 'Week 7', value: 23650 },
      { name: 'Week 8', value: 24050 },
    ],
    monthly: [
      { name: 'Jan', value: 20050 },
      { name: 'Feb', value: 20850 },
      { name: 'Mar', value: 21550 },
      { name: 'Apr', value: 22050 },
      { name: 'May', value: 22850 },
      { name: 'Jun', value: 23550 },
      { name: 'Jul', value: 23850 },
      { name: 'Aug', value: 24250 },
      { name: 'Sep', value: 24550 },
      { name: 'Oct', value: 25050 },
      { name: 'Nov', value: 24850 },
      { name: 'Dec', value: 25250 },
    ],
  },
  options: {
    daily: [
      { name: 'Apr 01', value: 3200 },
      { name: 'Apr 02', value: 3350 },
      { name: 'Apr 03', value: 3500 },
      { name: 'Apr 04', value: 3400 },
      { name: 'Apr 05', value: 3600 },
      { name: 'Apr 06', value: 3750 },
      { name: 'Apr 07', value: 3900 },
      { name: 'Apr 08', value: 4050 },
      { name: 'Apr 09', value: 4200 },
      { name: 'Apr 10', value: 4100 },
      { name: 'Apr 11', value: 4300 },
      { name: 'Apr 12', value: 4450 },
      { name: 'Apr 13', value: 4600 },
      { name: 'Apr 14', value: 4750 },
    ],
    weekly: [
      { name: 'Week 1', value: 3100 },
      { name: 'Week 2', value: 3400 },
      { name: 'Week 3', value: 3700 },
      { name: 'Week 4', value: 3900 },
      { name: 'Week 5', value: 4200 },
      { name: 'Week 6', value: 4500 },
      { name: 'Week 7', value: 4800 },
      { name: 'Week 8', value: 5100 },
    ],
    monthly: [
      { name: 'Jan', value: 2000 },
      { name: 'Feb', value: 2300 },
      { name: 'Mar', value: 2600 },
      { name: 'Apr', value: 2900 },
      { name: 'May', value: 3200 },
      { name: 'Jun', value: 3500 },
      { name: 'Jul', value: 3800 },
      { name: 'Aug', value: 4100 },
      { name: 'Sep', value: 4400 },
      { name: 'Oct', value: 4700 },
      { name: 'Nov', value: 5000 },
      { name: 'Dec', value: 5300 },
    ],
  }
};

// AI predictions for each market
const aiPredictions = {
  nifty50: "Based on current momentum and technical indicators, Nifty 50 is showing a bullish trend in the short term. Several factors suggest continued growth: strong earnings reports from key constituents, favorable monetary policy, and increased foreign institutional investments. Target range for next month is 24,200-24,800. Key risk factors include global economic slowdown and potential rising inflation concerns.",
  sensex: "Sensex analysis indicates a consolidation phase after recent gains, with potential for modest growth. The index is trading above key moving averages, suggesting underlying strength. Banking and IT sectors are expected to be primary drivers. Expect a trading range of 77,500-81,000 over the next 30 days. Monitor quarterly results closely as they could trigger significant movements.",
  futures: "Nifty futures are trading at a premium, indicating positive market sentiment. Open interest has increased alongside price, confirming the strength of the uptrend. The current technical setup suggests a target of 24,500 in the near term, with support at 23,200. Advise maintaining bullish positions with appropriate stop losses at 22,800.",
  options: "Options data shows significant call writing at 24,000 and 24,500 strikes, suggesting these levels may act as resistance. Put-Call ratio is currently at 1.3, indicating moderately bullish sentiment. Implied volatility has decreased, suggesting market participants expect stable movement. Consider iron condor strategies to benefit from potential range-bound movement."
};

const marketInsights = [
  {
    title: 'Tech Sector Outperforms',
    description: 'Technology stocks continue to lead market gains with strong Q2 earnings reports.',
    trend: 'positive',
    percentage: '+3.8%',
    source: 'Market Analysis',
  },
  {
    title: 'Bond Yields Falling',
    description: 'Government bond yields decrease as inflation concerns ease, boosting bond prices.',
    trend: 'negative',
    percentage: '-0.5%',
    source: 'Bond Market Report',
  },
  {
    title: 'Energy Sector Volatility',
    description: 'Energy stocks showing increased volatility due to geopolitical tensions and supply constraints.',
    trend: 'neutral',
    percentage: '±2.1%',
    source: 'Sector Analysis',
  },
  {
    title: 'Consumer Spending Up',
    description: 'Retail sales data shows increased consumer spending, boosting consumer discretionary stocks.',
    trend: 'positive',
    percentage: '+2.3%',
    source: 'Economic Indicators',
  },
];

const TrendTracker = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [market, setMarket] = useState<'nifty50' | 'sensex' | 'futures' | 'options'>('nifty50');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInsights, setFilteredInsights] = useState(marketInsights);
  const [aiPrediction, setAiPrediction] = useState('');
  
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(trendData[market][timeframe]);
      setAiPrediction(aiPredictions[market]);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeframe, market]);
  
  useEffect(() => {
    setFilteredInsights(
      marketInsights.filter(insight => 
        insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        insight.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Market Trend Analysis</h2>
            <p className="text-gray-500">AI-powered insights into market movements</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Tabs value={market} onValueChange={(value) => setMarket(value as any)} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="nifty50">NIFTY 50</TabsTrigger>
                <TabsTrigger value="sensex">SENSEX</TabsTrigger>
                <TabsTrigger value="futures">Futures</TabsTrigger>
                <TabsTrigger value="options">Options</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center mt-2 sm:mt-0 space-x-2">
              <button 
                onClick={() => setTimeframe('daily')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === 'daily' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Daily
              </button>
              <button 
                onClick={() => setTimeframe('weekly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === 'weekly' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Weekly
              </button>
              <button 
                onClick={() => setTimeframe('monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === 'monthly' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
        
        <div className="h-96">
          {loading ? (
            <div className="animate-pulse h-full w-full bg-gray-100 rounded-lg"></div>
          ) : (
            <ChartComponent
              data={data}
              type="line"
              dataKey="value"
              xAxisKey="name"
              height={380}
              colors={['#3b82f6']}
            />
          )}
        </div>

        {/* AI Prediction Section */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Brain size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-blue-800">AI Market Prediction</h3>
              <p className="text-gray-700 mt-2">{aiPrediction}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 animate-fade-in">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h3 className="text-xl font-semibold">Market Insights</h3>
              
              <div className="flex items-center mt-4 sm:mt-0 space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search insights..."
                    className="pr-10 pl-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                  <Filter size={18} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredInsights.map((insight, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all cursor-pointer animate-slide-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                    </div>
                    <div className={`flex items-center space-x-1 ${
                      insight.trend === 'positive' 
                        ? 'text-green-600' 
                        : insight.trend === 'negative' 
                          ? 'text-red-600' 
                          : 'text-amber-600'
                    }`}>
                      {insight.trend === 'positive' ? (
                        <TrendingUp size={16} />
                      ) : insight.trend === 'negative' ? (
                        <TrendingDown size={16} />
                      ) : (
                        <AlertCircle size={16} />
                      )}
                      <span className="font-medium">{insight.percentage}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-500">{insight.source}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 transition-colors">
                      More details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in">
          <div className="flex items-center mb-4">
            <BarChart size={20} className="text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Sector Performance</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Technology</span>
                <span className="text-green-600 font-medium">+2.8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Healthcare</span>
                <span className="text-green-600 font-medium">+1.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Finance</span>
                <span className="text-red-600 font-medium">-0.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Energy</span>
                <span className="text-green-600 font-medium">+0.9%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Consumer</span>
                <span className="text-green-600 font-medium">+1.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar size={14} className="mr-1" />
              <span>Last updated: Today, 4:30 PM</span>
            </div>
            
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
              View all sectors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendTracker;
