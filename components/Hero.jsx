"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { PROJECTS } from "../data/projects";
import SpecularButton from "./SpecularButton";

export default function Hero({ startAnimation = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const heroImages = PROJECTS.map((p) => p.image).filter(Boolean);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden bg-slate-950 pt-20">
      {/* --- CARROUSEL D'IMAGES D'ARRIÈRE-PLAN --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {heroImages.length > 0 && (
            <motion.img
              key={currentIndex}
              src={heroImages[currentIndex]}
              alt="Project Showcase"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.7, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="w-full h-full object-cover absolute inset-0"
            />
          )}
        </AnimatePresence>

        {/* Dégradés d'ombrage */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent w-full md:w-3/4 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />

        {/* Motif de points */}
        <div 
          className="absolute inset-0 z-10 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      {/* --- CONTENU DU HERO --- */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl space-y-6">
          
          {/* Badge top */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: -25 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/80 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg"
          >
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>Excellence en Construction de Premier Ordre</span>
          </motion.div>

          {/* Titre Principal */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight drop-shadow-md"
            >
              Bâtir l'Avenir avec{" "}
              <motion.span 
                initial={{ opacity: 0, x: -40 }}
                animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-amber-500 block mt-1 drop-shadow-md"
              >
                Précision & Puissance
              </motion.span>
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl font-medium drop-shadow"
          >
            DGC DKHIL GROUP CONSTRUCTION réalise des projets d'ingénierie structurelle commerciale d'élite, des développements résidentiels de luxe et des infrastructures industrielles de grande envergure.
          </motion.p>

          {/* Boutons d'action (CTA) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            {/* Left Button - WebGL Specular Shader */}
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
                baseColor="#0f172a"
                tint="#f59e0b"
                tintOpacity={0.15}
                textColor="#ffffff"
                intensity={1.2}
                shineSize={15}
                shineFade={35}
                thickness={1.5}
                speed={0.35}
                followMouse={true}
                proximity={300}
                autoAnimate={false}
              >
                Réserver une Consultation
                <ArrowRight className="w-4 h-4 ml-1" />
              </SpecularButton>
            </motion.a>

            {/* Right Button */}
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3.5 bg-slate-950/80 hover:bg-slate-900 text-white font-semibold rounded-xl border border-slate-700/80 backdrop-blur-md transition-all text-sm shadow-lg"
            >
              Découvrir Nos Réalisations
            </motion.a>
          </div>
        </div>

        {/* --- INDICATEURS DU CARROUSEL --- */}
        {heroImages.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={startAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="absolute bottom-10 right-6 z-30 flex items-center gap-2 bg-slate-950/60 p-2 rounded-full backdrop-blur-sm border border-slate-800"
          >
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? "w-8 bg-amber-500" 
                    : "w-2 bg-slate-500 hover:bg-slate-300"
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