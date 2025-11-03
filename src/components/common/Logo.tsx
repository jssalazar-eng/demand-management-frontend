import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

// Import logo image - puedes cambiar a logo.webp cuando lo tengas
import logoImage from "../../assets/images/logo.webp";

interface LogoProps {
  size?: "small" | "medium" | "large";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const theme = useTheme();

  const sizeMap = {
    small: { width: 40, height: 40, fontSize: "0.875rem" },
    medium: { width: 52, height: 52, fontSize: "1rem" },
    large: { width: 64, height: 64, fontSize: "1.25rem" },
  };

  const currentSize = sizeMap[size];

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box
        component="img"
        src={logoImage}
        alt="HACEB Logo"
        sx={{
          width: currentSize.width,
          height: currentSize.height,
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(171, 188, 46, 0.3)",
          objectFit: "contain",
          backgroundColor: "transparent",
        }}
        onError={(e) => {
          // Fallback si la imagen no se puede cargar
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
          target.nextElementSibling?.setAttribute("style", "display: flex");
        }}
      />
      {/* Fallback logo en caso de que la imagen no cargue */}
      <Box
        sx={{
          width: currentSize.width,
          height: currentSize.height,
          borderRadius: "8px",
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          display: "none", // Oculto por defecto, se muestra si la imagen falla
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(171, 188, 46, 0.3)",
        }}
      >
        <Typography
          variant="h6"
          component="span"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: currentSize.fontSize,
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          H
        </Typography>
      </Box>
    </Box>
  );
};
