// Entidades principales
export interface Demand {
  id: string;
  title: string;
  description: string;
  priority: string; // "Low", "Medium", "High", "Critical" - como retorna la API
  demandTypeId: string;
  demandTypeName: string; // Campo expandido por la API
  statusId: string;
  statusName: string; // Campo expandido por la API
  requestingUserId: string;
  requestingUserName: string; // Campo expandido por la API
  assignedToId?: string;
  assignedToName?: string; // Campo expandido por la API
  dueDate?: string; // ISO string
  closeDate?: string; // ISO string
  createdDate: string; // ISO string
  updatedDate: string; // ISO string
}

export interface DemandType {
  id: string;
  name: string;
  description?: string;
  serviceLevel?: string; // Campo adicional según documentación
}

export interface Status {
  id: string;
  name: string;
  sequenceOrder?: number; // Campo adicional según documentación
  isFinal?: boolean; // Campo adicional según documentación
  isInitial?: boolean; // Campo adicional según documentación
}

export interface Role {
  id: string;
  name: string;
  description?: string;
}

export interface User {
  id: string;
  fullName: string;
  corporateEmail: string;
  roleId: string;
  department: string;
}

// Enums para prioridad - valores que espera el backend
export enum DemandPriority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  CRITICAL = 3,
}

// DTOs para requests
export interface CreateDemandRequest {
  title: string;
  description?: string;
  priority: number; // 0=Low, 1=Medium, 2=High, 3=Critical
  demandTypeId: string;
  statusId: string;
  requestingUserId: string;
  assignedToId?: string | null;
}

export interface UpdateDemandRequest {
  id: string;
  title: string;
  description?: string;
  priority: number; // 0=Low, 1=Medium, 2=High, 3=Critical
  demandTypeId: string;
  statusId: string; // Incluir statusId en la actualización
  assignedToId?: string | null; // Incluir assignedToId en la actualización
}

// Filtros para búsqueda
export interface DemandFilters {
  demandTypeId?: string;
  statusId?: string;
  priority?: number; // 0-3 según documentación
  searchTerm?: string; // max 200 chars según documentación
  pageNumber?: number; // default: 1
  pageSize?: number; // default: 10, max: 100
}

// Respuestas paginadas
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// Respuesta estándar de la API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Interfaces para Dashboard según documentación
export interface DashboardStats {
  totalDemands: number;
  inProgressDemands: number;
  completedDemands: number;
  criticalDemands: number;
}

export interface DashboardRecentDemand {
  id: string;
  title: string;
  priority: string; // "High", "Low", etc.
  statusName: string;
  demandTypeName: string;
  requestingUserName: string;
  createdDate: string; // ISO string
}

export interface DashboardData {
  stats: DashboardStats;
  recentDemands: DashboardRecentDemand[];
}

// Tipos extendidos para la UI
export interface DemandWithDetails extends Demand {
  demandType?: DemandType;
  status?: Status;
  requestingUser?: User;
  assignedUser?: User;
}
