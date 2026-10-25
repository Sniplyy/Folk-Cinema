import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  const [phase, setPhase] = useState<'counting' | 'wipe' | 'done'>('counting');

  useEffect(() => {
    // Check if user has already visited in this session or requested skip
    const hasSeen = sessionStorage.getItem('folk_preloader_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const urlParams = new URLSearchParams(window.location.search);
    const skipParam = urlParams.get('skip_preloader') === 'true';

    if (hasSeen || prefersReducedMotion || skipParam) {
      setPhase('done');
      onComplete();
      return;
    }

    // High-tempo film leader: 3 -> 2 -> 1 (approx 350ms per beat, total ~1.2s)
    const timer1 = setTimeout(() => setCount(2), 350);
    const timer2 = setTimeout(() => setCount(1), 700);
    const timer3 = setTimeout(() => {
      setPhase('wipe');
    }, 1050);
    const timer4 = setTimeout(() => {
      sessionStorage.setItem('folk_preloader_seen', 'true');
      setPhase('done');
      onComplete();
    }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-charcoal text-cream overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        phase === 'wipe' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Film leader framing guides */}
      <div className="relative w-72 h-72 border border-cream/20 flex items-center justify-center">
        {/* Film leader target circles */}
        <div className="absolute inset-4 rounded-full border border-cream/30" />
        <div className="absolute inset-12 rounded-full border border-cream/20" />
        
        {/* Crosshairs */}
        <div className="absolute w-full h-[1px] bg-cream/30" />
        <div className="absolute h-full w-[1px] bg-cream/30" />

        {/* Terracotta indicator mark */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-terracotta" />

        {/* Leader Countdown number */}
        <div className="relative z-10 font-display-mega text-8xl text-cream tracking-tight select-none">
          {count}
        </div>

        {/* Film metadata stamps */}
        <div className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-widest text-cream/50">
          FPS: 24.00
        </div>
        <div className="absolute top-2 left-3 font-mono text-[9px] uppercase tracking-widest text-cream/50">
          LEADER // FC-01
        </div>
      </div>

      {/* Terracotta edge accent during wipe */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-terracotta" />
    </div>
  );
};
