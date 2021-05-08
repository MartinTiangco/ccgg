import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import Decorative from "./decorative";

const useStyles = makeStyles((theme) => ({
  root: {},
  queueText: { color: "#ECF0F1", fontWeight: "bold", fontSize: "14px" },
  relativeTimeText: {
    fontSize: "12px",
    color: theme.palette.text.secondary,
  },
  winLoseText: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  winText: {
    color: "#3273fa",
  },
  lossText: {
    color: "#ff4e50",
  },
  gameDurationText: {
    fontSize: "13px",
  },
  gridText: {
    height: "90px",
  },
  gridWinLose: {
    marginRight: "10px",
  },
}));

const timeDifference = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  let stringToReturn;
  if (elapsed < msPerMinute) {
    stringToReturn = `${Math.round(elapsed / 1000)} seconds ago"`;
  } else if (elapsed < msPerHour) {
    stringToReturn = `${Math.round(elapsed / msPerMinute)} minutes ago`;
  } else if (elapsed < msPerDay) {
    stringToReturn = `${Math.round(elapsed / msPerHour)} hours ago`;
  } else if (elapsed < msPerMonth) {
    stringToReturn = `${Math.round(elapsed / msPerDay)} days ago`;
  } else if (elapsed < msPerYear) {
    stringToReturn = `${Math.round(elapsed / msPerMonth)} months ago`;
  } else {
    stringToReturn = `${Math.round(elapsed / msPerYear)} years ago`;
  }
  return stringToReturn;
};

const Description = ({ gameMode, gameCreation, gameDuration, win }) => {
  const classes = useStyles();

  // gameCreation is a timestamp in milliseconds
  const relativeTime = timeDifference(Date.now(), gameCreation);

  // gameDuration is a timestamp in seconds
  const gameTimeInMin = Math.floor(gameDuration / 60);
  const gameTimeInSec = gameDuration % 60;
  const gameTimeInSecString =
    gameTimeInSec < 10 ? `0${gameTimeInSec}` : `${gameTimeInSec}`;
  const displayGameTime = `${gameTimeInMin}:${gameTimeInSecString}`;

  const displayWin = win ? "WIN" : "LOSS";

  return (
    <Grid container item direction="row" alignItems="center">
      <Grid item xs={1} style={{ height: "100%" }}>
        <Decorative win={win} />
      </Grid>
      <Grid
        className={classes.gridText}
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        xs={7}
      >
        <Grid item>
          <Typography className={classes.queueText}>{gameMode}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.relativeTimeText}>
            {relativeTime}
          </Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid className={classes.gridWinLose} item>
            <Typography
              className={`${classes.winLoseText} ${
                win ? classes.winText : classes.lossText
              }`}
            >
              {displayWin}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.gameDurationText}>
              {displayGameTime}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Description;
