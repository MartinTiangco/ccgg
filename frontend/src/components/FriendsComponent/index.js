import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid, Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { store } from "react-notifications-component";
import io from "socket.io-client";
import FriendsList from "./FriendsList.js";
import PingPopupContent from "../PingPopup/PingPopupContent";

// remove this/change this once integrated with backend
const testFriends = [
  { username: "testMAGO32Lu1", summonerName: "testMAGO32Lu1" },
  { username: "mAGO32Lu1", summonerName: "mAGO32Lu1" },
  { username: "bob3", summonerName: "bob4" },
  { username: "bobbobobobobobobobobobob", summonerName: "bob111111" },
  { username: "bob", summonerName: "bob2" },
  { username: "bob3ef", summonerName: "bob4" },
  { username: "bobboefboboboboboobobob", summonerName: "bob111111" },
  { username: "bobef1", summonerName: "bob2" },
  { username: "bo", summonerName: "bob4" },
  { username: "bobboboboboboefbobobobobob", summonerName: "bob111111" },
  { username: "befob1", summonerName: "bob2" },
  { username: "bob3effe", summonerName: "bob4" },
  { username: "bobboboboboboefbobobob", summonerName: "bob111111" },
  { username: "bob1fe", summonerName: "bob2" },
  { username: "boefeb3", summonerName: "bob4" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    margin: "20px",
    overflow: "hidden",
  },
  innerGrid: {
    margin: "0 auto",
  },
  paper: {
    padding: theme.spacing(8),
    color: theme.palette.text.secondary,
  },
  card: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const FriendsComponent = () => {
  const classes = useStyles();
  const { user, isLoading } = useAuth0();
  const [pingedBy, setPingedBy] = useState("");
  const socketRef = useRef();

  // If the auth0 context is still loading, return blank page
  if (isLoading) {
    return <div />;
  }

  const username = user["https://cc.gg/user_metadata"].summonerName;

  // Handler for pinging friends
  const pingByFriend = (pingedByName) => {
    store.addNotification({
      content: <PingPopupContent pingedBy={pingedByName} />,
      type: "default", // 'default', 'success', 'info', 'warning'
      container: "top-right", // where to position the notifications
      width: 500,
      animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
      animationOut: ["animate__animated animate__fadeOut"], // `animate.css v4` classes
      dismiss: {
        duration: 3000,
        pauseOnHover: true,
      },
    });
  };

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8000");
    socketRef.current?.emit("joinRoom", username);
    socketRef.current.on("ping", (name) => {
      pingByFriend(name);
      setPingedBy(name);
    });
    return () => socketRef.current.disconnect();
  }, [pingedBy]);

  const handlePingFriend = (to) => {
    socketRef.current?.emit("ping", { from: username, to });
  };

  return (
    <Grid container className={classes.root}>
      <Grid
        container
        item
        className={classes.innerGrid}
        direction="column"
        xs={10}
        sm={7}
        md={8}
        spacing={2}
      >
        <Grid
          container
          item
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography variant="h4">Friends List</Typography>
          <Typography variant="h4">
            Username: {user["https://cc.gg/user_metadata"].summonerName}
          </Typography>
        </Grid>
        <Grid item>
          <Card className={classes.card} raised>
            <FriendsList
              friends={testFriends}
              handlePingFriend={handlePingFriend}
            />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FriendsComponent;
