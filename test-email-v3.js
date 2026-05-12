import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { resolve4 } from 'node:dns/promises';

dotenv.config();

console.log('📧 Starting email test v3 (Port 587)...');

(async () => {
    try {
        console.log('🔍 Resolving smtp.gmail.com (IPv4)...');
        const [ip] = await resolve4('smtp.gmail.com');
        console.log(`✅ Resolved IP: ${ip}`);

        const transporter = nodemailer.createTransport({
            host: ip,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                servername: 'smtp.gmail.com',
                rejectUnauthorized: false
            },
            logger: true,
            debug: true
        });

        console.log('🔄 Verifying configuration...');
        await transporter.verify();
        console.log('✅ Configuration valid!');

    } catch (error) {
        console.error('❌ Failed:', error);
    }
})();
