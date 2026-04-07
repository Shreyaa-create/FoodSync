import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { DemandPoint } from '@/services/api';
import { mockWeeklyDemandData } from '@/mockData/data';

interface DemandChartProps {
  data: DemandPoint[];
  insight: string;
}

export function DemandChart({ data, insight }: DemandChartProps) {
  const [view, setView] = useState<'daily' | 'weekly'>('daily');
  const chartData = view === 'daily' ? data : mockWeeklyDemandData;

  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Demand Prediction</h3>
          <p className="text-sm text-muted-foreground mt-1">{insight}</p>
        </div>
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => setView('daily')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${view === 'daily' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Daily
          </button>
          <button
            onClick={() => setView('weekly')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${view === 'weekly' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Weekly
          </button>
        </div>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(142, 72%, 29%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(142, 72%, 29%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(30, 95%, 55%)" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(30, 95%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
            <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                fontSize: '13px',
                color: 'hsl(var(--foreground))',
              }}
            />
            <Area type="monotone" dataKey="actual" stroke="hsl(142, 72%, 29%)" fill="url(#actualGrad)" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(142, 72%, 29%)' }} name="Actual" />
            <Area type="monotone" dataKey="predicted" stroke="hsl(30, 95%, 55%)" fill="url(#predGrad)" strokeWidth={2.5} strokeDasharray="6 4" dot={{ r: 4, fill: 'hsl(30, 95%, 55%)' }} name="Predicted" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-6 text-xs">
        <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-primary rounded" /> Actual</span>
        <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-accent rounded border-dashed" /> Predicted</span>
      </div>
    </div>
  );
}
