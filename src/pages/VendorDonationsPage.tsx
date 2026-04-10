import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { TopBar } from '@/components/TopBar';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Heart, CheckCircle, Clock, Truck, Package, MapPin, Star } from 'lucide-react';

interface DonationRecord {
  id: string;
  ngoName: string;
  items: string;
  quantity: number;
  date: string;
  status: 'completed' | 'in_transit' | 'scheduled' | 'pending';
  distance: number;
}

const mockDonationHistory: DonationRecord[] = [
  { id: '1', ngoName: 'City Food Bank', items: 'Rice Bowls, Sandwiches', quantity: 50, date: 'Today, 6:45 PM', status: 'in_transit', distance: 1.2 },
  { id: '2', ngoName: 'Hope Kitchen', items: 'Pasta, Salads', quantity: 35, date: 'Yesterday, 7:30 PM', status: 'completed', distance: 2.8 },
  { id: '3', ngoName: 'Community Pantry', items: 'Sandwiches, Pastries', quantity: 28, date: 'Apr 7, 8:00 PM', status: 'completed', distance: 3.5 },
  { id: '4', ngoName: 'City Food Bank', items: 'Rice Bowls', quantity: 15, date: 'Apr 6, 6:45 PM', status: 'completed', distance: 1.2 },
  { id: '5', ngoName: 'Helping Hands', items: 'Fresh Salads, Soup', quantity: 42, date: 'Apr 5, 7:00 PM', status: 'completed', distance: 4.1 },
  { id: '6', ngoName: 'Hope Kitchen', items: 'Bread, Pastries', quantity: 20, date: 'Apr 3, 6:30 PM', status: 'completed', distance: 2.8 },
];

const statusConfig = {
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-primary bg-primary/10' },
  in_transit: { label: 'In Transit', icon: Truck, color: 'text-accent bg-accent/10' },
  scheduled: { label: 'Scheduled', icon: Clock, color: 'text-info bg-info/10' },
  pending: { label: 'Pending', icon: Package, color: 'text-muted-foreground bg-muted' },
};

export default function VendorDonationsPage() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in_transit' | 'scheduled'>('all');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = filter === 'all' ? mockDonationHistory : mockDonationHistory.filter(d => d.status === filter);

  const stats = [
    { label: 'Total Donations', value: 48, icon: Heart, color: 'text-primary' },
    { label: 'Meals Donated', value: 3420, icon: Package, color: 'text-accent' },
    { label: 'NGOs Helped', value: 6, icon: Star, color: 'text-info' },
    { label: 'Avg. Distance', value: 2.6, suffix: ' km', icon: MapPin, color: 'text-muted-foreground' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role="vendor" />
      <div className="flex-1 flex flex-col">
        <TopBar role="vendor" />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-[1200px] mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Donation History</h1>
              <p className="text-muted-foreground mt-1">Track all your food donations and their impact.</p>
            </div>

            {loading ? (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}</div>
                <Skeleton className="h-60 rounded-2xl" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map(s => (
                    <div key={s.label} className="glass-card p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                        <s.icon className={`w-4 h-4 ${s.color}`} />
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        <AnimatedCounter end={s.value} suffix={s.suffix} />
                      </p>
                    </div>
                  ))}
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2">
                  {(['all', 'completed', 'in_transit', 'scheduled'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
                    >
                      {f === 'all' ? 'All' : f === 'in_transit' ? 'In Transit' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Donation List */}
                <div className="space-y-3">
                  {filtered.map(d => {
                    const cfg = statusConfig[d.status];
                    return (
                      <div key={d.id} className="glass-card p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl ${cfg.color}`}>
                              <cfg.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-foreground">{d.items}</p>
                              <p className="text-sm text-muted-foreground">{d.ngoName} · {d.distance} km · {d.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-foreground">{d.quantity} meals</p>
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
