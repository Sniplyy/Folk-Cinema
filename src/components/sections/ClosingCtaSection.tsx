import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../../lib/constants';
import { RotatingBadge } from '../ui/RotatingBadge';
import { ArrowUpRight } from 'lucide-react';

export const ClosingCtaSection: React.FC = () => {
  return (
    <section
      className="relative bg-charcoal text-cream py-28 md:py-40 px-6 md:px-12 border-t border-cream/15 overflow-hidden"
      aria-label="Call to Action"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Top bar with Rotating Badge */}
        <div className="flex items-start justify-between pb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-terracotta flex items-center gap-2">
            <span className="w-2 h-2 bg-terracotta inline-block" />
            <span>DIRECT ENGAGEMENT</span>
          </div>

          <RotatingBadge size={100} />
        </div>

        {/* Giant "HAVE A STORY?" spanning full width */}
        <div className="my-6 overflow-hidden">
          <h2 className="font-display-mega text-[14vw] sm:text-[15vw] text-cream leading-[0.82] tracking-condensed-display uppercase whitespace-nowrap">
            HAVE A STORY?
          </h2>
        </div>

        {/* Action Row: Email as Large Link + Start a Project CTA */}
        <div className="mt-8 pt-8 border-t border-cream/15 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cream/50 block mb-2">
              Direct Mail
            </span>
            <a
              href={`mailto:${BRAND.email}`}
              className="font-display-heavy text-3xl sm:text-4xl md:text-5xl text-cream hover:text-terracotta transition-colors tracking-tight underline underline-offset-8 decoration-cream/30 hover:decoration-terracotta inline-flex items-center gap-4"
            >
              <span>{BRAND.email}</span>
              <ArrowUpRight size={32} className="text-terracotta" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              to="/contact"
              className="bg-terracotta text-cream px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold hover:bg-terracotta-hover transition-colors select-none text-center"
            >
              Submit Production Brief
            </Link>
            <span className="font-mono text-xs text-cream/40 uppercase tracking-wider">
              {BRAND.responseTime}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
