import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";

const ddragonChamps = `http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/`;

const useStyles = makeStyles((theme) => ({
  item: {
    width: "25px",
    borderRadius: "4px",
  },
  img: {
    width: "20px",
    height: "20px",
    borderRadius: "4px",
  },
  card: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Participants = ({ participants }) => {
  const classes = useStyles();

  const team1Participants = participants.filter((p) => p.teamId === 100);
  const team2Participants = participants.filter((p) => p.teamId === 200);

  const renderParticipants = (p) => {
    return p.map(({ summonername, championName, championImage }) => {
      const champSrc = `${ddragonChamps}${championImage}`;
      return (
        <Grid key={summonername} item container direction="row" spacing={3}>
          <Grid item xs={2}>
            <img className={classes.img} src={champSrc} alt={championName} />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body2" style={{ width: "90%" }} noWrap>
              {summonername}
            </Typography>
          </Grid>
        </Grid>
      );
    });
  };

  const team1Component = renderParticipants(team1Participants);
  const team2Component = renderParticipants(team2Participants);

  return (
    <Grid item container direction="row" className={classes.root}>
      <Grid item container direction="column" xs={6}>
        {team1Component}
      </Grid>
      <Grid item container direction="column" xs={6}>
        {team2Component}
      </Grid>
    </Grid>
  );
};

export default Participants;
