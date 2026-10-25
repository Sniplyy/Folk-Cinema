import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    const updatePointer = () => setIsTouchDevice(!mediaQuery.matches);
    updatePointer();
    mediaQuery.addEventListener('change', updatePointer);

    // Check reduced motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      setIsTouchDevice(true);
    }

    const onMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element cursor attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const mode = cursorTarget.getAttribute('data-cursor');
        setCursorType(mode);
      } else {
        setCursorType(null);
      }

      const isClickable = Boolean(
        target.closest('a, button, input, select, textarea, [role="button"]')
      );
      setIsHoveringClickable(isClickable);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', updatePointer);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  // Smooth lerp animation for cursor
  useEffect(() => {
    if (isTouchDevice) return;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const loop = () => {
      setPos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.22),
        y: lerp(prev.y, targetPos.y, 0.22),
      }));
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetPos, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  const isExpanded = Boolean(cursorType);

  return (
    <div
      className="pointer-events-none fixed z-50 transition-[width,height,background-color] duration-200 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {isExpanded ? (
        <div className="flex items-center justify-center bg-terracotta text-cream px-4 py-2 font-mono text-xs uppercase tracking-widest font-bold shadow-2xl">
          {cursorType}
        </div>
      ) : (
        <div
          className={`bg-terracotta transition-all duration-150 ${
            isHoveringClickable ? 'w-5 h-5 opacity-80' : 'w-2.5 h-2.5 opacity-100'
          }`}
        />
      )}
    </div>
  );
};
