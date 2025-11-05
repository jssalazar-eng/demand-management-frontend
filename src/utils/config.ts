import { AppConfig } from "../types";

export const config: AppConfig = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000",
  apiVersion: process.env.REACT_APP_API_VERSION || "v1",
  appName: process.env.REACT_APP_APP_NAME || "Demand Management System",
  appVersion: process.env.REACT_APP_APP_VERSION || "1.0.0",
};

export const API_ENDPOINTS = {
  // Demand endpoints
  DEMANDS: "/api/demand",
  DEMANDS_FILTERED: "/api/demand/filtered",
  DEMAND_BY_ID: (id: string) => `/api/demand/${id}`,

  // DemandType endpoints
  DEMAND_TYPES: "/api/demandtype",
  DEMAND_TYPE_BY_ID: (id: string) => `/api/demandtype/${id}`,

  // Status endpoints
  STATUS: "/api/status",
  STATUS_BY_ID: (id: string) => `/api/status/${id}`,

  // Role endpoints
  ROLES: "/api/role",
  ROLE_BY_ID: (id: string) => `/api/role/${id}`,

  // User endpoints
  USERS: "/api/user",
  USER_BY_ID: (id: string) => `/api/user/${id}`,

  // Dashboard endpoint
  DASHBOARD: "/api/dashboard",
};

export const getApiUrl = (endpoint: string): string => {
  return `${config.apiBaseUrl}${endpoint}`;
};
