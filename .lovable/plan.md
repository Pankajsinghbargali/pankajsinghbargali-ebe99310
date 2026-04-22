

## Premium Marketing Strategist Portfolio — Full Redesign

A complete pivot from the current royal purple/gold theme to a minimal, editorial, luxury-brand aesthetic. Same person (Pankaj Singh), repositioned as a strategist with confident, authoritative voice.

### New Design System

**Color palette** (replacing purple/gold):
- Background: Off-white `#F5F2ED` (soft beige) for light sections
- Deep ink: `#0A0A0A` near-black for text and dark sections
- Soft beige surface: `#EAE5DC`
- Subtle accent: Muted gold `#B8924A` (used sparingly — underlines, dots, button glow only)
- Muted text: `#6B6760`

**Typography**: Switch from Playfair/DM Sans to **Inter** (body + UI) and **Instrument Serif** for occasional editorial pull-quotes. Generous tracking on small caps labels. Headlines big, tight leading.

**Spacing & shape**: `rounded-2xl` softness, generous `py-32` section padding, max-width 1200px container, lots of whitespace.

### Section-by-Section Build

```text
┌─────────────────────────────────────────┐
│ NAV (minimal, transparent → solid)     │
├─────────────────────────────────────────┤
│ HERO                                    │
│   Big headline + subtle 3D glass blob  │
│   "View My Work" CTA                   │
├─────────────────────────────────────────┤
│ RESULTS STRIP (3 metrics, horizontal)  │
├─────────────────────────────────────────┤
│ CASE STUDIES (expandable cards)        │
├─────────────────────────────────────────┤
│ BEFORE / AFTER (drag slider)           │
├─────────────────────────────────────────┤
│ HOW I THINK (4 principles, editorial)  │
├─────────────────────────────────────────┤
│ SERVICES (icon grid, lift on hover)    │
├─────────────────────────────────────────┤
│ ABOUT (split text + portrait)          │
├─────────────────────────────────────────┤
│ FINAL CTA (dark section, glow button)  │
├─────────────────────────────────────────┤
│ FOOTER                                  │
└─────────────────────────────────────────┘
```

1. **Hero** — Full-screen off-white. Headline: *"I build marketing systems that turn attention into intent."* Sub: *"Content, strategy, and psychology designed to attract the right audience."* CTA "View My Work". Right side: a subtle floating 3D glassmorphic blob (replaces the wireframe globe) — soft refraction, slow rotation, mouse-parallax. Fade-up entrance.

2. **Results Strip** — Horizontal band, three metrics with thin icons: `3X Engagement Growth`, `60% Better Lead Quality`, `Multi-platform Strategy Execution`. Hairline dividers between them. Soft hover scale.

3. **Case Studies** — Grid of 3 cards (Real Estate Lead Engine, B2B Pipeline Builder, Travel Brand Relaunch). Click expands inline with Challenge → Strategy → Execution → Result. Subtle parallax on scroll using transform on translateY based on scrollY.

4. **Before vs After** — A draggable horizontal divider revealing two states (e.g., "Generic ad creative" vs "Strategy-led creative" or a metrics dashboard before/after). Built with pointer events; smooth thumb drag.

5. **How I Think** — Four numbered principles in editorial layout (large serif numerals, short text). Examples: *"Attention is rented. Intent is earned."*, *"Systems beat campaigns."*, *"Clarity converts."*, *"Measure what moves money."* Stagger fade-in.

6. **Services / What I Do** — Grid of 6 cards with thin Lucide icons: Performance Marketing, Content Strategy, Funnel Design, Brand Positioning, Marketing Automation, Analytics & Insights. Hover: lift + soft gold glow.

7. **About** — Split: left text (repositioned bio — strategist tone, no buzzwords), right image placeholder with soft gradient frame. Slight motion on scroll.

8. **Final CTA** — Full-bleed near-black section. *"If you want better marketing, not just more marketing — let's talk."* Button with pulsing soft gold glow ring.

### Signature Interaction (memorability)

A **custom magnetic cursor** + a hero **scroll-triggered transformation**: as the user scrolls past the hero, the 3D glass blob morphs/scales and slides into the Results Strip, becoming a small accent element — visually tying the two sections together. Plus a subtle text-reveal mask on H2s as they enter the viewport.

### 3D Element

Replace `Globe3D` with `GlassBlob3D` — a `@react-three/drei` `MeshTransmissionMaterial`-style blend (use `meshPhysicalMaterial` with transmission, roughness 0.1, thickness, env-mapped) wrapped on a rounded icosahedron. Slow rotation, mouse-parallax tilt, very subtle. Uses existing `three` + `@react-three/fiber` + `@react-three/drei` already installed.

### Files to Change

**Design tokens**
- `src/index.css` — rewrite color tokens (off-white bg, near-black fg, beige surface, muted gold accent), swap fonts to Inter + Instrument Serif via Google Fonts, replace `gold-shimmer` with a subtle text-mask reveal utility, keep tilt glare lighter.
- `tailwind.config.ts` — update `fontFamily` (sans: Inter, serif: Instrument Serif), add subtle keyframes (`reveal-mask`, `glow-pulse`, `float-slow`).

**New components**
- `src/components/GlassBlob3D.tsx` — replaces Globe3D
- `src/components/ResultsStrip.tsx`
- `src/components/CaseStudiesSection.tsx` (with expandable cards)
- `src/components/BeforeAfterSlider.tsx` (drag comparison)
- `src/components/HowIThinkSection.tsx`
- `src/components/ServicesSection.tsx`
- `src/components/AboutSplitSection.tsx` (replaces current AboutSection)
- `src/components/FinalCTA.tsx`
- `src/components/RevealHeading.tsx` (mask reveal on scroll)

**Rewrite**
- `src/components/HeroSection.tsx` — new headline, glass blob, fade-up
- `src/components/Navbar.tsx` — new links (Work, Thinking, Services, About, Contact), minimal underline-on-hover
- `src/components/CustomCursor.tsx` — refine magnetic behaviour, switch dot to deep ink color
- `src/components/MouseSpotlight.tsx` — tone down to a very subtle warm-white spotlight
- `src/components/Footer.tsx` — minimal version
- `src/pages/Index.tsx` — new section order

**Remove from page** (keep files, just unused): `SkillsSection`, `ExperienceSection`, `CertificationsSection`, `ContactSection` (replaced by Final CTA + footer email).

### Tone & Copy

All copy rewritten in confident, minimal voice. No "AI-Powered" badges, no "Royal", no buzzwords. Achievements (35% CPL, 42% ROAS, 15Cr+ pipeline) folded into Case Studies as concrete outcomes, not as stat counters.

### Performance

- Glass blob behind `Suspense` + `lazy`, disabled on `prefers-reduced-motion`
- Parallax via `transform` only (GPU); throttle scroll handlers with `requestAnimationFrame`
- Custom cursor disabled on touch devices (already handled)

