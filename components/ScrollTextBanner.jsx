"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

export default function ScrollTextBanner({
  text = "DGC CONSTRUCTION • DKHIL GROUP • ",
}) {
  const containerRef = useRef(null);
  const baseX = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${((v % 50) + 50) % 50 - 50}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = -0.015 * (delta / 1000) * 100;
    const factor = velocityFactor.get();
    if (factor !== 0) {
      moveBy += moveBy * factor;
    }
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className="py-4 bg-slate-100 dark:bg-slate-950 overflow-hidden select-none border-y border-slate-200 dark:border-slate-900 transition-colors duration-300"
    >
      <div className="flex whitespace-nowrap">
        <motion.div
          style={{ x }}
          className="flex whitespace-nowrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter"
        >
          <span className="text-transparent opacity-40 hover:opacity-80 dark:opacity-30 dark:hover:opacity-60 transition-opacity duration-300 pr-4 [-webkit-text-stroke:1.5px_rgba(217,119,6,0.7)] dark:[-webkit-text-stroke:1.5px_rgba(245,158,11,0.6)] md:[-webkit-text-stroke:2px_rgba(217,119,6,0.8)] md:dark:[-webkit-text-stroke:2px_rgba(245,158,11,0.7)]">
            {text} {text}
          </span>
          <span className="text-transparent opacity-40 hover:opacity-80 dark:opacity-30 dark:hover:opacity-60 transition-opacity duration-300 pr-4 [-webkit-text-stroke:1.5px_rgba(217,119,6,0.7)] dark:[-webkit-text-stroke:1.5px_rgba(245,158,11,0.6)] md:[-webkit-text-stroke:2px_rgba(217,119,6,0.8)] md:dark:[-webkit-text-stroke:2px_rgba(245,158,11,0.7)]">
            {text} {text}
          </span>
        </motion.div>
      </div>
    </div>
  );
}