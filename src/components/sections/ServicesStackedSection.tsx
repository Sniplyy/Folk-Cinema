import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../../data/services';
import { ArrowUpRight } from 'lucide-react';

export const ServicesStackedSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      className="relative bg-charcoal text-cream py-24 md:py-36 px-6 md:px-12 border-t border-cream/15"
      aria-label="Capabilities and Services"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Sticky Heading & Context */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-4">
            Capabilities // Focus
          </span>
          <h2 className="font-display-heavy text-4xl sm:text-5xl lg:text-6xl text-cream leading-[0.9] tracking-tight uppercase">
            What We Shoot & Shape.
          </h2>
          <p className="mt-6 text-cream/70 text-base leading-relaxed max-w-sm">
            We handle projects from narrative conception through final theatrical grading. No bloated crews or disconnected layers—directors who understand the terrain from day one.
          </p>
          <div className="mt-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cream hover:text-terracotta transition-colors border-b border-cream/30 hover:border-terracotta pb-1"
            >
              <span>Explore All Specifications</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Right Column: Plain Stacked List in Big Display Type (No numbers) */}
        <div className="lg:col-span-8 flex flex-col divide-y divide-cream/10 border-y border-cream/10">
          {SERVICES.map((service, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="py-7 md:py-9 transition-colors group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                  <h3
                    className={`font-display-heavy text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight transition-colors duration-200 ${
                      isHovered ? 'text-terracotta translate-x-2' : 'text-cream'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <Link
                    to="/services"
                    className="sm:opacity-0 group-hover:opacity-100 transition-opacity text-terracotta flex-shrink-0"
                    aria-label={`View ${service.title} details`}
                  >
                    <ArrowUpRight size={22} />
                  </Link>
                </div>

                {/* One-line descriptor in mono shown when hovering or always readable on mobile */}
                <div
                  className={`mt-3 font-mono text-xs md:text-sm text-sand transition-all duration-300 ${
                    isHovered
                      ? 'opacity-100 max-h-20 translate-y-0'
                      : 'opacity-0 max-h-0 sm:hidden'
                  }`}
                >
                  {service.shortDesc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
