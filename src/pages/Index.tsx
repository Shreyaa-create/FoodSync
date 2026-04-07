import { Link } from 'react-router-dom';
import { Leaf, ArrowRight, BarChart3, Heart, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-primary rounded-lg">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FoodSync</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/vendor">
              <Button variant="outline" size="sm">Vendor Login</Button>
            </Link>
            <Link to="/ngo">
              <Button size="sm" className="bg-primary text-primary-foreground">NGO Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-20 text-center" style={{ animation: 'slideUp 0.6s ease-out' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Agentic AI-Powered Food Redistribution
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
            Predict demand.{' '}
            <span className="gradient-text">Eliminate waste.</span>{' '}
            Feed communities.
          </h1>
          <p className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto">
            FoodSync uses intelligent AI agents to predict food demand, detect surplus automatically, and redistribute it to those who need it most.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link to="/vendor">
              <Button size="lg" className="bg-primary text-primary-foreground gap-2 px-8 h-12 text-base">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/vendor">
              <Button size="lg" variant="outline" className="gap-2 h-12 text-base">
                View Demo
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: 'Demand Prediction', desc: 'AI analyzes historical data, weather, and trends to forecast demand accurately.' },
              { icon: Shield, title: 'Autonomous Detection', desc: 'Smart agents continuously monitor and detect surplus before food goes to waste.' },
              { icon: Zap, title: 'Instant Redistribution', desc: 'One-click donation matching connects surplus food with nearby NGOs in seconds.' },
            ].map((f, i) => (
              <div key={f.title} className="glass-card p-6 hover:shadow-lg transition-all duration-300" style={{ animation: `slideUp ${0.8 + i * 0.15}s ease-out` }}>
                <div className="p-3 bg-primary/10 rounded-xl w-fit">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mt-4">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-border bg-card/50">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: '1,240 kg', label: 'Food Saved' },
                { value: '3,860', label: 'People Fed' },
                { value: '87/100', label: 'Impact Score' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © 2026 FoodSync. Built with AI to reduce food waste.
      </footer>
    </div>
  );
}
