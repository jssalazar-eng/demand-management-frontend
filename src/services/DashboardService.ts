import { DashboardData } from "../types/demand";
import { API_ENDPOINTS } from "../utils/config";
import { apiService } from "./apiService";
import { DemandService } from "./demandService";

export class DashboardService {
  static async getDashboard(recentCount: number = 5): Promise<DashboardData> {
    try {
      // Try the dedicated dashboard endpoint first
      const response = await apiService.get<DashboardData>(
        `${API_ENDPOINTS.DASHBOARD}?recentCount=${recentCount}`
      );
      return response.data;
    } catch (error: any) {
      // If dashboard endpoint doesn't exist (404), generate dashboard from demands
      if (error.response?.status === 404) {
        console.warn(
          "Dashboard endpoint not available, generating from demands data"
        );
        return await this.generateDashboardFromDemands(recentCount);
      }

      console.error("Error fetching dashboard data:", error);
      throw new Error(
        error.response?.data?.message ||
          "Error al cargar los datos del dashboard"
      );
    }
  }

  private static async generateDashboardFromDemands(
    recentCount: number
  ): Promise<DashboardData> {
    try {
      // Fetch all demands to generate statistics
      const allDemands = await DemandService.getDemands();

      // Calculate statistics
      const stats = {
        totalDemands: allDemands.length,
        inProgressDemands: 0,
        completedDemands: 0,
        criticalDemands: 0,
      };

      // Count demands by priority (looking for "Critical" and "High" priority)
      allDemands.forEach((demand) => {
        if (demand.priority === "Critical" || demand.priority === "High") {
          stats.criticalDemands++;
        }

        // Count by status name if available
        if (demand.statusName) {
          if (demand.statusName.toLowerCase().includes("progress")) {
            stats.inProgressDemands++;
          } else if (demand.statusName.toLowerCase().includes("completed")) {
            stats.completedDemands++;
          }
        }
      });

      // Get recent demands (sort by creation date)
      const recentDemands = allDemands
        .sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        )
        .slice(0, recentCount)
        .map((demand) => ({
          id: demand.id,
          title: demand.title,
          priority: demand.priority,
          statusName: demand.statusName,
          demandTypeName: demand.demandTypeName,
          requestingUserName: demand.requestingUserName,
          createdDate: demand.createdDate,
        }));

      return {
        stats,
        recentDemands,
      };
    } catch (error: any) {
      console.error("Error generating dashboard from demands:", error);
      throw new Error("Error al generar datos del dashboard");
    }
  }
}
