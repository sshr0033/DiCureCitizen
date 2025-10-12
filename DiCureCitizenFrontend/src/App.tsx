import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetectScam from "./pages/DetectSpam";
import HomePage from "./pages/HomePage";
import LoginPage from "./components/LoginPage";
import QuizAndLessons from "./pages/QuizAndLessons";
import NearestHelpPage from "./pages/NearestHelpPage";
import ScamAudio from "./pages/ScamAudioPage";
import InteractiveQuizPage from "./pages/InteractiveQuizPage";
import ResourcePage from "./pages/ResourcePage";





export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <LoginPage>
          <Routes>
            <Route path="/detectscam" element={<DetectScam />} />
            <Route path="/" element={<HomePage />} />
             <Route path="/lessons" element={<QuizAndLessons />} />
             <Route path="/scamAudio" element={<ScamAudio />} />
<Route path="/quiz" element={<InteractiveQuizPage />} />
            <Route path="/helpcenter" element={<NearestHelpPage/>} />
             <Route path="/resources" element={<ResourcePage/>} />
        
          </Routes>
        </LoginPage>
      </Router>
    </ThemeProvider>
  );
}
