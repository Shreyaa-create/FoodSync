import { AnimatedCounter } from './AnimatedCounter';
import { Leaf, Award } from 'lucide-react';

interface ImpactSectionProps {
  foodSaved: number;
  peopleFed: number;
  impactScore: number;
}

export function ImpactSection({ foodSaved, peopleFed, impactScore }: ImpactSectionProps) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-primary/10 rounded-xl">
          <Leaf className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Impact Dashboard</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-xl bg-primary/5">
          <div className="text-2xl font-bold text-primary">
            <AnimatedCounter end={foodSaved} suffix=" kg" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Food Saved</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-accent/5">
          <div className="text-2xl font-bold text-accent">
            <AnimatedCounter end={peopleFed} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">People Fed</p>
        </div>
        <div className="text-center p-4 rounded-xl bg-info/5">
          <div className="flex items-center justify-center gap-1">
            <Award className="w-5 h-5 text-info" />
            <span className="text-2xl font-bold text-info">
              <AnimatedCounter end={impactScore} suffix="/100" />
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Impact Score</p>
        </div>
      </div>
    </div>
  );
}
