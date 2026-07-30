"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hammer } from "lucide-react";

export default function TargetCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.closest(".cursor-pointer") ||
        e.target.closest("button") ||
        e.target.closest("a")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Hammer Icon Follower */}
      <motion.div
        className="absolute text-amber-500 drop-shadow-[0_2px_8px_rgba(245,158,11,0.4)]"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          rotate: isHovered ? -45 : 0,
          scale: isHovered ? 1.25 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.1,
        }}
      >
        <Hammer className="w-7 h-7" />
      </motion.div>
    </div>
  );
}