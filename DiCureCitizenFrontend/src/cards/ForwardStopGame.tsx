import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Link,
} from "@mui/material";

export default function ForwardStopGame({ onBack }: { onBack: () => void }) {
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
       
        <Typography variant="h6" alignContent= "center"  fontWeight="bold">
         You recieved a message on WhatsApp, what do you do?
        </Typography>
      </Stack>

      
      <Box
        sx={{
          width: "100%",
          height: 180,
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
          <Typography variant= "body2">
          You should not go out as government has announced violent protest for 5 days, 
            No water supplies available save water and share it to family to make them Aware!!! .
          </Typography>
        </Paper>
      </Box>

  
      <Stack direction="row" spacing={3} justifyContent="center">
        <Button
          onClick={() => setChoice("forward")}
          sx={{ color: "green", fontWeight: "bold" }}
        >
          Forward
        </Button>
        <Button
          onClick={() => setChoice("stop")}
          sx={{ color: "red", fontWeight: "bold" }}
        >
          Stop & Check
        </Button>
      </Stack>

      {choice && (
        <Typography mt={2} align="center">
          {choice === "stop"
            ? "Correct! Always check the source first."
            : "Oops! You should verify before forwarding."}
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
