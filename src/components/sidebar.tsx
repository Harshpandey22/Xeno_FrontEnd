import React from 'react';
import { Zap, Home, Users, LineChart, CheckSquare, MessageSquare, LogOut } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Adjust based on your app's token storage
    navigate('/login', { replace: true });
    window.history.pushState(null, '', '/login'); // Optional
  };

  return (
    <div className="hidden border-r bg-muted/40 lg:block">
      <div className="flex h-full flex-col">
        {/* Header Section */}
        <div className="flex h-14 items-center border-b px-6">
          <NavLink className="flex items-center gap-2 font-semibold" to="#">
            <Zap className="h-6 w-6" />
            <span>CRM Platform</span>
          </NavLink>
        </div>

        {/* Navigation Section */}
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-accent hover:text-primary'
                }`
              }
            >
              <Home className="h-4 w-4" />
              Home
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
              Customers
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
              Analytics
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isActive ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-accent hover:text-primary'
                }`
              }
            >
              <CheckSquare className="h-4 w-4" />
              Tasks
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
              Messages
            </NavLink>
          </nav>
        </div>

        {/* Footer Section */}
        <div className="mt-auto p-4 space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle>Upgrade to Pro</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Upgrade</Button>
            </CardContent>
          </Card>
          <Button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
