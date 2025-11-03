import { useEffect, useState } from "react";
import {
  DemandTypeService,
  NotificationService,
  StatusService,
  UserService,
} from "../services";
import { DemandType, Status, User } from "../types";

interface ReferenceData {
  demandTypes: DemandType[];
  statuses: Status[];
  users: User[];
  loading: boolean;
  error: string | null;
}

interface ReferenceLookup {
  getDemandTypeName: (id: string) => string;
  getStatusName: (id: string) => string;
  getUserName: (id: string) => string;
}

export const useReferenceData = (): ReferenceData & ReferenceLookup => {
  // Inicializar arrays vacíos - solo datos del backend
  const [demandTypes, setDemandTypes] = useState<DemandType[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReferenceData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [demandTypesData, statusesData, usersData] = await Promise.all([
          DemandTypeService.getDemandTypes(),
          StatusService.getStatuses(),
          UserService.getUsers(),
        ]);

        setDemandTypes(demandTypesData || []);
        setStatuses(statusesData || []);
        setUsers(usersData || []);

        setError(null);
      } catch (err: any) {
        const errorMessage = `Error al cargar datos: ${err.message}`;
        setError(errorMessage);

        NotificationService.connectionError();

        setDemandTypes([]);
        setStatuses([]);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadReferenceData();
  }, []);

  const getDemandTypeName = (id: string): string => {
    if (!id) return "Sin tipo";
    const demandType = demandTypes.find((dt) => dt.id === id);
    return demandType?.name || `Tipo ${id}`;
  };

  const getStatusName = (id: string): string => {
    if (!id) return "Sin estado";
    const status = statuses.find((s) => s.id === id);
    return status?.name || `Estado ${id}`;
  };

  const getUserName = (id: string): string => {
    if (!id) return "Sin asignar";
    const user = users.find((u) => u.id === id);

    if (user) {
      const userAny = user as any;
      const name =
        user.fullName ||
        userAny.firstName ||
        userAny.username ||
        userAny.userName ||
        userAny.displayName ||
        `Usuario ${user.id?.substring(0, 8)}`;

      return name;
    }

    if (id.length >= 8) {
      const shortId = id.substring(0, 8);
      const displayName = `Usuario (${shortId}...)`;
      return displayName;
    }

    return `Usuario ${id}`;
  };

  return {
    demandTypes,
    statuses,
    users,
    loading,
    error,
    getDemandTypeName,
    getStatusName,
    getUserName,
  };
};
