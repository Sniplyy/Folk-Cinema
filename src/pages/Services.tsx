import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';
import { MediaSlot } from '../components/ui/MediaSlot';
import { ClosingCtaSection } from '../components/sections/ClosingCtaSection';

export const Services: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Services // Production Capabilities — Folk Cinema</title>
        <meta
          name="description"
          content="Seven core production capabilities of Folk Cinema: narrative features, documentaries, ad films, branded content, vertical reels, commercial photography, and film post-production."
        />
      </Helmet>

      <main className="bg-charcoal text-cream pt-28 md:pt-36">
        {/* Page Intro Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 border-b border-cream/15 pb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-3">
            CAPABILITIES // CRAFT SPECIFICATIONS
          </span>
          <h1 className="font-display-mega text-6xl sm:text-8xl md:text-9xl uppercase tracking-condensed-display text-cream leading-tight-display">
            SERVICES
          </h1>
          <p className="mt-4 font-mono text-xs sm:text-sm uppercase tracking-widest text-cream/70 max-w-2xl">
            A production outfit built around lean, director-led crews. We handle narrative cinema, long-form documentary research, and brand storytelling with equal rigor.
          </p>
        </div>

        {/* Seven Alternating Large Panels */}
        <div className="flex flex-col">
          {SERVICES.map((service, index) => {
            const isEven = index % 2 === 1;

            return (
              <section
                key={service.id}
                className="min-h-[85vh] py-16 md:py-24 border-b border-cream/15 px-6 md:px-12 flex items-center"
              >
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Media Column (Alternates) */}
                  <div
                    className={`lg:col-span-6 overflow-hidden border border-cream/15 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <MediaSlot
                      src={service.image}
                      alt={service.title}
                      aspectRatio="16/9"
                      className="w-full h-full"
                    />
                  </div>

                  {/* Text & Deliverables Column */}
                  <div
                    className={`lg:col-span-6 flex flex-col justify-center ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    {/* Mono Index Tag */}
                    <div className="font-mono text-xs uppercase tracking-widest text-terracotta mb-4 flex items-center gap-2">
                      <span>[{service.number}]</span>
                      <span className="w-8 h-[1px] bg-terracotta inline-block" />
                      <span>PRODUCTION DISCIPLINE</span>
                    </div>

                    {/* Heading in condensed display */}
                    <h2 className="font-display-heavy text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-cream leading-[0.92]">
                      {service.title}
                    </h2>

                    {/* Two-line concrete description */}
                    <p className="mt-6 text-cream/80 text-base md:text-lg leading-relaxed">
                      {service.description}
                    </p>

                    {/* "WHAT WE DELIVER" simple mono list */}
                    <div className="mt-8 pt-6 border-t border-cream/10">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-cream/40 block mb-4">
                        WHAT WE DELIVER
                      </span>
                      <ul className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider text-cream/70">
                        {service.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <span className="text-terracotta font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA link to brief */}
                    <div className="mt-8">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cream hover:text-terracotta transition-colors border-b border-cream/30 hover:border-terracotta pb-1"
                      >
                        <span>Commission This Capability</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Closing CTA */}
        <ClosingCtaSection />
      </main>
    </>
  );
};
