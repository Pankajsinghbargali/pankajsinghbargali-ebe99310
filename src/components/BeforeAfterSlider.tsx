import { useCallback, useEffect, useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';
import RevealHeading from './RevealHeading';

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const captured = useRef(false);

  const move = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, p)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      // For touch: only capture once horizontal threshold passed (avoid breaking vertical scroll)
      if (e.pointerType !== 'mouse' && !captured.current && startPoint.current) {
        const dx = Math.abs(e.clientX - startPoint.current.x);
        const dy = Math.abs(e.clientY - startPoint.current.y);
        if (dx < 8 && dy < 8) return;
        if (dy > dx) { dragging.current = false; return; }
        captured.current = true;
      }
      if (e.pointerType !== 'mouse' && captured.current) e.preventDefault();
      move(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
      captured.current = false;
      startPoint.current = null;
      document.body.style.userSelect = '';
    };
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [move]);

  const handlePointerDown = (e: React.PointerEvent, fromHandle = false) => {
    dragging.current = true;
    startPoint.current = { x: e.clientX, y: e.clientY };
    captured.current = e.pointerType === 'mouse' || fromHandle;
    if (captured.current) {
      document.body.style.userSelect = 'none';
      move(e.clientX);
    }
  };

  return (
    <section className="py-24 md:py-36 bg-beige">
      <div className="container-narrow">
        <div className="max-w-2xl mb-14">
          <RevealHeading as="p" className="label-eyebrow mb-6">— Before / After</RevealHeading>
          <RevealHeading as="h2" delay={100} className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
            Generic ads vs. <span className="font-editorial italic font-normal text-gold">strategy-led</span> creative.
          </RevealHeading>
          <RevealHeading as="p" delay={200} className="mt-6 text-muted-foreground">
            Drag the handle to compare. Same product, same budget — different thinking.
          </RevealHeading>
        </div>

        <div
          ref={containerRef}
          className="glass-pane relative w-full aspect-[16/9] md:aspect-[2.4/1] rounded-2xl overflow-hidden border border-border select-none"
          onPointerDown={(e) => handlePointerDown(e)}
          onClick={(e) => move(e.clientX)}
        >
          {/* AFTER */}
          <div className="absolute inset-0 bg-ink text-offwhite flex items-center justify-center">
            <div className="text-center px-6 md:px-8 max-w-md">
              <div className="label-eyebrow text-gold mb-4">After — Strategy-led</div>
              <p className="font-editorial text-2xl md:text-5xl leading-tight">
                "Stop scrolling. Your next investment is on the 14th floor."
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-offwhite/60">
                <span>CTR 4.8%</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>CPL ₹420</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>ROAS 5.2×</span>
              </div>
            </div>
          </div>

          {/* BEFORE */}
          <div
            className="absolute inset-0 bg-card text-foreground flex items-center justify-center"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <div className="text-center px-6 md:px-8 max-w-md">
              <div className="label-eyebrow mb-4">Before — Generic</div>
              <p className="text-xl md:text-3xl font-medium leading-snug text-muted-foreground">
                "Luxury 3 BHK Apartments. Book Now. Limited Time Offer!!"
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <span>CTR 0.9%</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>CPL ₹1,180</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                <span>ROAS 1.4×</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="absolute top-0 bottom-0 w-px bg-gold pointer-events-none"
            style={{ left: `${pos}%` }}
          />
          <button
            type="button"
            aria-label="Drag to compare"
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 min-h-[44px] min-w-[44px] rounded-full bg-gold text-ink flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing touch-none"
            style={{ left: `${pos}%` }}
            onPointerDown={(e) => { e.stopPropagation(); handlePointerDown(e, true); }}
          >
            <GripVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
