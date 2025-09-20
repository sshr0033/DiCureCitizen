import React, { useMemo, useState } from "react";
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
import  PrivacyAwarenessGame from "../cards/PrivacyAwarenessGame";


type Lesson = {
  id: string;
  title: string;
  subtitle: React.ReactNode;
  bullets: string[];
  smsFrom: string;
  riskySMS: string;
  safeSMS: string;
  highlight?: string[];
  theme?: string;
};

const LESSONS: Lesson[] = [
  {
    id: "privacy",
    title: "Safety & Security",
    subtitle: (
  <>
    Privacy is the right and ability to control personal information online, 
    and security is protecting that information from unauthorised access, damage, and theft. 
    Both of them are crucial for safe digital citizenship.
    Imagine it to be like
    <b>locking the doors to your house and not sharing your keys with strangers. </b>  
    Everyttime you think of sharing your personal information online, ask yourself:  
    will you share it in person? Or will you give your house keys to a stranger?
    <br />
  
    <Typography variant="subtitle1" component="div" sx={{ color: "Green", fontWeight: "bold", mt: 2 }}>
      What can you do to protect your privacy and security online?
    </Typography>
  </>
),

    bullets: [
    
      "Never Click on suspicious links or attachments in emails, messages, or websites.",
      "No Bank/Govt asks for OTP online, do not share it with anyone.",
      "Always open a website by typing the URL yourself or using a trusted bookmark.",
    ],
    smsFrom: "ODS-6725 (Commonwealth Bank)" ,
    riskySMS:
      "Your account will be locked in 24 hrs due to suspicious activities near a location 2455km away from you. Verify now: http://fakebank-login.com/verify",
    safeSMS:
      "Don't click links in unexpected messages. If concerned, go to your bank's official app or website directly to check your account status.",
    highlight: ["fakebank-login.com", "Verify now"],
    theme: "#FFF4F3",
  },
  {
    id: "literacy",
    title: "Digital Literacy",
    subtitle:(<> It is just the way you find, create and consume an information. 
    It equips you with the ability to locate, interpret and then understand the information from any source. 
    <br/>Once you read an information, Think about the credibility of the source,
     <b>How true the fact stated inside the message can be. </b> 
     Will forwarding this impact one's online reputation?
     Critical thinking is another way of approaching digital literacy. 
     <Typography variant="subtitle1" component="div" sx={{ color: "Green", fontWeight: "bold", mt: 2 }}>
      What can you do to improve your Digital Literacy?
    </Typography></>),

      
    bullets: [
      "Do not forward/share any chain information without verifying it first.",
      "Always cross-check with trusted fact-checking sites.",
      "Any information about government services, health, or safety should be verified from official websites.",
    ],
    smsFrom: "Family Group Chat",
    riskySMS:
      "The new Australian government policy allows free electricity for all citizens. Forward this to friends/family to let them know  the offer.",
    safeSMS:
      "Stop & verify, this sounds too good to be true. Check official government websites or trusted news sources.",
    highlight: ["Forward this ", "free electricity"],
    theme: "#FFF8E7",
  },
  {
    id: "respect",
    title: "Respect & Empathy",
    subtitle:
     (<> Always remember that there is a human being with feelings on the other side of the screen, 
     Always be empathatic in any conversation. Respect involves treating others with kindness and care for their feelings. 
     Respect the privacy of others and their digital property. <b>
     Think How would you react to a certain text that you are sending? 
     Will you feel good reading that? Is there any respectful way to convey the message you want? </b>
     <Typography variant="subtitle1" component="div" sx={{ color: "Green", fontWeight: "bold", mt: 2 }}>
      What can you do to be Respectful and Empathatic Digitally?
    </Typography> </>),
    bullets: [
      "Behave in the virtual space with the same respect as you would in person.",
      "Do not share anything without the consent of the user.",
      "Pause before posting or sharing anything that could hurt or offend someone.",
    ],
    smsFrom: "Our Group Chat",
    riskySMS: "LOL LOOK at this funny video of Auntie May dancing! ",
    safeSMS:
      "Respectfully stop. This isn't okay. Please delete. You should not forward anyones' video without consent.",
    highlight: ["Auntie May", "funny video"],
    theme: "#EFFEFF",
  },

  {
    id: "legal",
    title: "Legal & Ethical Use",
    subtitle: (
      <>
        Digital citizenship is also about using technology in a lawful way. 
        Legal and ethical use means respecting copyright, giving credit where it's due, 
        and not misusing digital resources. <br />
        <b>Would you like if someone borrows a library book that you wrote read it, return it, but then
        claims that they wrote it themself?.</b> The same rule applies to online content. 
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: "Green", fontWeight: "bold", mt: 2 }}
        >
          How can you use digital content legally & ethically?
        </Typography>
      </>
    ),
    bullets: [
      "Always give credit to authors, photographers, or creators of content.",
      "Do not download or share pirated movies, songs, or software.",
      "Respect intellectual property rights ask before using others'work. Give them credits if you use it.",
    ],
    smsFrom: "Movie Download Group",
    riskySMS:
      "Hey! Download the latest  movie for free here: http://freemovies-download.com",
    safeSMS:
      "This is illegal. Instead, watch through official apps like Netflix, Stan, or borrow from a library.",
    highlight: ["Download for free", "freemovies-download.com"],
    theme: "#FFF0FA",
  },

  {
    id: "awareness",
    title: "Privacy Awareness",
    subtitle: (
      <>
        Privacy awareness means understanding how much of your personal data 
        is visible online and what others can do with it. 
        <br /> <b>Your data is valuable and you must treat it like your wallet. 
        Would you open your wallet  on a public platform?</b> <br />
        Every app, website, or service collects some informations about you
        being aware helps you stay safe and make better choices.
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ color: "Green", fontWeight: "bold", mt: 2 }}
        >
          What can you do to stay privacy-aware?
        </Typography>
      </>
    ),
    bullets: [
      "Check app permissions before installing For example, does a torch app need your contacts?",
      "Limit what you share on public social media posts. Use the privacy settings.",
      "Regularly review privacy settings on apps and accounts. Make sure they match your comfort level.",
    ],
    smsFrom: "Unknown Number",
    riskySMS:
      "You are eligible for a $200 gift card! Just enter your full name, address, and Medicare number to claim.",
    safeSMS:
      "Never share sensitive information like ID, Medicare, or tax file numbers in messages.",
    highlight: ["Medicare number", "share your full name"],
    theme: "#F0FFF0",
  },

];

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

