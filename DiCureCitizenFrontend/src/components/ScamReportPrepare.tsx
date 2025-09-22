import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReportGuidePopUp from "../components/ReportGuidePopUp";
import { useNavigate } from "react-router-dom";

type Conversation = {
  conversationId: number;
  conversation: string;
  label: number;
};

const ScamReportPrepare: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [maleVoice, setMaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [openGuide, setOpenGuide] = useState(false);

  // ✅ Hardcoded scam call conversations
  const hardcodedConversations: Conversation[] = [
    {
      conversationId: 1,
      label: 0,
      conversation: `Person A: Hello, I'm calling from the bank and need to verify your account details.
Person B: I wasn't expecting this call. Can you specify the reason for this verification?
Person A: We noticed some unusual activities and need to secure your account.
Person B: I understand the concern. Can you provide your employee ID for verification?
Person A: Due to security protocols, I cannot share personal details.
Person B: I appreciate that, but I need to ensure this call is legitimate. Can you provide an alternate method for me to verify this?
Person A: Time is of the essence, and we need to rectify this promptly.
Person B: I'd rather take the necessary steps to confirm this independently. Goodbye.`
    },
    {
      conversationId: 2,
      label: 0,
      conversation: `Person A: Hello, this is Sarah from the credit card company. We need to verify your card details.
Person B: I wasn't aware of any issues. Can you specify the reason for this verification?
Person A: We detected some unauthorized transactions on your card.
Person B: I see. Can you confirm your position at the credit card company and provide a direct line to your office?
Person A: I'm unable to disclose that information due to privacy regulations.
Person B: I appreciate that, but I need to ensure this call is legitimate. Can you provide an alternate method for me to verify this?
Person A: Time is of the essence, and we need to rectify this promptly.
Person B: I'd rather take the necessary steps to confirm this independently. Goodbye.`
    },
    {
      conversationId: 3,
      label: 0,
      conversation: `Person A: Good day, I'm calling from a lottery company to inform you that you've won a substantial prize.
Person B: Oh, really? Can you provide details on how I won this prize?
Person A: You were randomly selected as a winner through our automated system.
Person B: I see. Can you confirm the name of the lottery company and your position there?
Person A: I'm unable to disclose that information due to privacy regulations.
Person B: I understand, but I need to ensure this is a legitimate call. Can you provide a contact number for verification?
Person A: I'm afraid I cannot do that, but I assure you this is a genuine call.
Person B: Without proper verification, I'm hesitant to proceed. Can you offer an alternative method to confirm this?
Person A: Time is of the essence, and we need to process your winnings promptly.
Person B: I'd rather take the necessary steps to confirm this independently. Goodbye.`
    },
    {
      conversationId: 4,
      label: 0,
      conversation: `Person A: Hello, I'm calling from the tax department and need to verify your tax information.
Person B: I wasn't expecting this call. Can you specify the reason for this verification?
Person A: We noticed some discrepancies in your recent filings and need to update your information.
Person B: I understand the concern. Can you provide your employee ID for verification?
Person A: Due to security protocols, I cannot share personal details.
Person B: I appreciate that, but I need to ensure this call is legitimate. Can you provide an alternate method for me to verify this?
Person A: Time is of the essence, and we need to rectify this promptly.
Person B: I'd rather take the necessary steps to confirm this independently. Goodbye.`
    },
    {
      conversationId: 5,
      label: 0,
      conversation: `Person A: Hi, I'm from your internet provider. Your connection will be suspended unless we verify your account.
Person B: That sounds urgent. Can you provide your employee ID and official contact number?
Person A: Unfortunately, I cannot share those details over the phone.
Person B: Then I cannot proceed without verification. I’ll contact my provider directly. Goodbye.`
    }
  ];

  useEffect(() => {
    // ✅ Instead of API, set hardcoded conversations
    setConversations(hardcodedConversations);
  }, []);

  // 🔊 Voice loading
  useEffect(() => {
    const loadVoices = () => {
      const v = speechSynthesis.getVoices();
      if (v.length > 0) {
        setVoices(v);
        setMaleVoice(v[0]);
        setFemaleVoice(v[1] || v[0]);
      }
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const parseConversation = (text: string) => {
    const regex = /(Person A:|Person B:)/g;
    const parts = text.split(regex).map((p) => p.trim()).filter(Boolean);
    const sequence: { speaker: "A" | "B"; line: string }[] = [];
    for (let i = 0; i < parts.length; i += 2) {
      const speaker = parts[i];
      const line = parts[i + 1] || "";
      if (speaker === "Person A:") sequence.push({ speaker: "A", line: line.trim() });
      if (speaker === "Person B:") sequence.push({ speaker: "B", line: line.trim() });
    }
    return sequence;
  };

  const playAudio = (text: string) => {
    if (!text || voices.length === 0) return;
    speechSynthesis.cancel();
    const sequence = parseConversation(text);
    let i = 0;

    const speakNext = () => {
      if (i < sequence.length) {
        const { speaker, line } = sequence[i];
        const utter = new SpeechSynthesisUtterance(line);
        utter.voice = speaker === "A" ? maleVoice! : femaleVoice!;
        utter.rate = 0.8;
        setCurrentLineIndex(i);

        setTimeout(() => {
          const el = document.getElementById(`line-${i}`);
          if (scrollRef.current && el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 80);

        utter.onend = () => {
          setTimeout(() => {
            i++;
            speakNext();
          }, 300);
        };

        speechSynthesis.speak(utter);
      } else {
        setCurrentLineIndex(null);
      }
    };

    speakNext();
    setIsPaused(false);
  };

  const stopAudio = () => {
    speechSynthesis.cancel();
    setIsPaused(false);
    setCurrentLineIndex(null);
  };

  const togglePause = () => {
    if (!speechSynthesis.speaking) return;
    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
    } else {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const nextConversation = () => {
    setIndex((p) => (conversations.length > 0 ? (p + 1) % conversations.length : 0));
    speechSynthesis.cancel();
    setIsPaused(false);
    setCurrentLineIndex(null);
  };

  if (conversations.length === 0) {
    return <Typography sx={{ p: 3 }}>Loading conversation...</Typography>;
  }

  const current = conversations[index];
  const sequence = parseConversation(current.conversation);

  


  return (
    <Box>
      <Box
        component="section"
        sx={{
          bgcolor: "#eae8da",
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Unsure About how Scammers try to trick you on call?
          <br /> Hear Sample Conversation of a Scam Call and see how people safeguard themselves.
        </Typography>
      </Box>

      <Box sx={{ p: 2, maxWidth: 1200, mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box>
            <Box
              sx={{
                width: 300,
                height: 600,
                borderRadius: "36px",
                border: "4px solid #333",
                bgcolor: "#000",
                color: "#fff",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                mb: 2,
              }}
            >
              <Box sx={{ bgcolor: "#111", textAlign: "center", py: 1, fontWeight: 800 }}>
                Ongoing Call
                <Typography variant="caption" sx={{ display: "block", color: "#cfcfcf" }}>
                  from +61 123 456 789
                </Typography>
              </Box>

              <Box
                ref={scrollRef}
                sx={{
                  flex: 1,
                  p: 2,
                  bgcolor: "#111",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  "&::-webkit-scrollbar": { width: 6 },
                  "&::-webkit-scrollbar-thumb": { background: "#555", borderRadius: 10 },
                }}
              >
                {sequence.map((s, i) => (
                  <Typography
                    id={`line-${i}`}
                    key={i}
                    variant="body1"
                    sx={{
                      mt: 1,
                      whiteSpace: "pre-line",
                      textAlign: s.speaker === "A" ? "left" : "right",
                      color: currentLineIndex === i ? "#00ff7b" : "#fff",
                      fontWeight: currentLineIndex === i ? 700 : 400,
                    }}
                  >
                    {s.speaker}: {s.line}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              textAlign: "center",
              minWidth: { xs: 280, md: 420 },
            }}
          >
            <Box sx={{paddingTop: 10}}>
  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: "#333" }}>
    Stay Alert, Stay Safe 
  </Typography>
  <Typography variant="body1" sx={{ fontSize: "1.1rem", maxWidth: 900, mx: "auto", color: "#555" }}>
    Listen to these sample scam call conversations and get acquainted with the types of 
    <b> personal details that should NEVER be shared</b> such as bank account numbers, 
    card details, passwords.  
    <br />
    The goal is to help you recognize red flags and safeguard yourself from fraudsters. 
  </Typography>
  </Box>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ paddingTop: 5, mb: 4 }}
            >

              <Button
                variant="contained"
                size="large"
                sx={{ px: 3, py: 1.25, fontWeight: 700 }}
                onClick={() => playAudio(current.conversation)}
              >
                Hear the Conversation
              </Button>
              <IconButton color="error" sx={{ width: 56, height: 56 }} onClick={stopAudio}>
                <StopIcon fontSize="large" />
              </IconButton>
              <IconButton color="secondary" sx={{ width: 56, height: 56 }} onClick={togglePause}>
                {isPaused ? <PlayArrowIcon fontSize="large" /> : <PauseIcon fontSize="large" />}
              </IconButton>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                sx={{ px: 3, py: 1.25, fontWeight: 700 }}
                onClick={nextConversation}
              >
                Hear More Scam Calls
              </Button>
            </Stack>

            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
              Have you received any calls like these?
            </Typography>
            <Button
              variant="contained"
              onClick={() => setOpenGuide(true)}
              sx={{ px: 4, py: 1.5, fontWeight: 800, borderRadius: 3 }}
            >
              Report it now
            </Button>
            <br />
            <Button
              variant="contained"
              onClick={() => navigate("/detectScam")}
              sx={{ px: 4, py: 1.5, fontWeight: 800, borderRadius: 3 }}
            >
              Detect if you have received any scam message
            </Button>

            <ReportGuidePopUp open={openGuide} onClose={() => setOpenGuide(false)} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScamReportPrepare;
