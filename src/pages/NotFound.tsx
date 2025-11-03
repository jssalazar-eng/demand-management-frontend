import { Home as HomeIcon } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      textAlign="center"
    >
      <Card sx={{ maxWidth: 400, p: 3 }}>
        <CardContent>
          <Typography variant="h1" component="h1" gutterBottom color="primary">
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            Página no encontrada
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            La página que estás buscando no existe o ha sido movida.
          </Typography>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            size="large"
          >
            Ir al Dashboard
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NotFound;
