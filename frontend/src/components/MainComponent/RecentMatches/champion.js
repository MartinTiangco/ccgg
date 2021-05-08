import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const ddragonChamps = `http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/`;
const ddragonSummoners = `http://ddragon.leagueoflegends.com/cdn/11.9.1/img/spell/`;
const ddragonRunes = `http://ddragon.leagueoflegends.com/cdn/img/`;

const useStyles = makeStyles((theme) => ({
  championImg: {
    width: "100%",
    borderRadius: "5px",
  },
  runeSummonerImg: {
    width: "25px",
    height: "25px",
    borderRadius: "5px",
    margin: "2px",
  },
  card: {
    backgroundColor: theme.palette.background.default,
  },
}));

const Champion = ({
  championName,
  championImage,
  spell1,
  spell2,
  primaryRuneImage,
  secondaryRuneImage,
}) => {
  const classes = useStyles();

  const championImgSrc = `${ddragonChamps}${championImage}`;

  const primaryRuneSrc = `${ddragonRunes}${primaryRuneImage}`;
  const secondaryRunePathSrc = `${ddragonRunes}${secondaryRuneImage}`;

  const summ1Src = `${ddragonSummoners}${spell1}`;
  const summ2Src = `${ddragonSummoners}${spell2}`;

  return (
    <Grid
      item
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid container justify="center" alignItems="center" item xs={4}>
        <img
          className={classes.championImg}
          src={championImgSrc}
          alt={championName}
        />
      </Grid>
      <Grid container direction="row" item xs={6}>
        <Grid item>
          <Grid container justify="center" alignItems="center">
            <img
              className={classes.runeSummonerImg}
              src={summ1Src}
              alt="Summoner 1"
            />
          </Grid>
          <Grid container justify="center" alignItems="center">
            <img
              className={classes.runeSummonerImg}
              src={summ2Src}
              alt="Summoner 2"
            />
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify="center" alignItems="center">
            <img
              className={classes.runeSummonerImg}
              src={primaryRuneSrc}
              alt="Primary Rune"
            />
          </Grid>
          <Grid container justify="center" alignItems="center">
            <img
              className={classes.runeSummonerImg}
              src={secondaryRunePathSrc}
              alt="Secondary Rune Path"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Champion;
