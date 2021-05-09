import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Button, Card, Grid, Typography } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import refreshMatches from "../../../context/refreshMatches";
import defaultData from "./testData";

const ddragonProfileIcon =
  "http://ddragon.leagueoflegends.com/cdn/11.9.1/img/profileicon/";

const useStyles = makeStyles((theme) => ({
  headerText: {
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
  card: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  border: {
    backgroundColor: theme.palette.secondary.lessOpacity,
    borderRadius: "50%",
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

const Header = ({ userInfo }) => {
  const { getAccessTokenSilently } = useAuth0();
  let summoner = defaultData;
  if (userInfo) {
    summoner = userInfo;
  }

  const classes = useStyles();
  const { summonerName, profileId } = summoner;
  const [currentTimeOfClick, setCurrentTimeOfClick] = useState(Date.now());

  const iconSrc = `${ddragonProfileIcon}${profileId}.png`;

  // This controls how many times the user clicks on the Update button (once every 2 minutes).
  // This controls the usages of the Riot API because there is a rate limit we have to adhere to.
  const handleOnClick = () => {
    const timeOfClick = Date.now();

    const diffTimeOfPreviousClickInSeconds = Math.round(
      (timeOfClick - currentTimeOfClick) / 1000
    );

    const nowDatePlusTwoMin = currentTimeOfClick + 120 * 1000;
    const secondsToWaitUntil2Min = Math.round(
      (nowDatePlusTwoMin - timeOfClick) / 1000
    );
    if (diffTimeOfPreviousClickInSeconds < 120) {
      // eslint-disable-next-line no-alert
      alert(
        `You have already updated ${diffTimeOfPreviousClickInSeconds} seconds ago! Please try again in ${secondsToWaitUntil2Min} seconds.`
      );
      return;
    }

    setCurrentTimeOfClick(timeOfClick);

    refreshMatches(getAccessTokenSilently);
  };

  return (
    <Grid container item alignItems="center" justify="flex-start" spacing={2}>
      <Grid item>
        <Card className={classes.card} raised>
          <Grid
            container
            item
            alignItems="center"
            justify="flex-start"
            spacing={2}
          >
            <Grid item>
              <Box className={classes.border}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  style={{ height: "100%" }}
                >
                  <Grid item>
                    <Avatar
                      className={classes.large}
                      src={iconSrc}
                      alt="Profile Icon"
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item>
              <Typography className={classes.headerText} variant="h5">
                {summonerName}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOnClick}
              >
                <RefreshIcon /> Update
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Header;
