import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      contrastText: "#ffffff", // White for good contrast against the dark primary
      dark: "#214B23", // Darker shade of the main color
      light: "#88C379", // Lighter shade of the main color
      main: "#44814e", // Your provided color
    },
    secondary: {
      contrastText: "#000000", // Black for good contrast against the light secondary
      dark: "#285A3A", // Darker shade of the secondary color
      light: "#E0F2E4", // Lighter shade of the secondary color
      main: "#92D9A9", // Complementary color to the main color
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          ":not(:focus-visible)": {
            outline: "none",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1920,
    },
  },
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

export default theme;
