import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export interface OsintCatConfig {
  readonly apiKey: string;
  readonly timeout?: number;
  readonly customHeaders?: Record<string, string>;
}

export interface OsintResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly _meta?: {
    readonly plan: string;
    readonly lookups_left: string | number;
  };
}

export interface UserInfo {
  readonly account_info: {
    readonly email: string;
    readonly member_since: string;
    readonly plan: string;
    readonly username: string;
  };
  readonly usage: {
    readonly api: {
      readonly request_limit_daily: string;
      readonly requests_made_today: string;
      readonly requests_remaining_today: string;
    };
    readonly dashboard: {
      readonly request_limit_daily: string;
      readonly requests_remaining_today: string;
    };
  };
  readonly note: string;
  readonly last_limit_reset?: string;
}

export interface BreachResult {
  readonly "leakcheck-results": LeakCheckResults;
  readonly "snusbase-results": SnusbaseResults;
  readonly "hackcheck-results": HackCheckResults;
  readonly "intelvault-results": IntelVaultResults;
  readonly "inf0sec-results": Inf0secResults;
  readonly "breachbase-results": BreachbaseResults;
  readonly "leakosint-results": LeakosintResults;
}

interface LeakCheckResults {
  readonly success: boolean;
  readonly quota: number;
  readonly found: number;
  readonly result: readonly LeakCheckEntry[];
}

interface LeakCheckEntry {
  readonly password?: string;
  readonly source: {
    readonly name: string;
    readonly breach_date?: string;
    readonly unverified?: number;
    readonly passwordless?: number;
    readonly compilation?: number;
  };
  readonly dob?: string;
  readonly username?: string;
  readonly email?: string;
  readonly fields: readonly string[];
  readonly profilename?: string;
  readonly address?: string;
  readonly city?: string;
  readonly country?: string;
  readonly firstname?: string;
  readonly lastname?: string;
  readonly phone?: string;
  readonly state?: string;
  readonly zip?: string;
  readonly origin?: string;
  readonly name?: string;
  readonly ip?: string;
}

interface SnusbaseResults {
  readonly took: number;
  readonly size: number;
  readonly results: Record<string, readonly SnusbaseEntry[]>;
}

interface SnusbaseEntry {
  readonly username?: string;
  readonly email?: string;
  readonly hash?: string;
  readonly name?: string;
  readonly domain?: string;
  readonly uid?: number;
  readonly phone?: string;
  readonly created?: string;
  readonly address?: string;
  readonly city?: string;
  readonly state?: string;
  readonly country?: string;
  readonly zip?: string;
  readonly followers?: number;
  readonly birthdate?: string;
  readonly gender?: string;
  readonly language?: string;
  readonly lastip?: string;
  readonly salt?: string;
  readonly password?: string;
  readonly id?: number;
}

interface HackCheckResults {
  readonly found: number;
  readonly databases: number;
  readonly first_seen: string;
  readonly last_seen: string;
  readonly elapsed: string;
  readonly results: readonly HackCheckEntry[];
}

interface HackCheckEntry {
  readonly id: string;
  readonly email: string;
  readonly password?: string;
  readonly fullname?: string;
  readonly username?: string;
  readonly ipaddress?: string;
  readonly phonenumber?: string;
  readonly hash?: string;
  readonly otherfields?: string | null;
  readonly sensitivefields?: string | null;
  readonly source: {
    readonly name: string;
    readonly date?: string;
  };
}

interface IntelVaultResults {
  readonly success: boolean;
  readonly time_taken: number;
  readonly results: readonly IntelVaultEntry[];
}

