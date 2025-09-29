// Example usage of the OsintCat JavaScript client
import OsintCat from 'osintcat';

async function example() {
    // Initialize the client with your API key
    const client = new OsintCat({
        apiKey: 'your-api-key-here'
    });

    try {
        // Example 1: Search for data breaches
        console.log('🔍 Searching for data breaches...');
        const breaches = await client.searchBreaches('test@example.com');
        if (breaches.success) {
            console.log('Found breach data:', breaches.data);
            console.log('Remaining lookups:', breaches._meta?.lookups_left);
        }

        // Example 2: Discord investigation
        console.log('🎮 Investigating Discord user...');
        const discord = await client.searchDiscord('username123');
        if (discord.success) {
            console.log('Discord data:', discord.data);
        }

        // Example 3: IP address lookup
        console.log('🌐 Looking up IP information...');
        const ipInfo = await client.getIPInfo('8.8.8.8');
        if (ipInfo.success) {
            console.log('IP Info:', ipInfo.data);
        }

        // Example 4: GitHub investigation
        console.log('💻 Investigating GitHub user...');
        const github = await client.searchGitHub('user@example.com');
        if (github.success) {
            console.log('GitHub profile:', github.data);
        }

        // Example 5: Phone number lookup
        console.log('📱 Looking up phone information...');
        const phone = await client.getPhoneInfo('+1234567890');
        if (phone.success) {
            console.log('Phone info:', phone.data);
        }

        // Example 6: Get account information
        console.log('👤 Getting account information...');
        const userInfo = await client.getUserInfo();
        if (userInfo.success) {
            console.log('Account info:', userInfo.data);
        }

    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

// Run the example
example();
