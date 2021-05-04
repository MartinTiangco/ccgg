import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import MainComponent from "./components/MainComponent";
import Sidebar from "./components/Sidebar";

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
      <Sidebar />
      <MainComponent />
    </Box>
  );
}

export default App;
