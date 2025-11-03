import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Settings: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Configuración
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Configura las opciones del sistema
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Opciones de Configuración
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta funcionalidad está en desarrollo...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
