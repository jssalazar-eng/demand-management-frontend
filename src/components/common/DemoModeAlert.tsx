import {
  Close as CloseIcon,
  CloudOff as CloudOffIcon,
} from "@mui/icons-material";
import { Alert, AlertTitle, Box, Collapse, IconButton } from "@mui/material";

interface DemoModeAlertProps {
  show: boolean;
  onClose: () => void;
}

export const DemoModeAlert: React.FC<DemoModeAlertProps> = ({
  show,
  onClose,
}) => {
  return (
    <Collapse in={show}>
      <Box sx={{ mb: 2 }}>
        <Alert
          severity="info"
          icon={<CloudOffIcon />}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={onClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{
            backgroundColor: "#e3f2fd",
            borderLeft: "4px solid #2196f3",
          }}
        >
          <AlertTitle>Modo Demo Activo</AlertTitle>
          El backend no está disponible. Se están mostrando datos de ejemplo
          para fines de demostración.
        </Alert>
      </Box>
    </Collapse>
  );
};
