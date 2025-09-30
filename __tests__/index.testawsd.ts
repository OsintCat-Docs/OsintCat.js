import axios from 'axios';
import { OsintCat } from '../src/index';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('OsintCat', () => {
    let client: OsintCat;
    let mockAxiosInstance: any;

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

        test('should initialize with custom config', () => {
            const customClient = new OsintCat({
                apiKey: 'custom-key',
                timeout: 90000
            });

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
            expect(typeof client.searchBreaches).toBe('function');
            expect(typeof client.getDiscordStalkerInfo).toBe('function'); // was discordStalker
            expect(typeof client.searchUsername).toBe('function');
            expect(typeof client.searchMinecraft).toBe('function');
            expect(typeof client.getIPInfo).toBe('function');
            expect(typeof client.getPhoneInfo).toBe('function');
            expect(typeof client.getEmailInfo).toBe('function');
            expect(typeof client.resolveDNS).toBe('function');
            expect(typeof client.discordToRoblox).toBe('function');
            expect(typeof client.searchNPD).toBe('function');
            expect(typeof client.searchDomain).toBe('function');
            expect(typeof client.searchChileanName).toBe('function');
            expect(typeof client.getUserInfo).toBe('function');
        });
    });

    describe('searchBreaches', () => {
        test('should call breach endpoint correctly', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    data: {
                        'leakcheck-results': [],
                        'snusbase-results': [],
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

        test('should handle errors gracefully', async () => {
            const mockError = new Error('API Error');
            mockAxiosInstance.get.mockRejectedValue(mockError);

            await expect(client.searchBreaches('invalid-email')).rejects.toThrow('API Error');
        });
    });

    describe('discordStalker', () => {
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
                        query_author_id: "123",
                        status: "success"
                    }
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.getDiscordStalkerInfo('123456789'); // was discordStalker

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/discord-stalker', {
                params: { query: '123456789' },
                headers: undefined
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
                        city: 'Mountain View'
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

    describe('getUserInfo', () => {
        test('should get user account info', async () => {
            const mockResponse = {
                data: {
                    success: true,
                    data: { 
                        plan: 'premium', 
                        lookups_left: 45 
                    }
                }
            };
            mockAxiosInstance.get.mockResolvedValue(mockResponse);

            const result = await client.getUserInfo();

            expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/user', {
                params: undefined,
                headers: undefined
            });
            expect(result.plan).toBe('premium');
            expect(result.lookups_left).toBe(45);
        });
    });
});
