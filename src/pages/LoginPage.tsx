import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Leaf, ArrowLeft, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const role = (searchParams.get('role') as 'vendor' | 'ngo') || 'vendor';
  const [email, setEmail] = useState(role === 'vendor' ? 'vendor@greenbistro.com' : 'admin@cityfoodbank.org');
  const [password, setPassword] = useState('••••••••');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login(role);
    navigate(role === 'vendor' ? '/vendor' : '/ngo');
  };

  const roleLabel = role === 'vendor' ? 'Vendor' : 'NGO';
  const roleColor = role === 'vendor' ? 'primary' : 'info';

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="glass-card p-8 space-y-6" style={{ animation: 'slideUp 0.5s ease-out' }}>
          <div className="text-center space-y-2">
            <div className="inline-flex p-2 bg-primary rounded-xl mx-auto">
              <Leaf className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Sign in to FoodSync</h1>
            <p className="text-sm text-muted-foreground">{roleLabel} Portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground gap-2 h-11">
              <LogIn className="w-4 h-4" />
              {loading ? 'Signing in...' : `Sign in as ${roleLabel}`}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            Demo credentials are pre-filled. Just click sign in.
          </p>
        </div>
      </div>
    </div>
  );
}
