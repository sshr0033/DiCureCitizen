import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import phoneFrameLandscape from "../assets/iPhone Air - Light Gold - Landscape.png";
import * as styles from "../styles/scamAwarenessStyles"; 
import { useNavigate } from "react-router-dom";

export default function ScamAwareness() {
  const navigate = useNavigate();
  return (
    <Box id="scam-awareness" sx={styles.sectionBox}>
    {/** Phone view with the video playing after integration with the youtube */}
      <Box sx={styles.phoneWrapper}>
        <Box sx={styles.videoContainer}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/89RaMNLoo-Y?autoplay=1&mute=1"
            title="Scam Awareness Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          />
        </Box>

        <Box
          component="img"
          src={phoneFrameLandscape}
          alt="Phone Frame"
          sx={styles.phoneFrame}
        />
      </Box>

     {/** Resource connection button right to the phone */}
      <Paper elevation={3} sx={styles.paperCard}>
        <Typography variant="h3" sx={styles.heading}>
         Know Scams Happening around Australia !
        </Typography>

        <Typography variant="body1" sx={styles.description}>
          Travelling Across Australia? Not sure what type of cyber scam can be tried on you? View our analytics that shows an indepth scam insights and the latest scam news across different states of Australia
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={styles.buttonRow}>
          <Button sx={styles.helpButton}
          onClick= {() => navigate("/resources")}>View the latest insight</Button>
         

        </Stack>
      </Paper>
    </Box>
  );
}
