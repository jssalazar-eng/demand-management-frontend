import { FilterList, Refresh, Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
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
import React, { useCallback, useEffect, useState } from "react";
import { useReferenceData } from "../hooks/useReferenceData";
import { DemandService } from "../services/demandService";
import NotificationService from "../services/notificationService";
import { Demand, DemandPriority } from "../types";
import { getPriorityLabel } from "../utils";

interface ReportFilters {
  searchTerm?: string;
  demandTypeId?: string;
  statusId?: string;
  priority?: DemandPriority;
}

const PRIORITY_OPTIONS = [
  { value: 0, label: "Baja", color: "#4caf50" },
  { value: 1, label: "Media", color: "#ff9800" },
  { value: 2, label: "Alta", color: "#f44336" },
  { value: 3, label: "Crítica", color: "#9c27b0" },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const Reports: React.FC = () => {
  const {
    demandTypes,
    statuses,
    getUserName,
    getDemandTypeName,
    getStatusName,
    loading: referenceLoading,
    error: referenceError,
  } = useReferenceData();

  const [demands, setDemands] = useState<Demand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Filtros
  const [filters, setFilters] = useState<ReportFilters>({
    searchTerm: "",
    demandTypeId: "",
    statusId: "",
  });

  const [appliedFilters, setAppliedFilters] = useState<ReportFilters>(filters);

  const fetchReportData = useCallback(
    async (
      pageNumber: number = currentPage,
      currentFilters: ReportFilters = appliedFilters
    ) => {
      setLoading(true);
      setError(null);

      try {
        const params: any = {
          pageNumber,
          pageSize,
        };

        // Solo agregar filtros si tienen valores
        if (currentFilters.demandTypeId) {
          params.demandTypeId = currentFilters.demandTypeId;
        }
        if (currentFilters.statusId) {
          params.statusId = currentFilters.statusId;
        }
        if (currentFilters.priority !== undefined) {
          params.priority = currentFilters.priority;
        }
        if (currentFilters.searchTerm) {
          params.searchTerm = currentFilters.searchTerm;
        }

        const response = await DemandService.getDemandsFiltered(params);

        setDemands(response.items);
        setTotalCount(response.totalCount);
        setCurrentPage(response.pageNumber);
        setTotalPages(response.totalPages);
      } catch (err: any) {
        setError(`Error al cargar el reporte: ${err.message}`);
        NotificationService.error("Error al cargar datos del reporte");
      } finally {
        setLoading(false);
      }
    },
    [currentPage, pageSize, appliedFilters]
  );

  // Cargar datos iniciales
  useEffect(() => {
    if (!referenceLoading) {
      fetchReportData(1, appliedFilters);
    }
  }, [referenceLoading, fetchReportData, appliedFilters]);

  const handleFilterChange = (field: keyof ReportFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    fetchReportData(1, filters);
  };

  const handleClearFilters = () => {
    const emptyFilters: ReportFilters = {
      searchTerm: "",
      demandTypeId: "",
      statusId: "",
    };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
    fetchReportData(1, emptyFilters);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    fetchReportData(page, appliedFilters);
  };

  const handlePageSizeChange = (event: any) => {
    const newPageSize = event.target.value as number;
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  const getPriorityChip = (priority: string | DemandPriority) => {
    // Convertir string a número para buscar en PRIORITY_OPTIONS
    let priorityValue: DemandPriority;

    if (typeof priority === "string") {
      const priorityLower = priority.toLowerCase();
      if (priorityLower === "low" || priorityLower === "baja")
        priorityValue = DemandPriority.LOW;
      else if (priorityLower === "medium" || priorityLower === "media")
        priorityValue = DemandPriority.MEDIUM;
      else if (priorityLower === "high" || priorityLower === "alta")
        priorityValue = DemandPriority.HIGH;
      else if (priorityLower === "critical" || priorityLower === "crítica")
        priorityValue = DemandPriority.CRITICAL;
      else priorityValue = DemandPriority.LOW;
    } else {
      priorityValue = priority;
    }

    const option = PRIORITY_OPTIONS.find((opt) => opt.value === priorityValue);
    return (
      <Chip
        label={getPriorityLabel(priority)}
        size="small"
        sx={{
          backgroundColor: option?.color || "#gray",
          color: "white",
          fontWeight: "bold",
        }}
      />
    );
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (referenceError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error al cargar datos de referencia: {referenceError}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "#abbc2e", fontWeight: "bold" }}
      >
        📊 Reportes y Análisis
      </Typography>

      {/* Filtros */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <FilterList sx={{ mr: 1 }} />
            Filtros de Búsqueda
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
              <TextField
                fullWidth
                label="Buscar"
                placeholder="Título, descripción..."
                value={filters.searchTerm || ""}
                onChange={(e) =>
                  handleFilterChange("searchTerm", e.target.value)
                }
                InputProps={{
                  startAdornment: (
                    <Search sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
              />
            </Box>

            <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Demanda</InputLabel>
                <Select
                  value={filters.demandTypeId || ""}
                  onChange={(e) =>
                    handleFilterChange("demandTypeId", e.target.value)
                  }
                >
                  <MenuItem value="">Todos</MenuItem>
                  {demandTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filters.statusId || ""}
                  onChange={(e) =>
                    handleFilterChange("statusId", e.target.value)
                  }
                >
                  <MenuItem value="">Todos</MenuItem>
                  {statuses.map((status) => (
                    <MenuItem key={status.id} value={status.id}>
                      {status.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flex: "1 1 250px", minWidth: "250px" }}>
              <FormControl fullWidth>
                <InputLabel>Prioridad</InputLabel>
                <Select
                  value={
                    filters.priority !== undefined
                      ? filters.priority.toString()
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    handleFilterChange(
                      "priority",
                      value === "" ? undefined : Number(value)
                    );
                  }}
                >
                  <MenuItem value="">Todas</MenuItem>
                  {PRIORITY_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              onClick={handleApplyFilters}
              startIcon={<Search />}
              sx={{ backgroundColor: "#abbc2e" }}
            >
              Aplicar Filtros
            </Button>
            <Button
              variant="outlined"
              onClick={handleClearFilters}
              startIcon={<Refresh />}
            >
              Limpiar
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Resultados */}
      <Card>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">
              Resultados ({totalCount} demandas encontradas)
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Por página</InputLabel>
              <Select value={pageSize} onChange={handlePageSizeChange}>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell>
                        <strong>Título</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Tipo</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Estado</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Prioridad</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Solicitante</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Asignado</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Fecha Límite</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Creado</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {demands.map((demand) => (
                      <TableRow key={demand.id} hover>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            {demand.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {demand.description?.substring(0, 100)}
                            {demand.description &&
                            demand.description.length > 100
                              ? "..."
                              : ""}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {getDemandTypeName(demand.demandTypeId)}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getStatusName(demand.statusId)}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          {getPriorityChip(demand.priority)}
                        </TableCell>
                        <TableCell>
                          {getUserName(demand.requestingUserId)}
                        </TableCell>
                        <TableCell>
                          {demand.assignedToId
                            ? getUserName(demand.assignedToId)
                            : "Sin asignar"}
                        </TableCell>
                        <TableCell>{formatDate(demand.dueDate)}</TableCell>
                        <TableCell>{formatDate(demand.createdDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {totalPages > 1 && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                  />
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reports;