export default function LessonSection() {
  const [idx, setIdx] = useState(0);
  const [showSafe, setShowSafe] = useState(false);
  const [showDIY, setShowDIY] = useState(false);

  const total = LESSONS.length;
  const lesson = LESSONS[idx];

  const go = (dir: 1 | -1) => {
    setShowSafe(false);
    setIdx((p) => (p + dir + total) % total);
  };

  const phoneBG = useMemo(
    () => (lesson.theme ? lesson.theme : "#FFEDE6"),
    [lesson.theme]
  );

  return (
    <Box id="learnCitizenship" component="section"  sx={{ mt: { xs: 12, md: 16 } }}>
      <Box sx={{ px: 4, py: 2, display: "flex", alignItems: "center" }}>
        <Typography
          variant= "h4"
          fontWeight={800}
          sx={{ mx: "auto" }}
          
        >
          Learn how to become a Good Digital Citizen, Practise with real-life simulations
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          px: { xs: 2, md: 4 },
          py: 4,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Chip
              label={`${idx + 1}/${total}`}
              variant="outlined"
              color="default"
              size="small"
            />
            <Chip
              icon={<ShieldIcon />}
              label="Lesson"
              color="primary"
              variant="outlined"
              size="small"
            />
          </Stack>

          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {lesson.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {lesson.subtitle}
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Stack spacing={1.2}>
            {lesson.bullets.map((b, i) => (
              <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                <CheckCircleOutlineIcon
                  fontSize="small"
                  style={{ marginTop: 2 }}
                  color="success"
                />
                <Typography>{b}</Typography>
              </Stack>
            ))}
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            sx={{ mt: 3 }}
          >
            <Button
              startIcon={<ArrowBackIosNewIcon />}
              variant="outlined"
              onClick={() => go(-1)}
            >
              Previous
            </Button>
            <Button
              endIcon={<ArrowForwardIosIcon />}
              variant="contained"
              onClick={() => go(1)}
            >
              Next
            </Button>
            <Button
              startIcon={<TipsAndUpdatesIcon />}
              onClick={() => setShowSafe((s) => !s)}
              sx={{ ml: { sm: "auto" } }}
            >
              {showSafe ? "Show the scenario" : "What to do in this scenario?"}
            </Button>
          </Stack>

        
          <Button
            variant="outlined"
            color= "success"
            onClick={() => setShowDIY(true)}
            sx={{ mt: 2 }}
          >
            Click Here to Practise the lessons you learnt!!
          </Button>
        </Paper>

        
        <Box sx={{ display: "grid", placeItems: "center", p: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              width: 320,
              height: 560,
              borderRadius: "40px",
              border: "14px solid #111",
              boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
              backgroundColor: "#fff",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 140,
                height: 24,
                bgcolor: "#111",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                zIndex: 2,
              }}
            />
           
            <Box
              sx={{
                pt: 4,
                pb: 1,
                px: 2,
                bgcolor: "#f5f5f7",
                borderBottom: "1px solid #eaeaea",
                fontSize: 12,
                color: "#555",
                textAlign: "center",
              }}
            >
              {lesson.smsFrom} • Today 9:30 AM
            </Box>

         
            <Box
              sx={{
                flex: 1,
                px: 2,
                py: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: 2,
                background: phoneBG,
                overflowY: "auto",
              }}
            >
              {!showSafe && (
                <Paper
                  sx={{
                    alignSelf: "flex-start",
                    maxWidth: "85%",
                    p: 1.5,
                    borderRadius: 2,
                    borderTopLeftRadius: 0,
                    bgcolor: "#e5e5ea",
                    color: "#000",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="body2">
                    {highlightText(lesson.riskySMS, lesson.highlight)}
                  </Typography>
                </Paper>
              )}

              {showSafe && (
                <Paper
                  sx={{
                    alignSelf: "flex-end",
                    maxWidth: "85%",
                    p: 1.5,
                    borderRadius: 2,
                    borderTopRightRadius: 0,
                    bgcolor: "#d2f8d2",
                    color: "#094409",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="body2">{lesson.safeSMS}</Typography>
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
        
      </Box>

    

      
      <Dialog open={showDIY} onClose={() => setShowDIY(false)}>
     
        <DialogContent>{lesson.id === "literacy" && <ForwardOrStopGame onBack={() => setShowDIY(false)} />}
{lesson.id === "awareness" && <PrivacyAwarenessGame onBack={() => setShowDIY(false)} />}
{lesson.id === "privacy" && <PasswordCheckGame onBack={() => setShowDIY(false)} />}
{lesson.id === "respect" && <RespectGame onBack={() => setShowDIY(false)} />}
{lesson.id === "legal" && <LegalEthicGame onBack={() => setShowDIY(false)} />}</DialogContent>      </Dialog>
 <Box sx={{ textAlign: "center", mt: 4, mb: 6 }}>
  <Button
    variant="contained"

    sx={{ px: 4, py: 1.5, fontWeight: 600, borderRadius: 4 }}
  >
    Interactive Quiz coming soon!
  </Button>
</Box>
    </Box>
  );
}
