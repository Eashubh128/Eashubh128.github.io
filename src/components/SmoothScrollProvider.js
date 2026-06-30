'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initialises Lenis smooth scrolling for the whole page.
 *
 * - Runs a single requestAnimationFrame loop.
 * - Hooks into GSAP's ScrollTrigger (if present) so scroll-based animations
 *   stay in lock-step with Lenis virtualised scroll position.
 * - Fully disabled when the user prefers reduced motion.
 * - Exposes `window.__lenis` so other components (Navbar) can call
 *   `lenis.scrollTo(target)` for anchor navigation.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Respect accessibility — no smooth scroll / virtualisation.
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
    });

    // Expose for Navbar anchor links.
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // If GSAP ScrollTrigger is loaded, drive it from Lenis.
    let cleanup = () => {};
    if (typeof window !== 'undefined') {
      import('gsap/ScrollTrigger')
        .then(({ default: ScrollTrigger }) => {
          lenis.on('scroll', ScrollTrigger.update);
          cleanup = () => lenis.off('scroll', ScrollTrigger.update);
        })
        .catch(() => {
          /* ScrollTrigger optional — ignore if not loaded */
        });
    }

    return () => {
      cancelAnimationFrame(rafId);
      cleanup();
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}
