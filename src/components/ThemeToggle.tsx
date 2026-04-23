import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const STORAGE_KEY = 'pankaj-site-theme';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = saved ? saved === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', shouldUseDark);
    setDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    // Apply a temporary smooth-transition class for crossfade
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    window.setTimeout(() => root.classList.remove('theme-transitioning'), 700);

    setDark(next);
    root.classList.toggle('dark', next);
    localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className="theme-toggle group"
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb">
          {dark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </span>
      </span>
      <span className="hidden sm:inline">{dark ? 'Dark' : 'Light'}</span>
    </button>
  );
}
