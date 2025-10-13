import type { SxProps, Theme } from "@mui/material/styles";

export const containerBox: SxProps<Theme> = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  p: { xs: 2, md: 7 },
  ml: { xs: 2, md: 20 },
  backgroundColor: "transparent",
};

export const fadeIconBox: SxProps<Theme> = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "white",
  backgroundColor: "rgba(0,0,0,0.25)",
  borderRadius: "50%",
};

export const glassButton: SxProps<Theme> = {
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
