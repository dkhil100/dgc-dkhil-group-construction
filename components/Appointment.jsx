"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, Mail, MapPin } from "lucide-react";
import SpecularButton from "./SpecularButton";

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Résidentiel",
    message: "",
    websiteUrl: "",
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
      className="py-24 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 scroll-mt-24 text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-widest">
                Contactez-nous
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-500 shadow-sm transition-colors duration-300">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                    Ligne Directe
                  </h4>
                  <p className="text-slate-900 dark:text-white font-bold mt-0.5">
                    +216 98 273 737 / 28 639 456
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-500 shadow-sm transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                    Demandes par Émail
                  </h4>
                  <p className="text-slate-900 dark:text-white font-bold mt-0.5">
                    Info.dgccnstruction@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-500 shrink-0 shadow-sm transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                    Siège Social
                  </h4>
                  <p className="text-slate-900 dark:text-white font-bold mt-0.5">
                    Bureau de DGC , Bizerte, Tunisie
                  </p>
                </div>
              </div>

              {/* Map Container directly under Siège Social */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-950 relative mt-4 transition-colors duration-300">
                <iframe
                  title="DGC Bizerte Location"
                  src="https://maps.google.com/maps?q=37.216722,10.118639+(DGC%20Bizerte)&z=17&ie=UTF8&iwloc=B&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="brightness-95 contrast-105 dark:brightness-90 dark:contrast-125 dark:grayscale-[0.2]"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* Form Card Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="lg:col-span-7 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 md:p-10 shadow-xl dark:shadow-2xl transition-colors duration-300"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot field */}
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
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-2">
                    Nom Complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-amber-500 dark:focus:border-amber-500 focus:outline-none text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-amber-500 dark:focus:border-amber-500 focus:outline-none text-sm transition-colors duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-amber-500 dark:focus:border-amber-500 focus:outline-none text-sm transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-2">
                    Type de Projet
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-amber-500 dark:focus:border-amber-500 focus:outline-none text-sm transition-colors duration-200"
                  >
                    <option value="Résidentiel">Résidentiel</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Rénovation">Rénovation</option>
                    <option value="Infrastructures">Infrastructures</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase mb-2">
                  Message / Détails *
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white focus:border-amber-500 dark:focus:border-amber-500 focus:outline-none text-sm transition-colors duration-200"
                />
              </div>

              {status.error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                  {status.error}
                </div>
              )}

              {status.success && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm">
                  Votre message a été envoyé avec succès ! Nous vous contacterons sous peu.
                </div>
              )}

              <SpecularButton
                type="submit"
                disabled={status.loading}
                size="md"
                radius={12}
                lineColor="#f59e0b"
                baseColor="var(--specular-base-color, #0f172a)"
                tint="#f59e0b"
                tintOpacity={0.15}
                textColor="currentColor"
                intensity={1.2}
                shineSize={15}
                shineFade={35}
                thickness={1.5}
                speed={0.35}
                followMouse={true}
                proximity={300}
                autoAnimate={false}
                className="w-full justify-center text-center font-semibold text-sm cursor-pointer disabled:opacity-50 text-black dark:text-white"
              >
                <span className="text-black dark:text-white font-semibold">
                  {status.loading ? "Envoi en cours..." : "Envoyer ma demande"}
                </span>
              </SpecularButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}