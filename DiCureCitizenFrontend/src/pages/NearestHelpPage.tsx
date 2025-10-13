import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";
import NearestHelpCenterSection from "../components/NearestHelpCenterSection";

export default function NearestHelpPage() {
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
          minHeight: "calc(100vh - 160px)", 
          py: { xs: 6, md: 8 },
        }}
      >
        <NearestHelpCenterSection />
      </Box>
    </Layout>
  );
}
