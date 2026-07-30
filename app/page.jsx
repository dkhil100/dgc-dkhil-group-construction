"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import ScrollTextBanner from "../components/ScrollTextBanner";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Appointment from "../components/Appointment";
import Footer from "../components/Footer";
import ProjectDetail from "../components/ProjectDetail";
import { PROJECTS } from "../data/projects";
import SplashReveal from "../components/SplashReveal";

export default function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [heroCanAnimate, setHeroCanAnimate] = useState(false);

  // Sync state with URL params on initial mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlProjectId = params.get("project");

    if (urlProjectId) {
      const found = PROJECTS.find((p) => String(p.id) === String(urlProjectId));
      if (found) {
        setSelectedProjectId(found.id);
      }
    }

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const id = currentParams.get("project");
      if (id) {
        const found = PROJECTS.find((p) => String(p.id) === String(id));
        setSelectedProjectId(found ? found.id : null);
      } else {
        setSelectedProjectId(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const selectedProject = PROJECTS.find(
    (p) => String(p.id) === String(selectedProjectId)
  );

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    const newUrl = `${window.location.pathname}?project=${id}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setSelectedProjectId(null);
    const newUrl = window.location.pathname;
    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  return (
    <main
      className={`min-h-screen font-sans selection:bg-amber-500 selection:text-slate-950 transition-colors duration-500 ${
        showSplash
          ? "bg-slate-100 text-slate-900"
          : "bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
      }`}
    >
      {/* Splash Reveal always runs full animation on reload */}
      <AnimatePresence>
        {showSplash && (
          <SplashReveal
            onStartCircle={() => setHeroCanAnimate(true)}
            onFinishCircle={() => setShowSplash(false)}
          />
        )}
      </AnimatePresence>

      <Navbar onNavigateHome={handleBackToHome} isDetailPage={!!selectedProjectId} />

      <AnimatePresence mode="wait">
        {selectedProject ? (
          <motion.div
            key={`detail-${selectedProject.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: showSplash ? 0.2 : 0 }}
          >
            <ProjectDetail project={selectedProject} onBack={handleBackToHome} />
          </motion.div>
        ) : (
          <motion.div
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Hero startAnimation={heroCanAnimate} />
            <Services />
            <ScrollTextBanner text="DGC CONSTRUCTION • DKHIL GROUP BTP • " />
            <Projects onSelectProject={handleSelectProject} />
            <Testimonials />
            <ScrollTextBanner text="DGC CONSTRUCTION • DKHIL GROUP BTP • " />
            <Appointment />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}