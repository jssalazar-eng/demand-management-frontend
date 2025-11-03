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
import { ErrorMessage, LoadingSpinner } from "../../components/common";
import { useDemands } from "../../hooks";
import {
  formatDate,
  getPriorityColor,
  getPriorityLabel,
  getStatusColor,
  getStatusLabel,
} from "../../utils";

const DemandList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { demands, loading, error, totalPages, currentPage, fetchDemands } =
    useDemands();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    fetchDemands(value);
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
    // Implementar lógica de eliminación con confirmación
    console.log("Delete demand:", id);
  };

  const filteredDemands = demands.filter(
    (demand) =>
      demand.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demand.requester.toLowerCase().includes(searchTerm.toLowerCase())
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
            {filteredDemands.map((demand) => (
              <TableRow key={demand.id} hover>
                <TableCell>
                  <Typography variant="subtitle2">{demand.title}</Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {demand.description}
                  </Typography>
                </TableCell>
                <TableCell>{demand.requester}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(demand.status)}
                    color={getStatusColor(demand.status)}
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
                <TableCell>{formatDate(demand.createdAt)}</TableCell>
                <TableCell>{demand.assignee || "Sin asignar"}</TableCell>
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
    </Box>
  );
};

export default DemandList;
