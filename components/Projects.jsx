"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar } from "lucide-react";
import { PROJECTS } from "../data/projects";

// Container stagger sequence
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Restored Pop-up entrance animation with scale + slide
const popupCardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.88,
    y: 35
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

export default function Projects({ onSelectProject }) {
  return (
    <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
            Nos Réalisations
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 text-slate-900 dark:text-white tracking-tight">
            Projets Récents
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 max-w-md text-sm md:text-base">
          Découvrez une sélection de nos projets de construction et de génie civil réalisés avec rigueur et précision.
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            variants={popupCardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectProject && onSelectProject(project.id)}
            className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer transform-gpu will-change-transform"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              <span className="absolute top-4 left-4 text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {project.category}
              </span>

              <div className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300 shadow-lg">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-200 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mt-2 line-clamp-2 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  {project.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                  {project.duration}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}