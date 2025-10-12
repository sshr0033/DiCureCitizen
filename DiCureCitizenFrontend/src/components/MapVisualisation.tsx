import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import map2 from "../assets/map .html?url"; 

export default function MapVisualisation() {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {!loaded && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(0,0,0,0.2)",
            zIndex: 2,
          }}
        >
          <CircularProgress size={40} sx={{ color: "#90caf9" }} />
        </Box>
      )}

      <iframe
        src={map2}
        title="Map Visualisation"
        onLoad={() => setLoaded(true)}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </Box>
  );
}
