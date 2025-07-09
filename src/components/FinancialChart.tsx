
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState, useMemo } from "react";
import { TrendingUp, Calendar, BarChart3, PieChart as PieChartIcon } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: string;
}

interface FinancialChartProps {
  transactions: Transaction[];
}

export const FinancialChart = ({ transactions }: FinancialChartProps) => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'pie'>('area');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const processedData = useMemo(() => {
    if (transactions.length === 0) {
      return {
        monthlyData: [],
        categoryData: [],
        isEmpty: true
      };
    }

    // Get date range based on selection
    const now = new Date();
    const rangeStart = new Date();
    switch (timeRange) {
      case '7d':
        rangeStart.setDate(now.getDate() - 7);
        break;
      case '30d':
        rangeStart.setDate(now.getDate() - 30);
        break;
      case '90d':
        rangeStart.setDate(now.getDate() - 90);
        break;
      case '1y':
        rangeStart.setFullYear(now.getFullYear() - 1);
        break;
    }

    // Filter transactions by date range
    const filteredTransactions = transactions.filter(t => 
      new Date(t.date) >= rangeStart && new Date(t.date) <= now
    );

    // Process monthly data
    const monthlyMap = new Map();
    filteredTransactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      if (!monthlyMap.has(monthKey)) {
        monthlyMap.set(monthKey, { 
          month: monthName, 
          income: 0, 
          expenses: 0, 
          savings: 0 
        });
      }
      
      const monthData = monthlyMap.get(monthKey);
      const amount = Math.abs(Number(transaction.amount));
      
      if (transaction.type === 'income') {
        monthData.income += amount;
      } else if (transaction.type === 'expense') {
        monthData.expenses += amount;
      }
    });

    // Calculate savings for each month
    const monthlyData = Array.from(monthlyMap.values()).map(month => ({
      ...month,
      savings: month.income - month.expenses
    }));

    // Process category data
    const categoryMap = new Map();
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0', '#ffb347', '#87ceeb'];
    
    filteredTransactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        const category = transaction.category;
        const amount = Math.abs(Number(transaction.amount));
        
        if (!categoryMap.has(category)) {
          categoryMap.set(category, {
            name: category,
            value: 0,
            color: colors[categoryMap.size % colors.length]
          });
        }
        
        categoryMap.get(category).value += amount;
      });

    const categoryData = Array.from(categoryMap.values());

    return {
      monthlyData,
      categoryData,
      isEmpty: false
    };
  }, [transactions, timeRange]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (processedData.isEmpty) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Financial Overview</CardTitle>
        </CardHeader>
        <CardContent className="py-8">
          <div className="text-center">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm mb-2">No data to display</p>
            <p className="text-gray-400 text-xs">
              Add some transactions to see your financial charts
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg font-semibold">Financial Overview</CardTitle>
            <Badge className="bg-green-100 text-green-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              Live Data
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                size="sm"
                variant={chartType === 'area' ? 'default' : 'ghost'}
                onClick={() => setChartType('area')}
                className="px-3 py-1 text-xs"
              >
                Area
              </Button>
              <Button
                size="sm"
                variant={chartType === 'line' ? 'default' : 'ghost'}
                onClick={() => setChartType('line')}
                className="px-3 py-1 text-xs"
              >
                Line
              </Button>
              <Button
                size="sm"
                variant={chartType === 'pie' ? 'default' : 'ghost'}
                onClick={() => setChartType('pie')}
                className="px-3 py-1 text-xs"
              >
                Categories
              </Button>
            </div>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['7d', '30d', '90d', '1y'] as const).map((range) => (
                <Button
                  key={range}
                  size="sm"
                  variant={timeRange === range ? 'default' : 'ghost'}
                  onClick={() => setTimeRange(range)}
                  className="px-3 py-1 text-xs"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          {chartType === 'area' && processedData.monthlyData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={processedData.monthlyData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stackId="1" 
                  stroke="#3b82f6" 
                  fill="url(#incomeGradient)"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="2" 
                  stroke="#ef4444" 
                  fill="url(#expenseGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'line' && processedData.monthlyData.length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processedData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'pie' && processedData.categoryData.length > 0 && (
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={processedData.categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {processedData.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {processedData.categoryData.map((category, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-700">{category.name}</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${category.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {((chartType === 'area' || chartType === 'line') && processedData.monthlyData.length === 0) && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No data for selected time range</p>
              </div>
            </div>
          )}
          
          {chartType === 'pie' && processedData.categoryData.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <PieChartIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">No expense categories to display</p>
              </div>
            </div>
          )}
        </div>
        
        {chartType !== 'pie' && processedData.monthlyData.length > 0 && (
          <div className="flex justify-center space-x-6 mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm text-gray-600">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm text-gray-600">Expenses</span>
            </div>
            {chartType === 'line' && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">Savings</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
