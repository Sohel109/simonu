import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('Test d\'envoi d\'email en cours...');
console.log(`Utilisateur: ${process.env.EMAIL_USER}`);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Test Configuration Email SimONU',
    text: 'Ceci est un test pour vérifier que la configuration Node.js fonctionne correctement.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Erreur:', error);
    } else {
        console.log('Email envoyé avec succès: ' + info.response);
    }
});
