import {
  Analytics,
  Assignment,
  Dashboard,
  Notifications,
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
import {
  NAVIGATION_IDS,
  NAVIGATION_LABELS,
  ROUTES,
} from "../../constants/navigation";
import { COLOR_STATES, COMMON_STYLES, UI_CONSTANTS } from "../../constants/ui";
import { MenuItem } from "../../types";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  {
    id: NAVIGATION_IDS.DASHBOARD,
    label: NAVIGATION_LABELS.DASHBOARD,
    path: ROUTES.DASHBOARD,
    icon: Dashboard,
  },
  {
    id: NAVIGATION_IDS.DEMANDS,
    label: NAVIGATION_LABELS.DEMANDS,
    path: ROUTES.DEMANDS,
    icon: Assignment,
  },
  {
    id: NAVIGATION_IDS.USERS,
    label: NAVIGATION_LABELS.USERS,
    path: ROUTES.USERS,
    icon: People,
  },
  {
    id: NAVIGATION_IDS.REPORTS,
    label: NAVIGATION_LABELS.REPORTS,
    path: ROUTES.REPORTS,
    icon: Analytics,
  },
];

const settingsItems: MenuItem[] = [
  {
    id: NAVIGATION_IDS.NOTIFICATIONS,
    label: NAVIGATION_LABELS.NOTIFICATIONS,
    path: ROUTES.NOTIFICATIONS,
    icon: Notifications,
  },
  {
    id: NAVIGATION_IDS.SETTINGS,
    label: NAVIGATION_LABELS.SETTINGS,
    path: ROUTES.SETTINGS,
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
                  sx={{
                    color: isActive
                      ? COLOR_STATES.PRIMARY
                      : COLOR_STATES.INHERIT,
                  }}
                >
                  <Icon />
                </ListItemIcon>
              )}
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    color: isActive
                      ? COLOR_STATES.PRIMARY
                      : COLOR_STATES.INHERIT,
                    fontWeight: isActive
                      ? COMMON_STYLES.FONT_WEIGHT.BOLD
                      : COMMON_STYLES.FONT_WEIGHT.NORMAL,
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
          display: {
            xs: COMMON_STYLES.DISPLAY.BLOCK,
            md: COMMON_STYLES.DISPLAY.NONE,
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: UI_CONSTANTS.DRAWER_WIDTH,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: COMMON_STYLES.DISPLAY.NONE,
            md: COMMON_STYLES.DISPLAY.BLOCK,
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: UI_CONSTANTS.DRAWER_WIDTH,
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
