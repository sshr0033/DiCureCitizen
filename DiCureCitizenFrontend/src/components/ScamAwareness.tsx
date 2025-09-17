import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ScamAwarenessSection() {
      const navigate = useNavigate();
  return (
    <Box
    id= "latestScams"
  component="section"
  sx={{
    bgcolor: "#eae8da",
    py: { xs: 6, md: 8 },
  }}
>
  <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}> 
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 4,
      }}
    >
    
      <Box
        sx={{
          flex: 2,
          maxWidth: "65%",    
          position: "relative",
          paddingTop: "45%",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: 4,
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/89RaMNLoo-Y?autoplay=1&mute=1&si=4AFJRC5Pd-azmiET"
          title="YouTube video"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",   
            border: "0",
          }}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Box>

      <Box sx={{ flex: 1, pr: { md: 6 } }}> 
        <Typography variant="h5" fontWeight={800} gutterBottom>
          Scams are evolving everyday,
          <br />
          beat it by staying ahead,
          <br />
          Stay alert of the latest scam around Australia.
        </Typography>

        <Button
          variant="contained"
          sx={{
            mt: 3,
            px: 4,
            py: 1.5,
            borderRadius: "50px",
            bgcolor: "#4c5f26",
            fontWeight: 700,
            fontSize: "1rem",
            textTransform: "none",
            "&:hover": { bgcolor: "#3a4a1c" },
          }}
         onClick={() => navigate("/detectscam#articles")}
        >
          Checkout Resources
        </Button>
      </Box>
    </Box>
  </Container>
</Box>

  );
}
