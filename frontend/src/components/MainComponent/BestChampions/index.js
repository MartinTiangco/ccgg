import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Card,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import gameTypes from "./constants";

const ddragonChamps = `http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/`;
const { RANKED, NORMAL, OTHERS } = gameTypes;
const maxNumChampionsShown = 8;

const useStyles = makeStyles((theme) => ({
  img: {
    width: "40px",
    height: "40px",
    marginRight: "5px",
    borderRadius: "5px",
  },
  firstContainer: {
    paddingTop: "5px",
  },
  divider: {
    width: "100%",
  },
  card: {
    padding: theme.spacing(2),
  },
  tab: {
    fontSize: "12px",
    minWidth: "33%",
  },
  noDataTab: {
    height: "150px",
  },
  championText: {
    color: "#ECF0F1",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  bottomText: {
    fontSize: "12px",
    color: theme.palette.text.secondary,
  },
  kdaWinrateText: {
    fontSize: "14px",
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      style={{ width: "100%" }}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

const BestChampions = ({ championStats }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const getDisplay = ({ champions }, queueTypeConstant) => {
    // if no data found
    if (champions.length === 0) {
      return (
        <Grid
          key={`${queueTypeConstant}-not-found`}
          className={`${classes.firstContainer} ${classes.noDataTab}`}
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
    }

    return champions.slice(0, maxNumChampionsShown).map((entry, index) => {
      const { champion, csTotal, kills, deaths, assists, wr, games } = entry;

      const displayCs = `Avg. CS ${csTotal}`;
      const kda = `${
        Math.round(((kills + assists) / deaths + Number.EPSILON) * 100) / 100
      }`;

      // Wukong's name in the Riot API is annoyingly named MonkeyKing, hence we have to consider this edge case
      const championName = champion === "MonkeyKing" ? "Wukong" : champion;

      // let outerGridClassNames = classes.outerGrid;
      const outerGridClassNames = index > 0 ? classes.firstContainer : "";

      return (
        <div key={`${queueTypeConstant}-${championName}`}>
          <Grid
            className={outerGridClassNames}
            item
            container
            direction="row"
            style={{ padding: "5px" }}
          >
            <Grid item container direction="column" xs={2}>
              <img
                className={classes.img}
                src={`${ddragonChamps}${champion}.png`}
                alt={championName}
              />
            </Grid>

            <Grid item container direction="column" xs={4}>
              <Typography className={classes.championText} variant="h5">
                {championName}
              </Typography>
              <Typography className={classes.bottomText}>
                {displayCs}
              </Typography>
            </Grid>
            <Grid item container direction="column" xs={3}>
              <Typography
                className={classes.kdaWinrateText}
              >{`${kda}:1 KDA`}</Typography>
              <Typography
                className={classes.bottomText}
              >{`${kills}/${deaths}/${assists}`}</Typography>
            </Grid>
            <Grid item container direction="column" xs={3}>
              <Typography
                className={classes.kdaWinrateText}
              >{`${wr}%`}</Typography>
              <Typography
                className={classes.bottomText}
              >{`${games} games`}</Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
        </div>
      );
    });
  };

  const rankedStats = getDisplay(
    championStats.find(({ type }) => type === RANKED),
    RANKED
  );
  const normalStats = getDisplay(
    championStats.find(({ type }) => type === NORMAL),
    NORMAL
  );
  const otherStats = getDisplay(
    championStats.find(({ type }) => type === OTHERS),
    OTHERS
  );

  return (
    <>
      <AppBar position="relative">
        <Tabs value={value} onChange={handleChange}>
          <Tab className={classes.tab} label="Ranked" />
          <Tab className={classes.tab} label="Normal" />
          <Tab className={classes.tab} label="Other" />
        </Tabs>
      </AppBar>

      <Card className={classes.card} raised>
        <Grid container>
          <TabPanel value={value} index={0}>
            {rankedStats}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {normalStats}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {otherStats}
          </TabPanel>
        </Grid>
      </Card>
    </>
  );
};

export default BestChampions;
