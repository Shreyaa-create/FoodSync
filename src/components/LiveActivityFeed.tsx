import { useState, useEffect, useCallback, useRef } from 'react';
import { AlertTriangle, Check, MapPin, TrendingUp, Package, Clock, Truck } from 'lucide-react';

interface Activity {
  id: string;
  type: 'surplus' | 'match' | 'accepted' | 'prediction' | 'pickup' | 'transit';
  message: string;
  time: string;
  icon: typeof AlertTriangle;
  isNew?: boolean;
}

const initialActivities: Activity[] = [
  { id: 'a1', type: 'prediction', message: 'Demand forecast updated for tomorrow', time: '2 min ago', icon: TrendingUp },
  { id: 'a2', type: 'surplus', message: 'Surplus detected: 25 Rice Bowls', time: '5 min ago', icon: AlertTriangle },
  { id: 'a3', type: 'match', message: 'Best match: City Food Bank (1.2 km)', time: '5 min ago', icon: MapPin },
  { id: 'a4', type: 'accepted', message: 'Hope Kitchen accepted 15 Sandwiches', time: '18 min ago', icon: Check },
  { id: 'a5', type: 'pickup', message: 'Pickup completed by Community Care', time: '42 min ago', icon: Package },
];

const newEventPool: Omit<Activity, 'id' | 'time' | 'isNew'>[] = [
  { type: 'surplus', message: 'Surplus detected: 12 Pasta Bowls', icon: AlertTriangle },
  { type: 'match', message: 'New match: Helping Hands (2.4 km)', icon: MapPin },
  { type: 'accepted', message: 'City Food Bank accepted 30 Rice Bowls', icon: Check },
  { type: 'prediction', message: 'Demand spike predicted for Friday lunch', icon: TrendingUp },
  { type: 'pickup', message: 'Pickup completed by Hope Kitchen', icon: Package },
  { type: 'transit', message: 'Community Pantry driver en route', icon: Truck },
  { type: 'surplus', message: 'Surplus alert: 18 Fresh Salads expiring', icon: AlertTriangle },
  { type: 'match', message: 'Optimal match found: Food For All (0.8 km)', icon: MapPin },
  { type: 'accepted', message: "Baker's Delight donation accepted", icon: Check },
  { type: 'prediction', message: 'Weather change: demand adjusted −8%', icon: TrendingUp },
  { type: 'transit', message: 'City Food Bank pickup in 10 min', icon: Truck },
  { type: 'surplus', message: 'Surplus detected: 22 Sandwiches', icon: AlertTriangle },
  { type: 'pickup', message: 'Green Kitchen completed pickup #47', icon: Package },
  { type: 'match', message: 'Re-routing to closer NGO: Safe Harbor', icon: MapPin },
];

const typeColors: Record<string, string> = {
  surplus: 'text-accent bg-accent/10',
  match: 'text-info bg-info/10',
  accepted: 'text-primary bg-primary/10',
  prediction: 'text-muted-foreground bg-muted',
  pickup: 'text-primary bg-primary/10',
  transit: 'text-info bg-info/10',
};

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [pulse, setPulse] = useState(true);
  const [connected, setConnected] = useState(true);
  const eventIndexRef = useRef(0);
  const counterRef = useRef(6);

  // Simulated WebSocket — pushes a new event every 6–12 seconds
  useEffect(() => {
    const pushEvent = () => {
      const pool = newEventPool;
      const event = pool[eventIndexRef.current % pool.length];
      eventIndexRef.current++;
      const id = `ws-${counterRef.current++}`;

      setActivities(prev => {
        const next: Activity[] = [
          { ...event, id, time: 'Just now', isNew: true },
          ...prev.slice(0, 9).map(a => ({ ...a, isNew: false })),
        ];
        return next;
      });

      // Clear "new" flag after animation completes
      setTimeout(() => {
        setActivities(prev => prev.map(a => a.id === id ? { ...a, isNew: false } : a));
      }, 1200);
    };

    // Random interval between 6–12s
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      const delay = 6000 + Math.random() * 6000;
      timer = setTimeout(() => {
        pushEvent();
        schedule();
      }, delay);
    };
    schedule();

    return () => clearTimeout(timer);
  }, []);

  // Pulse the "Live" indicator
  useEffect(() => {
    const interval = setInterval(() => setPulse(p => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  // Simulate brief "reconnecting" blip every ~45s
  useEffect(() => {
    const interval = setInterval(() => {
      setConnected(false);
      setTimeout(() => setConnected(true), 1500);
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Live Activity</h3>
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full transition-all duration-700 ${
              connected
                ? `bg-primary ${pulse ? 'opacity-100' : 'opacity-40'}`
                : 'bg-accent opacity-100'
            }`}
          />
          <span className="text-xs text-muted-foreground">
            {connected ? 'Live' : 'Reconnecting…'}
          </span>
        </div>
      </div>
      <div className="divide-y divide-border/50 max-h-[320px] overflow-y-auto">
        {activities.map((a) => (
          <div
            key={a.id}
            className={`flex items-start gap-3 px-5 py-3 transition-all duration-500 ${
              a.isNew
                ? 'bg-primary/5 animate-fade-in'
                : 'hover:bg-muted/30'
            }`}
          >
            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${typeColors[a.type]}`}>
              <a.icon className="w-3.5 h-3.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground leading-snug">{a.message}</p>
              <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className={a.isNew ? 'text-primary font-medium' : ''}>{a.time}</span>
              </p>
            </div>
            {a.isNew && (
              <span className="shrink-0 mt-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
