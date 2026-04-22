import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Work', href: '#case-studies' },
  { label: 'Thinking', href: '#thinking' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-4' : 'py-6'}`}>
      <div className="container-narrow flex items-center justify-between">
        <a href="#hero" className="text-sm font-medium tracking-tight flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold" />
          Pankaj Singh
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="text-sm text-foreground/70 hover:text-foreground transition-colors story-link">
              {label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-offwhite text-xs font-medium hover:opacity-90 transition-all"
        >
          Get in touch
        </a>

        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border mt-4 px-6 py-6 space-y-4">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-sm text-foreground/80 hover:text-gold transition-colors py-1"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
