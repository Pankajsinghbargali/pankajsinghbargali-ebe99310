import { Suspense, lazy, useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

const GlassBlob3D = lazy(() => import('./GlassBlob3D'));

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    let raf = 0;
    let tx = 0, ty = 0, bx = 0, by = 0;
    const handle = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      tx = x * -8; ty = y * -6;
      bx = x * 14; by = y * 10;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (textRef.current) textRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
          if (blobRef.current) blobRef.current.style.transform = `translate3d(${bx}px, ${by}px, 0)`;
          raf = 0;
        });
      }
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* subtle grain / vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--gold)/0.06)_0%,_transparent_60%)]" />

      <div className="container-narrow relative z-10 grid lg:grid-cols-12 gap-12 items-center pt-24 pb-16">
        <div ref={textRef} className="lg:col-span-7 transition-transform duration-300 ease-out">
          <div className="animate-fade-up">
            <span className="label-eyebrow inline-flex items-center gap-2">
              <span className="w-6 h-px bg-gold" />
              Marketing Strategist
            </span>
          </div>

          <h1
            className="mt-8 text-[2.6rem] sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight animate-fade-up"
            style={{ animationDelay: '120ms', animationFillMode: 'both' }}
          >
            I build marketing systems
            <br className="hidden sm:block" />
            that turn <span className="font-editorial italic font-normal text-gold">attention</span>
            <br className="hidden sm:block" />
            into <span className="font-editorial italic font-normal">intent</span>.
          </h1>

          <p
            className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-up"
            style={{ animationDelay: '260ms', animationFillMode: 'both' }}
          >
            Content, strategy, and psychology designed to attract the right audience —
            and move them from curiosity to conversion.
          </p>

          <div
            className="mt-12 flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: '380ms', animationFillMode: 'both' }}
          >
            <a
              href="#case-studies"
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-ink text-offwhite text-sm font-medium hover:opacity-90 transition-all"
            >
              View My Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-ink/15 text-ink text-sm font-medium hover:bg-ink/5 transition-all"
            >
              Start a conversation
            </a>
          </div>
        </div>

        <div
          ref={blobRef}
          className="lg:col-span-5 w-full h-[360px] md:h-[460px] lg:h-[560px] transition-transform duration-300 ease-out animate-float-slow"
        >
          <Suspense fallback={<div className="w-full h-full" />}>
            <GlassBlob3D />
          </Suspense>
        </div>
      </div>

      <a
        href="#results"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/60 hover:text-gold transition-colors"
        aria-label="Scroll to results"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
