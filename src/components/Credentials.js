'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaCertificate, FaAward } from 'react-icons/fa';
import { credentialsData } from '@/lib/data';

export default function Credentials() {
  const { education, patent, achievements } = credentialsData;

  return (
    <section id="credentials" className="py-24 px-4 sm:px-6 relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100 mb-3">
            Education & Credentials
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Academic history, patented inventions, and national engineering honors.
          </p>
          <div className="section-divider w-20 mt-4" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Column — Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2.5 pb-2">
              <FaGraduationCap className="text-zinc-400" size={18} />
              <h3 className="text-lg font-semibold text-zinc-100">Academic Background</h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, i) => (
                <div key={i} className="surface-card rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h4 className="text-sm sm:text-base font-medium text-zinc-100">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-mono text-zinc-500 shrink-0">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 mb-3">{edu.institution}</p>
                  <div className="flex items-center justify-between text-xs text-zinc-500 pt-2.5 border-t border-zinc-800/80">
                    <span>{edu.location}</span>
                    <span className="font-mono text-zinc-300 font-medium">
                      {edu.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Patent & Honors */}
          <div className="space-y-10">
            {/* Patent Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2.5 pb-2">
                <FaCertificate className="text-zinc-400" size={16} />
                <h3 className="text-lg font-semibold text-zinc-100">Patent</h3>
              </div>

              <div className="surface-card rounded-xl p-6 border-zinc-800">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono text-accent-light uppercase tracking-wider font-semibold">
                    Patent ID: {patent.id}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    Issued: {patent.issuedDate}
                  </span>
                </div>
                <h4 className="text-base font-medium text-zinc-100 mb-2">
                  {patent.title}
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {patent.description}
                </p>
              </div>
            </motion.div>

            {/* Honors & Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2.5 pb-2">
                <FaAward className="text-zinc-400" size={16} />
                <h3 className="text-lg font-semibold text-zinc-100">Honors & Competitions</h3>
              </div>

              <div className="space-y-3">
                {achievements.map((ach, i) => (
                  <div key={i} className="surface-card rounded-xl p-4 flex gap-3.5 items-start">
                    <span className="text-zinc-400 mt-0.5 text-xs font-mono shrink-0">0{i + 1}</span>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-100 mb-0.5">
                        {ach.title}
                      </h4>
                      <p className="text-xs text-accent-light font-mono mb-1.5">{ach.organization}</p>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
