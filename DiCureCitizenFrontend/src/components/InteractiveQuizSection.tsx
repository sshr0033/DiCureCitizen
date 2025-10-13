import { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Stack,
  Fade,
  LinearProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { PlayCircleOutline, PauseCircleOutline } from "@mui/icons-material";

import { Replay10, Forward10 } from "@mui/icons-material";
import { CheckCircle, Cancel } from "@mui/icons-material";

import { questions } from "../data/quizQuestions";
import { generateCertificate } from "../data/certificateGenerator";

import * as styles from "../styles/interactiveQuizStyles";

import { useNavigate } from "react-router-dom";

/* 
@author Team Phoenix Sentinels
@version 0.0.1
Interactive Quiz section that displays the quiz video and pops up questions

*/

interface Question {
  id: number;
  time: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
  correction: string;
}

//video imported from aws hosting
const quizVideo =
  "https://dicurecitizen-assets.s3.ap-southeast-2.amazonaws.com/quiz.mp4";

//timing of questions to appear in during the quiz session.

const scenarioTimes = [54, 87, 118, 153, 170, 215, 269, 309, 342, 375];

export default function InteractiveQuizSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState<Question | null>(null);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [answeredCount, setAnsweredCount] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Set<number>>(
    new Set()
  );
  const [completedScenarioMsg, setCompletedScenarioMsg] = useState("");
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState<"" | "correct" | "wrong">(
    ""
  );
  const progressPercent = (answeredCount / questions.length) * 100;

  /*
  useEffect to help user see the scenario timing notes 
  the time everytime to opt accordingly (especially if forward or backward is pressed)
  */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const handleTimeUpdate = () => {
      const index = scenarioTimes.findIndex(
        (t, i) =>
          v.currentTime >= t &&
          (i === scenarioTimes.length - 1 ||
            v.currentTime < scenarioTimes[i + 1])
      );
      if (index !== -1 && index !== currentScenario) {
        setCurrentScenario(index);
        if (answeredCorrectly.has(index)) {
          setCompletedScenarioMsg(
            "Congratulations! You've already completed this scenario successfully."
          );
        } else {
          setCompletedScenarioMsg("");
        }
      }
    };
    v.addEventListener("timeupdate", handleTimeUpdate);
    return () => v.removeEventListener("timeupdate", handleTimeUpdate);
  }, [currentScenario, answeredCorrectly]);

  /*
useEffect to help with pause and play the questions pause if
the question is asked and resume once answered
  */
  useEffect(() => {
    const interval = setInterval(() => {
      const v = videoRef.current;
      if (!v) return;

      if (!quizStarted && v.currentTime > 53) {
        v.pause();
        v.currentTime = 53;
        setIsPlaying(false);
        return;
      }

      if (quizStarted && !currentQ) {
        const qIndex = questions.findIndex(
          (q) => Math.abs(v.currentTime - q.time) < 1.2
        );
        if (qIndex !== -1) {
          if (answeredCorrectly.has(questions[qIndex].id)) {
            setCompletedScenarioMsg(
              " Congratulations! You've already completed this scenario successfully."
            );
            return;
          }
          v.pause();
          setIsPlaying(false);
          setCurrentQ(questions[qIndex]);
        }
      }
    }, 300);
    return () => clearInterval(interval);
  }, [quizStarted, currentQ, answeredCorrectly]);

  //start quiz after the button is pressed
  const handleStartQuiz = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 54;
    v.play();
    setQuizStarted(true);
    setIsPlaying(true);
  };

  //rewind quiz by 10secs after the button is pressed
  const handleRewind = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, v.currentTime - 10);
  };

  //forward quiz by 10secs after the button is pressed
  const handleForward = () => {
    const v = videoRef.current;
    if (!v) return;
    if (currentQ) return;

    v.currentTime = Math.min(v.duration, v.currentTime + 10);
  };

  //handle the quiz answers and gives feedback for correct and wrong answer
  const handleSubmit = () => {
    if (!currentQ) return;
    if (selected === currentQ.correct) {
      setFeedback(`Exactly! ${currentQ.explanation}`);
      setFeedbackType("correct");
      if (!answeredCorrectly.has(currentQ.id)) {
        setAnsweredCorrectly((prev) => new Set(prev).add(currentQ.id));
        setAnsweredCount((prev) => prev + 1);
      }
      setTimeout(() => {
        setFeedback("");
        setFeedbackType("");
        setSelected("");
        setCurrentQ(null);
        setCompletedScenarioMsg(
          " Congratulations! You've already completed this scenario successfully."
        );
        const v = videoRef.current;
        if (v) v.play();
      }, 2000);
    } else {
      setFeedback(`Hmmmmm! ${currentQ.correction}`);
      setFeedbackType("wrong");
    }
  };

  //switches to next scenario when the button is pressed
  const handleNextScenario = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = Math.min(currentScenario + 1, scenarioTimes.length - 1);
    v.currentTime = scenarioTimes[next];
    setCurrentScenario(next);
    setCurrentQ(null);
    setFeedback("");
    setFeedbackType("");
    setSelected("");
    if (answeredCorrectly.has(next)) {
      setCompletedScenarioMsg(
        " Congratulations! You've already completed this scenario successfully."
      );
    } else {
      setCompletedScenarioMsg("");
    }
    v.play();
  };

  //switches to previous scenario when the button is pressed
  const handlePrevScenario = () => {
    const v = videoRef.current;
    if (!v) return;
    const prev = Math.max(currentScenario - 1, 0);
    v.currentTime = scenarioTimes[prev];
    setCurrentScenario(prev);
    setCurrentQ(null);
    setFeedback("");
    setFeedbackType("");
    setSelected("");
    if (answeredCorrectly.has(prev)) {
      setCompletedScenarioMsg(
        "Congratulations! You've already completed this scenario successfully."
      );
    } else {
      setCompletedScenarioMsg("");
    }
    v.play();
  };

  //handle the download of the scheduler for the calendar

  const handleDownloadSchedule = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const start = date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const end =
      new Date(date.getTime() + 30 * 60000)
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0] + "Z";
    const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Complete the Interactive Scenario Quiz
