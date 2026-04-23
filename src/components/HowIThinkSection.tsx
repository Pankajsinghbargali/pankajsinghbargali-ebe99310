import RevealHeading from './RevealHeading';

const principles = [
  {
    n: '01',
    title: 'Attention is rented. Intent is earned.',
    body: 'A viral post is a loan from the algorithm. Trust compounds — and trust is what converts.',
  },
  {
    n: '02',
    title: 'Systems beat campaigns.',
    body: 'Campaigns end. Systems improve. Build the loop, not the launch.',
  },
  {
    n: '03',
    title: 'Clarity converts.',
    body: 'The clearer the promise, the shorter the path from scroll to action.',
  },
  {
    n: '04',
    title: 'Measure what moves money.',
    body: 'Vanity metrics flatter. Pipeline metrics decide. Instrument the funnel before the ad.',
  },
];

export default function HowIThinkSection() {
  return (
    <section id="thinking" className="py-24 md:py-36 bg-background">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <RevealHeading as="p" className="label-eyebrow mb-6">— How I Think</RevealHeading>
            <RevealHeading as="h2" delay={100} className="text-4xl md:text-5xl font-medium tracking-tight leading-[1.05]">
              Four principles that <span className="font-editorial italic font-normal text-gold">shape</span> every engagement.
            </RevealHeading>
          </div>

          <div className="lg:col-span-7 space-y-12">
            {principles.map((p, i) => (
              <RevealHeading
                key={p.n}
                as="div"
                delay={i * 120}
                className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 pb-12 border-b border-border last:border-0 last:pb-0"
              >
                <div className="font-editorial text-3xl md:text-4xl text-gold leading-none">{p.n}</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed max-w-lg">{p.body}</p>
                </div>
              </RevealHeading>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
