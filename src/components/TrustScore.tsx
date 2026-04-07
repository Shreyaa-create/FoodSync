import { Star, Shield, TrendingUp } from 'lucide-react';
import type { NGO } from '@/services/api';

interface TrustScoreProps {
  ngo: NGO;
}

// Extended mock data for trust metrics
const trustData: Record<string, { pickups: number; reliability: number; responseTime: string }> = {
  n1: { pickups: 142, reliability: 96, responseTime: '~12 min' },
  n2: { pickups: 87, reliability: 91, responseTime: '~18 min' },
  n3: { pickups: 203, reliability: 98, responseTime: '~8 min' },
};

export function TrustScore({ ngo }: TrustScoreProps) {
  const trust = trustData[ngo.id] || { pickups: 50, reliability: 85, responseTime: '~20 min' };

  return (
    <div className="glass-card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-xl">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Trust & Reliability</h3>
          <p className="text-xs text-muted-foreground">{ngo.name}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-xl bg-muted/40">
          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-lg font-bold text-foreground">{ngo.rating}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Rating</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-muted/40">
          <p className="text-lg font-bold text-foreground">{trust.pickups}</p>
          <p className="text-xs text-muted-foreground mt-1">Pickups</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-muted/40">
          <p className="text-lg font-bold text-primary">{trust.reliability}%</p>
          <p className="text-xs text-muted-foreground mt-1">Reliable</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 text-sm">
        <span className="text-muted-foreground">Avg response time</span>
        <span className="font-medium text-foreground">{trust.responseTime}</span>
      </div>
    </div>
  );
}
