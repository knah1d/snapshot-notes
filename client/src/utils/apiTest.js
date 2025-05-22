// A simple script to test API connectivity
const fetch = require("cross-fetch");
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function testApiConnectivity() {
    console.log("Testing API connectivity...");

    try {
        const response = await fetch(`${API_URL}/health`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log("API is reachable and responding!");
            const data = await response.json();
            console.log("Response:", data);
            return true;
        } else {
            console.error(`API returned status: ${response.status}`);
            try {
                const errorData = await response.json();
                console.error("Error details:", errorData);
            } catch (e) {
                console.error("Could not parse error response");
            }
            return false;
        }
    } catch (error) {
        console.error("Failed to connect to API:", error.message);
        return false;
    }
}

testApiConnectivity();
