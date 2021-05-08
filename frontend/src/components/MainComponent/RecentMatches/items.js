import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";

const ddragonItems = `http://ddragon.leagueoflegends.com/cdn/11.9.1/img/item/`;

const useStyles = makeStyles((theme) => ({
  item: {
    height: "30px",
    width: "30px",
    borderRadius: "4px",
  },
  card: {
    margin: "1px",
    backgroundColor: theme.palette.background.default,
  },
}));

const NO_ITEM = "NO_ITEM";

const mapIdToImgSrc = (items) => {
  return items.map((item) => {
    if (item === 0) {
      return NO_ITEM;
    }

    return `${ddragonItems}${item}.png`;
  });
};

const Items = ({ items, matchId, visionScore }) => {
  const classes = useStyles();

  const renderItems = (itemsSrc, itemIds) => {
    return itemsSrc.map((src, index) => {
      if (src === NO_ITEM) {
        return (
          <Grid key={`${matchId}-${itemIds[index]}`} item>
            <Card className={classes.card}>
              <div className={`${classes.item}`} />
            </Card>
          </Grid>
        );
      }
      return (
        <Grid key={`${matchId}-${itemIds[index]}`} item>
          <Card className={classes.card}>
            <Grid item container justify="center" alignItems="center">
              <img className={classes.item} src={src} alt="Item" />
            </Grid>
          </Card>
        </Grid>
      );
    });
  };

  // item img src
  const row1Src = mapIdToImgSrc(items.slice(0, 3));
  const row2Src = mapIdToImgSrc(items.slice(3, 6));
  const trinketSrc = mapIdToImgSrc(items.slice(6, 7));

  // need to concatenate the match id with the item ids for the keys to be different
  const row1ItemIds = [1, 2, 3];
  const row2ItemIds = [4, 5, 6];
  const trinketId = [7];
  const renderRow1 = renderItems(row1Src, row1ItemIds);
  const renderRow2 = renderItems(row2Src, row2ItemIds);
  const renderTrinket = renderItems(trinketSrc, trinketId);

  return (
    <Grid
      item
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid item container justify="center">
        <Grid item container direction="column" justify="center" xs={7}>
          <Grid item container justify="center">
            {renderRow1}
          </Grid>
          <Grid item container justify="center">
            {renderRow2}
          </Grid>
        </Grid>
        <Grid item container justify="center" alignItems="center" xs={1}>
          {renderTrinket}
        </Grid>
      </Grid>

      <Grid container justify="center" alignItems="center" item spacing={1}>
        <Grid item>
          <VisibilityIcon fontSize="small" />
        </Grid>
        <Grid item>
          <Typography variant="body2">Vision: {visionScore}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Items;
