import { Box, Typography, Button, Container } from "@mui/material";
import HelpBg from "../assets/worriedman.jpg"; 
import { useNavigate } from "react-router-dom";

/* 
@author Team marshmellow
@version 0.0.1
Footer class to provide a general Footer to the entire website. 
*/
export default function HelpCenter() {
    const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        bgcolor: "black",
        color: "white",
        py: { xs: 8, md: 12 },
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
          filter: "blur(7px)",  
          transform: "scale(1.1)", 
        }}
      />

     
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.4)",
        }}
      />

     
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          gutterBottom
          sx={{ color: "white" }}
        >
          Scammed? <span style={{ color: "white" }}>we are here to help</span>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 4,
            fontWeight: 600,
            color: "#eae8da", 
          }}
        >
          Explore our curated resources that includes help resources and guides you
          on how to prepare your documents to get help from CyberHelp in Australia
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
            onClick={() => navigate("/helpcenter")}
        >
          Help Center
        </Button>
      </Container>
    </Box>
  );
}
