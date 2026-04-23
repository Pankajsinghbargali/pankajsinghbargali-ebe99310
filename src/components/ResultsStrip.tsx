import { TrendingUp, Target, Layers, IndianRupee } from 'lucide-react';
import RevealHeading from './RevealHeading';

const items = [
  { icon: TrendingUp, value: '3×', label: 'Engagement' },
  { icon: Target, value: '60%', label: 'Sharper Lead Quality' },
  { icon: Layers, value: 'Multi-channel', label: 'By design, not by accident' },
  { icon: IndianRupee, value: '15Cr+', label: 'Pipeline Generated' },
];

export default function ResultsStrip() {
  return (
    <section id="results" className="py-24 md:py-32 bg-beige border-y border-border/60">
      <div className="container-narrow">
        <RevealHeading as="p" className="label-eyebrow mb-12">— Outcomes</RevealHeading>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/60 rounded-2xl overflow-hidden border border-border/60">
          {items.map(({ icon: Icon, value, label }, i) => (
            <RevealHeading
              key={label}
              as="div"
              delay={i * 110}
              className="glass-pane bg-background/60 px-5 md:px-8 py-8 md:py-10 group cursor-default"
            >
              <Icon className="w-5 h-5 text-gold mb-5 transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.4} />
              <div className="text-3xl md:text-5xl font-medium tracking-tight">{value}</div>
              <div className="mt-2 text-xs md:text-sm text-muted-foreground">{label}</div>
            </RevealHeading>
          ))}
        </div>
      </div>
    </section>
  );
}
