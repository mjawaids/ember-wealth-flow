
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";
import { TrendingUp, Calendar, BarChart3 } from "lucide-react";

export const FinancialChart = () => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'pie'>('area');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const monthlyData = [
    { month: 'Jan', income: 4200, expenses: 2800, savings: 1400 },
    { month: 'Feb', income: 4500, expenses: 2950, savings: 1550 },
    { month: 'Mar', income: 4300, expenses: 3100, savings: 1200 },
    { month: 'Apr', income: 4800, expenses: 2750, savings: 2050 },
    { month: 'May', income: 4600, expenses: 2900, savings: 1700 },
    { month: 'Jun', income: 4500, expenses: 2850, savings: 1650 }
  ];

  const categoryData = [
    { name: 'Food & Dining', value: 850, color: '#8884d8' },
    { name: 'Transportation', value: 450, color: '#82ca9d' },
    { name: 'Shopping', value: 380, color: '#ffc658' },
    { name: 'Entertainment', value: 220, color: '#ff7c7c' },
    { name: 'Bills', value: 650, color: '#8dd1e1' },
    { name: 'Healthcare', value: 180, color: '#d084d0' }
  ];

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

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-lg font-semibold">Financial Overview</CardTitle>
            <Badge className="bg-green-100 text-green-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5%
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
              {['7d', '30d', '90d', '1y'].map((range) => (
                <Button
                  key={range}
                  size="sm"
                  variant={timeRange === range ? 'default' : 'ghost'}
                  onClick={() => setTimeRange(range as any)}
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
          {chartType === 'area' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
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
          
          {chartType === 'line' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
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
          
          {chartType === 'pie' && (
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-4 lg:space-y-0 lg:space-x-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`$${value.toLocaleString()}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {categoryData.map((category, index) => (
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
        </div>
        
        {chartType !== 'pie' && (
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
