import { useCallback, useEffect, useRef, useState } from 'react';
import { GripVertical } from 'lucide-react';
import RevealHeading from './RevealHeading';

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(4, Math.min(96, p)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => { if (dragging.current) move(e.clientX); };
    const onUp = () => { dragging.current = false; document.body.style.userSelect = ''; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [move]);

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
          className="relative w-full aspect-[16/9] md:aspect-[2.4/1] rounded-2xl overflow-hidden border border-border select-none touch-none"
          onPointerDown={(e) => { dragging.current = true; document.body.style.userSelect = 'none'; move(e.clientX); }}
        >
          {/* AFTER (full background) */}
          <div className="absolute inset-0 bg-ink text-offwhite flex items-center justify-center">
            <div className="text-center px-8 max-w-md">
              <div className="label-eyebrow text-gold mb-4">After — Strategy-led</div>
              <p className="font-editorial text-3xl md:text-5xl leading-tight">
                "Stop scrolling. Your next investment is on the 14th floor."
              </p>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-offwhite/60">
                <span>CTR 4.8%</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>CPL ₹420</span>
                <span className="w-1 h-1 rounded-full bg-gold" />
                <span>ROAS 5.2×</span>
              </div>
            </div>
          </div>

          {/* BEFORE (clipped overlay) */}
          <div
            className="absolute inset-0 bg-card text-foreground flex items-center justify-center"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <div className="text-center px-8 max-w-md">
              <div className="label-eyebrow mb-4">Before — Generic</div>
              <p className="text-2xl md:text-3xl font-medium leading-snug text-muted-foreground">
                "Luxury 3 BHK Apartments. Book Now. Limited Time Offer!!"
              </p>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
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
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gold text-ink flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing"
            style={{ left: `${pos}%` }}
            onPointerDown={(e) => { e.stopPropagation(); dragging.current = true; document.body.style.userSelect = 'none'; }}
          >
            <GripVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
