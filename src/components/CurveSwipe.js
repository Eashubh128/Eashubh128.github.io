'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CurveSwipe() {
  const wrapperRef = useRef(null);
  const pathRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const triggerSwipe = (e) => {
      const callback = e.detail?.callback;
      if (active) return;

      setActive(true);
      const wrapper = wrapperRef.current;
      const path = pathRef.current;

      // 1. Initial State
      gsap.set(wrapper, { display: 'flex', opacity: 1 });
      gsap.set(path, { attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' } });

      // 2. Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(wrapper, { display: 'none' });
          setActive(false);
        }
      });

      // Swipe Up (Cover Screen)
      tl.to(path, {
        attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' },
        duration: 0.6,
        ease: 'power3.in',
      })
      .to(path, {
        attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
        duration: 0.4,
        ease: 'power3.out',
        onComplete: () => {
          if (callback) callback();
        }
      })
      // Swipe Out (Reveal Screen)
      .to(path, {
        attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' },
        duration: 0.8,
        ease: 'power3.inOut',
      });
    };

    window.addEventListener('trigger-curve-swipe', triggerSwipe);
    return () => window.removeEventListener('trigger-curve-swipe', triggerSwipe);
  }, [active]);

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 pointer-events-none z-[9999] hidden flex-col justify-center items-center"
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full text-neon-purple fill-current pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="swipe-grad" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="url(#swipe-grad)"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </svg>
    </div>
  );
}
