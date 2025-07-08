
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ArrowLeftRight,
  MoreHorizontal,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

export const RecentTransactions = () => {
  const transactions = [
    {
      id: 1,
      description: "Grocery Shopping",
      amount: -156.78,
      category: "Grocery",
      account: "Bank Account",
      date: "2024-01-15",
      type: "expense" as const
    },
    {
      id: 2,
      description: "Salary Deposit",
      amount: 4500.00,
      category: "Salary",
      account: "Bank Account",
      date: "2024-01-15",
      type: "income" as const
    },
    {
      id: 3,
      description: "Coffee Shop",
      amount: -12.50,
      category: "Food & Dining",
      account: "Credit Card",
      date: "2024-01-14",
      type: "expense" as const
    },
    {
      id: 4,
      description: "Transfer to Savings",
      amount: -500.00,
      category: "Transfer",
      account: "Bank Account",
      date: "2024-01-14",
      type: "transfer" as const
    },
    {
      id: 5,
      description: "Uber Ride",
      amount: -25.30,
      category: "Transportation",
      account: "Credit Card",
      date: "2024-01-13",
      type: "expense" as const
    },
    {
      id: 6,
      description: "Freelance Payment",
      amount: 850.00,
      category: "Freelance",
      account: "Bank Account",
      date: "2024-01-12",
      type: "income" as const
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'expense':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'transfer':
        return <ArrowLeftRight className="h-4 w-4 text-blue-600" />;
      default:
        return <ArrowUpRight className="h-4 w-4 text-gray-600" />;
    }
  };

  const getAmountColor = (amount: number) => {
    if (amount > 0) return "text-green-600";
    if (amount < 0) return "text-red-600";
    return "text-gray-600";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <Card className="h-fit bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                {getTransactionIcon(transaction.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {transaction.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {transaction.account}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={cn("text-sm font-semibold", getAmountColor(transaction.amount))}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(transaction.date)}
              </p>
            </div>
          </div>
        ))}
        
        <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700">
          View All Transactions
        </Button>
      </CardContent>
    </Card>
  );
};
