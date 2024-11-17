import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Login from './components/login';
import Sidebar from './components/sidebar';
import Customers from './components/Customers';
import CustomerDetails from './components/CustomerDetails';
import CampaignHistory from './components/campaignHistory'; // Import CampaignHistory component
import Analytics from './components/analytics'; // Import Analytics component
import './index.css';

// ProtectedRoute component for route protection
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check authentication
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // Check authentication on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  // Login handler
  const handleLogin = () => {
    localStorage.setItem('authToken', 'your-auth-token'); // Mock authentication token
    setIsAuthenticated(true);
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
              <Sidebar />
              <div className="flex flex-col w-full p-4">
                <Dashboard />
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Customers Route */}
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
              <Sidebar />
              <div className="flex flex-col w-full p-4">
                <Customers />
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Customer Details Route */}
      <Route
        path="/customer-details"
        element={
          <ProtectedRoute>
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
              <Sidebar />
              <div className="flex flex-col w-full p-4">
                <CustomerDetails />
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Campaign History Route */}
      <Route
        path="/campaign-history"
        element={
          <ProtectedRoute>
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
              <Sidebar />
              <div className="flex flex-col w-full p-4">
                <CampaignHistory /> {/* Add the CampaignHistory component */}
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Analytics Route */}
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
              <Sidebar />
              <div className="flex flex-col w-full p-4">
                <Analytics /> {/* Add the Analytics component */}
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Catch-All Route */}
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
    </Routes>
  );
};

export default App;
