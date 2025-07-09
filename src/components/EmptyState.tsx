
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, TrendingUp, CreditCard, Target, Lightbulb } from "lucide-react";

interface EmptyStateProps {
  onAddTransaction: () => void;
}

export const EmptyState = ({ onAddTransaction }: EmptyStateProps) => {
  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="h-24 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-yellow-800" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to FinanceFlow!
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You're ready to take control of your finances! Let's get started by adding your first transaction.
          </p>
          <Button 
            onClick={onAddTransaction}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Your First Transaction
          </Button>
        </CardContent>
      </Card>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Track Transactions</h3>
            <p className="text-sm text-gray-600">
              Add your income and expenses to see where your money is going
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Set Goals</h3>
            <p className="text-sm text-gray-600">
              Create savings goals and track your progress towards achieving them
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">View Analytics</h3>
            <p className="text-sm text-gray-600">
              Get insights into your spending patterns with beautiful charts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Start Tips</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                1
              </div>
              <p className="text-sm text-gray-600">
                Start by adding a few recent transactions to see your spending patterns
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                2
              </div>
              <p className="text-sm text-gray-600">
                Create accounts for your bank accounts, credit cards, and cash
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
              <p className="text-sm text-gray-600">
                Set up savings goals to stay motivated and track your progress
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
