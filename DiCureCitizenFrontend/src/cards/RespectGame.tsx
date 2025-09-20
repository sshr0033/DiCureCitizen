import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Link,
} from "@mui/material";

export default function RespectGame({ onBack }: { onBack: () => void }) {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        borderRadius: 4,
        maxWidth: 420,
        mx: "auto",
      }}
    >
      
      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
        
        <Typography variant="h6" fontWeight="bold">
        Respect & Empathy
        </Typography>
      </Stack>

      <Box
        sx={{
          width: "100%",
          height: 200,
          border: "12px solid #222",
          borderRadius: "24px",
          position: "relative",
          backgroundColor: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
     
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 80,
            height: 12,
            bgcolor: "#222",
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
          }}
        />
     
        <Paper
          sx={{
            p: 2,
            borderRadius: 2,
            maxWidth: "85%",
            bgcolor: "#e5e5ea",
          }}
        >
          <Typography variant="body2">
            Are you  ____ ? Do you want me to explain it to you again?
          </Typography>
        </Paper>
      </Box>

    
      <Stack direction="row" spacing={3} justifyContent="center">
        <Button
          onClick={() => setChoice("stupid")}
          sx={{ color: "red", fontWeight: "bold" }}
        >
          Stupid 
        </Button>
        <Button
          onClick={() => setChoice("confused")}
          sx={{ color: "green", fontWeight: "bold" }}
        >
          Confused 
        </Button>
      </Stack>

      
      {choice && (
        <Typography mt={2} align="center">
          {choice === "confused"
            ? " Great! Respectful replacement makes conversation better."
            : " Not respectful. Try again with kinder words."}
        </Typography>
      )}

      
      <Box mt={3}>
        <Link
          component="button"
          underline="hover"
          color="success.main"
          onClick={onBack}
        >
          Go back to read more
        </Link>
      </Box>
    </Paper>
  );
}
