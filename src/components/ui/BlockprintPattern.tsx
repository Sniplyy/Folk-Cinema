import React from 'react';

interface BlockprintPatternProps {
  className?: string;
  opacity?: number;
  color?: string;
}

export const BlockprintPattern: React.FC<BlockprintPatternProps> = ({
  className = '',
  opacity = 0.08,
  color = '#141210',
}) => {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="folkBlockprintPattern"
          width="80"
          height="80"
          patternUnits="userSpaceOnUse"
        >
          {/* Authentic Indian Woodblock geometric grid: interlocking diamond matrix and serrated stamps */}
          <path
            d="M 40 0 L 80 40 L 40 80 L 0 40 Z"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M 40 12 L 68 40 L 40 68 L 12 40 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <rect
            x="36"
            y="36"
            width="8"
            height="8"
            fill={color}
          />
          <path
            d="M 0 0 L 16 0 L 0 16 Z M 80 0 L 64 0 L 80 16 Z M 0 80 L 16 80 L 0 64 Z M 80 80 L 64 80 L 80 64 Z"
            fill={color}
          />
          <circle cx="40" cy="0" r="2.5" fill={color} />
          <circle cx="80" cy="40" r="2.5" fill={color} />
          <circle cx="40" cy="80" r="2.5" fill={color} />
          <circle cx="0" cy="40" r="2.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#folkBlockprintPattern)" />
    </svg>
  );
};
