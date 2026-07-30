import TargetCursor from "../components/TargetCursor";
import "./globals.css";

export const metadata = {
  title: "DGC - Dkhil Group Construction",
  description: "Building the Future with Precision & Excellence",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth bg-slate-100">
      <body className="relative md:cursor-none antialiased bg-slate-100 text-slate-900">
        <TargetCursor />
        {children}
      </body>
    </html>
  );
}