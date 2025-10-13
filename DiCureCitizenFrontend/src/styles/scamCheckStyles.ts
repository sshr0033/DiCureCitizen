import { keyframes } from "@mui/system";
import type { SxProps, Theme } from "@mui/material/styles";

const moveHand = keyframes`
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  40% { transform: translate(40px, -40px) scale(1.1); opacity: 1; }
  70% { transform: translate(400px, -60px) scale(1); opacity: 1; }
  100% { transform: translate(750px, -20px) scale(1); opacity: 0; }
`;

export const mainContainer: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  px: { xs: 2, md: 8 },
  py: { xs: 8, md: 4 },
  background: "linear-gradient(180deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
  position: "relative",
};

export const innerLayout: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: "center",
  justifyContent: "center",
  gap: { xs: 4, md: 6 },
  width: "100%",
  maxWidth: 1200,
};

export const leftCard: SxProps<Theme> = {
  p: { xs: 2, md: 3 },
  borderRadius: 4,
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: "100%",
  maxWidth: { xs: "100%", md: 600 },
  minHeight: 280,
};

export const resultCard: SxProps<Theme> = {
  p: { xs: 2, md: 3 },
  borderRadius: 4,
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  display: "flex",
  flexDirection: "column",
  gap: 2,
  width: "100%",
  maxWidth: { xs: "100%", md: 350 },
  minHeight: 280,
};

export const cardTitle: SxProps<Theme> = {
  color: "white",
  fontWeight: 700,
  mb: 1,
};
export const cardSubtitle: SxProps<Theme> = {
  color: "white",
  mb: 2,
  opacity: 0.9,
};

export const errorAlert: SxProps<Theme> = { mb: 1 };

export const textInput: SxProps<Theme> = {
  width: "100%",
  mb: 2,
  borderRadius: "20px",
  background: "rgba(255,255,255,0.2)",
  "& fieldset": { border: "none" },
  "& textarea": { color: "white" },
};

export const detectButton: SxProps<Theme> = {
  mt: 2,
  borderRadius: "999px",
  px: 4,
  py: 1.5,
  fontWeight: 600,
  background: "white",
  color: "#333",
  "&:hover": { background: "#f1f1f1" },
};

export const resultBox = (score: number): SxProps<Theme> => {
  let bgColor = "rgba(0,0,0,0.3)";
  if (score > 60) bgColor = "rgba(255,0,0,0.4)";
  else if (score > 40) bgColor = "rgba(255,255,0,0.25)";
  else bgColor = "rgba(0,255,0,0.25)";

  return {
    mt: 2,
    p: 3,
    borderRadius: 3,
    background: bgColor,
    color: "white",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.15)",
    transition: "0.3s ease",
  };
};

export const resultPercent = (score: number): SxProps<Theme> => {
  let color = "#fff";
  if (score > 60) color = "#ff5b5b";
  else if (score > 40) color = "#ffd93b";
  else color = "#9cff9c";

  return {
    fontWeight: 700,
    mt: 1,
    color,
    textShadow: "0 0 6px rgba(0,0,0,0.5)",
    transition: "0.3s ease",
  };
};

export const helpSection: SxProps<Theme> = { mt: 2 };
export const helpText: SxProps<Theme> = { color: "white", mb: 1 };
export const helpButton: SxProps<Theme> = {
  borderRadius: "20px",
  px: 4,
  py: 1,
  fontWeight: 600,
  background: "white",
  color: "#333",
  "&:hover": { background: "#f1f1f1" },
};

export const phoneContainer: SxProps<Theme> = {
  position: "relative",
  width: { xs: 220, sm: 260, md: 330 },
  height: { xs: 420, sm: 500, md: 650 },
  flex: "0 0 auto",
};
export const phoneVideo: SxProps<Theme> = {
  position: "absolute",
  top: "2%",
  left: "5%",
  width: "89%",
  height: "96%",
  borderRadius: "30px",
  objectFit: "cover",
  zIndex: 1,
};
export const phoneFrame: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  zIndex: 2,
};

export const handPointer: SxProps<Theme> = {
  position: "absolute",
  bottom: { xs: "10%", md: "20%" },
  left: { xs: "10%", md: "18%" },
  width: { xs: 40, sm: 50, md: 60 },
  height: "auto",
  zIndex: 10,
  animation: `${moveHand} 4s ease-in-out infinite`,
};
