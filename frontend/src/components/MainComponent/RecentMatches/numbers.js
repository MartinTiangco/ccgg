import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  boldFont: {
    fontWeight: "bold",
  },
  lightFont: {
    fontSize: "14px",
  },
  deaths: {
    color: "#ff4e50",
  },
  regularKda: {
    color: "#ECF0F1",
    fontWeight: "bold",
  },
  goodKda: {
    color: "rgb(50, 115, 250)",
    fontWeight: "bold",
  },
  greatKda: {
    color: "rgb(255, 155, 0)",
    fontWeight: "bold",
  },
  smallFont: {
    fontSize: "11px",
  },
  root: {
    fontSize: "12px",
  },
}));

const Numbers = ({
  largestMultiKill,
  champLevel,
  kills,
  deaths,
  assists,
  cs,
  csPerMin,
}) => {
  const classes = useStyles();

  // if deaths = 0, we can't divide. So we make it at least 1.
  const deathCalculation = deaths === 0 ? 1 : deaths;
  const kda =
    Math.round(((kills + assists) / deathCalculation + Number.EPSILON) * 100) /
    100;
  let kdaClass = "";
  if (kda >= 5) {
    kdaClass = classes.greatKda;
  } else if (kda >= 3) {
    kdaClass = classes.goodKda;
  } else {
    kdaClass = classes.regularKda;
  }

  let displayMultiKill = "";
  if (largestMultiKill === 5) {
    displayMultiKill = "Penta";
  } else if (largestMultiKill === 4) {
    displayMultiKill = "Quadra";
  } else if (largestMultiKill === 3) {
    displayMultiKill = "Triple";
  } else if (largestMultiKill === 2) {
    displayMultiKill = "Double";
  }

  return (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>
        <Typography className={`${classes.lightFont} ${classes.smallFont}`}>
          Level {champLevel}
        </Typography>
      </Grid>
      <Grid container item direction="row" justify="center" alignItems="center">
        <Typography className={classes.boldFont}>{kills}</Typography>
        <Typography className={classes.lightFont}>/</Typography>
        <Typography className={`${classes.boldFont} ${classes.deaths}`}>
          {deaths}
        </Typography>
        <Typography className={classes.lightFont}>/</Typography>
        <Typography className={classes.boldFont}>{assists}</Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <Typography className={kdaClass}>{kda}</Typography>
        </Grid>
        <Grid item>
          <Typography className={`${classes.lightFont} ${classes.smallFont}`}>
            KDA
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography className={`${classes.lightFont} ${classes.smallFont}`}>
          {cs} CS ({csPerMin})
        </Typography>
      </Grid>
      {largestMultiKill > 1 && (
        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Card
              style={{
                padding: "4px",
                backgroundColor: "rgba(93, 109, 126, 0.2)",
              }}
            >
              {displayMultiKill} Kill
            </Card>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Numbers;
