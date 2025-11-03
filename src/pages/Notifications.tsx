import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Notifications: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Notificaciones
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Gestiona las notificaciones del sistema
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Centro de Notificaciones
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta funcionalidad está en desarrollo...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Notifications;
