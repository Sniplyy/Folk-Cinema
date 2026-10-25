import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Play } from 'lucide-react';
import { BRAND } from '../../lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenShowreel: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenShowreel,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  if (!isOpen) return null;

  const links = [
    { title: 'Work', path: '/work' },
    { title: 'Services', path: '/services' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-charcoal text-cream flex flex-col justify-between p-8 md:hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <span className="font-display-heavy text-xl tracking-tight">FOLK CINEMA</span>
        <button
          onClick={onClose}
          className="p-3 border border-cream/20 text-cream hover:border-terracotta hover:text-terracotta transition-colors"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Big Display Links */}
      <nav className="flex flex-col gap-6 py-6" aria-label="Mobile navigation">
        {links.map((link, idx) => (
          <Link
            key={link.title}
            to={link.path}
            onClick={onClose}
            className="font-display-mega text-5xl tracking-tight text-cream hover:text-terracotta transition-colors flex items-baseline justify-between group"
          >
            <span>{link.title}</span>
            <span className="font-mono text-xs text-cream/40 group-hover:text-terracotta tracking-widest">
              0{idx + 1}
            </span>
          </Link>
        ))}

        <button
          onClick={() => {
            onClose();
            onOpenShowreel();
          }}
          className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-terracotta pt-4 text-left"
        >
          <span className="w-6 h-6 border border-terracotta flex items-center justify-center">
            <Play size={10} className="fill-current translate-x-[0.5px]" />
          </span>
          <span>Watch Showreel</span>
        </button>
      </nav>

      {/* Footer Info */}
      <div className="border-t border-cream/15 pt-6 flex flex-col gap-3 font-mono text-xs text-cream/60 uppercase tracking-widest">
        <a href={`mailto:${BRAND.email}`} className="hover:text-terracotta transition-colors">
          {BRAND.email}
        </a>
        <a
          href={BRAND.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-terracotta transition-colors"
        >
          {BRAND.instagram}
        </a>
        <div className="text-[10px] text-cream/40 pt-2">
          {BRAND.tagline}
        </div>
      </div>
    </div>
  );
};
