
export const sectionStyles = {
  articleSection: {
    pt: { xs: 25, md: 12 },
    pb: { xs: 6, md: 12 },
    textAlign: "center",
  },
};

export const cardStyles = {
  container: {
    perspective: "1000px",
    width: "100%",
    maxWidth: 400,
    height: 380,
    mx: "auto",
  },
  inner: (flipped: boolean) => ({
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.8s",
    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
  }),
  front: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    boxShadow: 4,
    borderRadius: 3,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  back: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)",
    boxShadow: 4,
    borderRadius: 3,
    bgcolor: "#eae8da",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    objectFit: "cover",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    p: 2,
  },
};

export const buttonStyles = {
  learnMore: {
    px: 4,
    py: 1,
    borderRadius: "50px",
    bgcolor: "#eae8da",
    fontWeight: 700,
    color: "black",
    fontSize: "0.9rem",
    textTransform: "none",
    "&:hover": { bgcolor: "#3a4a1c", color: "white" },
    alignSelf: "center",
    mt: 2,
  },
  back: {
    px: 4,
    py: 1,
    borderRadius: "50px",
    bgcolor: "#4c5f26",
    fontWeight: 700,
    "&:hover": { bgcolor: "#3a4a1c", color: "white" },
    alignSelf: "center",
    mt: 2,
  },
};

export const navBarStyles = {
  nav: {
    bgcolor: "rgba(0, 0, 0, 0.5)", 
    borderRadius: "25px",
    border: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    height:"60px",
  },
  icon: {
    p: 2.5,
    "&:hover": { bgcolor: "rgba(0, 0, 0, 0.3)"},
  },
  logo: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
    p: 2,
  },
};


