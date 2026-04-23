import { useEffect, useState } from 'react';

export default function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setIsTouch(m.matches);
    update();
    m.addEventListener?.('change', update);
    return () => m.removeEventListener?.('change', update);
  }, []);
  return isTouch;
}
