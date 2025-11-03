import { useEffect, useState } from "react";
import { DemandService } from "../services";
import { Demand } from "../types";

interface UseDemandReturn {
  demand: Demand | null;
  loading: boolean;
  error: string | null;
  isDemoMode: boolean;
  fetchDemand: (id: string) => Promise<void>;
}

export const useDemand = (id?: string): UseDemandReturn => {
  const [demand, setDemand] = useState<Demand | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);

  const fetchDemand = async (demandId: string): Promise<void> => {
    setLoading(true);
    setError(null);
    setIsDemoMode(false);

    try {
      const response = await DemandService.getDemandById(demandId);

      setDemand(response);
      setError(null);
    } catch (err: any) {
      setError(`Error al cargar demanda: ${err.message}`);
      setDemand(null);
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
    isDemoMode,
    fetchDemand,
  };
};
