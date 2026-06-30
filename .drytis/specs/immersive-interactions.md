# Immersive Interactions & Skills Redesign — Spec

## Goal
Transform the portfolio into an immersive, interactive experience:
1. **Lenis** smooth scrolling site-wide
2. **GSAP** scroll-triggered animations + parallax
3. **Cursor trails** made of tech-stack icons (Flutter, Kotlin, AWS, Firebase, etc.)
4. **Parallax** depth on sections for interactivity
5. **Skills section redesign** — scattered word cloud/grid where font-size & weight scale with proficiency ("grip")

## Files to Create
- `src/lib/smooth-scroll.js` — Lenis provider hook (`useSmoothScroll`)
- `src/components/SmoothScrollProvider.js` — client wrapper that initializes Lenis + rAF loop
- `src/components/CursorTrails.js` — icon-trail cursor follower (pointermove particles of tech icons, fade out)
- `src/components/ParallaxLayer.js` — reusable GSAP ScrollTrigger parallax wrapper
- `src/components/SkillCloud.js` — NEW Skills section: scattered word cloud, size ∝ level

## Files to Modify
- `src/lib/data.js` — restructure `skillsData` into a flat weighted list w/ mobile+cloud skills (Flutter, Kotlin, AWS, Firebase, Android); each skill gets `icon` (react-icons ref) + `level`
- `src/app/page.js` — wire SmoothScrollProvider + replace `<Skills/>` with `<SkillCloud/>`; add parallax layers
- `src/app/globals.css` — cursor-trail styles, word-cloud styles, hide native cursor option, Lenis CSS
- `src/app/layout.js` — wrap children in SmoothScrollProvider
- `src/components/Hero.js`, `About.js`, `Projects.js`, `Experience.js` — add parallax depth layers + GSAP entrance anims
- `src/components/Navbar.js` — use Lenis scrollTo instead of native scrollIntoView
- `tailwind.config.js` — add cursor-trail keyframes if needed
- `package.json` — add `lenis`, `gsap`
- setup script — `npm ci` already handles install

## Acceptance Criteria
- [ ] Lenis initialized on mount; scrolling is smooth (no jank); respects reduced-motion
- [ ] Navbar anchor clicks scroll via Lenis `scrollTo`
- [ ] Cursor trail renders tech icons that follow pointer and fade out; disabled on touch devices & reduced-motion
- [ ] Parallax: at least 3 sections have multi-speed depth on scroll (GSAP ScrollTrigger)
- [ ] Skills section renders a scattered word cloud; higher-level skills appear in larger, bolder type
- [ ] Skill word sizes scale with level (e.g. level 95 → ~3rem bold, level 70 → ~1rem)
- [ ] Tech stack includes Flutter, Kotlin, AWS, Firebase, Android in addition to existing frontend skills
- [ ] No console errors; build passes; preview responds 200
- [ ] reduced-motion users get a static, usable fallback (no trails, no parallax motion)

## Tech
- `lenis` (smooth scroll)
- `gsap` + `ScrollTrigger` (animations + parallax)
- `react-icons` (tech icons — Si, Fa families)
- Tailwind for layout
