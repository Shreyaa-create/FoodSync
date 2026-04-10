import { useState, useEffect } from 'react';
import { Sparkles, Clock } from 'lucide-react';

const recommendations = [
  { text: 'Donate surplus within the next <strong>2 hours</strong> for maximum freshness and impact.', time: 2 },
  { text: 'Rice Bowls are <strong>high urgency</strong> — prioritize for immediate redistribution.', time: 1 },
  { text: 'Demand spike predicted for <strong>Friday lunch</strong> — consider reducing prep by 10%.', time: 5 },
  { text: '<strong>3 NGOs</strong> within 2 km have capacity for your current surplus.', time: 3 },
  { text: 'Weather change expected — surplus likelihood <strong>increases 20%</strong> tomorrow.', time: 4 },
];

export function SmartRecommendation() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [minutesAgo, setMinutesAgo] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex(i => (i + 1) % recommendations.length);
        setMinutesAgo(0);
        setFading(false);
      }, 400);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Increment "minutes ago" counter
  useEffect(() => {
    const interval = setInterval(() => setMinutesAgo(m => m + 1), 60000);
    return () => clearInterval(interval);
  }, []);

  const rec = recommendations[index];
  const timeLabel = minutesAgo === 0 ? 'Just now' : `Updated ${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;

  return (
    <div className="glass-card p-5 bg-gradient-to-r from-primary/5 to-primary/0 border-primary/15">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-xl animate-float shrink-0">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div className={`transition-all duration-400 ${fading ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}`}>
          <p className="text-sm font-semibold text-foreground">FoodSync Recommendation</p>
          <p
            className="text-sm text-muted-foreground mt-1"
            dangerouslySetInnerHTML={{ __html: rec.text.replace(/<strong>/g, '<strong class="font-semibold text-accent">') }}
          />
          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
