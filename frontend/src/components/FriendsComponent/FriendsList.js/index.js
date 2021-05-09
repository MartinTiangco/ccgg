import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  TextField,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import AddIcon from "@material-ui/icons/Add";
import missingIcon from "../../../images/icons/missing.png";

const useStyles = makeStyles((theme) => ({
  summonerName: {
    color: "#A6ACAF",
  },
  iconImg: {
    maxHeight: "2em",
  },
  add: {
    backgroundColor: "white",
    color: theme.palette.primary.main,
    maxHeight: "6em",
    padding: "5px",
    margin: "5px",
  },
  noBorder: {
    border: "none",
  },
  textFieldColor: {
    color: theme.palette.primary.main,
  },
  friendRow: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    margin: "5px",
    "&:hover": {
      filter: "brightness(110%)",
    },
    minHeight: "6em",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  scroll: {
    overflowY: "scroll",
    maxHeight: "67vh",
    "&::-webkit-scrollbar": {
      width: 8,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "white",
      borderRadius: "3px",
    },
  },
}));

const FriendsList = ({ friends, handlePingFriend }) => {
  const classes = useStyles();

  // eslint-disable-next-line
  const [inputText, setInputText] = React.useState("");
  const [invalidFriend, setInvalidFriend] = React.useState(false);

  const noFriendsComponent = (
    <Grid
      item
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <ErrorOutlineIcon />
      No friends found!
    </Grid>
  );

  const FriendsComponent = friends.map((friend) => {
    const { username, summonerName } = friend;

    return (
      <Card key={username} className={classes.friendRow}>
        <Grid container justify="space-between">
          <Grid container item direction="column" xs={11}>
            <Grid container item xs={4}>
              <Typography variant="h5">{username}</Typography>
            </Grid>
            <Grid container item xs={7}>
              <Typography variant="body2" className={classes.summonerName}>
                Summoner: {summonerName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={1}>
            <Tooltip title="Ping Friend">
              <Button
                color="secondary"
                onClick={() => {
                  handlePingFriend(summonerName);
                }}
              >
                <img
                  src={missingIcon}
                  alt="Ping Icon"
                  className={classes.iconImg}
                />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Card>
    );
  });

  const currentFriendsComponent =
    friends.length === 0 ? noFriendsComponent : FriendsComponent;

  const handleSubmit = () => {
    setInvalidFriend(!invalidFriend);
    // TODO: CALL BACKEND TO ADD FRIEND
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // TODO CALL BACKEND
    }
  };

  return (
    <Grid container direction="column">
      <Card className={classes.add}>
        <Grid container item direction="row" alignItems="center" xs={12}>
          <Grid container item xs={11}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Enter username..."
              InputLabelProps={{
                className: classes.textFieldColor,
              }}
              InputProps={{
                className: classes.textFieldColor,
                classes: { notchedOutline: classes.noBorder },
              }}
              onInput={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              error={invalidFriend}
              helperText={invalidFriend ? "Invalid username!" : ""}
              autoComplete="off"
            />
          </Grid>
          <Grid container item xs={1} direction="column">
            <Tooltip title="Add Friend">
              <Button color="primary" onClick={handleSubmit}>
                <AddIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Card>
      <Grid
        container
        item
        direction="column"
        wrap="nowrap"
        xs={12}
        className={classes.scroll}
      >
        {currentFriendsComponent}
      </Grid>
    </Grid>
  );
};

export default FriendsList;
