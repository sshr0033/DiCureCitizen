import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  CircularProgress,
  Fade,
  Alert,
} from "@mui/material";
import phoneFramePortrait from "../assets/iPhone Air - Light Gold - Portrait.png";
import handIcon from "../assets/hand.png";
import screenRecording from "../assets/messageRecord.mp4";
import { predictText, type PredictResponse } from "../api.ts";
import * as styles from "../styles/scamCheckStyles.ts"; // 🎨 imported styles

export default function ScamCheck() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);


  function handleDownloadHelpPDF() {
  const pdfUrl =
    "https://dicurecitizen-assets.s3.ap-southeast-2.amazonaws.com/Scam_Booklet.pdf";
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = "Scam_Booklet.pdf"; // optional custom filename
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


  async function handleDetect() {
    const text = input
      .replace(/\\n|\\r|\r|\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!text) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10_000);
try {
  const data: PredictResponse = await predictText(text);

  // 🧠 Smart percentage converter
  let prob: number | null = null;

  if (typeof data === "number") {
    // If API gives 0–1, multiply by 100
    prob = data <= 1 ? Math.round(data * 100) : Math.round(data);
  } else if (typeof data === "object" && data !== null) {
    // If API gives object like { probability: 0.87 } or { score: 87 }
    const value =
      (data ).probability ??
      0;
    prob = value <= 1 ? Number((value * 100).toFixed(1)) : Number(value.toFixed(1));
  } else {
    prob = 0;
  }

  setResult(prob);
} catch (err: unknown) {
  const msg =
    err instanceof DOMException && err.name === "AbortError"
      ? "Request timed out. Please try again."
      : err instanceof Error
      ? err.message
      : "Something went wrong. Please try again.";
  setError(msg);
} finally {
  clearTimeout(timer);
  setLoading(false);
}

  }

  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.innerLayout}>
        <Paper elevation={0} sx={styles.leftCard}>
          <Typography variant="h5" sx={styles.cardTitle}>
            One-tap Scam Check
          </Typography>
          <Typography variant="body2" sx={styles.cardSubtitle}>
            Paste text, link or phone number. Or upload a screenshot. We return
            risk, evidence and clear next steps.
          </Typography>

          {error && (
            <Alert severity="error" sx={styles.errorAlert}>
              {error}
            </Alert>
          )}

          <TextField
            multiline
            rows={4}
            placeholder="Paste suspicious message here"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={styles.textInput}
          />

          <Button
            onClick={handleDetect}
            disabled={!input.trim() || loading}
            sx={styles.detectButton}
          >
            {loading ? <CircularProgress size={24} /> : "Detect"}
          </Button>
        </Paper>

        {result !== null && (
          <Fade in>
            <Paper elevation={0} sx={styles.resultCard}>
              <Typography variant="h5" sx={styles.cardTitle}>
                Results
              </Typography>
              <Typography variant="body2" sx={styles.cardSubtitle}>
                We do not store your data without your permission
              </Typography>

              <Paper sx={styles.resultBox(result)}>
                <Typography variant="body2">
                  The scam probability of this message is
                </Typography>
                <Typography variant="h3" sx={styles.resultPercent(result)}>
                  {result}%
                </Typography>
              </Paper>

              <Box sx={styles.helpSection}>
                <Typography variant="body2" sx={styles.helpText}>
                  Want to know how to safeguard yourself with scams?
                </Typography>
                <Button sx={styles.helpButton} onClick={handleDownloadHelpPDF}>
  Download a pdf guide to safe guard yourself
</Button>

              </Box>
            </Paper>
          </Fade>
        )}

        {/* 🟩 Phone Mock */}
        <Box sx={styles.phoneContainer}>
          <Box
            component="video"
            src={screenRecording}
            autoPlay
            loop
            muted
            playsInline
            sx={styles.phoneVideo}
          />
          <Box
            component="img"
            src={phoneFramePortrait}
            alt="Phone Frame"
            sx={styles.phoneFrame}
          />
        </Box>
      </Box>

      {/* 🟩 Animated Hand Pointer */}
      <Box component="img" src={handIcon} alt="Hand" sx={styles.handPointer} />
    </Box>
  );
}
