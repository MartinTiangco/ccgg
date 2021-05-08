import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "4px",
    height: "100%",
    borderRadius: "4px",
  },
  win: {
    backgroundColor: "#3273fa",
  },
  loss: {
    backgroundColor: "#ff4e50",
  },
});

const Decorative = ({ win }) => {
  const classes = useStyles();
  let className = classes.root;
  className += win ? ` ${classes.win}` : ` ${classes.loss}`;
  return <div className={className} />;
};

export default Decorative;
