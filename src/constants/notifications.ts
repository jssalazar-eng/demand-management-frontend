/**
 * Constantes relacionadas con notificaciones
 */

// Duraciones de notificaciones (en milisegundos)
export const NOTIFICATION_DURATIONS = {
  DEFAULT: 4000,
  SUCCESS: 3000,
  ERROR: 6000,
  WARNING: 5000,
  INFO: 4000,
  SHORT: 2000,
  LONG: 8000,
} as const;

// Tipos de notificación
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  DEFAULT: "default",
} as const;

// Posiciones de notificación
export const NOTIFICATION_POSITIONS = {
  TOP_RIGHT: "top-right",
  TOP_LEFT: "top-left",
  TOP_CENTER: "top-center",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
  BOTTOM_CENTER: "bottom-center",
} as const;
