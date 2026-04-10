import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { TopBar } from '@/components/TopBar';
import { getDonationsForNGO, acceptDonation } from '@/services/api';
import type { Donation } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { CheckCircle, Clock, MapPin, Package, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NGODonationsPage() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'completed'>('all');

  useEffect(() => {
    getDonationsForNGO().then(d => { setDonations(d); setLoading(false); });
  }, []);

  const handleAccept = async (id: string) => {
    await acceptDonation(id);
    setDonations(prev => prev.map(d => d.id === id ? { ...d, status: 'accepted' } : d));
    toast.success('Donation accepted! Pickup will be scheduled.');
  };

  const filtered = filter === 'all' ? donations : donations.filter(d => d.status === filter);

  const urgencyColor = { high: 'text-destructive bg-destructive/10', medium: 'text-accent bg-accent/10', low: 'text-muted-foreground bg-muted' };
  const statusColor = { pending: 'text-accent', accepted: 'text-primary', completed: 'text-info' };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role="ngo" />
      <div className="flex-1 flex flex-col">
        <TopBar role="ngo" />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-[1200px] mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">All Donations</h1>
              <p className="text-muted-foreground mt-1">Browse and manage all incoming donation requests.</p>
            </div>

            {loading ? (
              <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}</div>
            ) : (
              <>
                {/* Filters */}
                <div className="flex items-center gap-2">
                  {(['all', 'pending', 'accepted', 'completed'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-muted-foreground hover:bg-muted'}`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? donations.length : donations.filter(d => d.status === f).length})
                    </button>
                  ))}
                </div>

                {/* Donation Cards */}
                <div className="space-y-3">
                  {filtered.map(d => (
                    <div key={d.id} className="glass-card p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            <Package className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-semibold text-foreground">{d.foodType}</p>
                            <p className="text-sm text-muted-foreground">{d.vendorName}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <span className="flex items-center gap-1"><Package className="w-3 h-3" />{d.quantity} {d.unit}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{d.distance} km</span>
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{d.createdAt}</span>
                              <span className="flex items-center gap-1"><Star className="w-3 h-3" />4.7</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${urgencyColor[d.urgency]}`}>{d.urgency}</span>
                          <span className={`text-xs font-medium ${statusColor[d.status]}`}>{d.status}</span>
                          {d.status === 'pending' && (
                            <Button onClick={() => handleAccept(d.id)} size="sm" className="bg-primary text-primary-foreground gap-1 ml-2">
                              <CheckCircle className="w-3.5 h-3.5" /> Accept
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="w-3.5 h-3.5" /> Details
                          </Button>
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
