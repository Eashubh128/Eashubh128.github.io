'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { aboutData, personalInfo } from '@/lib/data';
import ParallaxLayer from '@/components/ParallaxLayer';
import gsap from 'gsap';

function AnimatedStat({ stat }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const steps = 50;
          const increment = stat.value / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= stat.value) {
              setCount(stat.value);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl sm:text-3xl font-bold gradient-text">
        {count}{stat.suffix}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
    </div>
  );
}

export default function About() {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (max 15 degrees)
    const rotateX = ((centerY - y) / centerY) * 15;
    const rotateY = ((x - centerX) / centerX) * 15;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.3,
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.6,
      overwrite: 'auto',
    });
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{aboutData.heading}</h2>
          <div className="section-divider w-24" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Avatar / Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2 flex flex-col items-center"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-56 h-56 sm:w-64 sm:h-64 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Gradient ring */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-purple via-neon-blue to-neon-cyan p-[2px]"
                style={{ transform: 'translateZ(20px)' }}
              >
                <div className="w-full h-full rounded-2xl bg-dark-bg overflow-hidden relative">
                  <div className="w-full h-full relative" style={{ transform: 'translateZ(10px)' }}>
                    <Image
                      src="/profile.jpeg"
                      alt={personalInfo.name}
                      fill
                      sizes="(max-width: 768px) 256px, 256px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
              {/* Glow */}
              <ParallaxLayer speed={0.08} className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 blur-2xl -z-10" />
            </div>

            {/* Quick info */}
            <div className="mt-8 space-y-3 w-full">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-neon-purple" size={14} />
                {personalInfo.location}
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="text-neon-blue" size={14} />
                {personalInfo.email}
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-4"
          >
            {aboutData.paragraphs.map((para, i) => (
              <p key={i} className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {para}
              </p>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 mt-6 border-t border-white/5">
              {aboutData.stats.map((stat, i) => (
                <AnimatedStat key={i} stat={stat} delay={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
