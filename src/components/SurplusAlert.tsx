import type { SurplusItem, NGO } from '@/services/api';
import { AlertTriangle, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SurplusAlertProps {
  items: SurplusItem[];
  totalMeals: number;
  bestMatch: NGO | null;
  onDonate: () => void;
}

const urgencyStyles = {
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  medium: 'bg-accent/10 text-accent border-accent/20',
  low: 'bg-muted text-muted-foreground border-border',
};

export function SurplusAlert({ items, totalMeals, bestMatch, onDonate }: SurplusAlertProps) {
  return (
    <div className="glass-card border-accent/30 overflow-hidden">
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 px-6 py-4 border-b border-accent/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/20 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Surplus Detected</h3>
            <p className="text-sm text-muted-foreground">{totalMeals} meals available for redistribution</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground">{item.item}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${urgencyStyles[item.urgency]}`}>
                  {item.urgency}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{item.quantity} {item.unit}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.expiresIn}</span>
              </div>
            </div>
          ))}
        </div>

        {bestMatch && (
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
            <p className="text-xs font-medium text-primary mb-2">Best Match Found</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{bestMatch.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" /> {bestMatch.distance} km away · ⭐ {bestMatch.rating}
                </p>
              </div>
              <Button onClick={onDonate} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                Donate Now <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
