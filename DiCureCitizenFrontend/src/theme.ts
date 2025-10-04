import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#4c5f26" },
    secondary: { main: "#eae8da" },
    olive: { main: "#6b775a" } 
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 800 },
    h6: { fontWeight: 600 },
    button: {
      textTransform: "none",
      borderRadius: "50px",
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          px: 4,
          py: 1,
          "&:hover": {
            backgroundColor: "#3a4a1c",
            color: "white",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});
