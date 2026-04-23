import { Suspense, lazy, useEffect, useRef } from 'react';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import GoogleAdsIcon from './brand/GoogleAdsIcon';
import MetaAdsIcon from './brand/MetaAdsIcon';

const GlassBlob3D = lazy(() => import('./GlassBlob3D'));

const headlineWords = [
  { text: 'I', delay: 0 },
  { text: 'build', delay: 60 },
  { text: 'marketing', delay: 120 },
  { text: 'systems', delay: 180 },
  { text: 'that', delay: 280 },
  { text: 'turn', delay: 340 },
];
const headlineWords2 = [
  { text: 'attention', delay: 420, italic: true, gold: true },
  { text: 'into', delay: 520 },
  { text: 'intent.', delay: 580, italic: true },
];

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

      {/* Mobile blob behind text */}
      <div
        ref={blobRef}
        className="absolute lg:relative inset-0 lg:inset-auto lg:col-span-5 w-full h-full lg:h-[560px] pointer-events-none lg:pointer-events-auto opacity-40 lg:opacity-100 transition-transform duration-300 ease-out lg:animate-float-slow z-0 lg:z-auto"
      >
        <div className="relative w-full h-full">
          <div className="hero-aura" />
          <Suspense fallback={<div className="w-full h-full" />}>
            <GlassBlob3D />
          </Suspense>
        </div>
      </div>

      <div className="container-narrow relative z-10 grid lg:grid-cols-12 gap-12 items-center pt-24 pb-16">
        {/* Vertical metric strip — desktop only */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-start gap-8 [writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>5+ yrs</span>
          <span className="text-gold">·</span>
          <span>₹15Cr+ pipeline</span>
          <span className="text-gold">·</span>
          <span>35% lower CPL</span>
        </div>

        <div ref={textRef} className="lg:col-span-6 transition-transform duration-300 ease-out">
          <div className="animate-fade-up">
            <span className="label-eyebrow inline-flex items-center gap-2">
              <span className="w-6 h-px bg-gold" />
              Marketing Strategist
            </span>
          </div>

          <h1 className="mt-8 text-[2.6rem] sm:text-6xl lg:text-7xl font-medium leading-[1.02] tracking-tight">
            {headlineWords.map((w, i) => (
              <span key={i} className="word mr-[0.25em]">
                <span style={{ animationDelay: `${w.delay}ms` }}>{w.text}</span>
              </span>
            ))}
            <br className="hidden sm:block" />
            {headlineWords2.map((w, i) => (
              <span key={i} className="word mr-[0.25em]">
                <span
                  style={{ animationDelay: `${w.delay}ms` }}
                  className={`${w.italic ? 'font-editorial italic font-normal' : ''} ${w.gold ? 'text-gold' : ''}`}
                >
                  {w.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-up"
            style={{ animationDelay: '700ms', animationFillMode: 'both' }}
          >
            I design content, funnels, and media systems that turn the right attention
            into measurable revenue.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: '820ms', animationFillMode: 'both' }}
          >
            <a
              href="#case-studies"
              className="glass-pane group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-ink text-offwhite text-sm font-medium hover:opacity-95 transition-all"
            >
              View My Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="glass-pane inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-ink/15 text-ink text-sm font-medium hover:bg-ink/5 transition-all"
            >
              Start a conversation
            </a>
          </div>

          {/* Trusted on glass strip */}
          <div
            className="mt-10 inline-flex items-center gap-4 px-5 py-3 rounded-full glass-pane animate-fade-up"
            style={{ animationDelay: '950ms', animationFillMode: 'both' }}
          >
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="w-3 h-3 text-gold" />
              Trusted on
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="flex items-center gap-2 text-xs font-medium text-foreground/80">
              <GoogleAdsIcon className="h-4 w-4" /> Google Ads
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="flex items-center gap-2 text-xs font-medium text-foreground/80">
              <MetaAdsIcon className="h-4 w-6" /> Meta Ads
            </span>
          </div>
        </div>

        {/* Spacer for desktop blob position */}
        <div className="hidden lg:block lg:col-span-5" />
      </div>

      <a
        href="#results"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/60 hover:text-gold transition-colors z-10"
        aria-label="Scroll to results"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
