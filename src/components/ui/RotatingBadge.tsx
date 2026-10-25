import React from 'react';
import { cn } from '../../lib/utils';

interface RotatingBadgeProps {
  className?: string;
  size?: number;
  textColor?: string;
  accentColor?: string;
}

export const RotatingBadge: React.FC<RotatingBadgeProps> = ({
  className = '',
  size = 110,
  textColor = '#F1E9DA',
  accentColor = '#D4552B',
}) => {
  return (
    <div
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      style={{ width: size, height: size }}
      aria-label="Folk Cinema - Rooted In Culture Badge"
    >
      {/* Rotating Ring with SVG textPath */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full animate-spin-slow"
        style={{ transformOrigin: '50% 50%' }}
      >
        <defs>
          <path
            id="badgeCirclePath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
          />
        </defs>
        <text
          fill={textColor}
          fontSize="9.4"
          letterSpacing="0.18em"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="600"
          className="uppercase"
        >
          <textPath href="#badgeCirclePath" startOffset="0%">
            FOLK CINEMA • ROOTED IN CULTURE •
          </textPath>
        </text>
      </svg>

      {/* Center Static Emblem: terracotta focal point with viewfinder cross */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-2.5 h-2.5"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </div>
  );
};
