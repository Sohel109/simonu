// test-bot.js
// Script to test the /api/send-email endpoint

// Node.js 18+ has native fetch, so no import needed usually, 
// but if needed we can use import. Let's rely on native global fetch.

async function sendTestEmail() {
    const url = 'http://localhost:3001/api/send-email';

    const payload = {
        prenom: "TestBot",
        nom: "Automated",
        email: "ryadhabdelmalek@gmail.com", // User's email for testing
        objet: "Test Bot Messafe",
        message: "Ceci est un message de test automatique pour vérifier le fonctionnement du formulaire."
    };

    console.log(`🤖 Test Bot: Sending request to ${url}...`);
    // console.log("Payload:", payload);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            console.log("✅ SUCCESS:", data);
        } else {
            console.error(`❌ FAILED: Status ${response.status}`);
            const errorText = await response.text();
            console.error("Error Details:", errorText);
        }
    } catch (error) {
        console.error("❌ NETWORK ERROR:", error.message);
        console.log("Make sure the backend server (npm run server) is running on port 3001.");
    }
}

sendTestEmail();
