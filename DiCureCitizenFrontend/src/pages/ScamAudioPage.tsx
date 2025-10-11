import Layout from "../components/Layout";

import { useLocation,  } from "react-router-dom";
import { useEffect } from "react";
import { Box } from "@mui/material";
import ScamAudio from "../components/ScamAudio";

export default function ScamAudioPage() {
  const { hash  } = useLocation();

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
        }}
      >
      
   
      <ScamAudio />
      
     
      </Box>
    </Layout>
  );
}
