import { Sparkles, Clock } from 'lucide-react';

export function SmartRecommendation() {
  return (
    <div className="glass-card p-5 bg-gradient-to-r from-primary/5 to-primary/0 border-primary/15">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-primary/10 rounded-xl animate-float">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">FoodSync Recommendation</p>
          <p className="text-sm text-muted-foreground mt-1">
            Donate surplus within the next <span className="font-semibold text-accent">2 hours</span> for maximum freshness and impact.
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated 2 minutes ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
