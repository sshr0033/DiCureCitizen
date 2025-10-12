import { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import CountUp from "react-countup";
import { Link as RouterLink } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import phoneFrame from "../assets/iPhone Air - Light Gold - Portrait.png";
import wallpaper from "../assets/wallpaper1.jpg";
import {
  bounce,
  liquidButtonStyle,
  heroContainer,
  heroLeft,
  phoneBox,
  wallpaperBox,
  frameBox,
  buttonStack,
  swipeBox,
} from "../styles/heroBannerStyles";


/* 
@author Team marshmellow
@version 0.0.1
Footer class to provide a general Footer to the entire website. 
*/

type HoverKey = "default" | "detect" | "learn" | "insights" | "help";

interface HeroContent {
  number: number | string;
  subtitle: string;
  description: string;
}


const content: Record<HoverKey, HeroContent> = {
  default: {
    number: 1421359,
    subtitle: "Victims, number update per month",
    description:
      "Between 2020 and 2025, scams cost Australians AU$2.01 billion and affected more than one million people.",
  },
  detect: {
    number: "97%",
    subtitle: "Accurate detection rate",
    description:
      "Our AI-powered system analyses messages and calls to instantly detect scams with 97% accuracy in real time. Download our scam guide pdf that guides you with how to safe guard yourself from such scammers.",
  },
  learn: {
    number: 10,
    subtitle: "Learning modules to protect yourself, with rewarding CERTIFICATE",
    description:
      "Get step-by-step guides, real examples, and prevention tips to identify and stop scams before they reach you. Earn Certificate of being a Good Digital Citizen",
  },
  insights: {
    number: 2000,
    subtitle: "Scam reports analysed this quarter",
    description:
      "Explore interactive insights about scam trends, regions most affected, and emerging tactics used by scammers.",
  },
  help: {
    number: 4,
    subtitle: "Major support channels available near you",
    description:
      "Get help if you've been scammed access recovery tools, government hotlines, and verified community support.",
  },
};

export default function HeroBanner() {
  const [hovered, setHovered] = useState<HoverKey>("default");

  const { number, subtitle, description } = content[hovered];

  return (
    <Box sx={heroContainer}>
    
      <Box sx={heroLeft}>
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "2.5rem",
              sm: "4rem",
              md: "6rem",
              lg: "8rem",
              xl: "10rem",
            },
            fontFamily: "serif",
            fontWeight: 400,
            wordBreak: "break-word",
            transition: "all 0.4s ease",
          }}
        >
          {typeof number === "number" ? (
            <CountUp start={0} end={number} duration={1.25} separator="," />
          ) : (
            number
          )}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            mt: 1,
            fontSize: { xs: "0.9rem", sm: "1.2rem", md: "1.6rem", lg: "2rem" },
            transition: "all 0.3s ease",
          }}
        >
          {subtitle}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(255,255,255,0.85)",
            mt: 2,
            lineHeight: 1.6,
            fontSize: { xs: "0.85rem", sm: "1rem", md: "1.3rem", lg: "1.5rem" },
            maxWidth: "600px",
            transition: "opacity 0.3s ease",
          }}
        >
          {description}
        </Typography>
      </Box>

    
      <Box sx={phoneBox}>
        <Box sx={wallpaperBox(wallpaper)} />
        <Box component="img" src={phoneFrame} alt="Phone Frame" sx={frameBox} />

        <Stack spacing={2} sx={buttonStack}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/detectscam"
            sx={liquidButtonStyle}
            onMouseEnter={() => setHovered("detect")}
            onMouseLeave={() => setHovered("default")}
          >
            Detect Scam
          </Button>
          <Button
            variant="contained"
            sx={liquidButtonStyle}
            component={RouterLink}
            to="/lessons"
            onMouseEnter={() => setHovered("learn")}
            onMouseLeave={() => setHovered("default")}
          >
            Learn
          </Button>
          <Button
            variant="contained"
            sx={liquidButtonStyle}
            component={RouterLink}
            to="/resources"
            onMouseEnter={() => setHovered("insights")}
            onMouseLeave={() => setHovered("default")}
          >
            Insights
          </Button>
          <Button
            variant="contained"
            sx={liquidButtonStyle}
            component={RouterLink}
            to="/helpcenter"
            onMouseEnter={() => setHovered("help")}
            onMouseLeave={() => setHovered("default")}
          >
            Help Center
          </Button>
        </Stack>
      </Box>

     
      {/* Swipe Up */}
<Box
  sx={swipeBox}
  onClick={() => {
    const scamSection = document.getElementById("scam-awareness");
    if (scamSection) {
      scamSection.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  <Typography
    sx={{
      fontSize: { xs: "0.7rem", md: "0.9rem" },
      fontWeight: 600,
      cursor: "pointer",
    }}
  >
    Swipe up to explore
  </Typography>
  <KeyboardArrowUpIcon
    sx={{
      fontSize: { xs: "1.5rem", md: "2rem" },
      animation: `${bounce} 1.5s infinite ease-in-out`,
      cursor: "pointer",
    }}
  />
</Box>

    </Box>
  );
}
