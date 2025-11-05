import { Box, CssBaseline, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { UI_CONSTANTS } from "../../constants/ui";
import { ConnectionStatus } from "../common";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header onMenuToggle={handleSidebarToggle} />
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${UI_CONSTANTS.DRAWER_WIDTH}px)` },
          ml: { md: `${UI_CONSTANTS.DRAWER_WIDTH}px` },
          minHeight: "100vh",
          backgroundColor: "grey.50",
        }}
      >
        <Toolbar />
        <ConnectionStatus compact showDetails={false} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
