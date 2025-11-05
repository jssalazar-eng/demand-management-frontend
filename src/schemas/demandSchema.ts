import { z } from "zod";
import {
  VALIDATION_LIMITS,
  VALIDATION_MESSAGES,
} from "../constants/validation";

// Enums para las opciones de demanda
export const DemandTypeEnum = z.enum([
  "feature",
  "bug",
  "enhancement",
  "maintenance",
  "research",
]);

export const UrgencyEnum = z.enum(["low", "medium", "high", "critical"]);

export const BusinessImpactEnum = z.enum(["low", "medium", "high"]);

export const ComplexityEnum = z.enum(["low", "medium", "high"]);

export const CategoryEnum = z.enum([
  "frontend",
  "backend",
  "database",
  "infrastructure",
  "integration",
  "security",
]);

export const StatusEnum = z.enum([
  "draft",
  "submitted",
  "in_review",
  "approved",
  "rejected",
  "in_progress",
  "completed",
  "cancelled",
]);

// Schema principal de demanda
export const demandSchema = z.object({
  // Campos básicos
  id: z.string().optional(),
  title: z
    .string()
    .min(VALIDATION_LIMITS.TITLE_MIN_LENGTH, VALIDATION_MESSAGES.TITLE_REQUIRED)
    .max(
      VALIDATION_LIMITS.TITLE_MAX_LENGTH,
      VALIDATION_MESSAGES.TITLE_TOO_LONG
    ),
  description: z
    .string()
    .min(
      VALIDATION_LIMITS.DESCRIPTION_MIN_LENGTH,
      VALIDATION_MESSAGES.DESCRIPTION_REQUIRED
    )
    .max(
      VALIDATION_LIMITS.DESCRIPTION_MAX_LENGTH,
      VALIDATION_MESSAGES.DESCRIPTION_TOO_LONG
    ),
  type: DemandTypeEnum,

  // Prioridad e impacto
  urgency: UrgencyEnum,
  businessImpact: BusinessImpactEnum,
  complexity: ComplexityEnum.optional(),

  // Información del negocio
  businessUnit: z
    .string()
    .min(
      VALIDATION_LIMITS.BUSINESS_UNIT_MIN_LENGTH,
      VALIDATION_MESSAGES.BUSINESS_UNIT_REQUIRED
    ),
  requestor: z
    .string()
    .min(
      VALIDATION_LIMITS.REQUESTOR_MIN_LENGTH,
      VALIDATION_MESSAGES.REQUESTOR_REQUIRED
    ),
  businessJustification: z
    .string()
    .min(
      VALIDATION_LIMITS.BUSINESS_JUSTIFICATION_MIN_LENGTH,
      VALIDATION_MESSAGES.BUSINESS_JUSTIFICATION_REQUIRED
    )
    .max(
      VALIDATION_LIMITS.BUSINESS_JUSTIFICATION_MAX_LENGTH,
      VALIDATION_MESSAGES.BUSINESS_JUSTIFICATION_TOO_LONG
    ),
  expectedBenefit: z
    .string()
    .max(
      VALIDATION_LIMITS.EXPECTED_BENEFIT_MAX_LENGTH,
      VALIDATION_MESSAGES.EXPECTED_BENEFIT_TOO_LONG
    )
    .optional(),
  stakeholders: z
    .string()
    .max(
      VALIDATION_LIMITS.STAKEHOLDERS_MAX_LENGTH,
      VALIDATION_MESSAGES.STAKEHOLDERS_TOO_LONG
    )
    .optional(),

  // Información técnica
  estimatedEffort: z
    .number()
    .min(0, VALIDATION_MESSAGES.EFFORT_POSITIVE)
    .optional(),
  category: CategoryEnum.optional(),
  tags: z.array(z.string()).default([]),
  technicalRequirements: z
    .string()
    .max(
      VALIDATION_LIMITS.TECHNICAL_REQUIREMENTS_MAX_LENGTH,
      VALIDATION_MESSAGES.TECHNICAL_REQUIREMENTS_TOO_LONG
    )
    .optional(),
  acceptanceCriteria: z
    .string()
    .max(
      VALIDATION_LIMITS.ACCEPTANCE_CRITERIA_MAX_LENGTH,
      VALIDATION_MESSAGES.ACCEPTANCE_CRITERIA_TOO_LONG
    )
    .optional(),

  // Información adicional
  attachments: z.string().optional(),
  relatedDemands: z.string().optional(),
  comments: z
    .string()
    .max(
      VALIDATION_LIMITS.COMMENTS_MAX_LENGTH,
      VALIDATION_MESSAGES.COMMENTS_TOO_LONG
    )
    .optional(),
  requiresApproval: z.boolean().default(false),

  // Campos del sistema
  status: StatusEnum.default("draft"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.string().optional(),
  assignedTo: z.string().optional(),
});

// Tipos derivados del schema
export type DemandSchema = z.infer<typeof demandSchema>;
export type DemandType = z.infer<typeof DemandTypeEnum>;
export type UrgencyType = z.infer<typeof UrgencyEnum>;
export type BusinessImpactType = z.infer<typeof BusinessImpactEnum>;
export type ComplexityType = z.infer<typeof ComplexityEnum>;
export type CategoryType = z.infer<typeof CategoryEnum>;
export type StatusType = z.infer<typeof StatusEnum>;

// Valores por defecto para el formulario
export const demandDefaults: Partial<DemandSchema> = {
  type: "feature",
  urgency: "medium",
  businessImpact: "medium",
  complexity: "medium",
  requiresApproval: false,
  status: "draft",
  tags: [],
};

// Schema para crear demanda (sin campos del sistema)
export const createDemandSchema = demandSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  createdBy: true,
  assignedTo: true,
});

// Schema para actualizar demanda (campos opcionales)
export const updateDemandSchema = demandSchema.partial().required({
  id: true,
});

export type CreateDemandSchema = z.infer<typeof createDemandSchema>;
export type UpdateDemandSchema = z.infer<typeof updateDemandSchema>;
