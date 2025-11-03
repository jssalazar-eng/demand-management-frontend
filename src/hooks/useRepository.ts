import { useCallback, useEffect, useState } from "react";
import type { ConnectionObserver } from "../core/ConnectionManager";
import { connectionManager } from "../core/ConnectionManager";
import { demandRepository } from "../repositories/DemandRepository";
import { Demand } from "../types/demand";

interface UseRepositoryState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isOnline: boolean;
}

// Hook específico para demands con patrón Repository
export function useDemands(filters?: any) {
  const [state, setState] = useState<UseRepositoryState<Demand[]>>({
    data: null,
    loading: true,
    error: null,
    isOnline: navigator.onLine,
  });

  const fetchData = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const result = filters
        ? await demandRepository.getFiltered(filters)
        : await demandRepository.getAll();
      setState((prev) => ({ ...prev, data: result, loading: false }));
    } catch (error: any) {
      const errorMessage = error.message || "Error al cargar las demandas";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
        isOnline: !error.message?.includes("conexión"),
      }));
    }
  }, [filters]);

  // Observer para cambios de conexión
  useEffect(() => {
    const observer: ConnectionObserver = {
      onConnectionChange: (isOnline: boolean) => {
        setState((prev) => ({ ...prev, isOnline }));
        if (isOnline) {
          fetchData();
        }
      },
      onConnectionError: (error: any) => {
        setState((prev) => ({
          ...prev,
          error: error.userMessage || "Error de conexión",
          isOnline: false,
        }));
      },
      onConnectionRestored: () => {
        setState((prev) => ({ ...prev, error: null, isOnline: true }));
      },
    };

    connectionManager.addObserver(observer);
    return () => connectionManager.removeObserver(observer);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearCache = useCallback(() => {
    demandRepository.clearCache();
  }, []);

  return {
    ...state,
    refetch: fetchData,
    clearCache,
  };
}

// Hook específico para una demand por ID
export function useDemand(id: string) {
  const [state, setState] = useState<UseRepositoryState<Demand>>({
    data: null,
    loading: true,
    error: null,
    isOnline: navigator.onLine,
  });

  const fetchData = useCallback(async () => {
    if (!id) return;

    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const result = await demandRepository.getById(id);
      setState((prev) => ({ ...prev, data: result, loading: false }));
    } catch (error: any) {
      const errorMessage = error.message || "Error al cargar la demanda";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
        isOnline: !error.message?.includes("conexión"),
      }));
    }
  }, [id]);

  // Observer para cambios de conexión
  useEffect(() => {
    const observer: ConnectionObserver = {
      onConnectionChange: (isOnline: boolean) => {
        setState((prev) => ({ ...prev, isOnline }));
        if (isOnline) {
          fetchData();
        }
      },
      onConnectionError: (error: any) => {
        setState((prev) => ({
          ...prev,
          error: error.userMessage || "Error de conexión",
          isOnline: false,
        }));
      },
      onConnectionRestored: () => {
        setState((prev) => ({ ...prev, error: null, isOnline: true }));
      },
    };

    connectionManager.addObserver(observer);
    return () => connectionManager.removeObserver(observer);
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const clearCache = useCallback(() => {
    demandRepository.clearCache();
  }, []);

  return {
    ...state,
    refetch: fetchData,
    clearCache,
  };
}

// Hook para operaciones CRUD
export function useDemandOperations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeOperation = async <T>(
    operation: () => Promise<T>,
    successMessage?: string
  ): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();

      if (successMessage) {
        console.info(successMessage);
      }

      return result;
    } catch (error: any) {
      const errorMessage = error.message || "Error en la operación";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createDemand = useCallback((data: Partial<Demand>) => {
    return executeOperation(
      () => demandRepository.create(data),
      "Demanda creada exitosamente"
    );
  }, []);

  const updateDemand = useCallback((id: string, data: Partial<Demand>) => {
    return executeOperation(
      () => demandRepository.update(id, data),
      "Demanda actualizada exitosamente"
    );
  }, []);

  const deleteDemand = useCallback((id: string) => {
    return executeOperation(
      () => demandRepository.delete(id),
      "Demanda eliminada exitosamente"
    );
  }, []);

  return {
    loading,
    error,
    createDemand,
    updateDemand,
    deleteDemand,
    clearError: () => setError(null),
  };
}

// Hook para el estado de conexión global
export function useConnectionStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    const observer: ConnectionObserver = {
      onConnectionChange: setIsOnline,
      onConnectionError: (error: any) => {
        setLastError(error.userMessage || "Error de conexión");
      },
      onConnectionRestored: () => {
        setLastError(null);
      },
    };

    connectionManager.addObserver(observer);
    return () => connectionManager.removeObserver(observer);
  }, []);

  const testConnection = useCallback(() => {
    return connectionManager.testConnection();
  }, []);

  return {
    isOnline,
    lastError,
    testConnection,
  };
}
