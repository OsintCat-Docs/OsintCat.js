import OsintCat, { OSINTResponse, BreachResult, DiscordUser } from 'OsintCat';

class OSINTInvestigator {
    private client: OsintCat;

    constructor(apiKey: string) {
        this.client = new OsintCat({
            apiKey,
            timeout: 90000 // 90 second timeout for investigations
        });
    }

    /**
     * Comprehensive email investigation
     */
    async investigateEmail(email: string) {
        console.log(`🔍 Starting comprehensive investigation for: ${email}`);

        const results = {
            email: email,
            timestamp: new Date().toISOString(),
            findings: {
                breaches: null,
                github: null,
                validation: null
            },
            summary: {
                foundInBreaches: false,
                hasGitHubAccount: false,
                isValidEmail: false,
                riskLevel: 'unknown' as 'low' | 'medium' | 'high' | 'unknown'
            }
        };

        try {
            // 1. Check for data breaches
            console.log('📊 Checking breach databases...');
            const breaches: OSINTResponse<BreachResult> = await this.client.searchBreaches(email);

            if (breaches.success && breaches.data) {
                results.findings.breaches = breaches.data;
                results.summary.foundInBreaches = this.hasBreachData(breaches.data);
            }

            // 2. GitHub investigation
            console.log('💻 Investigating GitHub presence...');
            const github = await this.client.searchGitHub(email);

            if (github.success && github.data) {
                results.findings.github = github.data;
                results.summary.hasGitHubAccount = true;
            }

            // 3. Email validation
            console.log('📧 Validating email...');
            const emailInfo = await this.client.getEmailInfo(email);

            if (emailInfo.success && emailInfo.data) {
                results.findings.validation = emailInfo.data;
                results.summary.isValidEmail = emailInfo.data.valid;
            }

            // Calculate risk level
            results.summary.riskLevel = this.calculateRiskLevel(results);

            return results;

        } catch (error) {
            console.error('❌ Investigation failed:', error);
            throw error;
        }
    }

    /**
     * Social media reconnaissance
     */
    async socialMediaRecon(username: string) {
        console.log(`🎯 Social media reconnaissance for: ${username}`);

        const platforms = ['discord', 'reddit', 'roblox'];
        const results = {};

        for (const platform of platforms) {
            try {
                console.log(`🔍 Checking ${platform}...`);

                let result;
                switch (platform) {
                    case 'discord':
                        result = await this.client.searchDiscord(username);
                        break;
                    case 'reddit':
                        result = await this.client.searchReddit(username);
                        break;
                    case 'roblox':
                        result = await this.client.searchRoblox(username);
                        break;
                }

                if (result?.success && result.data) {
                    results[platform] = {
                        found: true,
                        data: result.data,
                        lastChecked: new Date().toISOString()
                    };
                    console.log(`✅ Found ${platform} profile!`);
                } else {
                    results[platform] = {
                        found: false,
                        error: result?.error || 'No data found',
                        lastChecked: new Date().toISOString()
                    };
                    console.log(`❌ No ${platform} profile found`);
                }

                // Rate limiting - wait between requests
                await this.sleep(1000);

            } catch (error) {
                console.error(`❌ Error checking ${platform}:`, error);
                results[platform] = {
                    found: false,
                    error: error.message,
                    lastChecked: new Date().toISOString()
                };
            }
        }

        return {
            username,
            platforms: results,
            summary: {
                totalPlatforms: platforms.length,
                foundOn: Object.values(results).filter((r: any) => r.found).length,
                timestamp: new Date().toISOString()
            }
        };
    }

    /**
     * Network analysis for IP or domain
     */
    async networkAnalysis(target: string) {
        console.log(`🌐 Network analysis for: ${target}`);

        const isIP = this.isIPAddress(target);
        const results = {
            target,
            type: isIP ? 'ip' : 'domain',
            findings: {}
        };

        try {
            if (isIP) {
                // IP analysis
                const ipInfo = await this.client.getIPInfo(target);
                if (ipInfo.success) {
                    results.findings['ip_info'] = ipInfo.data;
                }
            } else {
                // Domain analysis
                const domainInfo = await this.client.searchDomain(target);
                if (domainInfo.success) {
                    results.findings['domain_info'] = domainInfo.data;
                }

                // DNS resolution
                const dnsInfo = await this.client.resolveDNS(target);
                if (dnsInfo.success) {
                    results.findings['dns_info'] = dnsInfo.data;
                }
            }

            return results;

        } catch (error) {
            console.error('❌ Network analysis failed:', error);
            throw error;
        }
    }

    // Helper methods
    private hasBreachData(breachData: BreachResult): boolean {
        return Object.values(breachData).some(source => 
            Array.isArray(source) ? source.length > 0 : source && Object.keys(source).length > 0
        );
    }

    private calculateRiskLevel(results: any): 'low' | 'medium' | 'high' | 'unknown' {
        if (results.summary.foundInBreaches && results.summary.hasGitHubAccount) {
            return 'high';
        } else if (results.summary.foundInBreaches || results.summary.hasGitHubAccount) {
            return 'medium';
        } else if (results.summary.isValidEmail) {
            return 'low';
        }
        return 'unknown';
    }

    private isIPAddress(str: string): boolean {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(str);
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Usage example
async function main() {
    const investigator = new OSINTInvestigator('your-api-key-here');

    try {
        // Email investigation
        const emailResults = await investigator.investigateEmail('test@example.com');
        console.log('Email Investigation Results:', JSON.stringify(emailResults, null, 2));

        // Social media recon
        const socialResults = await investigator.socialMediaRecon('username123');
        console.log('Social Media Results:', JSON.stringify(socialResults, null, 2));

        // Network analysis
        const networkResults = await investigator.networkAnalysis('example.com');
        console.log('Network Analysis:', JSON.stringify(networkResults, null, 2));

    } catch (error) {
        console.error('Investigation failed:', error);
    }
}

main();

export default OSINTInvestigator;
