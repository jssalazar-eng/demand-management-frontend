/**
 * Constantes relacionadas con APIs y servicios externos
 */

// Configuración de API
export const API_CONFIG = {
  DEFAULT_TIMEOUT: 10000, // 10 segundos
  DEFAULT_BASE_URL: "http://localhost:3001",
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Códigos de estado HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Rangos de códigos de estado
export const HTTP_STATUS_RANGES = {
  CLIENT_ERROR_START: 400,
  SERVER_ERROR_START: 500,
} as const;

// Headers HTTP comunes
export const HTTP_HEADERS = {
  CONTENT_TYPE: "Content-Type",
  AUTHORIZATION: "Authorization",
  ACCEPT: "Accept",
} as const;

// Content types
export const CONTENT_TYPES = {
  JSON: "application/json",
  FORM_DATA: "multipart/form-data",
  URL_ENCODED: "application/x-www-form-urlencoded",
} as const;
