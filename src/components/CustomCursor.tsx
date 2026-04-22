import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const handleMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (hidden) setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
    };

    const animate = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.6 : 1})`;
      }
      raf = requestAnimationFrame(animate);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [role="button"], .cursor-hover')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const handleLeave = () => setHidden(true);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', handleLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(raf);
    };
  }, [hovering, hidden]);

  return (
    <>
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] w-2 h-2 rounded-full bg-gold transition-opacity duration-200 ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ boxShadow: '0 0 12px hsl(var(--gold) / 0.8)' }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] w-10 h-10 rounded-full border border-gold/60 transition-[opacity,border-color] duration-200 ${hidden ? 'opacity-0' : 'opacity-100'} ${hovering ? 'border-gold bg-gold/10' : ''}`}
        style={{ transition: 'transform 0.05s linear, opacity 0.2s, border-color 0.2s' }}
      />
    </>
  );
}
