"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, Mail, MapPin } from "lucide-react";

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Résidentiel",
    message: "",
    websiteUrl: "", // Invisible honeypot
  });

  const [status, setStatus] = useState({ loading: false, success: null, error: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: "" });

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 429) {
        // Rate limited
        setStatus({ loading: false, success: false, error: data.error });
        return;
      }

      if (!response.ok) {
        setStatus({
          loading: false,
          success: false,
          error: data.error || "Une erreur s'est produite.",
        });
        return;
      }

      setStatus({ loading: false, success: true, error: "" });
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "Résidentiel",
        message: "",
        websiteUrl: "",
      });
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        success: false,
        error: "Erreur de connexion au serveur.",
      });
    }
  };

  return (
    <section
      id="appointment"
      className="py-24 bg-slate-900 border-t border-slate-800 scroll-mt-24 text-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                Contactez-nous
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2">
                Prendre Rendez-vous / Demande de Devis
              </h2>
              <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                Planifiez une réunion avec nos ingénieurs en chef pour évaluer
                l'étendue de votre projet, obtenir des estimations
                architecturales et établir un calendrier de construction.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-500">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 uppercase font-semibold">
                    Ligne Directe
                  </h4>
                  <p className="text-white font-bold mt-0.5">
                    +216 98 273 737 / 28 639 456
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-500">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 uppercase font-semibold">
                    Demandes par Émail
                  </h4>
                  <p className="text-white font-bold mt-0.5">
                    Info.dgccnstruction@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-500">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-400 uppercase font-semibold">
                    Siège Social
                  </h4>
                  <p className="text-white font-bold mt-0.5">
                    Bureau de DGC , Bizerte, Tunisie
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Card Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-8 md:p-10 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field - Hidden from human users */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="websiteUrl"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.websiteUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-amber-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-amber-500 focus:outline-none text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-amber-500 focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Type de Projet
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-amber-500 focus:outline-none text-sm"
                  >
                    <option value="Résidentiel">Résidentiel</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Rénovation">Rénovation</option>
                    <option value="Infrastructures">Infrastructures</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                  Message / Détails *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-white focus:border-amber-500 focus:outline-none text-sm"
                />
              </div>

              {status.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm">
                  {status.error}
                </div>
              )}

              {status.success && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-sm">
                  Votre message a été envoyé avec succès ! Nous vous contacterons sous peu.
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-colors uppercase tracking-wider disabled:opacity-50 cursor-pointer text-sm"
              >
                {status.loading ? "Envoi en cours..." : "Envoyer ma demande"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}