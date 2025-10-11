import { Box, Container, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/pageStyles.css";
 
 
/*
@author Team marshmellow
@version 0.0.1
Footer class to provide a general Footer to the entire website.
*/
 
export default function Footer() {
  const footerLinks = [
    { label: "Home", path: "/" },
    { label: "Detect Scam", path: "/detectscam" },
    { label: "Help Center", path: "/helpcenter" },
    { label: "Resources", path: "/detectscam#articles" },
  ];
 
  return (
    <Box className="footer">
      <Container className="footer-container">
        <Box className="footer-links">
          {footerLinks.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.path}
              className="footer-link"
            >
              {item.label}
            </Button>
          ))}
        </Box>
        <Typography variant="body2" className="footer-text">
          © DiCureCitizen 2025. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
 