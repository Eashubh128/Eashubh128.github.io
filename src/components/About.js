'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { aboutData, personalInfo } from '@/lib/data';

export default function About() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100 mb-3">
            {aboutData.heading}
          </h2>
          <div className="section-divider w-20" />
        </div>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Portrait & Core Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2 flex flex-col items-center sm:items-start"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 shadow-lg">
              <Image
                src="/profile.jpeg"
                alt={personalInfo.name}
                fill
                sizes="(max-width: 768px) 224px, 256px"
                className="object-cover"
                priority
              />
            </div>

            {/* Quick Meta */}
            <div className="mt-6 space-y-2.5 w-full text-xs sm:text-sm text-zinc-400">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-zinc-500 shrink-0" size={14} />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-zinc-500 shrink-0" size={14} />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-zinc-200 transition-colors">
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bio & Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-4"
          >
            {aboutData.paragraphs.map((para, i) => (
              <p key={i} className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                {para}
              </p>
            ))}

            {/* Key Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 mt-8 border-t border-zinc-900">
              {aboutData.stats.map((stat, i) => (
                <div key={i} className="surface-card rounded-xl p-4 text-center">
                  <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100 font-mono">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
