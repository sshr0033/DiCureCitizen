
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

export const glassStyles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    fontWeight: 600,
    overflow: 'hidden',
    color: 'black',
    cursor: 'pointer',
    boxShadow: '0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)',
  },
  effect: {
    position: 'absolute',
    zIndex: 0,
    inset: 0,
    backdropFilter: 'blur(3px)',
    overflow: 'hidden',
    isolation: 'isolate',
  },
  tint: {
    zIndex: 1,
    position: 'absolute',
    inset: 0,
    background: 'rgba(255, 255, 255, 0.25)',
  },
  shine: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    overflow: 'hidden',
    boxShadow: 'inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)',
  },
  text: {
    zIndex: 3,
    fontSize: '2rem',
    color: 'black',
  },
};

export const navBarStyles = {
  nav: {
    ...glassStyles.wrapper,
    bgcolor: "rgba(255, 255, 255, 0.1)", 
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
  content: {
    ...glassStyles.text,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};


