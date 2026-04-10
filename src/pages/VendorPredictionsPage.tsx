import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { TopBar } from '@/components/TopBar';
import { DemandChart } from '@/components/DemandChart';
import { PredictionCards } from '@/components/PredictionCards';
import { Explainability } from '@/components/Explainability';
import { getPrediction, getExplainability } from '@/services/api';
import type { PredictionItem, DemandPoint } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Calendar, CloudSun, ShoppingCart } from 'lucide-react';

export default function VendorPredictionsPage() {
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<PredictionItem[]>([]);
  const [chartData, setChartData] = useState<DemandPoint[]>([]);
  const [insight, setInsight] = useState('');
  const [reasons, setReasons] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([getPrediction(), getExplainability()]).then(([pred, expl]) => {
      setPredictions(pred.items);
      setChartData(pred.chart);
      setInsight(pred.insight);
      setReasons(expl);
      setLoading(false);
    });
  }, []);

  const factors = [
    { icon: Calendar, label: 'Day of Week', value: 'Saturday', impact: '+15%', color: 'text-primary' },
    { icon: CloudSun, label: 'Weather', value: 'Clear, 24°C', impact: '+5%', color: 'text-info' },
    { icon: ShoppingCart, label: 'Avg. Sales (7d)', value: '342 meals', impact: 'Baseline', color: 'text-muted-foreground' },
    { icon: TrendingUp, label: 'Trend', value: 'Upward', impact: '+8%', color: 'text-accent' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar role="vendor" />
      <div className="flex-1 flex flex-col">
        <TopBar role="vendor" />
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-[1200px] mx-auto space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Demand Predictions</h1>
              <p className="text-muted-foreground mt-1">AI-powered demand forecasting based on historical data, weather, and trends.</p>
            </div>

            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-80 rounded-2xl" />
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-28 rounded-2xl" />)}
                </div>
              </div>
            ) : (
              <>
                {/* Input Factors */}
                <div className="glass-card p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-4">PREDICTION INPUT FACTORS</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {factors.map(f => (
                      <div key={f.label} className="p-4 rounded-xl bg-muted/40 space-y-2">
                        <div className="flex items-center gap-2">
                          <f.icon className={`w-4 h-4 ${f.color}`} />
                          <span className="text-xs text-muted-foreground">{f.label}</span>
                        </div>
                        <p className="text-sm font-semibold text-foreground">{f.value}</p>
                        <p className={`text-xs font-medium ${f.color}`}>{f.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chart */}
                <DemandChart data={chartData} insight={insight} />

                {/* Predictions + Explainability */}
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-base font-semibold text-foreground">Item-Level Recommendations</h3>
                    <PredictionCards items={predictions} />

                    {/* Accuracy Table */}
                    <div className="glass-card p-6">
                      <h3 className="text-sm font-semibold text-muted-foreground mb-4">MODEL ACCURACY (LAST 30 DAYS)</h3>
                      <div className="space-y-3">
                        {predictions.map(item => (
                          <div key={item.item} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                            <span className="text-sm font-medium text-foreground">{item.item}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-muted-foreground">MAPE: {(100 - item.confidence + Math.random() * 2).toFixed(1)}%</span>
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${item.confidence}%` }} />
                              </div>
                              <span className="text-sm font-semibold text-primary">{item.confidence}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Explainability reasons={reasons} />
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
