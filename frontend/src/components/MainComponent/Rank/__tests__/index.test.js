import renderer from "react-test-renderer";
import React from "react";
import Rank from "../index";

const testDataUnranked = undefined;
const testData = [
  {
    queueType: "RANKED_SOLO_5x5",
    tier: "GOLD",
    rank: "I",
    summonerId: "EXXJEL_O4q_DiFvzHjjjw7NFi957AvQkb14Nzf7rBq-Ung",
    summonerName: "AU Dogs",
    leaguePoints: 15,
    wins: 205,
    losses: 218,
    veteran: false,
    inactive: false,
    freshBlood: false,
    hotStreak: false,
  },
  {
    queueType: "RANKED_FLEX_SR",
    tier: "SILVER",
    rank: "I",
    summonerId: "EXXJEL_O4q_DiFvzHjjjw7NFi957AvQkb14Nzf7rBq-Ung",
    summonerName: "AU Dogs",
    leaguePoints: 77,
    wins: 193,
    losses: 204,
    veteran: false,
    inactive: false,
    freshBlood: true,
    hotStreak: true,
  },
];

it("with no ranked info", () => {
  const tree = renderer.create(<Rank rank={testDataUnranked} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("with ranked solo info", () => {
  const tree = renderer.create(<Rank rank={testData} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("with ranked flex info", () => {
  const tree = renderer.create(<Rank rank={testData} isFlex />).toJSON();
  expect(tree).toMatchSnapshot();
});
