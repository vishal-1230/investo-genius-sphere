
import React, { useState, useEffect } from 'react';
import ArticleCard from '../common/ArticleCard';
import { Search, Filter, BookOpen, TrendingUp, Calendar, Clock } from 'lucide-react';

// Mock data for articles
const mockArticles = [
  {
    id: 1,
    title: 'Understanding Market Volatility: How to Navigate Uncertain Times',
    summary: 'Market volatility is an inevitable aspect of investing. This article explains the causes of market volatility and provides strategies to navigate through uncertain market conditions.',
    date: 'May 15, 2023',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2940&auto=format&fit=crop',
    source: 'Financial Times',
    category: 'Market Analysis',
    featured: true,
  },
  {
    id: 2,
    title: 'The Future of Cryptocurrency: Investment Potential and Risks',
    summary: 'As cryptocurrency becomes increasingly mainstream, investors are weighing potential returns against volatility and regulatory risks. Learn about the latest developments in the crypto market.',
    date: 'May 12, 2023',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=2787&auto=format&fit=crop',
    source: 'Crypto Insights',
    category: 'Cryptocurrency',
    featured: true,
  },
  {
    id: 3,
    title: 'Retirement Planning: Building a Sustainable Portfolio for the Long Term',
    summary: 'Effective retirement planning requires a balanced approach to risk and return. This guide outlines strategies for creating a sustainable portfolio that can provide income throughout your retirement years.',
    date: 'May 10, 2023',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=2874&auto=format&fit=crop',
    source: 'Retirement Today',
    category: 'Retirement',
    featured: false,
  },
  {
    id: 4,
    title: 'Understanding ESG Investing: Principles and Performance',
    summary: 'Environmental, Social, and Governance (ESG) investing continues to gain popularity. Learn about the principles behind ESG investing and how these portfolios have performed compared to traditional investments.',
    date: 'May 8, 2023',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2021&auto=format&fit=crop',
    source: 'Sustainable Finance',
    category: 'ESG',
    featured: false,
  },
  {
    id: 5,
    title: 'Tax-Efficient Investing Strategies for High-Income Earners',
    summary: 'High-income earners face unique tax challenges. This article explores strategies to minimize tax liability while maximizing investment returns through careful asset allocation and account selection.',
    date: 'May 5, 2023',
    readTime: '9 min read',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2535&auto=format&fit=crop',
    source: 'Tax Planning',
    category: 'Taxes',
    featured: false,
  },
  {
    id: 6,
    title: 'Global Market Outlook: Regions Poised for Growth in 2023',
    summary: 'As global economies continue to recover, certain regions are showing stronger growth potential. This analysis examines which international markets may offer the best investment opportunities in the coming year.',
    date: 'May 3, 2023',
    readTime: '11 min read',
    imageUrl: 'https://images.unsplash.com/photo-1584462978431-c5ca7cc96330?q=80&w=2823&auto=format&fit=crop',
    source: 'Global Investments',
    category: 'Global Markets',
    featured: false,
  },
];

// Educational courses mock data
const educationalCourses = [
  {
    id: 1,
    title: 'Investment Fundamentals',
    description: 'Learn the basics of investing, asset classes, and portfolio construction',
    modules: 12,
    duration: '6 hours',
    level: 'Beginner',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Stock Market Mastery',
    description: 'Advanced techniques for stock selection and portfolio management',
    modules: 18,
    duration: '10 hours',
    level: 'Intermediate',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Technical Analysis',
    description: 'Understanding chart patterns and technical indicators for better trading decisions',
    modules: 15,
    duration: '8 hours',
    level: 'Advanced',
    imageUrl: 'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?q=80&w=2070&auto=format&fit=crop',
  },
];

type CategoryFilter = 'All' | 'Market Analysis' | 'Cryptocurrency' | 'Retirement' | 'ESG' | 'Taxes' | 'Global Markets';

const NewsPanel = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'education'>('news');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('All');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setArticles(mockArticles);
      setCourses(educationalCourses);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter articles based on search term and category
  const filteredArticles = articles.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || article.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Filter courses based on search term
  const filteredCourses = courses.filter(course => {
    return course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           course.description.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Financial News & Education</h2>
          <p className="text-gray-500">Stay informed with the latest market news and expand your knowledge</p>
        </div>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => setActiveTab('news')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'news' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            News
          </button>
          <button 
            onClick={() => setActiveTab('education')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'education' 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Education
          </button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${activeTab === 'news' ? 'articles' : 'courses'}...`}
            className="w-full pr-10 pl-4 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {activeTab === 'news' && (
          <div className="flex space-x-2 w-full sm:w-auto overflow-x-auto pb-2">
            {(['All', 'Market Analysis', 'Cryptocurrency', 'Retirement', 'ESG', 'Taxes', 'Global Markets'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setCategoryFilter(category)}
                className={`px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                  categoryFilter === category
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {activeTab === 'news' ? (
        <>
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className="animate-pulse bg-white rounded-xl h-80"></div>
                ))
              ) : (
                filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    summary={article.summary}
                    date={article.date}
                    readTime={article.readTime}
                    imageUrl={article.imageUrl}
                    source={article.source}
                    category={article.category}
                  />
                ))
              )}
            </div>
          ) : (
            <div className="text-center py-10">
              <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse bg-white rounded-xl h-60"></div>
              ))
            ) : (
              filteredCourses.map((course) => (
                <div key={course.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all animate-hover">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full 
                        ${course.level === 'Beginner' 
                          ? 'bg-green-100 text-green-800' 
                          : course.level === 'Intermediate' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                        {course.level}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-500">
                        <BookOpen size={14} className="mr-1" />
                        <span>{course.modules} modules</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <button className="w-full py-2 text-center rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      Start Learning
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-semibold mb-2">Personalized Learning Path</h3>
                <p className="text-blue-100 max-w-xl">Our AI-powered system can create a custom learning journey based on your investment goals and experience level.</p>
              </div>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Create My Path
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPanel;
