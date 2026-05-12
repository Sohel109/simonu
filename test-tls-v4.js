import tls from 'node:tls';

const options = {
    host: '172.217.218.109', // Hardcoded IPv4
    port: 465,
    // servername: REMOVED
    rejectUnauthorized: true // Should fail if cert name doesn't match hostname (IP)
};

console.log('Testing raw TLS connection WITHOUT SNI (Strict Validation)...');
const socket = tls.connect(options, () => {
    console.log('✅ client connected without SNI');
    console.log('Authorized:', socket.authorized);
    console.log('Error:', socket.authorizationError);

    const cert = socket.getPeerCertificate();
    console.log('Cert Subject:', cert.subject);
    console.log('Cert Alt Names:', cert.subjectaltname);

    process.exit(0);
});

socket.on('error', (err) => {
    console.error('❌ Connection failed:', err);
    process.exit(1);
});

socket.on('end', () => {
    console.log('❌ Connection ended by server');
});
