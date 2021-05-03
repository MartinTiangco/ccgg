import { createMuiTheme } from "@material-ui/core/styles";

const ccggBlue = {
  main: "#435273",
};
const card = {
  main: "#5D6D7E",
};
const main = {
  main: "#34495E",
};

const theme = createMuiTheme({
  palette: {
    primary: ccggBlue,
    background: {
      card,
      main,
    },
  },
});

export default theme;
