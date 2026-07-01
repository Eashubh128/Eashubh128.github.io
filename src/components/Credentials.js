'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaAward, FaCertificate, FaMedal } from 'react-icons/fa';
import { credentialsData } from '@/lib/data';
import ParallaxLayer from '@/components/ParallaxLayer';

export default function Credentials() {
  const { education, patent, achievements } = credentialsData;

  return (
    <section id="credentials" className="py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background elements */}
      <ParallaxLayer speed={0.08} className="absolute top-1/4 left-0 w-[500px] h-[400px] radial-glow pointer-events-none opacity-40" />
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Education & Credentials</h2>
          <p className="text-gray-500 text-sm sm:text-base">Academic history, patents, and key achievements</p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column — Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-neon-purple/20 flex items-center justify-center border border-neon-purple/30">
                <FaGraduationCap className="text-neon-purple" size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Education</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 relative group border border-white/5 hover:border-neon-purple/20 transition-all duration-300">
                  <div className="absolute top-6 right-6 text-xs font-mono text-neon-purple bg-neon-purple/10 px-3 py-1 rounded-full">
                    {edu.period}
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-1 pr-24 group-hover:text-neon-purple transition-colors">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-gray-300 font-medium mb-2">{edu.institution}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5">
                    <span>{edu.location}</span>
                    <span className="font-semibold font-mono text-neon-cyan bg-neon-cyan/5 px-2.5 py-0.5 rounded">
                      {edu.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Patent & Achievements */}
          <div className="space-y-12">
            {/* Patent Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/30">
                  <FaCertificate className="text-neon-cyan" size={18} />
                </div>
                <h3 className="text-xl font-bold text-white">Patents & Publications</h3>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-neon-cyan/20 bg-gradient-to-br from-dark-card to-neon-cyan/5 relative overflow-hidden group">
                <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-neon-cyan/10 rounded-full blur-2xl group-hover:bg-neon-cyan/20 transition-all duration-500" />
                <div className="flex justify-between items-start gap-4 mb-3">
                  <span className="text-[10px] sm:text-xs font-mono text-neon-cyan bg-neon-cyan/10 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                    Patent ID: {patent.id}
                  </span>
                  <span className="text-xs font-mono text-gray-500">
                    Issued: {patent.issuedDate}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  {patent.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {patent.description}
                </p>
              </div>
            </motion.div>

            {/* Achievements Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-neon-blue/20 flex items-center justify-center border border-neon-blue/30">
                  <FaAward className="text-neon-blue" size={18} />
                </div>
                <h3 className="text-xl font-bold text-white">Honors & Awards</h3>
              </div>

              <div className="space-y-4">
                {achievements.map((ach, i) => (
                  <div key={i} className="glass-card rounded-2xl p-5 border border-white/5 hover:border-neon-blue/20 transition-all duration-300 flex gap-4 items-start">
                    <div className="mt-1 w-8 h-8 rounded-lg bg-neon-blue/10 flex items-center justify-center shrink-0 text-neon-blue">
                      <FaMedal size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-semibold text-white mb-0.5">
                        {ach.title}
                      </h4>
                      <p className="text-xs text-neon-purple font-mono mb-2">{ach.organization}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">
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
