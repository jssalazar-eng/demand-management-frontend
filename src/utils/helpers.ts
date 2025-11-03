import { DemandPriority, DemandStatus } from "../types";

export const formatDate = (date: Date | string): string => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDateTime = (date: Date | string): string => {
  if (!date) return "";
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (
  status: DemandStatus
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  switch (status) {
    case DemandStatus.PENDING:
      return "warning";
    case DemandStatus.IN_PROGRESS:
      return "info";
    case DemandStatus.COMPLETED:
      return "success";
    case DemandStatus.CANCELLED:
      return "error";
    case DemandStatus.ON_HOLD:
      return "default";
    default:
      return "default";
  }
};

export const getPriorityColor = (
  priority: DemandPriority
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  switch (priority) {
    case DemandPriority.LOW:
      return "success";
    case DemandPriority.MEDIUM:
      return "info";
    case DemandPriority.HIGH:
      return "warning";
    case DemandPriority.URGENT:
      return "error";
    default:
      return "default";
  }
};

export const getStatusLabel = (status: DemandStatus): string => {
  switch (status) {
    case DemandStatus.PENDING:
      return "Pendiente";
    case DemandStatus.IN_PROGRESS:
      return "En Progreso";
    case DemandStatus.COMPLETED:
      return "Completado";
    case DemandStatus.CANCELLED:
      return "Cancelado";
    case DemandStatus.ON_HOLD:
      return "En Espera";
    default:
      return status;
  }
};

export const getPriorityLabel = (priority: DemandPriority): string => {
  switch (priority) {
    case DemandPriority.LOW:
      return "Baja";
    case DemandPriority.MEDIUM:
      return "Media";
    case DemandPriority.HIGH:
      return "Alta";
    case DemandPriority.URGENT:
      return "Urgente";
    default:
      return priority;
  }
};