DTSTART:${start}
DTEND:${end}
DESCRIPTION:Reminder to complete the quiz and earn your certificate!
END:VEVENT
END:VCALENDAR`;
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Quiz_Completion_Reminder.ics";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={styles.containerBox}>
      <Box flex={1} display="flex" flexDirection="column" alignItems="center">
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 480,
            borderRadius: 3,
            overflow: "hidden",
            cursor: currentQ ? "not-allowed" : "pointer",
          }}
          onClick={() => {
            const v = videoRef.current;
            if (!v || currentQ) return;

            if (v.paused) {
              v.play();
            } else {
              v.pause();
            }

            setIsPlaying(!v.paused);
            setShowIcon(true);
            setTimeout(() => setShowIcon(false), 600);
          }}
        >
          <video
            ref={videoRef}
            src={quizVideo}
            style={{ width: "100%", height: "auto" }}
          />
          <Fade in={showIcon}>
            <Box sx={styles.fadeIconBox}>
              {isPlaying ? (
                <PauseCircleOutline sx={{ fontSize: 90 }} />
              ) : (
                <PlayCircleOutline sx={{ fontSize: 90 }} />
              )}
            </Box>
          </Fade>
        </Box>
      </Box>

      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        p={4}
        gap={3}
      >
        {completedScenarioMsg && !currentQ ? (
          <Alert
            severity="success"
            sx={{ fontWeight: "bold", fontSize: "1rem", textAlign: "center" }}
          >
            {completedScenarioMsg}
          </Alert>
        ) : !currentQ ? (
          <Box textAlign="center" maxWidth={800}>
            <Typography variant="h2" color="white" fontWeight="bold">
              Interactive Scenario Quiz
            </Typography>
            <Typography variant="h5" mt={2} color="white">
              The video pauses automatically for each question. You can skip or
              go back anytime, but only correct answers increase your progress.
            </Typography>
            <Typography variant="body2" mt={2} color="white">
              Please note! <br></br> Since we are not collecting your data, you
              may have to restart the quiz if you leave it midway,please give
              20mins to complete the quiz and earn certificate. Answer 9
              scenarios and get the certifcate
            </Typography>
          </Box>
        ) : (
          <Paper
            elevation={3}
            sx={{ p: 3, borderRadius: 3, maxWidth: { xs: 300, md: 800 } }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Q: {currentQ.question}
            </Typography>

            <RadioGroup
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {currentQ.options.map((opt, i) => (
                <FormControlLabel
                  key={i}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>

            {feedback && (
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  borderRadius: 2,
                  background:
                    feedbackType === "correct"
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(239,68,68,0.15)",
                  border:
                    feedbackType === "correct"
                      ? "1px solid rgba(34,197,94,0.3)"
                      : "1px solid rgba(239,68,68,0.3)",
                }}
              >
                {feedbackType === "correct" ? (
                  <CheckCircle sx={{ color: "#22c55e", fontSize: 26 }} />
                ) : (
                  <Cancel sx={{ color: "#ef4444", fontSize: 26 }} />
                )}
                <Typography
                  sx={{
                    color: feedbackType === "correct" ? "#036b2aff" : "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  {feedback}
                </Typography>
              </Box>
            )}

            <Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={!selected}
              >
                Submit
              </Button>

              <Button color="info" onClick={handleNextScenario}>
                Skip Scenario
              </Button>
            </Stack>
          </Paper>
        )}

        <Box
          mt={{ xs: 2, sm: 3, md: 4 }}
          width={{ xs: "40%", sm: "80%", md: "80%", lg: "480px" }}
          textAlign="center"
          mx="auto"
          px={{ xs: 1.5, sm: 2, md: 0 }}
        >
          {!quizStarted ? (
            <Button
              variant="contained"
              onClick={handleStartQuiz}
              sx={styles.glassButton}
            >
              Start Quiz
            </Button>
          ) : (
            <>
              <Typography variant="h6" color="white">
                Scenario {currentScenario + 1} / {scenarioTimes.length}
              </Typography>
              <Typography variant="subtitle1" color="white" mt={1}>
                Progress: {answeredCount} / {questions.length} answered
              </Typography>
              <LinearProgress
                value={progressPercent}
                variant="determinate"
                sx={{ height: 8, borderRadius: 2, mt: 1, mb: 2 }}
              />
            </>
          )}

          <Stack
            direction={{ xs: "column", sm: "row", md: "row" }}
            justifyContent="center"
            spacing={2}
          >
            {quizStarted && (
              <>
                <Button
                  variant="contained"
                  color="info"
                  onClick={handlePrevScenario}
                  sx={styles.glassButton}
                  disabled={!quizStarted}
                >
                  Previous Scenario
                </Button>
                {/* Download certifcate shows name dialog only if minimum 9 questions are answwered */}
                {quizStarted && currentScenario === scenarioTimes.length - 1 ? (
                  answeredCount >= 9 ? (
                    <>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mt: { xs: 1.5, sm: 2, md: 2.5 },
                          mb: { xs: 1, sm: 2 },
                        }}
                      >
                        <input
                          type="text"
                          placeholder="Enter your name"
                          onChange={(e) => setUserName(e.target.value)}
                          style={{
                            width: "100%",
                            maxWidth: "300px",
                            padding: "10px 14px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255,255,255,0.3)",
                            background: "rgba(255,255,255,0.1)",
                            color: "white",
                            fontSize: "1rem",
                            textAlign: "center",
                            outline: "none",
                            transition: "all 0.3s ease",
                          }}
                          onFocus={(e) =>
                            (e.target.style.border = "1px solid #90caf9")
                          }
                          onBlur={(e) =>
                            (e.target.style.border =
                              "1px solid rgba(255,255,255,0.3)")
                          }
                        />
                      </Box>

                      <Button
                        variant="contained"
                        color="success"
                        sx={styles.glassButton}
                        onClick={() => generateCertificate(userName)}
                      >
                        Download Certificate
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={styles.glassButton}
                      onClick={handleDownloadSchedule}
                    >
                      Schedule for Later
                    </Button>
                  )
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleNextScenario}
                    sx={styles.glassButton}
                    disabled={!quizStarted}
                  >
                    Next Scenario
                  </Button>
                )}
              </>
            )}

            {quizStarted && (
              <Button
                onClick={() => setExitDialogOpen(true)}
                sx={{
                  mt: 2,
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "12px",
                  px: 3,
                  py: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                    boxShadow: "0 0 12px rgba(255,255,255,0.4)",
                  },
                }}
              >
                Exit Quiz
              </Button>
            )}
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,

              py: 2,
              mt: 4,
            }}
          >
            <Button
              onClick={handleRewind}
              sx={{
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                fontWeight: 600,
                borderRadius: "50%",
                minWidth: 56,
                height: 56,
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "rgba(255,255,255,0.3)",
                  boxShadow: "0 0 10px rgba(255,255,255,0.4)",
                },
              }}
            >
              <Replay10 sx={{ fontSize: 32 }} />
            </Button>

            <Button
              onClick={handleForward}
              disabled={Boolean(currentQ)}
              sx={{
                backdropFilter: "blur(10px)",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                fontWeight: 600,
                borderRadius: "50%",
                minWidth: 56,
                height: 56,
                opacity: currentQ ? 0.4 : 1,
                transition: "all 0.2s ease",
                "&:hover": {
                  background: currentQ
                    ? "rgba(255,255,255,0.1)"
                    : "rgba(255,255,255,0.3)",
                  boxShadow: currentQ
                    ? "none"
                    : "0 0 10px rgba(255,255,255,0.4)",
                },
              }}
            >
              <Forward10 sx={{ fontSize: 32 }} />
            </Button>
          </Box>
        </Box>
      </Box>

      <Dialog
        open={exitDialogOpen}
        onClose={() => setExitDialogOpen(false)}
        PaperProps={{
          sx: {
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "16px",
            color: "white",
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>
          Are you sure you want to exit?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
            Do you want to exit now or download the schedule to continue later?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleDownloadSchedule();
              setExitDialogOpen(false);
            }}
            sx={{
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              "&:hover": {
                background: "rgba(255,255,255,0.25)",
              },
            }}
          >
            Download Schedule
          </Button>

          <Button
            onClick={() => {
              setExitDialogOpen(false);
              navigate("/lessons");
            }}
            sx={{
              color: "#ffb3b3",
              border: "1px solid rgba(255,100,100,0.5)",
              backdropFilter: "blur(8px)",
              "&:hover": {
                background: "rgba(255,80,80,0.2)",
              },
            }}
          >
            Exit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
