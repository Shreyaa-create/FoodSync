import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { TopBar } from '@/components/TopBar';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ImpactSection } from '@/components/ImpactSection';
import { getKPIs } from '@/services/api';
import type { KPIs } from '@/services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Leaf, Users, DollarSign } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', donated: 45, wasted: 8 },
  { day: 'Tue', donated: 52, wasted: 5 },
  { day: 'Wed', donated: 38, wasted: 12 },
  { day: 'Thu', donated: 65, wasted: 3 },
  { day: 'Fri', donated: 78, wasted: 7 },
  { day: 'Sat', donated: 95, wasted: 10 },
  { day: 'Sun', donated: 70, wasted: 6 },
];

const categoryData = [
  { name: 'Rice & Grains', value: 35 },
  { name: 'Sandwiches', value: 25 },
  { name: 'Salads', value: 20 },
  { name: 'Pastries', value: 12 },
  { name: 'Other', value: 8 },
];

const COLORS = ['hsl(142, 76%, 36%)', 'hsl(142, 60%, 50%)', 'hsl(36, 100%, 50%)', 'hsl(200, 80%, 50%)', 'hsl(0, 0%, 60%)'];

export default function VendorAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<KPIs | null>(null);

  useEffect(() => {
    getKPIs().then(k => { setKpis(k); setLoading(false); });
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role="vendor" />
      <div className="flex-1 flex flex-col">
        <TopBar role="vendor" />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-[1200px] mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Analytics & Impact</h1>
              <p className="text-muted-foreground mt-1">Track your sustainability metrics and donation performance.</p>
            </div>

            {loading ? (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">{[1,2,3,4].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}</div>
                <Skeleton className="h-80 rounded-2xl" />
              </div>
            ) : (
              <>
                {/* Summary Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Food Saved', value: kpis?.foodSaved ?? 0, suffix: ' kg', icon: Leaf, color: 'text-primary' },
                    { label: 'People Fed', value: kpis?.peopleFed ?? 0, icon: Users, color: 'text-info' },
                    { label: 'Cost Saved', value: 12400, prefix: '$', icon: DollarSign, color: 'text-accent' },
                    { label: 'Prediction Accuracy', value: 91, suffix: '%', icon: TrendingUp, color: 'text-primary' },
                  ].map(s => (
                    <div key={s.label} className="glass-card p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                        <s.icon className={`w-4 h-4 ${s.color}`} />
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        {s.prefix}<AnimatedCounter end={s.value} suffix={s.suffix} />
                      </p>
                    </div>
                  ))}
                </div>

                {/* Charts */}
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">WEEKLY DONATION VS WASTE</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="day" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Bar dataKey="donated" fill="hsl(142, 76%, 36%)" radius={[6, 6, 0, 0]} name="Donated" />
                        <Bar dataKey="wasted" fill="hsl(36, 100%, 50%)" radius={[6, 6, 0, 0]} name="Wasted" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="glass-card p-6">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-4">DONATION BY CATEGORY</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                          {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-4">
                      {categoryData.map((c, i) => (
                        <div key={c.name} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                            <span className="text-muted-foreground">{c.name}</span>
                          </div>
                          <span className="font-medium text-foreground">{c.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Impact */}
                <ImpactSection foodSaved={kpis?.foodSaved ?? 0} peopleFed={kpis?.peopleFed ?? 0} impactScore={kpis?.impactScore ?? 0} />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
