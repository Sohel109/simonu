import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import multer from 'multer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Multer — store files in memory (buffer), max 20MB total
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB per file
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD || 'yhnkuvhjvvlstqtj'
  }
});

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// For non-file routes we still need JSON parsing
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'SimONU Backend is running' });
});

// Use multer to handle the multipart/form-data upload
app.post('/api/send-email', upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'lm', maxCount: 1 }
]), async (req, res) => {
  const { prenom, nom, email, objet, message } = req.body;

  if (!prenom || !nom || !email || !objet || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  // Detect request type for personalized reply
  let typeRequete = 'générale';
  if (objet.startsWith('[Recrutement]')) typeRequete = 'recrutement';
  if (objet.startsWith('[Partenariat]')) typeRequete = 'partenariat';

  let customHtml = '';
  if (typeRequete === 'recrutement') {
    customHtml = `<p>Nous avons bien reçu votre <strong>dossier de candidature</strong>.</p><p>Notre Pôle Ressources Humaines l'étudiera avec la plus grande attention et reviendra vers vous très prochainement pour la suite du processus.</p>`;
  } else if (typeRequete === 'partenariat') {
    customHtml = `<p>Nous avons bien reçu votre proposition de <strong>partenariat</strong>.</p><p>Notre Bureau prendra contact avec vous dans les plus brefs délais pour échanger sur les synergies possibles entre nos entités.</p>`;
  } else {
    customHtml = `<p>Nous avons bien reçu votre requête concernant "<strong>${objet}</strong>".</p><p>Notre équipe l'étudiera avec soin et reviendra vers vous dans les plus brefs délais.</p>`;
  }

  // Build attachments from real file buffers (multer)
  const attachments = [];
  const files = req.files || {};
  if (files.cv && files.cv[0]) {
    attachments.push({
      filename: files.cv[0].originalname,
      content: files.cv[0].buffer,
      contentType: files.cv[0].mimetype
    });
  }
  if (files.lm && files.lm[0]) {
    attachments.push({
      filename: files.lm[0].originalname,
      content: files.lm[0].buffer,
      contentType: files.lm[0].mimetype
    });
  }

  // Email to SimONU (notification)
  const notifHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #094067; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-top: 4px solid #094067;">
      <h2 style="color: #D4AF37; letter-spacing: 2px; text-transform: uppercase;">Nouveau message — SimONU Marseille</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr><td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #666; width: 30%;">Type</td><td style="padding: 10px; border-bottom: 1px solid #f0f0f0; font-weight: 600;">${typeRequete.charAt(0).toUpperCase() + typeRequete.slice(1)}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #666;">Expéditeur</td><td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${prenom} ${nom}</td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #666;">Email</td><td style="padding: 10px; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding: 10px; border-bottom: 1px solid #f0f0f0; color: #666;">Objet</td><td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${objet}</td></tr>
      </table>
      <div style="margin-top: 30px; padding: 20px; background: #f9fbfd; border-left: 3px solid #D4AF37;">
        <p style="margin: 0; line-height: 1.8; color: #333;">${message.replace(/\n/g, '<br>')}</p>
      </div>
      ${attachments.length > 0 ? `<p style="margin-top: 20px; color: #666; font-size: 0.9em;">📎 ${attachments.length} pièce(s) jointe(s) incluse(s)</p>` : ''}
    </div>
  `;

  // Auto-reply to sender
  const replyHtml = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #094067; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eaeaea; border-top: 4px solid #094067; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h2 style="color: #D4AF37; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 5px; font-weight: 600;">SimONU Marseille</h2>
        <p style="font-size: 0.85em; color: #666; text-transform: uppercase; letter-spacing: 2px; margin-top: 0;">Bureau des Relations</p>
      </div>
      <h3 style="color: #094067; font-weight: 500; border-bottom: 1px solid #f0f0f0; padding-bottom: 10px;">Accusé de réception formel</h3>
      <p style="line-height: 1.6;">Bonjour ${prenom},</p>
      <div style="line-height: 1.6; color: #333;">${customHtml}</div>
      <br>
      <p style="font-size: 0.85em; color: #888; font-style: italic; background: #f9f9f9; padding: 10px; border-left: 3px solid #D4AF37;">
        Ceci est un message généré automatiquement par nos services, merci de ne pas y répondre directement.
      </p>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="font-weight: 600; margin-bottom: 5px; color: #094067;">L'Équipe SimONU Marseille</p>
        <p style="font-size: 0.85em; color: #666; margin: 0;">KEDGE Business School</p>
      </div>
    </div>
  `;

  try {
    // Send notification to SimONU with attachments
    await transporter.sendMail({
      from: `"SimONU Marseille" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `[${typeRequete.toUpperCase()}] Message de ${prenom} ${nom}`,
      html: notifHtml,
      replyTo: email,
      attachments
    });
    console.log('✅ Notification envoyée à SimONU');

    // Send auto-reply to sender (no attachments)
    await transporter.sendMail({
      from: `"SimONU Marseille" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Accusé de réception — SimONU Marseille',
      html: replyHtml
    });
    console.log('✅ Accusé de réception envoyé à', email);

    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('❌ Erreur Nodemailer:', error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur SimONU démarré sur le port ${PORT}`);
  console.log(`📧 Destination emails: ${process.env.EMAIL_USER}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
});