interface IntelVaultEntry {
  readonly index: string;
  readonly data: {
    readonly dob?: string;
    readonly email?: string;
    readonly firstname?: string;
    readonly lastname?: string;
    readonly hash?: string;
    readonly id?: number;
    readonly ip?: string;
    readonly lastsigninat?: string;
    readonly partnerid?: number;
    readonly registerdate?: string;
    readonly salt?: string;
    readonly customerid?: number;
    readonly dateregistered?: string;
    readonly partnercode?: string;
    readonly username?: string;
    readonly password?: string;
    readonly addressline1?: string;
    readonly city?: string;
    readonly state?: string;
    readonly postcode?: string;
    readonly country?: string;
    readonly phone?: string;
    readonly addresstypeid?: number;
    readonly addressid?: number;
    readonly currency?: string;
    readonly ipcountry?: string;
    readonly name?: string;
    readonly followers?: number;
    readonly createdat?: string;
    readonly gender?: string;
    readonly lang?: string;
    readonly device?: string;
  };
}

interface Inf0secResults {
  readonly success: boolean;
  readonly time_taken: string;
  readonly count: number;
  readonly results: readonly Inf0secEntry[];
}

interface Inf0secEntry {
  readonly id: number;
  readonly label: string;
  readonly date: string;
  readonly logs: {
    readonly username?: string;
    readonly email?: string;
    readonly hash?: string;
    readonly name?: string;
    readonly domain?: string;
    readonly uid?: number;
    readonly phone?: string;
    readonly created?: string;
    readonly address?: string;
    readonly city?: string;
    readonly state?: string;
    readonly country?: string;
    readonly zip?: string;
    readonly followers?: number;
    readonly lastip?: string;
    readonly salt?: string;
    readonly password?: string;
    readonly id?: number;
    readonly birthdate?: string;
    readonly gender?: string;
    readonly language?: string;
  };
}

interface BreachbaseResults {
  readonly status: string;
  readonly took: number;
  readonly found: number;
  readonly content: readonly BreachbaseEntry[];
}

interface BreachbaseEntry {
  readonly username?: string;
  readonly email?: string;
  readonly ip?: string;
  readonly password?: string;
  readonly origin?: string;
}

interface LeakosintResults {
  readonly List: Record<string, LeakosintDatabase>;
  readonly NumOfDatabase: number;
  readonly NumOfResults: number;
  readonly price: number;
  readonly "search time": number;
}

interface LeakosintDatabase {
  readonly Data: readonly LeakosintEntry[];
  readonly InfoLeak: string;
  readonly NumOfResults: number;
}

interface LeakosintEntry {
  readonly Email?: string;
  readonly Password?: string;
  readonly IP?: string;
  readonly NickName?: string;
  readonly Url?: string;
  readonly Username?: string;
  readonly Phone?: string;
  readonly Name?: string;
  readonly Hash?: string;
  readonly Salt?: string;
  readonly Country?: string;
  readonly City?: string;
  readonly Address?: string;
  readonly DOB?: string;
  readonly Gender?: string;
  readonly FirstName?: string;
  readonly LastName?: string;
  readonly ZipCode?: string;
  readonly State?: string;
  readonly Domain?: string;
  readonly ID?: string | number;
  readonly CreatedAt?: string;
  readonly UpdatedAt?: string;
  readonly LastLogin?: string;
  readonly Status?: string;
  readonly ProfilePicture?: string;
  readonly Bio?: string;
  readonly Website?: string;
  readonly Location?: string;
  readonly Followers?: number;
  readonly Following?: number;
  readonly Posts?: number;
  readonly Verified?: boolean;
  readonly Premium?: boolean;
  readonly Language?: string;
  readonly Timezone?: string;
  readonly Device?: string;
  readonly UserAgent?: string;
  readonly Referrer?: string;
  readonly Source?: string;
  readonly Tags?: readonly string[];
  readonly Notes?: string;
  readonly Score?: number;
  readonly Confidence?: number;
  readonly Risk?: string;
  readonly Severity?: string;
  readonly Category?: string;
  readonly Type?: string;
  readonly Subtype?: string;
  readonly Title?: string;
  readonly Description?: string;
  readonly Keywords?: readonly string[];
  readonly Links?: readonly string[];
  readonly Images?: readonly string[];
  readonly Videos?: readonly string[];
  readonly Files?: readonly string[];
  readonly Attachments?: readonly string[];
  readonly Metadata?: Record<string, unknown>;
  readonly Custom?: Record<string, unknown>;
}

