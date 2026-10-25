import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProjects } from '../lib/supabase';
import type { ProjectItem } from '../data/projects';
import { CATEGORIES, type CategoryType } from '../lib/constants';
import { MediaSlot } from '../components/ui/MediaSlot';
import { LayoutGrid, List as ListIcon, ArrowUpRight } from 'lucide-react';

export const Work: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<CategoryType>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Floating cursor preview state for List view
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const listContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Work — Folk Cinema</title>
        <meta
          name="description"
          content="Complete portfolio of original cinema, documentaries, commercial ad films, and photographic essays by Folk Cinema."
        />
      </Helmet>

      <main
        className="min-h-screen bg-charcoal text-cream pt-28 md:pt-36 pb-24 px-4 sm:px-8 md:px-12"
        onMouseMove={handleMouseMove}
      >
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-12 border-b border-cream/15 pb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-cream/50 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-terracotta inline-block" />
            <span>ARCHIVE // PRODUCTION INDEX</span>
          </div>

          <h1 className="font-display-mega text-6xl sm:text-8xl md:text-9xl uppercase tracking-condensed-display text-cream leading-tight-display">
            WORK
          </h1>

          <p className="mt-4 font-mono text-xs md:text-sm uppercase tracking-widest text-cream/70 max-w-xl">
            Selected feature cinema, documentaries, commissioned ads, and craft studies shot across the Indian subcontinent.
          </p>
        </div>

        {/* Filter and View Toggle Row */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Categories Filter in Mono with Active Terracotta Underline */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-wider" role="tablist">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative py-1.5 transition-colors ${
                    isActive ? 'text-cream font-bold' : 'text-cream/50 hover:text-cream'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-terracotta"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Grid / List View Toggle */}
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cream/60 select-none">
            <span className="hidden sm:inline">VIEW:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 border transition-colors ${
                viewMode === 'grid'
                  ? 'border-terracotta text-terracotta bg-charcoal-elevated'
                  : 'border-cream/20 text-cream/60 hover:text-cream'
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 border transition-colors ${
                viewMode === 'list'
                  ? 'border-terracotta text-terracotta bg-charcoal-elevated'
                  : 'border-cream/20 text-cream/60 hover:text-cream'
              }`}
              aria-label="List view"
            >
              <ListIcon size={16} />
            </button>
          </div>
        </div>

        {/* Content Views */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              /* GRID VIEW: Tight, edge-to-edge tiles with 2px gap, mixed sizes, reels as 9:16 tiles */
              <motion.div
                key="grid-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
              >
                {filteredProjects.map((project, idx) => {
                  const isReel = project.category === 'Reels' || project.aspectRatio === '9/16';
                  const isLarge = idx % 4 === 0 && !isReel;

                  return (
                    <motion.article
                      key={project.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`relative group bg-charcoal-elevated overflow-hidden border border-cream/10 hover:border-terracotta transition-colors ${
                        isLarge ? 'sm:col-span-2' : 'col-span-1'
                      }`}
                    >
                      <Link
                        to={`/work/${project.slug}`}
                        className="block w-full h-full"
                        data-cursor="VIEW"
                      >
                        <div className="relative w-full overflow-hidden">
                          <MediaSlot
                            src={project.thumbnail}
                            videoSrc={project.preview_url}
                            alt={project.title}
                            aspectRatio={isReel ? '9/16' : isLarge ? '2.39/1' : '16/9'}
                            cursorLabel="VIEW"
                            className="w-full"
                          />

                          {/* Hover Overlay with Metadata */}
                          <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between pointer-events-none">
                            <div className="flex justify-between items-start">
                              <span className="bg-terracotta text-cream px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider font-semibold">
                                {project.category}
                              </span>
                              <span className="font-mono text-xs text-cream/70">
                                {project.year}
                              </span>
                            </div>

                            <div>
                              <h2 className="font-display-heavy text-2xl sm:text-3xl text-cream">
                                {project.title}
                              </h2>
                              <p className="font-mono text-xs text-cream/70 uppercase tracking-widest mt-1">
                                {project.role || 'Production House'} {project.runtime && `// ${project.runtime}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  );
                })}
              </motion.div>
            ) : (
              /* LIST VIEW: Huge titles with cursor-following preview */
              <motion.div
                key="list-view"
                ref={listContainerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col divide-y divide-cream/15 border-y border-cream/15 relative"
              >
                {filteredProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/work/${project.slug}`}
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="py-8 md:py-10 flex flex-col md:flex-row md:items-baseline justify-between gap-4 group transition-colors"
                  >
                    <div className="flex items-baseline gap-4 md:gap-8">
                      <span className="font-mono text-xs text-cream/40 group-hover:text-terracotta transition-colors">
                        [0{project.sort_order}]
                      </span>
                      <h2 className="font-display-heavy text-4xl sm:text-5xl md:text-7xl uppercase tracking-tight text-cream group-hover:text-terracotta group-hover:translate-x-3 transition-all duration-200">
                        {project.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-6 font-mono text-xs uppercase tracking-widest text-cream/60">
                      <span>{project.category}</span>
                      <span className="w-1.5 h-1.5 bg-cream/30" />
                      <span>{project.year}</span>
                      <ArrowUpRight
                        size={18}
                        className="text-terracotta opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </Link>
                ))}

                {/* Floating Preview following mouse cursor on desktop */}
                {hoveredProject && (
                  <div
                    className="fixed pointer-events-none z-30 hidden lg:block w-72 h-44 overflow-hidden border border-cream/20 shadow-2xl bg-charcoal"
                    style={{
                      left: `${mousePos.x + 24}px`,
                      top: `${mousePos.y - 88}px`,
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  >
                    <MediaSlot
                      src={hoveredProject.thumbnail}
                      videoSrc={hoveredProject.preview_url}
                      alt={hoveredProject.title}
                      aspectRatio="16/9"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};
