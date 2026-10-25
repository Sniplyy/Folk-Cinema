import React from 'react';
import { BlockprintPattern } from '../ui/BlockprintPattern';

export const PaperSection: React.FC = () => {
  return (
    <section
      className="relative bg-cream text-charcoal py-28 md:py-44 px-6 md:px-12 overflow-hidden select-none"
      aria-label="Art Direction Statement"
    >
      {/* Woodblock geometric print texture across the paper canvas */}
      <BlockprintPattern opacity={0.07} color="#141210" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col justify-between">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-charcoal/60 mb-10">
          <span className="w-2.5 h-2.5 bg-terracotta inline-block" />
          <span>PRODUCTION PHILOSOPHY // 01</span>
        </div>

        {/* One Huge Pull-Quote in Charcoal Display Type */}
        <blockquote className="m-0 p-0">
          <p className="font-display-heavy text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.88] tracking-tight uppercase text-charcoal">
            “THE MOST POWERFUL STORIES DON'T INVENT NEW ROADS. THEY DIG DEEPER INTO THE SOIL BENEATH OUR BOOTS.”
          </p>
        </blockquote>

        {/* Attribution & Context */}
        <div className="mt-14 pt-8 border-t border-charcoal/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-charcoal/80">
          <div>
            FOLK CINEMA DIRECTORS' NOTEBOOK
          </div>
          <div>
            DOCUMENTING UNBROKEN TRADITIONS SINCE 2021
          </div>
        </div>
      </div>
    </section>
  );
};
