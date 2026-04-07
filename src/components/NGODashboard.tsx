import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getDonationsForNGO, acceptDonation } from '@/services/api';
import type { Donation } from '@/services/api';
import { MapPin, Clock, Check, Eye, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatedCounter } from '@/components/AnimatedCounter';

const urgencyBadge = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-accent/10 text-accent border-accent/20',
  low: 'bg-muted text-muted-foreground border-border',
};

const statusBadge = {
  pending: 'bg-accent/10 text-accent',
  accepted: 'bg-primary/10 text-primary',
  completed: 'bg-muted text-muted-foreground',
};

export function NGODashboard() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    getDonationsForNGO().then((data) => {
      setDonations(data);
      setLoading(false);
    });
  }, []);

  const handleAccept = async (id: string) => {
    const res = await acceptDonation(id);
    if (res.success) {
      setDonations(d => d.map(don => don.id === id ? { ...don, status: 'accepted' } : don));
      toast.success('Donation accepted!', { description: 'The vendor has been notified.' });
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6 max-w-[900px] mx-auto">
        <Skeleton className="h-12 w-64 rounded-xl" />
        {[1,2,3].map(i => <Skeleton key={i} className="h-40 rounded-2xl" />)}
      </div>
    );
  }

  const pending = donations.filter(d => d.status === 'pending').length;
  const accepted = donations.filter(d => d.status === 'accepted').length;

  return (
    <div className="p-6 space-y-6 max-w-[900px] mx-auto">
      <div style={{ animation: 'slideUp 0.5s ease-out' }}>
        <h1 className="text-2xl font-bold text-foreground">Incoming Donations</h1>
        <p className="text-muted-foreground mt-1">Review and accept available food donations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4" style={{ animation: 'slideUp 0.6s ease-out' }}>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-foreground"><AnimatedCounter end={donations.length} /></div>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-accent"><AnimatedCounter end={pending} /></div>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-2xl font-bold text-primary"><AnimatedCounter end={accepted} /></div>
          <p className="text-xs text-muted-foreground">Accepted</p>
        </div>
      </div>

      {/* Donation Cards */}
      <div className="space-y-4">
        {donations.map((d, i) => (
          <div
            key={d.id}
            className="glass-card p-5 transition-all duration-300 hover:shadow-lg"
            style={{ animation: `slideUp ${0.7 + i * 0.1}s ease-out` }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{d.foodType}</p>
                    <p className="text-sm text-muted-foreground">{d.vendorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{d.quantity} {d.unit}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {d.distance} km</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {d.createdAt}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${urgencyBadge[d.urgency]}`}>
                    {d.urgency}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[d.status]}`}>
                    {d.status}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {d.status === 'pending' && (
                    <Button size="sm" onClick={() => handleAccept(d.id)} className="bg-primary text-primary-foreground gap-1.5">
                      <Check className="w-3.5 h-3.5" /> Accept
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
