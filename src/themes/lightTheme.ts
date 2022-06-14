import { blueGrey, grey } from "@mui/material/colors";
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
      main: blueGrey[500],
      dark: blueGrey[800],
      light: blueGrey[100],
    },
    background: {
      paper: grey[50],
    },
  },
});

lightTheme = responsiveFontSizes(lightTheme);

export default lightTheme;
