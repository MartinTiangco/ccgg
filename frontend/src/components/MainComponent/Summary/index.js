import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  InputLabel,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Charts from "./Charts";
import gamemodeConstants from "../constants";
import defaultMatches from "./testMatches";

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

const Summary = ({ matchSummary }) => {
  let matches = defaultMatches;
  if (matchSummary) {
    matches = matchSummary;
  }

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
      ? matches.filter((match) => match.gameMode === gamemodeSelect)
      : matches;
  const fullMatchesComponent = <Charts matches={filteredRecentMatches} />;

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
        <Typography variant="h5">Recent Performance</Typography>
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

export default Summary;
