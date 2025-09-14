
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetectScam from "./pages/DetectSpam";



export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/detectscam" element={<DetectScam />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
