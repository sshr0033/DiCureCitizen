import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";
import MapVisualisation from "../components/MapVisualisation";

export default function ResourcePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <Layout>
      <Box
        sx={{
          background: "linear-gradient(180deg, #0f2027 0%, #203a43 40%, #2c5364 100%)",
          minHeight: "100vh",
          width: "100%",
          pt: { xs: 8, sm: 10 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 2, md: 4 },
          pb: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 1600,
            height: {
              xs: "calc(100vh - 100px)", 
              sm: "calc(100vh - 120px)", 
              md: "calc(100vh - 130px)", 
            },
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
            bgcolor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(8px)",
          }}
        >
          <MapVisualisation />
        </Box>
      </Box>
    </Layout>
  );
}
