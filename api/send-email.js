import nodemailer from 'nodemailer';
import multer from 'multer';

// Disable default body parser so multer can parse multipart form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to run middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit per file
});

const uploadMiddleware = upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'lm', maxCount: 1 },
]);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // Run multer parsing middleware
    await runMiddleware(req, res, uploadMiddleware);

    const { prenom, nom, email, objet, message } = req.body;

    if (!prenom || !nom || !email || !objet || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const emailUser = process.env.EMAIL_USER || 'simonu.marseille13@gmail.com';
    const emailPass = process.env.GMAIL_APP_PASSWORD || 'yhnkuvhjvvlstqtj';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

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

    const attachments = [];
    const files = req.files || {};
    if (files.cv && files.cv[0]) {
      attachments.push({
        filename: files.cv[0].originalname,
        content: files.cv[0].buffer,
        contentType: files.cv[0].mimetype,
      });
    }
    if (files.lm && files.lm[0]) {
      attachments.push({
        filename: files.lm[0].originalname,
        content: files.lm[0].buffer,
        contentType: files.lm[0].mimetype,
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

    // Send notification to SimONU with attachments
    await transporter.sendMail({
      from: `"SimONU Marseille" <${emailUser}>`,
      to: emailUser,
      subject: `[${typeRequete.toUpperCase()}] Message de ${prenom} ${nom}`,
      html: notifHtml,
      replyTo: email,
      attachments,
    });

    // Send auto-reply to sender (no attachments)
    await transporter.sendMail({
      from: `"SimONU Marseille" <${emailUser}>`,
      to: email,
      subject: 'Accusé de réception — SimONU Marseille',
      html: replyHtml,
    });

    res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
  }
}
