import  { useRef, useState, useEffect } from "react";
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
import quizVideo from "../assets/quiz.mp4";
import { Replay10, Forward10 } from "@mui/icons-material";
import { CheckCircle, Cancel } from "@mui/icons-material";


import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  time: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
  correction: string;
}

const questions: Question[] = [
  {
    id: 0,
    time: 82,
    question: "What should he do in this situation?",
    options: [
      "Click the link immediately to claim the cashback before it expires",
      "Check if he actually made a recent purchase or reward transaction, and verify through the shopping app",
      "Forward the message to his friends to see if they received it too",
      "Reply to the message asking for confirmation",
    ],
    correct:
      "Check if he actually made a recent purchase or reward transaction, and verify through the shopping app",
    explanation:
      "He should always verify messages claiming rewards or cashback through the official shopping app or account rather than clicking suspicious links.",
  correction:
      "Think about safer ways to confirm a cashback offer — can he check it from an official source instead of clicking a link?",
  
    },
  {
    id: 1,
    time: 111,
    question: "What should he do in this situation?",
    options: [
      "Call the bank and verify if the account is locked",
      "Click the link immediately to revive the bank account",
      "Reply to the sender asking for further steps",
      "Forget about paying the bill",
    ],
    correct: "Call the bank and verify if the account is locked",
    explanation:
      "When receiving messages about account issues, directly contact the bank using official channels — never click unknown links.",
          correction:
      "Consider how he could confirm if the message is genuine without using the link provided.",

  },
  {
    id: 2,
    time: 143,
    question:
      "What steps should he follow while setting his password? (Select the options that apply.)",
    options: [
      "Continue creating the password in front of another person.",
      "Choose a strong password with a mix of letters, numbers, and symbols that's unique to this account",
      "Ask your friend to set up the same password for him",
      "Reuse an old password from his social media accounts",
      "Create a password without anyone else viewing to maintain the privacy",
    ],
    correct:
      "Choose a strong password with a mix of letters, numbers, and symbols that's unique to this account",
    explanation:
      "He should create a strong, private password using a mix of characters and ensure nobody else can see it.",
          correction:
      "Think about what makes a password secure — should it be easy or hard to guess, and should others see it?",
  },
   {
    id: 3,
    time: 164,
    question:
      "What steps should he follow while setting his password? (Select the options that apply.)",
    options: [
      "Continue creating the password in front of another person.",
      "Choose a strong password with a mix of letters, numbers, and symbols that's unique to this account",
      "Ask your friend to set up the same password for him",
      "Reuse an old password from his social media accounts",
      "Create a password without anyone else viewing to maintain the privacy",
    ],
    correct:
      "Create a password without anyone else viewing to maintain the privacy",
    explanation:
      "Always make sure that your password is hidden and unique, never share it with anyone.",
     correction:
      "Think about privacy — would you like someone to post your photo without asking you first?",

  },
  {
    id: 4,
    time: 201,
    question: "What should she do in this situation?",
    options: [
      "Ignore her friend's feelings and post the picture on social media",
      "Do not post a picture without the person's consent",
      "Share it on her friend's group to make fun of him",
      "Click some more pictures and make a collage of him",
    ],
    correct: "Do not post a picture without the person's consent",
    explanation:
      "Always ask for consent before sharing someone's photo online — this respects privacy and digital citizenship values.",
      correction:
      "Before sharing, how could she make sure the message is true or fake?",
  },
  {
    id: 5,
    time: 253,
    question: "What should she do before sharing this message?",
    options: [
      "Forward it to the study group so they can apply quickly",
      "Contact her university to verify the message",
      "Add 'not sure if true' and send it to warn people anyway",
      "Ignore it but save the message in case it's real",
    ],
    correct: "Contact her university to verify the message",
    explanation:
      "Before forwarding messages about offers or opportunities, always verify the information with the official source.",
      correction:
      "Ask yourself — how might others feel if they read this comment?",
  },
  {
    id: 6,
    time: 300,
       question: "What should she do?",
    options: [
      "Delete her social media account to avoid the bullying",
      "Grow her confidence and block them",
      "Respond to the comments",
      "Contact the commenters and connect with them",
    ],
    correct: "Grow her confidence and block them",
    explanation:
      "She should block the bullies, avoid engaging with them, and stay confident — it's the best digital resilience practice.",
   correction:
      "Think about what's the healthiest way to deal with bullies — does replying help, or ignoring and blocking work better?",

  },
    
  {
    id: 7,
    time: 331,
     question: "What should he do before posting this comment?",
    options: [
      "Go ahead and post it, it's just his opinion",
      "Add an emoji so it looks funny instead of rude",
      "Stop and think if the comment might upset someone before posting",
      "Delete his account completely",
    ],
    correct: "Stop and think if the comment might upset someone before posting",
    explanation:
      "Think critically before posting online — ensure your comment is respectful and won't harm or offend others.",
         correction:
      "Maybe pause for a second — how could his words affect others if they see the comment?",
  
  },
    
  {
    id: 8,
    time: 363,
    question: "What should he do before using the picture?",
    options: [
      "Acknowledge the use of the picture",
      "Since it's found on the internet, use it as he pleases",
      "Use pictures from a different website",
      "Use Generative AI to create a similar picture",
    ],
    correct: "Acknowledge the use of the picture",
    explanation:
      "Always give credit to the creator when using online images to respect copyright and ownership.",
   correction:
      "Think — does finding an image online automatically mean you can use it freely?",
  },
  {
    id: 9,
    time: 406,
 question: "What should he do?",
    options: [
      "Continue maintaining the same screen time to maintain the weekly average",
      "Reduce the screen time because it is not a good digital citizen practice",
      "Start using an iPad to split the screen time",
      "Throw his phone to become anti-digital",
    ],
    correct:
      "Reduce the screen time because it is not a good digital citizen practice",
    explanation:
      "Balancing digital use helps improve well-being and sets a good example for responsible digital citizenship.",
      correction:
      "Think about healthy screen habits — would spending less time on devices be better for him?",
  },
  
];




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
  const [answeredCorrectly, setAnsweredCorrectly] = useState<Set<number>>(new Set());
  const [completedScenarioMsg, setCompletedScenarioMsg] = useState("");
  const [exitDialogOpen, setExitDialogOpen] = useState(false);
