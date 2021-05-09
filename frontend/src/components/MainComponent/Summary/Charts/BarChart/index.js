import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Title,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Stack,
  EventTracker,
  Animation,
  HoverState,
  Palette,
} from "@devexpress/dx-react-chart";

const useStyles = makeStyles(() => ({
  text: {
    fontSize: "1.2rem",
    color: "rgba(255, 255, 255, 0.7)",
  },
}));

const Text = ({ ...restProps }) => {
  const classes = useStyles();
  return <Title.Text {...restProps} className={classes.text} />;
};
const title = `Recent Wins & Losses`;
const scheme = ["rgba(50, 113, 250, 0.7)", "rgba(255, 78, 81, 0.7)"];

const BarChart = (prop) => {
  const { data } = prop;
  return (
    <Chart data={data}>
      <Title text={title} textComponent={Text} />
      <ArgumentAxis />
      <ValueAxis tickSize={1} showTicks />
      <Palette scheme={scheme} />
      <BarSeries
        name="wins"
        valueField="wins"
        key="wins"
        argumentField="date"
      />
      <BarSeries
        name="losses"
        valueField="losses"
        key="wins"
        argumentField="date"
      />
      <Stack stacks={[{ series: ["losses", "wins"] }]} />
      <Animation />
      <EventTracker />
      <HoverState />
      <Tooltip />
    </Chart>
  );
};

export default BarChart;
