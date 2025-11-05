import { z } from "zod";

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
  title: z.string().min(1, "Título es requerido").max(200, "Título muy largo"),
  description: z
    .string()
    .min(1, "Descripción es requerida")
    .max(2000, "Descripción muy larga"),
  type: DemandTypeEnum,

  // Prioridad e impacto
  urgency: UrgencyEnum,
  businessImpact: BusinessImpactEnum,
  complexity: ComplexityEnum.optional(),

  // Información del negocio
  businessUnit: z.string().min(1, "Unidad de negocio es requerida"),
  requestor: z.string().min(1, "Solicitante es requerido"),
  businessJustification: z
    .string()
    .min(1, "Justificación es requerida")
    .max(1000, "Justificación muy larga"),
  expectedBenefit: z
    .string()
    .max(500, "Beneficio esperado muy largo")
    .optional(),
  stakeholders: z
    .string()
    .max(500, "Lista de stakeholders muy larga")
    .optional(),

  // Información técnica
  estimatedEffort: z.number().min(0, "Esfuerzo debe ser positivo").optional(),
  category: CategoryEnum.optional(),
  tags: z.array(z.string()).default([]),
  technicalRequirements: z
    .string()
    .max(1000, "Requerimientos técnicos muy largos")
    .optional(),
  acceptanceCriteria: z
    .string()
    .max(1000, "Criterios de aceptación muy largos")
    .optional(),

  // Información adicional
  attachments: z.string().optional(),
  relatedDemands: z.string().optional(),
  comments: z.string().max(1000, "Comentarios muy largos").optional(),
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
