import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Categories: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Categorías
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Gestiona las categorías de las demandas
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lista de Categorías
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Esta funcionalidad está en desarrollo...
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Categories;
