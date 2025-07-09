
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
  EyeOff,
  Banknote
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  currency: string;
  is_active: boolean;
}

interface AccountCardsProps {
  accounts: Account[];
  onRefresh: () => void;
}

export const AccountCards = ({ accounts, onRefresh }: AccountCardsProps) => {
  const [showBalances, setShowBalances] = useState(true);

  const getAccountIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'checking':
      case 'bank':
        return <Building2 className="h-6 w-6" />;
      case 'credit':
      case 'credit card':
        return <CreditCard className="h-6 w-6" />;
      case 'savings':
        return <PiggyBank className="h-6 w-6" />;
      case 'cash':
        return <Wallet className="h-6 w-6" />;
      default:
        return <Banknote className="h-6 w-6" />;
    }
  };

  const getColorClasses = (type: string) => {
    const typeColors = {
      'checking': "from-blue-500 to-blue-600 text-blue-600",
      'bank': "from-blue-500 to-blue-600 text-blue-600",
      'credit': "from-purple-500 to-purple-600 text-purple-600",
      'credit card': "from-purple-500 to-purple-600 text-purple-600",
      'savings': "from-green-500 to-green-600 text-green-600",
      'cash': "from-orange-500 to-orange-600 text-orange-600"
    };
    return typeColors[type.toLowerCase() as keyof typeof typeColors] || "from-gray-500 to-gray-600 text-gray-600";
  };

  const formatBalance = (balance: number, currency: string) => {
    if (!showBalances) return "****";
    return `${balance < 0 ? '-' : ''}${currency === 'USD' ? '$' : ''}${Math.abs(balance).toLocaleString()}`;
  };

  if (accounts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Your Accounts</h3>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="py-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm mb-2">No accounts yet</p>
              <p className="text-gray-400 text-xs mb-4">
                Add your bank accounts, credit cards, and cash accounts to track your finances
              </p>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalAssets = accounts
    .filter(account => Number(account.balance) > 0)
    .reduce((sum, account) => sum + Number(account.balance), 0);
  
  const totalLiabilities = accounts
    .filter(account => Number(account.balance) < 0)
    .reduce((sum, account) => sum + Math.abs(Number(account.balance)), 0);
  
  const netWorth = totalAssets - totalLiabilities;

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
              getColorClasses(account.type).split(' ')[0],
              getColorClasses(account.type).split(' ')[1]
            )} />
            
            <CardHeader className="pb-3 relative">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-full bg-gradient-to-r text-white",
                    getColorClasses(account.type).split(' ')[0],
                    getColorClasses(account.type).split(' ')[1]
                  )}>
                    {getAccountIcon(account.type)}
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
                    {formatBalance(Number(account.balance), account.currency)}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm text-gray-500">
                      {account.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
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
                {formatBalance(netWorth, 'USD')}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">Calculated from your accounts</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Assets</p>
              <p className="text-lg font-semibold text-green-600">
                {formatBalance(totalAssets, 'USD')}
              </p>
              <p className="text-sm text-gray-600 mt-2 mb-1">Liabilities</p>
              <p className="text-lg font-semibold text-red-600">
                {formatBalance(totalLiabilities, 'USD')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
