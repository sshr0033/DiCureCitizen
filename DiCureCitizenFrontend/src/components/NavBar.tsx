import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import * as styles from "../styles/navBarStyles";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Detect Scam", path: "/detectscam" },
  { label: "Listen to Scam Audios", path: "/scamAudio" },
  { label: "Learn Digital Citizenship", path: "/lessons" },
  { label: "Help Center", path: "/helpcenter" },
];

/* 
@author Team marshmellow
@version 0.0.1
Nav Bar to provide a general Header for all pages
*/
export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleNavigate = () => setMobileOpen(false);

  const drawerContent = (
    <Box
      onClick={handleDrawerToggle}
      sx={styles.drawerContainer}
      role="presentation"
    >
      <Box sx={styles.drawerHeader}>
        <Box component="img" src={Logo} alt="Logo" sx={styles.drawerLogo} />
        <Typography sx={styles.drawerTitle}>DiCureCitizen</Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={RouterLink}
            to={item.path}
            onClick={handleNavigate}
            sx={{
              ...styles.drawerItem,
              ...(pathname === item.path
                ? { bgcolor: "rgba(255,255,255,0.12)" }
                : {}),
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: "1rem",
                fontWeight: pathname === item.path ? 700 : 500,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" elevation={0} sx={styles.appBar}>
        <Toolbar disableGutters sx={styles.toolbar}>
          {/* Left: Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={styles.logoBox}
            aria-label="Home"
          >
            <Box component="img" src={Logo} alt="Logo" sx={styles.logoImg} />
            <Typography sx={styles.logoText}>DiCureCitizen</Typography>
          </Box>

          {/**Item names on the top of the nav bar */}
          <Box sx={styles.navLinksContainer}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={RouterLink}
                to={item.path}
                disableRipple
                sx={{
                  ...styles.navButton,
                  ...(pathname === item.path
                    ? { bgcolor: "rgba(255,255,255,0.25)" }
                    : {}),
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <Box sx={styles.iconGroup}>
            {/** Mobile view navbar, becomes a dialog box for better access */}
            <IconButton
              onClick={handleDrawerToggle}
              sx={styles.menuButtonMobile}
              aria-label="Open menu"
              aria-controls="global-nav-drawer"
              aria-haspopup="true"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        id="global-nav-drawer"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={styles.drawer}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
