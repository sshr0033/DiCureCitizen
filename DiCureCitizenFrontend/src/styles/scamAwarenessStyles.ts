import type { SxProps, Theme } from "@mui/material/styles";

// 🔹 Section container
export const sectionBox: SxProps<Theme> = {
  minHeight: "60vh",
  display: "flex",
  flexDirection: { xs: "column", lg: "row" },
  alignItems: "center",
  justifyContent: "center",
  px: { xs: 2, sm: 4, lg: 5 },
  py: { xs: 6, lg: 2 },
  gap: { xs: 6, lg: 12 },
};

// 🔹 Phone preview
export const phoneWrapper: SxProps<Theme> = {
  position: "relative",
  width: { xs: 320, sm: 480, md: 700 },
  height: { xs: 180, sm: 260, md: 380 },
  flexShrink: 0,
};

export const videoContainer: SxProps<Theme> = {
  position: "absolute",
  top: { xs: "10%", md: "12%" },
  left: "3%",
  width: "105%",
  height: "90%",
  borderRadius: "30px",
  overflow: "hidden",
  zIndex: 1,
};

export const phoneFrame: SxProps<Theme> = {
  position: "absolute",
  width: "110%",
  height: "110%",
  objectFit: "contain",
  zIndex: 2,
  pointerEvents: "none",
};

// 🔹 Info card
export const paperCard: SxProps<Theme> = {
  width: { xs: "100%", sm: "90%", md: "500px" },
  p: { xs: 3, sm: 4, md: 5 },
  borderRadius: 4,
  background: "rgba(255,255,255,0.12)",
  border: "1px solid rgba(255,255,255,0.25)",
  backdropFilter: "blur(12px)",
  color: "white",
  textAlign: { xs: "center", lg: "left" },
  flexShrink: 0,
};

// 🔹 Text styles
export const heading: SxProps<Theme> = {
  fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
  fontWeight: 700,
  mb: 3,
};

export const description: SxProps<Theme> = {
  mb: 4,
  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.9)",
};

// 🔹 Buttons
export const buttonRow: SxProps<Theme> = {
  justifyContent: { xs: "center", lg: "flex-start" },
  alignItems: "center",
};

export const helpButton: SxProps<Theme> = {
  borderRadius: "999px",
  px: 4,
  py: 1.2,
  fontSize: "1rem",
  fontWeight: 600,
  background: "#f5d4c8",
  color: "#333",
  "&:hover": { background: "#f0bfae" },
};

export const lessonButton: SxProps<Theme> = {
  borderRadius: "999px",
  px: 4,
  py: 1.2,
  fontSize: "1rem",
  fontWeight: 600,
  background: "rgba(255,255,255,0.15)",
  border: "1px solid rgba(255,255,255,0.3)",
  backdropFilter: "blur(10px)",
  color: "#fff",
  "&:hover": { background: "rgba(255,255,255,0.25)" },
};
