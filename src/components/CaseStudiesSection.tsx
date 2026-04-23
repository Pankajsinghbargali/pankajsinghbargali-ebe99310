import { useEffect, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import RevealHeading from './RevealHeading';

interface Case {
  tag: string;
  title: string;
  result: string;
  challenge: string;
  strategy: string;
  execution: string;
  outcome: string;
}

const cases: Case[] = [
  {
    tag: 'Real Estate · Google Ads · Meta Ads',
    title: 'Real Estate Lead Engine',
    result: '35% lower CPL · 15Cr+ pipeline',
    challenge: 'High-intent buyers were buried under generic listing traffic, inflating cost-per-lead and exhausting the sales team with low-quality enquiries.',
    strategy: 'Rebuilt audience targeting around behavioural intent signals. Mapped funnel stages to creative formats — discovery, consideration, conversion — and aligned ad creative with sales-team friction points.',
    execution: 'Launched a system of Meta + Google campaigns with dynamic creative, audience exclusions, and a lead-scoring layer feeding directly into the CRM.',
    outcome: 'Cost-per-lead dropped 35%, qualified site visits doubled, and the pipeline crossed 15Cr in six months.',
  },
  {
    tag: 'B2B SaaS',
    title: 'B2B Pipeline Builder',
    result: '42% ROAS lift · 2× MQL volume',
    challenge: 'Long sales cycles and a thin top-of-funnel meant marketing and sales were misaligned on what a "good lead" looked like.',
    strategy: 'Built a content-led acquisition system: positioning audit, ICP refinement, and a thought-leadership engine running across LinkedIn, search, and email.',
    execution: 'Quarterly content sprints feeding paid amplification. Built a lead-scoring model and weekly sync between SDRs and marketing on signal quality.',
    outcome: 'ROAS improved 42%, MQLs doubled, and sales adopted the lead model as their primary qualification framework.',
  },
  {
    tag: 'Travel & Lifestyle',
    title: 'Travel Brand Relaunch',
    result: '3× engagement · brand equity rebuild',
    challenge: 'A legacy travel brand had lost relevance with younger travellers — engagement was declining and the brand felt dated.',
    strategy: 'Repositioned around a single emotional promise. Built a content system around traveller stories rather than destination listicles.',
    execution: 'Six-month content calendar across Instagram, YouTube Shorts, and email. Influencer collaborations chosen by audience overlap, not follower count.',
    outcome: 'Engagement tripled, organic reach grew 4×, and the brand became a reference point in its category.',
  },
];

export default function CaseStudiesSection() {
  const [open, setOpen] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // very subtle parallax
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const offset = Math.max(-30, Math.min(30, rect.top * -0.04));
          containerRef.current.style.setProperty('--parallax', `${offset}px`);
        }
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="case-studies" className="py-24 md:py-36 bg-background">
      <div className="container-narrow">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <div>
            <RevealHeading as="p" className="label-eyebrow mb-6">— Selected Work</RevealHeading>
            <RevealHeading as="h2" delay={100} className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight max-w-2xl leading-[1.05]">
              Strategy, made <span className="font-editorial italic font-normal text-gold">measurable</span>.
            </RevealHeading>
          </div>
          <RevealHeading as="p" delay={200} className="text-muted-foreground max-w-sm">
            Three engagements where the system mattered more than the campaign.
          </RevealHeading>
        </div>

        <div ref={containerRef} className="space-y-4" style={{ transform: 'translateY(var(--parallax, 0px))', transition: 'transform 0.6s ease-out' }}>
          {cases.map((c, i) => {
            const isOpen = open === i;
            return (
              <article
                key={c.title}
                className="border border-border bg-card/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-ink/25"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 p-6 md:p-8 text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="label-eyebrow text-gold">{c.tag}</span>
                      <span className="w-6 h-px bg-border" />
                      <span className="text-xs text-muted-foreground">{c.result}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight">{c.title}</h3>
                  </div>
                  <span className="shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center transition-colors group-hover:border-ink">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-8 grid md:grid-cols-2 gap-x-12 gap-y-8 border-t border-border/60 pt-8">
                      {[
                        ['Challenge', c.challenge],
                        ['Strategy', c.strategy],
                        ['Execution', c.execution],
                        ['Result', c.outcome],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <div className="label-eyebrow mb-3">{k}</div>
                          <p className="text-foreground/85 leading-relaxed">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
