import { useEffect, useRef, useState } from 'react';
import { Bot, TrendingUp, Globe, BarChart3 } from 'lucide-react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-4xl md:text-5xl font-bold font-serif gold-shimmer">{count}{suffix}</div>;
}

const stats = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 50, suffix: '+', label: 'Brands Managed' },
  { value: 200, suffix: '%', label: 'Avg ROI Increase' },
  { value: 10, suffix: 'M+', label: 'Ad Spend Managed' },
];

const strengths = [
  { icon: Bot, label: 'AI-Driven Campaigns' },
  { icon: TrendingUp, label: 'Performance Marketing' },
  { icon: Globe, label: 'Global Market Reach' },
  { icon: BarChart3, label: 'Data Analytics' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--gold)/0.04)_0%,_transparent_50%)]" />
      <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">
            Digital Marketing <span className="gold-shimmer">Visionary</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Results-driven Digital Marketing Specialist with 5+ years of experience in managing 
            multi-channel campaigns across Google, Meta, LinkedIn & programmatic platforms. 
            Proven track record in scaling ad spends, improving ROAS, and building data-driven 
            strategies powered by <span className="text-gold font-semibold">AI and automation</span>.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 glass rounded-xl gold-border-glow">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Strengths */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {strengths.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-4 glass rounded-xl gold-border-glow hover:bg-gold/5 transition-all group cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
