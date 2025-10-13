import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, IconButton, Slider, Button } from "@mui/material";
import { PlayArrow, Pause, Stop, SkipNext, Replay } from "@mui/icons-material";
import phoneFramePortrait from "../assets/iPhone Air - Light Gold - Portrait.png";
import ReportGuidePopUp from "./ReportGuidePopUp";
import { getConversations } from "../api";
import * as styles from "../styles/scamAudioStyles"; // 🟢 Import styles

type Conversation = {
  conversationId: number;
  conversation: string;
  label: number;
};

const ScamAudio: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [caseNo, setCaseNo] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Fetch conversation data
  useEffect(() => {
    getConversations()
      .then((data) => setConversations(data))
      .catch((err) => console.error("Error fetching conversations:", err));
  }, []);

  // Load different type of available voices
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      if (allVoices.length > 0) {
        setVoices(allVoices);
      }
    };
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Distinguish the  text into Person A / B dialogue
  const parseConversation = (text: string) => {
    if (!text) return [];
    const regex = /(Person\s*A\s*:|Person\s*B\s*:)/gi;
    const parts = text
      .split(regex)
      .map((p) => p.trim())
      .filter(Boolean);
    const sequence: { speaker: "A" | "B"; line: string }[] = [];

    for (let i = 0; i < parts.length; i += 2) {
      const speaker = parts[i].toLowerCase();
      const line = parts[i + 1] || "";
      if (speaker.includes("person a"))
        sequence.push({ speaker: "A", line: line.trim() });
      if (speaker.includes("person b"))
        sequence.push({ speaker: "B", line: line.trim() });
    }
    return sequence;
  };

  if (conversations.length === 0) {
    return (
      <Box sx={styles.loadingBox}>
        <Typography variant="h6">Loading conversations...</Typography>
      </Box>
    );
  }

  const currentConv = conversations[caseNo];
  const sequence = parseConversation(currentConv.conversation);

  // Audio playback
  const playAudio = () => {
    if (!voices.length) return;

    speechSynthesis.cancel();
    let i = 0;
    setIsPlaying(true);

    const speakNext = () => {
      if (i < sequence.length) {
        const { speaker, line } = sequence[i];
        const utter = new SpeechSynthesisUtterance(line);
        utter.voice = speaker === "A" ? voices[0] : voices[1] || voices[0];
        utter.rate = 0.95;
        utter.pitch = speaker === "A" ? 0.85 : 1.1;
        setCurrentIndex(i);

        setTimeout(() => {
          const el = document.getElementById(`line-${i}`);
          if (scrollRef.current && el)
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);

        utter.onend = () => {
          i++;
          speakNext();
        };
        speechSynthesis.speak(utter);
      } else {
        setCurrentIndex(null);
        setIsPlaying(false);
      }
    };

    speakNext();
    setIsPaused(false);
  };

  const stopAudio = () => {
    speechSynthesis.cancel();
    setIsPaused(false);
    setIsPlaying(false);
    setCurrentIndex(null);
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
    stopAudio();
    setCaseNo((prev) => (prev + 1) % conversations.length);
  };

  return (
    <Box sx={styles.mainContainer}>
      {/** Left side information and guidance */}
      <Box sx={styles.textSection}>
        <Typography variant="h4" sx={styles.mainHeading}>
          Unsure About how Scammers try to trick you on call?
          <br /> Hear Sample Conversation of a Scam Call and see how people
          safeguard themselves.
        </Typography>

        <Typography variant="body1" sx={styles.description}>
          Listen to these sample scam call conversations and learn what{" "}
          <b>personal details should NEVER</b> be shared such as bank account
          numbers, card details, or passwords.
        </Typography>

        {/** Slider to progress to another conversations */}
        <Box sx={styles.sliderSection}>
          <Typography variant="h6" sx={styles.caseTitle}>
            Show Case No. {caseNo + 1}
          </Typography>

          <Slider
            value={caseNo + 1}
            min={1}
            max={conversations.length}
            sx={styles.slider}
            onChangeCommitted={(_, value) => {
              stopAudio();
              setCaseNo((value as number) - 1);
            }}
          />

          <Box sx={styles.controlRow}>
            <IconButton
              sx={styles.iconButton}
              onClick={isPlaying ? togglePause : playAudio}
            >
              {isPlaying && !isPaused ? (
                <Pause sx={{ fontSize: "2rem" }} />
              ) : (
                <PlayArrow sx={{ fontSize: "2rem" }} />
              )}
            </IconButton>

            <IconButton sx={styles.iconButton} onClick={stopAudio}>
              <Stop sx={{ fontSize: "2rem" }} />
            </IconButton>

            <IconButton
              sx={styles.iconButton}
              onClick={() => {
                stopAudio();
                setTimeout(playAudio, 300);
              }}
            >
              <Replay sx={{ fontSize: "2rem" }} />
            </IconButton>

            <Typography>
              {currentIndex !== null ? currentIndex + 1 : "Ready"} /{" "}
              {sequence.length}
            </Typography>

            <IconButton sx={styles.iconButton} onClick={nextConversation}>
              <SkipNext sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Box>

          {/** ReportGuide section button show the steps to take if scammed */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Sounds Similar to You? Need Help?
            </Typography>
            <Button
              variant="contained"
              sx={styles.helpButton}
              onClick={() => setHelpOpen(true)}
            >
              SEE WHAT TO DO NEXT
            </Button>
          </Box>
        </Box>
      </Box>

      {/**  Phone Display*/}
      <Box sx={styles.phoneContainer}>
        <Box ref={scrollRef} sx={styles.phoneScreen}>
          {sequence.map((msg, i) => (
            <Box
              key={i}
              id={`line-${i}`}
              sx={{
                ...styles.chatBubble,
                alignSelf: msg.speaker === "A" ? "flex-start" : "flex-end",
                background:
                  currentIndex === i
                    ? msg.speaker === "A"
                      ? "rgba(255, 200, 200, 0.8)"
                      : "rgba(100, 200, 255, 0.8)"
                    : msg.speaker === "A"
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,150,255,0.3)",
                fontWeight: currentIndex === i ? 700 : 400,
              }}
            >
              {msg.line}
            </Box>
          ))}
        </Box>

        <Box
          component="img"
          src={phoneFramePortrait}
          alt="Phone Frame"
          sx={styles.phoneFrame}
        />
      </Box>

      <ReportGuidePopUp open={helpOpen} onClose={() => setHelpOpen(false)} />
    </Box>
  );
};

export default ScamAudio;
