"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SplashReveal({ onStartCircle, onFinishCircle }) {
  const [startReveal, setStartReveal] = useState(false);

  useEffect(() => {
    // 1. Hold splash text for 1.2s
    const timer = setTimeout(() => {
      setStartReveal(true);

      // 2. Trigger Hero content animations 300ms into the circle expansion
      setTimeout(() => {
        if (onStartCircle) onStartCircle();
      }, 300);
    }, 1200);

    return () => clearTimeout(timer);
  }, [onStartCircle]);

  return (
    <motion.div
      initial={{
        WebkitMaskImage: "radial-gradient(circle at center, transparent 0%, black 0%)",
        maskImage: "radial-gradient(circle at center, transparent 0%, black 0%)",
      }}
      animate={{
        WebkitMaskImage: startReveal
          ? "radial-gradient(circle at center, transparent 150%, black 170%)"
          : "radial-gradient(circle at center, transparent 0%, black 0%)",
        maskImage: startReveal
          ? "radial-gradient(circle at center, transparent 150%, black 170%)"
          : "radial-gradient(circle at center, transparent 0%, black 0%)",
      }}
      transition={{
        duration: 1.4,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (startReveal && onFinishCircle) {
          onFinishCircle();
        }
      }}
      className="fixed inset-0 z-[99999] pointer-events-auto cursor-default overflow-hidden bg-slate-100 flex flex-col items-center justify-center"
    >
      {/* Splash Text Content */}
      <motion.div
        animate={{ opacity: startReveal ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center text-slate-900 px-4"
      >
        {/* Title Text */}
        <div className="overflow-hidden py-2">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-3xl md:text-5xl font-black tracking-wider text-slate-900 uppercase text-center"
          >
            DKHIL GROUP <span className="text-amber-500">CONSTRUCTION</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <div className="overflow-hidden mt-2">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-widest text-center"
          >
            Bâtir l'avenir avec précision & puissance
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}