import { useEffect, useRef } from 'react';
import useIsTouch from '@/hooks/useIsTouch';

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  useEffect(() => {
    if (isTouch) return;
    const handle = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, hsl(var(--gold) / 0.08), transparent 60%)`;
      }
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, [isTouch]);

  if (isTouch) return null;
  return <div ref={ref} className="pointer-events-none fixed inset-0 z-[1] transition-[background] duration-100" />;
}