export interface DiscordUser {
  readonly id: string;
  readonly username: string;
  readonly discriminator: string;
  readonly avatar?: string;
  readonly bot?: boolean;
  readonly verified?: boolean;
}

export interface RobloxProfile {
  readonly id: number;
  readonly name: string;
  readonly displayName: string;
  readonly description: string;
  readonly created: string;
  readonly isBanned: boolean;
  readonly externalAppDisplayName: string | null;
  readonly hasVerifiedBadge: boolean;
  readonly avatar_url: string;
  readonly groups: readonly RobloxGroup[];
  readonly friends_count: number;
  readonly membership: boolean;
  readonly games: readonly RobloxGame[];
  readonly roblox_badges: readonly RobloxBadge[];
  readonly social_links: RobloxSocialLinks;
}

export interface RobloxGroup {
  readonly group: {
    readonly id: number;
    readonly name: string;
    readonly memberCount: number;
    readonly hasVerifiedBadge: boolean;
  };
  readonly role: {
    readonly id: number;
    readonly name: string;
    readonly rank: number;
  };
}

export interface RobloxGame {
  readonly id: number;
  readonly name: string;
  readonly description: string | null;
  readonly creator: {
    readonly id: number;
    readonly type: string;
  };
  readonly rootPlace: {
    readonly id: number;
    readonly type: string;
  };
  readonly created: string;
  readonly updated: string;
  readonly placeVisits: number;
}

export interface RobloxBadge {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly imageUrl: string;
}

export interface RobloxSocialLinks {
  readonly facebook: string | null;
  readonly twitter: string | null;
  readonly youtube: string | null;
  readonly twitch: string | null;
  readonly guilded: string | null;
}

export interface RedditProfile {
  readonly username: string;
  readonly karma: number;
  readonly created_utc: number;
  readonly verified: boolean;
  readonly posts: readonly unknown[];
  readonly comments: readonly unknown[];
}

export interface DiscordToRobloxResult {
  readonly roblox_id: string;
  readonly name: string;
  readonly displayName: string;
  readonly created: string;
  readonly description: string;
  readonly avatar: string;
  readonly badges: readonly unknown[];
  readonly groupCount: number;
}

export interface EmailResult {
  readonly email: string;
  readonly is_valid: boolean;
  readonly is_disposable: boolean;
  readonly is_role_account: boolean;
  readonly is_free: boolean;
  readonly domain: string;
}

export interface PhoneResult {
  readonly number: string;
  readonly country: string;
  readonly location: string;
  readonly carrier: string;
  readonly line_type: string;
  readonly is_valid: boolean;
}

export interface NPDResult {
  readonly success: boolean;
  readonly credit: string;
  readonly service: string;
  readonly search_parameters: {
    readonly firstName: string;
    readonly lastName: string;
    readonly address: string;
    readonly city: string;
    readonly state: string;
    readonly zip: string;
    readonly ssn: string;
    readonly dob: string;
    readonly phone1: string;
    readonly sources: string | null;
  };
  readonly results: readonly NPDEntry[];
}

export interface NPDEntry {
  readonly firstname?: string;
  readonly lastname?: string;
  readonly middlename?: string;
  readonly address?: string;
  readonly city?: string;
  readonly st?: string;
  readonly zip?: number | string;
  readonly phone1?: string;
  readonly ssn?: string;
  readonly dob?: string | null;
  readonly source_name?: string;
  readonly [key: string]: string | number | null | undefined | boolean | unknown;
}

export interface NPDSearchParams {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly address?: string;
  readonly city?: string;
  readonly state?: string;
  readonly zip?: string;
  readonly ssn?: string;
  readonly dob?: string;
  readonly phone1?: string;
  readonly sources?: string;
  readonly [key: string]: string | number | null | undefined | boolean | unknown;
}

