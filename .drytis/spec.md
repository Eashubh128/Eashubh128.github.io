# Developer Portfolio — Spec

## Overview
A modern, responsive personal portfolio website for a frontend developer. Dark tech theme with neon accents, glassmorphism, and scroll animations.

## Tech Stack
- Next.js 14 (App Router)
- React 18
- Tailwind CSS 3
- Framer Motion (scroll reveal animations)
- react-icons
- **Lenis** — smooth scrolling
- **GSAP + ScrollTrigger** — parallax & advanced scroll animations

## Key Decisions
- All placeholder content centralized in `lib/data.js` for easy editing
- No backend — pure static/SSG site
- Contact form is UI-only (no submission handler — user wires up later)
- No auth needed
- Skills shown as a scattered **word cloud** where font-size & weight scale with grip (level)
- Cursor leaves a trail of tech-stack icons (Flutter, Kotlin, AWS, Firebase, …)
- Parallax depth layers on Hero, About, Projects, Experience via GSAP ScrollTrigger
- All motion respects `prefers-reduced-motion` (static fallback)
