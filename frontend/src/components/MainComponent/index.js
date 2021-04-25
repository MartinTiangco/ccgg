import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
    },
  },
  paper: {
    padding: theme.spacing(8),
    color: theme.palette.text.secondary,
  },
}));

const MainComponent = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={4}>
      <Grid container item direction="column" xs={12} md={8} spacing={2}>
        <Grid item>
          <Paper className={classes.paper} elevation={0}>
            <Typography align="center" variant="h5">
              Summary
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper} elevation={0}>
            <Typography align="center" variant="h5">
              Recent Games
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container item direction="column" xs={12} md={4} spacing={2}>
        <Grid item>
          <Paper className={classes.paper} elevation={0}>
            <Typography align="center" variant="h5">
              Ranking
            </Typography>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper} elevation={0}>
            <Typography align="center" variant="h5">
              Best Champions
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainComponent;
