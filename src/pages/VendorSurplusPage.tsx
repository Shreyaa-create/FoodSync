import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { TopBar } from '@/components/TopBar';
import { getSurplus, getNearbyNGOs } from '@/services/api';
import type { SurplusItem, NGO } from '@/services/api';
import { SurplusAlert } from '@/components/SurplusAlert';
import { NGOMap } from '@/components/NGOMap';
import { TrustScore } from '@/components/TrustScore';
import { DonationFlow } from '@/components/DonationFlow';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { AlertTriangle, Clock, TrendingDown, Recycle } from 'lucide-react';
import { AnimatedCounter } from '@/components/AnimatedCounter';

export default function VendorSurplusPage() {
  const [loading, setLoading] = useState(true);
  const [surplus, setSurplus] = useState<SurplusItem[]>([]);
  const [totalMeals, setTotalMeals] = useState(0);
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [bestMatch, setBestMatch] = useState<NGO | null>(null);
  const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);
  const [showDonationFlow, setShowDonationFlow] = useState(false);

  useEffect(() => {
    Promise.all([getSurplus(), getNearbyNGOs()]).then(([s, n]) => {
      setSurplus(s.items);
      setTotalMeals(s.totalMeals);
      setNgos(n);
      setBestMatch(n[0]);
      setSelectedNGO(n[0]);
      setLoading(false);
    });
  }, []);

  const stats = [
    { label: 'Active Surplus', value: totalMeals, suffix: ' meals', icon: AlertTriangle, color: 'text-accent' },
    { label: 'Expiring < 2hrs', value: surplus.filter(s => s.urgency === 'high').length, suffix: ' items', icon: Clock, color: 'text-destructive' },
    { label: 'Waste Prevented (Month)', value: 847, suffix: ' kg', icon: TrendingDown, color: 'text-primary' },
    { label: 'Recycled Items', value: 23, suffix: '', icon: Recycle, color: 'text-info' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role="vendor" />
      <div className="flex-1 flex flex-col">
        <TopBar role="vendor" />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-[1200px] mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Surplus Management</h1>
              <p className="text-muted-foreground mt-1">Monitor detected surplus and initiate redistribution to nearby NGOs.</p>
            </div>

            {loading ? (
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}
                </div>
                <Skeleton className="h-60 rounded-2xl" />
              </div>
            ) : (
              <>
                {/* Stats */}
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

                {/* Surplus Items + Map */}
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <SurplusAlert items={surplus} totalMeals={totalMeals} bestMatch={bestMatch} onDonate={() => setShowDonationFlow(true)} />
                  </div>
                  <div className="space-y-6">
                    <NGOMap ngos={ngos} bestMatchId={bestMatch?.id} selectedNGO={selectedNGO} onSelectNGO={setSelectedNGO} />
                    {selectedNGO && <TrustScore ngo={selectedNGO} />}
                  </div>
                </div>

                {/* Surplus History */}
                <div className="glass-card p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4">RECENT SURPLUS HISTORY</h3>
                  <div className="space-y-3">
                    {[
                      { date: 'Today, 6:30 PM', items: 'Rice Bowls, Sandwiches', qty: 50, status: 'Pending redistribution' },
                      { date: 'Yesterday, 7:15 PM', items: 'Pasta, Salads', qty: 35, status: 'Donated to City Food Bank' },
                      { date: 'Apr 7, 8:00 PM', items: 'Sandwiches, Pastries', qty: 28, status: 'Donated to Hope Kitchen' },
                      { date: 'Apr 6, 6:45 PM', items: 'Rice Bowls', qty: 15, status: 'Donated to Community Pantry' },
                    ].map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                        <div>
                          <p className="text-sm font-medium text-foreground">{h.items}</p>
                          <p className="text-xs text-muted-foreground">{h.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">{h.qty} meals</p>
                          <p className={`text-xs ${i === 0 ? 'text-accent' : 'text-primary'}`}>{h.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {showDonationFlow && bestMatch && (
              <DonationFlow
                items={surplus}
                ngo={bestMatch}
                onClose={() => setShowDonationFlow(false)}
                onComplete={() => toast.success('Donation cycle complete! 🎉')}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
