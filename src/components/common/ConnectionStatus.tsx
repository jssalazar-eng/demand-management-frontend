import {
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Wifi as WifiIcon,
  WifiOff as WifiOffIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Chip,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useConnectionStatus } from "../../hooks/useRepository";

interface ConnectionStatusProps {
  showDetails?: boolean;
  compact?: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  showDetails = true,
  compact = false,
}) => {
  const { isOnline, lastError, testConnection } = useConnectionStatus();
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    if (lastError) {
      setShowError(true);
    }
  }, [lastError]);

  const handleTestConnection = async () => {
    await testConnection();
  };

  if (compact) {
    return (
      <Box display="flex" alignItems="center" gap={1}>
        <Chip
          icon={isOnline ? <WifiIcon /> : <WifiOffIcon />}
          label={isOnline ? "Conectado" : "Sin conexión"}
          color={isOnline ? "success" : "error"}
          size="small"
          variant="outlined"
        />
        {!isOnline && (
          <IconButton size="small" onClick={handleTestConnection}>
            <RefreshIcon />
          </IconButton>
        )}
      </Box>
    );
  }

  return (
    <>
      <Alert
        severity={isOnline ? "success" : "warning"}
        icon={isOnline ? <WifiIcon /> : <WifiOffIcon />}
        action={
          !isOnline && (
            <Button
              color="inherit"
              size="small"
              onClick={handleTestConnection}
              startIcon={<RefreshIcon />}
            >
              Probar conexión
            </Button>
          )
        }
        sx={{ mb: 2 }}
      >
        <Typography variant="body2">
          {isOnline
            ? "Conectado a internet - Los datos están sincronizados"
            : "Sin conexión - Mostrando datos en caché"}
        </Typography>
        {showDetails && !isOnline && (
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            • Los cambios se guardarán cuando se restaure la conexión
            <br />• Algunas funciones pueden no estar disponibles
          </Typography>
        )}
      </Alert>

      {/* Snackbar para errores de conexión */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setShowError(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {lastError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ConnectionStatus;
