"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Building,
  Home,
  Factory,
  Wrench,
  Compass,
  Layers,
  ArrowUpRight,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: "École Primaire Privée Da Vinci School",
    category: "Éducation",
    overview:
      "Construction complète d'un bâtiment d'enseignement privé comprenant un sous-sol technique, un rez-de-chaussée et deux étages (R+2). Réalisation des travaux de gros œuvre, finitions architecturales et aménagements de sécurité adaptés aux normes scolaires.",
    location: "La Marsa, Tunis",
    duration: "Livré avec succès",
    image: "/project1.jpg",
  },
  {
    id: 2,
    title: "École La Joconde (Lac 2)",
    category: "Éducation",
    overview:
      "Réalisation d'un complexe scolaire moderne R+4 avec sous-sol. Ce projet contemporain intègre une imposante façade en mur-rideau vitré favorisant l'éclairage naturel, des espaces d'apprentissage optimisés ainsi qu'une infrastructure technique de pointe.",
    location: "Les Berges du Lac 2, Tunis",
    duration: "Livré avec succès",
    image: "/project2.jpg",
  },
  {
    id: 3,
    title: "École La Joconde (La Soukra)",
    category: "Éducation",
    overview:
      "Construction d'un établissement d'enseignement moderne R+3. Le projet intègre des espaces de cours spacieux, des systèmes d'accès sécurisés et des finitions architecturales durables pour accueillir les élèves dans un cadre stimulant.",
    location: "La Soukra, Tunis",
    duration: "Livré avec succès",
    image: "/project3.jpg",
  },
];

import * as importedData from "../data/projects";
const PROJECTS = importedData?.PROJECTS ?? FALLBACK_PROJECTS;

const Logo3DBackground = dynamic(() => import("./Logo3DBackground"), { ssr: false });

const SERVICES = [
  {
    icon: Building,
    title: "Entreprise Générale de Construction",
    description: "Gestion globale de chantier, supervision des sous-traitants, approvisionnement et exécution des gros œuvres.",
  },
  {
    icon: Compass,
    title: "Conception Architecturale & Structurelle",
    description: "Modélisation 3D BIM de pointe, calculs de structures et ingénierie parasismique.",
  },
  {
    icon: Factory,
    title: "Infrastructures Industrielles",
    description: "Centres logistiques lourds, entrepôts industriels et réalisation de dalles en béton armé à haute résistance.",
  },
  {
    icon: Home,
    title: "Construction Résidentielle de Luxe",
    description: "Villas sur mesure haut de gamme, complexes résidentiels de standing et résidences côtières personnalisées.",
  },
  {
    icon: Wrench,
    title: "Rénovation & Restructuration",
    description: "Renforcement structural, réaménagement commercial et modernisation de façades architecturales.",
  },
  {
    icon: Layers,
    title: "Gestion de Projet",
    description: "Optimisation des délais, estimation des coûts, résilience de la chaîne d'approvisionnement et assurance qualité.",
  },
];

