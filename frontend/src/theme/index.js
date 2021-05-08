import { createMuiTheme } from "@material-ui/core/styles";

const ccggBlue = {
  main: "#435273",
  dark: "#26304B",
};

const ccggWhite = {
  main: "#ECF0F1",
  dark: "#ECF0F1",
  lessOpacity: "rgba(236,240,241,0.9)",
};

const ccggBackground = {
  default: "#354060",
  paper: "#435273",
};

const theme = createMuiTheme({
  palette: {
    primary: ccggBlue,
    secondary: ccggWhite,
    type: "dark",
    background: ccggBackground,
  },
});

export default theme;
