import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

// Campo de texto validado
export function ValidatedTextField({
  control,
  name,
  label,
  required = false,
  multiline = false,
  rows = 1,
  type = "text",
  ...props
}: any) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          required={required}
          multiline={multiline}
          rows={multiline ? rows : 1}
          error={!!error}
          helperText={error?.message}
          fullWidth
          margin="normal"
          {...props}
        />
      )}
    />
  );
}

// Select validado
export function ValidatedSelect({
  control,
  name,
  label,
  required = false,
  options,
  ...props
}: any) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth margin="normal" error={!!error}>
          <InputLabel>
            {label}
            {required && " *"}
          </InputLabel>
          <Select {...field} label={label + (required ? " *" : "")} {...props}>
            {options.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <Typography
              variant="caption"
              color="error"
              sx={{ ml: 1.5, mt: 0.5 }}
            >
              {error.message}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
}

// Checkbox validado
export function ValidatedCheckbox({ control, name, label, ...props }: any) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={field.value || false}
              onChange={field.onChange}
              {...props}
            />
          }
          label={label}
        />
      )}
    />
  );
}

// Campo de tags simplificado (como texto por ahora)
export function ValidatedTagsField({ control, name, label, ...props }: any) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          error={!!error}
          helperText={error?.message || "Ingrese tags separados por comas"}
          fullWidth
          margin="normal"
          {...props}
        />
      )}
    />
  );
}
