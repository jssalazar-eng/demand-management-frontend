import { AxiosResponse } from "axios";
import ConnectionManager, { ConnectionObserver } from "./ConnectionManager";

// Patrón Strategy para diferentes tipos de caché
export interface CacheStrategy {
  get<T>(key: string): T | null;
  set<T>(key: string, data: T, ttl?: number): void;
  clear(key?: string): void;
}

class MemoryCacheStrategy implements CacheStrategy {
  private cache = new Map<string, { data: any; expires: number }>();

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  set<T>(key: string, data: T, ttl = 300000): void {
    // 5 min default
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl,
    });
  }

  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}

class LocalStorageCacheStrategy implements CacheStrategy {
  private prefix = "haceb_cache_";

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      if (Date.now() > parsed.expires) {
        localStorage.removeItem(this.prefix + key);
        return null;
      }

      return parsed.data as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, data: T, ttl = 300000): void {
    try {
      const item = {
        data,
        expires: Date.now() + ttl,
      };
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }

  clear(key?: string): void {
    if (key) {
      localStorage.removeItem(this.prefix + key);
    } else {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(this.prefix))
        .forEach((k) => localStorage.removeItem(k));
    }
  }
}

// Patrón Repository
export abstract class BaseRepository<T> implements ConnectionObserver {
  protected connectionManager: ConnectionManager;
  protected cacheStrategy: CacheStrategy;
  protected isOnline: boolean = true;

  constructor(cacheStrategy: CacheStrategy = new MemoryCacheStrategy()) {
    this.connectionManager = ConnectionManager.getInstance();
    this.cacheStrategy = cacheStrategy;
    this.connectionManager.addObserver(this);
  }

  // ConnectionObserver implementation
  onConnectionChange(isOnline: boolean): void {
    this.isOnline = isOnline;
  }

  onConnectionError(error: any): void {
    console.warn(`Connection error in ${this.constructor.name}:`, error);
  }

  onConnectionRestored(): void {
    console.info(`Connection restored in ${this.constructor.name}`);
    // Optionally refresh critical data
    this.onConnectionRestored();
  }

  // Repository methods
  protected getCacheKey(method: string, params?: any): string {
    const baseKey = `${this.constructor.name.toLowerCase()}_${method}`;
    if (params) {
      const paramString = JSON.stringify(params);
      return `${baseKey}_${btoa(paramString)}`;
    }
    return baseKey;
  }

  protected async executeWithFallback<R>(
    operation: () => Promise<AxiosResponse<R>>,
    cacheKey: string,
    fallbackData?: R
  ): Promise<R> {
    // Try cache first if offline
    if (!this.isOnline) {
      const cached = this.cacheStrategy.get<R>(cacheKey);
      if (cached) {
        console.info(`Using cached data for ${cacheKey}`);
        return cached;
      }

      if (fallbackData) {
        console.info(`Using fallback data for ${cacheKey}`);
        return fallbackData;
      }

      throw new Error("Sin conexión y no hay datos en caché disponibles");
    }

    try {
      // Try operation with retry logic
      const response = await this.connectionManager.retryWithBackoff(
        () => operation(),
        `${this.constructor.name} operation`
      );

      // Cache successful response
      this.cacheStrategy.set(cacheKey, response.data);
      return response.data;
    } catch (error: any) {
      // Try cache as fallback
      const cached = this.cacheStrategy.get<R>(cacheKey);
      if (cached) {
        console.warn(`API failed, using cached data for ${cacheKey}:`, error);
        return cached;
      }

      // Use fallback data if available
      if (fallbackData) {
        console.warn(
          `API and cache failed, using fallback for ${cacheKey}:`,
          error
        );
        return fallbackData;
      }

      throw error;
    }
  }

  // Abstract methods that child classes must implement
  abstract getAll(params?: any): Promise<T[]>;
  abstract getById(id: string): Promise<T>;
  abstract create(data: Partial<T>): Promise<T>;
  abstract update(id: string, data: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<void>;

  // Optional cache management
  public clearCache(specific?: string): void {
    if (specific) {
      this.cacheStrategy.clear(specific);
    } else {
      this.cacheStrategy.clear();
    }
  }

  public setCacheStrategy(strategy: CacheStrategy): void {
    this.cacheStrategy = strategy;
  }
}

export { LocalStorageCacheStrategy, MemoryCacheStrategy };
