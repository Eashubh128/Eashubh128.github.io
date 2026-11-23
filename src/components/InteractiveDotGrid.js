'use client';

import { useEffect, useRef } from 'react';

/**
 * InteractiveDotGrid
 *
 * High-performance canvas-based interactive dot matrix inspired by Google Gemini & Antigravity.
 * Dots pop up, grow in size, and illuminate with an electric indigo/violet accent as the cursor
 * moves across the viewport, with smooth inertia and a soft radial tracking spotlight.
 */
export default function InteractiveDotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Grid configuration
    const GRID_SPACING = 30; // Distance between dots in px
    const BASE_RADIUS = 1.0;  // Normal dot radius
    const MAX_RADIUS = 2.8;   // Pop-up radius near cursor
    const INFLUENCE_RADIUS = 150; // Proximity reach in px
    const INFLUENCE_SQ = INFLUENCE_RADIUS * INFLUENCE_RADIUS;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;

    // Mouse coordinates
    let mouse = { x: -9999, y: -9999 };
    let smoothMouse = { x: -9999, y: -9999 };
    let isMoving = false;
    let idleTimer = null;
    let isSleeping = false;

    // Dot grid storage with per-dot excitation/decay
    // We store cols & rows to efficiently query only nearby dots
    let cols = 0;
    let rows = 0;
    // Flat Float32Array for excitement values [0..1]
    let popValues = null;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / GRID_SPACING) + 1;
      rows = Math.ceil(height / GRID_SPACING) + 1;
      popValues = new Float32Array(cols * rows);

      wakeUp();
    };

    const wakeUp = () => {
      if (isSleeping) {
        isSleeping = false;
        animId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMoving = true;

      // If initial off-screen, snap immediately
      if (smoothMouse.x < -1000) {
        smoothMouse.x = mouse.x;
        smoothMouse.y = mouse.y;
      }

      wakeUp();

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isMoving = false;
      }, 300);
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      wakeUp();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor interpolation (LERP)
      if (mouse.x > -1000) {
        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.14;
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.14;
      } else {
        smoothMouse.x += (-9999 - smoothMouse.x) * 0.1;
        smoothMouse.y += (-9999 - smoothMouse.y) * 0.1;
      }

      // Draw subtle radial tracking glow behind dots
      if (smoothMouse.x > -500 && smoothMouse.x < width + 500) {
        const aura = ctx.createRadialGradient(
          smoothMouse.x,
          smoothMouse.y,
          0,
          smoothMouse.x,
          smoothMouse.y,
          260
        );
        aura.addColorStop(0, 'rgba(99, 102, 241, 0.12)'); // Electric indigo
        aura.addColorStop(0.45, 'rgba(129, 140, 248, 0.04)');
        aura.addColorStop(1, 'rgba(9, 9, 11, 0)');
        ctx.fillStyle = aura;
        ctx.fillRect(
          Math.max(0, smoothMouse.x - 260),
          Math.max(0, smoothMouse.y - 260),
          520,
          520
        );
      }

      let hasActiveDecay = false;

      // Render dots
      for (let c = 0; c < cols; c++) {
        const x = c * GRID_SPACING;
        for (let r = 0; r < rows; r++) {
          const y = r * GRID_SPACING;
          const idx = c * rows + r;

          let proximityIntensity = 0;

          if (smoothMouse.x > -500) {
            const dx = smoothMouse.x - x;
            const dy = smoothMouse.y - y;
            const distSq = dx * dx + dy * dy;

            if (distSq < INFLUENCE_SQ) {
              const dist = Math.sqrt(distSq);
              const p = 1 - dist / INFLUENCE_RADIUS;
              proximityIntensity = p * p; // Non-linear curve for punchy pop

              // Excite the pop value for trailing decay
              if (proximityIntensity > popValues[idx]) {
                popValues[idx] = proximityIntensity;
              }
            }
          }

          // Decay excitation smoothly
          popValues[idx] *= 0.92;
          if (popValues[idx] > 0.01) {
            hasActiveDecay = true;
          }

          const effectiveIntensity = Math.max(proximityIntensity, popValues[idx]);

          let radius = BASE_RADIUS;
          let fillStyle = 'rgba(255, 255, 255, 0.07)';

          if (effectiveIntensity > 0.02) {
            // Dot pops up in size
            radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * effectiveIntensity;

            // Interpolate color from subtle white to vibrant indigo/cyan
            const rVal = Math.round(100 + effectiveIntensity * 30);  // ~130
            const gVal = Math.round(110 + effectiveIntensity * 50);  // ~160
            const bVal = 255;                                        // Vibrant blue/indigo
            const alpha = 0.15 + effectiveIntensity * 0.75;          // Up to 0.90 opacity

            fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${alpha.toFixed(3)})`;
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = fillStyle;
          ctx.fill();
        }
      }

      // If user prefers reduced motion, draw once and stop
      if (prefersReducedMotion) return;

      // Sleep management: save CPU when idle and settled
      const isMouseAway = mouse.x < -1000 && smoothMouse.x < -1000;
      if (!isMoving && !hasActiveDecay && (isMouseAway || Math.abs(mouse.x - smoothMouse.x) < 0.2)) {
        isSleeping = true;
        animId = null;
        return;
      }

      animId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    resize();
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(idleTimer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
