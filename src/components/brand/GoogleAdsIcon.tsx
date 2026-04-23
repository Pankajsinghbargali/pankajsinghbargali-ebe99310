interface Props { className?: string; title?: string }

export default function GoogleAdsIcon({ className = 'h-5 w-5', title = 'Google Ads' }: Props) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <path d="M7.05 2.69a3 3 0 0 1 4.1 1.1l8.5 14.72a3 3 0 0 1-5.2 3l-8.5-14.72a3 3 0 0 1 1.1-4.1z" fill="#FBBC04" />
      <path d="M2.95 18.51l5.7-9.87 5.2 3-5.7 9.87a3 3 0 0 1-5.2-3z" fill="#4285F4" />
      <circle cx="5.55" cy="20.01" r="3" fill="#34A853" />
    </svg>
  );
}
