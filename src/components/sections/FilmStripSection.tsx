import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectItem } from '../../data/projects';
import { MediaSlot } from '../ui/MediaSlot';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FilmStripSectionProps {
  projects: ProjectItem[];
}

export const FilmStripSection: React.FC<FilmStripSectionProps> = ({ projects }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const featured = projects.filter((p) => p.featured).slice(0, 5);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 1024;

    if (prefersReducedMotion || isMobile || !sectionRef.current || !trackRef.current) {
      return;
    }

    const track = trackRef.current;
    const scrollAmount = track.scrollWidth - window.innerWidth;

    const pinAnim = gsap.to(track, {
      x: -scrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollAmount}`,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      pinAnim.scrollTrigger?.kill();
    };
  }, [featured.length]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal text-cream overflow-hidden border-t border-cream/15"
      aria-label="Featured Film Strip"
    >
      {/* Header bar */}
      <div className="px-6 md:px-12 pt-12 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="w-2 h-2 bg-terracotta inline-block" />
          <h2 className="font-mono text-xs uppercase tracking-widest text-cream/70">
            SELECTED WORK // 2024–2026
          </h2>
        </div>
        <Link
          to="/work"
          className="font-mono text-xs uppercase tracking-widest text-terracotta hover:underline flex items-center gap-1.5"
        >
          <span>All Films</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Film Strip Track */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 md:px-12 pb-16 lg:pb-24 pt-4 will-change-transform"
      >
        {featured.map((project, idx) => (
          <article
            key={project.id}
            className="flex-shrink-0 w-full lg:w-[680px] xl:w-[760px] group"
          >
            <Link
              to={`/work/${project.slug}`}
              className="block"
              data-cursor="VIEW"
            >
              {/* 16:9 Frame with MediaSlot and Film Grade */}
              <div className="relative border border-cream/15 group-hover:border-terracotta transition-colors overflow-hidden">
                <MediaSlot
                  src={project.thumbnail}
                  videoSrc={project.preview_url}
                  alt={project.title}
                  aspectRatio="16/9"
                  cursorLabel="VIEW"
                  priority={idx < 2}
                  className="w-full"
                />

                {/* Subtitle tag overlay */}
                <div className="absolute top-4 left-4 bg-charcoal/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cream/90 border border-cream/20">
                  {project.category}
                </div>
              </div>

              {/* Mono Metadata Beneath */}
              <div className="mt-4 flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display-heavy text-2xl lg:text-3xl text-cream group-hover:text-terracotta transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-cream/50">
                    {project.year}
                  </span>
                </div>

                <div className="flex items-center justify-between text-cream/60 font-mono text-xs uppercase tracking-widest pt-1 border-t border-cream/10">
                  <span>{project.role || 'Production House'}</span>
                  {project.runtime && (
                    <span className="text-terracotta font-medium">
                      [{project.runtime}]
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};
