
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatToRupees } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, TrendingUp, BarChart, PieChart, BadgeIndianRupee, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChartComponent from '@/components/common/ChartComponent';

// Monthly report data for last 3 months
const monthlyReportData = [
  {
    month: 'July 2023',
    investments: {
      stocks: 1400000,
      mutualFunds: 850000,
      gold: 350000,
      fixedDeposits: 500000,
    },
    expenses: {
      housing: 45000,
      transportation: 15000,
      food: 25000,
      utilities: 8000,
      entertainment: 12000,
      other: 20000,
    },
    savings: 125000,
  },
  {
    month: 'August 2023',
    investments: {
      stocks: 1450000,
      mutualFunds: 870000,
      gold: 350000,
      fixedDeposits: 500000,
    },
    expenses: {
      housing: 45000,
      transportation: 12000,
      food: 28000,
      utilities: 8500,
      entertainment: 10000,
      other: 18000,
    },
    savings: 130000,
  },
  {
    month: 'September 2023',
    investments: {
      stocks: 1520000,
      mutualFunds: 900000,
      gold: 350000,
      fixedDeposits: 500000,
    },
    expenses: {
      housing: 45000,
      transportation: 13000,
      food: 26000,
      utilities: 9000,
      entertainment: 11000,
      other: 19000,
    },
    savings: 135000,
  },
];

// Monthly expense data for chart
const expenseChartData = [
  {
    name: 'Jul',
    Housing: 45000,
    Transportation: 15000,
    Food: 25000,
    Utilities: 8000,
    Entertainment: 12000,
    Other: 20000,
  },
  {
    name: 'Aug',
    Housing: 45000,
    Transportation: 12000,
    Food: 28000,
    Utilities: 8500,
    Entertainment: 10000,
    Other: 18000,
  },
  {
    name: 'Sep',
    Housing: 45000,
    Transportation: 13000,
    Food: 26000,
    Utilities: 9000,
    Entertainment: 11000,
    Other: 19000,
  },
];

