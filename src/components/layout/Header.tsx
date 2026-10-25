import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Play } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { VideoModal } from '../ui/VideoModal';
import { MEDIA } from '../../data/media';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 flex items-center justify-between pointer-events-none">
        {/* Left: Brand Wordmark */}
        <div className="pointer-events-auto flex items-center gap-6">
          <Link
            to="/"
            className="font-display-heavy text-xl md:text-2xl tracking-tighter text-cream hover:text-terracotta transition-colors"
          >
            FOLK CINEMA
          </Link>

          {/* Showreel Quick Trigger on Desktop */}
          <button
            onClick={() => setIsShowreelOpen(true)}
            className="hidden lg:flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-cream/70 hover:text-terracotta transition-colors group"
            aria-label="Watch Showreel"
          >
            <span className="w-4 h-4 border border-cream/30 flex items-center justify-center group-hover:border-terracotta">
              <Play size={8} className="fill-current translate-x-[0.5px]" />
            </span>
            <span>Showreel</span>
          </button>
        </div>

        {/* Right: Navigation & CTA (Desktop) */}
        <div className="pointer-events-auto hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-mono text-xs uppercase tracking-widest transition-colors relative py-1 ${
                    isActive
                      ? 'text-terracotta font-semibold'
                      : 'text-cream/80 hover:text-cream'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-terracotta" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Pill-less rectangular terracotta button */}
          <Link
            to="/contact"
            className="bg-terracotta text-cream px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-terracotta-hover transition-colors select-none"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="pointer-events-auto p-2 text-cream hover:text-terracotta transition-colors md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Full-screen Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenShowreel={() => setIsShowreelOpen(true)}
      />

      {/* Showreel Modal */}
      <VideoModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        videoSrc={MEDIA.showreel.videoSrc}
        title={MEDIA.showreel.title}
      />
    </>
  );
};
