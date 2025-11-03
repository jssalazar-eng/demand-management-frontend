// Entidades principales
export interface Demand {
  id: string;
  title: string;
  description: string;
  priority: DemandPriority;
  demandTypeId: string;
  statusId: string;
  requestingUserId: string;
  assignedToId?: string;
  dueDate?: string; // ISO string
  closeDate?: string; // ISO string
  createdDate: string; // ISO string
  updatedDate: string; // ISO string
}

export interface DemandType {
  id: string;
  name: string;
  description?: string;
}

export interface Status {
  id: string;
  name: string;
  description?: string;
  color?: string;
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
  cmd: string;
  title: string;
  description: string;
  priority: number; // 0=Low, 1=Medium, 2=High, 3=Critical
  demandTypeId: string;
  statusId: string;
  requestingUserId: string;
  assignedToId?: string | null;
  dueDate?: string | null; // ISO string
}

export interface UpdateDemandRequest {
  id: string;
  title?: string;
  description?: string;
  priority?: DemandPriority;
  demandTypeId?: string;
  statusId?: string;
  assignedToId?: string;
  dueDate?: string; // ISO string
}

// Filtros para búsqueda
export interface DemandFilters {
  demandTypeId?: string;
  statusId?: string;
  priority?: DemandPriority;
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
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
  errors?: string[];
}

// Tipos extendidos para la UI
export interface DemandWithDetails extends Demand {
  demandType?: DemandType;
  status?: Status;
  requestingUser?: User;
  assignedUser?: User;
}
