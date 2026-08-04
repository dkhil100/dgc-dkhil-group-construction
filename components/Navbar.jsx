"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar({ onNavigateHome, onNavigateSection, onViewAllProjects }) {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const cleanUrlHash = () => {
    if (window.history.pushState) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    cleanUrlHash();
    setIsOpen(false);
    if (onNavigateHome) onNavigateHome();
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    cleanUrlHash();
    setIsOpen(false);
    
    if (onNavigateSection) {
      onNavigateSection(targetId);
    }
  };

  const handleProjectsClick = (e) => {
    e.preventDefault();
    cleanUrlHash();
    setIsOpen(false);
    if (onViewAllProjects) {
      onViewAllProjects();
    }
  };

  const navLinks = [
    { label: "Accueil", action: handleLogoClick },
    // Directs smooth scroll straight to the merged section top (Services Phase)
    { label: "Services", action: (e) => handleLinkClick(e, "services-projects") },
    { label: "Projets", action: handleProjectsClick },
    { label: "Avis", action: (e) => handleLinkClick(e, "avis") },
    { label: "Contact", action: (e) => handleLinkClick(e, "appointment") },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-6xl mx-auto flex flex-col gap-2 pointer-events-none">
      <nav className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-full shadow-xl shadow-slate-900/5 dark:shadow-slate-950/40 transition-all duration-300 pointer-events-auto">
        <div className="px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center focus:outline-none group py-1 cursor-pointer bg-transparent border-none"
          >
            <img
              src="/logo.png"
              alt="DGC Dkhil Group Construction Logo"
              className="h-10 md:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300 pointer-events-none"
            />
          </button>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700 dark:text-slate-300">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={link.action}
                className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {link.label}
              </button>
            ))}

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-500 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Toggle Night/Day Mode"
            >
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-500 dark:text-amber-400 focus:outline-none cursor-pointer"
              aria-label="Toggle Night/Day Mode"
            >
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-2xl px-6 py-4 space-y-1 animate-in fade-in slide-in-from-top-4 duration-200 pointer-events-auto">
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={(e) => {
                setIsOpen(false);
                link.action(e);
              }}
              className="w-full text-left text-slate-800 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 py-2.5 text-base font-medium transition-colors border-b border-slate-100 dark:border-slate-800/60 last:border-none cursor-pointer bg-transparent border-x-0 border-t-0"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}