import {
  BaseRepository,
  LocalStorageCacheStrategy,
} from "../core/BaseRepository";
import { apiService } from "../services/apiService";
import { Demand } from "../types/demand";

class DemandRepository extends BaseRepository<Demand> {
  constructor() {
    // Use localStorage for persistence across sessions
    super(new LocalStorageCacheStrategy());
  }

  async getAll(params?: any): Promise<Demand[]> {
    const cacheKey = this.getCacheKey("getAll", params);

    return this.executeWithFallback(
      () => apiService.get<Demand[]>("/Demand", params),
      cacheKey,
      [] // Empty array as fallback
    );
  }

  async getById(id: string): Promise<Demand> {
    const cacheKey = this.getCacheKey("getById", { id });

    return this.executeWithFallback(
      () => apiService.get<Demand>(`/Demand/${id}`),
      cacheKey
    );
  }

  async create(data: Partial<Demand>): Promise<Demand> {
    if (!this.isOnline) {
      throw new Error("No se puede crear una demanda sin conexión a internet");
    }

    const response = await this.connectionManager.retryWithBackoff(
      () => apiService.post<Demand>("/Demand", data),
      "Create demand"
    );

    // Invalidate list cache when creating
    this.clearCache("getAll");

    return response.data;
  }

  async update(id: string, data: Partial<Demand>): Promise<Demand> {
    if (!this.isOnline) {
      throw new Error(
        "No se puede actualizar una demanda sin conexión a internet"
      );
    }

    const response = await this.connectionManager.retryWithBackoff(
      () => apiService.put<Demand>(`/Demand/${id}`, data),
      "Update demand"
    );

    // Invalidate related caches
    this.clearCache(`getById_${btoa(JSON.stringify({ id }))}`);
    this.clearCache("getAll");

    return response.data;
  }

  async delete(id: string): Promise<void> {
    if (!this.isOnline) {
      throw new Error(
        "No se puede eliminar una demanda sin conexión a internet"
      );
    }

    await this.connectionManager.retryWithBackoff(
      () => apiService.delete(`/Demand/${id}`),
      "Delete demand"
    );

    // Invalidate related caches
    this.clearCache(`getById_${btoa(JSON.stringify({ id }))}`);
    this.clearCache("getAll");
  }

  // Specific methods for Demands
  async getFiltered(filters: any): Promise<Demand[]> {
    const cacheKey = this.getCacheKey("getFiltered", filters);

    return this.executeWithFallback(
      () => apiService.get<Demand[]>("/Demand/filtered", filters),
      cacheKey,
      []
    );
  }

  async getByUser(userId: string): Promise<Demand[]> {
    const cacheKey = this.getCacheKey("getByUser", { userId });

    return this.executeWithFallback(
      () => apiService.get<Demand[]>(`/Demand/user/${userId}`),
      cacheKey,
      []
    );
  }

  // Override onConnectionRestored to refresh critical data
  override onConnectionRestored(): void {
    super.onConnectionRestored();
    // Optionally refresh the most recent demands
    this.getAll().catch(console.error);
  }
}

// Singleton instance
export const demandRepository = new DemandRepository();
export default DemandRepository;
