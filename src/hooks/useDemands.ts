import { useEffect, useState } from "react";
import { DemandService } from "../services";
import { Demand, DemandFilters } from "../types";

interface UseDemandsReturn {
  demands: Demand[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  fetchDemands: (filters?: DemandFilters) => Promise<void>;
  refreshDemands: () => Promise<void>;
}

export const useDemands = (
  initialFilters: DemandFilters = {}
): UseDemandsReturn => {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(
    initialFilters.pageNumber || 1
  );
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [currentFilters, setCurrentFilters] =
    useState<DemandFilters>(initialFilters);

  const fetchDemands = async (
    filters: DemandFilters = currentFilters
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await DemandService.getDemandsFiltered(filters);

      setDemands(response.items);
      setTotalCount(response.totalCount);
      setCurrentPage(response.pageNumber);
      setTotalPages(response.totalPages);
      setHasPreviousPage(response.hasPreviousPage);
      setHasNextPage(response.hasNextPage);
      setCurrentFilters(filters);
      setError(null);
    } catch (err: any) {
      setError(`Error al cargar demandas: ${err.message}`);

      setDemands([]);
      setTotalCount(0);
      setCurrentPage(1);
      setTotalPages(0);
      setHasPreviousPage(false);
      setHasNextPage(false);
    } finally {
      setLoading(false);
    }
  };

  const refreshDemands = async (): Promise<void> => {
    await fetchDemands(currentFilters);
  };

  useEffect(() => {
    fetchDemands(initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    demands,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    fetchDemands,
    refreshDemands,
  };
};
