import { useEffect, useRef, useState } from 'react';
import { Award, GraduationCap } from 'lucide-react';
import TiltCard from './TiltCard';

const certifications = [
  'Google Ads Search Certification',
  'Google Analytics 4 Certification',
  'Meta Blueprint Certified',
  'HubSpot Content Marketing Certification',
];

const education = [
  {
    degree: 'MBA – Marketing (Pursuing)',
    institution: 'Vivekananda Global University, Jaipur',
  },
  {
    degree: 'BCA – Computer Applications',
    institution: 'JECRC University, Jaipur',
  },
];

export default function CertificationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="certifications" ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/10 to-background" />
      <div className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Credentials</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">
            Certifications & <span className="gold-shimmer">Education</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <TiltCard intensity={6} className="glass rounded-2xl p-8 gold-border-glow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Award className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="text-gold mt-0.5">✦</span>
                  {cert}
                </li>
              ))}
            </ul>
          </TiltCard>

          <TiltCard intensity={6} className="glass rounded-2xl p-8 gold-border-glow">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold">Education</h3>
            </div>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.degree}>
                  <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
