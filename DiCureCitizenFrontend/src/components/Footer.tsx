
import { Box, Container, Button, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#f2f2f2", py: 4, mt: 8 }}>
      <Container sx={{ textAlign: "center" }}>
        <Box sx={{ mb: 2 }}>
          {["Home","Detect Spam","Help Center","Resources"].map((item) => (
            <Button key={item} color="inherit">{item}</Button>
          ))}
        </Box>
        <Typography variant="body2" color="text.secondary">
          © DiCureCitizen 2025. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}
