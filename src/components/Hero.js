'use client';

import { motion } from 'framer-motion';
import { FaDownload, FaArrowRight, FaShieldAlt, FaWaveSquare, FaAward } from 'react-icons/fa';
import { personalInfo } from '@/lib/data';

export default function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/70 text-zinc-300 text-xs sm:text-sm font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SDE-1 (Android) at Sunfox Technologies</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">Dehradun, India</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100 mb-6"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Clear Headline / Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl font-medium text-zinc-300 mb-5"
        >
          Mobile Systems Engineer · Android & Cross-Platform
        </motion.p>

        {/* Value Proposition / Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-10"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14"
        >
          <a
            href={personalInfo.resumeUrl}
            download="Thapliyal_Eashubh_3yrs_Mobile.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-zinc-100 text-zinc-900 hover:bg-white font-medium text-sm transition-all shadow-sm"
          >
            <FaDownload size={13} />
            Download Resume (PDF)
          </a>
          <a
            href="#contact"
            onClick={(e) => handleScroll(e, '#contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-200 hover:text-white hover:bg-zinc-800/80 font-medium text-sm transition-all group"
          >
            Get in Touch
            <FaArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* High-Signal Engineering Proof Points */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-zinc-900 max-w-3xl mx-auto text-left"
        >
          <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <FaWaveSquare className="text-zinc-400 shrink-0" size={16} />
            <div className="text-xs">
              <span className="font-semibold text-zinc-200 block">500Hz Real-Time ECG</span>
              <span className="text-zinc-500 font-mono">Foreground BLE streaming</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <FaShieldAlt className="text-zinc-400 shrink-0" size={16} />
            <div className="text-xs">
              <span className="font-semibold text-zinc-200 block">99.9% Crash-Free</span>
              <span className="text-zinc-500 font-mono">Memory profiling & stability</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
            <FaAward className="text-zinc-400 shrink-0" size={16} />
            <div className="text-xs">
              <span className="font-semibold text-zinc-200 block">Patented Architecture</span>
              <span className="text-zinc-500 font-mono">Blockchain warranty system</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
