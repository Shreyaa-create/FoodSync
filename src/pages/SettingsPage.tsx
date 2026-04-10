import { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { TopBar } from '@/components/TopBar';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { User, Bell, Shield, Palette, MapPin, Save } from 'lucide-react';

export default function SettingsPage({ role }: { role: 'vendor' | 'ngo' }) {
  const { userName } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({ surplus: true, donations: true, predictions: false, weekly: true });

  const handleSave = () => toast.success('Settings saved successfully!');

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role={role} />
      <div className="flex-1 flex flex-col">
        <TopBar role={role} />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-[800px] mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
            </div>

            {/* Profile */}
            <div className="glass-card p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Profile</h3>
              </div>
              <div className="grid gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Organization Name</label>
                  <input defaultValue={userName || ''} className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <input defaultValue={role === 'vendor' ? 'vendor@greenbistro.com' : 'admin@cityfoodbank.org'} className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Phone</label>
                  <input defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="glass-card p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Location</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Address</label>
                  <input defaultValue="123 Main Street" className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">City</label>
                  <input defaultValue="San Francisco" className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="glass-card p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <Palette className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Appearance</h3>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Toggle between light and dark themes</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`w-12 h-7 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-muted'} relative`}
                >
                  <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'left-6' : 'left-1'}`} />
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="glass-card p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Notifications</h3>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'surplus' as const, label: 'Surplus Alerts', desc: 'Get notified when surplus is detected' },
                  { key: 'donations' as const, label: 'Donation Updates', desc: 'Track donation status changes' },
                  { key: 'predictions' as const, label: 'Daily Predictions', desc: 'Receive daily demand forecasts' },
                  { key: 'weekly' as const, label: 'Weekly Report', desc: 'Summary of your weekly impact' },
                ].map(n => (
                  <div key={n.key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.label}</p>
                      <p className="text-xs text-muted-foreground">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                      className={`w-12 h-7 rounded-full transition-colors ${notifications[n.key] ? 'bg-primary' : 'bg-muted'} relative`}
                    >
                      <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications[n.key] ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="glass-card p-6 space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Security</h3>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Change Password</label>
                <input type="password" placeholder="New password" className="w-full px-3 py-2.5 rounded-xl bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>

            <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground gap-2 h-11">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
