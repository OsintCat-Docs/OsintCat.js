// examples/api-key-setup.js
// Different ways regular users can set their API key

const OsintCat = require('osintcat');

// 🔧 METHOD 1: Direct API Key (Most Common)
console.log('Method 1: Direct API Key');
const client1 = new OsintCat({ 
    apiKey: '9473-3313-8886'  // ← Replace with your real API key
});

async function example1() {
    const result = await client1.getUserInfo();
    console.log('Account info:', result);
}

// 🔧 METHOD 2: Environment Variable (Production Recommended)
console.log('Method 2: Environment Variable');
const client2 = new OsintCat({ 
    apiKey: process.env.OSINTCAT_API_KEY 
});

// 🔧 METHOD 3: Config File
console.log('Method 3: Config File');
// Create config.json: { "apiKey": "9473-3313-8886" }
try {
    const config = require('./config.json');
    const client3 = new OsintCat({ apiKey: config.apiKey });
} catch (e) {
    console.log('Config file not found, skipping...');
}

// 🔧 METHOD 4: .env File (with dotenv package)
console.log('Method 4: .env File');
// First: npm install dotenv
// Create .env file: OSINTCAT_API_KEY=9473-3313-8886
try {
    require('dotenv').config();
    const client4 = new OsintCat({ apiKey: process.env.OSINTCAT_API_KEY });
} catch (e) {
    console.log('dotenv not installed, skipping...');
}

// Example usage
async function demonstrateAPI() {
    console.log('\n🧪 Testing API...');

    try {
        // Simple IP lookup
        const result = await client1.getIPInfo('8.8.8.8');

        if (result.success) {
            console.log('✅ IP Info:', {
                country: result.data?.ip_info?.country,
                city: result.data?.ip_info?.city,
                isp: result.data?.ip_info?.isp
            });
        } else {
            console.log('❌ Error:', result.error);
        }

    } catch (error) {
        console.error('💥 Failed:', error.message);
    }
}

// Uncomment to run the demonstration
// demonstrateAPI();

module.exports = {
    client1,
    client2,
    demonstrateAPI
};
