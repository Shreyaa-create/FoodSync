import { useEffect, useRef } from 'react';
import { MapPin, Star, Navigation } from 'lucide-react';
import type { NGO } from '@/services/api';

interface NGOMapProps {
  ngos: NGO[];
  bestMatchId?: string;
  onSelectNGO?: (ngo: NGO) => void;
  selectedNGO?: NGO | null;
}

// Simple map visualization without external dependency - shows NGO locations as an interactive card-based map
export function NGOMap({ ngos, bestMatchId, onSelectNGO, selectedNGO }: NGOMapProps) {
  // Generate consistent pseudo-random positions for NGOs
  const positions = ngos.map((ngo, i) => ({
    x: 25 + ((i * 37 + 13) % 50),
    y: 20 + ((i * 29 + 7) % 55),
  }));

  const vendorPos = { x: 50, y: 50 };

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Nearby NGOs</h3>
          <p className="text-xs text-muted-foreground mt-0.5">{ngos.length} organizations in range</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Navigation className="w-3.5 h-3.5" />
          <span>Live locations</span>
        </div>
      </div>
      
      {/* Map area */}
      <div className="relative h-[280px] bg-muted/30 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />

        {/* Connection lines from vendor to NGOs */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {ngos.map((ngo, i) => (
            <line
              key={ngo.id}
              x1={`${vendorPos.x}%`}
              y1={`${vendorPos.y}%`}
              x2={`${positions[i].x}%`}
              y2={`${positions[i].y}%`}
              stroke={ngo.id === bestMatchId ? 'hsl(var(--primary))' : 'hsl(var(--border))'}
              strokeWidth={ngo.id === bestMatchId ? 2 : 1}
              strokeDasharray={ngo.id === bestMatchId ? '0' : '4 4'}
              opacity={ngo.id === bestMatchId ? 0.8 : 0.4}
            />
          ))}
        </svg>

        {/* Vendor marker */}
        <div
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
          style={{ left: `${vendorPos.x}%`, top: `${vendorPos.y}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-primary/20">
            <span className="text-primary-foreground text-xs font-bold">You</span>
          </div>
        </div>

        {/* NGO markers */}
        {ngos.map((ngo, i) => {
          const isBest = ngo.id === bestMatchId;
          const isSelected = selectedNGO?.id === ngo.id;
          return (
            <div
              key={ngo.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
              onClick={() => onSelectNGO?.(ngo)}
            >
              {isBest && (
                <div className="absolute -inset-3 rounded-full bg-primary/10 animate-pulse" />
              )}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 group-hover:scale-110 ${
                isBest ? 'bg-primary ring-2 ring-primary/40' : isSelected ? 'bg-accent ring-2 ring-accent/40' : 'bg-card border border-border'
              }`}>
                <MapPin className={`w-4 h-4 ${isBest || isSelected ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                  <p className="text-xs font-semibold text-foreground">{ngo.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <span>{ngo.distance} km</span>
                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-accent fill-accent" /> {ngo.rating}</span>
                  </div>
                  {isBest && <span className="text-xs text-primary font-medium">Best Match</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* NGO list below map */}
      <div className="p-4 space-y-2 border-t border-border max-h-[200px] overflow-y-auto">
        {ngos.map(ngo => {
          const isBest = ngo.id === bestMatchId;
          return (
            <button
              key={ngo.id}
              onClick={() => onSelectNGO?.(ngo)}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                selectedNGO?.id === ngo.id ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30 hover:bg-muted/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isBest ? 'bg-primary/10' : 'bg-muted'}`}>
                  <MapPin className={`w-3.5 h-3.5 ${isBest ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{ngo.name}</p>
                  <p className="text-xs text-muted-foreground">Capacity: {ngo.capacity} meals</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{ngo.distance} km</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 text-accent fill-accent" /> {ngo.rating}
                  {isBest && <span className="ml-1 text-primary font-medium">Best</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
