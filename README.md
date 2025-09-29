# OsintCat JavaScript Client

[![npm version](https://img.shields.io/npm/v/osintcat.svg)](https://www.npmjs.com/package/osintcat)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official JavaScript/TypeScript client library for the [OsintCat API](https://www.osintcat.net/api/docs). Powerful OSINT (Open Source Intelligence) tools for investigations, data collection, and security research.

## Features

- 🔍 **Comprehensive OSINT Tools**: Search across multiple platforms and databases
- 🛡️ **Data Breach Search**: Find compromised accounts and leaked credentials  
- 🎮 **Gaming Platforms**: Discord, Reddit, Roblox, GitHub investigations
- 🌐 **Network Intelligence**: IP lookups, DNS resolution, domain analysis
- 📱 **Contact Intelligence**: Phone and email validation and enrichment
- 📊 **NPD Records Search**: National Public Data records investigation
- 🔐 **TypeScript Support**: Full type definitions included
- ⚡ **Promise-based**: Modern async/await support
- 🚀 **Easy Integration**: Simple and intuitive API

## Installation

```bash
npm install osintcat
```

```bash
yarn add osintcat
```

```bash
pnpm add osintcat
```

## Quick Start

```js
import OsintCat from 'osintcat';

// Initialize the client
const client = new OsintCat({
    apiKey: 'your-api-key-here'
});

// Search for data breaches
const breaches = await client.searchBreaches('email@example.com');
console.log(breaches.data);

// Discord investigation  
const discordData = await client.searchDiscord('username');
console.log(discordData.data);

// Get IP information
const ipInfo = await client.getIPInfo('8.8.8.8');
console.log(ipInfo.data);
```

## Authentication

Get your API key from the [OsintCat Dashboard](https://www.osintcat.net/dashboard). The API supports different subscription tiers:

- **Free**: Dashboard access only, **API access not included**  
- **Premium**: 50 API requests per day + unlimited dashboard access  
- **Enterprise**: Unlimited API requests + priority support

## API Methods

### Data Breach Search
```js
const result = await client.searchBreaches('email@example.com');
```

Search multiple breach databases for compromised accounts including:
- LeakCheck, SnusBase, HackCheck
- IntelVault, Inf0Sec, BreachBase

### Social Platform Investigation

#### Discord
```js
const discord = await client.searchDiscord('username');
```

#### Reddit  
```js
const reddit = await client.searchReddit('username');
```

#### GitHub
```js
const github = await client.searchGitHub('email@example.com');
```

#### Roblox
```js
const roblox = await client.searchRoblox('username');
```

### Network Intelligence

#### IP Information
```js
const ip = await client.getIPInfo('192.168.1.1');
```

#### DNS Resolution
```
const dns = await client.resolveDNS('example.com');
```

#### Domain Analysis
```js
const domain = await client.searchDomain('example.com');
```

### Contact Intelligence

#### Phone Information
```js
const phone = await client.getPhoneInfo('+1234567890');
```

#### Email Validation
```js
const email = await client.getEmailInfo('test@example.com');
```

### Advanced Features

#### NPD Records Search
```js
const npd = await client.searchNPD({
    firstname: 'John',
    lastname: 'Doe', 
    phone: '+1234567890'
});
```

Search National Public Data records using various criteria.

#### Discord to Roblox Conversion
```js
const conversion = await client.discordToRoblox('discord_user_id');
```

## Configuration Options

```js
const client = new OsintCat({
    apiKey: 'your-api-key',
    baseURL: 'https://www.osintcat.net', // Optional: custom base URL
    timeout: 30000 // Optional: request timeout in milliseconds (default: 30s)
});
```

## Response Format

All methods return a standardized response:

```json
{
    "success": true,
    "data": {},
    "error": null,
    "_meta": {
        "plan": "premium",
        "lookups_left": 45
    }
}
```

## Error Handling

```js
try {
    const result = await client.searchBreaches('email@example.com');

    if (result.success) {
        console.log('Data:', result.data);
        console.log('Remaining requests:', result._meta?.lookups_left);
    } else {
        console.error('Error:', result.error);
    }
} catch (error) {
    console.error('Request failed:', error.message);
}
```

## TypeScript Support

The package includes full TypeScript definitions:

```ts
import OsintCat, { OSINTResponse, BreachResult } from 'osintcat';

const client = new OsintCat({ apiKey: 'your-key' });

const breaches: OSINTResponse<BreachResult> = await client.searchBreaches('email@example.com');
```

## Rate Limiting

API requests are subject to rate limits based on your subscription:

- **Premium**: 50 requests/day
- **Enterprise**: Unlimited requests

Monitor your usage via the `_meta.lookups_left` field in responses.

## Legal & Ethical Use

This tool is intended for:
- ✅ Security research and penetration testing
- ✅ Investigating your own accounts and data
- ✅ Academic research and education
- ✅ Cybersecurity and threat intelligence
- ✅ Authorized OSINT investigations

**Please ensure responsible usage and comply with:**
- Applicable laws and regulations
- Terms of service of investigated platforms  
- Privacy rights and data protection laws
- Ethical guidelines for security research

## Support

- 📖 [API Documentation](https://www.osintcat.net/api/docs)
- 💬 [Telegram Community](https://t.me/osintcatru)
- 🐛 [Report Issues](https://github.com/osintcat-docs/osintcat.js/issues)
- 📧 [Contact Support](mailto:info@osintcat.net)
- 🌐 [Website](https://www.osintcat.net)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Disclaimer**: This tool is for authorized security testing and research only. Users are responsible for ensuring compliance with applicable laws and regulations. The developers are not responsible for any misuse of this tool.