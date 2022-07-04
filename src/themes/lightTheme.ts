import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#68a216",
      dark: "#3b5d0d",
      light: "#94e820",
    },
    secondary: {
      main: "#5016a2",
      dark: "#3a1075",
      light: "#661ccf",
    },
    background: {
      paper: "white",
    },
    action: { focus: "red" },
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;
