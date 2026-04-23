import { useEffect } from 'react';

export default function ClickEffects() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleClick = (event: MouseEvent) => {
      // Skip clicks inside non-interactive empty areas? — accept all clicks for premium feel.
      const x = event.clientX;
      const y = event.clientY;

      const dot = document.createElement('span');
      dot.className = 'click-pulse-dot';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      const ring = document.createElement('span');
      ring.className = 'click-pulse-ring';
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;

      document.body.appendChild(dot);
      document.body.appendChild(ring);

      window.setTimeout(() => { dot.remove(); ring.remove(); }, 800);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
