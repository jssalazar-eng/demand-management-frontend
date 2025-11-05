/**
 * Constantes relacionadas con validación de formularios
 */

// Límites de longitud de texto
export const VALIDATION_LIMITS = {
  TITLE_MIN_LENGTH: 1,
  TITLE_MAX_LENGTH: 200,
  DESCRIPTION_MIN_LENGTH: 1,
  DESCRIPTION_MAX_LENGTH: 2000,
  BUSINESS_JUSTIFICATION_MIN_LENGTH: 1,
  BUSINESS_JUSTIFICATION_MAX_LENGTH: 1000,
  EXPECTED_BENEFIT_MAX_LENGTH: 500,
  STAKEHOLDERS_MAX_LENGTH: 500,
  TECHNICAL_REQUIREMENTS_MAX_LENGTH: 1000,
  ACCEPTANCE_CRITERIA_MAX_LENGTH: 1000,
  COMMENTS_MAX_LENGTH: 1000,
  BUSINESS_UNIT_MIN_LENGTH: 1,
  REQUESTOR_MIN_LENGTH: 1,
  // Límites adicionales
  SHORT_TEXT_MIN: 10,
  SHORT_TEXT_MAX: 1000,
} as const;

// Mensajes de validación
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "Este campo es requerido",
  TITLE_REQUIRED: "Título es requerido",
  TITLE_TOO_LONG: "Título muy largo",
  DESCRIPTION_REQUIRED: "Descripción es requerida",
  DESCRIPTION_TOO_LONG: "Descripción muy larga",
  BUSINESS_JUSTIFICATION_REQUIRED: "Justificación es requerida",
  BUSINESS_JUSTIFICATION_TOO_LONG: "Justificación muy larga",
  EXPECTED_BENEFIT_TOO_LONG: "Beneficio esperado muy largo",
  STAKEHOLDERS_TOO_LONG: "Lista de stakeholders muy larga",
  TECHNICAL_REQUIREMENTS_TOO_LONG: "Requerimientos técnicos muy largos",
  ACCEPTANCE_CRITERIA_TOO_LONG: "Criterios de aceptación muy largos",
  COMMENTS_TOO_LONG: "Comentarios muy largos",
  BUSINESS_UNIT_REQUIRED: "Unidad de negocio es requerida",
  REQUESTOR_REQUIRED: "Solicitante es requerido",
  EFFORT_POSITIVE: "Esfuerzo debe ser positivo",
} as const;

// Helper texts para campos
export const VALIDATION_HELPER_TEXTS = {
  SHORT_TEXT_RANGE: `Mínimo ${VALIDATION_LIMITS.SHORT_TEXT_MIN} caracteres, máximo ${VALIDATION_LIMITS.SHORT_TEXT_MAX}`,
} as const;

// Mensajes de error del formulario
export const FORM_ERROR_MESSAGES = {
  VALIDATION_FAILED:
    "Por favor, completa todos los campos obligatorios marcados en rojo",
  MISSING_REQUIRED_FIELDS: "Faltan campos obligatorios",
  FORM_SUBMISSION_ERROR: "Error al enviar el formulario",
  FORM_SUCCESS: "Formulario enviado correctamente",
} as const;

// Configuración de colores para estados de validación
export const VALIDATION_COLORS = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  PRIMARY: "primary",
} as const;
