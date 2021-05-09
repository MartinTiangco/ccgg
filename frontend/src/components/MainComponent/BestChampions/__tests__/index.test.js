import renderer from "react-test-renderer";
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BestChampions from "../index";

const testData = [
  {
    type: "ranked",
    champions: [
      {
        champion: "Ekko",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
      {
        champion: "Syndra",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
      {
        champion: "Renekton",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
      {
        champion: "Annie",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
      {
        champion: "Xerath",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
      {
        champion: "Orianna",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
      {
        champion: "Galio",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
      {
        champion: "Garen",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
      {
        champion: "Viktor", // this champ shouldn't be shown because there are already max number of champions shown
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
    ],
  },
  {
    type: "normal",
    champions: [
      {
        champion: "Lucian",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
      {
        champion: "MonkeyKing",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
    ],
  },
  {
    type: "others",
    champions: [],
  },
];

const testDataWithWukong = [
  {
    type: "ranked",
    champions: [
      {
        champion: "MonkeyKing",
        csTotal: 178.6,
        kills: 7,
        deaths: 3,
        assists: 17,
        wr: 58,
        games: 137,
      },
    ],
  },
  {
    type: "normal",
    champions: [],
  },
  {
    type: "others",
    champions: [],
  },
];

const testDataEmpty = [
  {
    type: "ranked",
    champions: [],
  },
  {
    type: "normal",
    champions: [],
  },
  {
    type: "others",
    champions: [],
  },
];

it("snapshot", () => {
  const tree = renderer
    .create(<BestChampions championStats={testData} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("MonkeyKing should be rendered to Wukong", () => {
  render(<BestChampions championStats={testDataWithWukong} />);

  expect(screen.getByText("Wukong")).toBeInTheDocument();
  expect(screen.queryByText("MonkeyKing")).toBeNull();
});

it("renders correctly if no champions are found", () => {
  render(<BestChampions championStats={testDataEmpty} />);

  expect(screen.getByText("No data found!")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Normal"));
  expect(screen.getByText("No data found!")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Other"));
  expect(screen.getByText("No data found!")).toBeInTheDocument();
});
