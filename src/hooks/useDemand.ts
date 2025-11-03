import { useEffect, useState } from "react";
import { DemandService } from "../services";
import { Demand } from "../types";

interface UseDemandReturn {
  demand: Demand | null;
  loading: boolean;
  error: string | null;
  fetchDemand: (id: string) => Promise<void>;
}

export const useDemand = (id?: string): UseDemandReturn => {
  const [demand, setDemand] = useState<Demand | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDemand = async (demandId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await DemandService.getDemandById(demandId);
      setDemand(response);
    } catch (err) {
      console.warn("API not available, using mock data for demand:", demandId);
      // Datos de prueba cuando la API no está disponible
      const mockDemand: Demand = {
        id: demandId,
        title: `Demanda ${demandId}`,
        description:
          "Esta es una demanda de ejemplo para mostrar la funcionalidad cuando la API no está disponible.",
        status: "PENDING" as any,
        priority: "HIGH" as any,
        requester: "Usuario Demo",
        assignee: "Desarrollador 1",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-16"),
        category: "Desarrollo",
        estimatedHours: 8,
        dueDate: new Date("2024-02-01"),
      };

      setDemand(mockDemand);
      setError("API no disponible - Mostrando datos de ejemplo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDemand(id);
    }
  }, [id]);

  return {
    demand,
    loading,
    error,
    fetchDemand,
  };
};
