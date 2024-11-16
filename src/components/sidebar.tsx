import React, { useState } from 'react'; // Keep this import only
import { Zap, Home, Users, LineChart, MessageSquare, LogOut, Menu } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Adjust based on your app's token storage
    navigate('/login', { replace: true });
    window.history.pushState(null, '', '/login'); // Optional
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`lg:flex ${isOpen ? 'w-64' : 'w-16'} flex-col bg-muted/40 border-r transition-all duration-300`}>
      {/* Toggle Button for Small Screens */}
      <div className="flex items-center justify-between h-14 px-4 border-b lg:hidden">
        <button onClick={toggleSidebar} className="text-muted-foreground">
          <Menu className="h-6 w-6" />
        </button>
        <NavLink className="flex items-center gap-2 font-semibold" to="#">
          <Zap className="h-6 w-6" />
          {isOpen && <span>CRM Platform</span>}
        </NavLink>
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="hidden lg:flex h-14 items-center border-b px-6">
          <NavLink className="flex items-center gap-2 font-semibold" to="#">
            <Zap className="h-6 w-6" />
            {isOpen && <span>CRM Platform</span>}
          </NavLink>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-auto">
          <nav className="grid gap-2 items-start px-4 py-4 text-sm font-medium">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-accent hover:text-primary'
                }`
              }
            >
              <Home className="h-4 w-4" />
              {isOpen && <span>Home</span>}
            </NavLink>
            <NavLink
              to="/customers"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-accent hover:text-primary'
                }`
              }
            >
              <Users className="h-4 w-4" />
              {isOpen && <span>Customers</span>}
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-accent hover:text-primary'
                }`
              }
            >
              <LineChart className="h-4 w-4" />
              {isOpen && <span>Analytics</span>}
            </NavLink>
            <NavLink
              to="/messages"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-accent hover:text-primary'
                }`
              }
            >
              <MessageSquare className="h-4 w-4" />
              {isOpen && <span>Messages</span>}
            </NavLink>
          </nav>
        </div>

        {/* Logout Button Section */}
        <div className={`px-4 mb-9 py-2 ${isOpen ? '' : 'flex items-center justify-center'}`}>
          <Button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="h-4 w-4" />
            {isOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
