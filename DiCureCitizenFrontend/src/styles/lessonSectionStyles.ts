import type { SxProps, Theme } from "@mui/material/styles";

export const sectionBox: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  px: { xs: 2, md: 6 },
  py: 6,
};

export const dividerLine: SxProps<Theme> = {
  borderColor: "rgba(255,255,255,0.3)",
  mb: 4,
  width: "100%",
};

export const gridLayout: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
  gap: { xs: 3, md: 6 },
  maxWidth: 1200,
  width: "100%",
  alignItems: "flex-start",
  justifyContent: "center",
};

export const sectionTitle: SxProps<Theme> = {
  color: "white",
  mb: 1,
  fontSize: { xs: "1.4rem", sm: "1.6rem", md: "2rem" },
  textAlign: "flex-start",
  gridColumn: "1 / -1",
};

export const paperContainer: SxProps<Theme> = {
  p: { xs: 2, sm: 3, md: 5 },
  ml: { md: 25 },
  borderRadius: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.25)",
  color: "white",
  width: { xs: "100%", md: "115%", lg: "170%" },
  maxHeight: { md: "80vh" },
  overflowY: { md: "auto" },
  justifySelf: "center",
};

export const chipRow: SxProps<Theme> = {
  alignItems: "center",
};
export const chipStyle: SxProps<Theme> = {
  color: "white",
  borderColor: "rgba(255,255,255,0.6)",
};

export const lessonTitle: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: { xs: "1.2rem", md: "1.5rem" },
};

export const subtitleText: SxProps<Theme> = {
  color: "rgba(255,255,255,0.8)",
};

export const bulletIcon: SxProps<Theme> = {
  mt: 0.5,
  color: "#90EE90",
};

export const bulletText: SxProps<Theme> = {
  color: "rgba(255,255,255,0.9)",
};

export const buttonRow: SxProps<Theme> = {
  mt: 4,
};

export const navButton: SxProps<Theme> = {
  borderColor: "rgba(255,255,255,0.4)",
  color: "white",
  "&:hover": { borderColor: "white", background: "rgba(255,255,255,0.1)" },
};

export const nextButton: SxProps<Theme> = {
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(10px)",
  color: "white",
  "&:hover": { background: "rgba(255,255,255,0.35)" },
};

export const tipsButton: SxProps<Theme> = {
  ml: { sm: "auto" },
  color: "white",
  border: "1px solid rgba(255,255,255,0.4)",
  "&:hover": { background: "rgba(255,255,255,0.1)" },
};

export const practiseButton: SxProps<Theme> = {
  mt: 1,
  fontWeight: 600,
  borderRadius: 3,
  background: "rgba(255,255,255,0.2)",
  backdropFilter: "blur(12px)",
  "&:hover": { background: "rgba(255,255,255,0.35)" },
};

export const phoneWrapper: SxProps<Theme> = {
  display: "flex",
  justifyContent: { xs: "center", md: "center" },
  alignItems: "center",
  ml: { md: 10, lg: 35 },
};

export const phoneFrameStyle: SxProps<Theme> = {
  position: "relative",
  width: { xs: 260, sm: 300, md: 380, lg: 350 },
  mt: { xs: 0, lg: -6 },
};

export const phoneInner: SxProps<Theme> = {
  position: "absolute",
  top: "2%",
  left: "50%",
  transform: "translateX(-50%)",
  width: "92%",
  height: "96%",
  borderRadius: "35px",
  background:
    "linear-gradient(180deg, rgba(20,20,20,0.95) 0%, rgba(15,15,15,0.95) 100%)",
  overflow: "hidden",
  p: { xs: 2, sm: 3 },
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  pt: "60px",
  zIndex: 1,
};

export const riskyMessage: SxProps<Theme> = {
  mt: "40%",
  alignSelf: "flex-start",
  maxWidth: "85%",
  p: 2,
  borderRadius: 3,
  borderTopLeftRadius: 0,
  bgcolor: "rgba(60,60,60,0.9)",
  color: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
};

export const safeMessage: SxProps<Theme> = {
  alignSelf: "flex-end",
  maxWidth: "90%",
  p: 2,
  borderRadius: 3,
  borderTopRightRadius: 0,
  bgcolor: "rgba(0,128,0,0.85)",
  color: "#fff",
};

export const dialogPaper: SxProps<Theme> = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",
  borderRadius: 4,
  p: 2,
  maxWidth: 500,
};

export const dividerBottom: SxProps<Theme> = {
  borderColor: "rgba(255,255,255,0.3)",
  mt: 4,
  width: "100%",
};
