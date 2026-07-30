"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Calendar } from "lucide-react";
import { PROJECTS } from "../data/projects";

export default function Projects({ onSelectProject }) {
  return (
    <section id="projects" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Repeated Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
              Nos Dernières Réalisations
            </h2>
          </div>
        </motion.div>

        {/* Project Cards Grid with Repeated Scroll Stagger Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              onClick={() => onSelectProject(project.id)}
              className="group cursor-pointer bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {project.category}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                  {project.title}
                  <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                </h3>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {project.overview}
                </p>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    {project.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
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