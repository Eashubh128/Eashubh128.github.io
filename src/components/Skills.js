'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaLaptopCode, FaCodeBranch } from 'react-icons/fa';
import { skillsData } from '@/lib/data';

const categoryIcons = {
  FaReact,
  SiTailwindcss: FaLaptopCode,
  SiGit: FaCodeBranch,
};

function SkillBar({ name, level }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 150);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-300">{name}</span>
        <span className="text-xs text-gray-500 font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-dark-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-neon-purple via-neon-blue to-neon-cyan transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] radial-glow pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{skillsData.heading}</h2>
          <p className="text-gray-500 text-sm sm:text-base">{skillsData.subheading}</p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Skill Categories */}
        <div className="grid md:grid-cols-3 gap-6">
          {skillsData.categories.map((category, ci) => {
            const Icon = categoryIcons[category.icon] || FaReact;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ci * 0.15 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 flex items-center justify-center">
                    <Icon className="text-neon-purple" size={20} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                </div>

                {/* Skill bars */}
                <div className="space-y-4">
                  {category.skills.map((skill, si) => (
                    <SkillBar key={si} name={skill.name} level={skill.level} delay={si * 0.1} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
