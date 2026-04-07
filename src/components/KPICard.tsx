import { ReactNode } from 'react';

interface KPICardProps {
  title: string;
  value: ReactNode;
  icon: ReactNode;
  trend?: string;
  accentColor?: 'primary' | 'accent' | 'info' | 'success';
}

const colorMap = {
  primary: 'from-primary/10 to-primary/5 border-primary/20',
  accent: 'from-accent/10 to-accent/5 border-accent/20',
  info: 'from-info/10 to-info/5 border-info/20',
  success: 'from-success/10 to-success/5 border-success/20',
};

const iconBgMap = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  info: 'bg-info/10 text-info',
  success: 'bg-success/10 text-success',
};

export function KPICard({ title, value, icon, trend, accentColor = 'primary' }: KPICardProps) {
  return (
    <div className={`kpi-card bg-gradient-to-br ${colorMap[accentColor]} border`}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="text-3xl font-bold tracking-tight text-foreground">{value}</div>
          {trend && <p className="text-xs font-medium text-success">{trend}</p>}
        </div>
        <div className={`p-3 rounded-xl ${iconBgMap[accentColor]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
