import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FORM_ERROR_MESSAGES } from "../constants/validation";
import {
  demandDefaults,
  DemandSchema,
  demandSchema,
} from "../schemas/demandSchema";

// Hook simplificado para formularios validados
export const useValidatedForm = (initialValues?: Partial<DemandSchema>) => {
  const form = useForm<DemandSchema>({
    resolver: zodResolver(demandSchema),
    defaultValues: { ...demandDefaults, ...initialValues },
    mode: "onChange",
  });

  const createSubmitHandler = (
    onSubmit: (data: DemandSchema) => Promise<void> | void
  ) => {
    return form.handleSubmit(
      async (data) => {
        try {
          await onSubmit(data);
          toast.success(FORM_ERROR_MESSAGES.FORM_SUCCESS);
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : FORM_ERROR_MESSAGES.FORM_SUBMISSION_ERROR
          );
        }
      },
      (errors) => {
        // Callback para errores de validación
        const errorCount = Object.keys(errors).length;
        toast.error(
          `Hay ${errorCount} campo${
            errorCount > 1 ? "s" : ""
          } con errores. Por favor, revisa los campos marcados en rojo.`
        );
      }
    );
  };

  return {
    ...form,
    handleSubmit: createSubmitHandler,
  };
};
