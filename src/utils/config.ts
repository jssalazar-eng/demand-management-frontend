import { AppConfig } from "../types";

export const config: AppConfig = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "https://localhost:7243",
  apiVersion: process.env.REACT_APP_API_VERSION || "v1",
  appName: process.env.REACT_APP_APP_NAME || "Demand Management System",
  appVersion: process.env.REACT_APP_APP_VERSION || "1.0.0",
};

export const API_ENDPOINTS = {
  // Demand endpoints
  DEMANDS: "/api/Demand",
  DEMANDS_FILTERED: "/api/Demand/filtered",
  DEMAND_BY_ID: (id: string) => `/api/Demand/${id}`,

  // DemandType endpoints
  DEMAND_TYPES: "/api/DemandType",
  DEMAND_TYPE_BY_ID: (id: string) => `/api/DemandType/${id}`,

  // Status endpoints
  STATUS: "/api/Status",
  STATUS_BY_ID: (id: string) => `/api/Status/${id}`,

  // Role endpoints
  ROLES: "/api/Role",
  ROLE_BY_ID: (id: string) => `/api/Role/${id}`,

  // User endpoints
  USERS: "/api/User",
  USER_BY_ID: (id: string) => `/api/User/${id}`,
};

export const getApiUrl = (endpoint: string): string => {
  return `${config.apiBaseUrl}${endpoint}`;
};
