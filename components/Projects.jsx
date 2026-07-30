"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Calendar } from "lucide-react";
import { PROJECTS } from "../data/projects";

export default function Projects({ onSelectProject }) {
  return (
    <section
      id="projects"
      className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
        >
          <div>
            <h2 className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest mb-2 transition-colors duration-300">
              Portfolio
            </h2>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
              Nos Dernières Réalisations
            </p>
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              onClick={() => onSelectProject && onSelectProject(project.id)}
              className="group cursor-pointer bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 dark:hover:border-amber-500/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 dark:hover:shadow-amber-500/5 flex flex-col justify-between"
            >
              <div>
                {/* Image & Category Tag Container */}
                <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-950 transition-colors duration-300">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-amber-600 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md transition-colors duration-300">
                    {project.category}
                  </div>
                </div>

                {/* Card Main Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200 flex items-center justify-between">
                    <span>{project.title}</span>
                    <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-amber-600 dark:text-amber-400 shrink-0 ml-2" />
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed transition-colors duration-300">
                    {project.overview}
                  </p>
                </div>
              </div>

              {/* Card Footer Details */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0" />
                    {project.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}