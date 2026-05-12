import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('📧 Starting email test v4 (Custom Lookup)...');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Use the actual hostname
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // Custom lookup function to force IPv4
    lookup: (hostname, options, callback) => {
        console.log(`🔍 Custom lookup for ${hostname}`);
        // We can use dns.resolve4 or just return our known good IP
        // Let's use the hardcoded one we know works with OpenSSL
        const ip = '172.217.218.109';
        console.log(`✅ Returning forced IPv4: ${ip}`);
        callback(null, [{ address: ip, family: 4 }]);
    },
    tls: {
        rejectUnauthorized: false
    },
    logger: true,
    debug: true
});

(async () => {
    try {
        console.log('🔄 Verifying configuration...');
        await transporter.verify();
        console.log('✅ Configuration valid!');

        // Try sending
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'Test V4 Fix',
            text: 'If this arrives, custom lookup fixed it.'
        });
        console.log('✅ Email sent successfully');

    } catch (error) {
        console.error('❌ Failed:', error);
    }
})();
