# Developer Portfolio — Architecture

## Directory Structure
```
/workspace
├── app/
│   ├── layout.js          # Root layout with fonts + metadata
│   ├── page.js            # Main page composing all sections
│   └── globals.css        # Tailwind directives + global styles
├── components/
│   ├── Navbar.js                # Sticky responsive nav (Lenis scrollTo)
│   ├── Hero.js                  # Hero with typewriter + CTAs + parallax grid
│   ├── About.js                 # Bio + stats + parallax glow
│   ├── Skills.js                # (legacy) tech grid — unused
│   ├── SkillCloud.js            # NEW: scattered word cloud, size ∝ grip
│   ├── Projects.js              # Project cards + parallax glow
│   ├── Experience.js            # Timeline + parallax glow
│   ├── Contact.js               # Form + socials
│   ├── Footer.js                # Footer + back-to-top
│   ├── SmoothScrollProvider.js  # Lenis init + rAF loop (wraps whole app)
│   ├── CursorTrails.js          # Tech-icon cursor trail (pointermove)
│   └── ParallaxLayer.js         # Reusable GSAP ScrollTrigger parallax
├── lib/
│   └── data.js                  # ALL placeholder content (edit here)
├── public/                # Static assets
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── jsconfig.json
```

## Data Flow
- `lib/data.js` exports objects for each section (name, bio, skills, projects, experience, socials)
- Components import from `lib/data.js` and render
- No state management needed beyond local component state (mobile menu, form fields, typewriter)

## Routing
- Single page app (`/`) with smooth-scroll anchor navigation
- No additional routes
