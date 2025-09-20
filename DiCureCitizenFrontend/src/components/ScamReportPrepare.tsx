import { Box, Typography, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";
import { useState } from "react";

import ScamImg from "../assets/oldmanpic.png";
import ReportImg from "../assets/oldmanreading.jpg";
import FinaliseImg from "../assets/oldmantension.jpg";

const steps = [
  {
    id: 1,
    image: ScamImg,
    title: "Identify the Scam",
    description: "This is Scam this Type\nThis is Scam This type",
    details: "More detailed explanation about identifying scams...",
    buttonText: "Identify Scam",
    buttonColor: "#4c5f26",
  },
  {
    id: 2,
    image: ReportImg,
    title: "Prepare for Reports",
    description: `Here are the documents needed for you to collect
    Document 1: source to get
    Document 2: Source to get
    Document 3: Source to get`,
    details: "Detailed steps on preparing reports...",
    buttonText: "View All Documents",
    buttonColor: "#4c5f26",
  },
  {
    id: 3,
    image: FinaliseImg,
    title: "Finalise the report",
    description: "Proceed ahead to the cyber.gov.au to finalise the report with the documents collected.",
    details: "More info on finalising the report...",
    buttonText: "Finalise Report",
    buttonColor: "#4c5f26",
  },
];

export default function ScamReportPrepare() {
const [flippedCard, setFlippedCard] = useState<number | null>(null);




  const handleFlip = (id:number) => {
    setFlippedCard(flippedCard === id ? null : id);
  };

  return (
    <Box>
      <Box
        component="section"
        sx={{
          bgcolor: "#eae8da",
          py: { xs: 6, md: 10 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            mb: 2,
          }}
        >
          Scammers are everywhere and <br />
          so is the cyber crime police.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: "700px",
            mx: "auto",
            color: "text.secondary",
            fontSize: "1.1rem",
          }}
        >
          Australia provides help to every citizen who faces any kind of scam,
          all you need to do is report it and the cyberpolice takes the rest.
        </Typography>
      </Box>

      <Box component="section" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 4 }}>
          What to do?
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {steps.map((step) => (
      
              <Box
                sx={{
                  perspective: "1000px",
                  width: 300,
                  height: 420,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.6s",
                    transformStyle: "preserve-3d",
                    transform: flippedCard === step.id ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  <Card
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      boxShadow: 4,
                      bgcolor: "#f7f6ef",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={step.image}
                      alt={step.title}
                      sx={{ height: 200, objectFit: "cover" }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: 2,
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                          {step.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ whiteSpace: "pre-line" }}
                        >
                          {step.description}
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        onClick={() => handleFlip(step.id)}
                        sx={{
                          bgcolor: step.buttonColor,
                          borderRadius: "50px",
                          textTransform: "none",
                          fontWeight: 700,
                          px: 4,
                          py: 1,
                          mt: "auto",
                          alignSelf: "center",
                          width: "80%",
                          "&:hover": { bgcolor: "#3a4a1c" },
                        }}
                      >
                        {step.buttonText}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      boxShadow: 4,
                      bgcolor: "#f7f6ef",
                    }}
                  >
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        p: 2,
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight={700} gutterBottom>
                          {step.title} - Details
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {step.details}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        onClick={() => handleFlip(step.id)}
                        sx={{
                          px: 4,
                          py: 1,
                          borderRadius: "50px",
                          bgcolor: "#4c5f26",
                          fontWeight: 700,
                          mt: "auto",
                          alignSelf: "center",
                          width: "80%",
                          "&:hover": { bgcolor: "#3a4a1c", color: "white" },
                        }}
                      >
                        Back
                      </Button>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
      
          )) }
        </Grid>

        
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{ mt: 6, color: "black" }}
        >
          If Immediate threat to life and risk dial 000 now !
        </Typography>
      </Box>
    </Box>
  );
}
