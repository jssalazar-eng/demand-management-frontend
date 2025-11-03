import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Users: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Usuarios
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Administra los usuarios del sistema
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lista de Usuarios
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta funcionalidad está en desarrollo...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Users;
