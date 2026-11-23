'use client';

import { motion } from 'framer-motion';
import { experienceData } from '@/lib/data';

export default function Experience() {
  const { jobs } = experienceData;

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 relative border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100 mb-3">
            {experienceData.heading}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {experienceData.subheading}
          </p>
          <div className="section-divider w-20 mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative border-l border-zinc-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
          {jobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-zinc-700 ring-4 ring-[#09090b]" />

              <div className="surface-card rounded-xl p-6">
                {/* Header: Period & Role */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {job.role}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">
                    {job.period}
                  </span>
                </div>

                <div className="text-sm font-medium text-accent-light mb-3">
                  {job.company}
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {job.description}
                </p>

                {/* Achievements */}
                <div className="pt-3 border-t border-zinc-800/80">
                  <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2.5">
                    Key Engineering Contributions
                  </h4>
                  <ul className="space-y-2">
                    {job.achievements.map((ach, ai) => (
                      <li key={ai} className="text-xs sm:text-sm text-zinc-400 leading-relaxed flex items-start gap-2.5">
                        <span className="text-accent-light shrink-0 mt-1">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
