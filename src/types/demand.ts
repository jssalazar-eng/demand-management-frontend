export interface Demand {
  id: string;
  title: string;
  description: string;
  status: DemandStatus;
  priority: DemandPriority;
  requester: string;
  assignee?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  category: string;
  estimatedHours?: number;
  actualHours?: number;
}

export enum DemandStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  ON_HOLD = "ON_HOLD",
}

export enum DemandPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface CreateDemandRequest {
  title: string;
  description: string;
  priority: DemandPriority;
  requester: string;
  category: string;
  dueDate?: Date;
  estimatedHours?: number;
}

export interface UpdateDemandRequest {
  title?: string;
  description?: string;
  status?: DemandStatus;
  priority?: DemandPriority;
  assignee?: string;
  dueDate?: Date;
  estimatedHours?: number;
  actualHours?: number;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
