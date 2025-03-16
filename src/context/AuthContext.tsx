
import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('algowealth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function (would connect to backend in a real app)
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation
        if (email && password.length >= 6) {
          const mockUser = {
            id: '1',
            name: 'John Doe',
            email: email,
            avatar: '',
          };
          
          setUser(mockUser);
          localStorage.setItem('algowealth_user', JSON.stringify(mockUser));
          setLoading(false);
          resolve(true);
        } else {
          setLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  // Mock signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock validation
        if (name && email && password.length >= 6) {
          const mockUser = {
            id: Math.random().toString(36).substring(2, 11),
            name: name,
            email: email,
            avatar: '',
          };
          
          setUser(mockUser);
          localStorage.setItem('algowealth_user', JSON.stringify(mockUser));
          setLoading(false);
          resolve(true);
        } else {
          setLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('algowealth_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      signup,
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
