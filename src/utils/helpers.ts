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
  priority: string | DemandPriority
):
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  // Manejo tanto de strings como enums
  const priorityStr =
    typeof priority === "string" ? priority.toLowerCase() : "";

  if (
    priority === DemandPriority.LOW ||
    priorityStr === "low" ||
    priorityStr === "baja"
  ) {
    return "success";
  }
  if (
    priority === DemandPriority.MEDIUM ||
    priorityStr === "medium" ||
    priorityStr === "media"
  ) {
    return "info";
  }
  if (
    priority === DemandPriority.HIGH ||
    priorityStr === "high" ||
    priorityStr === "alta"
  ) {
    return "warning";
  }
  if (
    priority === DemandPriority.CRITICAL ||
    priorityStr === "critical" ||
    priorityStr === "crítica"
  ) {
    return "error";
  }
  return "default";
};

export const getPriorityLabel = (priority: any): string => {
  // Si es un string, intentar traducirlo del inglés al español
  if (typeof priority === "string") {
    const priorityLower = priority.toLowerCase().trim();

    // Mapeo de strings en inglés a español
    switch (priorityLower) {
      case "low":
      case "baja":
        return "Baja";
      case "medium":
      case "media":
        return "Media";
      case "high":
      case "alta":
        return "Alta";
      case "critical":
      case "crítica":
        return "Crítica";
      default:
        return priority; // Devolver el original si no reconocemos el valor
    }
  }

  // Si es un número o enum
  if (typeof priority === "number") {
    return formatPriorityNumber(priority);
  }

  // Si es un objeto con propiedad name
  if (typeof priority === "object" && priority?.name) {
    return getPriorityLabel(priority.name); // Recursión para procesar el name
  }

  // Compatibilidad con valores del backend y enum
  if (priority === 0 || priority === DemandPriority.LOW) return "Baja";
  if (priority === 1 || priority === DemandPriority.MEDIUM) return "Media";
  if (priority === 2 || priority === DemandPriority.HIGH) return "Alta";
  if (priority === 3 || priority === DemandPriority.CRITICAL) return "Crítica";

  return String(priority || "N/A");
};

// Helper function para obtener todas las opciones de prioridad
export const getPriorityOptions = () => [
  { value: DemandPriority.LOW, label: "Baja" },
  { value: DemandPriority.MEDIUM, label: "Media" },
  { value: DemandPriority.HIGH, label: "Alta" },
  { value: DemandPriority.CRITICAL, label: "Crítica" },
];

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
    case 0:
      return "Baja";
    case 1:
      return "Media";
    case 2:
      return "Alta";
    case 3:
      return "Crítica";
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
