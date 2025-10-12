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
import { Link as RouterLink } from "react-router-dom";
import Logo from "../assets/logo.png";
import * as styles from "../styles/navBarStyles";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Detect Scam", path: "/detectscam" },
  { label: "Listen to Scam Audios", path: "/scamAudio" },
   { label: "Learn Digital Citizenship", path: "/lessons" },
  { label: "Resources", path: "/resources" }
 
];


/* 
@author Team marshmellow
@version 0.0.1
Footer class to provide a general Footer to the entire website. 
*/
export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={styles.drawerContainer}>
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
            sx={styles.drawerItem}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ fontSize: "1rem", fontWeight: 500 }}
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
          <Box component={RouterLink} to="/" sx={styles.logoBox}>
            <Box component="img" src={Logo} alt="Logo" sx={styles.logoImg} />
            <Typography sx={styles.logoText}>DiCureCitizen</Typography>
          </Box>

          {/* Center: Desktop Navigation */}
          <Box sx={styles.navLinksContainer}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={RouterLink}
                to={item.path}
                disableRipple
                sx={styles.navButton}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right: Icons */}
          <Box sx={styles.iconGroup}>
            {/* Mobile menu */}
            <IconButton onClick={handleDrawerToggle} sx={styles.menuButtonMobile}>
              <MenuIcon />
            </IconButton>

           
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
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
