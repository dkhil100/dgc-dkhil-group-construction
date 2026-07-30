import TargetCursor from "../components/TargetCursor";
import "./globals.css";

export const metadata = {
  title: "DGC - Dkhil Group Construction",
  description: "Building the Future with Precision & Excellence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="relative md:cursor-none antialiased bg-slate-950 text-slate-100">
        <TargetCursor />
        {children}
      </body>
    </html>
  );
}