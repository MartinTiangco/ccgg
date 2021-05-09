import React from "react";
import ReactDOM from "react-dom";
import ReactNotification from "react-notifications-component";
import { makeStyles } from "@material-ui/core/styles";

const popupRoot = document.querySelector("#popup-root");

const useStyles = makeStyles(() => ({
  popupContainer: {
    position: "relative",
    borderRadius: "10px",
  },
}));

function PingPopup() {
  const classes = useStyles();

  return ReactDOM.createPortal(
    <div className={classes.popupContainer}>
      <ReactNotification />
    </div>,
    popupRoot
  );
}

export default PingPopup;
