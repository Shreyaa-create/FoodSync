import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BarChart3, TrendingUp, AlertTriangle, Users, Upload, Play, Zap, ChefHat } from 'lucide-react';
import { getPrediction, getSurplus, getNearbyNGOs, getKPIs, sendDonationRequest, getExplainability } from '@/services/api';
import type { PredictionItem, DemandPoint, SurplusItem, NGO, KPIs } from '@/services/api';
import { KPICard } from '@/components/KPICard';
import { DemandChart } from '@/components/DemandChart';
import { SurplusAlert } from '@/components/SurplusAlert';
import { SmartRecommendation } from '@/components/SmartRecommendation';
import { PredictionCards } from '@/components/PredictionCards';
import { ImpactSection } from '@/components/ImpactSection';
import { Explainability } from '@/components/Explainability';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export function VendorDashboard() {
  const [loading, setLoading] = useState(true);
  const [kpis, setKpis] = useState<KPIs | null>(null);
  const [predictions, setPredictions] = useState<PredictionItem[]>([]);
  const [chartData, setChartData] = useState<DemandPoint[]>([]);
  const [insight, setInsight] = useState('');
  const [surplus, setSurplus] = useState<SurplusItem[]>([]);
  const [totalMeals, setTotalMeals] = useState(0);
  const [bestMatch, setBestMatch] = useState<NGO | null>(null);
  const [reasons, setReasons] = useState<string[]>([]);
  const [demoRunning, setDemoRunning] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const [kpiData, predData, surplusData, ngos, explainData] = await Promise.all([
      getKPIs(), getPrediction(), getSurplus(), getNearbyNGOs(), getExplainability(),
    ]);
    setKpis(kpiData);
    setPredictions(predData.items);
    setChartData(predData.chart);
    setInsight(predData.insight);
    setSurplus(surplusData.items);
    setTotalMeals(surplusData.totalMeals);
    setBestMatch(ngos[0]);
    setReasons(explainData);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleDonate = async () => {
    if (!bestMatch) return;
    const res = await sendDonationRequest(surplus[0]?.id, bestMatch.id);
    if (res.success) {
      toast.success('Donation request sent!', { description: `${totalMeals} meals → ${bestMatch.name}` });
    }
  };

  const runDemo = async () => {
    setDemoRunning(true);
    toast.info('🚀 Demo started — loading sample data...');
    await new Promise(r => setTimeout(r, 1000));
    await loadData();
    toast.warning('⚠️ Surplus detected: 50 meals available', { duration: 4000 });
    await new Promise(r => setTimeout(r, 2000));
    toast.success('✅ Best match found: City Food Bank (1.2 km)', { duration: 4000 });
    await new Promise(r => setTimeout(r, 2000));
    toast.success('🎉 NGO accepted your donation!', { duration: 5000 });
    setDemoRunning(false);
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <div className="grid grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Hero */}
      <div className="space-y-1" style={{ animation: 'slideUp 0.5s ease-out' }}>
        <h1 className="text-2xl font-bold text-foreground">
          {greeting()} <span className="text-muted-foreground font-normal">— here's your food intelligence overview</span>
        </h1>
        {totalMeals > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mt-2">
            <AlertTriangle className="w-4 h-4" />
            Surplus detected: {totalMeals} meals
          </div>
        )}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" style={{ animation: 'slideUp 0.6s ease-out' }}>
        <KPICard
          title="Predicted Demand"
          value={<AnimatedCounter end={kpis?.predictedDemand ?? 0} />}
          icon={<TrendingUp className="w-5 h-5" />}
          trend="+12% vs last week"
          accentColor="primary"
        />
        <KPICard
          title="Surplus Detected"
          value={<AnimatedCounter end={kpis?.surplusDetected ?? 0} suffix=" meals" />}
          icon={<AlertTriangle className="w-5 h-5" />}
          accentColor="accent"
        />
        <KPICard
          title="Food Saved"
          value={<AnimatedCounter end={kpis?.foodSaved ?? 0} suffix=" kg" />}
          icon={<ChefHat className="w-5 h-5" />}
          trend="This month"
          accentColor="success"
        />
        <KPICard
          title="People Fed"
          value={<AnimatedCounter end={kpis?.peopleFed ?? 0} />}
          icon={<Users className="w-5 h-5" />}
          trend="Total impact"
          accentColor="info"
        />
      </div>

      {/* Smart Recommendation */}
      <div style={{ animation: 'slideUp 0.7s ease-out' }}>
        <SmartRecommendation />
      </div>

      {/* Chart + Predictions */}
      <div className="grid lg:grid-cols-3 gap-6" style={{ animation: 'slideUp 0.8s ease-out' }}>
        <div className="lg:col-span-2">
          <DemandChart data={chartData} insight={insight} />
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-foreground">Recommended Quantities</h3>
          <PredictionCards items={predictions} />
        </div>
      </div>

      {/* Surplus + Explainability */}
      <div className="grid lg:grid-cols-3 gap-6" style={{ animation: 'slideUp 0.9s ease-out' }}>
        <div className="lg:col-span-2">
          <SurplusAlert items={surplus} totalMeals={totalMeals} bestMatch={bestMatch} onDonate={handleDonate} />
        </div>
        <Explainability reasons={reasons} />
      </div>

      {/* Impact */}
      <div style={{ animation: 'slideUp 1s ease-out' }}>
        <ImpactSection foodSaved={kpis?.foodSaved ?? 0} peopleFed={kpis?.peopleFed ?? 0} impactScore={kpis?.impactScore ?? 0} />
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-6" style={{ animation: 'slideUp 1.1s ease-out' }}>
        <h3 className="text-base font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2"><Upload className="w-4 h-4" /> Upload Data</Button>
          <Button variant="outline" className="gap-2"><Zap className="w-4 h-4" /> Simulate Data</Button>
          <Button onClick={runDemo} disabled={demoRunning} className="bg-primary text-primary-foreground gap-2">
            <Play className="w-4 h-4" /> {demoRunning ? 'Running...' : 'Run Demo Scenario'}
          </Button>
        </div>
      </div>
    </div>
  );
}
