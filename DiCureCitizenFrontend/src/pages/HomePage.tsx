import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";
import LessonSection from "../components/LessonSection";
import ScamAwarenessSection from "../components/ScamAwareness";
import Helpcenter from "../components/HelpCenter";
import { useLocation,  } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
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
      <HeroBanner/>
      <LessonSection />
      <ScamAwarenessSection />
      <Helpcenter />
    </Layout>
  );
}
