import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import LandingPage from './LandingPage';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  // If the user is authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Otherwise, show the landing page
  return <LandingPage />;
};

export default Index;
