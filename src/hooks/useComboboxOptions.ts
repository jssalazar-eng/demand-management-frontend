import { useEffect, useState } from "react";
import {
  BusinessUnitOption,
  CategoryOption,
  ComboboxOptionsService,
  DemandTypeOption,
  SelectOption,
} from "../services/ComboboxOptionsService";

export interface ComboboxOptions {
  demandTypes: DemandTypeOption[];
  urgencyLevels: SelectOption[];
  businessImpactLevels: SelectOption[];
  complexityLevels: SelectOption[];
  businessUnits: BusinessUnitOption[];
  categories: CategoryOption[];
}

export interface UseComboboxOptionsReturn {
  options: ComboboxOptions;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Hook para cargar opciones de combobox desde el backend
 */
export const useComboboxOptions = (): UseComboboxOptionsReturn => {
  const [options, setOptions] = useState<ComboboxOptions>({
    demandTypes: [],
    urgencyLevels: [],
    businessImpactLevels: [],
    complexityLevels: [],
    businessUnits: [],
    categories: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOptions = async () => {
    try {
      setLoading(true);
      setError(null);

      const catalogData = await ComboboxOptionsService.getAllCatalogs();
      setOptions(catalogData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error loading options";
      setError(errorMessage);
      console.error("Error loading combobox options:", err);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await loadOptions();
  };

  useEffect(() => {
    loadOptions();
  }, []);

  return {
    options,
    loading,
    error,
    refresh,
  };
};

/**
 * Hook específico para cargar opciones de un tipo específico
 */
export const useSpecificOptions = (optionType: keyof ComboboxOptions) => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSpecificOptions = async () => {
      try {
        setLoading(true);
        setError(null);

        let result: SelectOption[] = [];

        switch (optionType) {
          case "demandTypes":
            result = await ComboboxOptionsService.getDemandTypes();
            break;
          case "urgencyLevels":
            result = await ComboboxOptionsService.getUrgencyLevels();
            break;
          case "businessImpactLevels":
            result = await ComboboxOptionsService.getBusinessImpactLevels();
            break;
          case "complexityLevels":
            result = await ComboboxOptionsService.getComplexityLevels();
            break;
          case "businessUnits":
            result = await ComboboxOptionsService.getBusinessUnits();
            break;
          case "categories":
            result = await ComboboxOptionsService.getCategories();
            break;
          default:
            throw new Error(`Unknown option type: ${optionType}`);
        }

        setOptions(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error loading options";
        setError(errorMessage);
        console.error(`Error loading ${optionType}:`, err);
      } finally {
        setLoading(false);
      }
    };

    loadSpecificOptions();
  }, [optionType]);

  return { options, loading, error };
};
