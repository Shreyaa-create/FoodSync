import type { PredictionItem } from '@/services/api';

interface PredictionCardsProps {
  items: PredictionItem[];
}

export function PredictionCards({ items }: PredictionCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.item} className="glass-card p-4 space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{item.item}</p>
          <p className="text-2xl font-bold text-foreground">{item.recommended}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Predicted: {item.predicted}</span>
            <span className="text-primary font-medium">{item.confidence}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div className="bg-primary rounded-full h-1.5 transition-all duration-1000" style={{ width: `${item.confidence}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
