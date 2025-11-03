import {
  Analytics,
  Assignment,
  Category,
  Dashboard,
  People,
  Settings,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItem } from "../../types";

const DRAWER_WIDTH = 240;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: Dashboard,
  },
  {
    id: "demands",
    label: "Demandas",
    path: "/demands",
    icon: Assignment,
  },
  {
    id: "users",
    label: "Usuarios",
    path: "/users",
    icon: People,
  },
  {
    id: "reports",
    label: "Reportes",
    path: "/reports",
    icon: Analytics,
  },
  {
    id: "categories",
    label: "Categorías",
    path: "/categories",
    icon: Category,
  },
];

const settingsItems: MenuItem[] = [
  {
    id: "settings",
    label: "Configuración",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const renderMenuItems = (items: MenuItem[]) => (
    <List>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={isActive}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.light",
                  "&:hover": {
                    backgroundColor: "primary.light",
                  },
                },
              }}
            >
              {Icon && (
                <ListItemIcon
                  sx={{ color: isActive ? "primary.main" : "inherit" }}
                >
                  <Icon />
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: isActive ? "primary.main" : "inherit",
                    fontWeight: isActive ? "bold" : "normal",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  const drawerContent = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Menú
        </Typography>
      </Toolbar>
      <Divider />
      {renderMenuItems(menuItems)}
      <Divider />
      {renderMenuItems(settingsItems)}
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
