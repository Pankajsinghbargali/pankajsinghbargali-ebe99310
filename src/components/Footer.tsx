export default function Footer() {
  return (
    <footer className="py-12 bg-ink text-offwhite/60 border-t border-offwhite/5">
      <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span>Pankaj Singh — Marketing Strategist</span>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <a href="mailto:hello@pankajsingh.in" className="hover:text-gold transition-colors story-link">Email</a>
          <a href="#" className="hover:text-gold transition-colors story-link">LinkedIn</a>
          <a href="#" className="hover:text-gold transition-colors story-link">Instagram</a>
        </div>
        <p className="text-xs">© {new Date().getFullYear()} — Built with intent.</p>
      </div>
    </footer>
  );
}