export interface DomainResult {
  readonly search_term: string;
  readonly results: {
    readonly emails: readonly DomainEmailEntry[];
    readonly domains: readonly DomainEntry[];
    readonly urls: readonly DomainUrlEntry[];
    readonly subdomains: readonly unknown[];
  };
  readonly source: string;
  readonly response_time: number;
}

interface DomainEmailEntry {
  readonly email: string;
  readonly password: string;
}

interface DomainEntry {
  readonly domain: string;
  readonly username: string;
  readonly password: string;
}

interface DomainUrlEntry {
  readonly url: string;
}

export interface GitHubProfile {
  readonly username: string;
  readonly name: string;
  readonly bio: string;
  readonly location: string;
  readonly company: string;
  readonly blog: string;
  readonly email: string;
  readonly twitter: string;
  readonly repos: number;
  readonly followers: number;
  readonly following: number;
  readonly created_at: string;
  readonly updated_at: string;
  readonly avatar_url: string;
  readonly profile_url: string;
  readonly repositories: readonly unknown[];
  readonly organizations: readonly unknown[];
}

export interface DiscordStalkerResult {
  readonly data: {
    readonly messages: readonly DiscordMessage[];
    readonly server_activity: readonly DiscordServerActivity[];
    readonly username_history: readonly DiscordUsernameHistory[];
    readonly voice_sessions: readonly DiscordVoiceSession[];
  };
  readonly elapsed_ms: number;
  readonly query_author_id: string;
  readonly status: string;
}

export interface DiscordMessage {
  readonly author_name: string;
  readonly channel_id: number;
  readonly content: string;
  readonly guild_id: number;
  readonly guild_name: string;
  readonly isDeleted: number;
  readonly timestamp: string;
}

export interface DiscordServerActivity {
  readonly first_seen_fallback: string;
  readonly guild_id: number;
  readonly guild_name: string;
  readonly joined_at: string | null;
  readonly last_message: {
    readonly content: string;
    readonly timestamp: string;
  } | null;
  readonly last_seen_fallback: string;
  readonly left_at: string | null;
}

export interface DiscordUsernameHistory {
  readonly display_name: string;
  readonly first_seen: string;
}

export interface DiscordVoiceSession {
  readonly channel_name: string;
  readonly duration: number;
  readonly guild_name: string;
  readonly join_time: string;
  readonly leave_time: string;
  readonly participants: readonly unknown[];
  readonly participants_limited: boolean;
}

export interface IPLookupResult {
  readonly ip: string;
  readonly country: string;
  readonly region: string;
  readonly city: string;
  readonly zip: string;
  readonly lat: number;
  readonly lon: number;
  readonly timezone: string;
  readonly isp: string;
  readonly org: string;
  readonly as: string;
  readonly query: string;
}

export interface DNSResult {
  readonly A?: readonly string[];
  readonly AAAA?: readonly string[];
  readonly CNAME?: readonly string[];
  readonly MX?: readonly { name: string; priority: number }[];
  readonly NS?: readonly string[];
  readonly TXT?: readonly string[];
  readonly SOA?: readonly {
    mname: string;
    rname: string;
    serial: number;
    refresh: number;
    retry: number;
    expire: number;
    minimum: number;
  }[];
}

export interface UsernameResult {
  readonly akula: AkulaResult;
  readonly instagram: InstagramResult;
  readonly leakcheck: LeakCheckResults;
  readonly leaksight: LeaksightResult;
  readonly bigcombo: BigComboResult;
  readonly stealer: StealerResult;
  readonly tiktok: TikTokResult;
  readonly twitter: TwitterResult;
  readonly xbox: XboxResult | null;
}

export interface AkulaResult {
  readonly response_time: number;
  readonly results: {
    readonly domains: readonly DomainEntry[];
    readonly emails: readonly DomainEmailEntry[];
    readonly urls: readonly DomainUrlEntry[];
  };
  readonly search_term: string;
  readonly source: string;
  readonly success: boolean;
}

export interface InstagramResult {
  readonly button_title: string;
  readonly error_title: string;
  readonly message: string;
  readonly status: string;
  readonly uh_eligible: boolean;
}

