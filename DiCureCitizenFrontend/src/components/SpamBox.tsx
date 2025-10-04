import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
} from "@mui/material";

const questions = [
  { id: 1, text: "Did they ask you to click a link?" },
  { id: 2, text: "Did they ask for your bank details?" },
  { id: 3, text: "Did they offer you a prize or lottery you never joined?" },
];

export default function SpamBox() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [step, setStep] = useState(0);

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(step + 1); 
    } else {
      setStep(questions.length); 
    }
  };

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
            Just enter your text below and receive accurate results in 2 minutes.
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
            {!showQuestions ? (
              <>
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
                    onClick={() => setShowQuestions(true)}
                  >
                    Detect Scam
                  </Button>
                </Box>
              </>
            ) : (
              <Card sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
                <CardContent>
                  {step < questions.length ? (
                    <>
                      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                        {questions[step].text}
                      </Typography>
                      <Box
                        sx={{ display: "flex", justifyContent: "center", gap: 2 }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleAnswer}
                        >
                          Yes
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={handleAnswer}
                        >
                          No
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                        Thank you for your response!
                      </Typography>
                      <Typography variant="body1">
                        Your answers have been recorded.
                      </Typography>
                      <Box sx={{ mt: 3 }}>
                        <Button
                          variant="contained"
                          onClick={() => {
                            setStep(0);
                            setShowQuestions(false);
                          }}
                          sx={{
                            px: 4,
                            borderRadius: 999,
                            fontWeight: 700,
                            bgcolor: "#5c7a2d",
                            "&:hover": { bgcolor: "#4b6524" },
                          }}
                        >
                          Restart
                        </Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
