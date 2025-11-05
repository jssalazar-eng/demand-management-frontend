/**
 * Constantes relacionadas con navegación y rutas
 */

// IDs de elementos de navegación
export const NAVIGATION_IDS = {
  DASHBOARD: "dashboard",
  DEMANDS: "demands",
  USERS: "users",
  REPORTS: "reports",
  NOTIFICATIONS: "notifications",
  SETTINGS: "settings",
} as const;

// Labels de navegación
export const NAVIGATION_LABELS = {
  DASHBOARD: "Dashboard",
  DEMANDS: "Demandas",
  USERS: "Usuarios",
  REPORTS: "Reportes",
  NOTIFICATIONS: "Notificaciones",
  SETTINGS: "Configuración",
} as const;

// Rutas de la aplicación
export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/",
  DEMANDS: "/demands",
  DEMANDS_NEW: "/demands/new",
  DEMANDS_EDIT: "/demands/:id/edit",
  DEMANDS_DETAIL: "/demands/:id",
  USERS: "/users",
  REPORTS: "/reports",
  NOTIFICATIONS: "/notifications",
  SETTINGS: "/settings",
  NOT_FOUND: "*",
} as const;

// DOM IDs y elementos
export const DOM_ELEMENTS = {
  ROOT: "root",
} as const;
