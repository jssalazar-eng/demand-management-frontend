import { createTheme } from "@mui/material/styles";
import { UI_CONSTANTS } from "../constants/ui";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#abbc2e",
      light: "#c5d255",
      dark: "#7a8620",
    },
    secondary: {
      main: "#000",
      light: "#333",
      dark: "#000",
    },
    background: {
      default: "#f1f1f1",
      paper: "#fff",
    },
    success: {
      main: "#abbc2e",
      light: "#c5d255",
      dark: "#7a8620",
    },
    warning: {
      main: "#ed6c02",
      light: "#ff9800",
      dark: "#e65100",
    },
    error: {
      main: "#d32f2f",
      light: "#ef5350",
      dark: "#c62828",
    },
    info: {
      main: "#abbc2e",
      light: "#c5d255",
      dark: "#7a8620",
    },
    text: {
      primary: "#000",
      secondary: "#666",
    },
  },
  typography: {
    fontFamily:
      'Asap, Poppins, Montserrat, "San Francisco", icomoon, -apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
    fontSize: 13,
    h1: {
      fontSize: "2.5rem",
      fontWeight: UI_CONSTANTS.FONT_WEIGHTS.MEDIUM,
      color: "#000",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: UI_CONSTANTS.FONT_WEIGHTS.MEDIUM,
      color: "#000",
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: UI_CONSTANTS.FONT_WEIGHTS.MEDIUM,
      color: "#000",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: UI_CONSTANTS.FONT_WEIGHTS.MEDIUM,
      color: "#000",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: UI_CONSTANTS.FONT_WEIGHTS.MEDIUM,
      color: "#000",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: UI_CONSTANTS.FONT_WEIGHTS.MEDIUM,
      color: "#000",
    },
    body1: {
      fontSize: "13px",
      color: "#000",
    },
    body2: {
      fontSize: "12px",
      color: "#666",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#abbc2e",
          color: "#000",
        },
      },
    },
  },
});
