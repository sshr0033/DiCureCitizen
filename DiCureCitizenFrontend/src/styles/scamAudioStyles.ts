import type { SxProps, Theme } from "@mui/material/styles";

export const mainContainer: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: { xs: "column", lg: "row" },
  alignItems: "center",
  justifyContent: "center",
  px: { xs: 2, lg: 10 },
  py: { xs: 3, lg: 4 },
  gap: { xs: 6, lg: 8 },
  background: "linear-gradient(180deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
  position: "relative",
};

export const textSection: SxProps<Theme> = {
  maxWidth: "700px",
  mb: { xs: 6, lg: 1 },
  textAlign: { xs: "center", lg: "left" },
  color: "#fff",
};

export const mainHeading: SxProps<Theme> = {
  fontWeight: 800,
  mb: 6,
};

export const description: SxProps<Theme> = {
  opacity: 0.8,
};

export const sliderSection: SxProps<Theme> = {
  mt: 6,
  color: "#fff",
};

export const caseTitle: SxProps<Theme> = {
  mb: 1,
  fontWeight: 600,
};

export const slider: SxProps<Theme> = {
  color: "white",
  maxWidth: 400,
};

export const controlRow: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mt: 2,
  gap: 2,
};

export const iconButton: SxProps<Theme> = {
  color: "white",
};

export const helpButton: SxProps<Theme> = {
  borderRadius: "50px",
  px: 4,
  py: 1,
  ml: 1,
  background: "rgba(255,255,255,0.3)",
  color: "white",
  "&:hover": { background: "rgba(255,255,255,0.5)" },
};

export const phoneContainer: SxProps<Theme> = {
  position: "relative",
  width: 340,
  height: 660,
  mr: { xs: 0, lg: 10 },
  transform: { xs: "translateX(0)", lg: "translateX(-30px)" },
};

export const phoneScreen: SxProps<Theme> = {
  position: "absolute",
  top: "4%",
  left: "3%",
  width: "90%",
  height: "93%",
  borderRadius: "28px",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  p: 2,
  gap: 1,
  overflowY: "auto",
  pt: 4,
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
};

export const chatBubble: SxProps<Theme> = {
  px: 1,
  py: 1,
  borderRadius: "20px",
  maxWidth: "80%",
  fontSize: "0.95rem",
  color: "#fff",
  transition: "all 0.2s ease-in-out",
};

export const phoneFrame: SxProps<Theme> = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  zIndex: 3,
};

export const loadingBox: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
};
