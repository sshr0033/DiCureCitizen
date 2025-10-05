import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DataVisualization() {
    const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        background: "linear-gradient(to bottom, #f5f5f5 0%, #ffffffff 50%, #ffffffff 100%)",
        color: "black",
        py: { xs: 12, md: 16 },
        textAlign: "center",
        overflow: "hidden",
      }}
    >
     
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          gutterBottom
          sx={{ color: "black" }}
        >
          Understanding Australian Scam Data
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontWeight: 600,
            color: "#777777ff", 
          }}
        >
          Discover patterns, analyze scam statistics, and make informed decisions 
          with our comprehensive data visualization tools.
        </Typography>

        <Button
          variant="contained"
          sx={{
            px: 6,
            py: 2,
            borderRadius: "50px",
            bgcolor: "#4c5f26",
            fontWeight: 700,
            fontSize: "1.2rem",
            textTransform: "none",
            "&:hover": { bgcolor: "#3a4a1c" },
          }}
            onClick={() => navigate("/visualization")}
        >
          Visualization
        </Button>
      </Container>
    </Box>
  );
}
