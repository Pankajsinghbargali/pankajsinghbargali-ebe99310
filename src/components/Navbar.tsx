import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Credentials', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#hero" className="text-xl font-serif font-bold gold-shimmer">PS</a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a key={label} href={href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
              {label}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-gold">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass mt-2 mx-4 rounded-xl p-4 space-y-3">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-sm text-muted-foreground hover:text-gold transition-colors py-2"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
