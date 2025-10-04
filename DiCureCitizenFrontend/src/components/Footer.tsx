import { Box, Container, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  const footerLinks = [
    { label: "Home", path: "/" },
    { label: "Detect Scam", path: "/detectscam" },
    { label: "Help Center", path: "/helpcenter" },
    { label: "Resources", path: "/detectscam#articles" },
  ];

  return (
    <Box sx={{ bgcolor: "#eae8da", py: 3, mt: 8 }}>
      <Container sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 2 }}>
          {footerLinks.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              sx={{ color: "black", fontWeight: 600, mx: 1 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary">
          © DiCureCitizen 2025. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
