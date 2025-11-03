import { DemandPriority } from "../types";

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

// Helper para obtener el color del estado (ahora genérico para cualquier status)
export const getStatusColor = (
  statusName?: string
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  if (!statusName) return "default";

  const lowerStatus = statusName.toLowerCase();

  if (lowerStatus.includes("pending") || lowerStatus.includes("pendiente")) {
    return "warning";
  }
  if (lowerStatus.includes("progress") || lowerStatus.includes("progreso")) {
    return "info";
  }
  if (
    lowerStatus.includes("completed") ||
    lowerStatus.includes("completado") ||
    lowerStatus.includes("finished")
  ) {
    return "success";
  }
  if (
    lowerStatus.includes("cancelled") ||
    lowerStatus.includes("cancelado") ||
    lowerStatus.includes("rejected")
  ) {
    return "error";
  }
  if (
    lowerStatus.includes("hold") ||
    lowerStatus.includes("espera") ||
    lowerStatus.includes("paused")
  ) {
    return "default";
  }

  return "primary";
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
    case DemandPriority.CRITICAL:
      return "error";
    default:
      return "default";
  }
};

export const getPriorityLabel = (priority: any): string => {
  if (typeof priority === "number") {
    return formatPriorityNumber(priority);
  }
  if (typeof priority === "string") {
    return priority;
  }
  if (typeof priority === "object" && priority?.name) {
    return priority.name;
  }
  // Compatibilidad con valores del backend (0, 1, 2, 3)
  if (priority === 0 || priority === DemandPriority.LOW) return "Baja";
  if (priority === 1 || priority === DemandPriority.MEDIUM) return "Media";
  if (priority === 2 || priority === DemandPriority.HIGH) return "Alta";
  if (priority === 3 || priority === DemandPriority.CRITICAL) return "Crítica";

  return "Prioridad Desconocida";
};

// Helper para convertir fecha ISO string a Date
export const parseISODate = (isoString?: string): Date | undefined => {
  if (!isoString) return undefined;
  return new Date(isoString);
};

// Helper para convertir Date a ISO string
export const toISOString = (date?: Date): string | undefined => {
  if (!date) return undefined;
  return date.toISOString();
};

// Helper para formatear prioridad numérica
export const formatPriorityNumber = (priority: number): string => {
  switch (priority) {
    case 1:
      return "Baja";
    case 2:
      return "Media";
    case 3:
      return "Alta";
    case 4:
      return "Urgente";
    default:
      return `Prioridad ${priority}`;
  }
};

// Helper para obtener el nombre de estado genérico (para compatibilidad)
export const getStatusLabel = (status: any): string => {
  if (typeof status === "string") {
    return status;
  }
  if (typeof status === "object" && status?.name) {
    return status.name;
  }
  return "Estado Desconocido";
};
