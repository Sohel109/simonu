import tls from 'node:tls';

const options = {
    host: '172.217.218.109', // Hardcoded IPv4
    port: 465,
    // servername: 'smtp.gmail.com', // REMOVED SNI
    rejectUnauthorized: false
};

console.log('Testing raw TLS connection WITHOUT SNI...');
const socket = tls.connect(options, () => {
    console.log('✅ client connected without SNI');
    process.exit(0);
});

socket.on('error', (err) => {
    console.error('❌ Connection failed:', err);
    process.exit(1);
});

socket.on('end', () => {
    console.log('❌ Connection ended by server');
});
