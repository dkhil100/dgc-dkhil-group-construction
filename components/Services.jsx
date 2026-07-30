"use client";

import { useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import {
  Building,
  Home,
  Factory,
  Wrench,
  Compass,
  Layers,
} from "lucide-react";

const SERVICES = [
  {
    icon: Building,
    title: "Entreprise Générale de Construction",
    description:
      "Gestion globale de chantier, supervision des sous-traitants, approvisionnement et exécution des gros œuvres.",
  },
  {
    icon: Compass,
    title: "Conception Architecturale & Structurelle",
    description:
      "Modélisation 3D BIM de pointe, calculs de structures et ingénierie parasismique.",
  },
  {
    icon: Factory,
    title: "Infrastructures Industrielles",
    description:
      "Centres logistiques lourds, entrepôts industriels et réalisation de dalles en béton armé à haute résistance.",
  },
  {
    icon: Home,
    title: "Construction Résidentielle de Luxe",
    description:
      "Villas sur mesure haut de gamme, complexes résidentiels de standing et résidences côtières personnalisées.",
  },
  {
    icon: Wrench,
    title: "Rénovation & Restructuration",
    description:
      "Renforcement structural, réaménagement commercial et modernisation de façades architecturales.",
  },
  {
    icon: Layers,
    title: "Gestion de Projet",
    description:
      "Optimisation des délais, estimation des coûts, résilience de la chaîne d'approvisionnement et assurance qualité.",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const dragX = useMotionValue(0);

  // Swipe gesture handling for fluid drag scrolling
  const handleDragEnd = (_, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % SERVICES.length);
    } else if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
    }
  };

  return (
    <section
      id="services"
      className="py-24 bg-slate-900 border-t border-slate-800 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Repeated Scroll Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center max-w-2xl mx-auto space-y-4"
        >
          <h2 className="text-xs font-bold text-amber-500 uppercase tracking-widest">
            Notre Expertise
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white">
            Éventail Complet de Compétences en Construction
          </p>
        </motion.div>

        {/* 3D Circular Drag Carousel Container with Repeated Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          style={{ x: dragX }}
          onDragEnd={handleDragEnd}
          className="relative mt-16 h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing [perspective:1200px]"
        >
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;

            // Compute index relative to current active card
            const count = SERVICES.length;
            let offset = (idx - activeIndex + count) % count;
            if (offset > count / 2) offset -= count;

            const isActive = offset === 0;

            // Geometry variables tuned for smooth carousel arc motion
            const angleStep = 28; // Degree curve spacing
            const rotationY = offset * angleStep;
            const translateZ = isActive ? 120 : -Math.abs(offset) * 85;
            const translateX = offset * 270;
            const translateY = Math.pow(offset, 2) * 10; // Subtle downward arc
            const scale = 1 - Math.abs(offset) * 0.12;
            const opacity = 1 - Math.abs(offset) * 0.3;

            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  x: translateX,
                  y: translateY,
                  z: translateZ,
                  rotateY: -rotationY,
                  scale: scale,
                  opacity: Math.max(0.2, opacity),
                }}
                transition={{
                  type: "spring",
                  stiffness: 170, // Lower stiffness for fluid gliding momentum
                  damping: 22,    // Soft deceleration
                  mass: 0.8,
                }}
                onClick={() => setActiveIndex(idx)}
                style={{ transformStyle: "preserve-3d" }}
                className={`absolute w-[300px] sm:w-[340px] p-8 rounded-2xl border transition-colors cursor-pointer ${
                  isActive
                    ? "bg-slate-950 border-amber-500/80 shadow-2xl shadow-amber-500/10 z-30"
                    : "bg-slate-950/80 border-slate-800/80 hover:border-slate-700 z-10"
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors ${
                    isActive
                      ? "bg-amber-500 text-slate-950"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {service.description}
                </p>

                {isActive && (
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-amber-500">
                    Service sélectionné • DGC
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}