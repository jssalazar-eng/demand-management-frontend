// Patrón Observer para el estado de conexión
export interface ConnectionObserver {
  onConnectionChange(isOnline: boolean): void;
  onConnectionError(error: any): void;
  onConnectionRestored(): void;
}

class ConnectionManager {
  private static instance: ConnectionManager;
  private observers: ConnectionObserver[] = [];
  private isOnline: boolean = navigator.onLine;
  private maxRetries: number = 3;
  private retryDelay: number = 1000;

  private constructor() {
    this.setupConnectionListeners();
  }

  public static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  public addObserver(observer: ConnectionObserver): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: ConnectionObserver): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  private notifyObservers(
    method: keyof ConnectionObserver,
    ...args: any[]
  ): void {
    this.observers.forEach((observer) => {
      const observerMethod = observer[method] as Function;
      if (observerMethod) {
        observerMethod.apply(observer, args);
      }
    });
  }

  private setupConnectionListeners(): void {
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.notifyObservers("onConnectionChange", true);
      this.notifyObservers("onConnectionRestored");
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
      this.notifyObservers("onConnectionChange", false);
    });
  }

  public async testConnection(): Promise<boolean> {
    try {
      const response = await fetch("/api/health", {
        method: "HEAD",
        cache: "no-cache",
        signal: AbortSignal.timeout(5000),
      });

      const connectionRestored = !this.isOnline && response.ok;
      this.isOnline = response.ok;

      if (connectionRestored) {
        this.notifyObservers("onConnectionRestored");
      }

      this.notifyObservers("onConnectionChange", this.isOnline);
      return this.isOnline;
    } catch (error) {
      this.isOnline = false;
      this.notifyObservers("onConnectionChange", false);
      this.notifyObservers("onConnectionError", error);
      return false;
    }
  }

  public async retryWithBackoff<T>(
    operation: () => Promise<T>,
    context?: string
  ): Promise<T> {
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const result = await operation();
        if (attempt > 0) {
          // Connection restored after retry
          this.notifyObservers("onConnectionRestored");
        }
        return result;
      } catch (error: any) {
        if (attempt === this.maxRetries) {
          this.notifyObservers("onConnectionError", {
            ...error,
            context,
            attemptsExhausted: true,
          });
          throw error;
        }

        // Exponential backoff
        const delay = this.retryDelay * Math.pow(2, attempt);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    throw new Error("Max retries exceeded");
  }

  public getConnectionStatus(): boolean {
    return this.isOnline;
  }
}

// Create and export singleton instance
const connectionManager = ConnectionManager.getInstance();
export { connectionManager };
export default ConnectionManager;
