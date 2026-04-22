import { useEffect, useRef, useState } from 'react';
import { Megaphone, FileText, BarChart2, Zap } from 'lucide-react';
import TiltCard from './TiltCard';

const skillCategories = [
  {
    title: 'Performance Marketing',
    icon: Megaphone,
    skills: ['Meta Ads (FB & IG)', 'Google Ads (Search, Display, PMax)', 'ROAS Optimization', 'A/B Testing & CRO', 'Funnel Optimization', 'Bid Strategy'],
  },
  {
    title: 'AI & Automation',
    icon: Zap,
    skills: ['ChatGPT', 'Claude', 'AI-Powered Campaign Optimization', 'Marketing Automation', 'Surfer SEO', 'SEMrush'],
  },
  {
    title: 'Analytics & Tools',
    icon: BarChart2,
    skills: ['GA4', 'Google Tag Manager', 'Google Data Studio', 'Meta Business Suite', 'Hotjar', 'Performance Max'],
  },
  {
    title: 'CRM & Strategy',
    icon: FileText,
    skills: ['HubSpot', 'Zoho CRM', 'Mailchimp', 'Klaviyo', 'Brand Strategy', 'Team Leadership'],
  },
];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/20 to-background" />
      <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">
            Skills & <span className="gold-shimmer">Arsenal</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map(({ title, icon: Icon, skills }) => (
            <TiltCard
              key={title}
              intensity={6}
              className="glass rounded-2xl p-8 gold-border-glow hover:shadow-[0_0_40px_hsl(var(--gold)/0.15)]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 hover:scale-105 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
