import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import MainComponent from "./components/MainComponent";
import FriendsComponent from "./components/FriendsComponent";
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
      <Switch>
        <Route path="/friends">
          <FriendsComponent />
        </Route>
        <Route path="*">
          <MainComponent />
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
