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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DemoModeAlert,
  ErrorMessage,
  LoadingSpinner,
} from "../../components/common";
import { useDemand, useReferenceData } from "../../hooks";
import { DemandService, NotificationService } from "../../services";
import {
  formatDateTime,
  getPriorityColor,
  getPriorityLabel,
  getStatusColor,
} from "../../utils";

const DemandDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { demand, loading, error, isDemoMode } = useDemand(id);
  const { getDemandTypeName, getStatusName, getUserName } = useReferenceData();
  const [showDemoAlert, setShowDemoAlert] = useState<boolean>(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleEdit = () => {
    navigate(`/demands/${id}/edit`);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!demand || !id) return;

    setDeleting(true);
    const toastId = NotificationService.loading(
      `Eliminando demanda "${demand.title}"...`
    );

    try {
      await DemandService.deleteDemand(id);

      NotificationService.update(toastId, {
        render: `✅ Demanda "${demand.title}" eliminada exitosamente`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/demands");
    } catch (error: any) {
      NotificationService.update(toastId, {
        render: `❌ Error al eliminar la demanda: ${
          error.message || "Error desconocido"
        }`,
        type: "error",
        isLoading: false,
        autoClose: 6000,
      });
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
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
      {/* Alerta de modo demo */}
      {isDemoMode && showDemoAlert && (
        <DemoModeAlert
          show={showDemoAlert}
          onClose={() => setShowDemoAlert(false)}
        />
      )}

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
                    label={getStatusName(demand.statusId)}
                    color={getStatusColor(demand.statusId)}
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
                    Tipo de Demanda
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {getDemandTypeName(demand.demandTypeId)}
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
                    {getUserName(demand.requestingUserId)}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Asignado a
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {demand.assignedToId
                      ? getUserName(demand.assignedToId)
                      : "Sin asignar"}
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
                    {formatDateTime(demand.createdDate)}
                  </Typography>
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Última Actualización
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {formatDateTime(demand.updatedDate)}
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

            {/* Información de tiempo - Disponible en versiones futuras
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
            */}
          </Stack>
        </CardContent>
      </Card>

      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            ¿Estás seguro de que deseas eliminar la demanda "{demand?.title}"?
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} disabled={deleting}>
            Cancelar
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={deleting}
            startIcon={<DeleteIcon />}
          >
            {deleting ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DemandDetail;
