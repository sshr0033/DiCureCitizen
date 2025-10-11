import  { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  Divider,
  Link,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function PasswordCheckGame({ onBack }: { onBack: () => void }) {
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<"weak" | "strong" | null>(null);
  const strongPasswordRe = /^(?=.{12,}$)(?!.*(.)\1\1)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])[^\s]{12,}$/;

const checkPassword = () => {

  if (password === "12345") {
    setFeedback("weak");
  } else if (password.length < 8) {
    setFeedback("weak");
  } else if (strongPasswordRe.test(password)) {
    setFeedback("strong");
  } else {
    setFeedback("weak");
  }
};



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
          Try creating a Password and check if it is strong or weak.
        </Typography>
      </Stack>

      <Typography variant="body1" mb={2}>

        A strong password uses letters, numbers & special symbols.
      </Typography>

     
      <Stack direction="row" spacing={2} alignItems="center">
        <TextField
          label="Enter a password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="success"
          sx={{ px: 3 }}
          onClick={checkPassword}
        >
          Check
        </Button>
      </Stack>

      
      {feedback && (
        <Box mt={3}>
          {feedback === "weak" ? (
           <Stack direction="column" spacing={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <CancelIcon sx={{ color: "tomato" }} />
                <Typography color="error" fontWeight="bold">
                  Weak password!
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: "red" }}>
                A strong password should:
                <ul style={{ marginTop: 4, paddingLeft: 18 }}>
                  <li>Be at least 12 characters long</li>
                  <li>Contain upper & lower case letters</li>
                  <li>Include numbers and special characters (!, @, #, $)</li>
                  <li>Avoid common words or repeated characters</li>
                </ul>
              </Typography>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleIcon color="success" />
              <Typography color="success.main" fontWeight="bold">
                Strong password! Good job 
              </Typography>
            </Stack>
          )}
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

    
      <Link
        component="button"
        underline="hover"
        color="success.main"
        onClick={onBack}
      >
        Go back to read more
      </Link>
    </Paper>
  );
}
