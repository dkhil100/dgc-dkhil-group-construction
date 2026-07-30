"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ onNavigateHome }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    }
    const heroElement = document.getElementById("hero");
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleLinkClick = (e, targetId) => {
    if (onNavigateHome) {
      onNavigateHome();
    }
    setIsOpen(false);

    if (targetId) {
      // Small timeout to allow home view to mount if navigating from detail view
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8 max-w-6xl mx-auto flex flex-col gap-2">
      {/* Top Header */}
      <nav className="w-full bg-slate-900/85 backdrop-blur-md border border-slate-700/50 rounded-full shadow-2xl shadow-slate-950/50 transition-all duration-300">
        <div className="px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={handleLogoClick}
            className="flex items-center focus:outline-none group py-1 cursor-pointer"
          >
            <img
              src="/logo.png"
              alt="DGC Dkhil Group Construction Logo"
              className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a
              href="#hero"
              onClick={handleLogoClick}
              className="hover:text-amber-400 transition-colors"
            >
              Accueil
            </a>
            <a
              href="#services"
              onClick={(e) => handleLinkClick(e, "services")}
              className="hover:text-amber-400 transition-colors"
            >
              Services
            </a>
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, "projects")}
              className="hover:text-amber-400 transition-colors"
            >
              Projets
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-2xl px-6 py-4 space-y-2 transition-all">
          <a
            href="#hero"
            onClick={handleLogoClick}
            className="block text-slate-200 hover:text-amber-400 py-2 text-base font-medium transition-colors"
          >
            Accueil
          </a>
          <a
            href="#services"
            onClick={(e) => handleLinkClick(e, "services")}
            className="block text-slate-200 hover:text-amber-400 py-2 text-base font-medium transition-colors"
          >
            Services
          </a>
          <a
            href="#projects"
            onClick={(e) => handleLinkClick(e, "projects")}
            className="block text-slate-200 hover:text-amber-400 py-2 text-base font-medium transition-colors"
          >
            Projets
          </a>
        </div>
      )}
    </div>
  );
}