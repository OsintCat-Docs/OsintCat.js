# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1/1.1.2] - 2025-01-10

### Testing if the Github Package and Github action works

- Updated Method for Github OSINT
- Updated Version Number
- Added "readonly" to DNSResults

## [1.1.0] - 2025-01-10

### Added
- Comprehensive JSDoc documentation for all public methods
- Input validation for all API methods
- Email format validation in `getEmailInfo` method
- TypeScript type exports for better IDE support
- Detailed usage examples for multiple frameworks (Next.js, Express, Lambda, Deno, Bun)
- Enhanced error handling with `OsintCatError` class
- Stack trace capture for better error debugging

### Changed
- Improved error messages with better context
- Simplified configuration (removed custom baseURL)
- Updated TypeScript definitions for better type safety
- Enhanced README with comprehensive examples and best practices
- Standardized method naming conventions
- Improved `discordToRoblox` method return type from `unknown` to `DiscordToRobloxResult`

### Fixed
- Fixed missing return type definitions
- Corrected null checks throughout the codebase
- Fixed inconsistent error handling across methods
- Removed circular dependency in package.json, yes I know :skull:

### Removed
- Custom baseURL configuration (locked to official API endpoint)

## [1.0.0] - 2024-29-09

### Added
- Initial release of OsintCat JavaScript/TypeScript SDK
- Support for all OsintCat API endpoints:
  - Data breach search across multiple databases
  - Discord user information and stalker API
  - Reddit profile investigation
  - Roblox profile and game data
  - GitHub profile and repository information
  - Email validation and enrichment
  - Phone number validation and carrier lookup
  - IP geolocation and ISP information
  - DNS resolution (A, AAAA, CNAME, MX, NS, TXT, SOA records)
  - Domain analysis and credential search
  - Username search across multiple platforms
  - NPD (National Public Data) records search
  - Chilean name database search
  - Minecraft account breach search
  - Discord to Roblox account linking
- Full TypeScript support with comprehensive type definitions
- Dual module system (ESM and CommonJS)
- Axios-based HTTP client with interceptors
- Custom error handling with `OsintCatError` class
- User account information and usage statistics endpoint
- Configurable timeout settings
- Custom HTTP headers support

### Documentation
- Comprehensive README with usage examples
- API method documentation
- TypeScript type definitions
- Installation instructions
- Authentication guide
- Error handling examples
- Rate limiting information
- Legal and ethical use guidelines

### Developer Experience
- Modern build system with tsup
- TypeScript source code
- Jest testing framework setup
- ESLint and Prettier configuration
- Automated build and publish scripts

## [Unreleased]

### Planned
- Response caching mechanism
- Batch request support


### Planned but not sure
- Webhook integration for async operations
- CLI tool for command-line usage
- Additional platform integrations

---

## Release Notes

### Version 1.0.1
This release focuses on improving developer experience with better documentation, type safety, and input validation. The configuration has been simplified by removing retry logic and custom baseURL support to ensure consistent API usage.

### Version 1.0.0
The initial release provides a complete SDK for the OsintCat API with full TypeScript support, comprehensive error handling, and support for all API endpoints. The package is production-ready and follows modern JavaScript/TypeScript best practices.

---

## Upgrade Guide

### From 1.0.0 to 1.0.1

#### Breaking Change(s)
- `baseURL` configuration option has been removed

#### Migration Steps

**Before (1.0.0):**
```typescript
const client = new OsintCat({
    apiKey: 'your-key',
    baseURL: 'https://www.osintcat.net',
    customHeaders: {} // Optional
});
```

**After (1.0.1):**
```typescript
const client = new OsintCat({
    apiKey: 'your-key',
    timeout: 90000, // Optional: defaults to 90 seconds
    customHeaders: {} // Optional
});
```

If you relied on custom baseURL (for whatever reason...), you'll need to implement that at the application level.

#### New Features to Adopt
- All methods now validate input and throw descriptive errors
- Enhanced TypeScript types for better IDE autocomplete
- Improved error messages with `OsintCatError` class

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for information on how to contribute to this project.

## Support

- 📖 [API Documentation](https://www.osintcat.net/api/docs)
- 💬 [Telegram Community](https://t.me/osintcatru)
- 🐛 [Report Issues](https://github.com/osintcat-docs/osintcat.js/issues)
- 📧 [Contact Support](mailto:info@osintcat.net)