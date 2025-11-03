import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Types
import type { Demand } from "../../types";

// Components
import { ErrorMessage, LoadingSpinner } from "../../components/common";

// Services
import { DemandService, NotificationService } from "../../services";

// Hooks
import { useDemands, useReferenceData } from "../../hooks";

// Utils
import {
  formatDate,
  getPriorityColor,
  getPriorityLabel,
  getStatusColor,
} from "../../utils";

const DemandList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [demandToDelete, setDemandToDelete] = useState<Demand | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { demands, loading, error, totalPages, currentPage, fetchDemands } =
    useDemands();
  const { getStatusName, getUserName } = useReferenceData();

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetchDemands({ pageNumber: value });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Aquí podrías implementar búsqueda en tiempo real
  };

  const handleView = (id: string) => {
    navigate(`/demands/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/demands/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    const demand = demands.find((d) => d.id === id);
    if (demand) {
      setDemandToDelete(demand);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!demandToDelete) return;

    setDeleting(true);
    const toastId = NotificationService.loading(
      `Eliminando demanda "${demandToDelete.title}"...`
    );

    try {
      await DemandService.deleteDemand(demandToDelete.id);

      NotificationService.update(toastId, {
        render: `✅ Demanda "${demandToDelete.title}" eliminada exitosamente`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      fetchDemands({ pageNumber: currentPage });
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
      setDemandToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setDemandToDelete(null);
  };

  const filteredDemands = demands.filter(
    (demand: Demand) =>
      demand.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demand.requestingUserId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Cargando demandas..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Demandas
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Administra todas las demandas del sistema
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/demands/new")}
        >
          Nueva Demanda
        </Button>
      </Box>

      <Stack spacing={2} mb={3}>
        <TextField
          placeholder="Buscar demandas..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 400 }}
        />
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Solicitante</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Prioridad</TableCell>
              <TableCell>Fecha Creación</TableCell>
              <TableCell>Asignado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDemands.map((demand: Demand) => (
              <TableRow key={demand.id} hover>
                <TableCell>
                  <Typography variant="subtitle2">{demand.title}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {demand.description}
                  </Typography>
                </TableCell>
                <TableCell>{getUserName(demand.requestingUserId)}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusName(demand.statusId)}
                    color={getStatusColor(demand.statusId)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={getPriorityLabel(demand.priority)}
                    color={getPriorityColor(demand.priority)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{formatDate(demand.createdDate)}</TableCell>
                <TableCell>
                  {demand.assignedToId
                    ? getUserName(demand.assignedToId)
                    : "Sin asignar"}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => handleView(demand.id)}
                    title="Ver detalles"
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(demand.id)}
                    title="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(demand.id)}
                    title="Eliminar"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredDemands.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary">
                    No se encontraron demandas
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

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
            ¿Estás seguro de que deseas eliminar la demanda "
            {demandToDelete?.title}"? Esta acción no se puede deshacer.
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

export default DemandList;
