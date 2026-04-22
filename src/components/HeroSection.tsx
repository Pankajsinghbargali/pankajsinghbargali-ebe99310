import { Suspense, lazy, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

const Globe3D = lazy(() => import('./Globe3D'));

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const handle = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${x * -12}px, ${y * -8}px, 0)`;
      }
      if (globeRef.current) {
        globeRef.current.style.transform = `translate3d(${x * 18}px, ${y * 12}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--gold)/0.06)_0%,_transparent_70%)]" />

      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center gap-8">
        <div ref={textRef} className="flex-1 text-center lg:text-left space-y-6 animate-fade-up transition-transform duration-300 ease-out">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass gold-border-glow">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-gold">AI-Driven Digital Marketing Specialist</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-serif leading-tight">
            <span className="gold-shimmer">Pankaj</span>
            <br />
            <span className="text-foreground">Singh</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            5+ years scaling performance marketing — Meta &amp; Google Ads, <span className="text-gold">AI-powered automation</span>, delivering measurable ROAS, CPL reduction, and qualified pipeline growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gold text-accent-foreground font-semibold hover:opacity-90 transition-all gold-glow hover:scale-105"
            >
              Explore My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg gold-border-glow text-gold font-semibold hover:bg-gold/10 transition-all hover:scale-105"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div ref={globeRef} className="flex-1 w-full h-[400px] md:h-[500px] lg:h-[600px] transition-transform duration-300 ease-out">
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border border-gold/30 animate-pulse" />
            </div>
          }>
            <Globe3D />
          </Suspense>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/50 animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
