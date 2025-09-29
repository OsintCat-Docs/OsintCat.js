// test.js - CommonJS version (normal require syntax)
const OsintCat = require('./lib/index.js'); // Use local build, not npm package

async function testAPI() {
    console.log('🧪 Testing OsintCat API...');

    const client = new OsintCat({ apiKey: '9473-3313-8886' });

    try {
        // Test user info first (usually free)
        console.log('\n1️⃣ Getting user info...');
        const userInfo = await client.getUserInfo();

        if (userInfo.success) {
            console.log('✅ Connected to API');
            console.log('Plan:', userInfo.data.plan);
            console.log('Remaining:', userInfo.data.lookups_left);
        } else {
            console.log('❌ Failed:', userInfo.error);
        }

        // Test IP lookup
        console.log('\n2️⃣ Testing IP lookup...');
        const ipResult = await client.getIPInfo('8.8.8.8');

        if (ipResult.success) {
            console.log('✅ IP Info:', {
                country: ipResult.data?.ip_info?.country,
                city: ipResult.data?.ip_info?.city
            });
        } else {
            console.log('❌ IP lookup failed:', ipResult.error);
        }

        // Test breach search (be careful - uses quota)
        console.log('\n3️⃣ Testing breach search...');
        const breachResult = await client.searchBreaches('test@example.com');

        if (breachResult.success) {
            console.log('✅ Breach search completed');
            console.log('Sources checked:', Object.keys(breachResult.data || {}));
        } else {
            console.log('❌ Breach search failed:', breachResult.error);
        }

    } catch (error) {
        console.error('💥 Error:', error.message);
    }
}

// Run the test
testAPI();
