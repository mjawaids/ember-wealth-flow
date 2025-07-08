
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  PiggyBank, 
  Plus,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Eye,
  EyeOff
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const AccountCards = () => {
  const [showBalances, setShowBalances] = useState(true);

  const accounts = [
    {
      id: 1,
      name: "Main Checking",
      type: "Bank Account",
      balance: 8750.25,
      change: 12.5,
      changeType: "positive" as const,
      icon: <Building2 className="h-6 w-6" />,
      color: "blue",
      lastTransaction: "Salary deposit",
      currency: "USD"
    },
    {
      id: 2,
      name: "Credit Card",
      type: "Credit Card",
      balance: -1250.75,
      change: -8.2,
      changeType: "negative" as const,
      icon: <CreditCard className="h-6 w-6" />,
      color: "purple",
      lastTransaction: "Online shopping",
      currency: "USD"
    },
    {
      id: 3,
      name: "Emergency Fund",
      type: "Savings",
      balance: 5500.00,
      change: 5.1,
      changeType: "positive" as const,
      icon: <PiggyBank className="h-6 w-6" />,
      color: "green",
      lastTransaction: "Monthly transfer",
      currency: "USD"
    },
    {
      id: 4,
      name: "Cash Wallet",
      type: "Cash",
      balance: 245.50,
      change: -15.3,
      changeType: "negative" as const,
      icon: <Wallet className="h-6 w-6" />,
      color: "orange",
      lastTransaction: "Coffee purchase",
      currency: "USD"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 text-blue-600",
      purple: "from-purple-500 to-purple-600 text-purple-600",
      green: "from-green-500 to-green-600 text-green-600",
      orange: "from-orange-500 to-orange-600 text-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const formatBalance = (balance: number, currency: string) => {
    if (!showBalances) return "****";
    return `${balance < 0 ? '-' : ''}${currency === 'USD' ? '$' : ''}${Math.abs(balance).toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Your Accounts</h3>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
          >
            {showBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <Card 
            key={account.id} 
            className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden relative"
          >
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
              getColorClasses(account.color).split(' ')[0],
              getColorClasses(account.color).split(' ')[1]
            )} />
            
            <CardHeader className="pb-3 relative">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-full bg-gradient-to-r text-white",
                    getColorClasses(account.color).split(' ')[0],
                    getColorClasses(account.color).split(' ')[1]
                  )}>
                    {account.icon}
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-gray-900">
                      {account.name}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      {account.type}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="relative">
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatBalance(account.balance, account.currency)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    {account.changeType === 'positive' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={cn(
                      "text-sm font-medium",
                      account.changeType === 'positive' ? "text-green-600" : "text-red-600"
                    )}>
                      {account.change > 0 ? '+' : ''}{account.change}%
                    </span>
                    <span className="text-sm text-gray-500">this month</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">Last transaction</p>
                  <p className="text-sm text-gray-700 truncate">{account.lastTransaction}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Total Net Worth</h4>
              <p className="text-3xl font-bold text-gray-900">
                {formatBalance(13244.00, 'USD')}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">+8.7%</span>
                <span className="text-sm text-gray-500">from last month</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Assets</p>
              <p className="text-lg font-semibold text-green-600">
                {formatBalance(14495.75, 'USD')}
              </p>
              <p className="text-sm text-gray-600 mt-2 mb-1">Liabilities</p>
              <p className="text-lg font-semibold text-red-600">
                {formatBalance(1251.75, 'USD')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
