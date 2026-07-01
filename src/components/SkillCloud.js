'use client';

import { useEffect, useMemo, useRef, useLayoutEffect } from 'react';
import { skillsData } from '@/lib/data';
import {
  SiFlutter, SiKotlin, SiDart, SiFirebase, SiSocketdotio, SiGitlab,
  SiFastlane, SiRive, SiJavascript, SiTypescript, SiNextdotjs,
  SiTailwindcss, SiGreensock,
} from 'react-icons/si';
import {
  FaAndroid, FaAws, FaReact, FaNodeJs, FaJava, FaBluetooth, FaDatabase,
  FaCode, FaCogs, FaShieldAlt, FaDocker,
} from 'react-icons/fa';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Draggable);
}

// Map icon string names to react-icons components
const iconMap = {
  SiFlutter, SiKotlin, SiDart, SiFirebase, SiSocketdotio, SiGitlab,
  SiFastlane, SiSonarqube: FaCogs, SiRive, SiJavascript, SiTypescript, SiNextdotjs,
  SiTailwindcss, SiGreensock,
  FaAndroid, FaAws, FaReact, FaNodeJs, FaJava, FaBluetooth, FaDatabase,
  FaCode, FaCogs, FaShieldAlt, FaDocker,
};

// Map brand colors to technologies
const brandColors = {
  'Flutter': '#38bdf8',
  'Dart': '#22d3ee',
  'Bluetooth & BLE': '#3b82f6',
  'WebSockets / Socket.io': '#a78bfa',
  'Offline Caching': '#f472b6',
  'Scoped Storage': '#fbbf24',
  'Firebase': '#f59e0b',
  'Kotlin': '#c084fc',
  'Android SDK': '#4ade80',
  'Java': '#fb923c',
  'Platform Channels': '#818cf8',
  'Build Flavors': '#3ddc84',
  'System Optimization': '#22d3ee',
  'Clean Architecture': '#818cf8',
  'CI/CD Pipelines': '#f97316',
  'Fastlane': '#f43f5e',
  'Docker': '#0ea5e9',
  'AWS Services': '#ff9900',
  'SonarQube': '#4e9bcd',
  'Rive Animations': '#00f3c6',
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function SkillCloud() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const cardsRef = useRef([]);

  const decoratedSkills = useMemo(() => {
    return skillsData.cloud.map((skill) => ({
      ...skill,
      accent: brandColors[skill.name] || '#a855f7',
    }));
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!sectionRef.current || !galleryRef.current || cardsRef.current.length === 0) return;

    const cards = cardsRef.current;
    const numCards = cards.length;
    const anglePerCard = (Math.PI * 2) / numCards;

    // We use a proxy object to hold the global rotation angle
    const carouselData = { angle: 0 };

    // Determine dynamic radii based on screen size
    const isMobile = window.innerWidth < 768;
    // radiusX determines how wide the carousel is
    const radiusX = isMobile ? 200 : 500;
    // radiusY determines the vertical spread (the 3D tilt). Higher value means back cards go much higher.
    const radiusY = isMobile ? 60 : 130;

    // Reset initial card styles
    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "50% 50%",
      // Add glossy floor reflection effect
      WebkitBoxReflect: 'below 10px linear-gradient(to bottom, rgba(0,0,0,0.0) 60%, rgba(0,0,0,0.5) 100%)'
    });

    const updatePositions = () => {
      cards.forEach((card, i) => {
        const itemAngle = carouselData.angle + i * anglePerCard;
        // True elliptical 3D path:
        const x = Math.sin(itemAngle) * radiusX;

        // At angle 0 (front), cos(0)=1, so y is positive (moved DOWN).
        // At angle PI (back), cos(PI)=-1, so y is negative (moved UP).
        const y = Math.cos(itemAngle) * radiusY;

        // normalizedZ goes from 0 (back) to 1 (front)
        const normalizedZ = (Math.cos(itemAngle) + 1) / 2;

        // Min opacity in back is 0.4 so they are clearly visible
        const opacity = 0.4 + normalizedZ * 0.6;
        // Make back cards smaller to simulate depth
        const scale = 0.4 + normalizedZ * 0.6;

        gsap.set(card, {
          x: x,
          y: y,
          scale: scale,
          opacity: opacity,
          zIndex: Math.round(normalizedZ * 100)
        });
      });
    };

    // Initial positioning
    updatePositions();

    // Auto-play infinite rotation (rotates left/counter-clockwise over time)
    const spinTween = gsap.to(carouselData, {
      angle: carouselData.angle - Math.PI * 2,
      duration: 35, // Smooth, elegant speed
      ease: "none",
      repeat: -1,
      onUpdate: updatePositions,
    });

    // Custom Drag Tracking for spinning
    let lastX = 0;
    let lastTime = 0;
    let dragVelocity = 0;

    Draggable.create('.drag-proxy', {
      type: 'x',
      trigger: galleryRef.current,
      onPress() {
        spinTween.pause();
        this.startAngle = carouselData.angle;
        lastX = this.x;
        lastTime = Date.now();
        dragVelocity = 0;
      },
      onDrag() {
        // Map pixel drag to angle change
        const diffX = this.x - this.startX;
        carouselData.angle = this.startAngle + diffX * 0.005;
        updatePositions();

        const now = Date.now();
        const dt = now - lastTime;
        if (dt > 0) {
          dragVelocity = (this.x - lastX) / dt;
          lastX = this.x;
          lastTime = now;
        }
      },
      onRelease() {
        if (Math.abs(dragVelocity) > 0.1) {
          // Throw distance based on velocity
          const throwAngle = dragVelocity * 1.5;
          gsap.to(carouselData, {
            angle: carouselData.angle + throwAngle,
            duration: 1.5,
            ease: 'power3.out', // Inertia decel curve
            onUpdate: updatePositions,
            onComplete: () => {
              // Re-sync spinTween so it continues smoothly from the new angle
              spinTween.vars.angle = carouselData.angle - Math.PI * 2;
              spinTween.invalidate().restart();
            }
          });
        } else {
          spinTween.vars.angle = carouselData.angle - Math.PI * 2;
          spinTween.invalidate().restart();
        }
      },
    });

    // Add interactivity to cards
    cards.forEach((card, index) => {
      const brandColor = card.dataset.color || '#a855f7';

      const clickHandler = () => {
        spinTween.pause();

        // Calculate shortest path to front for this item
        const targetAngle = -(index * anglePerCard);

        let diff = (targetAngle - carouselData.angle) % (Math.PI * 2);
        if (diff > Math.PI) diff -= Math.PI * 2;
        if (diff < -Math.PI) diff += Math.PI * 2;

        gsap.to(carouselData, {
          angle: carouselData.angle + diff,
          duration: 0.8,
          ease: 'power3.inOut',
          onUpdate: updatePositions,
          onComplete: () => {
            spinTween.vars.angle = carouselData.angle - Math.PI * 2;
            spinTween.invalidate().restart();
          }
        });
      };

      const enterHandler = () => {
        spinTween.pause(); // Pause carousel so user can read the card
        gsap.to(card, {
          borderColor: brandColor,
          boxShadow: `0 0 35px ${brandColor}80`,
          backgroundColor: 'rgba(30, 30, 40, 0.95)',
          duration: 0.3
        });
      };
      const leaveHandler = () => {
        spinTween.play(); // Resume carousel
        gsap.to(card, {
          borderColor: 'rgba(255,255,255,0.1)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          backgroundColor: 'rgba(20, 20, 25, 0.8)',
          duration: 0.3
        });
      };

      card.addEventListener('click', clickHandler);
      card.addEventListener('mouseenter', enterHandler);
      card.addEventListener('mouseleave', leaveHandler);

      card._cleanup = () => {
        card.removeEventListener('click', clickHandler);
        card.removeEventListener('mouseenter', enterHandler);
        card.removeEventListener('mouseleave', leaveHandler);
      };
    });

    return () => {
      cards.forEach(card => card._cleanup && card._cleanup());
      spinTween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative w-full h-screen overflow-hidden bg-dark-bg">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] radial-glow pointer-events-none opacity-20" />
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      {/* Section Header */}
      <div className="absolute top-16 left-0 right-0 z-50 text-center pointer-events-none">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">{skillsData.heading}</h2>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">{skillsData.subheading}</p>
        <div className="section-divider w-24 mx-auto mt-4" />
      </div>

      {/* Invisible Drag Proxy */}
      <div className="drag-proxy invisible absolute" />

      {/* Gallery Container */}
      <div ref={galleryRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing">
        {decoratedSkills.map((skill, index) => {
          const Icon = iconMap[skill.icon] || FaCode;
          return (
            <div
              key={skill.name}
              data-color={skill.accent}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute top-[50%] left-1/2 w-[220px] h-[280px] md:w-[260px] md:h-[320px] glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-2xl cursor-pointer"
              style={{
                backgroundColor: 'rgba(20, 20, 25, 0.8)',
                backdropFilter: 'blur(12px)',
                willChange: 'transform, opacity',
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg"
                  style={{
                    backgroundColor: `${skill.accent}20`,
                    color: skill.accent,
                    boxShadow: `0 0 20px ${skill.accent}30`,
                  }}
                >
                  <Icon size={24} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-lg font-bold text-white truncate">{skill.name}</h4>
                  <p className="text-xs text-gray-400 capitalize">{skill.category}</p>
                </div>
              </div>

              {/* Usages Statements List */}
              <ul className="space-y-2.5 text-sm text-gray-300 mt-4 border-t border-white/10 pt-4 leading-relaxed flex-grow">
                {skill.usages.map((usage, ui) => (
                  <li key={ui} className="flex items-start gap-2">
                    <span className="mt-1 text-xs shrink-0" style={{ color: skill.accent }}>▸</span>
                    <span>{usage}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>


    </section>
  );
}
