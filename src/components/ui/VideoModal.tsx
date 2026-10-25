import React, { useEffect, useRef } from 'react';
import { X, Play, Pause } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  embedUrl?: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  embedUrl,
  title = 'Folk Cinema Showcase',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <span className="font-mono text-xs uppercase tracking-widest text-cream/70">
          {title}
        </span>
        <button
          onClick={onClose}
          className="p-3 bg-charcoal border border-cream/20 text-cream hover:border-terracotta hover:text-terracotta transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
      </div>

      {/* Video Content */}
      <div
        className="relative w-full max-w-6xl aspect-[16/9] bg-charcoal border border-cream/15"
        onClick={(e) => e.stopPropagation()}
      >
        {videoSrc ? (
          <div className="relative w-full h-full group">
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain film-grade"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <button
              onClick={togglePlay}
              className="absolute bottom-6 right-6 p-3 bg-charcoal/80 border border-cream/30 text-cream hover:bg-terracotta hover:border-terracotta transition-colors md:hidden"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
          </div>
        ) : embedUrl ? (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full font-mono text-sm uppercase text-cream/60">
            [ Video Media Unavailable ]
          </div>
        )}
      </div>
    </div>
  );
};
