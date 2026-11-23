'use client';

import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { projectsData } from '@/lib/data';

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="surface-card rounded-xl overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Project Preview */}
        <div className="relative h-48 bg-zinc-900 border-b border-zinc-800/80 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-900/90 text-zinc-600 font-mono text-xs">
              {project.title} Preview
            </div>
          )}

          {project.featured && (
            <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-zinc-950/80 text-zinc-300 border border-zinc-700/60 rounded">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base sm:text-lg font-semibold text-zinc-100 mb-2">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-800/60 text-zinc-400 border border-zinc-700/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 pt-2 flex items-center gap-3 border-t border-zinc-800/60 mt-auto">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
            aria-label={`${project.title} Source Code`}
          >
            <FaGithub size={14} />
            <span>Source</span>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors ml-auto"
            aria-label={`${project.title} Live Preview`}
          >
            <FaExternalLinkAlt size={12} />
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100 mb-3">
            {projectsData.heading}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {projectsData.subheading}
          </p>
          <div className="section-divider w-20 mt-4" />
        </div>

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
