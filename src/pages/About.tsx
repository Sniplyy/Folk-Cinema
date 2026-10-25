import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchTeam } from '../lib/supabase';
import type { TeamMember } from '../data/team';
import { MEDIA } from '../data/media';
import { MediaSlot } from '../components/ui/MediaSlot';
import { RotatingBadge } from '../components/ui/RotatingBadge';
import { ClosingCtaSection } from '../components/sections/ClosingCtaSection';

export const About: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetchTeam().then(setTeam);
  }, []);

  return (
    <>
      <Helmet>
        <title>About // Folk Cinema — Independent Film House</title>
        <meta
          name="description"
          content="Independent film production company documenting the raw textures, oral histories, and living traditions of the Indian subcontinent."
        />
      </Helmet>

      <main className="bg-charcoal text-cream pt-28 md:pt-36">
        {/* 1. Opening: One Huge Statement */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-28">
          <div className="font-mono text-xs uppercase tracking-widest text-cream/50 mb-6 flex items-center gap-3">
            <span className="w-2 h-2 bg-terracotta inline-block" />
            <span>ORIGIN & DIRECTION</span>
          </div>

          <h1 className="font-display-mega text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.88] uppercase tracking-condensed-display text-cream max-w-6xl">
            CINEMA DOES NOT NEED TO MIMIC THE WEST TO BE UNIVERSAL. IT NEEDS TO DARE TO BE SPECIFIC.
          </h1>
        </section>

        {/* 2. Editorial Two-Column Block: Tall Portrait Still + Plain Paragraphs */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 border-t border-cream/15 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Tall portrait-ratio still (4:5 / 3:4) */}
          <div className="lg:col-span-5 border border-cream/15 overflow-hidden">
            <MediaSlot
              src={MEDIA.about.portrait}
              alt="Director Shailesh Kumar on set in rural India"
              aspectRatio="4/5"
              className="w-full h-full"
            />
            <div className="p-4 bg-charcoal-elevated border-t border-cream/10 font-mono text-[10px] uppercase tracking-widest text-cream/50 flex justify-between">
              <span>FIELD OBSERVATION</span>
              <span>EST. 2021</span>
            </div>
          </div>

          {/* Right: Short text on vision, cultural authenticity, cinematic craft */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-cream/85 text-lg md:text-xl leading-relaxed">
            <div className="font-mono text-xs uppercase tracking-widest text-terracotta">
              THE WORK
            </div>

            <p className="font-medium text-cream text-2xl md:text-3xl leading-snug">
              Folk Cinema was started to cut through the synthetic polish of contemporary commercial video and return to films with tactile density.
            </p>

            <p>
              India is not a single visual aesthetic. It is tens of thousands of localized dialects, kiln firing speeds, temple drum patterns, and textile tensions. When we mount a project—whether an independent fiction short or a commission for a heritage textile house—we refuse to fly in for three days with a mood board.
            </p>

            <p>
              We spend the time on ground. We record location sound in multi-channel arrays so the spatial rumble of the river or the acoustic echo of the brass hammer stays in the final mix. We shoot with prime lenses in natural morning and dusk light, allowing the environment to establish the color palette instead of forcing digital saturation.
            </p>

            <div className="pt-6 border-t border-cream/15 flex flex-wrap items-center gap-8 font-mono text-xs uppercase tracking-widest text-cream/60">
              <div>
                HEADQUARTERS: <span className="text-cream">MUMBAI / VARANASI</span>
              </div>
              <div>
                PRIMARY CAMERAS: <span className="text-cream">ARRI ALEXA / 16MM</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Full-Bleed Parallax Landscape Still */}
        <section className="w-full relative h-[65vh] min-h-[420px] overflow-hidden border-y border-cream/15 my-12">
          <img
            src={MEDIA.about.landscapeParallax}
            alt="Misty landscape in the Western Ghats"
            className="w-full h-full object-cover film-grade"
          />
          <div className="absolute bottom-6 left-6 md:left-12 font-mono text-xs uppercase tracking-widest bg-charcoal/80 px-4 py-2 border border-cream/20 text-cream">
            LOCATION ARCHIVE // ID: 882-WESTERN GHATS
          </div>
        </section>

        {/* 4. Oversized Cropped Devanagari Wordmark (graphic element) */}
        <section className="w-full overflow-hidden select-none py-12 md:py-20 border-b border-cream/15" aria-hidden="true">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-end mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta">
              DEVANAGARI GRAPHIC MARK
            </span>
            <RotatingBadge size={80} />
          </div>

          <div className="w-full overflow-hidden">
            <div className="font-devanagari font-black text-[22vw] leading-none whitespace-nowrap text-cream/15 tracking-tight -mb-10">
              फोक सिनेमा
            </div>
          </div>
        </section>

        {/* 5. Team Section (Built but conditionally rendered if entries exist) */}
        {team.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-b border-cream/15">
            <span className="font-mono text-xs uppercase tracking-widest text-cream/50 block mb-3">
              DIRECTORS // COLLECTIVE
            </span>
            <h2 className="font-display-heavy text-4xl sm:text-5xl uppercase tracking-tight text-cream mb-12">
              People Behind The Camera
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.id} className="border border-cream/15 p-6 bg-charcoal-elevated">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover film-grade mb-6 border border-cream/10"
                    />
                  )}
                  <div className="font-display-heavy text-2xl text-cream">{member.name}</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-terracotta mt-1">
                    {member.role}
                  </div>
                  {member.bio && (
                    <p className="mt-4 text-cream/70 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Closing CTA */}
        <ClosingCtaSection />
      </main>
    </>
  );
};
