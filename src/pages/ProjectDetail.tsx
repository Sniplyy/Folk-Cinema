import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProjects } from '../lib/supabase';
import type { ProjectItem } from '../data/projects';
import { MediaSlot } from '../components/ui/MediaSlot';
import { Lightbox } from '../components/ui/Lightbox';
import { VideoModal } from '../components/ui/VideoModal';
import { Play, ArrowLeft, ArrowUpRight } from 'lucide-react';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<ProjectItem | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectItem[]>([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetchProjects().then((items) => {
      setAllProjects(items);
      const current = items.find((p) => p.slug === slug);
      if (current) {
        setProject(current);
      } else {
        // Fallback or redirect if not found
        navigate('/work');
      }
    });
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (!project) {
    return (
      <div className="min-h-screen bg-charcoal flex items-center justify-center font-mono text-xs uppercase tracking-widest text-cream/50">
        Loading Footage...
      </div>
    );
  }

  // Calculate Next Project
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length] || allProjects[0];

  return (
    <>
      <Helmet>
        <title>{`${project.title} — Folk Cinema`}</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} — Folk Cinema`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.thumbnail} />
      </Helmet>

      <main className="bg-charcoal text-cream min-h-screen pt-20">
        {/* Back Link */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cream/60 hover:text-terracotta transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Work</span>
          </Link>
        </div>

        {/* 1. Full-Bleed Hero Media with Lite Embed Trigger */}
        <section className="relative w-full aspect-[21/9] min-h-[380px] max-h-[80vh] bg-charcoal-elevated overflow-hidden border-y border-cream/15 group">
          <MediaSlot
            src={project.thumbnail}
            videoSrc={project.preview_url}
            alt={project.title}
            aspectRatio="auto"
            priority={true}
            className="w-full h-full"
          />

          {/* Fullscreen Video Trigger Button */}
          {project.video_url && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/45 transition-colors">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                data-cursor="PLAY"
                className="flex items-center gap-3 px-6 py-3.5 bg-charcoal border border-cream/30 text-cream hover:border-terracotta hover:text-terracotta transition-colors font-mono text-xs uppercase tracking-widest"
              >
                <Play size={14} className="fill-current" />
                <span>Play Complete Film</span>
              </button>
            </div>
          )}
        </section>

        {/* 2. Title & Mono Metadata Row (Only render fields with data) */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 border-b border-cream/15">
          <h1 className="font-display-mega text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-condensed-display text-cream leading-tight-display">
            {project.title}
          </h1>

          {/* Metadata Row */}
          <div className="mt-8 pt-8 border-t border-cream/15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 font-mono text-xs uppercase tracking-wider text-cream/70">
            {project.category && (
              <div>
                <span className="text-cream/40 block text-[10px] mb-1">Category</span>
                <span className="text-cream font-medium">{project.category}</span>
              </div>
            )}
            {project.year && (
              <div>
                <span className="text-cream/40 block text-[10px] mb-1">Year</span>
                <span className="text-cream font-medium">{project.year}</span>
              </div>
            )}
            {project.runtime && (
              <div>
                <span className="text-cream/40 block text-[10px] mb-1">Runtime</span>
                <span className="text-cream font-medium">{project.runtime}</span>
              </div>
            )}
            {project.role && (
              <div>
                <span className="text-cream/40 block text-[10px] mb-1">Role</span>
                <span className="text-cream font-medium">{project.role}</span>
              </div>
            )}
            {project.client && (
              <div>
                <span className="text-cream/40 block text-[10px] mb-1">Commissioned By</span>
                <span className="text-terracotta font-medium">{project.client}</span>
              </div>
            )}
          </div>
        </section>

        {/* 3. Synopsis & Credits Split */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Narrow readable synopsis column */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-widest text-terracotta block mb-4">
              Synopsis // Context
            </span>
            <p className="text-cream text-lg md:text-xl leading-relaxed">
              {project.synopsis}
            </p>
            {project.description && project.description !== project.synopsis && (
              <p className="mt-6 text-cream/70 text-base leading-relaxed">
                {project.description}
              </p>
            )}
          </div>

          {/* Credits two-column mono list */}
          <div className="lg:col-span-5 bg-charcoal-elevated p-8 border border-cream/10">
            <span className="font-mono text-xs uppercase tracking-widest text-cream/40 block mb-6 border-b border-cream/15 pb-2">
              Production Credits
            </span>
            <dl className="flex flex-col divide-y divide-cream/10">
              {project.credits.map((c, i) => (
                <div key={i} className="py-2.5 flex justify-between items-baseline font-mono text-xs">
                  <dt className="text-cream/50 uppercase tracking-wider">{c.role}</dt>
                  <dd className="text-cream text-right font-medium">{c.name}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 4. Production Stills Gallery with Lightbox */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-cream/15">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-cream/60">
                Production Stills // 35mm & Medium Format
              </span>
              <span className="font-mono text-xs text-terracotta uppercase">
                [{project.gallery.length} Frames]
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {project.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                  data-cursor="VIEW"
                  className="cursor-pointer border border-cream/15 hover:border-terracotta transition-colors overflow-hidden group"
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} still ${idx + 1}`}
                    className="w-full aspect-[16/9] object-cover film-grade group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Full-Width "Next Project" Block filling viewport on hover */}
        {nextProject && (
          <Link
            to={`/work/${nextProject.slug}`}
            className="group relative block w-full bg-charcoal-surface border-t border-cream/20 py-28 md:py-40 px-6 md:px-12 overflow-hidden transition-colors hover:bg-terracotta"
          >
            <div className="max-w-7xl mx-auto flex flex-col justify-between relative z-10">
              <div className="font-mono text-xs uppercase tracking-widest text-cream/60 group-hover:text-cream transition-colors flex items-center gap-2">
                <span>NEXT PRODUCTION</span>
                <ArrowUpRight size={16} />
              </div>

              <div className="mt-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <h2 className="font-display-mega text-5xl sm:text-7xl md:text-9xl uppercase tracking-condensed-display text-cream leading-tight-display group-hover:translate-x-4 transition-transform duration-300">
                  {nextProject.title}
                </h2>
                <span className="font-mono text-sm uppercase tracking-widest text-cream/70 group-hover:text-cream">
                  {nextProject.category} // {nextProject.year}
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Lightbox for gallery stills */}
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={project.gallery}
          initialIndex={lightboxIndex}
          caption={`${project.title} Production Still`}
        />

        {/* Video Player Modal */}
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoSrc={project.video_url}
          title={`${project.title} (${project.year})`}
        />
      </main>
    </>
  );
};
