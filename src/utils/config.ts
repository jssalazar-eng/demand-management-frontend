import { AppConfig } from "../types";

export const config: AppConfig = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "https://localhost:7243",
  apiVersion: process.env.REACT_APP_API_VERSION || "v1",
  appName: process.env.REACT_APP_APP_NAME || "Demand Management System",
  appVersion: process.env.REACT_APP_APP_VERSION || "1.0.0",
};

export const API_ENDPOINTS = {
  DEMANDS: "/api/demands",
  USERS: "/api/users",
  CATEGORIES: "/api/categories",
};

export const getApiUrl = (endpoint: string): string => {
  return `${config.apiBaseUrl}${endpoint}`;
};
