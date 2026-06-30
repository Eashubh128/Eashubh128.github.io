# Developer Portfolio — Patterns

## Naming
- Components: PascalCase (Navbar, Hero, Skills)
- Files: match component name (Navbar.js)
- CSS: Tailwind utility classes only — no custom CSS except globals.css for theme variables and animations
- Data keys: camelCase

## Styling
- Dark theme: bg-[#0a0a0f] as base
- Neon accents: gradients of purple (#a855f7), blue (#3b82f6), cyan (#06b6d4)
- Glassmorphism: bg-white/5 backdrop-blur-sm border border-white/10
- Glow: box-shadow with neon colors
- Border radius: rounded-xl for cards, rounded-full for avatars/buttons

## Animations (Framer Motion)
- Scroll reveal: fade up with 0.6s duration, 0.2s stagger between siblings
- Hover: scale(1.02) on cards, glow increase
- Typewriter: character-by-character reveal in Hero
- Use `useInView` from framer-motion for scroll triggers

## Responsive Breakpoints
- Mobile: < 640px (default)
- Tablet: sm (640px), md (768px)
- Desktop: lg (1024px), xl (1280px)
- Max content width: max-w-6xl centered

## Component Pattern
```jsx
'use client';
import { motion } from 'framer-motion';
import { sectionData } from '@/lib/data';

export default function Section() {
  return (
    <section id="section" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* content */}
        </motion.div>
      </div>
    </section>
  );
}
```
