'use client';

import { useEffect, useRef } from 'react';

/**
 * Reusable parallax depth layer powered by GSAP ScrollTrigger.
 *
 * Props:
 *  - speed:  how fast the layer moves relative to scroll.
 *            Positive → moves down slower than scroll (background feel).
 *            Negative → moves up faster than scroll (foreground feel).
 *            e.g. 0.2 = 20% drift over the element's scroll range.
 *  - axis:   'y' (default) or 'x'.
 *  - className, style passthrough.
 *
 * Respects prefers-reduced-motion: renders children statically with no GSAP.
 */
export default function ParallaxLayer({
  children,
  speed = 0.15,
  axis = 'y',
  className = '',
  style,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    let ctx;
    let cleanup = () => {};

    (async () => {
      const { default: gsap } = await import('gsap');
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const distance = window.innerHeight * speed;
        gsap.fromTo(
          el,
          { [axis]: -distance },
          {
            [axis]: distance,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',   // when top of el hits bottom of viewport
              end: 'bottom top',     // when bottom of el hits top of viewport
              scrub: true,
            },
          }
        );
      }, el);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, [speed, axis]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform', ...style }}
    >
      {children}
    </div>
  );
}