export default function ServicesAndProjects({ onSelectProject }) {
  const mainContainerRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const projectsList = Array.isArray(PROJECTS) ? PROJECTS.slice(0, 3) : [];

  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: mainContainerRef,
    offset: ["start end", "end start"],
  });

  const logoYOffset = useTransform(sectionScrollProgress, [0, 0.2, 0.6, 1], ["-80vh", "0vh", "0vh", "40vh"]);
  const logoOpacity = useTransform(sectionScrollProgress, [0, 0.15, 0.75, 1], [0, 1, 1, 0]);

  // SERVICES SCROLL PROGRESS
  const { scrollYProgress: servicesScrollProgress } = useScroll({
    target: servicesSectionRef,
    offset: ["start 80%", "end end"],
  });

  // Header Animation (Services)
  const headerOpacity = useTransform(servicesScrollProgress, [0.0, 0.15, 0.85, 0.98], [0, 1, 1, 0]);
  const headerY = useTransform(servicesScrollProgress, [0.0, 0.15, 0.85, 0.98], [50, 0, 0, -40]);

  // Content Grid Animation (Services)
  const gridOpacity = useTransform(servicesScrollProgress, [0.08, 0.25, 0.85, 0.98], [0, 1, 1, 0]);
  const gridY = useTransform(servicesScrollProgress, [0.08, 0.25, 0.85, 0.98], [70, 0, 0, -50]);
  const gridScale = useTransform(servicesScrollProgress, [0.08, 0.25, 0.85, 0.98], [0.93, 1, 1, 0.95]);

  // PROJECTS SCROLL PROGRESS
  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsSectionRef,
    offset: ["start start", "end end"],
  });

  // Title Animation
  const titleX = useTransform(projectsScrollProgress, [0, 0.08, 0.88, 0.96], [80, 0, 0, 80]);
  const titleOpacity = useTransform(projectsScrollProgress, [0, 0.08, 0.88, 0.96], [0, 1, 1, 0]);

  // Info Box Exit Animation
  const infoBoxOpacity = useTransform(projectsScrollProgress, [0, 0.88, 0.96], [1, 1, 0]);
  const infoBoxY = useTransform(projectsScrollProgress, [0, 0.88, 0.96], [0, 0, 80]);

  // Services State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const lastInteractionTime = useRef(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const timeSinceInteraction = Date.now() - lastInteractionTime.current;
      if (lastInteractionTime.current === 0 || timeSinceInteraction >= 8000) {
        setActiveIndex((prev) => (prev + 1) % SERVICES.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleCardClick = (idx) => {
    setActiveIndex(idx);
    lastInteractionTime.current = Date.now();
  };

  const activeService = SERVICES[activeIndex];
  const ActiveIcon = activeService.icon;

  return (
    <section ref={mainContainerRef} id="services-projects" className="relative bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 isolate transition-colors duration-300">
      {/* TOP FADE (z-20) */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-50 via-slate-50/80 dark:from-slate-950 dark:via-slate-950/80 to-transparent pointer-events-none z-20 transition-colors duration-300" />

      {/* 3D LOGO CONTAINER */}
      <div className="sticky top-0 h-screen w-full pointer-events-none z-0 overflow-hidden -mb-[100vh]">
        <motion.div style={{ y: logoYOffset, opacity: logoOpacity }} className="w-full h-full flex items-center justify-center">
          <Logo3DBackground imagePath="/logo.png" scrollProgress={sectionScrollProgress} />
        </motion.div>
      </div>

      {/* SECTION 1: SERVICES */}
      <div ref={servicesSectionRef} className="relative z-30 h-[300vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center py-12 px-6 sm:px-12 max-w-7xl mx-auto overflow-hidden">
          
          {/* STAGGER STEP 1: HEADER */}
          <motion.div
            style={{
              opacity: headerOpacity,
              y: headerY,
            }}
            className="text-center max-w-2xl mx-auto space-y-3 pt-12 sm:pt-16 mb-8 sm:mb-12 relative z-30"
          >
            <span className="inline-block text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              Notre Expertise
            </span>

            <p className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-300">
              Éventail Complet de Compétences en Construction
            </p>
          </motion.div>

          {/* STAGGER STEP 2: SERVICES CARDS GRID */}
          <motion.div
            style={{
              opacity: gridOpacity,
              y: gridY,
              scale: gridScale,
            }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            <div
              className="lg:col-span-6 relative flex items-center justify-start h-[450px] -ml-12 sm:-ml-24 lg:-ml-32"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative w-full h-full flex items-center">
                {SERVICES.map((service, idx) => {
                  const Icon = service.icon;
                  const count = SERVICES.length;

                  let offset = (idx - activeIndex + count) % count;
                  if (offset > count / 2) offset -= count;

                  if (Math.abs(offset) > 2) return null;

                  const isActive = offset === 0;
                  const angle = offset * 38;
                  const radius = 220;
                  const x = radius * Math.cos((angle * Math.PI) / 180);
                  const y = radius * Math.sin((angle * Math.PI) / 180);

                  return (
                    <motion.div
                      key={idx}
                      animate={{
                        x: x + 40,
                        y: y,
                        scale: isActive ? 1.08 : 0.86 - Math.abs(offset) * 0.08,
                        opacity: 1 - Math.abs(offset) * 0.28,
                      }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      onClick={() => handleCardClick(idx)}
                      className={`absolute left-0 sm:left-4 cursor-pointer flex items-center gap-4 px-5 py-4 rounded-2xl border backdrop-blur-md transition-colors duration-300 z-20 ${
                        isActive
                          ? "bg-white/95 dark:bg-slate-900/95 border-amber-500 shadow-2xl shadow-amber-500/20 ring-2 ring-amber-500/25"
                          : "bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                          isActive
                            ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30"
                            : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-base font-bold whitespace-nowrap max-w-[220px] sm:max-w-[260px] truncate transition-colors duration-300 ${
                          isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {service.title}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 30, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-md transition-colors duration-300"
                >
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
                    <ActiveIcon className="w-4 h-4" />
                    <span>
                      Service 0{activeIndex + 1} / 0{SERVICES.length}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight transition-colors duration-300">
                    {activeService.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-8 transition-colors duration-300">{activeService.description}</p>

                  <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-300">
                    <span className="text-amber-600 dark:text-amber-500 font-bold">Excellence DGC Construction</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: PROJECTS */}
      <div ref={projectsSectionRef} className="relative z-10 h-[500vh]">
        {/* BOTTOM FADE OVERLAY: z-20 */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-slate-50 via-slate-50/90 dark:from-slate-950 dark:via-slate-950/90 to-transparent pointer-events-none z-20 transition-colors duration-300" />

        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 px-4 sm:px-8 overflow-hidden">
          {/* Automatic animated SVG Path when entering section */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0 stroke-amber-500/25 dark:stroke-amber-400/25"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M 0 160 C 300 -40, 700 760, 1000 260"
              strokeWidth="3.5"
              strokeDasharray="8 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </svg>

          {/* Header Row */}
          <div className="relative z-50 w-full flex items-start justify-end shrink-0 pointer-events-none">
            <motion.div
              style={{ x: titleX, opacity: titleOpacity }}
              className="pointer-events-auto absolute top-36 right-12 md:right-24 sm:top-40 text-right z-50"
            >
              <span className="inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-500 font-bold text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-500" />
                Nos Réalisations
              </span>
              <h2 className="text-xl sm:text-3xl font-extrabold mt-1 text-slate-900 dark:text-white tracking-tight transition-colors duration-300">
                Projets Récents
              </h2>
            </motion.div>
          </div>

          {/* Sliding Cards Layer */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            {projectsList.map((project, index) => (
              <CurvedSlidingCard
                key={project.id}
                project={project}
                index={index}
                total={projectsList.length}
                progress={projectsScrollProgress}
                onSelectProject={onSelectProject}
              />
            ))}
          </div>

          {/* INFO BOX WRAPPER */}
          <motion.div
            style={{
              opacity: infoBoxOpacity,
              y: infoBoxY,
            }}
            className="relative z-50 w-full max-w-lg mb-4 self-start pointer-events-auto"
          >
            <ProjectInfoBox
              projects={projectsList}
              progress={projectsScrollProgress}
              onSelectProject={onSelectProject}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CurvedSlidingCard({ project, index, total, progress, onSelectProject }) {
  const segmentLength = 0.32;
  const gap = 0.01;
  const startRange = index * (segmentLength + gap);
  const endRange = Math.min(startRange + segmentLength, 1.0);

  const xPercent = useTransform(progress, [startRange, endRange], [-20, 115]);

  const yOffset = useTransform(
    progress,
    [startRange, startRange + segmentLength * 0.25, startRange + segmentLength * 0.5, startRange + segmentLength * 0.75, endRange],
    [-120, -180, 0, 140, -40]
  );

  const opacity = useTransform(progress, [startRange, startRange + 0.03, endRange - 0.03, endRange], [0, 1, 1, 0]);

  return (
    <motion.div
      style={{
        left: useTransform(xPercent, (v) => `${v}%`),
        y: yOffset,
        opacity,
      }}
      onClick={() => onSelectProject?.(project.id)}
      className="absolute top-[38%] -translate-y-1/2 -translate-x-1/2 w-[450px] sm:w-[625px] h-[312px] sm:h-[400px] pointer-events-auto cursor-pointer"
    >
      <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-amber-500 shadow-2xl bg-white dark:bg-slate-900 relative group transition-colors duration-300">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title || "Project preview"}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-950 bg-amber-500 px-3 py-1 rounded-full">
            0{index + 1} / 0{total}
          </span>
          <span className="text-xs font-semibold text-white bg-slate-950/60 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/15">
            {project.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectInfoBox({ projects, progress, onSelectProject }) {
  const activeIndex = useTransform(progress, [0.0, 0.32, 0.33, 0.65, 0.66, 1.0], [0, 0, 1, 1, 2, 2]);

  return (
    <div className="relative min-h-[190px] w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden z-50 transition-colors duration-300">
      {projects.map((project, idx) => (
        <SingleInfoItem
          key={project.id}
          project={project}
          index={idx}
          activeIndex={activeIndex}
          onSelectProject={onSelectProject}
        />
      ))}
    </div>
  );
}

function SingleInfoItem({ project, index, activeIndex, onSelectProject }) {
  const opacity = useTransform(activeIndex, (latest) => (Math.round(latest) === index ? 1 : 0));
  const y = useTransform(activeIndex, (latest) => (Math.round(latest) === index ? 0 : 15));
  const pointerEvents = useTransform(activeIndex, (latest) => (Math.round(latest) === index ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-50"
    >
      <div>
        <div className="flex items-center justify-between gap-4 mb-2">
          <h3
            onClick={() => onSelectProject?.(project.id)}
            className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-500 transition-colors cursor-pointer flex items-center gap-2"
          >
            {project.title}
            <ArrowUpRight className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-3 transition-colors duration-300">
          {project.overview}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 transition-colors duration-300">
            <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0" />
            {project.location}
          </span>
          <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 transition-colors duration-300">
            <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500 shrink-0" />
            {project.duration}
          </span>
        </div>

        <button
          onClick={() => onSelectProject?.(project.id)}
          className="text-amber-600 dark:text-amber-400 hover:text-amber-500 dark:hover:text-amber-300 font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
        >
          Découvrir →
        </button>
      </div>
    </motion.div>
  );
}