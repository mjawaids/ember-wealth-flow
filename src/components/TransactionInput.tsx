
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  DollarSign, 
  Calendar, 
  Tag, 
  Wallet, 
  MessageSquare,
  Sparkles,
  Plus
} from "lucide-react";

interface TransactionInputProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionInput = ({ isOpen, onClose }: TransactionInputProps) => {
  const [naturalInput, setNaturalInput] = useState("");
  const [parsedTransaction, setParsedTransaction] = useState({
    amount: "",
    account: "",
    category: "",
    type: "expense",
    date: "",
    description: ""
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock data for dropdowns - in real app, these would come from user's accounts
  const accounts = ["Cash", "Bank Account", "Credit Card", "Savings"];
  const categories = ["Grocery", "Food & Dining", "Transportation", "Shopping", "Entertainment", "Bills", "Healthcare"];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const parseNaturalLanguage = (input: string) => {
    const parsed = { ...parsedTransaction };
    
    // Parse amount (numbers with currency symbols)
    const amountMatch = input.match(/(?:[$₹€£])?(\d+(?:\.\d{2})?)/);
    if (amountMatch) {
      parsed.amount = amountMatch[1];
    }
    
    // Parse account (after #)
    const accountMatch = input.match(/#(\w+)/i);
    if (accountMatch) {
      const account = accounts.find(acc => 
        acc.toLowerCase().includes(accountMatch[1].toLowerCase())
      );
      parsed.account = account || accountMatch[1];
    }
    
    // Parse category (after @)
    const categoryMatch = input.match(/@(\w+)/i);
    if (categoryMatch) {
      const category = categories.find(cat => 
        cat.toLowerCase().includes(categoryMatch[1].toLowerCase())
      );
      parsed.category = category || categoryMatch[1];
    }
    
    // Parse date
    const today = new Date().toISOString().split('T')[0];
    if (input.toLowerCase().includes('today')) {
      parsed.date = today;
    } else if (input.toLowerCase().includes('yesterday')) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      parsed.date = yesterday.toISOString().split('T')[0];
    } else if (input.toLowerCase().includes('tomorrow')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      parsed.date = tomorrow.toISOString().split('T')[0];
    } else {
      parsed.date = today;
    }
    
    // Extract description (remaining text after removing parsed elements)
    let description = input
      .replace(/(?:[$₹€£])?\d+(?:\.\d{2})?/, '')
      .replace(/#\w+/i, '')
      .replace(/@\w+/i, '')
      .replace(/\b(today|yesterday|tomorrow)\b/i, '')
      .trim();
    
    parsed.description = description || "";
    
    setParsedTransaction(parsed);
  };

  const handleNaturalInputChange = (value: string) => {
    setNaturalInput(value);
    if (value.trim()) {
      parseNaturalLanguage(value);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add transactions.",
        variant: "destructive"
      });
      return;
    }

    if (!parsedTransaction.amount) {
      toast({
        title: "Missing Amount",
        description: "Please enter an amount for the transaction.",
        variant: "destructive"
      });
      return;
    }

    if (!parsedTransaction.category) {
      toast({
        title: "Missing Category",
        description: "Please select a category for the transaction.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          amount: parseFloat(parsedTransaction.amount),
          description: parsedTransaction.description || `${parsedTransaction.type} transaction`,
          category: parsedTransaction.category,
          type: parsedTransaction.type,
          date: parsedTransaction.date || new Date().toISOString().split('T')[0]
        });

      if (error) {
        console.error('Error creating transaction:', error);
        toast({
          title: "Error",
          description: "Failed to create transaction. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Transaction Added!",
          description: `${parsedTransaction.type === 'expense' ? 'Expense' : 'Income'} of $${parsedTransaction.amount} recorded successfully.`,
        });
        
        // Reset form
        setNaturalInput("");
        setParsedTransaction({
          amount: "",
          account: "",
          category: "",
          type: "expense",
          date: "",
          description: ""
        });
        onClose();
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exampleInputs = [
    "200 #Bank @Grocery eggs bread today",
    "50 #Cash @Food pizza lunch",
    "1500 #Bank @Salary income",
    "25 #Card @Transport uber ride"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <span>Add Transaction</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Natural Language Input */}
          <div className="space-y-2">
            <Label htmlFor="natural-input" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Natural Language Input</span>
            </Label>
            <Input
              ref={inputRef}
              id="natural-input"
              placeholder="Try: 200 #Bank @Grocery eggs bread today"
              value={naturalInput}
              onChange={(e) => handleNaturalInputChange(e.target.value)}
              className="text-lg h-12"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {exampleInputs.map((example, index) => (
                <Badge 
                  key={index}
                  variant="outline" 
                  className="cursor-pointer hover:bg-blue-50"
                  onClick={() => handleNaturalInputChange(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>

          {/* Parsed Transaction Preview */}
          {(parsedTransaction.amount || parsedTransaction.account || parsedTransaction.category) && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Parsed Transaction:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {parsedTransaction.amount && (
                  <div className="bg-white p-2 rounded">
                    <div className="text-gray-600">Amount</div>
                    <div className="font-medium">${parsedTransaction.amount}</div>
                  </div>
                )}
                {parsedTransaction.account && (
                  <div className="bg-white p-2 rounded">
                    <div className="text-gray-600">Account</div>
                    <div className="font-medium">{parsedTransaction.account}</div>
                  </div>
                )}
                {parsedTransaction.category && (
                  <div className="bg-white p-2 rounded">
                    <div className="text-gray-600">Category</div>
                    <div className="font-medium">{parsedTransaction.category}</div>
                  </div>
                )}
                {parsedTransaction.date && (
                  <div className="bg-white p-2 rounded">
                    <div className="text-gray-600">Date</div>
                    <div className="font-medium">{parsedTransaction.date}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Advanced Form */}
          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full"
            >
              {showAdvanced ? "Hide" : "Show"} Advanced Options
            </Button>

            {showAdvanced && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={parsedTransaction.amount}
                      onChange={(e) => setParsedTransaction({...parsedTransaction, amount: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={parsedTransaction.type} 
                    onValueChange={(value) => setParsedTransaction({...parsedTransaction, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expense">Expense</SelectItem>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="transfer">Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Select 
                      value={parsedTransaction.category} 
                      onValueChange={(value) => setParsedTransaction({...parsedTransaction, category: value})}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="date"
                      type="date"
                      value={parsedTransaction.date}
                      onChange={(e) => setParsedTransaction({...parsedTransaction, date: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Optional description..."
                    value={parsedTransaction.description}
                    onChange={(e) => setParsedTransaction({...parsedTransaction, description: e.target.value})}
                    rows={2}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isLoading ? "Adding..." : "Add Transaction"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