const navigate = useNavigate();
const [feedbackType, setFeedbackType] = useState<"" | "correct" | "wrong">("");

 
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const handleTimeUpdate = () => {
      const index = scenarioTimes.findIndex(
        (t, i) =>
          v.currentTime >= t &&
          (i === scenarioTimes.length - 1 || v.currentTime < scenarioTimes[i + 1])
      );
      if (index !== -1 && index !== currentScenario) {
        setCurrentScenario(index);
        if (answeredCorrectly.has(index)) {
          setCompletedScenarioMsg("Congratulations! You've already completed this scenario successfully.");
        } else {
          setCompletedScenarioMsg("");
        }
      }
    };
    v.addEventListener("timeupdate", handleTimeUpdate);
    return () => v.removeEventListener("timeupdate", handleTimeUpdate);
  }, [currentScenario, answeredCorrectly]);


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
            setCompletedScenarioMsg(" Congratulations! You've already completed this scenario successfully.");
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


  const glassButton = {
  backdropFilter: "blur(10px)",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.25)",
  color: "white",
  fontWeight: 600,
  borderRadius: "12px",
  px: 3,
  py: 1,
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.25)",
    boxShadow: "0 0 15px rgba(255,255,255,0.3)",
  },
};

  const handleStartQuiz = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 54;
    v.play();
    setQuizStarted(true);
    setIsPlaying(true);
  };

const handleRewind = () => {
  const v = videoRef.current;
  if (!v) return;
  v.currentTime = Math.max(0, v.currentTime - 10);
};

const handleForward = () => {
  const v = videoRef.current;
  if (!v) return;
  if (currentQ) return; 

  v.currentTime = Math.min(v.duration, v.currentTime + 10);
};

 
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
      setCompletedScenarioMsg(" Congratulations! You've already completed this scenario successfully.");
      const v = videoRef.current;
      if (v) v.play();
    }, 2000);
  } else {
    setFeedback(`Hmmmmm! ${currentQ.correction}`);
    setFeedbackType("wrong");              
  }
};


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
      setCompletedScenarioMsg(" Congratulations! You've already completed this scenario successfully.");
    } else {
      setCompletedScenarioMsg("");
    }
    v.play();
  };


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
      setCompletedScenarioMsg("Congratulations! You've already completed this scenario successfully.");
    } else {
      setCompletedScenarioMsg("");
    }
    v.play();
  };

  const progressPercent = (answeredCount / questions.length) * 100;


  const handleDownloadCertificate = () => {
    const blob = new Blob(
      ["Congratulations! You have successfully completed the Interactive Scenario Quiz."],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DigitalCitizenship_Certificate.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  
  const handleDownloadSchedule = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    const start = date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const end = new Date(date.getTime() + 30 * 60000)
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
       <Box
      sx={{
      
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",

        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        p: { xs: 2, md: 7 },
        ml: { xs: 2, md: 20 },

     
        backgroundColor: "transparent"
      
      }}
    >
      
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
          <video ref={videoRef} src={quizVideo} style={{ width: "100%", height: "auto" }} />
          <Fade in={showIcon }>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "white",
                backgroundColor: "rgba(0,0,0,0.25)",
                borderRadius: "50%",
              }}
            >
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
              The video pauses automatically for each question. You can skip or go back anytime, but only correct answers increase your progress.
            </Typography>
          </Box>
        ) : (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, maxWidth: 800 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Q: {currentQ.question}
            </Typography>

            <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value)}>
              {currentQ.options.map((opt, i) => (
                <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
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
              <Button variant="contained" onClick={handleSubmit} disabled={!selected }>
                Submit
              </Button>
              
              <Button color="info" onClick={handleNextScenario}>
                Skip Scenario
              </Button>
            </Stack>
          </Paper>
        )}
      
        <Box mt={3} width="100%" maxWidth={480} textAlign="center">
          {!quizStarted ? (
            <Button
              variant="contained"
          
              onClick={handleStartQuiz}
              sx={glassButton}
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

          <Stack direction="row" justifyContent="center" spacing={2}>
            {quizStarted && (
              <>
            <Button variant="contained" color="info" onClick={handlePrevScenario}   sx={glassButton} disabled={!quizStarted}>
               Previous
            </Button>

            {quizStarted && currentScenario === scenarioTimes.length - 1 ? (
              answeredCount >= 9 ? (
                <Button variant="contained" color="success" onClick={handleDownloadCertificate}>
                  🎓 Download Certificate
                </Button>
              ) : (
                <Button variant="contained" color="secondary" sx={glassButton} onClick={handleDownloadSchedule}>
                  Schedule for Later
                </Button>
              )
            ) : (
              <Button variant="outlined"  onClick={handleNextScenario}   sx={glassButton} disabled={!quizStarted}>
                Next 
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