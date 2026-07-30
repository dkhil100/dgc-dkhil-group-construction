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

  // Motion value for horizontal percentage movement
  const baseX = useMotionValue(0);

  // Track page scroll relative to this component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Scale scroll velocity into translation speed
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Wrap translation value so it loops smoothly between 0% and -50%
  const x = useTransform(baseX, (v) => `${((v % 50) + 50) % 50 - 50}%`);

  useAnimationFrame((t, delta) => {
    // Base speed moving left
    let moveBy = -0.015 * (delta / 1000) * 100;

    // React to scroll direction and speed
    const factor = velocityFactor.get();
    if (factor !== 0) {
      moveBy += moveBy * factor;
    }

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      ref={containerRef}
      className="py-2 md:py-4 bg-slate-950 overflow-hidden select-none"
    >
      <div className="flex whitespace-nowrap">
        <motion.div
          style={{ x }}
          className="flex whitespace-nowrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter"
        >
          {/* Repeated to fill the view continuously */}
          <span className="text-transparent border-text opacity-25 hover:opacity-50 transition-opacity duration-300 pr-4">
            {text} {text}
          </span>
          <span className="text-transparent border-text opacity-25 hover:opacity-50 transition-opacity duration-300 pr-4">
            {text} {text}
          </span>
        </motion.div>
      </div>

      <style jsx>{`
        .border-text {
          -webkit-text-stroke: 1.5px rgba(245, 158, 11, 0.6);
        }
        @media (min-width: 768px) {
          .border-text {
            -webkit-text-stroke: 2px rgba(245, 158, 11, 0.7);
          }
        }
      `}</style>
    </div>
  );
}