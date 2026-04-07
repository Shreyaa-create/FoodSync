import { useState } from 'react';
import { Check, Truck, MapPin, Clock, Package, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { SurplusItem, NGO } from '@/services/api';
import { toast } from 'sonner';

interface DonationFlowProps {
  items: SurplusItem[];
  ngo: NGO;
  onClose: () => void;
  onComplete: () => void;
}

type FlowStep = 'review' | 'confirm' | 'tracking';
type TrackingStatus = 'scheduled' | 'ontheway' | 'pickedup';

const trackingSteps = [
  { key: 'scheduled' as const, label: 'Pickup Scheduled', icon: Clock, description: 'NGO notified and pickup time confirmed' },
  { key: 'ontheway' as const, label: 'NGO On the Way', icon: Truck, description: 'Driver en route to your location' },
  { key: 'pickedup' as const, label: 'Picked Up', icon: Check, description: 'Food collected successfully' },
];

export function DonationFlow({ items, ngo, onClose, onComplete }: DonationFlowProps) {
  const [step, setStep] = useState<FlowStep>('review');
  const [trackingStatus, setTrackingStatus] = useState<TrackingStatus>('scheduled');
  const [loading, setLoading] = useState(false);

  const totalMeals = items.reduce((s, i) => s + i.quantity, 0);

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setStep('tracking');
    setLoading(false);
    toast.success('Donation confirmed!', { description: `${ngo.name} has been notified.` });

    // Simulate tracking progression
    setTimeout(() => {
      setTrackingStatus('ontheway');
      toast.info('🚚 NGO driver is on the way!');
    }, 3000);
    setTimeout(() => {
      setTrackingStatus('pickedup');
      toast.success('✅ Food has been picked up!');
    }, 6000);
  };

  const statusIndex = trackingSteps.findIndex(s => s.key === trackingStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" style={{ animation: 'fadeIn 0.2s ease-out' }}>
      <div className="bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" style={{ animation: 'slideUp 0.3s ease-out' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {step === 'review' ? 'Review Donation' : step === 'confirm' ? 'Confirm Donation' : 'Tracking'}
            </h2>
            <p className="text-sm text-muted-foreground">{totalMeals} meals → {ngo.name}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {step === 'review' && (
            <>
              {/* Items */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Items to donate</p>
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/40">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{item.item}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-foreground font-medium">{item.quantity} {item.unit}</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" /> {item.expiresIn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* NGO info */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 space-y-2">
                <p className="text-xs font-medium text-primary">Matched NGO</p>
                <p className="font-semibold text-foreground">{ngo.name}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {ngo.distance} km</span>
                  <span>⭐ {ngo.rating}</span>
                  <span>Capacity: {ngo.capacity}</span>
                </div>
              </div>

              <Button onClick={() => setStep('confirm')} className="w-full bg-primary text-primary-foreground gap-2 h-11">
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {step === 'confirm' && (
            <>
              <div className="text-center py-4 space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">Ready to donate?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {totalMeals} meals will be sent to <span className="font-medium text-foreground">{ngo.name}</span>
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated pickup</span>
                  <span className="font-medium text-foreground">~30 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Distance</span>
                  <span className="font-medium text-foreground">{ngo.distance} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total items</span>
                  <span className="font-medium text-foreground">{items.length} types, {totalMeals} meals</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('review')} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleConfirm} disabled={loading} className="flex-1 bg-primary text-primary-foreground gap-2">
                  {loading ? 'Confirming...' : 'Confirm Donation'}
                </Button>
              </div>
            </>
          )}

          {step === 'tracking' && (
            <>
              {/* Timeline */}
              <div className="space-y-0 py-2">
                {trackingSteps.map((s, i) => {
                  const isCompleted = i <= statusIndex;
                  const isCurrent = i === statusIndex;
                  return (
                    <div key={s.key} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                          <s.icon className="w-4 h-4" />
                        </div>
                        {i < trackingSteps.length - 1 && (
                          <div className={`w-0.5 h-12 transition-all duration-500 ${
                            i < statusIndex ? 'bg-primary' : 'bg-border'
                          }`} />
                        )}
                      </div>
                      <div className="pb-8">
                        <p className={`text-sm font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {s.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1.5 text-xs text-primary font-medium mt-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> In progress
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {trackingStatus === 'pickedup' && (
                <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/15">
                  <p className="text-sm font-semibold text-primary">🎉 Donation Complete!</p>
                  <p className="text-xs text-muted-foreground mt-1">Thank you for reducing food waste.</p>
                </div>
              )}

              <Button onClick={() => { onComplete(); onClose(); }} variant="outline" className="w-full">
                {trackingStatus === 'pickedup' ? 'Done' : 'Close'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
