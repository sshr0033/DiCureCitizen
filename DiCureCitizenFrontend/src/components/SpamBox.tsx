import { Box, Container, Typography, Button, TextField } from "@mui/material";

export default function SpamBox() {
  return (
    <>
      <Box
        component="section"
        sx={{ bgcolor: "background.default", py: { xs: 4, md: 5 } }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            Trusted by the seniors of Australia, with 85% spam detection accuracy.
          </Typography>
          <Typography variant="subtitle1">
            Just enter your text below and receive accurate results in 2 minute.
          </Typography>
        </Container>
      </Box>
      <Box
        component="section"
        sx={{ bgcolor: "olive.main", py: { xs: 6, md: 8 } }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              maxWidth: 840,
              mx: "auto",
              bgcolor: "#0d0d0d",
              borderRadius: 3,
              p: { xs: 2.5, md: 4 },
              boxShadow: 6,
              border: "2px solid #000",
            }}
          >
            <TextField
              fullWidth
              multiline
              minRows={7}
              placeholder="Paste your message here..."
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#fff",
                  borderRadius: 2,
                },
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 700,
                  bgcolor: "#5c7a2d",
                  "&:hover": { bgcolor: "#4b6524" },
                }}
              >
                Detect Scam
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
