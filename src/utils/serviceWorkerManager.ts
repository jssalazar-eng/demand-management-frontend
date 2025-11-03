import React from "react";

// Utility para registrar y manejar Service Worker

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null;
  private isSupported: boolean = false;

  constructor() {
    this.isSupported = "serviceWorker" in navigator;
  }

  // Registrar el Service Worker
  async register(): Promise<boolean> {
    if (!this.isSupported) {
      console.warn("Service Worker no es soportado en este navegador");
      return false;
    }

    try {
      this.registration = await navigator.serviceWorker.register("/sw.js");

      console.info(
        "Service Worker registrado exitosamente:",
        this.registration
      );

      // Escuchar actualizaciones
      this.registration.addEventListener("updatefound", () => {
        const newWorker = this.registration?.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // Nueva versión disponible
              this.notifyUpdate();
            }
          });
        }
      });

      // Escuchar mensajes del Service Worker
      navigator.serviceWorker.addEventListener("message", (event) => {
        this.handleServiceWorkerMessage(event.data);
      });

      return true;
    } catch (error) {
      console.error("Error registrando Service Worker:", error);
      return false;
    }
  }

  // Manejar mensajes del Service Worker
  private handleServiceWorkerMessage(data: any): void {
    switch (data.type) {
      case "CACHE_USED":
        console.info(`Usando datos en caché para: ${data.url}`);
        // Aquí podrías mostrar una notificación al usuario
        break;
      default:
        console.debug("Mensaje del Service Worker:", data);
    }
  }

  // Notificar sobre actualización disponible
  private notifyUpdate(): void {
    const shouldUpdate = window.confirm(
      "Una nueva versión está disponible. ¿Desea actualizar?"
    );

    if (shouldUpdate) {
      this.skipWaiting();
    }
  }

  // Saltar espera y activar nueva versión
  async skipWaiting(): Promise<void> {
    if (this.registration?.waiting) {
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  }

  // Limpiar cache
  async clearCache(): Promise<boolean> {
    if (!this.registration?.active) {
      return false;
    }

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.success);
      };

      this.registration?.active?.postMessage({ type: "CLEAR_CACHE" }, [
        messageChannel.port2,
      ]);
    });
  }

  // Obtener estado del cache
  async getCacheStatus(): Promise<any> {
    if (!this.registration?.active) {
      return null;
    }

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();

      messageChannel.port1.onmessage = (event) => {
        resolve(event.data);
      };

      this.registration?.active?.postMessage({ type: "GET_CACHE_STATUS" }, [
        messageChannel.port2,
      ]);
    });
  }

  // Verificar si está en modo offline
  isOffline(): boolean {
    return !navigator.onLine;
  }

  // Obtener información del Service Worker
  getInfo(): any {
    return {
      isSupported: this.isSupported,
      isRegistered: !!this.registration,
      isActive: !!this.registration?.active,
      state: this.registration?.active?.state,
      scope: this.registration?.scope,
    };
  }
}

// Singleton instance
export const serviceWorkerManager = new ServiceWorkerManager();

// Hook para usar Service Worker en React
export function useServiceWorker() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [cacheStatus, setCacheStatus] = React.useState<any>(null);

  React.useEffect(() => {
    const registerSW = async () => {
      const registered = await serviceWorkerManager.register();
      setIsRegistered(registered);

      if (registered) {
        const status = await serviceWorkerManager.getCacheStatus();
        setCacheStatus(status);
      }
    };

    registerSW();
  }, []);

  const clearCache = React.useCallback(async () => {
    const success = await serviceWorkerManager.clearCache();
    if (success) {
      const status = await serviceWorkerManager.getCacheStatus();
      setCacheStatus(status);
    }
    return success;
  }, []);

  const refreshCacheStatus = React.useCallback(async () => {
    const status = await serviceWorkerManager.getCacheStatus();
    setCacheStatus(status);
  }, []);

  return {
    isRegistered,
    cacheStatus,
    clearCache,
    refreshCacheStatus,
    serviceWorkerInfo: serviceWorkerManager.getInfo(),
  };
}

export default ServiceWorkerManager;
