import React from 'react';
import { Link } from 'react-router-dom';
import { RotatingBadge } from '../ui/RotatingBadge';
import { BRAND } from '../../lib/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal text-cream border-t border-cream/15 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Split: Nav, Contacts, and Badge */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-cream/10">
          {/* Col 1: Tagline and Rotating Badge */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
                Independent Film Studio
              </span>
              <p className="font-display-heavy text-3xl md:text-4xl text-cream max-w-sm leading-tight">
                Rooted in culture. Made for the world.
              </p>
            </div>

            <div className="pt-8">
              <RotatingBadge size={120} />
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-cream/40 mb-2">
              Navigation
            </span>
            <Link to="/work" className="font-mono text-sm uppercase tracking-wider text-cream/80 hover:text-terracotta transition-colors">
              Work
            </Link>
            <Link to="/services" className="font-mono text-sm uppercase tracking-wider text-cream/80 hover:text-terracotta transition-colors">
              Services
            </Link>
            <Link to="/about" className="font-mono text-sm uppercase tracking-wider text-cream/80 hover:text-terracotta transition-colors">
              About
            </Link>
            <Link to="/contact" className="font-mono text-sm uppercase tracking-wider text-cream/80 hover:text-terracotta transition-colors">
              Contact
            </Link>
          </div>

          {/* Col 3: Direct Inquiries & Social */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-cream/40 mb-2">
              Production Inquiries
            </span>
            <a
              href={`mailto:${BRAND.email}`}
              className="font-mono text-base md:text-lg text-cream hover:text-terracotta transition-colors tracking-wide underline underline-offset-4 decoration-cream/30 hover:decoration-terracotta"
            >
              {BRAND.email}
            </a>
            <div className="pt-3">
              <span className="font-mono text-xs uppercase tracking-widest text-cream/40 block mb-2">
                Dispatch
              </span>
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm uppercase tracking-wider text-cream/80 hover:text-terracotta transition-colors"
              >
                {BRAND.instagram}
              </a>
            </div>
            <p className="font-mono text-[11px] text-cream/50 pt-2">
              {BRAND.responseTime}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 text-cream/40 font-mono text-xs uppercase tracking-widest">
          <div>
            © {currentYear} FOLK CINEMA. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-cream transition-colors">
              Privacy Policy
            </Link>
            <span>/</span>
            <span>MUMBAI & VARANASI</span>
          </div>
        </div>
      </div>

      {/* Giant Cropped Devanagari Graphic Element in Background */}
      <div
        className="w-full overflow-hidden select-none pointer-events-none mt-12 opacity-[0.07] translate-y-8"
        aria-hidden="true"
      >
        <div className="font-devanagari font-black text-[22vw] leading-none whitespace-nowrap text-cream tracking-tight -mb-16">
          फोक सिनेमा
        </div>
      </div>
    </footer>
  );
};
