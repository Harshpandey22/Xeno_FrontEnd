import React, { useState, useEffect } from 'react';
import { LineChart, Users, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { getCustomerCount, getOrderCount, getTotalRevenue, getCommunicationLogs, CommunicationLog, getCustomerOrderRel } from './service/getAnalyticsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([]);
  const [customerOrderData, setCustomerOrderData] = useState<{ name: string; orders: number }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customers, orders, totalRevenue, logs, customerOrders] = await Promise.all([
          getCustomerCount(),
          getOrderCount(),
          getTotalRevenue(),
          getCommunicationLogs(),
          getCustomerOrderRel()
        ]);
        
        setCustomerCount(customers);
        setOrderCount(orders);
        setRevenue(totalRevenue);
        
        // Safely handle logs and limit to 5 items
        if (logs && Array.isArray(logs)) {
          setCommunicationLogs(logs.slice(0,5));
        } else {
          setCommunicationLogs([]);
        }
        
        // Transform and sort the customer-order data for the chart
        const transformedData = Object.entries(customerOrders || {})
          .map(([name, orders]) => ({
            name,
            orders
          }))
          .sort((a, b) => b.orders - a.orders);
        setCustomerOrderData(transformedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium text-sm">{`Customer: ${label}`}</p>
          <p className="text-sm text-primary">{`Orders: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

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
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : customerCount.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                <LineChart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : orderCount.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <LineChart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {loading ? "Loading..." : formatRevenue(revenue)}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Customer Growth</CardTitle>
                <CardDescription>Number of orders per customer</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="h-[300px] w-full bg-muted rounded-lg animate-pulse" />
                ) : customerOrderData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                      data={customerOrderData} 
                      margin={{ top: 20, right: 30, left: 20, bottom: 25 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="name" 
                        className="text-xs" 
                        tick={{ fill: 'currentColor' }}
                      >
                       
                      </XAxis>
                      <YAxis 
                        className="text-xs" 
                        tick={{ fill: 'currentColor' }}
                        allowDecimals={false}
                      >
                        <Label 
                          value="Number of Orders" 
                          angle={-90} 
                          position="left"
                          offset={-10}
                          className="text-sm fill-current"
                        />
                      </YAxis>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar 
                        name="Customers"
                        dataKey="orders" 
                        fill="currentColor" 
                        radius={[4, 4, 0, 0]}
                        className="fill-primary"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
                    No data available
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3 hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Past Campaigns</CardTitle>
                <CardDescription>Latest 5 campaign activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 animate-pulse">
                        <div className="h-10 w-10 rounded-full bg-muted" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 w-3/4 bg-muted rounded" />
                          <div className="h-3 w-1/2 bg-muted rounded" />
                        </div>
                      </div>
                    ))
                  ) : communicationLogs && communicationLogs.length > 0 ? (
                    communicationLogs.map((log) => (
                      <div key={log.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">{log.segmentName}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium leading-none mb-1">{log.message}</p>
                          <span className="text-xs text-muted-foreground">{log.segmentName}</span>
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