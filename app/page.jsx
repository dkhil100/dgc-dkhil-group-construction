"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesAndProjects from "../components/ServicesAndProjects";
import ScrollTextBanner from "../components/ScrollTextBanner";
import Allprojects from "../components/Allprojects";
import Testimonials from "../components/Testimonials";
import Appointment from "../components/Appointment";
import Footer from "../components/Footer";
import ProjectDetail from "../components/ProjectDetail";
import { PROJECTS } from "../data/projects";
import SplashReveal from "../components/SplashReveal";

export default function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [heroCanAnimate, setHeroCanAnimate] = useState(false);

  const scrollToSectionWhenReady = (targetId) => {
    if (!targetId) return;

    // Normalizing section target if coming from legacy route call
    const actualTarget = targetId === "services" ? "services-projects" : targetId;

    let attempts = 0;
    const maxAttempts = 60;

    const tryScroll = () => {
      const element = document.getElementById(actualTarget);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (attempts < maxAttempts) {
        attempts += 1;
        requestAnimationFrame(tryScroll);
      }
    };

    requestAnimationFrame(tryScroll);
  };

  // Disable automatic scroll restoration & reset scroll to top on reload/mount
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Force viewport to top when refreshing/loading home page
    window.scrollTo(0, 0);

    // Sync state with URL params on initial mount
    const params = new URLSearchParams(window.location.search);
    const urlProjectId = params.get("project");
    const isAllProjects = params.get("view") === "all-projects";

    if (isAllProjects) {
      setShowAllProjects(true);
    } else if (urlProjectId) {
      const found = PROJECTS.find((p) => String(p.id) === String(urlProjectId));
      if (found) {
        setSelectedProjectId(found.id);
      }
    } else if (window.location.hash) {
      // Clean hash if present so mobile doesn't scroll automatically
      window.history.replaceState(null, "", window.location.pathname);
    }

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const id = currentParams.get("project");
      const viewingAll = currentParams.get("view") === "all-projects";

      setShowAllProjects(viewingAll);
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

  // SAFELY EXTRACT ID WHETHER A PRIMITIVE OR AN OBJECT IS PASSED
  const handleSelectProject = (projectOrId) => {
    const id = typeof projectOrId === "object" && projectOrId !== null 
      ? projectOrId.id 
      : projectOrId;

    setSelectedProjectId(id);
    setShowAllProjects(false);
    const newUrl = `${window.location.pathname}?project=${id}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowAllProjects = () => {
    setShowAllProjects(true);
    setSelectedProjectId(null);
    const newUrl = `${window.location.pathname}?view=all-projects`;
    window.history.pushState({ path: newUrl }, "", newUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setSelectedProjectId(null);
    setShowAllProjects(false);
    const newUrl = window.location.pathname;
    window.history.pushState({ path: newUrl }, "", newUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToSection = (targetId) => {
    setSelectedProjectId(null);
    setShowAllProjects(false);
    const newUrl = window.location.pathname;
    window.history.pushState({ path: newUrl }, "", newUrl);

    if (targetId) {
      scrollToSectionWhenReady(targetId);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
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

      {!showAllProjects && (
        <Navbar 
          onNavigateHome={() => handleNavigateToSection("hero")}
          onNavigateSection={handleNavigateToSection}
          onViewAllProjects={handleShowAllProjects} 
        />
      )}

      <AnimatePresence mode="wait">
        {selectedProject ? (
          <motion.div
            key={`detail-${selectedProject.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: showSplash ? 0.2 : 0,
            }}
          >
            <ProjectDetail
              project={selectedProject}
              onBack={handleBackToHome}
              onNavigateSection={handleNavigateToSection}
            />
            <Footer />
          </motion.div>
        ) : showAllProjects ? (
          <motion.div
            key="all-projects-page"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: showSplash ? 0.2 : 0,
            }}
          >
            <Allprojects
              onSelectProject={handleSelectProject}
              onNavigateHome={() => handleNavigateToSection("hero")}
              onNavigateSection={handleNavigateToSection}
              onViewAllProjects={handleShowAllProjects}
            />
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
            
            {/* Merged Services and Projects Component */}
            <ServicesAndProjects 
              onSelectProject={handleSelectProject}
              onViewAll={handleShowAllProjects}
            />

            <Testimonials />
            <ScrollTextBanner text="DGC CONSTRUCTION • DKHIL GROUP BTP • " />
            <Appointment />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}