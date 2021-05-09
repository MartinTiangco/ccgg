import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import MainComponent from "./components/MainComponent";
import Sidebar from "./components/Sidebar";
import PingPopup from "./components/PingPopup";

const useStyles = makeStyles(() => ({
  app: {
    height: "100vh",
    width: "100vw",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row" className={classes.app}>
      <PingPopup />
      <Sidebar />
      <MainComponent />
    </Box>
  );
}

export default App;
