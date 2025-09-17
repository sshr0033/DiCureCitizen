import { Box, Typography, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate, useLocation } from "react-router-dom";


import SecurityIcon from "@mui/icons-material/Security";
import PlagiarismIcon from '@mui/icons-material/Plagiarism';
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MenuBookIcon from "@mui/icons-material/MenuBook";


import OldManImg from "../assets/oldmanpic.png";
import ReadMan from "../assets/oldmanreading.jpg";
import HelpCenterImg from "../assets/oldmantension.jpg";

const slides = [
  {
    id: 1,
    title: (
      <>
        Securing your privacy and data are a <br /> key aspect of digital citizenship.
      </>
    ),
    subtitle: "Small lessons that make big differences in your online safety.",
    image: OldManImg,
  },
  {
    id: 2,
    title: (
      <>
        Did You Know Seniors in Australia Lost <br /> $100 Million to Scams in 2024?
      </>
    ),
    subtitle: "Stay updated and protect yourself with us.",
    image: ReadMan,
  },
  {
    id: 3,
    title: (
      <>
        Every Year Seniors in <br /> Australia lose over $66.5 million in scams.
      </>
    ),
    subtitle: "We are here to help, know what to do next. File a report or get help.",
    image: HelpCenterImg,
  },
];

const actionButtons = [
  { label: "Learn Good Digital Citizenship", link: "/#learnCitizenship", icon: <SecurityIcon sx={{ fontSize: 40, color: "#4c5f26" }} /> },
  { label: "Detect Scam", link: "/detectscam", icon: <PlagiarismIcon sx={{ fontSize: 40, color: "#4c5f26" }} /> },
  { label: "Know latest Scams", link: "/detectscam#articles", icon: <MenuBookIcon sx={{ fontSize: 40, color: "#4c5f26" }} /> },
  { label: "Help Center", link: "/helpcenter", icon: <SupportAgentIcon sx={{ fontSize: 40, color: "#4c5f26" }} /> },

];

export default function HeroBanner() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (link) => {
    if (link.includes("#")) {
      const [path, hash] = link.split("#");
      if (location.pathname === path || (path === "/" && location.pathname === "/")) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(link);
      }
    } else {
      navigate(link);
    }
  };

  return (
    <Box component="section" sx={{ width: "100%", minHeight: "70vh", position: "relative",}}>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "stretch",
                minHeight: "70vh",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: "65%",
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  zIndex: 1,
                }}
              />

              <Box
                sx={{
                  flex: 1,
                  bgcolor: "#eae8da",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  pl: { xs: 3, md: 8 },
                  pr: { xs: 2, md: 4 },
                  clipPath: {
                    md: "polygon(0 0, 65% 0, 55% 100%, 0% 100%)",
                    xs: "none",
                  },
                  zIndex: 2,
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                  {slide.title}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>
                  {slide.subtitle}
                </Typography>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box
  sx={{
    position: "absolute",
    bottom: { xs: "-120px", md: "-50px" }, // more space on mobile
    left: "50%",
    transform: "translateX(-50%)",
    display: "grid",
    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }, 
    gap: { xs: 2, md: 3 },
    justifyContent: "center",
    width: { xs: "95%", md: "90%" },
    zIndex: 10,
  }}
>
  {actionButtons.map((btn) => (
    <Paper
      key={btn.label}
      elevation={4}
      sx={{
        textAlign: "center",
        bgcolor: "#fff",
        p: { xs: 2, md: 3 }, // smaller padding on mobile
        borderRadius: 2,
        cursor: "pointer",
        "&:hover": { bgcolor: "#f5f5f5" },
      }}
      onClick={() => handleNavigation(btn.link)}
    >
      <Box sx={{ mb: 1 }}>{btn.icon}</Box>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          color: "#4c5f26",
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, // shrink text on small screens
        }}
      >
        {btn.label}
      </Typography>
    </Paper>
  ))}
</Box>

    </Box>
  );
}
