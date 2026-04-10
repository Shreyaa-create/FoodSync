import { Link, useLocation } from 'react-router-dom';
import { BarChart3, AlertTriangle, Heart, Settings, Home, TrendingUp, Leaf, Clock } from 'lucide-react';

const vendorLinks = [
  { to: '/vendor', icon: Home, label: 'Dashboard' },
  { to: '/vendor/predictions', icon: TrendingUp, label: 'Predictions' },
  { to: '/vendor/surplus', icon: AlertTriangle, label: 'Surplus' },
  { to: '/vendor/donations', icon: Heart, label: 'Donations' },
  { to: '/vendor/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/vendor/settings', icon: Settings, label: 'Settings' },
];

const ngoLinks = [
  { to: '/ngo', icon: Home, label: 'Dashboard' },
  { to: '/ngo/donations', icon: Heart, label: 'Donations' },
  { to: '/ngo/history', icon: Clock, label: 'History' },
  { to: '/ngo/settings', icon: Settings, label: 'Settings' },
];

export function AppSidebar({ role }: { role: 'vendor' | 'ngo' }) {
  const location = useLocation();
  const links = role === 'vendor' ? vendorLinks : ngoLinks;

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="p-1.5 bg-primary rounded-lg">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">FoodSync</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1.5">
          {role === 'vendor' ? 'Vendor Portal' : 'NGO Portal'}
        </p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.label}
              to={link.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}
              `}
            >
              <link.icon className="w-4.5 h-4.5" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 m-3 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-xs font-medium text-primary">AI Agent Active</p>
        <p className="text-xs text-muted-foreground mt-0.5">Monitoring surplus in real-time</p>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
    </aside>
  );
}