export interface LeaksightResult {
  readonly DatabaseOsintLeaks: readonly LeaksightEntry[];
  readonly success: boolean;
}

export interface LeaksightEntry {
  readonly address?: string;
  readonly address1?: string;
  readonly address2?: string;
  readonly blacklisted?: number;
  readonly carrier?: string;
  readonly city?: string;
  readonly clean?: number;
  readonly country?: string;
  readonly created_at?: { readonly $date: { readonly $numberLong: string } };
  readonly email?: string;
  readonly ethnicity?: string;
  readonly firstname?: string;
  readonly gender?: string;
  readonly internal_country?: string;
  readonly internal_region?: string;
  readonly internal_timezone?: string;
  readonly ip_address?: string;
  readonly lastname?: string;
  readonly line_type?: string;
  readonly list_id?: string;
  readonly map_list?: string;
  readonly optin_date?: string;
  readonly optin_domain?: string;
  readonly optin_time?: string;
  readonly phone?: string;
  readonly price?: number;
  readonly rejected_shortcode_numbers?: string;
  readonly state?: string;
  readonly suppressed?: number;
  readonly team_id?: string;
  readonly timezone?: string;
  readonly updated_at?: { readonly $date: { readonly $numberLong: string } };
  readonly user_id?: string;
  readonly zip?: string;
  readonly f_name?: string;
  readonly l_name?: string;
  readonly phone_number?: string;
  readonly source?: string;
  readonly dob?: string;
  readonly field11?: string;
  readonly field5?: string;
  readonly field6?: string;
  readonly telefone1?: string;
  readonly telefone2?: string;
  readonly username?: string;
}

export interface BigComboResult {
  readonly Combolist: readonly BigComboEntry[];
}

export interface BigComboEntry {
  readonly database_url?: {
    readonly host: string;
    readonly pass: string;
    readonly path: string;
    readonly user: string;
  };
}

export interface StealerResult {
  readonly json: StealerData;
}

export interface StealerData {
  readonly Autofills?: string;
  readonly Information?: string | null;
  readonly passwords?: readonly StealerPassword[];
  readonly AntiVirus?: string;
  readonly Country?: string;
  readonly DateBreach?: string;
  readonly FileMalware?: string;
  readonly HWID?: string;
  readonly Hardwares?: string;
  readonly Username?: string;
  readonly ZipCode?: string;
  readonly ip?: string;
  readonly time?: string;
}

export interface StealerPassword {
  readonly password: string;
  readonly url: string;
  readonly user: string;
}

export interface TikTokResult {
  readonly error: string;
}

export interface TwitterResult {
  readonly account_status: {
    readonly is_private: boolean;
    readonly is_translator: boolean;
    readonly possibly_sensitive: boolean;
    readonly withheld_in_countries: readonly unknown[];
  };
  readonly created_at: string | null;
  readonly description: string;
  readonly display_name: string | null;
  readonly engagement_settings: {
    readonly can_be_dmed: boolean;
    readonly can_be_tagged_in_media: boolean;
  };
  readonly highlights_info: {
    readonly can_highlight_tweets: boolean;
    readonly highlighted_tweets_count: number;
  };
  readonly location: string;
  readonly professional_details: {
    readonly affiliates_count: number | null;
    readonly type: string | null;
  };
  readonly profile_details: {
    readonly has_default_profile_image: boolean;
    readonly parody_label: string;
    readonly pinned_tweet_ids: readonly string[];
  };
  readonly profile_image_shape: string;
  readonly profile_url: string | null;
  readonly stats: {
    readonly fast_followers: number;
    readonly followers: number;
    readonly following: number;
    readonly likes: number;
    readonly listed_in: number;
    readonly media_count: number;
    readonly tweets: number;
  };
  readonly subscription_info: {
    readonly creator_subscriptions_count: number;
    readonly has_hidden_subscriptions: boolean;
  };
  readonly urls_and_media: {
    readonly profile_banner_url: string;
    readonly profile_image_url: string;
    readonly website: string | null;
  };
  readonly user_id: number;
  readonly username: string | null;
  readonly verification_details: {
    readonly is_blue_verified: boolean;
    readonly is_identity_verified: boolean;
    readonly reason: string | null;
    readonly verification_type: string | null;
    readonly verified_since_utc: string | null;
  };
}

