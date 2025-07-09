import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface NaturalLanguageInputProps {
  onSuccess?: () => void;
}

export function NaturalLanguageInput({ onSuccess }: NaturalLanguageInputProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const parseNaturalLanguage = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // Extract amount using regex
    const amountMatch = text.match(/\$?(\d+(?:\.\d{2})?)/);
    const amount = amountMatch ? parseFloat(amountMatch[1]) : 0;
    
    // Determine transaction type
    let type = 'expense';
    const incomeWords = ['earned', 'received', 'salary', 'income', 'paid', 'bonus', 'refund'];
    if (incomeWords.some(word => lowerText.includes(word))) {
      type = 'income';
    }
    
    // Extract category based on keywords
    let category = 'Other';
    const categoryMap = {
      'food': ['food', 'restaurant', 'lunch', 'dinner', 'breakfast', 'ate', 'meal', 'coffee', 'pizza', 'burger'],
      'transportation': ['gas', 'fuel', 'uber', 'taxi', 'bus', 'train', 'metro', 'parking', 'car'],
      'shopping': ['bought', 'purchase', 'store', 'amazon', 'shopping', 'clothes', 'shirt'],
      'entertainment': ['movie', 'cinema', 'game', 'concert', 'show', 'entertainment'],
      'bills': ['bill', 'electricity', 'water', 'internet', 'phone', 'rent', 'mortgage'],
      'groceries': ['grocery', 'groceries', 'supermarket', 'market', 'vegetables', 'bread'],
      'healthcare': ['doctor', 'hospital', 'medicine', 'pharmacy', 'health'],
      'salary': ['salary', 'paycheck', 'wage'],
      'freelance': ['freelance', 'project', 'client'],
    };
    
    for (const [cat, keywords] of Object.entries(categoryMap)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        if (cat === 'food') category = 'Food & Dining';
        else if (cat === 'transportation') category = 'Transportation';
        else if (cat === 'shopping') category = 'Shopping';
        else if (cat === 'entertainment') category = 'Entertainment';
        else if (cat === 'bills') category = 'Bills & Utilities';
        else if (cat === 'groceries') category = 'Groceries';
        else if (cat === 'healthcare') category = 'Healthcare';
        else if (cat === 'salary') category = 'Salary';
        else if (cat === 'freelance') category = 'Freelance';
        break;
      }
    }
    
    return {
      description: text,
      amount: type === 'expense' ? -Math.abs(amount) : Math.abs(amount),
      category,
      type,
      date: new Date().toISOString().split('T')[0]
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter a transaction description.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const parsedTransaction = parseNaturalLanguage(input);
      
      const { error } = await supabase
        .from('transactions')
        .insert([
          {
            ...parsedTransaction,
            user_id: user?.id,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Transaction added: ${parsedTransaction.description}`,
      });

      setInput("");
      onSuccess?.();
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <MessageSquare className="h-5 w-5" />
          <span>Quick Add with Natural Language</span>
          <Sparkles className="h-4 w-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try: 'Spent $25 on lunch at cafe' or 'Received $500 salary'"
              className="text-base"
              disabled={loading}
            />
            <p className="text-xs text-gray-500">
              Examples: "Bought groceries for $50", "Paid $120 for gas", "Earned $1000 freelance"
            </p>
          </div>
          
          <Button 
            type="submit" 
            disabled={loading || !input.trim()}
            className="w-full"
          >
            {loading ? "Adding..." : "Add Transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}