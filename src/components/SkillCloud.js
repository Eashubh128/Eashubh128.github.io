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
    // radiusX: 550 spreads them out even further to minimize adjacent overlap
    const radiusX = isMobile ? 550 : 800;
    // Flatten radiusY on mobile to make it look like a flat image-viewer coverflow
    const radiusY = isMobile ? 10 : 130;

    // Reset initial card styles
    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "50% 50%",
      force3D: true, // Force hardware acceleration
      // Removed WebkitBoxReflect as it causes severe scroll choppiness by doubling painted layers
      WebkitBoxReflect: 'none'
    });

    const updatePositions = () => {
      const rawActiveIndex = Math.round(-carouselData.angle / anglePerCard);
      const activeIndex = ((rawActiveIndex % cards.length) + cards.length) % cards.length;

      cards.forEach((card, i) => {
        const itemAngle = carouselData.angle + i * anglePerCard;
        const x = Math.sin(itemAngle) * radiusX;

        // Desktop uses standard elliptical orbit.
        // Mobile uses a curved "Rainbow Arc" (Hand of cards effect)
        const arcY = (1 - Math.cos(itemAngle)) * 120; // Drops down at the edges
        const y = isMobile ? arcY : Math.cos(itemAngle) * radiusY;

        // normalizedZ goes from 0 (back) to 1 (front)
        const normalizedZ = (Math.cos(itemAngle) + 1) / 2;

        // Scale fakes the 3D depth. 
        const baseScale = isMobile ? 0.4 : 0.4;
        const scaleRange = isMobile ? 0.6 : 0.6;

        // Use a sharp power curve on mobile to create a "Magnifying Glass" effect.
        // Cards rapidly shrink as they slide away from the center, which mathematically 
        // guarantees their bounding boxes NEVER overlap when they swap Z-indexes!
        const scaleMultiplier = isMobile ? Math.pow(normalizedZ, 8) : normalizedZ;
        const scale = baseScale + scaleMultiplier * scaleRange;

        // Make background items visible
        const baseOpacity = isMobile ? 0.2 : 0.2;
        const opacityRange = isMobile ? 0.8 : 0.8;
        let opacity = baseOpacity + normalizedZ * opacityRange;

        if (isMobile) {
          // Create "distant fog gap" illusion: cards disappear in the middle of the orbit
          let deg = (itemAngle * 180) / Math.PI;
          deg = ((deg % 360) + 360) % 360; // 0 to 360
          if (deg > 180) deg -= 360; // -180 to 180
          const absDeg = Math.abs(deg);

          if (absDeg > 75 && absDeg < 135) {
            opacity = 0; // completely hidden in the fog
          } else if (absDeg >= 60 && absDeg <= 75) {
            opacity *= 1 - ((absDeg - 60) / 15); // Smooth fade out as it leaves the front
          } else if (absDeg >= 135 && absDeg <= 150) {
            opacity *= (absDeg - 135) / 15; // Smooth fade in as it enters the deep background
          }
        }

        // Fan out rotation for mobile arc
        const rotationZ = isMobile ? Math.sin(itemAngle) * 20 : 0;

        gsap.set(card, {
          x: x,
          y: y,
          scale: scale,
          opacity: opacity,
          zIndex: Math.round(normalizedZ * 100),
          rotationZ: rotationZ,
          pointerEvents: opacity > 0 ? 'auto' : 'none' // Prevent invisible cards from stealing clicks
        });

        // Auto-highlight the center active card
        const isActive = (i === activeIndex);
        if (isActive && !card._isActive) {
          card._isActive = true;
          gsap.to(card, {
            borderColor: card.dataset.color || '#a855f7',
            boxShadow: `0 0 35px ${card.dataset.color || '#a855f7'}80`,
            backgroundColor: 'rgba(30, 30, 40, 1)',
            duration: 0.3,
            overwrite: "auto"
          });
        } else if (!isActive && card._isActive) {
          card._isActive = false;
          if (!card._isHovered) {
            gsap.to(card, {
              borderColor: 'rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              backgroundColor: 'rgba(20, 20, 25, 1)',
              duration: 0.3,
              overwrite: "auto"
            });
          }
        }
      });
    };

    // Initial positioning
    updatePositions();

    // Auto-play infinite rotation
    const spinTween = gsap.to(carouselData, {
      angle: carouselData.angle - Math.PI * 2,
      duration: 35, // Smooth, elegant speed
      ease: "none",
      repeat: -1,
      onUpdate: updatePositions,
    });

    // Custom Drag Tracking for spinning with inertia
    let lastX = 0;
    let lastTime = 0;
    let dragVelocity = 0;
    let scrollTimeout; // For click-to-pause

    Draggable.create('.drag-proxy', {
      type: 'x',
      trigger: galleryRef.current,
      onPress() {
        spinTween.pause();
        clearTimeout(scrollTimeout);
        this.startAngle = carouselData.angle;
        lastX = this.x;
        lastTime = Date.now();
        dragVelocity = 0;
      },
      onDrag() {
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
          const throwAngle = dragVelocity * 1.5;
          gsap.to(carouselData, {
            angle: carouselData.angle + throwAngle,
            duration: 1.5,
            ease: 'power3.out',
            onUpdate: updatePositions,
            onComplete: () => {
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
        clearTimeout(scrollTimeout);

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
            if (isMobile) {
              // 4 second pause before resuming on mobile
              scrollTimeout = setTimeout(() => {
                spinTween.vars.angle = carouselData.angle - Math.PI * 2;
                spinTween.invalidate().restart();
              }, 4000);
            } else {
              spinTween.vars.angle = carouselData.angle - Math.PI * 2;
              spinTween.invalidate().restart();
            }
          }
        });
      };

      const enterHandler = () => {
        card._isHovered = true;
        spinTween.pause();
        if (!card._isActive) {
          gsap.to(card, {
            borderColor: brandColor,
            boxShadow: `0 0 35px ${brandColor}80`,
            backgroundColor: 'rgba(30, 30, 40, 1)',
            duration: 0.3,
            overwrite: "auto"
          });
        }
      };
      const leaveHandler = () => {
        card._isHovered = false;
        spinTween.play();
        if (!card._isActive) {
          gsap.to(card, {
            borderColor: 'rgba(255,255,255,0.1)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            backgroundColor: 'rgba(20, 20, 25, 1)',
            duration: 0.3,
            overwrite: "auto"
          });
        }
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
      clearTimeout(scrollTimeout);
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
      <div
        ref={galleryRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      >
        {decoratedSkills.map((skill, index) => {
          const Icon = iconMap[skill.icon] || FaCode;
          return (
            <div
              key={skill.name}
              data-color={skill.accent}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute top-[50%] left-1/2 w-[210px] h-[290px] md:w-[260px] md:h-[320px] glass-card rounded-2xl p-4 md:p-6 border border-white/10 flex flex-col justify-between shadow-2xl cursor-pointer"
              style={{
                backgroundColor: 'rgba(20, 20, 25, 1)', // Solid opaque background eliminates expensive blend passes
                // backdropFilter: 'blur(12px)', // Removed: Blur filters combined with moving layers kill scroll performance
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
              <ul className="space-y-2 text-xs md:text-sm text-gray-300 mt-3 md:mt-4 border-t border-white/10 pt-3 md:pt-4 leading-relaxed flex-grow overflow-y-auto custom-scrollbar">
                {skill.usages.map((usage, ui) => (
                  <li key={ui} className="flex items-start gap-2">
                    <span className="mt-0.5 md:mt-1 text-[10px] md:text-xs shrink-0" style={{ color: skill.accent }}>▸</span>
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
