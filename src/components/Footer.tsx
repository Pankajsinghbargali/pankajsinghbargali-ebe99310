export default function Footer() {
  return (
    <footer className="py-8 border-t border-gold/10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} <span className="text-gold font-semibold">Pankaj Singh</span>. Crafted with AI-Powered Precision.
        </p>
      </div>
    </footer>
  );
}
