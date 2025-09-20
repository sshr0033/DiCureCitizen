import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Link,
} from "@mui/material";

import operaHouse from "../assets/opera-house.jpg";

export default function LegalEthicGame({ onBack }: { onBack: () => void }) {
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
          This is a copyrighted image of opera house that you are using in your document, what do you do?
        </Typography>
      </Stack>

      <Box
        sx={{
          width: "100%",
          height: 250,
          border: "12px solid #222",
          borderRadius: "24px",
          position: "relative",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
          overflow: "hidden",
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
      
        <Box
          component="img"
          src= {operaHouse}
          alt="Copyrighted Opera House"
          sx={{
            width: "100%",
            height: "150px",
            objectFit: "cover",
          }}
        />
      
        <Typography
          variant="body2"
          sx={{ mt: 1, px: 1, textAlign: "center", fontStyle: "italic" }}
        >
           © Wikimedia Commons 
        </Typography>
      </Box>

   
      <Stack direction="row" spacing={3} justifyContent="center">
        <Button
          onClick={() => setChoice("free")}
          sx={{ color: "red", fontWeight: "bold" }}
        >
          Use it Freely 
        </Button>
        <Button
          onClick={() => setChoice("credit")}
          sx={{ color: "green", fontWeight: "bold" }}
        >
          Give Credit 
        </Button>
      </Stack>

   
      {choice && (
        <Typography mt={2} align="center">
          {choice === "credit"
            ? "Correct! Always credit the creator when using their content."
            : " Wrong. Using someone's work freely without permission is not ethical."}
        </Typography>
      )}

      
      <Box mt={3} alignContent={"center"}>
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
