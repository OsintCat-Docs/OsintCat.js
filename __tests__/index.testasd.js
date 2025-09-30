const axios = require('axios');
const { OsintCat } = require('../src/index');

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('OsintCat', () => {
    let client;
    let mockAxiosInstance;

    beforeEach(() => {
        jest.clearAllMocks();

        mockAxiosInstance = {
            interceptors: {
                request: { use: jest.fn() },
                response: { use: jest.fn() }
            },
            get: jest.fn(),
            post: jest.fn()
        };

        mockedAxios.create = jest.fn().mockReturnValue(mockAxiosInstance);
        client = new OsintCat({ apiKey: 'test-key' });
    });

    describe('Initialization', () => {
        test('should initialize with API key', () => {
            expect(client).toBeInstanceOf(OsintCat);
            expect(mockedAxios.create).toHaveBeenCalledWith({
                baseURL: 'https://www.osintcat.net',
                timeout: 90000,
                headers: {
                    'User-Agent': 'OsintCat.js/1.1.0'
                }
            });
        });
    });

    describe('API Methods', () => {
        test('should have all expected methods', () => {
            // Check methods that actually exist in your code
            expect(typeof client.searchBreaches).toBe('function');
            expect(typeof client.getDiscordStalkerInfo).toBe('function');
            expect(typeof client.searchUsername).toBe('function');  // was getUsernameInfo
            expect(typeof client.searchMinecraft).toBe('function'); // was getMinecraftInfo
            expect(typeof client.getIPInfo).toBe('function');
            expect(typeof client.getPhoneInfo).toBe('function');
            expect(typeof client.getEmailInfo).toBe('function');
            expect(typeof client.resolveDNS).toBe('function');
            expect(typeof client.discordToRoblox).toBe('function');
            expect(typeof client.searchChileanName).toBe('function'); // was getchileanNameInfo
            expect(typeof client.searchDomain).toBe('function');
            expect(typeof client.getUserInfo).toBe('function');
            expect(typeof client.getDiscordInfo).toBe('function');
            expect(typeof client.getRobloxInfo).toBe('function');
            expect(typeof client.getRedditInfo).toBe('function');
            expect(typeof client.getGithubInfo).toBe('function');
        });
    });

    describe('searchBreaches', () => {
        test('should call breach endpoint correctly', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    data: {
                        'leakcheck-results': {
                            success: true,
                            found: 0,
                            result: []
                        },
                        'snusbase-results': {
                            took: 0,
                            size: 0,
                            results: {}
                        }
                    },
                    meta: { plan: 'free', lookups_left: '9' }
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.searchBreaches('test@example.com');

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/breach', {
                params: { query: 'test@example.com' },
                headers: undefined
            });
            expect(result.success).toBe(true);
        });
    });

    describe('getDiscordStalkerInfo', () => {
        test('should search Discord correctly', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    data: {
                        data: {
                            messages: [],
                            server_activity: [],
                            username_history: [],
                            voice_sessions: []
                        },
                        elapsed_ms: 30.64,
                        query_author_id: "123456789",
                        status: "success"
                    }
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.getDiscordStalkerInfo('123456789');

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/discord-stalker', {
                params: { query: '123456789' },
                headers: undefined
            });
            expect(result.success).toBe(true);
        });
    });

    describe('discordToRoblox', () => {
        test('should convert Discord to Roblox', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    data: {
                        roblox_id: "1479017982",
                        name: "TestUser",
                        displayName: "Test User",
                        created: "2023-01-01",
                        description: "Test description",
                        avatar: "https://example.com/avatar.png",
                        badges: [],
                        groupCount: 0
                    }
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.discordToRoblox('123456789');

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/discord-to-roblox', {
                params: { query: '123456789' },
                headers: undefined
            });
            expect(result.success).toBe(true);
        });
    });

    describe('getMinecraftInfo', () => {
        test('should search Minecraft correctly', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    data: {
                        breach_results: [],
                        elapsed_ms: 35.71,
                        note: "results get reduced to max 1000 results to prevent overload",
                        query: "testuser",
                        results: 0,
                        status: "success"
                    }
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.searchMinecraft('testuser'); // was missing 'const result = await'

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/minecraft', {
                params: { query: 'testuser' },
                headers: undefined
            });
            expect(result.success).toBe(true);
        });
    });

    describe('getchileanNameInfo', () => {
        test('should search Chilean names correctly', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    data: [
                        {
                            name: "SILVA VARGAS MARIA XIMENA",
                            firstName: "SILVA VARGAS",
                            lastName: "MARIA XIMENA",
                            rut: "10093319-5",
                            gender: "MASCULINO",
                            address: "MANUEL RODRIGUEZ 46",
                            city: "NANCAGUA"
                        }
                    ]
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.searchChileanName('Maria Silva'); // was missing 'const result = await'

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/chilean-name', {
                params: { query: 'Maria Silva' },
                headers: undefined
            });

            expect(result.success).toBe(true);
        });
    });

    describe('getUserInfo', () => {
        test('should get user account info', async () => {
            const mockResponseData = { plan: 'premium', lookups_left: '45' };
            const mockResponse = {
                data: {
                    success: true,
                    data: mockResponseData
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.getUserInfo();

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/user');
            // getUserInfo returns the data directly from response.data
            expect(result.plan).toBe('premium');
            expect(result.lookups_left).toBe('45');
        });
    });

    describe('getPhoneInfo', () => {
        test('should get phone information', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    data: {
                        number: '+1234567890',
                        country: 'US',
                        location: 'California',
                        carrier: 'Test Carrier',
                        line_type: 'mobile',
                        is_valid: true
                    }
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.getPhoneInfo('+1234567890');

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/phone-osint', {
                params: { query: '+1234567890' },
                headers: undefined
            });
            expect(result.success).toBe(true);
        });
    });

    describe('getEmailInfo', () => {
        test('should get email information', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    data: {
                        email: 'test@example.com',
                        isvalid: true,
                        isdisposable: false,
                        isroleaccount: false,
                        isfree: true,
                        domain: 'example.com'
                    }
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.getEmailInfo('test@example.com');

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/email-osint', {
                params: { query: 'test@example.com' },
                headers: { 'User-Agent': 'Purpose: OSINT Investigation for OsintCat.js/1.1.0 Package' }
            });
            expect(result.success).toBe(true);
        });
    });

    describe('getIPInfo', () => {
        test('should get IP information', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    data: {
                        ip: '8.8.8.8',
                        country: 'US',
                        city: 'Mountain View',
                        timezone: 'America/Los_Angeles'
                    }
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.getIPInfo('8.8.8.8');

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/ip', {
                params: { query: '8.8.8.8' },
                headers: undefined
            });
            expect(result.success).toBe(true);
        });
    });
});
