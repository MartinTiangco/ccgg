import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, CircularProgress } from "@material-ui/core";
import Rank from "./Rank";
import BestChampions from "./BestChampions";
import RecentMatches from "./RecentMatches";
import Header from "./Header";
import Summary from "./Summary";
import { AppContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    margin: "20px",
  },
  innerGrid: {
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(8),
    color: theme.palette.text.secondary,
  },
  card: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const MainComponent = () => {
  const {
    matchSummary,
    recentMatches,
    userInfo,
    bestChampions,
    rank,
    isloading,
    updateAll,
  } = useContext(AppContext);

  updateAll();

  const classes = useStyles();

  if (isloading) {
    return <CircularProgress />;
  }
  return (
    <Grid container className={classes.root}>
      <Grid
        container
        item
        className={classes.innerGrid}
        direction="column"
        xs={10}
        sm={7}
        md={8}
        spacing={2}
      >
        <Grid item>
          <Header userInfo={userInfo} />
        </Grid>
        <Grid item>
          <Card className={classes.card} raised>
            <Summary matchSummary={matchSummary} />
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card} raised>
            <RecentMatches recentMatches={recentMatches} />
          </Card>
        </Grid>
      </Grid>
      <Grid
        container
        item
        className={classes.innerGrid}
        direction="column"
        justify="flex-start"
        xs={10}
        sm={5}
        md={3}
        xl={3}
        spacing={1}
      >
        <Grid item>
          <Card className={classes.card} raised>
            <Rank rank={rank} />
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card} raised>
            <Rank rank={rank} isFlex />
          </Card>
        </Grid>
        <Grid item>
          <BestChampions bestChampions={bestChampions} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainComponent;
