import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import icons from "../../../images";

const useStyles = makeStyles(() => ({
  popupContainer: {
    position: "relative",
    width: "100%",
    background: "#858CA5CC",
    filter: "drop-shadow(0px 5px 7px rgba(0, 0, 0, 0.25));",
    padding: "20px",
    borderRadius: "10px",
    borderLeft: "5px solid white",
  },
  popupBox: {
    marginLeft: "-60px",
  },
  iconImg: { width: "80px", margin: "0 10px" },
  closeIcon: {
    position: "absolute",
    top: "15px",
    right: "15px",
  },
}));

function PingPopupContent({ pingedBy }) {
  const classes = useStyles();
  return (
    <div className={classes.popupContainer}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        className={classes.popupBox}
      >
        <img
          src={icons.missingIcon}
          alt="Ping Icon"
          className={classes.iconImg}
        />
        <Typography variant="h5" component="h3" m={2}>
          {pingedBy} <strong>Pinged</strong> you
        </Typography>
        <CloseIcon className={classes.closeIcon} />
      </Box>
    </div>
  );
}

export default PingPopupContent;
