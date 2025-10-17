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
  display: "none",
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
  display: "flex",
  color: "white",
  bgcolor: "rgba(255,255,255,0.15)",
  borderRadius: "50%",
  p: 1.2,
  "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
};

export const accessibilityButton: SxProps<Theme> = {
  display: "none",
};

export const drawer: SxProps<Theme> = {
  display: "block",
  "& .MuiDrawer-paper": {
    width: 280,
    boxSizing: "border-box",
    bgcolor: "rgba(20,30,35,0.95)",
    color: "white",
    borderLeft: "1px solid rgba(255,255,255,0.1)",
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


export const drawerItemActive: SxProps<Theme> = {
  bgcolor: "rgba(255,255,255,0.12)",
  "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
};
