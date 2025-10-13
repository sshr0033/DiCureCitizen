import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Stack,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ShieldIcon from "@mui/icons-material/Shield";

import PasswordCheckGame from "../cards/PasswordCheckGame";
import ForwardOrStopGame from "../cards/ForwardStopGame";
import RespectGame from "../cards/RespectGame";
import LegalEthicGame from "../cards/LegalEthicGame";
import PrivacyAwarenessGame from "../cards/PrivacyAwarenessGame";
import phoneFrame from "../assets/iPhone Air - Light Gold - Portrait.png";

import {
  sectionBox,
  dividerLine,
  gridLayout,
  sectionTitle,
  paperContainer,
  chipRow,
  chipStyle,
  lessonTitle,
  subtitleText,
  bulletIcon,
  bulletText,
  buttonRow,
  navButton,
  nextButton,
  tipsButton,
  practiseButton,
  phoneWrapper,
  phoneFrameStyle,
  phoneInner,
  riskyMessage,
  safeMessage,
  dialogPaper,
  dividerBottom,
} from "../styles/lessonSectionStyles";
import { useNavigate } from "react-router-dom";
import { LESSONS } from "../data/lessons";


//Function to highlight the dangerous texts

function highlightText(text: string, needles: string[] = []) {
  if (!needles.length) return text;
  const esc = (s: string) => s.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  const pattern = new RegExp("(" + needles.map(esc).join("|") + ")", "gi");
  const parts = text.split(pattern);
  return parts.map((p, i) =>
    needles.some((n) => new RegExp("^" + esc(n) + "$", "i").test(p)) ? (
      <Box
        key={i}
        component="span"
        sx={{
          px: 0.5,
          borderRadius: 0.5,
          bgcolor: "warning.light",
          fontWeight: 600,
        }}
      >
        {p}
      </Box>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}



/* 
@author Team marshmellow
@version 0.0.1
Lesson Section that provides small lessons to the user using interactive examples.
*/

export default function LessonSection() {
  const [idx, setIdx] = useState(0);
  const [showSafe, setShowSafe] = useState(false);
  const [showDIY, setShowDIY] = useState(false);
  const total = LESSONS.length;
  const navigate = useNavigate();
  const lesson = LESSONS[idx];

  const go = (dir: 1 | -1) => {
    setShowSafe(false);
    setIdx((p) => (p + dir + total) % total);
  };

  return (
    <Box id="learnCitizenship" component="section" sx={sectionBox}>
      <Divider sx={dividerLine} />
      <Box sx={gridLayout}>
        <Typography variant="h4" fontWeight={800} sx={sectionTitle}>
          Learn How to Become a Good Digital Citizen
        </Typography>
        <Paper elevation={0} sx={paperContainer}>
          <Stack direction="row" alignItems="center" spacing={1} sx={chipRow}>
            <Chip
              label={`${idx + 1}/${total}`}
              variant="outlined"
              size="small"
              sx={chipStyle}
            />
            <Chip
              icon={<ShieldIcon sx={{ color: "white" }} />}
              label="Lesson"
              variant="outlined"
              size="small"
              sx={chipStyle}
            />
          </Stack>

          <Typography variant="h5" sx={lessonTitle}>
            {lesson.title}
          </Typography>

          <Typography variant="body2" sx={subtitleText}>
            {lesson.subtitle}
          </Typography>

          <Divider sx={dividerLine} />

          <Stack spacing={1.2}>
            {lesson.bullets.map((b, i) => (
              <Stack
                key={i}
                direction="row"
                spacing={1}
                alignItems="flex-start"
              >
                <CheckCircleOutlineIcon sx={bulletIcon} />
                <Typography sx={bulletText}>{b}</Typography>
              </Stack>
            ))}
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={buttonRow}
          >
            <Button
              startIcon={<ArrowBackIosNewIcon />}
              variant="outlined"
              onClick={() => go(-1)}
              sx={navButton}
            >
              Previous
            </Button>
            <Button
              endIcon={<ArrowForwardIosIcon />}
              variant="contained"
              onClick={() => go(1)}
              sx={nextButton}
            >
              Next
            </Button>
            <Button
              startIcon={<TipsAndUpdatesIcon />}
              onClick={() => setShowSafe((s) => !s)}
              sx={tipsButton}
            >
              {showSafe ? "Show the scenario" : "What to do in this scenario?"}
            </Button>
          </Stack>

          <Button
            variant="contained"
            color="success"
            onClick={() => setShowDIY(true)}
            sx={practiseButton}
          >
            Click here, Practise these lessons on small activities
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/quiz")}
            sx={practiseButton}
          >
            Test yourself with an Interactive Quiz and Earn certificate
          </Button>
        </Paper>

        {/* Phone frame at the right side of the screen*/}
        <Box sx={phoneWrapper}>
          <Box sx={phoneFrameStyle}>
            <Box
              component="img"
              src={phoneFrame}
              alt="Phone Frame"
              sx={{ width: "100%", height: "auto" }}
            />
            <Box sx={phoneInner}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  bgcolor: "rgba(30,30,30,0.95)",
                  p: "6px 10px",
                  borderTopLeftRadius: "35px",
                  borderTopRightRadius: "35px",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "15%",
                  zIndex: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "#0094FF",
                    fontWeight: 600,
                    fontSize: "0.7rem",
                    ml: 2,
                    p: "2px",
                  }}
                >
                  {"<"}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 26,
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ color: "white", fontSize: "0.7rem" }}>
                      👤
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: "white",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {lesson.smsFrom || "JM-BANK-S"}
                  </Typography>
                </Box>

                <Box sx={{ width: 24 }} />
              </Box>

              <Paper sx={riskyMessage}>
                <Typography
                  sx={{
                    fontSize: { xs: "0.95rem", md: "1rem" },
                    lineHeight: 1.5,
                  }}
                >
                  {highlightText(lesson.riskySMS, lesson.highlight)}
                </Typography>
              </Paper>

              {showSafe && (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "flex-end",
                    animation: "fadeIn 0.5s ease-in-out",
                    "@keyframes fadeIn": {
                      from: { opacity: 0, transform: "translateY(10px)" },
                      to: { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <Paper
                    sx={{
                      ...safeMessage,
                      borderTopRightRadius: 0,
                      bgcolor: "rgba(0,128,0,0.85)",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "0.95rem", md: "1rem" },
                        lineHeight: 1.5,
                      }}
                    >
                      {lesson.safeSMS}
                    </Typography>
                  </Paper>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

{/** Dialog box for playing the small interactive game and learning the essence of the lessons */}
      <Dialog
        open={showDIY}
        onClose={() => setShowDIY(false)}
        PaperProps={{ sx: dialogPaper }}
      >
        <DialogContent>
          {lesson.id === "literacy" && (
            <ForwardOrStopGame onBack={() => setShowDIY(false)} />
          )}
          {lesson.id === "awareness" && (
            <PrivacyAwarenessGame onBack={() => setShowDIY(false)} />
          )}
          {lesson.id === "privacy" && (
            <PasswordCheckGame onBack={() => setShowDIY(false)} />
          )}
          {lesson.id === "respect" && (
            <RespectGame onBack={() => setShowDIY(false)} />
          )}
          {lesson.id === "legal" && (
            <LegalEthicGame onBack={() => setShowDIY(false)} />
          )}
        </DialogContent>
      </Dialog>

      <Divider sx={dividerBottom} />
    </Box>
  );
}
