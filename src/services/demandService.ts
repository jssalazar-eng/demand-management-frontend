import {
  CreateDemandRequest,
  Demand,
  DemandFilters,
  DemandType,
  PaginatedResponse,
  Role,
  Status,
  UpdateDemandRequest,
  User,
} from "../types";
import { API_ENDPOINTS } from "../utils/config";
import { apiService } from "./apiService";

export class DemandService {
  // Demand endpoints
  static async getDemands(): Promise<Demand[]> {
    try {
      const response = await apiService.get<Demand[]>(API_ENDPOINTS.DEMANDS);
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  static async getDemandsFiltered(
    filters: DemandFilters = {}
  ): Promise<PaginatedResponse<Demand>> {
    try {
      const params = {
        demandTypeId: filters.demandTypeId,
        statusId: filters.statusId,
        priority: filters.priority,
        searchTerm: filters.searchTerm,
        pageNumber: filters.pageNumber || 1,
        pageSize: filters.pageSize || 10,
      };

      // Remove undefined values
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => value !== undefined)
      );

      const response = await apiService.get<PaginatedResponse<Demand>>(
        API_ENDPOINTS.DEMANDS_FILTERED,
        cleanParams
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getDemandById(id: string): Promise<Demand> {
    try {
      const response = await apiService.get<Demand>(
        API_ENDPOINTS.DEMAND_BY_ID(id)
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
  static async createDemand(demand: CreateDemandRequest): Promise<Demand> {
    try {
      // Estructura exacta que espera el backend según documentación
      const payload = {
        title: demand.title,
        description: demand.description || "",
        priority: demand.priority, // 0=Low, 1=Medium, 2=High, 3=Critical
        demandTypeId: demand.demandTypeId,
        statusId: demand.statusId,
        requestingUserId: demand.requestingUserId,
        assignedToId: demand.assignedToId || null,
      };

      const response = await apiService.post<Demand>(
        API_ENDPOINTS.DEMANDS,
        payload
      );
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  static async updateDemand(
    id: string,
    demand: UpdateDemandRequest
  ): Promise<Demand> {
    try {
      const response = await apiService.put<Demand>(
        API_ENDPOINTS.DEMAND_BY_ID(id),
        { ...demand, id }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteDemand(id: string): Promise<void> {
    try {
      await apiService.delete(API_ENDPOINTS.DEMAND_BY_ID(id));
    } catch (error) {
      throw error;
    }
  }
}

export class DemandTypeService {
  static async getDemandTypes(): Promise<DemandType[]> {
    try {
      const response = await apiService.get<DemandType[]>(
        API_ENDPOINTS.DEMAND_TYPES
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getDemandTypeById(id: string): Promise<DemandType> {
    try {
      const response = await apiService.get<DemandType>(
        API_ENDPOINTS.DEMAND_TYPE_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export class StatusService {
  static async getStatuses(): Promise<Status[]> {
    try {
      const response = await apiService.get<Status[]>(API_ENDPOINTS.STATUS);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getStatusById(id: string): Promise<Status> {
    try {
      const response = await apiService.get<Status>(
        API_ENDPOINTS.STATUS_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export class UserService {
  static async getUsers(): Promise<User[]> {
    try {
      const response = await apiService.get<User[]>(API_ENDPOINTS.USERS);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id: string): Promise<User> {
    try {
      const response = await apiService.get<User>(API_ENDPOINTS.USER_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export class RoleService {
  static async getRoles(): Promise<Role[]> {
    try {
      const response = await apiService.get<Role[]>(API_ENDPOINTS.ROLES);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getRoleById(id: string): Promise<Role> {
    try {
      const response = await apiService.get<Role>(API_ENDPOINTS.ROLE_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
