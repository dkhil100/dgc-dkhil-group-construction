import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, projectType, message, websiteUrl } = body;

    // 1. Silent fail for honeypot (bots filling invisible field)
    if (websiteUrl) {
      return NextResponse.json(
        { success: true, message: "Demande envoyée." },
        { status: 200 }
      );
    }

    // 2. Validate input fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    // 3. Configure Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 4. Build email contents
    const mailOptions = {
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[DGC-CONSTRUCTION] Nouvelle Demande: ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; padding: 24px; color: #0f172a; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; rounded-lg: 8px;">
          <h2 style="color: #f59e0b; margin-top: 0;">Nouvelle Demande de Rendez-vous / Projet</h2>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
          <p style="margin: 8px 0;"><strong>Nom :</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 8px 0;"><strong>Téléphone :</strong> ${phone || "Non renseigné"}</p>
          <p style="margin: 8px 0;"><strong>Type de Projet :</strong> ${projectType || "Non spécifié"}</p>
          <p style="margin: 16px 0 8px 0;"><strong>Message :</strong></p>
          <div style="background-color: #f8fafc; padding: 16px; border-left: 4px solid #f59e0b; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    };

    // 5. Send message
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: "Email envoyé avec succès !" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Nodemailer Error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur lors de l'envoi de l'email." },
      { status: 500 }
    );
  }
}