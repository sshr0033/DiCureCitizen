import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    olive: Palette['primary'];
  }
  interface PaletteOptions {
    olive?: PaletteOptions['primary'];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    olive: true;
  }
}

