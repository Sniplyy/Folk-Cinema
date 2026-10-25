import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ManifestoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Statement: 3-4 lines, pure confidence, concrete, culture as the foundation of cinema.
  // Exactly ONE word receives the single hot terracotta accent. No italics. No clichés.
  const words = [
    { text: "We", accent: false },
    { text: "do", accent: false },
    { text: "not", accent: false },
    { text: "treat", accent: false },
    { text: "culture", accent: false },
    { text: "as", accent: false },
    { text: "backdrop", accent: false },
    { text: "or", accent: false },
    { text: "nostalgia.", accent: false },
    { text: "We", accent: false },
    { text: "treat", accent: false },
    { text: "it", accent: false },
    { text: "as", accent: false },
    { text: "the", accent: false },
    { text: "raw", accent: false },
    { text: "architecture", accent: true }, // The single hot accent word
    { text: "of", accent: false },
    { text: "cinema—where", accent: false },
    { text: "ritual,", accent: false },
    { text: "human", accent: false },
    { text: "labour,", accent: false },
    { text: "and", accent: false },
    { text: "unfiltered", accent: false },
    { text: "landscapes", accent: false },
    { text: "command", accent: false },
    { text: "the", accent: false },
    { text: "screen.", accent: false },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !textRef.current) return;

    const spans = textRef.current.querySelectorAll('.manifesto-word');

    // Scroll-linked word opacity from 20% to 100%
    const anim = gsap.fromTo(
      spans,
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: true,
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-charcoal text-cream py-32 md:py-48 px-6 md:px-12 border-t border-cream/10"
      aria-label="Manifesto"
    >
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-xs uppercase tracking-widest text-cream/40 mb-8 flex items-center gap-3">
          <span className="w-2 h-2 bg-cream/40 inline-block" />
          <span>MANIFESTO // POINT OF VIEW</span>
        </div>

        <p
          ref={textRef}
          className="font-display-heavy text-4xl sm:text-5xl md:text-7xl lg:text-[5.25rem] leading-[0.95] tracking-tight uppercase"
        >
          {words.map((word, i) => (
            <span
              key={i}
              className={`manifesto-word inline-block mr-3 md:mr-5 transition-opacity ${
                word.accent ? 'text-terracotta' : 'text-cream'
              }`}
            >
              {word.text}
            </span>
          ))}
        </p>

        {/* Small mono context footnote */}
        <div className="mt-14 pt-8 border-t border-cream/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-cream/60 font-mono text-xs uppercase tracking-widest">
          <div>
            ORIGINAL SCRIPTS • CINEMATOGRAPHY • COMMISSIONED FILMS
          </div>
          <div className="sm:text-right text-cream/40">
            PRODUCED WITH INDEPENDENT DISCIPLINE
          </div>
        </div>
      </div>
    </section>
  );
};
