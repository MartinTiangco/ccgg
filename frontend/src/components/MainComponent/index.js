import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core";
import Rank from "./Rank";
import BestChampions from "./BestChampions";
import RecentMatches from "./RecentMatches";
import Header from "./Header";
import Summary from "./Summary";

import testMatches from "./RecentMatches/testData";
import summonerInfo from "./Header/testData";
import matches from "./Summary/testMatches";

// LEAGUE-V4 returns a set of LeagueEntryDTO (a LeagueEntryDTO includes a rank)
// i.e. if a player has a RankedSolo and RankedFlex rank it'll return two LeagueEntryDTOs

// TODO - this is dummy data. We can remove this after we have a Context and the Riot API.
// btw this is from the summoner AU Dogs (randomly found one with both a solo and flex ranks)
// const unranked = [];
// const solo = [
//   {
//     queueType: "RANKED_SOLO_5x5",
//     tier: "GOLD",
//     rank: "I",
//     summonerId: "EXXJEL_O4q_DiFvzHjjjw7NFi957AvQkb14Nzf7rBq-Ung",
//     summonerName: "AU Dogs",
//     leaguePoints: 15,
//     wins: 205,
//     losses: 218,
//     veteran: false,
//     inactive: false,
//     freshBlood: false,
//     hotStreak: false,
//   },
// ];
// const flex = [
//   {
//     queueType: "RANKED_FLEX_SR",
//     tier: "SILVER",
//     rank: "I",
//     summonerId: "EXXJEL_O4q_DiFvzHjjjw7NFi957AvQkb14Nzf7rBq-Ung",
//     summonerName: "AU Dogs",
//     leaguePoints: 77,
//     wins: 193,
//     losses: 204,
//     veteran: false,
//     inactive: false,
//     freshBlood: true,
//     hotStreak: true,
//   },
// ];
const leagueEntrySet = [
  {
    queueType: "RANKED_SOLO_5x5",
    tier: "GOLD",
    rank: "I",
    summonerId: "EXXJEL_O4q_DiFvzHjjjw7NFi957AvQkb14Nzf7rBq-Ung",
    summonerName: "AU Dogs",
    leaguePoints: 15,
    wins: 205,
    losses: 218,
    veteran: false,
    inactive: false,
    freshBlood: false,
    hotStreak: false,
  },
  {
    queueType: "RANKED_FLEX_SR",
    tier: "SILVER",
    rank: "I",
    summonerId: "EXXJEL_O4q_DiFvzHjjjw7NFi957AvQkb14Nzf7rBq-Ung",
    summonerName: "AU Dogs",
    leaguePoints: 77,
    wins: 193,
    losses: 204,
    veteran: false,
    inactive: false,
    freshBlood: true,
    hotStreak: true,
  },
];

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
  const classes = useStyles();
  const rankedSolo = leagueEntrySet.find(
    (entry) => entry.queueType === "RANKED_SOLO_5x5"
  );
  const rankedFlex = leagueEntrySet.find(
    (entry) => entry.queueType === "RANKED_FLEX_SR"
  );

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
          <Header summonerInfo={summonerInfo} />
        </Grid>
        <Grid item>
          <Card className={classes.card} raised>
            <Summary matches={matches} />
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card} raised>
            <RecentMatches recentMatches={testMatches} />
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
            <Rank stats={rankedSolo} />
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.card} raised>
            <Rank stats={rankedFlex} isFlex />
          </Card>
        </Grid>
        <Grid item>
          <BestChampions />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainComponent;
