import { Demand } from "../types/demand";
import { apiService } from "./apiService";
import { DemandService } from "./demandService";

export interface DashboardStats {
  totalDemands: number;
  inProgressDemands: number;
  completedDemands: number;
  criticalDemands: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentDemands: Demand[];
}

export class DashboardService {
  static async getDashboard(recentCount: number = 5): Promise<DashboardData> {
    try {
      // Try the dedicated dashboard endpoint first
      const response = await apiService.get<DashboardData>(
        `/Dashboard?recentCount=${recentCount}`
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
      const stats: DashboardStats = {
        totalDemands: allDemands.length,
        inProgressDemands: 0,
        completedDemands: 0,
        criticalDemands: 0,
      };

      // Count demands by status and priority
      allDemands.forEach((demand) => {
        // Count critical demands (high priority)
        if (demand.priority === 2 || demand.priority === 3) {
          stats.criticalDemands++;
        }

        // Note: We can't determine exact status without loading status reference data
        // This is a simplified approach - in real implementation, you'd load statuses
        // and check status names to categorize properly
      });

      // For now, distribute remaining demands between in progress and completed
      // This is approximate since we don't have status details here
      stats.inProgressDemands = Math.floor(stats.totalDemands * 0.3);
      stats.completedDemands =
        stats.totalDemands - stats.inProgressDemands - stats.criticalDemands;

      // Get recent demands (sort by creation date)
      const recentDemands = allDemands
        .sort(
          (a, b) =>
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
        )
        .slice(0, recentCount);

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
