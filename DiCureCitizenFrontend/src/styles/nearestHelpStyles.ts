export const pageContainer = {
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  px: { xs: 2, md: 8 },
  py: { xs: 8 },
  background: "linear-gradient(180deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
  color: "white",
};

export const insightsCard = {
  width: "100%",
  maxWidth: "1300px",
  mt: { xs: 2, md: 3 },
  mb: { xs: 4, md: 2 },
  px: { xs: 2, md: 3 },
  py: { xs: 2, md: 2.5 },
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  color: "white",
};

export const insightsButton = {
  flexShrink: 0,
  borderRadius: "999px",
  px: 3,
  py: 1.2,
  fontWeight: 700,
  background: "white",
  color: "#222",
  "&:hover": { background: "#f1f1f1" },
};


export const titleBlock = {
  textAlign: "center",

  mt: { xs: 2, md: 0 },
  mb: { xs: 8, md: 1 },
  maxWidth: "600px",
  px: 1,
};

export const titleText = {
  fontWeight: 600,
  fontSize: { xs: "1.8rem", sm: "2.4rem", md: "2.8rem" },
  mb: 4,
};

export const subtitleText = {
  fontWeight: 400,
  color: "rgba(255,255,255,0.9)",
  fontSize: { xs: "1rem", sm: "1.2rem" },
  lineHeight: 1.6,
  mb: 1
};

export const mainLayout = {
  display: "flex",
  flexDirection: { xs: "column", lg: "row" },
  alignItems: "center",
  justifyContent: "space-evenly",
  gap: { xs: 6, lg: 10 },
  width: "100%",
  maxWidth: "1300px",
};

export const leftPanel = {
  p: { xs: 3, md: 4 },
  borderRadius: 4,
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(15px)",
  width: { xs: "100%", lg: "460px" },
  color: "white",
  textAlign: "left",
};

export const infoText = {
  fontWeight: 600,
  mb: 2,
};

export const locateButton = {
  borderRadius: "999px",
  px: 4,
  py: 1.4,
  mb: 3,
  fontWeight: 600,
  background: "white",
  color: "#222",
  "&:hover": { background: "#f1f1f1" },
};

export const toggleGroup = {
  mb: 3,
  "& .MuiToggleButton-root": {
    borderRadius: "999px",
    px: 4,
    py: 0,
    mr: 1,
    color: "white",
    borderColor: "rgba(255,255,255,0.4)",
    "&.Mui-selected": {
      background: "rgba(255,255,255,0.25)",
      borderColor: "white",
    },
  },
};

export const toggleButton = {};

export const resultsBox = {
  p: 2,
  borderRadius: 3,
  background: "rgba(0,0,0,0.4)",
  backdropFilter: "blur(12px)",
  maxHeight: 400,
  overflowY: "auto",
};

export const resultTitle = {
  mb: 2,
  fontWeight: 600,
};

export const listItem = {
  border: "1px solid rgba(255,255,255,0.2)",
  borderRadius: 2,
  mb: 1,
  "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
};

export const phoneContainer = {
  position: "relative",
  width: { xs: 280, sm: 320, md: 370 },
  height: { xs: 580, sm: 680, md: 650 },
  flexShrink: 0,
};

export const mapFrame = {
  position: "absolute",
  top: { xs: "2%" },
  left: { xs: "5%", sm: "11%" },
  width: { xs: "90%", sm: "78%" },
  height: { xs: "95%", sm: "96%" },
  borderRadius: { xs: 7, sm: 12 },
  overflow: "hidden",
  backgroundColor: "#f8f8f8",
  boxShadow: "0 4px 16px rgba(0,0,0,0.45)",
  zIndex: 1,
};

export const phoneFrame = {
  position: "relative",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  zIndex: 0,
};
