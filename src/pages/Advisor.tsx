
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Send, Bot, Lightbulb, PieChart as PieChartIcon, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';
import { formatToRupees } from '@/lib/utils';

const Advisor = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'नमस्ते! मैं आपका AI वित्तीय सलाहकार हूँ। मैं आज आपकी निवेश रणनीति में कैसे मदद कर सकता हूँ? (Hello! I\'m your AI financial advisor. How can I help you with your investment strategy today?)' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Investment profile state
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000000);
  const [riskTolerance, setRiskTolerance] = useState<number[]>([3]);
  const [timeHorizon, setTimeHorizon] = useState<number[]>([5]);
  const [investmentGoal, setInvestmentGoal] = useState('retirement');
  const [showRecommendation, setShowRecommendation] = useState(false);

  // Mock data for portfolio allocation
  const portfolioAllocation = [
    { name: 'Stocks', value: 40 },
    { name: 'Mutual Funds', value: 30 },
    { name: 'Fixed Deposits', value: 20 },
    { name: 'Gold', value: 10 },
  ];
  
  // Mock data for expected returns
  const expectedReturns = [
    { name: 'Year 1', return: investmentAmount * 1.08 },
    { name: 'Year 2', return: investmentAmount * 1.08 * 1.08 },
    { name: 'Year 3', return: investmentAmount * 1.08 * 1.08 * 1.08 },
    { name: 'Year 5', return: investmentAmount * 1.08 * 1.08 * 1.08 * 1.08 * 1.08 },
    { name: 'Year 10', return: investmentAmount * Math.pow(1.08, 10) },
  ];
  
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    setIsTyping(true);
    
    // Clear input
    setMessage('');
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: "आपके इनपुट के आधार पर, मैं एक विविध पोर्टफोलियो की सिफारिश करूंगा जिसमें मध्यम जोखिम का एक्सपोज़र हो। क्या आप चाहेंगे कि मैं आपके जोखिम प्रोफ़ाइल और लक्ष्यों के आधार पर अधिक विशिष्ट निवेश सिफारिशें प्रदान करूं? (Based on your input, I'd recommend considering a diversified portfolio with moderate risk exposure. Would you like me to provide more specific investment recommendations based on your risk profile and goals?)" 
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const generateRecommendation = () => {
    setShowRecommendation(true);
  };
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">AI Financial Advisor</h1>
          <p className="text-gray-600">Get personalized investment advice and portfolio recommendations for Indian markets</p>
        </div>
        
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="chat">
              <Bot size={16} className="mr-2" />
              AI Chat Assistant
            </TabsTrigger>
            <TabsTrigger value="analyzer">
              <PieChartIcon size={16} className="mr-2" />
              Investment Analyzer
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <Card className="border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot size={20} className="mr-2 text-blue-600" />
                  Financial Assistant
                </CardTitle>
                <CardDescription>
                  Ask me anything about investing, financial planning, or market trends in Indian context
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg space-y-4">
                  {chatHistory.map((chat, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        chat.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          chat.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        {chat.content}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Input 
                    placeholder="मुझसे पूछें... निवेश, बचत, या वित्तीय योजना के बारे में (Ask me about investments, savings, or financial planning...)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send size={16} />
                  </Button>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-sm text-gray-500">
                  <Lightbulb size={16} className="inline mr-1" />
                  Try asking: "What's a good SIP strategy for beginners in India?"
                </div>
              </CardFooter>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp size={18} className="mr-2 text-blue-600" />
                    Market Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Nifty and Sensex are showing strong potential in technology and healthcare sectors this quarter.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="p-0 h-auto">
                    View Analysis
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <DollarSign size={18} className="mr-2 text-green-600" />
                    Investment Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Consider SIP (Systematic Investment Plan) to mitigate market volatility in your investment strategy.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="p-0 h-auto">
                    Learn More
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Lightbulb size={18} className="mr-2 text-amber-600" />
                    Retirement Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Maximizing your NPS and PPF contributions early can significantly impact your long-term growth.
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="link" className="p-0 h-auto">
                    Plan Retirement
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analyzer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Profile</CardTitle>
                <CardDescription>
                  Tell us about your investment goals and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Investment Amount</Label>
                  <div className="flex items-center space-x-4">
                    <DollarSign size={18} className="text-gray-500" />
                    <Input 
                      id="amount" 
                      type="number" 
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Risk Tolerance</Label>
                    <span className="text-sm text-gray-500">
                      {riskTolerance[0] === 1 ? 'Very Low' : 
                       riskTolerance[0] === 2 ? 'Low' : 
                       riskTolerance[0] === 3 ? 'Moderate' : 
                       riskTolerance[0] === 4 ? 'High' : 'Very High'}
                    </span>
                  </div>
                  <Slider 
                    defaultValue={[3]} 
                    value={riskTolerance}
                    onValueChange={setRiskTolerance}
                    max={5} 
                    step={1} 
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Time Horizon (Years)</Label>
                    <span className="text-sm text-gray-500">{timeHorizon[0]} years</span>
                  </div>
                  <Slider 
                    defaultValue={[5]} 
                    value={timeHorizon}
                    onValueChange={setTimeHorizon}
                    min={1} 
                    max={30} 
                    step={1} 
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Short-term</span>
                    <span>Long-term</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Investment Goal</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['retirement', 'education', 'house', 'wealth'].map((goal) => (
                      <Button
                        key={goal}
                        variant={investmentGoal === goal ? 'default' : 'outline'}
                        onClick={() => setInvestmentGoal(goal)}
                        className="justify-start capitalize"
                      >
                        {goal}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={generateRecommendation} className="w-full">
                  Generate Recommendations
                </Button>
              </CardFooter>
            </Card>
            
            {showRecommendation && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Portfolio Allocation</CardTitle>
                    <CardDescription>
                      Based on your {riskTolerance[0] === 1 ? 'very low' : 
                        riskTolerance[0] === 2 ? 'low' : 
                        riskTolerance[0] === 3 ? 'moderate' : 
                        riskTolerance[0] === 4 ? 'high' : 'very high'} risk tolerance and {timeHorizon[0]}-year time horizon
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-center">
                    <div className="w-60 h-60 mx-auto mb-6 md:mb-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={portfolioAllocation}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {portfolioAllocation.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="md:ml-8 flex-1">
                      <h4 className="font-medium mb-4">Asset Allocation Breakdown</h4>
                      <div className="space-y-3">
                        {portfolioAllocation.map((asset, index) => (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded mr-2" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span>{asset.name}</span>
                                <span className="font-medium">{asset.value}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="h-1.5 rounded-full" 
                                  style={{ 
                                    width: `${asset.value}%`,
                                    backgroundColor: COLORS[index % COLORS.length]
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Projected Investment Growth</CardTitle>
                    <CardDescription>
                      Estimated returns over time based on historical performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={expectedReturns}>
                          <XAxis dataKey="name" />
                          <YAxis 
                            tickFormatter={(value) => formatToRupees(value)}
                          />
                          <Tooltip 
                            formatter={(value) => formatToRupees(Number(value))}
                          />
                          <Legend />
                          <Bar dataKey="return" name="Projected Value" fill="#0088FE" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                        <Lightbulb size={18} className="mr-2" />
                        Investment Summary
                      </h4>
                      <p className="text-sm text-gray-700 mb-3">
                        With an initial investment of <strong>{formatToRupees(investmentAmount)}</strong> and a <strong>{timeHorizon[0]}-year</strong> investment horizon, your portfolio could grow to approximately <strong>{formatToRupees(Math.round(investmentAmount * Math.pow(1.08, timeHorizon[0])))}</strong>.
                      </p>
                      <p className="text-sm text-gray-700">
                        This projection assumes an average annual return of 8% based on historical market performance of Indian markets. Actual results may vary.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      Save Recommendation
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Advisor;
