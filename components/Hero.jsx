"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { PROJECTS } from "../data/projects";
import SpecularButton from "./SpecularButton";

export default function Hero({ startAnimation = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroImages = useMemo(
    () => PROJECTS.map((p) => p.image).filter(Boolean),
    []
  );

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-slate-50 dark:bg-slate-950 pt-20 transition-colors duration-300"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {heroImages.length > 0 && (
            <motion.img
              key={currentIndex}
              src={heroImages[currentIndex]}
              alt="DGC Construction Project Showcase"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 0.65, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="w-full h-full object-cover absolute inset-0"
            />
          )}
        </AnimatePresence>

        {/* Dynamic Light/Dark Shading Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/85 dark:to-transparent w-full md:w-3/4 z-10 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50/40 dark:from-slate-950 dark:via-transparent dark:to-slate-950/50 z-10 transition-colors duration-300" />

        {/* Radial Overlay Pattern */}
        <div
          className="absolute inset-0 z-10 opacity-15 dark:opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-950/80 border border-amber-500/50 dark:border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg transition-colors duration-300"
          >
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>Excellence en Construction de Premier Ordre</span>
          </motion.div>

          {/* Heading */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.15] tracking-tight drop-shadow-md transition-colors duration-300"
            >
              Bâtir l'Avenir avec{" "}
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-amber-600 dark:text-amber-500 block mt-1 drop-shadow-md"
              >
                Précision & Puissance
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl font-medium drop-shadow transition-colors duration-300"
          >
            DGC DKHIL GROUP CONSTRUCTION réalise des projets d'ingénierie structurelle commerciale d'élite, des développements résidentiels de luxe et des infrastructures industrielles de grande envergure.
          </motion.p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              href="#appointment"
              className="inline-block"
            >
              <SpecularButton
                size="md"
                radius={12}
                lineColor="#f59e0b"
                baseColor="var(--specular-base-color, #0f172a)"
                tint="#f59e0b"
                tintOpacity={0.15}
                textColor="currentColor"
                intensity={1.2}
                shineSize={15}
                shineFade={35}
                thickness={1.5}
                speed={0.35}
                followMouse={true}
                proximity={300}
                autoAnimate={false}
                className="text-black dark:text-white"
              >
                <span className="text-black dark:text-white font-semibold inline-flex items-center">
                  Réserver une Consultation
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </SpecularButton>
            </motion.a>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-white/80 dark:bg-slate-950/80 hover:bg-white dark:hover:bg-slate-900 text-black dark:text-white font-semibold rounded-xl border border-slate-300 dark:border-slate-700/80 backdrop-blur-md transition-all text-sm shadow-lg hover:border-amber-500/50"
            >
              Découvrir Nos Réalisations
            </motion.a>
          </div>
        </div>

        {/* Carousel Indicators */}
        {heroImages.length > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={startAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="absolute bottom-10 right-6 z-30 flex items-center gap-2 bg-white/70 dark:bg-slate-950/70 p-2 rounded-full backdrop-blur-md border border-slate-300 dark:border-slate-800 transition-colors duration-300"
          >
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-amber-500"
                    : "w-2 bg-slate-400 dark:bg-slate-600 hover:bg-slate-500 dark:hover:bg-slate-400"
                }`}
                aria-label={`Aller à la diapositive ${idx + 1}`}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}