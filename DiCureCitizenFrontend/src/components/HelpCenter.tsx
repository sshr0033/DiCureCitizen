import { Box, Typography, Button, Container } from "@mui/material";
import HelpBg from "../assets/worriedman.jpg"; 

export default function HelpCenterSection() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: "black",
        color: "white",
        py: { xs: 10, md: 16 }, 
        textAlign: "center",
        overflow: "hidden",
      }}
    >
     
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HelpBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)", 
          transform: "scale(1.1)",
        }}
      />

   
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.45)",
        }}
      />

     
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h3" 
          fontWeight={900}
          gutterBottom
          sx={{ color: "white" }}
        >
          Scammed? <span style={{ color: "#fff" }}>we are here to help</span>
        </Typography>

        <Typography
          variant="h5" 
          sx={{
            mb: 5,
            fontWeight: 600,
            color: "#eae8da", 
          }}
        >
          Explore our curated resources that include guides to help you prepare
          your documents and get assistance from CyberHelp in Australia.
        </Typography>

        <Button
          variant="contained"
          sx={{
            px: 8, 
            py: 2,
            borderRadius: "50px",
            bgcolor: "#4c5f26",
            fontWeight: 700,
            fontSize: "1.4rem", 
            textTransform: "none",
            "&:hover": { bgcolor: "#3a4a1c" },
          }}
          onClick={() => window.location.href = "/helpcenter"}
        >
          Help Center
        </Button>
      </Container>
    </Box>
  );
}
