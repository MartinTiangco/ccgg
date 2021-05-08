import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Box, Button, Card, Grid, Typography } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";

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

const Header = ({ summonerInfo }) => {
  const classes = useStyles();
  const { summonerName, profileId } = summonerInfo;

  const iconSrc = `${ddragonProfileIcon}${profileId}.png`;

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
              <Button variant="contained" color="primary">
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
