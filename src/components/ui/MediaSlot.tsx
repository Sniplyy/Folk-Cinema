import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface MediaSlotProps {
  src: string;
  alt: string;
  videoSrc?: string;
  embedUrl?: string;
  poster?: string;
  aspectRatio?: '16/9' | '9/16' | '4/5' | '1/1' | '2.39/1' | 'auto';
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain';
  cursorLabel?: 'PLAY' | 'VIEW';
  onClick?: () => void;
  showPlayIcon?: boolean;
}

export const MediaSlot: React.FC<MediaSlotProps> = ({
  src,
  alt,
  videoSrc,
  poster,
  aspectRatio = '16/9',
  className = '',
  priority = false,
  objectFit = 'cover',
  cursorLabel = 'VIEW',
  onClick,
  showPlayIcon = false,
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const aspectClass = {
    '16/9': 'aspect-[16/9]',
    '9/16': 'aspect-[9/16]',
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
    '2.39/1': 'aspect-[2.39/1]',
    'auto': '',
  }[aspectRatio];

  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked if unmuted or power saver is on
      });
    }
  }, [videoSrc]);

  return (
    <div
      onClick={onClick}
      data-cursor={cursorLabel}
      className={cn(
        'relative overflow-hidden bg-charcoal-elevated group',
        aspectClass,
        onClick && 'cursor-pointer',
        className
      )}
    >
      {/* Background Poster Image */}
      <img
        src={poster || src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setHasError(true)}
        className={cn(
          'w-full h-full film-grade transition-transform duration-700 ease-out group-hover:scale-105',
          objectFit === 'cover' ? 'object-cover' : 'object-contain',
          videoSrc && isVideoLoaded ? 'opacity-0 absolute inset-0' : 'opacity-100'
        )}
      />

      {/* Looping Ambient Video if present */}
      {videoSrc && !hasError && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={poster || src}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={cn(
            'w-full h-full film-grade absolute inset-0 transition-opacity duration-700',
            objectFit === 'cover' ? 'object-cover' : 'object-contain',
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {/* Subtle play indicator if enabled */}
      {showPlayIcon && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors">
          <div className="w-14 h-14 bg-charcoal border border-cream/20 flex items-center justify-center text-cream group-hover:border-terracotta group-hover:text-terracotta transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
