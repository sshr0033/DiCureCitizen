import { keyframes } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";

export const bounce = keyframes`
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.8; }
  30% { transform: translateY(-10px) scale(1.05); opacity: 1; }
  60% { transform: translateY(-5px) scale(0.98); opacity: 0.9; }
  80% { transform: translateY(-2px) scale(1.02); opacity: 1; }
`;

export const heroContainer: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: { xs: "column", lg: "row" },
  alignItems: "center",
  justifyContent: "space-evenly",
  px: { xs: 2, sm: 4, md: 8, lg: 12, xl: 20 },
  py: { xs: 10, sm: 6, md: 8 },
  gap: { xs: 6, lg: 10 },
  position: "relative",
  overflow: "hidden",
};

export const heroLeft: SxProps<Theme> = {
  maxWidth: { xs: "100%", sm: "90%", md: "50%" },
  color: "white",
  textAlign: { xs: "center", lg: "left" },
};

export const phoneBox: SxProps<Theme> = {
  position: "relative",
  width: { xs: 220, sm: 260, md: 320, lg: 360, xl: 400 },
  height: { xs: 420, sm: 480, md: 560, lg: 640, xl: 720 },
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export const wallpaperBox = (wallpaper: string): SxProps<Theme> => ({
  position: "absolute",
  width: "84%",
  height: "95%",
  borderRadius: "40px",
  background: `url(${wallpaper}) center/cover no-repeat`,
  zIndex: 1,
});

export const frameBox: SxProps<Theme> = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  zIndex: 2,
};

export const buttonStack: SxProps<Theme> = {
  position: "absolute",
  zIndex: 3,
  width: "75%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const liquidButtonStyle: SxProps<Theme> = {
  borderRadius: "999px",
  py: { xs: 0.8, sm: 1, md: 1.2 },
  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
  fontWeight: 600,
  color: "#fff",
  width: "100%",
  background: "rgba(255,255,255,0.18)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
  "&:hover": {
    transform: "scale(1.07)",
    background: "rgba(255,255,255,0.25)",
  },
};

export const swipeBox: SxProps<Theme> = {
  position: "absolute",
  bottom: { xs: 10, md: 20 },
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 2,
  py: 1,
  borderRadius: "30px",
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(12px)",
  color: "white",
  zIndex: 10,
};
