import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEDIA } from '../../data/media';
import { RotatingBadge } from '../ui/RotatingBadge';
import { BRAND } from '../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onOpenShowreel?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenShowreel }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaFrameRef = useRef<HTMLDivElement>(null);
  const titleText = "FOLK CINEMA";

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Hero video scroll scale down into framed player
    if (!prefersReducedMotion && containerRef.current && mediaFrameRef.current) {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        animation: gsap.to(mediaFrameRef.current, {
          scale: 0.88,
          borderRadius: 0,
          y: 60,
          ease: 'none',
        }),
      });

      return () => {
        st.kill();
      };
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[640px] flex flex-col justify-between overflow-hidden bg-charcoal"
      aria-label="Hero Showcase"
    >
      {/* Full-bleed Scaling Media Canvas */}
      <div
        ref={mediaFrameRef}
        className="absolute inset-0 w-full h-full origin-center overflow-hidden z-0"
      >
        <video
          src={MEDIA.hero.videoSrc}
          poster={MEDIA.hero.poster}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover film-grade"
        />
        {/* Minimal legibility vignette - strictly subtle, no generic gradient wash */}
        <div className="absolute inset-0 bg-charcoal/30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent pointer-events-none" />
      </div>

      {/* Top Corner Folk Badge */}
      <div className="relative z-10 pt-24 px-6 md:px-12 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <RotatingBadge size={96} />
        </div>

        {/* Small Mono Studio Stamp */}
        <div className="hidden sm:block text-right font-mono text-[11px] text-cream/70 uppercase tracking-widest pointer-events-auto">
          <div>ORIGINAL CINEMA & CULTURE</div>
          <div className="text-terracotta mt-1">2026 REEL ARCHIVE</div>
        </div>
      </div>

      {/* Hero Bottom: Giant Wordmark spanning full width */}
      <div className="relative z-10 px-4 sm:px-6 md:px-10 pb-4 md:pb-6 flex flex-col gap-2">
        {/* Small mono tagline above wordmark */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs md:text-sm uppercase tracking-widest text-cream/90">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-terracotta inline-block" />
            <span>{BRAND.tagline}</span>
          </div>

          {onOpenShowreel && (
            <button
              onClick={onOpenShowreel}
              data-cursor="PLAY"
              className="hidden md:inline-flex items-center gap-2 text-cream hover:text-terracotta transition-colors group"
            >
              <span className="underline underline-offset-4 decoration-cream/40 group-hover:decoration-terracotta">
                Watch 2026 Showreel
              </span>
              <span className="font-mono text-xs text-terracotta">[01:45]</span>
            </button>
          )}
        </div>

        {/* Huge Condensed Display Wordmark (Scale contrast) */}
        <div className="overflow-hidden w-full select-none pt-0">
          <h1 className="font-display-mega text-[13.5vw] sm:text-[14vw] md:text-[14.5vw] text-cream leading-[0.82] tracking-condensed-display whitespace-nowrap m-0 p-0 flex justify-between">
            {titleText.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block animate-letter-reveal"
                style={{ animationDelay: `${index * 0.035 + 0.15}s` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
};
