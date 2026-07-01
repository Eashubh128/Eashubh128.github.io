'use client';

import { useEffect, useRef } from 'react';
import {
  SiFlutter, SiKotlin, SiDart, SiFirebase, SiJavascript, SiTypescript,
  SiNextdotjs, SiTailwindcss, SiGreensock,
} from 'react-icons/si';
import {
  FaAndroid, FaAws, FaReact, FaNodeJs,
} from 'react-icons/fa';

const iconList = [
  SiFlutter, SiKotlin, SiDart, SiFirebase, SiJavascript, SiTypescript,
  SiNextdotjs, SiTailwindcss, SiGreensock, FaAndroid, FaAws, FaReact, FaNodeJs
];

const colors = ['#38bdf8', '#c084fc', '#4ade80', '#fbbf24', '#f59e0b', '#ec4899', '#06b6d4', '#818cf8'];

export default function CursorTrails() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let gsap;
    let cleanup = () => {};

    (async () => {
      const gsapModule = await import('gsap');
      gsap = gsapModule.default;

      const flair = gsap.utils.toArray(container.querySelectorAll('.flair'));
      let index = 0;
      const wrapper = gsap.utils.wrap(0, flair.length);
      gsap.defaults({ duration: 1 });

      let mousePos = { x: 0, y: 0 };
      let lastMousePos = { x: 0, y: 0 };
      let cachedMousePos = { x: 0, y: 0 };
      const gap = 80; // Distance spacing between shape spawns

      const handleMouseMove = (e) => {
        mousePos = {
          x: e.clientX,
          y: e.clientY
        };
      };

      const playAnimation = (shape) => {
        const tl = gsap.timeline();
        tl.fromTo(shape, 
          { opacity: 0, scale: 0, y: 0, rotation: 0 },
          {
            opacity: 1,
            scale: 1.1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          }
        )
        .to(shape, {
          rotation: "random([-270, 270])",
          duration: 1,
        }, "<")
        .to(shape, {
          y: "120vh",
          ease: "back.in(0.4)",
          duration: 1.1,
        }, 0);
      };

      const animateImage = () => {
        const wrappedIndex = wrapper(index);
        const img = flair[wrappedIndex];
        const color = img.dataset.color;
        
        gsap.killTweensOf(img);
        
        gsap.set(img, {
          clearProps: "all",
        });

        gsap.set(img, {
          opacity: 1,
          left: mousePos.x,
          top: mousePos.y,
          xPercent: -50,
          yPercent: -50,
          color: color,
          filter: `drop-shadow(0 0 6px ${color}60)`,
        });

        playAnimation(img);
        index++;
      };

      const ImageTrail = () => {
        const travelDistance = Math.hypot(
          lastMousePos.x - mousePos.x,
          lastMousePos.y - mousePos.y
        );

        cachedMousePos.x = gsap.utils.interpolate(
          cachedMousePos.x || mousePos.x,
          mousePos.x,
          0.1
        );
        cachedMousePos.y = gsap.utils.interpolate(
          cachedMousePos.y || mousePos.y,
          mousePos.y,
          0.1
        );

        if (travelDistance > gap) {
          animateImage();
          lastMousePos = mousePos;
        }
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      gsap.ticker.add(ImageTrail);

      cleanup = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        gsap.ticker.remove(ImageTrail);
        flair.forEach(img => gsap.killTweensOf(img));
      };
    })();

    return () => cleanup();
  }, []);

  // Generate 24 items in the element pool
  const pool = Array.from({ length: 24 }).map((_, i) => {
    const Icon = iconList[i % iconList.length];
    const color = colors[i % colors.length];
    return { Icon, color };
  });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" aria-hidden="true">
      {pool.map((item, i) => (
        <span
          key={i}
          className="flair fixed opacity-0 select-none pointer-events-none"
          data-color={item.color}
          style={{
            color: item.color,
            filter: `drop-shadow(0 0 6px ${item.color}60)`,
            fontSize: '28px',
          }}
        >
          <item.Icon size={28} />
        </span>
      ))}
    </div>
  );
}
