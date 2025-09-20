import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Slider,
  Avatar,
  Stack,
  Link,
} from "@mui/material";
import facebook from "../assets/Facebook.jpeg";

export default function PrivacyAwarenessGame({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState(1);
  const levels = [" Public", " Friends", " Only Me"];
  const messages = [
    "Beware! Strangers can see this post. They can see your location and photo.",
    "Easy, Only your friends can see this post.",
    "Great, you have your digital diary for yourself, Only you can see this post.",
  ];

  return (
    <Paper
      elevation={4}
      sx={{ p: 4, borderRadius: 4, maxWidth: 420, mx: "auto" }}
    >
      
      <Stack direction="row" spacing={1} alignItems="center" mb={2}>
    
        <Typography variant="h6" fontWeight="bold">
          You are posting a photo on Facebook, with your location, who do you think should be able see it?
          Drag to see how much protected you are.
        </Typography>
      </Stack>

      <Box
        sx={{
          width: "100%",
          border: "12px solid #222",
          borderRadius: "24px",
          backgroundColor: "#f0f2f5",
          mb: 3,
          overflow: "hidden",
        }}
      >
        
        <Stack direction="row" spacing={1.5} alignItems="center" p={2}>
          <Avatar alt="Profile" /> 
          <Box>
            <Typography variant="body2" fontWeight="bold">
              Meryem Shrestha
            </Typography>
            <Typography variant="caption" color="text.secondary">
              2 hrs ago · {levels[level]}
            </Typography>
          </Box>
        </Stack>

       
        <Box px={2} pb={2}>
          <Typography variant="body2">
           Out In NYC!! Living my life to the fullest. 
          </Typography>
          <Box
            component="img"
            src= {facebook}
            alt="Family picnic"
            sx={{
              width: "100%",
              height: 180,
              objectFit: "cover",
              borderRadius: 2,
              mt: 1,
            }}
          />
        </Box>
      </Box>

     
      <Slider
        min={0}
        max={2}
        step={1}
        value={level}
        onChange={(e, val) => setLevel(val as number)}
        marks
      />
      <Typography fontWeight="bold">{levels[level]}</Typography>
      <Typography>{messages[level]}</Typography>

    
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
