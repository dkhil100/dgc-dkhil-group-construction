"use client";

import { useState } from "react";

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
        setStatus({ loading: false, success: false, error: data.error || "Une erreur s'est produite." });
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
      setStatus({ loading: false, success: false, error: "Erreur de connexion au serveur." });
    }
  };

  return (
    <section id="appointment" className="py-20 bg-slate-900 text-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-white">Prendre Rendez-vous / Demande de Devis</h2>

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
              <label className="block text-sm font-semibold mb-2">Nom Complet *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Type de Projet</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none"
              >
                <option value="Résidentiel">Résidentiel</option>
                <option value="Commercial">Commercial</option>
                <option value="Rénovation">Rénovation</option>
                <option value="Infrastructures">Infrastructures</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Message / Détails *</label>
            <textarea
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 focus:border-amber-500 focus:outline-none"
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
            className="w-full py-4 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-colors uppercase tracking-wider disabled:opacity-50 cursor-pointer"
          >
            {status.loading ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>
        </form>
      </div>
    </section>
  );
}