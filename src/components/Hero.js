'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import { personalInfo } from '@/lib/data';
import ParallaxLayer from '@/components/ParallaxLayer';
import InteractiveGrid from '@/components/InteractiveGrid';

function Typewriter({ words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span>
      {text}
      <span className="cursor-blink" />
    </span>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
      {/* Grid overlay (static faint lines) */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      {/* Interactive canvas grid (glowing pixels) */}
      <InteractiveGrid />
    </div>
  );
}

export default function Hero() {
  const magneticZoneRef = useRef(null);
  const magneticBtnRef = useRef(null);

  useEffect(() => {
    const zone = magneticZoneRef.current;
    const btn = magneticBtnRef.current;
    if (!zone || !btn) return;

    const handleMouseMove = (e) => {
      const rect = zone.getBoundingClientRect();
      const x = gsap.utils.mapRange(rect.left, rect.right, -rect.width / 2, rect.width / 2, e.clientX);
      const y = gsap.utils.mapRange(rect.top, rect.bottom, -rect.height / 2, rect.height / 2, e.clientY);

      gsap.to(btn, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { 
        x: 0, 
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto"
      });
    };

    zone.addEventListener("mousemove", handleMouseMove);
    zone.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      zone.removeEventListener("mousemove", handleMouseMove);
      zone.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownload = (e) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent('trigger-curve-swipe', {
        detail: {
          callback: () => {
            // Trigger actual download
            const link = document.createElement('a');
            link.href = personalInfo.resumeUrl;
            link.download = 'Eashubh_Thapliyal_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          },
        },
      })
    );
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingOrbs />
      {/* Parallax grid backdrop */}
      <ParallaxLayer speed={0.12} className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-sm sm:text-base font-mono mb-4"
        >
          <span className="text-neon-purple">console</span>.log(&apos;Hello World!&apos;)
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
        >
          Hi, I&apos;m{' '}
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Typewriter Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 h-10"
        >
          <Typewriter words={personalInfo.roles} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-gray-400 max-w-2xl mx-auto mb-10 text-base sm:text-lg"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <div ref={magneticZoneRef} className="relative p-6 -m-6 z-20 cursor-pointer flex items-center justify-center">
            <div ref={magneticBtnRef}>
              <a
                href={personalInfo.resumeUrl}
                onClick={handleDownload}
                className="curve-swipe-btn border border-purple-500/40 bg-purple-500/10 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-medium text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:bg-purple-500/20 hover:border-purple-400/60 transition-all duration-300"
              >
                <FaDownload size={14} />
                Download CV
              </a>
            </div>
          </div>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="neon-btn inline-flex items-center gap-2 px-8 py-3.5 glass-card rounded-xl text-gray-300 font-medium text-sm hover:text-white group"
          >
            Let&apos;s Talk
            <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-gray-500 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ opacity: [1, 0], y: [0, 12] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 bg-neon-purple rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
