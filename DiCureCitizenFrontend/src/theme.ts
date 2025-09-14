
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    olive: Palette["primary"];
  }
  interface PaletteOptions {
    olive?: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    olive: {
     
      main: "#6F7E5B",     
      light: "#8EA07A",
      dark: "#4F5F3F",
      contrastText: "#ffffff",
    },
  },
  shape: { borderRadius: 12 },
});
