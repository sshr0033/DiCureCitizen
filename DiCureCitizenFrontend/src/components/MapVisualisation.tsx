import { useState } from "react";
import { Box, CircularProgress, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import map2 from "../assets/map .html?url";

/* 
@author Team marshmellow
@version 0.0.1
MapVisualisation for the data visualisation simply to shoot the html file made
*/
export default function MapVisualisation() {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box sx={{ width: "100%" }}>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 420, sm: 520, md: 600 }, 
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          component={RouterLink}
          to="/detectscam"
          sx={{
            borderRadius: "999px",
            px: 3,
            py: 1.2,
            fontWeight: 700,
            background: "white",
            color: "#222",
            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            "&:hover": { background: "#f1f1f1" },
          }}
        >
          Go back to Detect a Scam
        </Button>
      </Box>
    </Box>
  );
}
