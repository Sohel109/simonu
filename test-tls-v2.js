import tls from 'node:tls';

const options = {
    host: '172.217.218.109', // Hardcoded IPv4
    port: 465,
    servername: 'smtp.gmail.com',
    rejectUnauthorized: false,
    minVersion: 'TLSv1.2',
    maxVersion: 'TLSv1.2'
};

console.log('Testing raw TLS 1.2 connection...');
const socket = tls.connect(options, () => {
    console.log('✅ client connected via TLS 1.2');
    console.log('Cipher:', socket.getCipher());
    process.exit(0);
});

socket.on('error', (err) => {
    console.error('❌ Connection failed:', err);
    process.exit(1);
});

socket.on('end', () => {
    console.log('❌ Connection ended by server');
});
