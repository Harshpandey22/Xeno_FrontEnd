import React, { useState, useEffect } from 'react';
import { Bell, LineChart, Users, Settings, HelpCircle, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { getCustomerCount, getOrderCount, getTotalRevenue, getCommunicationLogs, CommunicationLog } from './service/getAnalyticsData';

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customers, orders, totalRevenue, logs] = await Promise.all([
          getCustomerCount(),
          getOrderCount(),
          getTotalRevenue(),
          getCommunicationLogs()
        ]);
        
        setCustomerCount(customers);
        setOrderCount(orders);
        setRevenue(totalRevenue);
        setCommunicationLogs(logs);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }; fetchData();
  }, []);


  const formatRevenue = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  return (
    <div className="grid h-[50px] min-h-screen overflow-hidden w-full lg:grid-cols-[280px_1fr]">
      {/* Main Content */}
      <div className="flex flex-col w-[1380px]">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="w-full bg-background pl-8 sm:w-[300px]"
                  placeholder="Search customers..."
                  type="search"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : customerCount.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : orderCount.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : formatRevenue(revenue)}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full bg-muted rounded-lg" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Past Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 animate-pulse">
                  <div className="h-8 w-8 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-3 w-1/2 bg-muted rounded" />
                  </div>
                </div>
              ))
            ) : communicationLogs.length > 0 ? (
              communicationLogs.map((log) => (
                <div key={log.id} className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">{log.segmentName}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{log.message}</p>
                    <p className="text-sm text-muted-foreground">{log.segmentName}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-muted-foreground py-4">
                No recent activities
              </div>
            )}
          </div>
        </CardContent>
      </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;