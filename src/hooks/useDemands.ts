import { useEffect, useState } from "react";
import { DemandService } from "../services";
import { Demand, PaginatedResponse } from "../types";

interface UseDemandReturn {
  demands: Demand[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  totalPages: number;
  fetchDemands: (page?: number, pageSize?: number) => Promise<void>;
  refreshDemands: () => Promise<void>;
}

export const useDemands = (
  initialPage: number = 1,
  initialPageSize: number = 10
): UseDemandReturn => {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize] = useState<number>(initialPageSize);

  const fetchDemands = async (
    page: number = currentPage,
    size: number = pageSize
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response: PaginatedResponse<Demand> =
        await DemandService.getDemands(page, size);
      setDemands(response.data);
      setTotalCount(response.totalCount);
      setCurrentPage(response.pageNumber);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.warn("API not available, using mock data:", err);
      // Datos de prueba cuando la API no está disponible
      const mockDemands: Demand[] = [
        {
          id: "1",
          title: "Demanda de Ejemplo 1",
          description:
            "Esta es una demanda de ejemplo para mostrar la funcionalidad",
          status: "PENDING" as any,
          priority: "HIGH" as any,
          requester: "Usuario Demo",
          createdAt: new Date("2024-01-15"),
          updatedAt: new Date("2024-01-15"),
          category: "Desarrollo",
        },
        {
          id: "2",
          title: "Demanda de Ejemplo 2",
          description: "Segunda demanda de ejemplo",
          status: "IN_PROGRESS" as any,
          priority: "MEDIUM" as any,
          requester: "Otro Usuario",
          assignee: "Desarrollador 1",
          createdAt: new Date("2024-01-10"),
          updatedAt: new Date("2024-01-16"),
          category: "Soporte",
        },
      ];

      setDemands(mockDemands);
      setTotalCount(mockDemands.length);
      setCurrentPage(page);
      setTotalPages(1);
      setError("API no disponible - Mostrando datos de ejemplo");
    } finally {
      setLoading(false);
    }
  };

  const refreshDemands = async (): Promise<void> => {
    await fetchDemands(currentPage, pageSize);
  };

  useEffect(() => {
    fetchDemands(initialPage, initialPageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    demands,
    loading,
    error,
    totalCount,
    currentPage,
    totalPages,
    fetchDemands,
    refreshDemands,
  };
};
