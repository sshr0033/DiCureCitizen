import type { SxProps, Theme } from "@mui/material/styles";

// 🔹 Dialog container
export const dialogPaper: SxProps<Theme> = {
  position: "relative",
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
  overflow: "hidden",
  border: "1px solid rgba(255,255,255,0.4)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "16px",
    padding: "1px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.2))",
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
  },
};

// 🔹 Dimmed background
export const dialogBackdrop: SxProps<Theme> = {
  backgroundColor: "rgba(0,0,0,0.6)",
  backdropFilter: "blur(6px)",
};

// 🔹 Inner padding
export const dialogContent: SxProps<Theme> = {
  py: 4,
  px: 2,
};

// 🔹 Accordion design
export const accordion: SxProps<Theme> = {
  mb: 1,
  background: "#fafafa",
  borderRadius: 2,
  border: "1px solid rgba(0,0,0,0.1)",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  "&:before": { display: "none" }, // remove default divider
};

// 🔹 Step navigation buttons
export const backButton: SxProps<Theme> = {
  borderRadius: 2,
  textTransform: "none",
  fontWeight: 600,
};

export const nextButton: SxProps<Theme> = {
  borderRadius: 2,
  textTransform: "none",
  fontWeight: 600,
  px: 3,
};

// 🔹 Icons
export const iconError: SxProps<Theme> = {
  fontSize: 60,
  color: "error.main",
};

export const iconInfo: SxProps<Theme> = {
  fontSize: 60,
  color: "info.main",
};

export const iconSuccess: SxProps<Theme> = {
  fontSize: 60,
  color: "success.main",
};
