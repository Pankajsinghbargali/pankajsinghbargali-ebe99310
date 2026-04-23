

## Polish Pass — Hero, Effects, Mobile, Branding

A focused refinement covering eight issues raised. No structural rewrite — surgical upgrades to existing components plus a new favicon and brand strip.

### 1. Hero section upgrade

- Replace placeholder layout balance with a stronger composition: oversized headline kept, but add a thin **vertical metric strip** on the left edge (small caps: "5+ yrs · ₹15Cr+ pipeline · 35% lower CPL") and a soft **glass-card "trusted on" row** below the CTAs showing **Google Ads** and **Meta Ads** logos as inline SVG icons.
- Sharper entrance: word-by-word stagger on the headline (mask + fade-up per word) instead of a single block fade.
- Add a slow **gradient mesh aura** behind the 3D blob (animated radial gradient drifting in the dark direction) — gives depth in dark mode.
- Improve the GlassBlob: brighter rim light + a **second smaller orbiting sphere** with a subtle gold-tinted material.
- Refined CTAs with the new global glass-glance treatment.

### 2. Click effect — proper ripple + shockwave

- Rewrite `ClickEffects.tsx`. Current ripple is invisible on dark backgrounds and conflicts with `overflow:hidden` injection on parent elements (breaks layout in some cards).
- New behaviour: a **fixed-position double pulse** rendered at body level (no DOM mutation of the target). Inner gold dot expands + fades; outer ring shockwave expands wider with a slight blur. Adapts color to light/dark via CSS vars.
- Add subtle haptic-style scale on the clicked element (`active:scale-[.98]`) via global CSS — already partially there, refine to feel premium.

### 3. Smooth dark-mode transition

- Add a **view-transition style** color crossfade: when toggling theme, briefly apply a `transition: background-color 600ms, color 600ms, border-color 600ms` to `html, body, *` via a temporary class, then remove. Eliminates the flash and makes accents glide.
- ThemeToggle: animate the thumb with a spring-feel cubic-bezier and add a soft glow burst on click.
- Add `color-scheme` CSS property so native form controls follow the theme.

### 4. Google Ads + Meta Ads icons

- Add inline brand-mark SVG components (`src/components/brand/GoogleAdsIcon.tsx`, `MetaAdsIcon.tsx`) — official-style coloured marks, accessible, scalable.
- Use them in:
  - Hero "Trusted platforms" glass row
  - Services section (Performance Marketing card shows both small icons)
  - Case Studies (Real Estate card adds a tiny "Google Ads · Meta Ads" channel chip)

### 5. Glass-glance effect everywhere

- Add a global `.glass-pane` utility: backdrop-blur + translucent surface + 1px hairline border + a moving **diagonal sheen** on hover (animated `::before` gradient sweep).
- Apply to: Navbar, Case Study cards, Services grid tiles, About portrait card, Before/After container, Final CTA button, Budget Calculator panel, Footer top edge.
- Tuned per theme — light mode: warm white frost; dark mode: deep ink with subtle gold rim.

### 6. Mobile fixes

- **Navbar mobile menu**: theme toggle currently in `hidden md:flex` — show it inside the open mobile sheet (already partially there) and ensure the "Get in touch" button also appears.
- **HeroSection**: 3D blob is `lg:col-span-5` and disappears on small screens because parent grid hides it implicitly via stacking — keep blob visible but constrained to ~280px height on mobile, layered behind text with reduced opacity for a hero accent rather than side-by-side.
- **BeforeAfterSlider**: `touch-none` blocks vertical scroll on mobile — replace with proper pointer logic that only captures horizontal drags after a small threshold; add tap-to-jump on the track.
- **AdsBudgetCalculator**: ensure inputs/sliders wrap (current grid likely overflows on small screens — audit and add `min-w-0` + responsive grid).
- **CustomCursor + MouseSpotlight**: confirm they're properly `display:none` on `(hover: none)` (CSS already targets `cursor: none`, but the elements still mount — gate render with a `useIsTouch` hook).
- **CaseStudies expand button**: add `min-h-[44px]` tap targets and ensure the +/- icon button doesn't overflow on narrow screens.

### 7. Favicon + remove "Made with Lovable"

- Create a custom favicon: an SVG mark "PS" inside a gold ring on ink background. Add to `public/favicon.svg` and reference in `index.html` (`<link rel="icon" type="image/svg+xml" href="/favicon.svg">`) plus a fallback PNG.
- Update `<title>` and meta to remove generic "AI-powered" wording, switch to: *"Pankaj Singh — Marketing Strategist | Systems for compounding demand"*.
- Hide the Lovable badge via the `publish_settings--set_badge_visibility` tool (`hide_badge: true`).

### 8. Copy improvements (confident, minimal, no buzzwords)

Rewrites across all sections:

- **Hero headline**: keep — already strong.
- **Hero sub**: → *"I design content, funnels, and media systems that turn the right attention into measurable revenue."*
- **Results Strip**: relabel with sharper outcomes — *"3× Engagement"*, *"60% Sharper Lead Quality"*, *"Multi-channel by design"*, plus add a 4th tile *"₹15Cr+ Pipeline Generated"*.
- **Case Studies intro**: → *"Three engagements where outcomes came from the system, not the spend."*
- **How I Think**: tighten principle bodies; remove any remaining filler.
- **Services intro**: → *"Six disciplines, one operating system for growth."*
- **About**: remove "I don't chase trends" cliché; replace with *"I work with founders and marketing leads who'd rather build a compounding asset than rent a spike."*
- **Final CTA sub**: → *"A handful of engagements per quarter. For teams who want a marketing system, not another vendor."*
- **Footer tagline**: → *"Built with intent, in Inter & Instrument Serif."*
- **Meta description**: → *"Marketing strategist building content, media, and funnel systems for founders and growth teams. ₹15Cr+ pipeline, 35% lower CPL, 42% ROAS lift."*

### Files touched

**New**
- `public/favicon.svg`
- `src/components/brand/GoogleAdsIcon.tsx`
- `src/components/brand/MetaAdsIcon.tsx`
- `src/hooks/useIsTouch.ts`

**Rewritten**
- `src/components/HeroSection.tsx` — new composition, brand strip, word-stagger
- `src/components/ClickEffects.tsx` — body-level shockwave
- `src/components/ThemeToggle.tsx` — smoother transition + burst
- `src/components/Navbar.tsx` — mobile menu fixes
- `src/components/BeforeAfterSlider.tsx` — better touch handling
- `src/components/Footer.tsx` — copy + glass top edge
- `src/components/GlassBlob3D.tsx` — orbital sphere + brighter rim
- `src/index.css` — `.glass-pane` utility, theme-transition class, click effect keyframes, mobile cursor gating
- `tailwind.config.ts` — new keyframes (`sheen`, `shockwave`, `word-up`)
- `index.html` — favicon link, updated meta + title

**Tweaked copy**
- `ResultsStrip.tsx`, `CaseStudiesSection.tsx`, `HowIThinkSection.tsx`, `ServicesSection.tsx`, `AboutSplitSection.tsx`, `FinalCTA.tsx`

**Settings**
- Hide Lovable badge via publish settings tool.

