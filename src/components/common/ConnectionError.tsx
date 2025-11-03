import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Stack,
} from "@mui/material";
import {
  WifiOff as WifiOffIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface ConnectionErrorProps {
  onRetry?: () => void;
  title?: string;
  message?: string;
  showRetry?: boolean;
}

const ConnectionError: React.FC<ConnectionErrorProps> = ({
  onRetry,
  title = "Sin conexión a internet",
  message = "Verifica tu conexión a internet e intenta nuevamente.",
  showRetry = true,
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="400px"
      p={2}
    >
      <Card sx={{ maxWidth: 500, width: "100%" }}>
        <CardContent>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <WifiOffIcon
              sx={{
                fontSize: 64,
                color: "error.main",
                opacity: 0.7,
              }}
            />
            
            <Stack spacing={1}>
              <Typography variant="h5" component="h2" color="error">
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {message}
              </Typography>
            </Stack>

            <Alert severity="info" sx={{ width: "100%" }}>
              <Typography variant="body2">
                • Verifica que estés conectado a internet<br />
                • Comprueba que el servidor esté disponible<br />
                • Intenta recargar la página
              </Typography>
            </Alert>

            {showRetry && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<RefreshIcon />}
                onClick={handleRetry}
                sx={{ mt: 2 }}
              >
                Reintentar
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConnectionError;