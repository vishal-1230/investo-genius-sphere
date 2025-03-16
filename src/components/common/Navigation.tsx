
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Newspaper, 
  FileText, 
  MessageCircle, 
  Settings,
  LogOut,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Market Tracker', path: '/market-tracker', icon: TrendingUp },
    { name: 'AI Advisor', path: '/advisor', icon: MessageCircle },
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'Education', path: '/education', icon: BookOpen },
    { name: 'Monthly Report', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">AlgoWealth</h1>
      </div>
      
      <nav className="mt-2 px-4 flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeItem === item.path 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveItem(item.path)}
              >
                <item.icon size={18} className="flex-shrink-0" />
                <span className="text-sm font-medium">{item.name}</span>
                {activeItem === item.path && (
                  <span className="ml-auto w-1.5 h-5 bg-blue-600 rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <button 
          className="flex w-full items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          onClick={logout}
        >
          <LogOut size={18} className="text-gray-500" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
