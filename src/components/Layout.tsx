
import React, { useState } from 'react';
import Navigation from './common/Navigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div
          className="fixed inset-0 bg-cover bg-center -z-10"
          style={{ 
            backgroundImage: `url('/src/assets/bg-pattern.svg')`,
            opacity: 0.5 
          }}
        />
        
        <AnimatePresence>
          {sidebarOpen && isAuthenticated && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-64 bg-white shadow-sm border-r border-gray-100 h-screen sticky top-0 z-30"
            >
              <Navigation />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex-1 min-w-0 overflow-hidden">
          {isAuthenticated && (
            <div className="sticky top-0 z-20 bg-white/70 backdrop-blur-lg border-b border-gray-100 px-6 py-3 flex items-center">
              <button
                className="p-2 mr-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                onClick={() => setSidebarOpen(prev => !prev)}
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {sidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
              <h1 className="text-xl font-medium">AlgoWealth</h1>
              {user && (
                <div className="ml-auto flex items-center space-x-4">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{user.name}</span>
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
                      ) : (
                        <span className="font-medium">{user.name.charAt(0)}</span>
                      )}
                    </div>
                    <button 
                      onClick={logout}
                      className="ml-4 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <main className={`${isAuthenticated ? 'p-6' : 'p-0'} animate-fade-in`}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
