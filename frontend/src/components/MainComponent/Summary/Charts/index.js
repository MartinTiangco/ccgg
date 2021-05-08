import React from "react";
import { Grid } from "@material-ui/core";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const Charts = (prop) => {
  const { matches } = prop;

  const wins = matches.filter((match) => {
    return match.win === true;
  }).length;
  const losses = matches.filter((match) => {
    return match.win === false;
  }).length;

  const data = {};

  matches.forEach((match) => {
    const { gameCreation, win } = match;
    const timestamp = new Date(gameCreation);
    const date = timestamp.toLocaleDateString().substring(0, 5);

    if (win) {
      if (data[date] == null) {
        data[date] = {
          win: 1,
          loss: 0,
        };
      } else {
        data[date].win += 1;
      }
    } else if (data[date] == null) {
      data[date] = {
        win: 0,
        loss: 1,
      };
    } else {
      data[date].loss += 1;
    }
  });

  const barData = Object.entries(data).map((e) => {
    return {
      date: e[0],
      wins: e[1].win,
      losses: e[1].loss,
    };
  });

  const winrate = Math.round((wins / (wins + losses)) * 100);
  const pieData = [
    { result: `Wins - ${wins}`, area: wins },
    { result: `Loses - ${losses}`, area: losses },
  ];

  return (
    <Grid item container direction="row" style={{ padding: "5px" }}>
      <Grid item xs={4}>
        <PieChart data={pieData} winrate={winrate} />
      </Grid>
      <Grid item xs={8}>
        <BarChart data={barData} />
      </Grid>
    </Grid>
  );
};

export default Charts;
