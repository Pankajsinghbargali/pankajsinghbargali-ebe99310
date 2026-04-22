import { useEffect, useRef, useState } from 'react';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: 'Asst. Manager – Digital Marketing',
    company: 'Value Homz Group',
    period: 'Apr 2023 – Present',
    highlights: [
      'Lead paid media across Meta & Google Ads for luxury real estate & travel brands, driving qualified lead generation.',
      'Achieved 150% MoM organic growth via AI-assisted content strategies across Instagram, Facebook & LinkedIn.',
      'Reduced CPL by 35% and improved ROAS by 42% through A/B testing frameworks.',
      'Generated INR 15+ Crores qualified sales pipeline; saved 20+ hrs/week via ChatGPT & Claude automation.',
    ],
  },
  {
    role: 'Assistant Marketing Manager',
    company: '21 Express',
    period: 'Oct 2021 – Apr 2023',
    highlights: [
      'Reduced CAC by 28% through precision targeting & bid optimization across paid social & Google Ads.',
      'Built automated email workflows (Mailchimp, HubSpot): +25% open rates, +18% CTR.',
      'Developed real-time performance dashboards in GA4 & Google Data Studio for live campaign monitoring.',
    ],
  },
  {
    role: 'Assistant Media Buyer',
    company: 'RI WebSoft Pvt. Ltd.',
    period: 'Sep 2020 – Oct 2021',
    highlights: [
      'Executed B2B paid campaigns via Facebook Business Manager generating 500+ qualified leads monthly.',
      'Developed tailored client strategies using audience insights & buyer persona mapping.',
    ],
  },
  {
    role: 'Digital Marketing Specialist',
    company: 'Firstcall Digital Marketing',
    period: 'Nov 2018 – Jul 2020',
    highlights: [
      'Managed multi-client paid social & Google Ads campaigns across diverse industries.',
      'Led 2-member design team; maintained 95% client satisfaction score.',
    ],
  },
];

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(var(--gold)/0.04)_0%,_transparent_60%)]" />
      <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Journey</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">
            Professional <span className="gold-shimmer">Experience</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />

          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative pl-16 md:pl-20 group">
                <div className="absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full bg-gold gold-glow border-2 border-background group-hover:scale-150 transition-transform duration-300" />

                <div className="glass rounded-2xl p-6 md:p-8 gold-border-glow hover:shadow-[0_0_40px_hsl(var(--gold)/0.15)] hover:-translate-y-1 hover:border-gold/40 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-foreground">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Briefcase className="w-3.5 h-3.5 text-gold" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-gold mt-1 shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
