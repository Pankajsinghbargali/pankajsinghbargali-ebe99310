import { useEffect, useRef } from 'react';

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const handle = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, hsl(var(--gold) / 0.08), transparent 60%)`;
      }
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return <div ref={ref} className="pointer-events-none fixed inset-0 z-[1] transition-[background] duration-100" />;
}
