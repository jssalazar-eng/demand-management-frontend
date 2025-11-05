import { Cancel as CancelIcon, Save as SaveIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  FORM_ERROR_MESSAGES,
  VALIDATION_COLORS,
  VALIDATION_HELPER_TEXTS,
} from "../../constants/validation";
import { useValidatedForm } from "../../hooks/useValidatedForm";
import { DemandSchema, demandDefaults } from "../../schemas/demandSchema";
import { ValidatedSelect, ValidatedTextField } from "./ValidatedFields";

// Tipos de interfaz para las props del componente
interface ValidatedDemandFormProps {
  initialData?: Partial<DemandSchema>;
  onSubmit: (data: DemandSchema) => Promise<void> | void;
  onCancel?: () => void;
  loading?: boolean;
  mode?: "create" | "edit";
}

export const ValidatedDemandForm: React.FC<ValidatedDemandFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  mode = "create",
}) => {
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const {
    control,
    reset,
    formState: { isValid, isDirty },
    watch,
    handleSubmit: createSubmitHandler,
    trigger,
  } = useValidatedForm(initialData);

  const handleFormSubmit = createSubmitHandler(onSubmit);

  // Manejar intento de envío con validación visual
  const handleSubmitAttempt = async (e: React.FormEvent) => {
    e.preventDefault();

    // Activar validación para todos los campos
    const isFormValid = await trigger();

    if (!isFormValid) {
      setShowValidationErrors(true);
      return;
    }

    // Si es válido, proceder con el envío
    setShowValidationErrors(false);
    handleFormSubmit(e);
  };

  // Opciones para los selects - usando los valores correctos del schema
  const urgencyOptions = [
    { value: "low", label: "Baja" },
    { value: "medium", label: "Media" },
    { value: "high", label: "Alta" },
    { value: "critical", label: "Crítica" },
  ];

  const businessImpactOptions = [
    { value: "low", label: "Bajo" },
    { value: "medium", label: "Medio" },
    { value: "high", label: "Alto" },
  ];

  const complexityOptions = [
    { value: "low", label: "Baja" },
    { value: "medium", label: "Media" },
    { value: "high", label: "Alta" },
  ];

  const categoryOptions = [
    { value: "frontend", label: "Frontend" },
    { value: "backend", label: "Backend" },
    { value: "database", label: "Base de Datos" },
    { value: "infrastructure", label: "Infraestructura" },
    { value: "integration", label: "Integración" },
    { value: "security", label: "Seguridad" },
  ];

  // Observar cambios para mostrar información adicional
  const urgency = watch("urgency");
  const estimatedEffort = watch("estimatedEffort");

  const handleReset = () => {
    reset({ ...demandDefaults, ...initialData });
  };

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mt: 2 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {mode === "create" ? "Crear Nueva Demanda" : "Editar Demanda"}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmitAttempt} noValidate>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Alerta de errores de validación */}
            {showValidationErrors && !isValid && (
              <Alert severity="error">
                ⚠️ {FORM_ERROR_MESSAGES.VALIDATION_FAILED}
              </Alert>
            )}
            {/* Información Básica */}
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Información Básica
              </Typography>
            </Box>

            <Box>
              <ValidatedTextField
                name="title"
                control={control}
                label="Título de la Demanda"
                required
                placeholder="Ingrese un título descriptivo"
                helperText="Título descriptivo de la demanda"
              />
            </Box>

            <Box>
              <ValidatedTextField
                name="description"
                control={control}
                label="Descripción"
                required
                multiline
                rows={4}
                placeholder="Describe detalladamente la demanda..."
                helperText={VALIDATION_HELPER_TEXTS.SHORT_TEXT_RANGE}
              />
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
                <ValidatedSelect
                  name="type"
                  control={control}
                  label="Tipo de Demanda"
                  required
                  options={[
                    { value: "feature", label: "Nueva Funcionalidad" },
                    { value: "bug", label: "Corrección de Error" },
                    { value: "enhancement", label: "Mejora" },
                    { value: "maintenance", label: "Mantenimiento" },
                    { value: "research", label: "Investigación" },
                  ]}
                  helperText="Selecciona el tipo de demanda"
                />
              </Box>

              <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
                <ValidatedSelect
                  name="urgency"
                  control={control}
                  label="Urgencia"
                  required
                  options={urgencyOptions}
                  helperText="Nivel de urgencia de la demanda"
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
                <ValidatedSelect
                  name="businessImpact"
                  control={control}
                  label="Impacto en el Negocio"
                  required
                  options={businessImpactOptions}
                  helperText="Impacto esperado en el negocio"
                />
              </Box>

              <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
                <ValidatedSelect
                  name="complexity"
                  control={control}
                  label="Complejidad"
                  options={complexityOptions}
                  helperText="Complejidad técnica estimada"
                />
              </Box>
            </Box>

            {/* Información del Negocio */}
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Información del Negocio
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
                <ValidatedTextField
                  name="businessUnit"
                  control={control}
                  label="Unidad de Negocio"
                  required
                  placeholder="Ej: Ventas, Marketing, IT"
                  helperText="Unidad organizacional que solicita"
                />
              </Box>

              <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
                <ValidatedTextField
                  name="requestor"
                  control={control}
                  label="Solicitante"
                  required
                  placeholder="Nombre del solicitante"
                  helperText="Persona que solicita la demanda"
                />
              </Box>
            </Box>

            <Box>
              <ValidatedTextField
                name="businessJustification"
                control={control}
                label="Justificación del Negocio"
                required
                multiline
                rows={3}
                placeholder="Explica por qué es necesaria esta demanda..."
                helperText="Justificación detallada de la necesidad"
              />
            </Box>

            <Box>
              <ValidatedTextField
                name="expectedBenefit"
                control={control}
                label="Beneficio Esperado"
                multiline
                rows={2}
                placeholder="Describe los beneficios esperados..."
                helperText="Beneficios que se espera obtener"
              />
            </Box>

            {/* Información Técnica */}
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Información Técnica
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
                <ValidatedSelect
                  name="category"
                  control={control}
                  label="Categoría"
                  options={categoryOptions}
                  helperText="Categoría técnica del trabajo"
                />
              </Box>

              <Box sx={{ flex: "1 1 300px", minWidth: "250px" }}>
                <ValidatedTextField
                  name="estimatedEffort"
                  control={control}
                  label="Esfuerzo Estimado (horas)"
                  type="number"
                  placeholder="0"
                  helperText="Estimación en horas de trabajo"
                />
              </Box>
            </Box>

            <Box>
              <ValidatedTextField
                name="technicalRequirements"
                control={control}
                label="Requerimientos Técnicos"
                multiline
                rows={3}
                placeholder="Especificaciones técnicas..."
                helperText="Requerimientos técnicos detallados"
              />
            </Box>

            <Box>
              <ValidatedTextField
                name="acceptanceCriteria"
                control={control}
                label="Criterios de Aceptación"
                multiline
                rows={3}
                placeholder="Define cuándo se considera completada..."
                helperText="Criterios para considerar la demanda completada"
              />
            </Box>

            {/* Información Adicional */}
            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                Información Adicional
              </Typography>
            </Box>

            <Box>
              <ValidatedTextField
                name="comments"
                control={control}
                label="Comentarios"
                multiline
                rows={2}
                placeholder="Comentarios adicionales..."
                helperText="Cualquier información adicional relevante"
              />
            </Box>

            {/* Alerta condicional para urgencia alta */}
            {urgency === "critical" && (
              <Box>
                <Alert severity="warning">
                  ⚠️ Demanda marcada como CRÍTICA - Requiere atención inmediata
                  {estimatedEffort && Number(estimatedEffort) > 40 && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      ⏰ Alto esfuerzo estimado: {estimatedEffort} horas
                    </Typography>
                  )}
                </Alert>
              </Box>
            )}

            {/* Botones de acción */}
            <Box>
              <CardActions sx={{ justifyContent: "flex-end", gap: 2 }}>
                {onCancel && (
                  <Button
                    variant="outlined"
                    onClick={onCancel}
                    startIcon={<CancelIcon />}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                )}

                <Button
                  type="button"
                  variant="outlined"
                  onClick={handleReset}
                  disabled={loading || !isDirty}
                >
                  Limpiar
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  color={
                    showValidationErrors && !isValid
                      ? VALIDATION_COLORS.ERROR
                      : VALIDATION_COLORS.PRIMARY
                  }
                  startIcon={<SaveIcon />}
                  disabled={loading}
                  sx={{
                    ...(showValidationErrors &&
                      !isValid && {
                        backgroundColor: "error.main",
                        "&:hover": {
                          backgroundColor: "error.dark",
                        },
                      }),
                  }}
                >
                  {loading
                    ? "Guardando..."
                    : showValidationErrors && !isValid
                    ? FORM_ERROR_MESSAGES.MISSING_REQUIRED_FIELDS
                    : mode === "create"
                    ? "Crear Demanda"
                    : "Actualizar Demanda"}
                </Button>
              </CardActions>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ValidatedDemandForm;
