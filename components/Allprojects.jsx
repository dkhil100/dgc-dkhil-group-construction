"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Calendar, Search } from "lucide-react";
import { PROJECTS } from "../data/projects";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Container stagger sequence
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Card entrance animation
const cardVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 30
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

export default function Allprojects({
  onSelectProject,
  onNavigateHome,
  onNavigateSection,
  onViewAllProjects,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const projectsList = Array.isArray(PROJECTS) ? PROJECTS : [];

  // Extract unique categories for filtering
  const categories = ["Tous", ...new Set(projectsList.map((p) => p.category))];

  // Filter projects based on search query and category
  const filteredProjects = projectsList.filter((project) => {
    const matchesSearch = 
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.overview?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "Tous" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar
        onNavigateHome={onNavigateHome}
        onNavigateSection={onNavigateSection}
        onViewAllProjects={onViewAllProjects}
      />

      <main className="flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
            Portfolio Complet
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Tous Nos Projets
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg">
            Explorez l'ensemble de nos réalisations en construction, génie civil et infrastructures à travers des standards d'excellence rigoureux.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-center md:justify-end gap-6 mb-12">
          {/* Search Input */}
          <div className="relative w-full md:w-80 md:ml-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectProject?.(project.id)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer transform-gpu"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title || "Project image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  <span className="absolute top-4 left-4 z-10 text-xs font-bold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {project.category}
                  </span>

                  <div className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300 shadow-lg">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>

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
        ) : (
          <div className="text-center py-20 space-y-4">
            <p className="text-lg font-semibold text-slate-600 dark:text-slate-400">
              Aucun projet ne correspond à votre recherche.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Tous");
              }}
              className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-md hover:bg-amber-600 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}