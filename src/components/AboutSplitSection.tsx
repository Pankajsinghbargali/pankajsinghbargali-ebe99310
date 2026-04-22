import RevealHeading from './RevealHeading';

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
              My work sits at the intersection of audience psychology, performance media, and
              content. I don't chase trends — I build the conditions for compounding demand.
            </RevealHeading>
            <RevealHeading as="p" delay={400}>
              Recent engagements have driven a 35% reduction in CPL, a 42% lift in ROAS, and
              over ₹15 Cr in qualified pipeline.
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
          <RevealHeading as="div" className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-card border border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/15 via-transparent to-ink/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="font-editorial text-7xl md:text-8xl text-ink/10 leading-none">PS</div>
                <p className="mt-6 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Pankaj Singh — Strategist
                </p>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-xs text-muted-foreground">
              <span>Based in India</span>
              <span>Available worldwide</span>
            </div>
          </RevealHeading>
        </div>
      </div>
    </section>
  );
}
