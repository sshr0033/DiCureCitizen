import { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import LoginVideo from "../assets/seniorcitizen.mp4";
import {
  pageContainer,
  videoBackground,
  overlay,
  contentWrapper,
  glassBox,
  loginButton,
} from "../styles/loginPageStyles";

export default function LoginPage({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  if (auth) return <>{children}</>;

  return (
    <Box sx={pageContainer}>
     
      <video autoPlay loop muted playsInline style={videoBackground}>
        <source src={LoginVideo} type="video/mp4" />
      </video>

      <Box sx={overlay} />

      
      <Container maxWidth="xs" sx={contentWrapper}>
        <Box sx={glassBox}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Hello! <br />
            We are secured by TP26, Please enter the password.
          </Typography>

          <TextField
            label="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            sx={loginButton}
            onClick={() => {
              if (user === "TP26" && pass === "marshy123") {
                setAuth(true);
              } else {
                alert("Wrong credentials");
              }
            }}
          >
            Understand Good Digital Citizenship
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
