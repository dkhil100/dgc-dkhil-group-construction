import { HardHat } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-slate-950 rounded-lg shadow-sm">
            <HardHat className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white text-sm tracking-wide transition-colors duration-300">
            DGC CONSTRUCTION
          </span>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-500 text-center md:text-right transition-colors duration-300">
          © {new Date().getFullYear()} DGC DKHIL GROUP. All rights reserved. Built with precision.
        </p>
      </div>
    </footer>
  );
}