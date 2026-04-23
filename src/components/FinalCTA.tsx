import { ArrowUpRight } from 'lucide-react';
import RevealHeading from './RevealHeading';

export default function FinalCTA() {
  return (
    <section id="contact" className="py-28 md:py-40 bg-ink text-offwhite relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--gold)/0.12)_0%,_transparent_60%)] pointer-events-none" />

      <div className="container-narrow relative text-center max-w-3xl">
        <RevealHeading as="p" className="label-eyebrow text-gold mb-8">— Let's talk</RevealHeading>

        <RevealHeading as="h2" delay={100} className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]">
          If you want <span className="font-editorial italic font-normal text-gold">better</span> marketing,
          not just <span className="font-editorial italic font-normal">more</span> marketing —
          let's talk.
        </RevealHeading>

        <RevealHeading as="p" delay={250} className="mt-8 text-offwhite/70 max-w-xl mx-auto">
          A handful of engagements per quarter. For teams who want a marketing system,
          not another vendor.
        </RevealHeading>

        <RevealHeading as="div" delay={400} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:hello@pankajsingh.in"
            className="glass-pane group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold text-ink text-sm font-medium glow-ring hover:scale-[1.03] transition-transform"
          >
            Start a conversation
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="mailto:hello@pankajsingh.in"
            className="text-sm text-offwhite/60 hover:text-gold transition-colors story-link"
          >
            hello@pankajsingh.in
          </a>
        </RevealHeading>
      </div>
    </section>
  );
}