const MonthlyReport = () => {
  const [activeMonth, setActiveMonth] = useState(2); // Default to latest month (September)
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  // Expense categories for the pie chart
  const expenseCategories = [
    { name: 'Housing', value: monthlyReportData[activeMonth]?.expenses.housing || 0, color: '#0088FE' },
    { name: 'Transportation', value: monthlyReportData[activeMonth]?.expenses.transportation || 0, color: '#00C49F' },
    { name: 'Food', value: monthlyReportData[activeMonth]?.expenses.food || 0, color: '#FFBB28' },
    { name: 'Utilities', value: monthlyReportData[activeMonth]?.expenses.utilities || 0, color: '#FF8042' },
    { name: 'Entertainment', value: monthlyReportData[activeMonth]?.expenses.entertainment || 0, color: '#FF5733' },
    { name: 'Other', value: monthlyReportData[activeMonth]?.expenses.other || 0, color: '#8884d8' },
  ];

  // Investment categories for the pie chart
  const investmentCategories = [
    { name: 'Stocks', value: monthlyReportData[activeMonth]?.investments.stocks || 0, color: '#0088FE' },
    { name: 'Mutual Funds', value: monthlyReportData[activeMonth]?.investments.mutualFunds || 0, color: '#00C49F' },
    { name: 'Gold', value: monthlyReportData[activeMonth]?.investments.gold || 0, color: '#FFBB28' },
    { name: 'Fixed Deposits', value: monthlyReportData[activeMonth]?.investments.fixedDeposits || 0, color: '#FF8042' },
  ];

  const totalExpenses = Object.values(monthlyReportData[activeMonth]?.expenses || {}).reduce((a, b) => a + b, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Monthly Financial Report</h1>
            <p className="text-gray-600">Track your finances month-by-month</p>
          </div>
          
          <div className="flex space-x-2">
            {monthlyReportData.map((data, index) => (
              <button
                key={index}
                className={`px-3 py-1 text-sm rounded-lg ${activeMonth === index ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-700'}`}
                onClick={() => setActiveMonth(index)}
              >
                {data.month}
              </button>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl font-bold">Monthly Overview</CardTitle>
              <CardDescription>
                Summary for {monthlyReportData[activeMonth]?.month}
              </CardDescription>
            </div>
            <Calendar className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-2 bg-green-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Investments</p>
                    <h3 className="text-xl font-bold">
                      {formatToRupees(Object.values(monthlyReportData[activeMonth]?.investments || {}).reduce((a, b) => a + b, 0))}
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-2 bg-red-100 p-2 rounded-full">
                    <BarChart className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                    <h3 className="text-xl font-bold">
                      {formatToRupees(totalExpenses)}
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-2 bg-blue-100 p-2 rounded-full">
                    <BadgeIndianRupee className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Monthly Savings</p>
                    <h3 className="text-xl font-bold">
                      {formatToRupees(monthlyReportData[activeMonth]?.savings || 0)}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Breakdown</CardTitle>
              <CardDescription>
                {monthlyReportData[activeMonth]?.month} investments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investmentCategories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-2" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span>{category.name}</span>
                        <span className="font-medium">{formatToRupees(category.value)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            width: `${(category.value / Object.values(monthlyReportData[activeMonth]?.investments).reduce((a, b) => a + b, 0)) * 100}%`,
                            backgroundColor: category.color
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="font-medium">Total Investments:</span>
                    <span className="font-bold">
                      {formatToRupees(Object.values(monthlyReportData[activeMonth]?.investments).reduce((a, b) => a + b, 0))}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Feature - Expense Breakdown */}
          <Card>
            <CardHeader className="relative">
              <div className="absolute right-6 top-6">
                <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                  <Lock size={12} className="mr-1" />
                  Premium
                </div>
              </div>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>
                Detailed analysis of your monthly expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="relative overflow-hidden">
              <div className="filter blur-sm pointer-events-none">
                <div className="space-y-4">
                  {expenseCategories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span>{category.name}</span>
                          <span className="font-medium">{formatToRupees(category.value)}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full" 
                            style={{ 
                              width: `${(category.value / totalExpenses) * 100}%`,
                              backgroundColor: category.color
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Expenses:</span>
                      <span className="font-bold">
                        {formatToRupees(totalExpenses)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Premium Upgrade Overlay */}
              <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center p-6 text-center">
                <Lock size={32} className="text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
                <p className="text-gray-600 mb-4">Unlock detailed expense tracking and analysis with AlgoWealth Premium</p>
                <Button onClick={() => setShowPremiumModal(true)}>
                  Upgrade to Premium
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Expense Trends - Premium Feature */}
        <Card>
          <CardHeader className="relative">
            <div className="absolute right-6 top-6">
              <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium flex items-center">
                <Lock size={12} className="mr-1" />
                Premium
              </div>
            </div>
            <CardTitle>Expense Trends</CardTitle>
            <CardDescription>
              Track how your expenses change month to month
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 relative">
            <div className="filter blur-sm pointer-events-none">
              <ChartComponent
                data={expenseChartData}
                type="bar"
                dataKey="value"
                height={300}
                colors={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733', '#8884d8']}
                stacked
              />
            </div>
            
            {/* Premium Upgrade Overlay */}
            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center p-6 text-center">
              <PieChart size={32} className="text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold mb-2">Premium Feature</h3>
              <p className="text-gray-600 mb-4">Get detailed expense trends and insights with AlgoWealth Premium</p>
              <Button onClick={() => setShowPremiumModal(true)}>
                Upgrade to Premium
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Premium Feature Modal */}
        {showPremiumModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Upgrade to AlgoWealth Premium</h3>
              <p className="text-gray-600 mb-6">
                Get access to advanced financial tools and insights with our premium subscription:
              </p>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                    <TrendingUp size={14} className="text-green-600" />
                  </div>
                  <span>Detailed expense tracking and categorization</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                    <TrendingUp size={14} className="text-green-600" />
                  </div>
                  <span>Advanced investment portfolio analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                    <TrendingUp size={14} className="text-green-600" />
                  </div>
                  <span>Personalized financial recommendations</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-2 mt-0.5">
                    <TrendingUp size={14} className="text-green-600" />
                  </div>
                  <span>Tax optimization strategies</span>
                </li>
              </ul>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Monthly Plan</span>
                  <span className="font-bold">₹999/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Annual Plan</span>
                  <div className="text-right">
                    <span className="font-bold">₹9,999/year</span>
                    <span className="block text-sm text-green-600">(Save 16%)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="w-full">Subscribe Now</Button>
                <Button variant="outline" className="flex-none" onClick={() => setShowPremiumModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MonthlyReport;
