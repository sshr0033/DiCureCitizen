
import Layout from "../components/Layout";
import SpamBox from "../components/SpamBox";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


export default function DetectScam() {

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
        
      <SpamBox/>
    
    </Layout>
  );
}
