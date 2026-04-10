import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { TopBar } from '@/components/TopBar';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { CheckCircle, Package, TrendingUp, Calendar } from 'lucide-react';

const historyData = [
  { id: '1', vendor: 'Green Bistro', items: 'Rice Bowls, Sandwiches', qty: 50, date: 'Apr 10, 2026', rating: 5 },
  { id: '2', vendor: 'Fresh Market', items: 'Salads, Soup', qty: 35, date: 'Apr 9, 2026', rating: 4 },
  { id: '3', vendor: "Baker's Delight", items: 'Pastries, Bread', qty: 28, date: 'Apr 8, 2026', rating: 5 },
  { id: '4', vendor: 'Green Bistro', items: 'Pasta, Rice Bowls', qty: 42, date: 'Apr 7, 2026', rating: 5 },
  { id: '5', vendor: 'Fresh Market', items: 'Sandwiches', qty: 20, date: 'Apr 5, 2026', rating: 4 },
  { id: '6', vendor: 'City Deli', items: 'Wraps, Salads', qty: 30, date: 'Apr 3, 2026', rating: 5 },
];

export default function NGOHistoryPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role="ngo" />
      <div className="flex-1 flex flex-col">
        <TopBar role="ngo" />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-[1200px] mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Pickup History</h1>
              <p className="text-muted-foreground mt-1">Review your completed pickups and impact metrics.</p>
            </div>

            {loading ? (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">{[1,2,3].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}</div>
                <Skeleton className="h-60 rounded-2xl" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Pickups', value: 128, icon: CheckCircle, color: 'text-primary' },
                    { label: 'Meals Received', value: 8450, icon: Package, color: 'text-accent' },
                    { label: 'This Month', value: 24, icon: Calendar, color: 'text-info' },
                    { label: 'Reliability Score', value: 94, suffix: '%', icon: TrendingUp, color: 'text-primary' },
                  ].map(s => (
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

                <div className="space-y-3">
                  {historyData.map(h => (
                    <div key={h.id} className="glass-card p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{h.items}</p>
                            <p className="text-sm text-muted-foreground">{h.vendor} · {h.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">{h.qty} meals</p>
                          <p className="text-xs text-primary">{'⭐'.repeat(h.rating)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
