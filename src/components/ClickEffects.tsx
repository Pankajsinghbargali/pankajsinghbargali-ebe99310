import { useEffect } from 'react';

const SELECTOR = 'button, a, [role="button"]';

export default function ClickEffects() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest(SELECTOR) as HTMLElement | null;
      if (!target || target.classList.contains('no-ripple')) return;

      const styles = window.getComputedStyle(target);
      if (styles.position === 'static') target.style.position = 'relative';
      if (styles.overflow === 'visible') target.style.overflow = 'hidden';

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'click-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      target.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 650);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
