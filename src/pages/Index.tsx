
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Wallet, 
  PieChart, 
  Smartphone, 
  Shield, 
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
  DollarSign,
  BarChart3,
  Target
} from "lucide-react";
import { AuthModal } from "@/components/AuthModal";
import { cn } from "@/lib/utils";

const Index = () => {
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);

  const features = [
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Smart Account Management",
      description: "Connect multiple accounts, track balances, and manage transfers seamlessly"
    },
    {
      icon: <PieChart className="h-8 w-8" />,
      title: "Intelligent Categories",
      description: "Auto-categorize expenses with AI and create custom categories with subcategories"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Natural Language Input",
      description: "Type '200 #Bank @Grocery eggs today' and watch magic happen"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Beautiful charts, spending insights, and financial goal tracking"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Offline-First PWA",
      description: "Works offline, syncs online. Install on any device for native experience"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Bank-Level Security",
      description: "Your financial data is encrypted and secure with industry standards"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "Finally, a finance app that understands how I think. The natural language input is revolutionary!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Freelancer",
      content: "Managing multiple income streams has never been easier. The dashboard gives me complete clarity.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Student",
      content: "Love the wallet feature for budgeting. Helps me stay on track with my monthly expenses.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FinanceFlow</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10"
                onClick={() => setAuthModal('signin')}
              >
                Sign In
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                onClick={() => setAuthModal('signup')}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <Badge className="mb-8 bg-blue-500/20 text-blue-300 border-blue-400/50">
              ✨ Smart Personal Finance Management
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Take Control of Your
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Financial Future</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Track expenses, manage budgets, and grow your wealth with our intelligent personal finance platform. 
              Natural language input, offline sync, and beautiful insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
                onClick={() => setAuthModal('signup')}
              >
                Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                onClick={() => setAuthModal('signin')}
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Free forever • No credit card required • 2-minute setup
            </p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 animate-float">
          <div className="bg-green-500/20 p-4 rounded-full backdrop-blur-sm">
            <DollarSign className="h-6 w-6 text-green-400" />
          </div>
        </div>
        <div className="absolute top-1/3 right-10 animate-float" style={{ animationDelay: '1s' }}>
          <div className="bg-blue-500/20 p-4 rounded-full backdrop-blur-sm">
            <TrendingUp className="h-6 w-6 text-blue-400" />
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="bg-purple-500/20 p-4 rounded-full backdrop-blur-sm">
            <Target className="h-6 w-6 text-purple-400" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Manage Money
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to make personal finance simple, intuitive, and effective
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={cn(
                  "bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group",
                  "hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                )}
              >
                <CardContent className="p-8">
                  <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Natural Language Demo */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Type Like You Think
            </h2>
            <p className="text-xl text-gray-300">
              Our natural language processing understands your financial language
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gray-900/50 backdrop-blur-lg border-gray-700/50">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-green-400">
                    <span className="text-gray-500">$</span> 200 #Bank @Grocery eggs bread today
                  </div>
                  <div className="text-gray-300 text-sm">Automatically parsed as:</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-500/20 p-3 rounded">
                      <div className="text-blue-300 font-semibold">Amount</div>
                      <div className="text-white">$200</div>
                    </div>
                    <div className="bg-green-500/20 p-3 rounded">
                      <div className="text-green-300 font-semibold">Account</div>
                      <div className="text-white">Bank</div>
                    </div>
                    <div className="bg-purple-500/20 p-3 rounded">
                      <div className="text-purple-300 font-semibold">Category</div>
                      <div className="text-white">Grocery</div>
                    </div>
                    <div className="bg-orange-500/20 p-3 rounded">
                      <div className="text-orange-300 font-semibold">Date</div>
                      <div className="text-white">Today</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Loved by Thousands
            </h2>
            <p className="text-xl text-gray-300">
              See what our users say about FinanceFlow
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who have taken control of their financial future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
              onClick={() => setAuthModal('signup')}
            >
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              Free forever
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              No credit card
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              2-min setup
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FinanceFlow</span>
            </div>
            <div className="text-gray-400">
              Created with ❤️ by{" "}
              <a 
                href="http://Jawaid.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Jawaid.dev
              </a>
            </div>
          </div>
        </div>
      </footer>

      <AuthModal 
        isOpen={!!authModal} 
        onClose={() => setAuthModal(null)}
        mode={authModal || 'signin'}
      />
    </div>
  );
};

export default Index;
