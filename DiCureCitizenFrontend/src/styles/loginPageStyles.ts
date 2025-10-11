import type { SxProps, Theme } from "@mui/material/styles";

export const pageContainer: SxProps<Theme> = {
  position: "relative",
  height: "100vh",
  overflow: "hidden",
};

export const videoBackground: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: -2,
};

export const overlay: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  bgcolor: "rgba(0,0,0,0.5)",
  zIndex: -1,
};

export const contentWrapper: SxProps<Theme> = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const glassBox: SxProps<Theme> = {
  bgcolor: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(8px)",
  borderRadius: 3,
  p: 4,
  width: "100%",
  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  textAlign: "center",
};

export const loginButton: SxProps<Theme> = {
  mt: 2,
  bgcolor: "#4c5f26",
  "&:hover": { bgcolor: "#3a4a1c" },
};
