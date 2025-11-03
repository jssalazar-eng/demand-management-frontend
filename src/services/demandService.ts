import {
  ApiResponse,
  CreateDemandRequest,
  Demand,
  PaginatedResponse,
  UpdateDemandRequest,
} from "../types";
import { API_ENDPOINTS } from "../utils/config";
import { apiService } from "./apiService";

export class DemandService {
  static async getDemands(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Demand>> {
    try {
      const response = await apiService.get<PaginatedResponse<Demand>>(
        API_ENDPOINTS.DEMANDS,
        { page, pageSize }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching demands:", error);
      throw error;
    }
  }

  static async getDemandById(id: string): Promise<Demand> {
    try {
      const response = await apiService.get<ApiResponse<Demand>>(
        `${API_ENDPOINTS.DEMANDS}/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching demand:", error);
      throw error;
    }
  }

  static async createDemand(demand: CreateDemandRequest): Promise<Demand> {
    try {
      const response = await apiService.post<ApiResponse<Demand>>(
        API_ENDPOINTS.DEMANDS,
        demand
      );
      return response.data.data;
    } catch (error) {
      console.error("Error creating demand:", error);
      throw error;
    }
  }

  static async updateDemand(
    id: string,
    demand: UpdateDemandRequest
  ): Promise<Demand> {
    try {
      const response = await apiService.put<ApiResponse<Demand>>(
        `${API_ENDPOINTS.DEMANDS}/${id}`,
        demand
      );
      return response.data.data;
    } catch (error) {
      console.error("Error updating demand:", error);
      throw error;
    }
  }

  static async deleteDemand(id: string): Promise<void> {
    try {
      await apiService.delete(`${API_ENDPOINTS.DEMANDS}/${id}`);
    } catch (error) {
      console.error("Error deleting demand:", error);
      throw error;
    }
  }

  static async searchDemands(query: string): Promise<Demand[]> {
    try {
      const response = await apiService.get<ApiResponse<Demand[]>>(
        `${API_ENDPOINTS.DEMANDS}/search`,
        { q: query }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error searching demands:", error);
      throw error;
    }
  }
}
