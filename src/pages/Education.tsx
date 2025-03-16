
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, PlayCircle, FileText, Award, Check } from 'lucide-react';

const educationModules = [
  {
    title: 'Investing Fundamentals',
    description: 'Learn the basic concepts of investing, understand risk and return, and discover different asset classes.',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-700',
    lessons: 12,
    duration: '4 hours',
    level: 'Beginner'
  },
  {
    title: 'Stock Market Basics',
    description: 'Understand how the stock market works, learn to read stock charts, and discover fundamental analysis.',
    icon: TrendingUp,
    color: 'bg-green-100 text-green-700',
    lessons: 15,
    duration: '5 hours',
    level: 'Beginner'
  },
  {
    title: 'Technical Analysis',
    description: 'Learn to identify patterns, use indicators, and make decisions based on price action and volume.',
    icon: BarChart2,
    color: 'bg-purple-100 text-purple-700',
    lessons: 20,
    duration: '8 hours',
    level: 'Intermediate'
  },
  {
    title: 'Portfolio Construction',
    description: 'Learn how to build a diversified portfolio and balance risk and potential returns across asset classes.',
    icon: Briefcase,
    color: 'bg-orange-100 text-orange-700',
    lessons: 10,
    duration: '6 hours',
    level: 'Intermediate'
  },
  {
    title: 'Retirement Planning',
    description: 'Understand different retirement accounts, tax strategies, and how to plan for financial independence.',
    icon: Clock,
    color: 'bg-indigo-100 text-indigo-700',
    lessons: 8,
    duration: '5 hours',
    level: 'All Levels'
  },
  {
    title: 'Advanced Options Trading',
    description: 'Master options strategies, understand the Greeks, and learn advanced risk management techniques.',
    icon: TrendingUp,
    color: 'bg-red-100 text-red-700',
    lessons: 25,
    duration: '12 hours',
    level: 'Advanced'
  },
];

const popularArticles = [
  {
    title: 'Understanding Market Volatility',
    readTime: '5 min read',
    date: 'May 15, 2023'
  },
  {
    title: 'How to Start Investing with $500',
    readTime: '4 min read',
    date: 'May 10, 2023'
  },
  {
    title: 'The Power of Compound Interest',
    readTime: '3 min read',
    date: 'May 8, 2023'
  },
  {
    title: 'Diversification: Why It Matters',
    readTime: '6 min read',
    date: 'May 5, 2023'
  },
];

// Import all the icons we need
import { TrendingUp, BarChart2, Briefcase, Clock } from 'lucide-react';

const Education = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Financial Education</h1>
          <p className="text-gray-600">Learn investing concepts, market dynamics, and financial planning strategies</p>
        </div>
        
        {/* Learning Paths Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Learning Paths</h2>
            <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationModules.map((module, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="mb-3">
                    <div className={`w-10 h-10 rounded-lg ${module.color} flex items-center justify-center`}>
                      <module.icon size={20} />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-4">
                    <div className="flex items-center">
                      <BookOpen size={16} className="mr-1 text-gray-500" />
                      <span>{module.lessons} lessons</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1 text-gray-500" />
                      <span>{module.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full 
                      ${module.level === 'Beginner' 
                        ? 'bg-green-100 text-green-800' 
                        : module.level === 'Intermediate' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                      {module.level}
                    </span>
                  </div>
                  <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                    Start Learning
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        {/* Featured Content Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1579532536935-619928decd08?q=80&w=2940&auto=format&fit=crop" 
                  alt="Investing Workshop" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Featured Webinar</span>
                  <span className="text-gray-500 text-sm">1 hour</span>
                </div>
                <CardTitle>Master Class: Market Analysis Techniques for 2023</CardTitle>
                <CardDescription>
                  Join our expert analysts for an in-depth look at the most effective market analysis techniques in today's economic climate.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop" 
                      alt="Presenter" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Alex Morgan</p>
                    <p className="text-sm text-gray-500">Senior Market Analyst</p>
                  </div>
                </div>
                <button className="flex items-center justify-center w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  <PlayCircle size={18} className="mr-2" />
                  Watch Webinar
                </button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Popular Articles</CardTitle>
                <CardDescription>Top reads from our learning library</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <FileText size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{article.title}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          <span>{article.readTime}</span>
                          <span className="mx-2">•</span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Browse All Articles
                </button>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Learning Progress Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Your Learning Progress</CardTitle>
              <CardDescription>Track your educational journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Investing Fundamentals</span>
                    <span className="text-sm text-blue-600">60% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Technical Analysis</span>
                    <span className="text-sm text-blue-600">25% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-medium mb-3">Recently Completed</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                        <Check size={14} />
                      </div>
                      <span className="text-sm">Introduction to Stock Markets</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                        <Check size={14} />
                      </div>
                      <span className="text-sm">Understanding Risk Profiles</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full mt-2 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                  Continue Learning
                </button>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Certifications */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Financial Education Certification</h3>
              <p className="text-gray-600 max-w-xl">
                Complete our comprehensive investment curriculum and earn a certificate to showcase your financial knowledge.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Award size={24} className="text-amber-500" />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                View Certifications
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Education;
