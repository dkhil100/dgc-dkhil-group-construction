"use client";

import { motion } from "framer-motion";

const row1 = [
  {
    name: "Mounir Ben Ammar",
    role: "Villa Moderne - Jardins de Carthage",
    avatar: "M",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    text: "Une finition exceptionnelle pour notre villa aux Jardins de Carthage. La gestion du gros œuvre et l'attention portée aux détails architecturaux ont dépassé nos attentes.",
  },
  {
    name: "Direction Groupe La Joconde",
    role: "Complexe Éducatif - Lac 2",
    avatar: "J",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    text: "L'aménagement structurel de notre campus au Lac 2 exigeait un respect strict des normes de sécurité et du calendrier. DGC a livré un chantier irréprochable dans les temps.",
  },
  {
    name: "Sami Ben Rejeb",
    role: "Villa Résidentielle - Ras Jebel",
    avatar: "S",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    text: "Construire en bord de mer à Ras Jebel présentait des défis techniques réels. L'équipe DGC a géré le béton armé et la maçonnerie avec un grand professionalisme.",
  },
  {
    name: "Mme. Chiraz Karray",
    role: "École Primaire Privée Da Vinci - La Marsa",
    avatar: "C",
    color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    text: "Un travail remarquable sur l'extension et la rénovation des espaces scolaires Da Vinci à La Marsa. Un chantier toujours propre et sécurisé pour les enfants.",
  },
];

const row2 = [
  {
    name: "Administration La Joconde",
    role: "Établissement Scolaire - La Soukra",
    avatar: "L",
    color: "bg-rose-500/20 text-rose-400 border-rose-500/30",
    text: "Notre second projet d'école à La Soukra en collaboration avec DGC. Confiance totale dans leur savoir-faire en structures R+4 et espaces éducatifs.",
  },
  {
    name: "Karim Chaabane",
    role: "Résidence Privée - Jardins de Carthage",
    avatar: "K",
    color: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    text: "Superbe coordination entre les ingénieurs et les ouvriers sur notre chantier aux Jardins de Carthage. Transparence complète sur le devis du début à la fin.",
  },
  {
    name: "Ing. Hassen Dakhli",
    role: "Supervision BTP - Projet Lac 2",
    avatar: "H",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    text: "En tant qu'ingénieur conseil, c'est un vrai plaisir de collaborer avec Dkhil Group Construction. Rigueur dans le coffrage et coulage du béton.",
  },
  {
    name: "Nadia Triki",
    role: "Projet Villa - Ras Jebel",
    avatar: "N",
    color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    text: "Merci à l'équipe de DGC pour la réalisation de notre résidence de vacances à Ras Jebel. De la fondation aux finitions, tout a été exécuté dans les règles de l'art.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden relative">
      {/* Title section with Repeated Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12 px-6"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Ce que nos clients disent de nous
        </h2>
        <p className="text-slate-400 text-base md:text-lg mt-3 max-w-2xl mx-auto">
          Découvrez les retours de nos maîtres d'ouvrage et partenaires sur nos réalisations phares en Tunisie.
        </p>
      </motion.div>

      {/* Infinite Scrolling Container with Repeated Scroll Fade-In */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        {/* Row 1: Moves Left */}
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] py-3">
          {[...row1, ...row1].map((t, index) => (
            <div
              key={index}
              className="w-[320px] md:w-[380px] p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col justify-between shrink-0 shadow-lg"
            >
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                <div
                  className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold text-xs ${t.color}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">{t.name}</h4>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Moves Right */}
        <div className="flex gap-6 w-max animate-marquee-reverse hover:[animation-play-state:paused] py-3">
          {[...row2, ...row2].map((t, index) => (
            <div
              key={index}
              className="w-[320px] md:w-[380px] p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col justify-between shrink-0 shadow-lg"
            >
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                <div
                  className={`w-9 h-9 rounded-full border flex items-center justify-center font-bold text-xs ${t.color}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">{t.name}</h4>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}