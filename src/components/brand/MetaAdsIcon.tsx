interface Props { className?: string; title?: string }

export default function MetaAdsIcon({ className = 'h-5 w-5', title = 'Meta Ads' }: Props) {
  return (
    <svg viewBox="0 0 36 24" className={className} role="img" aria-label={title} xmlns="http://www.w3.org/2000/svg">
      <title>{title}</title>
      <defs>
        <linearGradient id="metaG1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0064E1" />
          <stop offset="100%" stopColor="#0082FB" />
        </linearGradient>
        <linearGradient id="metaG2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0082FB" />
          <stop offset="50%" stopColor="#A11D9E" />
          <stop offset="100%" stopColor="#FA7E1E" />
        </linearGradient>
      </defs>
      <path
        d="M5.5 19.5c-2.4 0-4-2-4-5.2 0-3.6 1.7-7.6 4.6-7.6 2 0 3.5 1.4 5.6 4.6 1.9 2.9 3.2 5.1 3.2 5.1s1.6-2.6 3.4-5.1c1.9-2.7 3.4-4.6 5.6-4.6 3.5 0 5.6 4 5.6 7.5 0 3.6-1.8 5.3-4.2 5.3-2.2 0-3.4-1.2-5.4-4.4l-1.8-3 .8-1.2c1.5-2.3 2.6-3.2 3.9-3.2 1.7 0 2.5 1.6 2.5 4 0 1.8-.5 3-1.5 3-.8 0-1.3-.5-2.3-2L18 8c-3 4.7-3.8 6.2-5.4 8.4-1.5 2.1-2.6 3.1-4 3.1zm-.5-2.5c.7 0 1.3-.5 2.3-2 1.4-2 2.6-3.9 2.6-3.9s-1-1.6-2.5-3.6c-1-1.3-1.6-1.7-2.4-1.7-1.5 0-2.7 2.4-2.7 5 0 2.3 1 4 2.7 4.2z"
        fill="url(#metaG2)"
      />
    </svg>
  );
}
