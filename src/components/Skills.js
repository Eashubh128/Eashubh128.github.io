'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '@/lib/data';
import {
  SiFlutter, SiKotlin, SiDart, SiFirebase, SiSocketdotio, SiGitlab,
  SiFastlane, SiRive, SiJavascript, SiTypescript, SiNextdotjs,
  SiTailwindcss, SiGreensock, SiTensorflow, SiPytorch,
} from 'react-icons/si';
import {
  FaAndroid, FaAws, FaReact, FaNodeJs, FaJava, FaBluetooth, FaDatabase,
  FaCode, FaCogs, FaShieldAlt, FaDocker, FaBrain, FaRobot,
} from 'react-icons/fa';

const iconMap = {
  SiFlutter,
  SiKotlin,
  SiDart,
  SiFirebase,
  SiSocketdotio,
  SiGitlab,
  SiFastlane,
  SiSonarqube: FaCogs,
  SiRive,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGreensock,
  SiTensorflow,
  SiPytorch,
  FaAndroid,
  FaAws,
  FaReact,
  FaNodeJs,
  FaJava,
  FaBluetooth,
  FaDatabase,
  FaCode,
  FaCogs,
  FaShieldAlt,
  FaDocker,
  FaBrain,
  FaRobot,
};

const categoryLabels = {
  all: 'All Disciplines',
  native: 'Native Android & Systems',
  'ai-ml': 'AI & On-Device ML',
  'cross-platform': 'Cross-Platform & Languages',
  'architecture-devops': 'DevOps & Tooling',
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'native', 'ai-ml', 'cross-platform', 'architecture-devops'];

  const filteredSkills = skillsData.cloud.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100 mb-3">
            {skillsData.heading}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {skillsData.subheading}
          </p>
          <div className="section-divider w-20 mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Skill categories">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 border border-zinc-800/80'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const Icon = iconMap[skill.icon] || FaCode;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={skill.name}
                  className="surface-card rounded-xl p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-3.5">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-200 shrink-0">
                        <Icon size={20} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-medium text-zinc-100 truncate">
                          {skill.name}
                        </h3>
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                          {categoryLabels[skill.category] || skill.category}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 pt-3 border-t border-zinc-800/80">
                      {skill.usages.map((usage, ui) => (
                        <li key={ui} className="text-xs text-zinc-400 leading-relaxed flex items-start gap-2">
                          <span className="text-accent-light shrink-0 mt-0.5">•</span>
                          <span>{usage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
