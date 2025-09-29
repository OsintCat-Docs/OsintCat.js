// scripts/test-api.js
// OSINTCat Manual API Testing Script - Updated with Real Methods

import OsintCat from '../lib/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runManualTests() {
    console.log('🧪 OsintCat Manual API Testing');
    console.log('='.repeat(50));

    // 🔧 OPTION 1: Hardcode your API key here (easiest for testing)
    const HARDCODED_API_KEY = '9473-3313-8886'; // ← Put your real key here

    // 🔧 OPTION 2: Get from environment variable (more secure)
    const ENV_API_KEY = process.env.OSINTCAT_API_KEY;

    // Use hardcoded key first, fallback to environment
    const apiKey = HARDCODED_API_KEY || ENV_API_KEY;

    if (!apiKey) {
        console.error('❌ No API key found!');
        console.error('');
        console.error('🔧 Options to fix this:');
        console.error('1. Edit this file and set HARDCODED_API_KEY = "your-key"');
        console.error('2. Windows PowerShell: $env:OSINTCAT_API_KEY="your-key"');
        console.error('3. Windows CMD: set OSINTCAT_API_KEY=your-key');
        console.error('4. Mac/Linux: export OSINTCAT_API_KEY="your-key"');
        process.exit(1);
    }

    console.log('🔑 Using API key:', apiKey.substring(0, 8) + '...');
    console.log('⚠️  WARNING: This will consume your API quota!');
    console.log('📁 Results will be saved to results/ directory');
    console.log('');

    const client = new OsintCat({ apiKey });

    // Updated test suite with correct method names from your implementation
    const tests = [
        {
            name: '1️⃣ User Account Info',
            fn: () => client.getUserInfo(),
            query: 'account',
            type: 'user_info'
        },
        {
            name: '2️⃣ IP Lookup (8.8.8.8)',
            fn: () => client.getIPInfo('8.8.8.8'),
            query: '8.8.8.8',
            type: 'ip_info'
        },
        {
            name: '3️⃣ Email Analysis',
            fn: () => client.getEmailInfo('test@example.com'),
            query: 'test@example.com',
            type: 'email_analysis'
        },
        {
            name: '4️⃣ DNS Resolution',
            fn: () => client.resolveDNS('google.com'),
            query: 'google.com',
            type: 'dns_resolution'
        },
        {
            name: '5️⃣ Domain Search',
            fn: () => client.searchDomain('github.com'),
            query: 'github.com',
            type: 'domain_search'
        },
        {
            name: '6️⃣ Phone Info',
            fn: () => client.getPhoneInfo('+14155552345'),
            query: '+14155552345',
            type: 'phone_info'
        },
        {
            name: '7️⃣ GitHub Search',
            fn: () => client.getGithubInfo('octocat'),
            query: 'octocat',
            type: 'github_search'
        },
        {
            name: '8️⃣ Reddit Profile',
            fn: () => client.getRedditInfo('spez'),
            query: 'spez',
            type: 'reddit_profile'
        },
        {
            name: '9️⃣ Discord Info',
            fn: () => client.getDiscordInfo('1120098268496535746'),
            query: '1120098268496535746',
            type: 'discord_info'
        },
        {
            name: '🔟 Roblox Profile',
            fn: () => client.getRobloxInfo('Builderman'),
            query: 'Builderman',
            type: 'roblox_profile'
        },
        {
            name: '1️⃣1️⃣ Username Search',
            fn: () => client.searchUsername('testuser123'),
            query: 'testuser123',
            type: 'username_search'
        },
        {
            name: '1️⃣2️⃣ Minecraft Search',
            fn: () => client.searchMinecraft('Notch'),
            query: 'Notch',
            type: 'minecraft_search'
        },
        {
            name: '1️⃣3️⃣ Chilean Name Search',
            fn: () => client.searchChileanName('Maria Silva'),
            query: 'Maria Silva',
            type: 'chilean_name_search'
        },
        {
            name: '1️⃣4️⃣ Discord Stalker (⚠️ High Quota)',
            fn: () => client.getDiscordStalkerInfo('123456789012345678'),
            query: '123456789012345678',
            type: 'discord_stalker'
        },
        {
            name: '1️⃣5️⃣ Discord to Roblox',
            fn: () => client.discordToRoblox('1120098268496535746'),
            query: '1120098268496535746',
            type: 'discord_to_roblox'
        },
        {
            name: '1️⃣6️⃣ Breach Search (⚠️ HIGHEST QUOTA COST)',
            fn: () => client.searchBreaches('test@example.com'),
            query: 'test@example.com',
            type: 'breach_search'
        }
    ];

    // Run each test
    for (const test of tests) {
        console.log(`\n${test.name}...`);
        console.log(`Query: ${test.query}`);

        try {
            const result = await test.fn();
            await logResult(test.type, test.query, result);

            if (result.success) {
                console.log('✅ Success');
                if (result.data) {
                    const dataKeys = Object.keys(result.data);
                    console.log('📊 Data keys:', dataKeys.slice(0, 3).join(', '));
                    if (dataKeys.length > 3) {
                        console.log(`   ... and ${dataKeys.length - 3} more`);
                    }
                }
                if (result._meta) {
                    console.log('🔢 Remaining:', result._meta.lookups_left);
                    console.log('📋 Plan:', result._meta.plan);
                }
            } else {
                console.log('❌ Failed:', result.error);
            }

        } catch (error) {
            console.error('💥 Error:', error.message);
            await logResult(test.type, test.query, { error: error.message });
        }

        // Wait 2 seconds between requests to be respectful to API
        console.log('⏳ Waiting 2 seconds...');
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log('\n🎉 Manual testing complete!');
    console.log('📁 Check the results/ directory for detailed logs');

    // Show summary of created files
    const resultsDir = path.join(__dirname, '../results');
    if (fs.existsSync(resultsDir)) {
        const files = fs.readdirSync(resultsDir).filter(f => f.endsWith('.txt'));
        console.log(`\n📊 Created ${files.length} result files:`);
        files.slice(0, 10).forEach(file => {
            const filePath = path.join(resultsDir, file);
            const stats = fs.statSync(filePath);
            console.log(`  📄 results/${file} (${stats.size} bytes)`);
        });
        if (files.length > 10) {
            console.log(`  ... and ${files.length - 10} more files`);
        }
    }

    // Show quota usage warning
    console.log('\n⚠️  QUOTA WARNING:');
    console.log('This test consumed API quota for 16 different endpoints!');
    console.log('Check your account at https://www.osintcat.net to see remaining quota.');
}

async function logResult(searchType, query, result) {
    const resultsDir = path.join(__dirname, '../results');

    // Ensure results directory exists
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }

    const timestamp = new Date().toISOString();
    const filename = path.join(resultsDir, `${searchType}.txt`);
    const logLine = `[${timestamp}] Manual Test - Query: ${query}\n${JSON.stringify(result, null, 2)}\n${'='.repeat(80)}\n\n`;

    fs.appendFileSync(filename, logLine);
    console.log(`📝 Result logged to results/${searchType}.txt`);
}

runManualTests().catch(console.error);
