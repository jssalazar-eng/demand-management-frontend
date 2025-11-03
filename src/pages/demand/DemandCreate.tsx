import { Cancel as CancelIcon, Save as SaveIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReferenceData } from "../../hooks/useReferenceData";
import { DemandService, NotificationService } from "../../services";
import { CreateDemandRequest, DemandPriority } from "../../types";

interface FormData {
  title: string;
  description: string;
  demandTypeId: string | "";
  statusId: string | "";
  priority: number | "";
  assignedToId: string | "";
  dueDate: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  demandTypeId?: string;
  statusId?: string;
  priority?: string;
}

const DemandCreate: React.FC = () => {
  const navigate = useNavigate();
  const {
    demandTypes,
    statuses,
    users,
    loading: referenceLoading,
  } = useReferenceData();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    demandTypeId: "",
    statusId: "",
    priority: DemandPriority.MEDIUM, // Valor por defecto válido
    assignedToId: "",
    dueDate: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (!formData.demandTypeId) {
      newErrors.demandTypeId = "El tipo de demanda es requerido";
    }

    if (!formData.statusId) {
      newErrors.statusId = "El estado es requerido";
    }

    if (!formData.priority) {
      newErrors.priority = "La prioridad es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: keyof FormData) =>
    (
      event:
        | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<number | string>
    ) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      // Clear error when user starts typing
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      NotificationService.validationError(
        "Por favor, complete todos los campos requeridos"
      );
      return;
    }

    setLoading(true);

    // Mostrar notificación de carga
    const toastId = NotificationService.loading("Creando demanda...");

    try {
      const requestData: CreateDemandRequest = {
        cmd: "CreateDemand", // Campo requerido por el backend
        title: formData.title.trim(),
        description: formData.description.trim(),
        demandTypeId: formData.demandTypeId as string,
        statusId: formData.statusId as string,
        priority: formData.priority as number, // 0=Low, 1=Medium, 2=High, 3=Critical
        requestingUserId: "5af5c3b6-58ca-45ff-a9d7-20fe4e6ff337", // Ana Martínez del backend
        assignedToId: formData.assignedToId
          ? (formData.assignedToId as string)
          : null,
        dueDate: formData.dueDate || null,
      };

      await DemandService.createDemand(requestData);

      NotificationService.update(toastId, {
        render: `✅ Demanda "${formData.title}" creada exitosamente`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      navigate("/demands");
    } catch (err: any) {
      let errorMessage = "Error al crear la demanda";
      if (err.response?.data?.errors) {
        const validationErrors = err.response.data.errors;
        const errorDetails = Object.keys(validationErrors)
          .map((field) => {
            const fieldErrors = validationErrors[field];
            return `${field}: ${fieldErrors.join(", ")}`;
          })
          .join("; ");
        errorMessage = `Error de validación: ${errorDetails}`;
      } else if (err.response?.data?.title) {
        errorMessage = err.response.data.title;
      } else if (err.message) {
        errorMessage = err.message;
      }

      NotificationService.update(toastId, {
        render: `❌ ${errorMessage}`,
        type: "error",
        isLoading: false,
        autoClose: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/demands");
  };

  if (referenceLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Crear Nueva Demanda
      </Typography>

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                fullWidth
                label="Título"
                value={formData.title}
                onChange={handleInputChange("title")}
                error={!!errors.title}
                helperText={errors.title}
                required
                placeholder="Ingrese el título de la demanda"
              />

              <TextField
                fullWidth
                label="Descripción"
                value={formData.description}
                onChange={handleInputChange("description")}
                error={!!errors.description}
                helperText={errors.description}
                multiline
                rows={4}
                required
                placeholder="Describa detalladamente la demanda"
              />

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <FormControl
                  sx={{ minWidth: 200, flex: 1 }}
                  required
                  error={!!errors.demandTypeId}
                >
                  <InputLabel>Tipo de Demanda</InputLabel>
                  <Select
                    value={formData.demandTypeId}
                    onChange={handleInputChange("demandTypeId")}
                    label="Tipo de Demanda"
                  >
                    {demandTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  sx={{ minWidth: 200, flex: 1 }}
                  required
                  error={!!errors.statusId}
                >
                  <InputLabel>Estado</InputLabel>
                  <Select
                    value={formData.statusId}
                    onChange={handleInputChange("statusId")}
                    label="Estado"
                  >
                    {statuses.map((status) => (
                      <MenuItem key={status.id} value={status.id}>
                        {status.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <FormControl
                  sx={{ minWidth: 200, flex: 1 }}
                  required
                  error={!!errors.priority}
                >
                  <InputLabel>Prioridad</InputLabel>
                  <Select
                    value={formData.priority}
                    onChange={handleInputChange("priority")}
                    label="Prioridad"
                  >
                    <MenuItem value={DemandPriority.LOW}>Baja</MenuItem>
                    <MenuItem value={DemandPriority.MEDIUM}>Media</MenuItem>
                    <MenuItem value={DemandPriority.HIGH}>Alta</MenuItem>
                    <MenuItem value={DemandPriority.CRITICAL}>Crítica</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 200, flex: 1 }}>
                  <InputLabel>Asignar a</InputLabel>
                  <Select
                    value={formData.assignedToId}
                    onChange={handleInputChange("assignedToId")}
                    label="Asignar a"
                  >
                    <MenuItem value="">Sin asignar</MenuItem>
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <TextField
                fullWidth
                label="Fecha límite"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange("dueDate")}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ maxWidth: 300 }}
              />

              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  disabled={loading}
                  startIcon={<CancelIcon />}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  startIcon={<SaveIcon />}
                >
                  {loading ? "Creando..." : "Crear Demanda"}
                </Button>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DemandCreate;
