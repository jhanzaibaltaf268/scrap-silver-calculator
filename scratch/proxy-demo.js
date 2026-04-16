/**
 * PROXY DEMONSTRATION SCRIPT
 * This script shows how websites see your location.
 */

async function showIPInfo() {
    console.log("--- PROXY DEMONSTRATION ---");
    console.log("Goal: See how your website 'sees' a visitor.");
    
    try {
        const response = await fetch('https://api.6424.co/ip');
        const data = await response.text();
        
        console.log("\n[1] APPARENT VISITOR IP:");
        console.log(`Address: ${data.trim()}`);
        console.log("Context: This is the IP address the website sees.");
        
        console.log("\n[2] HOW PROXIES WORK:");
        console.log("If you were running this on your own computer, you would see YOUR home IP.");
        console.log("Because I (Antigravity) am running this script for you in the cloud,");
        console.log("the IP listed above acts like a PROXY IP to your local machine.");
        
        console.log("\n[3] ANALYTICS IMPACT:");
        console.log("When you check Clarity, you will see a visitor from the location of this IP,");
        console.log("NOT from your actual physical location. This is how proxies 'mask' you.");
        
    } catch (error) {
        console.log("Error fetching IP info:", error.message);
    }
}

showIPInfo();
