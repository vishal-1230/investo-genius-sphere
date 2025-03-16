
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthenticatedRoute from "./components/routing/AuthenticatedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MarketTracker from "./pages/MarketTracker";
import Advisor from "./pages/Advisor";
import News from "./pages/News";
import Education from "./pages/Education";
import Settings from "./pages/Settings";
import MonthlyReport from "./pages/MonthlyReport";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            } />
            <Route path="/market-tracker" element={
              <AuthenticatedRoute>
                <MarketTracker />
              </AuthenticatedRoute>
            } />
            <Route path="/advisor" element={
              <AuthenticatedRoute>
                <Advisor />
              </AuthenticatedRoute>
            } />
            <Route path="/news" element={
              <AuthenticatedRoute>
                <News />
              </AuthenticatedRoute>
            } />
            <Route path="/education" element={
              <AuthenticatedRoute>
                <Education />
              </AuthenticatedRoute>
            } />
            <Route path="/reports" element={
              <AuthenticatedRoute>
                <MonthlyReport />
              </AuthenticatedRoute>
            } />
            <Route path="/settings" element={
              <AuthenticatedRoute>
                <Settings />
              </AuthenticatedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
