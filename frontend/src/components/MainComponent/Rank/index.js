import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

import emblems from "../../../images";

// if the player does not have a solo or a flex rank
const defaultStats = {
  queueType: "",
  tier: "UNRANKED",
  rank: "",
  leaguePoints: 0,
  wins: 0,
  losses: 0,
};

const useStyles = makeStyles(() => ({
  img: {
    filter: "drop-shadow(0px 5px 5px)",
  },
  imgSolo: {
    width: "70%",
  },
  imgFlex: {
    width: "50%",
  },
  heading: {
    color: "#ECF0F1",
    fontWeight: "bold",
  },
  headingSolo: {
    fontSize: "1.2rem",
  },
  headingFlex: {
    fontSize: "1rem",
  },
  textFlex: {
    fontSize: "0.8rem",
  },
}));

// Component showing the Rank of a player in either Ranked Solo or Ranked Flex modes.
const Rank = ({ isFlex, rank: rankStatus }) => {
  let statsToShow = defaultStats;
  const classes = useStyles();

  if (rankStatus && rankStatus.length !== 0) {
    const [rankedSolo, rankedFlex] = rankStatus;
    if (isFlex) {
      statsToShow = rankedFlex;
    } else {
      statsToShow = rankedSolo;
    }
  }

  const {
    queueType,
    tier,
    rank: division,
    leaguePoints,
    wins,
    losses,
  } = statsToShow;

  const isRanked = tier !== defaultStats.tier;
  const winRatio = isRanked ? Math.round((wins / (wins + losses)) * 100) : 0;

  // img element
  const imgSrc = emblems[`emblem${tier}`];
  let imgClassNames = classes.img;
  // smaller emblem img for flex
  imgClassNames +=
    queueType === "RANKED_SOLO_5x5"
      ? ` ${classes.imgSolo}`
      : ` ${classes.imgFlex}`;

  // rank heading class names
  let headingClassNames = classes.heading;
  headingClassNames +=
    queueType === "RANKED_SOLO_5x5"
      ? ` ${classes.headingSolo}`
      : ` ${classes.headingFlex}`;

  // text displays
  const testClassNames = isFlex && ` ${classes.textFlex}`; // smaller font size for flex
  const displayQueueType = isFlex ? "Ranked Flex" : "Ranked Solo";
  const displayRankLP = isRanked
    ? `${tier} ${division} / ${leaguePoints} LP`
    : "Unranked";
  const displayWR = `${winRatio}% WR | ${wins + losses} games`;

  return (
    <Grid container>
      <Grid container justify="center" alignItems="center" item xs={5}>
        <img className={imgClassNames} src={imgSrc} alt={tier} />
      </Grid>
      <Grid container item xs={7} direction="column" justify="center">
        <Typography align="center" variant="body2">
          {displayQueueType}
        </Typography>
        <Typography className={headingClassNames} align="center" variant="h5">
          {displayRankLP}
        </Typography>
        {isRanked && (
          <Typography className={testClassNames} align="center" variant="body2">
            {displayWR}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Rank;
