"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { ArrowRight, Building2, Award, Briefcase, Users, Hammer } from "lucide-react";
import { PROJECTS } from "../data/projects";
import SpecularButton from "./SpecularButton";

// Imperative Animated Counter synced with component visibility
function CountUp({ value, prefix = "+", duration = 2, delay = 0.9, start = true }) {
  const [displayCount, setDisplayCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView || !start) return;
    const targetNumber = parseInt(value.replace(/\D/g, ""), 10) || 0;
    const controls = animate(0, targetNumber, {
      duration: duration,
      delay: delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplayCount(Math.floor(latest));
      },
    });
    return () => controls.stop();
  }, [isInView, start, value, duration, delay]);

  return <span ref={ref}>{prefix}{displayCount}</span>;
}

export default function Hero({ startAnimation = true }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBgLight, setIsBgLight] = useState(false);

  const heroImages = useMemo(
    () => PROJECTS.map((p) => p.image).filter(Boolean),
    []
  );

  // Analyze active image brightness whenever currentIndex updates
  useEffect(() => {
    if (!heroImages[currentIndex]) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = heroImages[currentIndex];

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 50;
      canvas.height = 50;

      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 50, 50);

      const imageData = ctx.getImageData(0, 0, 50, 50);
      const data = imageData.data;
      let r, g, b, avgLuminance;
      let colorSum = 0;

      for (let i = 0; i < data.length; i += 4) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];

        colorSum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }

      avgLuminance = colorSum / (50 * 50);
      setIsBgLight(avgLuminance > 128);
    };
  }, [currentIndex, heroImages]);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  const stats = [
    {
      value: "+30",
      label: "Années d'Expérience",
      icon: Award,
    },
    {
      value: "+100",
      label: "Projets Réalisés",
      icon: Briefcase,
    },
    {
      value: "+80",
      label: "Experts & Ouvriers",
      icon: Users,
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 pt-20 transition-colors duration-300"
    >
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0 bg-slate-950">
        <AnimatePresence initial={false}>
          {heroImages.length > 0 && (
            <motion.img
              key={currentIndex}
              src={heroImages[currentIndex]}
              alt="DGC Construction Project Showcase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full object-cover absolute inset-0"
            />
          )}
        </AnimatePresence>

        {/* Bottom Fade Gradient Overlay to smoothly blend into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-25 max-w-7xl mx-auto px-6 py-16 sm:py-20 w-full flex flex-col items-center text-center">
        <div className="max-w-3xl space-y-8 flex flex-col items-center">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 text-amber-600 dark:text-amber-500 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg transition-colors duration-300"
          >
            <Building2 className="w-4 h-4 text-amber-500" />
            <span>Excellence en Construction de Premier Ordre</span>
          </motion.div>

          {/* Heading */}
          <div className="overflow-hidden w-full">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight drop-shadow-md transition-colors duration-300 text-center"
            >
              Bâtir l'Avenir avec{" "}
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-amber-500 block mt-1 drop-shadow-md"
              >
                Précision & Puissance
              </motion.span>
            </motion.h1>
          </div>

          {/* Subtitle Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="text-slate-900 text-base sm:text-lg leading-relaxed max-w-xl font-semibold text-center drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]"
          >
            DGC DKHIL GROUP CONSTRUCTION réalise des projets d'ingénierie structurelle commerciale d'élite, des développements résidentiels de luxe et des infrastructures industrielles de grande envergure.
          </motion.p>

          {/* Dynamic Adaptive Action Button */}
          <div className="flex justify-center items-center pt-2 w-full">
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              href="#appointment"
              className="inline-block"
            >
              <SpecularButton
                size="md"
                radius={9999}
                lineColor="#f59e0b"
                baseColor={isBgLight ? "#020617" : "#f8fafc"} 
                tint="#f59e0b"
                tintOpacity={0.15}
                textColor={isBgLight ? "#ffffff" : "#020617"}
                intensity={1.2}
                shineSize={15}
                shineFade={35}
                thickness={1.5}
                speed={0.35}
                followMouse={true}
                proximity={300}
                autoAnimate={false}
                className="transition-colors duration-500"
              >
                <span className={`font-semibold inline-flex items-center px-2 transition-colors duration-500 ${
                  isBgLight ? "text-white" : "text-slate-950"
                }`}>
                  Réserver une Consultation
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </SpecularButton>
            </motion.a>
          </div>

          {/* Key Statistics Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 border-t border-slate-300/60 dark:border-slate-700/60 max-w-2xl w-full"
          >
            {stats.map((stat, idx) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center justify-center gap-3 p-3 sm:p-4 rounded-xl bg-white/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 backdrop-blur-md shadow-sm text-center sm:text-left transition-colors duration-300"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none transition-colors duration-300">
                      <CountUp value={stat.value} duration={2.2} delay={0.9} start={startAnimation} />
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mt-1 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Carousel Indicators with Swinging Hammer */}
        {heroImages.length > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={startAnimation ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="absolute bottom-10 right-6 z-30 flex items-center gap-2 bg-white/90 dark:bg-slate-950/80 p-2.5 px-3.5 rounded-full backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-md transition-colors duration-300"
          >
            <motion.div
              key={currentIndex}
              initial={{ rotate: -25 }}
              animate={{ rotate: [ -25, 25, -10, 0 ] }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              style={{ transformOrigin: "bottom left" }}
              className="mr-1 shrink-0 flex items-center justify-center"
            >
              <Hammer className="w-4 h-4 text-amber-500" />
            </motion.div>

            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-amber-500 shadow-sm"
                    : "w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500"
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