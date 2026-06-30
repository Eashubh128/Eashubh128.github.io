'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  SiFlutter, SiKotlin, SiDart, SiFirebase, SiJavascript, SiTypescript,
  SiNextdotjs, SiTailwindcss, SiGreensock,
} from 'react-icons/si';
import {
  FaAndroid, FaAws, FaReact, FaNodeJs,
} from 'react-icons/fa';
import { trailIconNames } from '@/lib/data';

// Map icon-name → component.
const ICONS = {
  SiFlutter, SiKotlin, SiDart, SiFirebase, SiJavascript, SiTypescript,
  SiNextdotjs, SiTailwindcss, SiGreensock,
  FaAndroid, FaAws, FaReact, FaNodeJs,
};

const COLORS = ['#a855f7', '#3b82f6', '#06b6d4', '#ec4899', '#22c55e', '#f59e0b'];
const MAX_PARTICLES = 32;        // hard cap so the DOM never explodes
const PARTICLE_LIFE_MS = 1000;   // how long each icon lives

// Spawn gating — trails only appear for deliberate, fast cursor sweeps:
const MIN_DISTANCE = 70;         // px the cursor must travel before next spawn
const MIN_SPEED = 350;           // px/sec — slow/deliberate moves don't trigger
const MAX_SPAWN_RATE = 90;       // ms — floor between spawns (caps density)

// Physics thresholds
const SIZE_MIN = 14;             // px
const SIZE_MAX = 44;             // px
const HEAVY_THRESHOLD = 28;      // px — bigger than this → falls, smaller → floats

/**
 * Cursor trail made of tech-stack icons (Flutter, Kotlin, AWS, Firebase, …).
 *
 * Spawns icons on fast mouse sweeps AND on scroll (at the last known cursor
 * position). Each particle is random-sized:
 *   - larger icons are "heavy" → they fall DOWN
 *   - smaller icons are "light" → they float UP
 * Both spin gently during their travel. Disabled on touch devices and
 * when prefers-reduced-motion is set.
 */
export default function CursorTrails() {
  const [particles, setParticles] = useState([]);
  const idRef = useRef(0);
  const lastPos = useRef(null);       // { x, y, t } of last spawn
  const mouseRef = useRef(null);      // last known raw cursor { x, y } (any move)
  const lastScrollSpawn = useRef(0);  // timestamp of last scroll-spawned icon
  const iconSetRef = useRef([]);

  // Resolve the icon component list once.
  if (iconSetRef.current.length === 0) {
    iconSetRef.current = trailIconNames
      .map((n) => ICONS[n])
      .filter(Boolean);
  }

  const spawn = useCallback((x, y) => {
    const icons = iconSetRef.current;
    if (icons.length === 0) return;

    const Icon = icons[Math.floor(Math.random() * icons.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN); // 14–44 px
    const heavy = size >= HEAVY_THRESHOLD;

    // Physics: heavy items fall down (+), light items float up (−).
    const travel = (heavy ? 1 : -1) * (40 + Math.random() * 80);
    const drift = (Math.random() - 0.5) * 60;        // -30..+30 px sideways
    const spin = (Math.random() - 0.5) * 140;        // -70..+70 deg

    const id = ++idRef.current;
    const particle = { id, x, y, Icon, color, size, heavy, travel, drift, spin };
    setParticles((prev) => {
      const next = [...prev, particle];
      return next.length > MAX_PARTICLES ? next.slice(-MAX_PARTICLES) : next;
    });

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, PARTICLE_LIFE_MS);
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (isTouch || prefersReducedMotion) return;

    // --- Mouse-move spawning ---
    function handleMove(e) {
      // Always track the raw cursor position (for scroll-spawn fallback).
      mouseRef.current = { x: e.clientX, y: e.clientY };

      const now = performance.now();
      const prev = lastPos.current;
      if (!prev) {
        lastPos.current = { x: e.clientX, y: e.clientY, t: now };
        return;
      }

      const dx = e.clientX - prev.x;
      const dy = e.clientY - prev.y;
      const dist = Math.hypot(dx, dy);
      const dt = now - prev.t;
      const speed = (dist / dt) * 1000;

      if (dist < MIN_DISTANCE || speed < MIN_SPEED) return;
      if (now - prev.t < MAX_SPAWN_RATE) return;

      lastPos.current = { x: e.clientX, y: e.clientY, t: now };
      spawn(e.clientX, e.clientY);
    }

    // --- Scroll spawning: keep trails alive while scrolling ---
    // When the user scrolls, pointermove often stops firing (trackpad scroll
    // or wheel). We spawn icons at the last known cursor position so the
    // trail doesn't abruptly cut out.
    function handleScroll() {
      const m = mouseRef.current;
      if (!m) return;
      const now = performance.now();
      if (now - lastScrollSpawn.current < MAX_SPAWN_RATE * 1.5) return;
      lastScrollSpawn.current = now;
      spawn(m.x, m.y);
    }

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [spawn]);

  return (
    <div className="cursor-trail-container" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`cursor-trail-icon ${p.heavy ? 'is-heavy' : 'is-light'}`}
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            color: p.color,
            fontSize: `${p.size}px`,
            '--drift': `${p.drift}px`,
            '--travel': `${p.travel}px`,
            '--spin': `${p.spin}deg`,
          }}
        >
          <p.Icon size={p.size} color={p.color} />
        </span>
      ))}
    </div>
  );
}
