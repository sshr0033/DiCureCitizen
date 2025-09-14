
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../assets/logo.jpeg";

export default function NavBar() {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Detect Scam", path: "/detectscam" },
    { label: "Help Center", path: "/help-center" },
    { label: "Resources", path: "/resources" },
    { label: "Test Your Understanding", path: "/test-understanding" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{ bgcolor: "white", color: "black", borderBottom: "1px solid #e0e0e0" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
       
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box component="img" src={Logo} alt="Logo" sx={{ height: 40, mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            DiCureCitizen
          </Typography>
        </Box>

        <Box>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={NavLink}
              to={item.path}
              sx={{
                color: "black",
                fontWeight: 600,
                "&.active": { color: "olive.main" }, 
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
