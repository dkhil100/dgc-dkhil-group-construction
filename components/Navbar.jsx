"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar({ onNavigateHome }) {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Sync state with DOM on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);

  // Toggle Theme Function
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

  const scrollToElementWithRetry = (targetId) => {
    let attempts = 0;

    const checkAndScroll = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts < 20) {
        // Retry every 50ms while Framer Motion finishes page transition
        attempts++;
        setTimeout(checkAndScroll, 50);
      }
    };

    checkAndScroll();
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavigateHome) onNavigateHome();
    setIsOpen(false);
    scrollToElementWithRetry("hero");
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    if (onNavigateHome) onNavigateHome();
    setIsOpen(false);
    if (targetId) {
      scrollToElementWithRetry(targetId);
    }
  };

  const navLinks = [
    { label: "Accueil", id: "hero", action: handleLogoClick },
    { label: "Services", id: "services" },
    { label: "Projets", id: "projects" },
    { label: "Avis", id: "avis" },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-6xl mx-auto flex flex-col gap-2">
      <nav className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-full shadow-xl shadow-slate-900/5 dark:shadow-slate-950/40 transition-all duration-300">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={handleLogoClick}
            className="flex items-center focus:outline-none group py-1"
          >
            <img
              src="/logo.png"
              alt="DGC Dkhil Group Construction Logo"
              className="h-10 md:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Links + Theme Toggle */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.id}`}
                onClick={link.action || ((e) => handleLinkClick(e, link.id))}
                className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* Dark/Light Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-500 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 focus:outline-none"
              aria-label="Toggle Night/Day Mode"
            >
              {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-500 dark:text-amber-400 focus:outline-none"
              aria-label="Toggle Night/Day Mode"
            >
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-2xl px-6 py-4 space-y-1 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.id}`}
              onClick={link.action || ((e) => handleLinkClick(e, link.id))}
              className="block text-slate-800 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 py-2.5 text-base font-medium transition-colors border-b border-slate-100 dark:border-slate-800/60 last:border-none"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}