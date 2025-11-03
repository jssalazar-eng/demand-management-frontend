import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Reports: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Reportes y Análisis
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Visualiza estadísticas y reportes del sistema
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Dashboard de Reportes
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta funcionalidad está en desarrollo...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reports;
