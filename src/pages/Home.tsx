import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { HeroSection } from '../components/sections/HeroSection';
import { ManifestoSection } from '../components/sections/ManifestoSection';
import { FilmStripSection } from '../components/sections/FilmStripSection';
import { ServicesStackedSection } from '../components/sections/ServicesStackedSection';
import { PaperSection } from '../components/sections/PaperSection';
import { ClosingCtaSection } from '../components/sections/ClosingCtaSection';
import { VideoModal } from '../components/ui/VideoModal';
import { fetchProjects } from '../lib/supabase';
import type { ProjectItem } from '../data/projects';
import { MEDIA } from '../data/media';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <>
      <Helmet>
        <title>Folk Cinema — Rooted in culture. Made for the world.</title>
        <meta
          name="description"
          content="Independent film production company specializing in original cinema, documentaries, Indian cultural traditions, ad films, and branded content."
        />
        <meta property="og:title" content="Folk Cinema — Rooted in culture. Made for the world." />
        <meta
          property="og:description"
          content="Independent film production company specializing in original cinema, documentaries, Indian cultural traditions, ad films, and branded content."
        />
      </Helmet>

      <main className="w-full">
        {/* 1. Hero with scale-down video on scroll */}
        <HeroSection onOpenShowreel={() => setIsShowreelOpen(true)} />

        {/* 2. Manifesto scroll-linked word opacity */}
        <ManifestoSection />

        {/* 3. Featured work horizontal film strip */}
        <FilmStripSection projects={projects} />

        {/* 4. Services stacked list with sticky heading */}
        <ServicesStackedSection />

        {/* 5. Paper section (inverted contrast moment with woodblock pattern) */}
        <PaperSection />

        {/* 6. Closing CTA & Rotating badge */}
        <ClosingCtaSection />

        {/* Fullscreen Showreel Modal */}
        <VideoModal
          isOpen={isShowreelOpen}
          onClose={() => setIsShowreelOpen(false)}
          videoSrc={MEDIA.showreel.videoSrc}
          title={MEDIA.showreel.title}
        />
      </main>
    </>
  );
};
