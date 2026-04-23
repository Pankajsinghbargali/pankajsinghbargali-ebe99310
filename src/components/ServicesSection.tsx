import { Target, PenLine, Workflow, Compass, Zap, BarChart3 } from 'lucide-react';
import RevealHeading from './RevealHeading';
import GoogleAdsIcon from './brand/GoogleAdsIcon';
import MetaAdsIcon from './brand/MetaAdsIcon';

const services = [
  { icon: Target, title: 'Performance Marketing', desc: 'Meta, Google & LinkedIn campaigns engineered for ROAS, not impressions.', brand: true },
  { icon: PenLine, title: 'Content Strategy', desc: 'Editorial systems built around your buyer — not the algorithm of the week.' },
  { icon: Workflow, title: 'Funnel Design', desc: 'End-to-end journeys mapped from first touch to closed revenue.' },
  { icon: Compass, title: 'Brand Positioning', desc: 'A clear, defensible promise that earns premium pricing and loyalty.' },
  { icon: Zap, title: 'Marketing Automation', desc: 'Lifecycle flows, lead scoring, and CRM choreography that scale silently.' },
  { icon: BarChart3, title: 'Analytics & Insights', desc: 'Dashboards that surface decisions, not data. Measure what moves money.' },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-36 bg-beige">
      <div className="container-narrow">
        <div className="max-w-2xl mb-16">
          <RevealHeading as="p" className="label-eyebrow mb-6">— Services</RevealHeading>
          <RevealHeading as="h2" delay={100} className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
            Six disciplines, one operating system for <span className="font-editorial italic font-normal text-gold">growth</span>.
          </RevealHeading>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/70 rounded-2xl overflow-hidden border border-border">
          {services.map(({ icon: Icon, title, desc, brand }, i) => (
            <RevealHeading
              key={title}
              as="div"
              delay={i * 80}
              className="glass-pane bg-background p-8 md:p-10 group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_hsl(var(--gold)/0.25)]"
            >
              <div className="flex items-center justify-between mb-8">
                <Icon className="w-6 h-6 text-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.4} />
                {brand && (
                  <div className="flex items-center gap-2 opacity-80">
                    <GoogleAdsIcon className="h-4 w-4" />
                    <MetaAdsIcon className="h-4 w-6" />
                  </div>
                )}
              </div>
              <h3 className="text-lg md:text-xl font-medium tracking-tight">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </RevealHeading>
          ))}
        </div>
      </div>
    </section>
  );
}
