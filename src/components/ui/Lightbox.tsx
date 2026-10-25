import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: readonly string[] | string[];
  initialIndex?: number;
  caption?: string;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
  caption = 'Production Still',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, images.length]);

  if (!isOpen || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 select-none"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-cream/70">
            {caption}
          </span>
          <span className="font-mono text-xs text-terracotta">
            [{currentIndex + 1} / {images.length}]
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-3 bg-charcoal border border-cream/20 text-cream hover:border-terracotta hover:text-terracotta transition-colors"
          aria-label="Close lightbox"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Image */}
      <div
        className="relative max-w-6xl max-h-[85vh] p-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Gallery frame ${currentIndex + 1}`}
          className="max-h-[80vh] w-auto max-w-full object-contain film-grade border border-cream/10"
        />
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-charcoal/80 border border-cream/20 text-cream hover:border-terracotta hover:text-terracotta transition-colors"
            aria-label="Previous still"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-charcoal/80 border border-cream/20 text-cream hover:border-terracotta hover:text-terracotta transition-colors"
            aria-label="Next still"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  );
};
