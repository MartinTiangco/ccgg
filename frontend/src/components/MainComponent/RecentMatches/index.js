import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  FormControl,
  InputLabel,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import Description from "./description";
import Champion from "./champion";
import Numbers from "./numbers";
import Items from "./items";
import Participants from "./participants";

import gamemodeConstants from "../constants";

const useStyles = makeStyles((theme) => ({
  card: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    margin: "5px",
    "&:hover": {
      filter: "brightness(110%)",
    },
  },
  win: {
    backgroundColor: "rgba(27, 79, 114, 0.4)",
  },
  loss: {
    backgroundColor: "rgba(123, 36, 28, 0.4)",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const RecentMatches = ({ recentMatches }) => {
  const classes = useStyles();

  const [gamemodeSelect, setGamemodeSelect] = React.useState(
    gamemodeConstants.showAll
  );

  const handleChange = (event) => {
    setGamemodeSelect(event.target.value);
  };

  const noMatchesComponent = (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <ErrorOutlineIcon />
      No data found!
    </Grid>
  );

  const filteredRecentMatches =
    gamemodeSelect !== gamemodeConstants.showAll
      ? recentMatches.filter((match) => match.gameMode === gamemodeSelect)
      : recentMatches;

  const fullMatchesComponent = filteredRecentMatches.map((match) => {
    const {
      matchId,
      gameMode,
      gameCreation,
      gameDuration,
      championName,
      championImage,
      spell1,
      spell2,
      win,
      item0,
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      kills,
      deaths,
      assists,
      largestMultiKill,
      visionScore,
      totalMinionsKilled,
      neutralMinionsKilled,
      champLevel,
      primaryRuneImage,
      secondaryRuneImage,
      participants,
    } = match;

    const cs = totalMinionsKilled + neutralMinionsKilled;
    const csPerMin =
      Math.round((cs / Math.floor(gameDuration / 60)) * 100) / 100;

    let cardClassName = classes.card;
    cardClassName += win ? ` ${classes.win}` : ` ${classes.loss}`;

    return (
      <Card key={matchId} className={cardClassName}>
        <Grid container justify="space-between">
          <Grid container item xs={2}>
            <Description
              gameMode={gameMode}
              gameCreation={gameCreation}
              gameDuration={gameDuration}
              win={win}
            />
          </Grid>
          <Grid container item xs={2}>
            <Champion
              championName={championName}
              championImage={championImage}
              spell1={spell1}
              spell2={spell2}
              primaryRuneImage={primaryRuneImage}
              secondaryRuneImage={secondaryRuneImage}
              champLevel={champLevel}
            />
          </Grid>
          <Grid container item xs={1}>
            <Numbers
              largestMultiKill={largestMultiKill}
              champLevel={champLevel}
              kills={kills}
              deaths={deaths}
              assists={assists}
              cs={cs}
              csPerMin={csPerMin}
            />
          </Grid>
          <Grid container item xs={3}>
            <Items
              matchId={matchId}
              items={[item0, item1, item2, item3, item4, item5, item6]}
              visionScore={visionScore}
            />
          </Grid>
          <Grid container item xs={4}>
            <Participants participants={participants} />
          </Grid>
        </Grid>
      </Card>
    );
  });

  const recentMatchesComponent =
    filteredRecentMatches.length === 0
      ? noMatchesComponent
      : fullMatchesComponent;

  return (
    <Grid container direction="column">
      <Grid
        container
        item
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Typography variant="h6">Recent Matches</Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel style={{ color: "white" }}>Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={gamemodeSelect}
            onChange={handleChange}
            label="Gamemode"
          >
            <MenuItem value={gamemodeConstants.showAll}>Show All</MenuItem>
            <MenuItem value={gamemodeConstants.rankedSolo}>
              Ranked Solo
            </MenuItem>
            <MenuItem value={gamemodeConstants.rankedFlex}>
              Ranked Flex
            </MenuItem>
            <MenuItem value={gamemodeConstants.normal}>Normal</MenuItem>
            <MenuItem value={gamemodeConstants.aram}>ARAM</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {recentMatchesComponent}
    </Grid>
  );
};

export default RecentMatches;
