"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import Navbar from "./Navbar";
import SpecularButton from "./SpecularButton";

// Animation Variants
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

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const imageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

export default function ProjectDetail({
  project,
  onBack,
  onViewAllProjects,
  onNavigateSection,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Synchronous initial check prevents frame delay flicker
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return true;
  });

  // Sync dark mode state to feed the component props directly if needed
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const images = project.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project.image];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleBackToAllProjects = () => {
    if (onViewAllProjects) {
      onViewAllProjects();
    } else if (onBack) {
      onBack();
    }
  };

  const handleRequestSimilarProject = () => {
    if (onBack) {
      onBack();
    }

    let attempts = 0;
    const checkAndScroll = () => {
      const element = document.getElementById("appointment");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 10) {
        attempts++;
        setTimeout(checkAndScroll, 50);
      }
    };

    setTimeout(checkAndScroll, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 overflow-hidden transition-colors duration-300">
      <Navbar
        onNavigateHome={onBack}
        onNavigateSection={onNavigateSection}
        onViewAllProjects={onViewAllProjects}
        isDetailPage={true}
      />

      <motion.div 
        className="pt-28 pb-24 max-w-7xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Header Title & Badge */}
        <motion.div variants={itemVariants} className="space-y-3 mb-10">
          <span className="inline-block text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 transition-colors duration-300">
            {project.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
            {project.title}
          </h1>
        </motion.div>

        {/* Image Gallery Showcase */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="relative h-[400px] md:h-[550px] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group transition-colors duration-300 shadow-lg">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                alt={`${project.title} - Image ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 dark:bg-slate-950/60 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 dark:border-slate-700/50 transition-colors opacity-90 group-hover:opacity-100 shadow-lg z-10 cursor-pointer"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/60 dark:bg-slate-950/60 hover:bg-amber-500 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 dark:border-slate-700/50 transition-colors opacity-90 group-hover:opacity-100 shadow-lg z-10 cursor-pointer"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-slate-900/70 dark:bg-slate-950/70 border border-slate-700 dark:border-slate-800 rounded-full text-xs text-slate-100 dark:text-slate-300 backdrop-blur-md z-10 transition-colors duration-300">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
              {images.map((imgUrl, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThumbnailClick(i)}
                  className={`relative w-28 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                    currentIndex === i 
                      ? "border-amber-500 ring-2 ring-amber-500/30 opacity-100" 
                      : "border-slate-300 dark:border-slate-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={imgUrl} alt="Miniature" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Details Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-4 shadow-lg dark:shadow-xl transition-colors duration-300"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Présentation du Projet</h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed transition-colors duration-300">{project.overview}</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 space-y-4 shadow-lg dark:shadow-xl transition-colors duration-300"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Points Forts & Ingénierie</h3>
              <ul className="space-y-3">
                {project.highlights?.map((item, index) => (
                  <motion.li 
                    key={index} 
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                    className="flex items-start gap-3 text-slate-600 dark:text-slate-300 text-sm transition-colors duration-300"
                  >
                    <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Sidebar Specs */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 shadow-lg dark:shadow-xl sticky top-28 transition-colors duration-300"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4 transition-colors duration-300">
                Fiche Technique du Projet
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors duration-300">
                  <User className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400 dark:text-slate-500 transition-colors duration-300">Maître d'Ouvrage / Client</span>
                    <span className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">{project.client}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400 dark:text-slate-500 transition-colors duration-300">Localisation</span>
                    <span className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">{project.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 transition-colors duration-300">
                  <Calendar className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <div>
                    <span className="block text-xs text-slate-400 dark:text-slate-500 transition-colors duration-300">Statut / Durée</span>
                    <span className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">{project.duration}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
                <SpecularButton
                  onClick={handleRequestSimilarProject}
                  size="md"
                  radius={12}
                  lineColor="#f59e0b"
                  baseColor={isDarkMode ? "#0f172a" : "#f1f5f9"}
                  textColor={isDarkMode ? "#ffffff" : "#0f172a"}
                  tint="#f59e0b"
                  tintOpacity={0.15}
                  intensity={1.2}
                  shineSize={15}
                  shineFade={35}
                  thickness={1.5}
                  speed={0.35}
                  followMouse={true}
                  proximity={300}
                  autoAnimate={false}
                  className="w-full justify-center text-center font-bold text-xs uppercase tracking-wider cursor-pointer text-slate-900 dark:text-white [&_*]:!text-slate-900 dark:[&_*]:!text-white transition-colors duration-300"
                >
                  Demander un Projet Similaire
                </SpecularButton>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}