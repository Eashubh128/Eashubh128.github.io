'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { skillsData } from '@/lib/data';

/**
 * Scattered skill "word cloud".
 *
 * Skills are positioned on a loosely scattered grid (deterministic per index
 * so SSR & client match) with a touch of randomness. Font-size, weight, and
 * opacity all scale with `level` (grip) — higher level = bigger, bolder.
 *
 * On mount a GSAP stagger reveals each word; on scroll a parallax drift
 * adds depth (slower for bigger words = they feel closer).
 */
export default function SkillCloud() {
  const sectionRef = useRef(null);
  const cloudRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  // Compute deterministic scatter positions + visual props per skill.
  const items = useMemo(() => {
    // Arrange in a responsive grid, then jitter each cell by a seeded offset
    // so the layout looks organic but never overlaps badly.
    const cols = 6;
    return skillsData.cloud.map((skill, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      // pseudo-random but stable
      const seed = (i * 9301 + 49297) % 233280;
      const rnd = seed / 233280;
      const rnd2 = ((i * 4099 + 7919) % 233280) / 233280;

      // Grid cell percentages with jitter.
      const cellW = 100 / cols;
      const xPct = col * cellW + cellW / 2 + (rnd - 0.5) * cellW * 0.6;
      const yPx = row * 78 + (rnd2 - 0.5) * 36; // row-based vertical scatter

      // Visual mapping from level (0–100) → size/weight/opacity.
      // 50 → 0.8rem / 400 ; 100 → 2.9rem / 800
      const t = Math.max(0, Math.min(1, (skill.level - 50) / 50)); // 0..1
      const fontSize = (0.8 + t * 2.1).toFixed(2); // rem
      const weight = Math.round(400 + t * 400);     // 400..800
      const opacity = (0.45 + t * 0.55).toFixed(2); // 0.45..1
      // Parallax depth: bigger words move less (feel closer to viewer).
      const depth = (1 - t) * 60; // px drift

      // Accent color cycles through the neon palette for variety.
      const accents = ['#a855f7', '#3b82f6', '#06b6d4', '#ec4899'];
      const accent = accents[i % accents.length];

      return {
        ...skill,
        xPct,
        yPx,
        fontSize,
        weight,
        opacity,
        depth,
        accent,
      };
    });
  }, []);

  // Reveal + parallax via GSAP (skipped for reduced motion).
  useEffect(() => {
    if (reduced) return;
    const cloud = cloudRef.current;
    const section = sectionRef.current;
    if (!cloud || !section) return;

    let ctx;
    let cleanup = () => {};

    (async () => {
      const { default: gsap } = await import('gsap');
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const words = cloud.querySelectorAll('.skill-word');

        // Entrance: staggered scale + fade when the cloud enters view.
        gsap.from(words, {
          opacity: 0,
          scale: 0.4,
          y: 30,
          duration: 0.7,
          ease: 'back.out(1.6)',
          stagger: { each: 0.05, from: 'random' },
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        });

        // Parallax drift on scroll — each word drifts by its `depth`.
        words.forEach((word) => {
          const depth = parseFloat(word.dataset.depth || '0');
          if (!depth) return;
          gsap.to(word, {
            yPercent: -depth / 3,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });
      }, section);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, [reduced, items]);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative overflow-hidden" ref={sectionRef}>
      {/* background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] radial-glow pointer-events-none" />
      {/* faint grid for depth */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{skillsData.heading}</h2>
          <p className="text-gray-500 text-sm sm:text-base">{skillsData.subheading}</p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </div>

        {/* word cloud */}
        <div
          ref={cloudRef}
          className="skill-cloud relative mx-auto"
          style={{ height: `${Math.ceil(items.length / 6) * 90 + 40}px` }}
        >
          {items.map((s) => (
            <span
              key={s.name}
              className="skill-word"
              data-depth={s.depth}
              style={{
                left: `${s.xPct}%`,
                top: `${s.yPx}px`,
                fontSize: `${s.fontSize}rem`,
                fontWeight: s.weight,
                opacity: reduced ? Math.max(s.opacity, 0.7) : undefined,
                color: s.accent,
              }}
            >
              {s.name}
            </span>
          ))}
        </div>

        {/* legend */}
        <div className="flex items-center justify-center gap-6 mt-10 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-gray-600" />
            Learning
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-neon-blue/70" />
            Comfortable
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 rounded-full bg-neon-purple" />
            Expert
          </span>
        </div>
      </div>
    </section>
  );
}