export interface XboxResult {
  // define when available
}

export interface ChileanNameResult {
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly rut: string;
  readonly gender: string;
  readonly address: string;
  readonly city: string;
}

export interface MinecraftResult {
  readonly breach_results: readonly MinecraftBreachEntry[];
  readonly elapsed_ms: number;
  readonly note: string;
  readonly query: string;
  readonly results: number;
  readonly status: string;
}

export interface MinecraftBreachEntry {
  readonly line: string;
  readonly source: string;
}

interface ErrorResponseData {
  readonly error?: string;
  readonly message?: string;
}

export class OsintCatError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly response?: unknown
  ) {
    super(message);
    this.name = "OsintCatError";
    
    // Maintains proper stack trace for where error was thrown (V8 engines only)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, OsintCatError);
    }
  }
}

/**
 * OsintCat API Client
 * 
 * Official JavaScript/TypeScript client for the OsintCat API.
 * Provides comprehensive OSINT investigation tools.
 * 
 * @example
 * ```typescript
 * const client = new OsintCat({ apiKey: 'your-api-key' });
 * const breaches = await client.searchBreaches('email@example.com');
 * ```
 */
export class OsintCat {
  private readonly client: AxiosInstance;

  /**
   * Creates a new OsintCat client instance
   * 
   * @param config - Configuration options
   * @param config.apiKey - Your OsintCat API key (required)
   * @param config.timeout - Request timeout in milliseconds (default: 90000)
   * @param config.customHeaders - Custom HTTP headers to include in requests
   * @throws {Error} If API key is missing
   */
  constructor(config: OsintCatConfig) {
    if (!config.apiKey) {
      throw new Error("API key is required");
    }

    this.client = axios.create({
      baseURL: "https://www.osintcat.net",
      timeout: config.timeout ?? 90000,
      headers: {
        "User-Agent": "OsintCat.js/1.1.0",
        ...config.customHeaders,
      },
    });

    // Add API key to requests
    this.client.interceptors.request.use((requestConfig) => {
      if (requestConfig.url?.startsWith("/api/")) {
        requestConfig.params = {
          ...requestConfig.params,
          id: config.apiKey,
        };
      }
      return requestConfig;
    });

    // Enhanced error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data as ErrorResponseData;
          const errorMessage = 
            errorData?.error ?? 
            errorData?.message ?? 
            error.message ?? 
            "An unknown error occurred";
          const statusCode = error.response?.status;

          throw new OsintCatError(errorMessage, statusCode, error.response?.data);
        }
        throw error;
      }
    );
  }

  /**
   * Generic request method with proper error handling
   */
  private async makeRequest<T>(
    endpoint: string,
    params?: Record<string, unknown>,
    customHeaders?: Record<string, string>
  ): Promise<OsintResponse<T>> {
    try {
      const response: AxiosResponse<OsintResponse<T>> = await this.client.get(
        endpoint,
        {
          params,
          headers: customHeaders,
        }
      );

      return response.data;
    } catch (error) {
      if (error instanceof OsintCatError) {
        throw error;
      }
      throw new OsintCatError(
        error instanceof Error ? error.message : "Request failed"
      );
    }
  }

  /**
   * Get current user account information and usage statistics
   * 
   * @returns User account information
   * @throws {OsintCatError} If request fails
   */
  async getUserInfo(): Promise<UserInfo> {
    const response: AxiosResponse<UserInfo> = await this.client.get("/api/user");

    if (!response.data) {
      throw new OsintCatError("No user data returned");
    }

    return response.data;
  }

  /**
   * Search multiple breach databases for compromised accounts
   * 
   * @param query - Email address or username to search
   * @returns Breach results from multiple sources
   * @throws {OsintCatError} If request fails
   */
  async searchBreaches(query: string): Promise<OsintResponse<BreachResult>> {
    if (!query || query.trim().length === 0) {
      throw new OsintCatError("Query parameter cannot be empty");
    }
    return this.makeRequest<BreachResult>("/api/breach", { query: query.trim() });
  }

  /**
   * Get Discord user information
   * 
   * @param userId - Discord user ID
   * @returns Discord user profile
   * @throws {OsintCatError} If request fails
   */
  async getDiscordInfo(userId: string): Promise<OsintResponse<DiscordUser>> {
    if (!userId || userId.trim().length === 0) {
      throw new OsintCatError("User ID cannot be empty");
    }
    return this.makeRequest<DiscordUser>("/api/discord", { query: userId.trim() });
  }

  /**
   * Get Roblox user profile information
   * 
   * @param username - Roblox username
   * @returns Roblox profile data
   * @throws {OsintCatError} If request fails
   */
  async getRobloxInfo(username: string): Promise<OsintResponse<RobloxProfile>> {
    if (!username || username.trim().length === 0) {
      throw new OsintCatError("Username cannot be empty");
    }
    return this.makeRequest<RobloxProfile>("/api/roblox", { query: username.trim() });
  }

  /**
   * Get Reddit user profile and activity
   * 
   * @param username - Reddit username
   * @returns Reddit profile data
   * @throws {OsintCatError} If request fails
   */
  async getRedditInfo(username: string): Promise<OsintResponse<RedditProfile>> {
    if (!username || username.trim().length === 0) {
      throw new OsintCatError("Username cannot be empty");
    }
    return this.makeRequest<RedditProfile>("/api/reddit", { query: username.trim() });
  }

  /**
   * Convert Discord ID to linked Roblox account
   * 
   * @param discordId - Discord user ID
   * @returns Linked Roblox account information
   * @throws {OsintCatError} If request fails
   */
  async discordToRoblox(discordId: string): Promise<OsintResponse<DiscordToRobloxResult>> {
    if (!discordId || discordId.trim().length === 0) {
      throw new OsintCatError("Discord ID cannot be empty");
    }
    return this.makeRequest<DiscordToRobloxResult>("/api/discord-to-roblox", { 
      query: discordId.trim() 
    });
  }

  /**
   * Validate and enrich email address information
   * 
   * @param email - Email address to investigate
   * @returns Email validation and metadata
   * @throws {OsintCatError} If request fails
   */
  async getEmailInfo(email: string): Promise<OsintResponse<EmailResult>> {
    if (!email || email.trim().length === 0) {
      throw new OsintCatError("Email cannot be empty");
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      throw new OsintCatError("Invalid email format");
    }
    
    return this.makeRequest<EmailResult>(
      "/api/email-osint", 
      { query: email.trim() },
      { "User-Agent": "Purpose: OSINT Investigation for OsintCat.js/1.1.0 Package" }
    );
  }

  /**
   * Get phone number information and validation
   * 
   * @param phone - Phone number (international format recommended)
   * @returns Phone number metadata and validation
   * @throws {OsintCatError} If request fails
   */
  async getPhoneInfo(phone: string): Promise<OsintResponse<PhoneResult>> {
    if (!phone || phone.trim().length === 0) {
      throw new OsintCatError("Phone number cannot be empty");
    }
    return this.makeRequest<PhoneResult>("/api/phone-osint", { query: phone.trim() });
  }

  /**
   * Search National Public Data records
   * 
   * @param params - Search parameters (firstName, lastName, phone, etc.)
   * @returns NPD search results
   * @throws {OsintCatError} If request fails or no parameters provided
   */
  async searchNPD(params: NPDSearchParams): Promise<OsintResponse<NPDResult>> {
    if (!params || Object.keys(params).length === 0) {
      throw new OsintCatError("At least one search parameter is required");
    }
    return this.makeRequest<NPDResult>("/api/npd", params);
  }

  /**
   * Search domain for associated credentials and data
   * 
   * @param domain - Domain name to search
   * @returns Domain-related breach data
   * @throws {OsintCatError} If request fails
   */
  async searchDomain(domain: string): Promise<OsintResponse<DomainResult>> {
    if (!domain || domain.trim().length === 0) {
      throw new OsintCatError("Domain cannot be empty");
    }
    return this.makeRequest<DomainResult>("/api/domain", { query: domain.trim() });
  }

  /**
   * Get GitHub user profile and repository information
   * 
   * @param username - GitHub username
   * @returns GitHub profile data
   * @throws {OsintCatError} If request fails
   */
  async getGithubInfo(username: string): Promise<OsintResponse<GitHubProfile>> {
    if (!username || username.trim().length === 0) {
      throw new OsintCatError("Username cannot be empty");
    }
    return this.makeRequest<GitHubProfile>("/api/github-osint", { query: username.trim() });
  }

  /**
   * Get detailed Discord user activity and history
   * 
   * @param discordId - Discord user ID
   * @returns Detailed Discord stalker data including messages and activity
   * @throws {OsintCatError} If request fails
   */
  async getDiscordStalkerInfo(discordId: string): Promise<OsintResponse<DiscordStalkerResult>> {
    if (!discordId || discordId.trim().length === 0) {
      throw new OsintCatError("Discord ID cannot be empty");
    }
    return this.makeRequest<DiscordStalkerResult>("/api/discord-stalker", { 
      query: discordId.trim() 
    });
  }

  /**
   * Get IP address geolocation and ISP information
   * 
   * @param ip - IP address (IPv4 or IPv6)
   * @returns IP geolocation and metadata
   * @throws {OsintCatError} If request fails
   */
  async getIPInfo(ip: string): Promise<OsintResponse<IPLookupResult>> {
    if (!ip || ip.trim().length === 0) {
      throw new OsintCatError("IP address cannot be empty");
    }
    return this.makeRequest<IPLookupResult>("/api/ip", { query: ip.trim() });
  }

  /**
   * Resolve DNS records for a domain
   * 
   * @param domain - Domain name to resolve
   * @returns DNS records (A, AAAA, MX, TXT, etc.)
   * @throws {OsintCatError} If request fails
   */
  async resolveDNS(domain: string): Promise<OsintResponse<DNSResult>> {
    if (!domain || domain.trim().length === 0) {
      throw new OsintCatError("Domain cannot be empty");
    }
    return this.makeRequest<DNSResult>("/api/dns-resolver", { query: domain.trim() });
  }

  /**
   * Search for username across multiple platforms and databases
   * 
   * @param username - Username to search
   * @returns Username search results from multiple sources
   * @throws {OsintCatError} If request fails
   */
  async searchUsername(username: string): Promise<OsintResponse<UsernameResult>> {
    if (!username || username.trim().length === 0) {
      throw new OsintCatError("Username cannot be empty");
    }
    return this.makeRequest<UsernameResult>("/api/username", { query: username.trim() });
  }

  /**
   * Search Chilean national database by name
   * 
   * @param name - Full name to search
   * @returns Chilean records matching the name
   * @throws {OsintCatError} If request fails
   */
  async searchChileanName(name: string): Promise<OsintResponse<ChileanNameResult[]>> {
    if (!name || name.trim().length === 0) {
      throw new OsintCatError("Name cannot be empty");
    }
    return this.makeRequest<ChileanNameResult[]>("/api/chilean-name", {
      query: name.trim(),
    });
  }

  /**
   * Search for Minecraft account breaches
   * 
   * @param usernameOrUuid - Minecraft username or UUID
   * @returns Minecraft breach data
   * @throws {OsintCatError} If request fails
   */
  async searchMinecraft(usernameOrUuid: string): Promise<OsintResponse<MinecraftResult>> {
    if (!usernameOrUuid || usernameOrUuid.trim().length === 0) {
      throw new OsintCatError("Username or UUID cannot be empty");
    }
    return this.makeRequest<MinecraftResult>("/api/minecraft", {
      query: usernameOrUuid.trim(),
    });
  }
}

export default OsintCat;