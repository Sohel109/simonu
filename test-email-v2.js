import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { resolve4 } from 'node:dns/promises';

dotenv.config();

console.log('📧 Starting email test v2 (Modified for 465 debug)...');

(async () => {
    try {
        // Hardcoding the known working IP from openssl test for consistency
        const ip = '172.217.218.109';
        console.log(`✅ Using Hardcoded IP: ${ip}`);

        const transporter = nodemailer.createTransport({
            host: ip,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                servername: 'smtp.gmail.com', // Critical for SSL/TLS SNI
                // rejectUnauthorized: true // Default is true, let's stick to default
                minVersion: 'TLSv1.2'
            },
            logger: true,
            debug: true
        });

        console.log('🔄 Verifying configuration...');
        await transporter.verify();
        console.log('✅ Configuration valid!');

        // Try sending
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Test V2 Fix',
            text: 'If this arrives, port 465 is fixed.'
        });
        console.log('✅ Email sent successfully');

    } catch (error) {
        console.error('❌ Failed:', error);
    }
})();
