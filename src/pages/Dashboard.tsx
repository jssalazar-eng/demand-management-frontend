import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  PlayArrow as PlayArrowIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ConnectionError } from "../components/common";
import { useDashboard } from "../hooks/useDashboard";
import { useReferenceData } from "../hooks/useReferenceData";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { dashboardData, loading, error, refetch } = useDashboard(5);
  const { statuses, getStatusName, getUserName } = useReferenceData();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    // Verificar si es un error de conexión
    if (
      error.includes("conexión") ||
      error.includes("internet") ||
      error.includes("red")
    ) {
      return (
        <ConnectionError
          onRetry={refetch}
          title="Sin conexión a internet"
          message="No se pueden cargar los datos del dashboard. Verifica tu conexión e intenta nuevamente."
        />
      );
    }

    // Para otros tipos de errores
    return (
      <Box>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={refetch}>
              Reintentar
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box>
        <Alert severity="warning">
          No se pudieron cargar los datos del dashboard
        </Alert>
      </Box>
    );
  }

  const stats = [
    {
      title: "Total Demandas",
      value: dashboardData.stats.totalDemands,
      icon: AssignmentIcon,
      color: "primary" as const,
    },
    {
      title: "En Progreso",
      value: dashboardData.stats.inProgressDemands,
      icon: PlayArrowIcon,
      color: "warning" as const,
    },
    {
      title: "Completadas",
      value: dashboardData.stats.completedDemands,
      icon: CheckCircleIcon,
      color: "success" as const,
    },
    {
      title: "Críticas",
      value: dashboardData.stats.criticalDemands,
      icon: WarningIcon,
      color: "error" as const,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (statusId: string) => {
    const status = statuses.find((s: any) => s.id === statusId);
    const statusName = status?.name?.toLowerCase();

    if (statusName?.includes("completad") || statusName?.includes("cerrad"))
      return "success";
    if (statusName?.includes("progreso") || statusName?.includes("proceso"))
      return "warning";
    if (statusName?.includes("critic") || statusName?.includes("urgent"))
      return "error";
    return "default";
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Resumen general del sistema de gestión de demandas
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} sx={{ minWidth: 200, flex: 1 }}>
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Icon
                    sx={{
                      fontSize: 40,
                      color: `${stat.color}.main`,
                      opacity: 0.7,
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Card sx={{ flex: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Demandas Recientes
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Lista de las últimas demandas creadas en el sistema
            </Typography>
            {dashboardData.recentDemands.length > 0 ? (
              <List>
                {dashboardData.recentDemands.map((demand, index) => (
                  <React.Fragment key={demand.id}>
                    <ListItem
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/demands/${demand.id}`)}
                    >
                      <ListItemText
                        primary={demand.title}
                        secondary={`Solicitante: ${getUserName(
                          demand.requestingUserId
                        )} - ${formatDate(demand.createdDate)}`}
                      />
                      <ListItemSecondaryAction>
                        <Chip
                          label={getStatusName(demand.statusId)}
                          size="small"
                          color={getStatusColor(demand.statusId)}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < dashboardData.recentDemands.length - 1 && (
                      <Divider />
                    )}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No hay demandas recientes
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => navigate("/demands")}
            >
              Ver Todas las Demandas
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Acciones Rápidas
            </Typography>
            <Stack spacing={1}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate("/demands/new")}
              >
                Nueva Demanda
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => navigate("/reports")}
              >
                Ver Reportes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => navigate("/settings")}
              >
                Configuración
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default Dashboard;
