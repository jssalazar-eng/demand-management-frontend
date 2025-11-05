import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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

  const handleSubmit = async (
    onSubmit: (data: DemandSchema) => Promise<void> | void
  ) => {
    return form.handleSubmit(async (data) => {
      try {
        await onSubmit(data);
        toast.success("Formulario enviado correctamente");
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Error al enviar el formulario"
        );
      }
    });
  };

  return {
    ...form,
    handleSubmit,
  };
};
