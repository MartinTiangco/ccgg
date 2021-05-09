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
        championName: "Ekko",
        championImage: "Ekko.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
      },
      {
        championName: "Syndra",
        championImage: "Syndra.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
      },
      {
        championName: "Renekton",
        championImage: "Renekton.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
      },
      {
        championName: "Annie",
        championImage: "Annie.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
      },
      {
        championName: "Xerath",
        championImage: "Xerath.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
      },
      {
        championName: "Orianna",
        championImage: "Orianna.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
      },
      {
        championName: "Galio",
        championImage: "Galio.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
      },
      {
        championName: "Garen",
        championImage: "Garen.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
      },
      {
        championName: "Viktor", // this champ shouldn't be shown because there are already max number of champions shown
        championImage: "Viktor.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
      },
    ],
  },
  {
    type: "normal",
    champions: [
      {
        championName: "Lucian",
        championImage: "Lucian.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
      },
      {
        championName: "MonkeyKing",
        championImage: "MonkeyKing.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
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
        championName: "MonkeyKing",
        championImage: "MonkeyKing.png",
        avgCS: 178.6,
        avgKills: 7,
        avgDeaths: 3,
        avgAssists: 17,
        winPercent: 58,
        totalMatches: 137,
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
    .create(<BestChampions bestChampions={testData} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("MonkeyKing should be rendered to Wukong", () => {
  render(<BestChampions bestChampions={testDataWithWukong} />);

  expect(screen.getByText("Wukong")).toBeInTheDocument();
  expect(screen.queryByText("MonkeyKing")).toBeNull();
});

it("renders correctly if no champions are found", () => {
  render(<BestChampions bestChampions={testDataEmpty} />);

  expect(screen.getByText("No data found!")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Normal"));
  expect(screen.getByText("No data found!")).toBeInTheDocument();
  fireEvent.click(screen.getByText("Other"));
  expect(screen.getByText("No data found!")).toBeInTheDocument();
});
