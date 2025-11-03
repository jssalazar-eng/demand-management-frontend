import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, LoadingSpinner } from "../../components/common";
import { useDemand } from "../../hooks";
import {
  formatDateTime,
  getPriorityColor,
  getPriorityLabel,
  getStatusColor,
  getStatusLabel,
} from "../../utils";

const DemandDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { demand, loading, error } = useDemand(id);

  const handleEdit = () => {
    navigate(`/demands/${id}/edit`);
  };

  const handleDelete = () => {
    // Implementar lógica de eliminación con confirmación
    console.log("Delete demand:", id);
  };

  const handleBack = () => {
    navigate("/demands");
  };

  if (loading) {
    return <LoadingSpinner message="Cargando detalles de la demanda..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!demand) {
    return <ErrorMessage message="Demanda no encontrada" />;
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Box flexGrow={1}>
          <Typography variant="h4" component="h1">
            {demand.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {demand.id}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Editar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </Stack>
      </Box>

      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Información General
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Box flex={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estado
                  </Typography>
                  <Chip
                    label={getStatusLabel(demand.status)}
                    color={getStatusColor(demand.status)}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Prioridad
                  </Typography>
                  <Chip
                    label={getPriorityLabel(demand.priority)}
                    color={getPriorityColor(demand.priority)}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Categoría
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {demand.category}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                Descripción
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                {demand.description}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                Detalles de Asignación
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Box flex={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Solicitante
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {demand.requester}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Asignado a
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {demand.assignee || "Sin asignar"}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>
                Fechas y Tiempos
              </Typography>
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Box flex={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Fecha de Creación
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {formatDateTime(demand.createdAt)}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Última Actualización
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {formatDateTime(demand.updatedAt)}
                  </Typography>
                </Box>
                {demand.dueDate && (
                  <Box flex={1}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Fecha Límite
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {formatDateTime(demand.dueDate)}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Box>

            {(demand.estimatedHours || demand.actualHours) && (
              <>
                <Divider />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Estimación de Tiempo
                  </Typography>
                  <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                    {demand.estimatedHours && (
                      <Box flex={1}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Horas Estimadas
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                          {demand.estimatedHours} horas
                        </Typography>
                      </Box>
                    )}
                    {demand.actualHours && (
                      <Box flex={1}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Horas Reales
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 0.5 }}>
                          {demand.actualHours} horas
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DemandDetail;
