import {
  Assignment,
  CheckCircle,
  People,
  TrendingUp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = [
    {
      title: "Total Demandas",
      value: "156",
      icon: Assignment,
      color: "primary" as const,
      change: "+12%",
    },
    {
      title: "En Progreso",
      value: "42",
      icon: TrendingUp,
      color: "warning" as const,
      change: "+5%",
    },
    {
      title: "Completadas",
      value: "89",
      icon: CheckCircle,
      color: "success" as const,
      change: "+8%",
    },
    {
      title: "Usuarios Activos",
      value: "23",
      icon: People,
      color: "info" as const,
      change: "+2%",
    },
  ];

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
                    <Chip
                      label={stat.change}
                      color={stat.color}
                      size="small"
                      sx={{ mt: 1 }}
                    />
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
            <Typography variant="body2" color="text.secondary">
              Lista de las últimas demandas creadas en el sistema
            </Typography>
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
