
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetectScam from "./pages/DetectSpam";
import HomePage from "./pages/HomePage";
import ScamReport from "./pages/ScamReport";




export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/detectscam" element={<DetectScam />} />
           <Route path="/" element={<HomePage/>} />
           <Route path="/helpcenter" element={<ScamReport/>} />
      
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
