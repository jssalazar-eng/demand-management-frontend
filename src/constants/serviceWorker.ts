/**
 * Constantes relacionadas con Service Worker
 */

// Mensajes del Service Worker
export const SERVICE_WORKER_MESSAGES = {
  SKIP_WAITING: "SKIP_WAITING",
  CLEAR_CACHE: "CLEAR_CACHE",
  GET_CACHE_STATUS: "GET_CACHE_STATUS",
  CACHE_USED: "CACHE_USED",
} as const;

// Estados del Service Worker
export const SERVICE_WORKER_STATES = {
  INSTALLING: "installing",
  INSTALLED: "installed",
  ACTIVATING: "activating",
  ACTIVATED: "activated",
  REDUNDANT: "redundant",
} as const;

// Eventos del Service Worker
export const SERVICE_WORKER_EVENTS = {
  UPDATE_FOUND: "updatefound",
  STATE_CHANGE: "statechange",
  MESSAGE: "message",
} as const;

// Capacidades del navegador
export const BROWSER_CAPABILITIES = {
  SERVICE_WORKER: "serviceWorker",
} as const;
