'use client';

import { motion } from 'framer-motion';
import { experienceData } from '@/lib/data';
import ParallaxLayer from '@/components/ParallaxLayer';

export default function Experience() {
  const { jobs } = experienceData;

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 relative">
      <ParallaxLayer speed={0.1} className="absolute bottom-0 left-0 w-[400px] h-[300px] radial-glow pointer-events-none" />
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{experienceData.heading}</h2>
          <p className="text-gray-500 text-sm sm:text-base">{experienceData.subheading}</p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-purple via-neon-blue to-transparent" />

          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot on timeline */}
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 mt-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue ring-4 ring-dark-bg" />
              </div>

              {/* Content */}
              <div className={`pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="glass-card rounded-2xl p-5">
                  {/* Period */}
                  <span className="inline-block text-xs font-mono text-neon-cyan bg-neon-cyan/10 px-3 py-1 rounded-full mb-3">
                    {job.period}
                  </span>

                  {/* Role */}
                  <h3 className="text-lg font-semibold text-white mb-1">{job.role}</h3>
                  <p className="text-sm text-neon-purple mb-3">{job.company}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{job.description}</p>

                  {/* Achievements */}
                  <ul className={`space-y-1.5 ${i % 2 === 0 ? 'md:text-right' : ''}`}>
                    {job.achievements.map((ach, ai) => (
                      <li
                        key={ai}
                        className={`text-xs text-gray-500 flex items-start gap-2 ${
                          i % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                        }`}
                      >
                        <span className="text-neon-blue mt-0.5 shrink-0">▸</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for the other half on desktop */}
              <div className="hidden md:block md:w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
