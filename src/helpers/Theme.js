import { createMuiTheme } from "@material-ui/core/styles";

export const Theme = createMuiTheme({
  palette: {
    primary: {
      light: "#5f5f5f",
      main: "#353535",
      dark: "#0f0f0f",
      contrastText: "#ffaa00",
    },
    secondary: {
      light: "#ffffff",
      main: "#2196f3",
      dark: "#ffaa00",
      contrastText: "#5f5f5f",
    },
  },
});
