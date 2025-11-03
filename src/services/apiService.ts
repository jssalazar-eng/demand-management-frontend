import axios, { AxiosInstance, AxiosResponse } from "axios";
import { config } from "../utils/config";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        // Handle different types of errors
        if (!error.response) {
          // Network error (no internet, server down, etc.)
          console.error("Network Error:", error.message);
          error.isNetworkError = true;
          error.userMessage = "Sin conexión a internet. Verifica tu conexión.";
        } else if (error.response.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else if (error.response.status >= 500) {
          // Server errors
          error.userMessage = "Error del servidor. Intenta más tarde.";
        } else if (error.response.status === 404) {
          // Not found errors
          error.userMessage = "Recurso no encontrado.";
        } else if (error.response.status >= 400) {
          // Client errors
          error.userMessage = error.response.data?.message || "Error en la solicitud.";
        }
        
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, params?: any): Promise<AxiosResponse<T>> {
    return this.api.get<T>(url, { params });
  }
  public post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.api.post<T>(url, data);
  }

  public put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.api.put<T>(url, data);
  }

  public delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(url);
  }

  public patch<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.api.patch<T>(url, data);
  }
}

export const apiService = new ApiService();
