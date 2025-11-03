import { useCallback, useEffect, useState } from "react";
import { DashboardData, DashboardService } from "../services/DashboardService";

export const useDashboard = (recentCount: number = 5) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await DashboardService.getDashboard(recentCount);
      setDashboardData(data);
    } catch (err: any) {
      let errorMessage = "Error al cargar los datos del dashboard";
      
      // Detectar errores de conexión
      if (err.isNetworkError || !err.response) {
        errorMessage = "Sin conexión a internet. Verifica tu conexión e intenta nuevamente.";
      } else if (err.userMessage) {
        errorMessage = err.userMessage;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [recentCount]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboardData,
    loading,
    error,
    refetch: fetchDashboard,
  };
};
