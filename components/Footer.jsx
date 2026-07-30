import { HardHat } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500 text-slate-950 rounded-lg">
            <HardHat className="w-5 h-5" />
          </div>
          <span className="font-bold text-white text-sm tracking-wide">
            DGC DKHIL GROUP CONSTRUCTION
          </span>
        </div>

        <p className="text-xs text-slate-500 text-center md:text-right">
          © {new Date().getFullYear()} DGC DKHIL GROUP. All rights reserved. Built with precision.
        </p>
      </div>
    </footer>
  );
}
