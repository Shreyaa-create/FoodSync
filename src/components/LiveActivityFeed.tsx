import { useState, useEffect } from 'react';
import { AlertTriangle, Check, MapPin, TrendingUp, Package, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'surplus' | 'match' | 'accepted' | 'prediction' | 'pickup';
  message: string;
  time: string;
  icon: typeof AlertTriangle;
}

const initialActivities: Activity[] = [
  { id: 'a1', type: 'prediction', message: 'Demand forecast updated for tomorrow', time: '2 min ago', icon: TrendingUp },
  { id: 'a2', type: 'surplus', message: 'Surplus detected: 25 Rice Bowls', time: '5 min ago', icon: AlertTriangle },
  { id: 'a3', type: 'match', message: 'Best match: City Food Bank (1.2 km)', time: '5 min ago', icon: MapPin },
  { id: 'a4', type: 'accepted', message: 'Hope Kitchen accepted 15 Sandwiches', time: '18 min ago', icon: Check },
  { id: 'a5', type: 'pickup', message: 'Pickup completed by Community Care', time: '42 min ago', icon: Package },
];

const typeColors = {
  surplus: 'text-accent bg-accent/10',
  match: 'text-info bg-info/10',
  accepted: 'text-primary bg-primary/10',
  prediction: 'text-muted-foreground bg-muted',
  pickup: 'text-success bg-success/10',
};

export function LiveActivityFeed() {
  const [activities] = useState<Activity[]>(initialActivities);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Live Activity</h3>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full bg-primary transition-opacity duration-1000 ${pulse ? 'opacity-100' : 'opacity-40'}`} />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="divide-y divide-border/50 max-h-[320px] overflow-y-auto">
        {activities.map((a, i) => (
          <div
            key={a.id}
            className="flex items-start gap-3 px-5 py-3 hover:bg-muted/30 transition-colors"
            style={{ animation: `slideUp ${0.3 + i * 0.08}s ease-out` }}
          >
            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${typeColors[a.type]}`}>
              <a.icon className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground leading-snug">{a.message}</p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {a.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
