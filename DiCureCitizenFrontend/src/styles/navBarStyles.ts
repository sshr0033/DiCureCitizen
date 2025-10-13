import type { SxProps, Theme } from "@mui/material/styles";

export const appBar: SxProps<Theme> = {
  background: "rgba(20,30,35,0.65)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  px: { xs: 2, md: 6 },
  py: 1.2,
  zIndex: 1200,
};

export const toolbar: SxProps<Theme> = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const logoBox: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 2,
  py: 0.6,
  borderRadius: "999px",
  bgcolor: "rgba(255,255,255,0.15)",
  textDecoration: "none",
  transition: "0.3s",
  "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
};

export const logoImg: SxProps<Theme> = { height: 22, width: 22 };
export const logoText: SxProps<Theme> = {
  color: "white",
  fontWeight: 600,
  fontSize: "0.95rem",
};

export const navLinksContainer: SxProps<Theme> = {
  display: { xs: "none", md: "flex" },
  gap: 3,
  px: 4,
  py: 0.6,
  borderRadius: "999px",
  bgcolor: "rgba(255,255,255,0.15)",
};

export const navButton: SxProps<Theme> = {
  color: "white",
  fontWeight: 500,
  textTransform: "none",
  fontSize: "0.95rem",
  px: 1.5,
  borderRadius: "999px",
  transition: "0.3s",
  "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
};

export const iconGroup: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
};

export const menuButtonMobile: SxProps<Theme> = {
  display: { xs: "flex", md: "none" },
  color: "white",
  bgcolor: "rgba(255,255,255,0.15)",
  borderRadius: "50%",
  p: 1.2,
  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
};

export const accessibilityButton: SxProps<Theme> = {
  display: { xs: "none", md: "flex" },
  bgcolor: "rgba(255,255,255,0.15)",
  color: "white",
  borderRadius: "50%",
  p: 1.2,
  transition: "0.3s",
  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
};

export const drawer: SxProps<Theme> = {
  display: { xs: "block", md: "none" },
  "& .MuiDrawer-paper": {
    width: 240,
    boxSizing: "border-box",
    bgcolor: "rgba(20,30,35,0.95)",
    color: "white",
  },
};

export const drawerContainer: SxProps<Theme> = {
  textAlign: "center",
  height: "100%",
  bgcolor: "rgba(20,30,35,0.95)",
  color: "white",
  backdropFilter: "blur(10px)",
};

export const drawerHeader: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 2,
  py: 2,
  borderBottom: "1px solid rgba(255,255,255,0.2)",
};

export const drawerLogo: SxProps<Theme> = { height: 28, width: 28 };
export const drawerTitle: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: "1.1rem",
};

export const drawerItem: SxProps<Theme> = {
  textAlign: "center",
  "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
};
