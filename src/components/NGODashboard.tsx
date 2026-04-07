import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getDonationsForNGO, acceptDonation } from '@/services/api';
import type { Donation } from '@/services/api';
import { MapPin, Clock, Check, Eye, Package, Star, Shield, Truck, Filter } from 'lucide-react';
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

const urgencyOrder = { high: 0, medium: 1, low: 2 };

export function NGODashboard() {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [sortBy, setSortBy] = useState<'urgency' | 'distance' | 'time'>('urgency');
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  useEffect(() => {
    getDonationsForNGO().then((data) => {
      setDonations(data);
      setLoading(false);
    });
  }, []);

  const handleAccept = async (id: string) => {
    setAcceptingId(id);
    const res = await acceptDonation(id);
    if (res.success) {
      setDonations(d => d.map(don => don.id === id ? { ...don, status: 'accepted' } : don));
      toast.success('Donation accepted!', { description: 'The vendor has been notified. Pickup is being scheduled.' });
    }
    setAcceptingId(null);
  };

  const sortedDonations = [...donations].sort((a, b) => {
    if (sortBy === 'urgency') return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    if (sortBy === 'distance') return a.distance - b.distance;
    return 0;
  });

  if (loading) {
    return (
      <div className="p-8 space-y-6 max-w-[900px] mx-auto">
        <Skeleton className="h-12 w-64 rounded-xl" />
        {[1,2,3].map(i => <Skeleton key={i} className="h-40 rounded-2xl" />)}
      </div>
    );
  }

  const pending = donations.filter(d => d.status === 'pending').length;
  const accepted = donations.filter(d => d.status === 'accepted').length;

  return (
    <div className="p-8 space-y-8 max-w-[900px] mx-auto">
      <div style={{ animation: 'slideUp 0.5s ease-out' }}>
        <h1 className="text-2xl font-bold text-foreground">Incoming Donations</h1>
        <p className="text-muted-foreground mt-1">Review and accept available food donations · Updated just now</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-5" style={{ animation: 'slideUp 0.6s ease-out' }}>
        <div className="glass-card p-5 text-center">
          <div className="text-2xl font-bold text-foreground"><AnimatedCounter end={donations.length} /></div>
          <p className="text-xs text-muted-foreground mt-1">Total Requests</p>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-2xl font-bold text-accent"><AnimatedCounter end={pending} /></div>
          <p className="text-xs text-muted-foreground mt-1">Awaiting Review</p>
        </div>
        <div className="glass-card p-5 text-center">
          <div className="text-2xl font-bold text-primary"><AnimatedCounter end={accepted} /></div>
          <p className="text-xs text-muted-foreground mt-1">Accepted</p>
        </div>
      </div>

      {/* Sort controls */}
      <div className="flex items-center gap-2" style={{ animation: 'slideUp 0.65s ease-out' }}>
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Sort by:</span>
        {(['urgency', 'distance', 'time'] as const).map(s => (
          <button
            key={s}
            onClick={() => setSortBy(s)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              sortBy === s ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {/* Donation Cards */}
      <div className="space-y-4">
        {sortedDonations.map((d, i) => (
          <div
            key={d.id}
            className="glass-card p-6 transition-all duration-300 hover:shadow-lg"
            style={{ animation: `slideUp ${0.7 + i * 0.1}s ease-out` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{d.foodType}</p>
                    <p className="text-sm text-muted-foreground">{d.vendorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{d.quantity} {d.unit}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {d.distance} km</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {d.createdAt}</span>
                </div>

                {/* Vendor trust mini-badge */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 text-accent fill-accent" /> 4.7</span>
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 94% reliable</span>
                  <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> 128 donations</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${urgencyBadge[d.urgency]}`}>
                    {d.urgency}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusBadge[d.status]}`}>
                    {d.status}
                  </span>
                </div>
                <div className="flex gap-2 mt-1">
                  {d.status === 'pending' && (
                    <Button
                      size="sm"
                      onClick={() => handleAccept(d.id)}
                      disabled={acceptingId === d.id}
                      className="bg-primary text-primary-foreground gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      {acceptingId === d.id ? 'Accepting...' : 'Accept'}
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
