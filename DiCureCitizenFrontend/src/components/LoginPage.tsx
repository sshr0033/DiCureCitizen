import { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import LoginVideo from "../assets/seniorcitizen.mp4";

export default function LoginPage({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  if (auth) return <>{children}</>;

  return (
    <Box sx={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
      >
        <source src={LoginVideo} type="video/mp4" />
        
      </video>

      
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.5)",
          zIndex: -1,
        }}
      />

    
      <Container
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(255,255,255,0.2)", 
            backdropFilter: "blur(8px)", 
            borderRadius: 3,
            p: 4,
            width: "100%",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Hello! <br/>We are secured by TP26, Please enter the password.
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
            sx={{
              mt: 2,
              bgcolor: "#4c5f26",
              "&:hover": { bgcolor: "#3a4a1c" },
            }}
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
