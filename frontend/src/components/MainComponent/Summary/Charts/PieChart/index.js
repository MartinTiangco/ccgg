import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chart,
  PieSeries,
  Legend,
  Title,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import {
  EventTracker,
  Animation,
  HoverState,
  Palette,
} from "@devexpress/dx-react-chart";

const useStyles = makeStyles(() => ({
  item: {
    flexDirection: "row",
  },
  label: {
    textAlign: "left",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: "rgba(255, 255, 255, 0.7)",
  },
  root: {
    margin: "auto",
  },
  text: {
    fontSize: "1.2rem",
    color: "rgba(255, 255, 255, 0.7)",
  },
}));

const Item = ({ ...restProps }) => {
  const classes = useStyles();
  return <Legend.Item {...restProps} className={classes.item} />;
};

const Label = ({ ...restProps }) => {
  const classes = useStyles();
  return <Legend.Label {...restProps} className={classes.label} />;
};

const Root = ({ ...restProps }) => {
  const classes = useStyles();
  return <Legend.Root {...restProps} className={classes.root} />;
};

const Text = ({ ...restProps }) => {
  const classes = useStyles();
  return <Title.Text {...restProps} className={classes.text} />;
};

const scheme = ["rgba(50, 113, 250, 0.7)", "rgba(255, 78, 81, 0.7)"];

const PieChart = (prop) => {
  const { data, winrate } = prop;
  return (
    <Chart data={data}>
      <Title text={`${winrate}% Win Rate`} textComponent={Text} />
      <Palette scheme={scheme} />
      <PieSeries
        name={`${winrate}% Win Ratios`}
        valueField="area"
        argumentField="result"
        innerRadius={0.5}
        outerRadius={0.8}
      />
      <Legend
        itemComponent={Item}
        labelComponent={Label}
        rootComponent={Root}
        position="bottom"
      />
      <Animation />
      <EventTracker />
      <HoverState />
      <Tooltip />
    </Chart>
  );
};

export default PieChart;
