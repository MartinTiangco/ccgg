import { createMuiTheme } from "@material-ui/core/styles";

const ccggBlue = {
  main: "#435273",
  dark: "#26304B",
};

const ccggBackground = {
  default: "#354060",
  paper: "#435273",
};

const theme = createMuiTheme({
  palette: {
    primary: ccggBlue,
    type: "dark",
    background: ccggBackground,
  },
});

export default theme;
