/**
 * Constantes relacionadas con la interfaz de usuario
 */

// Layout y dimensiones
export const UI_CONSTANTS = {
  DRAWER_WIDTH: 240,
  FONT_WEIGHTS: {
    MEDIUM: 500,
    BOLD: 700,
    NORMAL: 400,
  },
  ELEVATION: {
    LOW: 1,
    MEDIUM: 3,
    HIGH: 8,
  },
} as const;

// Breakpoints para responsividad
export const BREAKPOINTS = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
} as const;

// Variantes de Material-UI
export const MUI_VARIANTS = {
  TYPOGRAPHY: {
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    H5: "h5",
    H6: "h6",
    BODY1: "body1",
    BODY2: "body2",
    CAPTION: "caption",
  },
  BUTTON: {
    CONTAINED: "contained",
    OUTLINED: "outlined",
    TEXT: "text",
  },
  DRAWER: {
    PERMANENT: "permanent",
    TEMPORARY: "temporary",
  },
} as const;

// Estados de color
export const COLOR_STATES = {
  PRIMARY: "primary.main",
  INHERIT: "inherit",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  SUCCESS: "success",
} as const;

// Styles comunes
export const COMMON_STYLES = {
  FONT_WEIGHT: {
    BOLD: "bold",
    NORMAL: "normal",
  },
  DISPLAY: {
    BLOCK: "block",
    NONE: "none",
    FLEX: "flex",
  },
} as const;
