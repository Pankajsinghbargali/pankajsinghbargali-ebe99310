import { TrendingUp, Target, Layers } from 'lucide-react';
import RevealHeading from './RevealHeading';

const items = [
  { icon: TrendingUp, value: '3×', label: 'Engagement Growth' },
  { icon: Target, value: '60%', label: 'Better Lead Quality' },
  { icon: Layers, value: 'Multi-platform', label: 'Strategy Execution' },
];

export default function ResultsStrip() {
  return (
    <section id="results" className="py-24 md:py-32 bg-beige border-y border-border/60">
      <div className="container-narrow">
        <RevealHeading as="p" className="label-eyebrow mb-12">— Outcomes</RevealHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/70">
          {items.map(({ icon: Icon, value, label }, i) => (
            <RevealHeading
              key={label}
              as="div"
              delay={i * 120}
              className="px-0 md:px-10 py-10 md:py-6 group cursor-default"
            >
              <Icon className="w-5 h-5 text-gold mb-6 transition-transform duration-500 group-hover:-translate-y-1" strokeWidth={1.4} />
              <div className="text-4xl md:text-5xl font-medium tracking-tight">{value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{label}</div>
            </RevealHeading>
          ))}
        </div>
      </div>
    </section>
  );
}
