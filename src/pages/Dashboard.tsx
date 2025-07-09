
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Plus,
  Wallet,
  PieChart,
  BarChart3,
  Calendar,
  Search,
  Filter,
  Menu,
  Bell,
  Settings,
  User,
  Home,
  CreditCard,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  LogOut
} from "lucide-react";
import { TransactionInput } from "@/components/TransactionInput";
import { RecentTransactions } from "@/components/RecentTransactions";
import { FinancialChart } from "@/components/FinancialChart";
import { AccountCards } from "@/components/AccountCards";
import { EmptyState } from "@/components/EmptyState";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [showTransactionInput, setShowTransactionInput] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch accounts
      const { data: accountsData, error: accountsError } = await supabase
        .from('accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (accountsError) throw accountsError;

      // Fetch transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (transactionsError) throw transactionsError;

      // Fetch goals
      const { data: goalsData, error: goalsError } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (goalsError) throw goalsError;

      setAccounts(accountsData || []);
      setTransactions(transactionsData || []);
      setGoals(goalsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "No new notifications at this time.",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Settings panel coming soon!",
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-5 w-5 text-white animate-pulse" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Calculate financial data from real data
  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0);
  const monthlyIncome = transactions
    .filter(t => t.type === 'income' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense' && new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);
  const totalGoals = goals.reduce((sum, goal) => sum + Number(goal.target_amount), 0);
  const currentSavings = goals.reduce((sum, goal) => sum + Number(goal.current_amount), 0);

  const quickStats = [
    {
      title: "Total Balance",
      value: `$${totalBalance.toLocaleString()}`,
      change: "+12.5%",
      changeType: "positive" as const,
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      title: "Monthly Income",
      value: `$${monthlyIncome.toLocaleString()}`,
      change: "+8.2%",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "Monthly Expenses",
      value: `$${monthlyExpenses.toLocaleString()}`,
      change: "-3.1%",
      changeType: "negative" as const,
      icon: <TrendingDown className="h-6 w-6" />
    },
    {
      title: "Savings Progress",
      value: totalGoals > 0 ? `${Math.round((currentSavings / totalGoals) * 100)}%` : "0%",
      change: `$${currentSavings.toLocaleString()}`,
      changeType: "neutral" as const,
      icon: <Target className="h-6 w-6" />
    }
  ];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: <Home className="h-5 w-5" /> },
    { id: 'transactions', label: 'Transactions', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'accounts', label: 'Accounts', icon: <Wallet className="h-5 w-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'goals', label: 'Goals', icon: <Target className="h-5 w-5" /> }
  ];

  const hasData = accounts.length > 0 || transactions.length > 0 || goals.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">FinanceFlow</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleNotifications}>
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSettings}>
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Good morning, {user.user_metadata?.full_name || user.email}!
            </h1>
            <p className="text-gray-600">Here's your financial overview for today</p>
          </div>
          <Button 
            onClick={() => setShowTransactionInput(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white mt-4 sm:mt-0"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>

        {!hasData ? (
          <EmptyState onAddTransaction={() => setShowTransactionInput(true)} />
        ) : (
          <>
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickStats.map((stat, index) => (
                <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          {stat.changeType === 'positive' && <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />}
                          {stat.changeType === 'negative' && <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />}
                          <span className={cn(
                            "text-sm font-medium",
                            stat.changeType === 'positive' && "text-green-600",
                            stat.changeType === 'negative' && "text-red-600",
                            stat.changeType === 'neutral' && "text-gray-600"
                          )}>
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div className={cn(
                        "p-3 rounded-full",
                        stat.changeType === 'positive' && "bg-green-100 text-green-600",
                        stat.changeType === 'negative' && "bg-red-100 text-red-600",
                        stat.changeType === 'neutral' && "bg-blue-100 text-blue-600"
                      )}>
                        {stat.icon}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                    activeTab === item.id
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Charts and Analytics */}
              <div className="lg:col-span-2 space-y-6">
                <FinancialChart transactions={transactions} />
                {activeTab === 'accounts' && <AccountCards accounts={accounts} onRefresh={fetchData} />}
              </div>

              {/* Recent Transactions */}
              <div className="lg:col-span-1">
                <RecentTransactions transactions={transactions} />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Transaction Input Modal */}
      <TransactionInput 
        isOpen={showTransactionInput}
        onClose={() => setShowTransactionInput(false)}
        onSuccess={fetchData}
      />
    </div>
  );
};

export default Dashboard;
