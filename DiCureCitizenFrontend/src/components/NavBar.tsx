import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logo.jpeg";
import { navBarStyles } from "../styles";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Detect Scam", path: "/detectscam" },
    { label: "Help Center", path: "/helpcenter" },
    { label: "Resources", path: "/detectscam#articles" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={NavLink}
            to={item.path}
            sx={{
              textAlign: "center",
              color: "black",
              textDecoration: "none",
              "&.active": { color: "olive", fontWeight: 700 },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          color: "white",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
         
          <Box
            component={Link}
            to="/"
            sx={[
              navBarStyles.navStyle,
              {
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              p: 2,
            }]}
          >
            <Box
              component="img"
              src={Logo}
              alt="Logo"
              sx={{ height: 40, mr: 1 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              DiCureCitizen
            </Typography>
          </Box>

          <Box sx={[ 
            navBarStyles.navStyle, 
            { 
              display: { xs: "none", md: "flex" }, 
              p: 1,
              position: "absolute", 
              left: "50%", 
              transform: "translateX(-50%)", 
              }]}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={NavLink}
                to={item.path}
                sx={{
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "20px",
                  "&.active": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            edge="end"
            sx={[ 
              navBarStyles.navStyle,
              {
                display: { md: "none" },
                "&:hover": { bgcolor: "rgba(0, 0, 0, 0.3)"}
              }]}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
