import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';

import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { PageTransition } from './components/layout/PageTransition';
import { CustomCursor } from './components/ui/CustomCursor';
import { Preloader } from './components/ui/Preloader';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Pages
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Privacy } from './pages/Privacy';
import { Admin } from './pages/Admin';
import { NotFound } from './pages/NotFound';

const AppContent: React.FC = () => {
  const location = useLocation();

  // Initialize Lenis smooth scroll
  useSmoothScroll();

  // Scroll to top on route transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-charcoal text-cream selection:bg-terracotta selection:text-cream custom-cursor-active">
      {/* Film Leader Preloader (<1.5s countdown, skipped on repeat visits) */}
      <Preloader onComplete={() => { }} />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Persistent Minimalist Header */}
      {!isAdminRoute && <Header />}

      {/* Animated Route Transitions */}
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>

      {/* Persistent Global Footer with Devanagari Crop & Rotating Badge */}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </HelmetProvider>
  );
}
