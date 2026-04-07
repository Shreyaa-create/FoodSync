import { Brain, Lightbulb } from 'lucide-react';

interface ExplainabilityProps {
  reasons: string[];
}

export function Explainability({ reasons }: ExplainabilityProps) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-info/10 rounded-xl">
          <Brain className="w-5 h-5 text-info" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Why this prediction?</h3>
          <p className="text-xs text-muted-foreground">AI reasoning explained</p>
        </div>
      </div>
      <div className="space-y-2">
        {reasons.map((r, i) => (
          <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/50">
            <Lightbulb className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <p className="text-sm text-foreground/80">{r}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
