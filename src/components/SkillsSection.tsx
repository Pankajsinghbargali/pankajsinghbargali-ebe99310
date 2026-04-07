import { useEffect, useRef, useState } from 'react';
import { Megaphone, FileText, BarChart2, Zap } from 'lucide-react';

const skillCategories = [
  {
    title: 'Paid Media',
    icon: Megaphone,
    skills: ['Google Ads (Search, Display, Shopping, PMax)', 'Meta Ads (FB & IG)', 'LinkedIn Ads', 'Programmatic (DV360)', 'Twitter/X Ads', 'Amazon Ads'],
  },
  {
    title: 'Organic & Content',
    icon: FileText,
    skills: ['SEO (On-page, Off-page, Technical)', 'Content Strategy', 'Social Media Management', 'Email & WhatsApp Marketing', 'Influencer Marketing'],
  },
  {
    title: 'Analytics & Tools',
    icon: BarChart2,
    skills: ['Google Analytics 4 (GA4)', 'Google Tag Manager', 'Looker Studio', 'SEMrush / Ahrefs', 'HubSpot', 'Salesforce Marketing Cloud'],
  },
  {
    title: 'Specialisations',
    icon: Zap,
    skills: ['AI-Powered Campaign Optimisation', 'Marketing Automation', 'CRO & A/B Testing', 'Lead Generation (B2B & B2C)', 'E-commerce Marketing', 'App Marketing (ASO)'],
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
          {skillCategories.map(({ title, icon: Icon, skills }, idx) => (
            <div
              key={title}
              className="glass rounded-2xl p-8 gold-border-glow hover:shadow-[0_0_40px_hsl(var(--gold)/0.1)] transition-all duration-500"
              style={{ animationDelay: `${idx * 150}ms` }}
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
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
