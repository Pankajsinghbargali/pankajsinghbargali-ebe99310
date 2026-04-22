import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: 'Message sent!', description: "Thank you for reaching out. I'll get back to you soon." });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--gold)/0.05)_0%,_transparent_60%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">Connect</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mt-3">
            Get In <span className="gold-shimmer">Touch</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Ready to elevate your brand with AI-powered marketing strategies? Let's connect and explore how we can drive exceptional results together.
            </p>

            <div className="space-y-4">
              {[
                { icon: Phone, label: '+91 86077 45499', href: 'tel:+918607745499' },
                { icon: Mail, label: 'pankajsinghbargali@gmail.com', href: 'mailto:pankajsinghbargali@gmail.com' },
                { icon: Linkedin, label: 'linkedin.com/in/pankajsinghbargali', href: 'https://linkedin.com/in/pankajsinghbargali' },
                { icon: MapPin, label: 'Gurugram, Haryana', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 glass rounded-xl gold-border-glow hover:bg-gold/5 hover:translate-x-1 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 group-hover:scale-110 transition-all">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-sm text-foreground break-all">{label}</span>
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 gold-border-glow space-y-5">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="bg-background/50 border-gold/20 focus-visible:ring-gold/30"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                className="bg-background/50 border-gold/20 focus-visible:ring-gold/30"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={5}
                className="bg-background/50 border-gold/20 focus-visible:ring-gold/30"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gold text-accent-foreground hover:bg-gold-dark font-semibold py-3 gold-glow hover:scale-[1.02] transition-transform"
            >
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
