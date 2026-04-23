import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RevealHeading from './RevealHeading';

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const dragging = useRef(false);

  function calcPos(clientX: number) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(3, Math.min(97, pct)));
  }

  return (
    <section className="py-24 md:py-36 bg-beige dark:bg-[#0a0a12]">
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

        {/* Outer glow wrapper for 3D glass effect */}
        <div
          className="relative rounded-3xl p-[2px]"
          style={{
            background: 'linear-gradient(135deg, rgba(255,215,0,0.4) 0%, rgba(167,139,250,0.2) 50%, rgba(96,165,250,0.4) 100%)',
            boxShadow: '0 0 60px rgba(255,215,0,0.12), 0 0 120px rgba(167,139,250,0.08), 0 32px 80px rgba(0,0,0,0.4)',
          }}
        >
          {/* Slider container */}
          <div
            ref={containerRef}
            className="relative w-full rounded-[22px] overflow-hidden select-none"
            style={{
              aspectRatio: '2.2 / 1',
              touchAction: 'none',
              cursor: isDragging ? 'grabbing' : 'ew-resize',
              background: '#090914',
            }}
            onPointerDown={(e) => {
              dragging.current = true;
              setIsDragging(true);
              (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
              calcPos(e.clientX);
            }}
            onPointerMove={(e) => {
              if (!dragging.current) return;
              calcPos(e.clientX);
            }}
            onPointerUp={() => { dragging.current = false; setIsDragging(false); }}
            onPointerCancel={() => { dragging.current = false; setIsDragging(false); }}
          >
            {/* ── AFTER panel — right side, clipped from left at pos ── */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #0d0d1a 0%, #0a0a14 60%, #0d0d20 100%)',
                clipPath: `inset(0 0 0 ${pos}%)`,
              }}
            >
              {/* Subtle radial glow */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(96,165,250,0.08) 0%, transparent 60%)' }}
              />
              <div className="text-center px-6 md:px-14 max-w-lg pointer-events-none relative z-10">
                <div
                  className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold"
                  style={{ background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.3)', color: '#ffd700' }}
                >
                  ✦ After — Strategy-led
                </div>
                <p className="font-editorial text-xl md:text-4xl leading-snug text-white">
                  "Stop scrolling. Your next investment is on the 14th floor."
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {[['CTR', '4.8%', '↑'], ['CPL', '₹420', '↓'], ['ROAS', '5.2×', '']].map(([k, v, arr]) => (
                    <div key={k} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                      style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}>
                      {k} <span className="text-white font-bold">{v}</span> {arr && <span>{arr}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── BEFORE panel — left side, clipped from right at (100-pos) ── */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - pos}% 0 0)`,
                background: 'linear-gradient(135deg, #f8f5ef 0%, #f0ece4 100%)',
              }}
            >
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(251,191,36,0.06) 0%, transparent 60%)' }}
              />
              <div className="text-center px-6 md:px-14 max-w-lg relative z-10">
                <div
                  className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-bold"
                  style={{ background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.12)', color: '#888' }}
                >
                  ✦ Before — Generic
                </div>
                <p className="text-lg md:text-3xl font-medium leading-snug" style={{ color: '#555' }}>
                  "Luxury 3 BHK Apartments. Book Now. Limited Time Offer!!"
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {[['CTR', '0.9%', '↓'], ['CPL', '₹1,180', '↑'], ['ROAS', '1.4×', '']].map(([k, v, arr]) => (
                    <div key={k} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                      {k} <span className="font-bold" style={{ color: '#333' }}>{v}</span> {arr && <span>{arr}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── DIVIDER glow line ── */}
            <div
              className="absolute top-0 bottom-0 z-20 pointer-events-none"
              style={{
                left: `${pos}%`,
                width: '2px',
                background: 'linear-gradient(to bottom, transparent 0%, #ffd700 20%, #ffd700 80%, transparent 100%)',
                boxShadow: '0 0 12px rgba(255,215,0,0.8), 0 0 24px rgba(255,215,0,0.3)',
                transform: 'translateX(-50%)',
              }}
            />

            {/* ── HANDLE glass knob ── */}
            <div
              className="absolute top-1/2 z-30 pointer-events-none"
              style={{ left: `${pos}%`, transform: 'translate(-50%, -50%)' }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center gap-0.5 transition-transform duration-150"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '2px solid rgba(255,215,0,0.7)',
                  boxShadow: `0 0 20px rgba(255,215,0,0.5), 0 0 40px rgba(255,215,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)`,
                  transform: isDragging ? 'translate(-50%, -50%) scale(1.15)' : 'translate(-50%, -50%) scale(1)',
                }}
              >
                <ChevronLeft className="w-3.5 h-3.5" style={{ color: '#ffd700' }} />
                <ChevronRight className="w-3.5 h-3.5" style={{ color: '#ffd700' }} />
              </div>
            </div>

            {/* ── Corner labels ── */}
            <div className="absolute top-4 left-5 z-10 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.16em] font-bold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}>
                Before
              </span>
            </div>
            <div className="absolute top-4 right-5 z-10 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.16em] font-bold px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(255,215,0,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,215,0,0.3)', color: '#ffd700' }}>
                After
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
