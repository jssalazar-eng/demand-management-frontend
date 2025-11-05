import axios from "axios";
import { API_CONFIG, CONTENT_TYPES } from "../constants/api";

// Configure API client
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || API_CONFIG.DEFAULT_BASE_URL,
  timeout: API_CONFIG.DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": CONTENT_TYPES.JSON,
  },
});

// Interfaces para las opciones de los combobox
export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface DemandTypeOption extends SelectOption {
  priority?: number;
}

export interface BusinessUnitOption extends SelectOption {
  code?: string;
  manager?: string;
}

export interface CategoryOption extends SelectOption {
  group?: string;
}

// Servicios para obtener opciones de combobox
export class ComboboxOptionsService {
  /**
   * Obtiene los tipos de demanda disponibles
   */
  static async getDemandTypes(): Promise<DemandTypeOption[]> {
    try {
      const response = await apiClient.get("/api/catalog/demand-types");
      return response.data.map((item: any) => ({
        value: item.code,
        label: item.name,
        description: item.description,
        priority: item.priority,
      }));
    } catch (error) {
      console.warn("Error loading demand types, using fallback:", error);
      // Fallback options si falla la API
      return [
        { value: "feature", label: "Nueva Funcionalidad", priority: 1 },
        { value: "bug", label: "Corrección de Error", priority: 2 },
        { value: "enhancement", label: "Mejora", priority: 3 },
        { value: "maintenance", label: "Mantenimiento", priority: 4 },
        { value: "research", label: "Investigación", priority: 5 },
      ];
    }
  }

  /**
   * Obtiene los niveles de urgencia
   */
  static async getUrgencyLevels(): Promise<SelectOption[]> {
    try {
      const response = await apiClient.get("/api/catalog/urgency-levels");
      return response.data.map((item: any) => ({
        value: item.code,
        label: item.name,
        description: item.description,
      }));
    } catch (error) {
      console.warn("Error loading urgency levels, using fallback:", error);
      return [
        { value: "low", label: "Baja" },
        { value: "medium", label: "Media" },
        { value: "high", label: "Alta" },
        { value: "critical", label: "Crítica" },
      ];
    }
  }

  /**
   * Obtiene los niveles de impacto en el negocio
   */
  static async getBusinessImpactLevels(): Promise<SelectOption[]> {
    try {
      const response = await apiClient.get(
        "/api/catalog/business-impact-levels"
      );
      return response.data.map((item: any) => ({
        value: item.code,
        label: item.name,
        description: item.description,
      }));
    } catch (error) {
      console.warn(
        "Error loading business impact levels, using fallback:",
        error
      );
      return [
        { value: "low", label: "Bajo" },
        { value: "medium", label: "Medio" },
        { value: "high", label: "Alto" },
      ];
    }
  }

  /**
   * Obtiene los niveles de complejidad
   */
  static async getComplexityLevels(): Promise<SelectOption[]> {
    try {
      const response = await apiClient.get("/api/catalog/complexity-levels");
      return response.data.map((item: any) => ({
        value: item.code,
        label: item.name,
        description: item.description,
      }));
    } catch (error) {
      console.warn("Error loading complexity levels, using fallback:", error);
      return [
        { value: "low", label: "Baja" },
        { value: "medium", label: "Media" },
        { value: "high", label: "Alta" },
      ];
    }
  }

  /**
   * Obtiene las unidades de negocio
   */
  static async getBusinessUnits(): Promise<BusinessUnitOption[]> {
    try {
      const response = await apiClient.get("/api/catalog/business-units");
      return response.data.map((item: any) => ({
        value: item.code,
        label: item.name,
        description: item.description,
        code: item.code,
        manager: item.manager,
      }));
    } catch (error) {
      console.warn("Error loading business units, using fallback:", error);
      return [
        { value: "sales", label: "Ventas", code: "VNT" },
        { value: "marketing", label: "Marketing", code: "MKT" },
        { value: "it", label: "Tecnología", code: "TEC" },
        { value: "hr", label: "Recursos Humanos", code: "RRH" },
        { value: "finance", label: "Finanzas", code: "FIN" },
        { value: "operations", label: "Operaciones", code: "OPE" },
      ];
    }
  }

  /**
   * Obtiene las categorías técnicas
   */
  static async getCategories(): Promise<CategoryOption[]> {
    try {
      const response = await apiClient.get("/api/catalog/categories");
      return response.data.map((item: any) => ({
        value: item.code,
        label: item.name,
        description: item.description,
        group: item.group,
      }));
    } catch (error) {
      console.warn("Error loading categories, using fallback:", error);
      return [
        { value: "frontend", label: "Frontend", group: "desarrollo" },
        { value: "backend", label: "Backend", group: "desarrollo" },
        { value: "database", label: "Base de Datos", group: "datos" },
        {
          value: "infrastructure",
          label: "Infraestructura",
          group: "sistemas",
        },
        { value: "integration", label: "Integración", group: "sistemas" },
        { value: "security", label: "Seguridad", group: "sistemas" },
      ];
    }
  }

  /**
   * Obtiene todos los catálogos necesarios para el formulario
   */
  static async getAllCatalogs() {
    try {
      const [
        demandTypes,
        urgencyLevels,
        businessImpactLevels,
        complexityLevels,
        businessUnits,
        categories,
      ] = await Promise.all([
        this.getDemandTypes(),
        this.getUrgencyLevels(),
        this.getBusinessImpactLevels(),
        this.getComplexityLevels(),
        this.getBusinessUnits(),
        this.getCategories(),
      ]);

      return {
        demandTypes,
        urgencyLevels,
        businessImpactLevels,
        complexityLevels,
        businessUnits,
        categories,
      };
    } catch (error) {
      console.error("Error loading catalogs:", error);
      throw error;
    }
  }
}
