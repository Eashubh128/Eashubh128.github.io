'use client';

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { projectsData } from '@/lib/data';
import ParallaxLayer from '@/components/ParallaxLayer';

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-2xl overflow-hidden group"
    >
      {/* Image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-dark-card to-dark-bg overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text opacity-30 mb-1">
              {project.title.split(' ')[0]}
            </div>
            <div className="text-xs text-gray-600 font-mono">screenshot</div>
          </div>
        </div>
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-neon-purple/20 text-neon-purple border border-neon-purple/30 rounded-full">
            Featured
          </div>
        )}

        {/* Hover overlay with links */}
        <div className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={project.github}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="View source code"
          >
            <FaGithub size={20} />
          </a>
          <a
            href={project.demo}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="View live demo"
          >
            <FaExternalLinkAlt size={18} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neon-purple transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-mono rounded-md bg-white/5 text-gray-400 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 relative">
      <ParallaxLayer speed={0.1} className="absolute top-10 right-0 w-[400px] h-[300px] radial-glow pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">{projectsData.heading}</h2>
          <p className="text-gray-500 text-sm sm:text-base">{projectsData.subheading}</p>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
