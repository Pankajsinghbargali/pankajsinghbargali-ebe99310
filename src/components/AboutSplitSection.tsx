import RevealHeading from './RevealHeading';
import TiltCard from './TiltCard';

export default function AboutSplitSection() {
  return (
    <section id="about" className="py-24 md:py-36 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(var(--gold)/0.05)_0%,_transparent_55%)] pointer-events-none" />

      <div className="container-narrow relative grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <RevealHeading as="p" className="label-eyebrow mb-6">— About</RevealHeading>
          <RevealHeading as="h2" delay={100} className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
            A strategist who treats marketing as <span className="font-editorial italic font-normal text-gold">infrastructure</span>.
          </RevealHeading>

          <div className="mt-8 space-y-5 text-foreground/85 leading-relaxed max-w-xl">
            <RevealHeading as="p" delay={200}>
              I'm Pankaj Singh — a marketing strategist with five years building growth systems
              for real estate, B2B, and consumer brands across India and the GCC.
            </RevealHeading>
            <RevealHeading as="p" delay={300}>
              I work with founders and marketing leads who'd rather build a compounding asset
              than rent a spike. The work sits at the intersection of audience psychology,
              performance media, and content.
            </RevealHeading>
            <RevealHeading as="p" delay={400}>
              Recent engagements: 35% reduction in CPL, 42% lift in ROAS, and over ₹15 Cr in
              qualified pipeline.
            </RevealHeading>
          </div>

          <RevealHeading as="div" delay={500} className="mt-10 flex flex-wrap gap-3">
            {['Performance Media', 'Brand Strategy', 'Funnel Design', 'Content Systems', 'Analytics'].map((t) => (
              <span key={t} className="px-4 py-2 rounded-full border border-border text-xs text-muted-foreground hover:border-gold hover:text-gold transition-colors">
                {t}
              </span>
            ))}
          </RevealHeading>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2">
          <RevealHeading as="div" className="relative aspect-[4/5] w-full max-w-sm mx-auto lg:max-w-none">
            <TiltCard intensity={12} className="w-full h-full rounded-2xl overflow-hidden border border-border/50 bg-background/40 backdrop-blur-xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-background/50 to-background/80 z-0" />
              <div className="absolute inset-0 flex flex-col justify-between p-8 z-10">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center">
                    <span className="font-editorial text-xl text-gold">PS</span>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground bg-background/50 backdrop-blur px-3 py-1 rounded-full border border-border/50">
                    Based in India · Works globally
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-serif text-foreground">Pankaj Singh</h3>
                    <p className="text-gold text-sm tracking-wide">Growth & Strategy</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-[90%]">
                    Building compounding marketing assets that drive long-term revenue.
                  </p>
                </div>
              </div>
            </TiltCard>
            {/* Decorative background glow */}
            <div className="absolute -inset-6 bg-gold/10 blur-3xl -z-10 rounded-[4rem]" />
          </RevealHeading>
        </div>
      </div>
    </section>
  );
}
