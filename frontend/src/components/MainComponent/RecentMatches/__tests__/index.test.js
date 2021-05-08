import { render, screen } from "@testing-library/react";
import React from "react";
import RecentMatches from "../index";

const emptyRecentMatches = [];

const twoRecentMatches = [
  {
    matchId: 440447835,
    gameMode: "Ranked Solo",
    gameCreation: 1620196366053,
    gameDuration: 1350,
    mapId: 11,
    championName: "Hecarim",
    championImage: "Hecarim.png",
    spell1: `SummonerBarrier.png`,
    spell2: `SummonerFlash.png`,
    win: false,
    item0: 6632,
    item1: 2031,
    item2: 3047,
    item3: 3110,
    item4: 1028,
    item5: 0,
    item6: 3364,
    kills: 2,
    deaths: 0,
    assists: 3,
    largestMultiKill: 1,
    visionScore: 21,
    neutralMinionsKilled: 161,
    totalMinionsKilled: 13,
    champLevel: 14,
    primaryRuneImage: "perk-images/Styles/Precision/Conqueror/Conqueror.png",
    secondaryRuneImage: "perk-images/Styles/7202_Sorcery.png",
    participants: [
      {
        _id: "60937d625e3ed3539c681ace",
        summonername: "1sttoplaner",
        championName: "Malzahar",
        championImage: "Malzahar.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681acf",
        summonername: "effectiveduck",
        championName: "Jinx",
        championImage: "Jinx.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad0",
        summonername: "Only Once",
        championName: "Hecarim",
        championImage: "Hecarim.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad1",
        summonername: "Bryce a Walker",
        championName: "Riven",
        championImage: "Riven.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad2",
        summonername: "Nuclear Fallout",
        championName: "Lulu",
        championImage: "Lulu.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad3",
        summonername: "AU Dogs",
        championName: "Vladimir",
        championImage: "Vladimir.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad4",
        summonername: "AU Maggots",
        championName: "Kai'Sa",
        championImage: "Kaisa.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad5",
        summonername: "Clarijean",
        championName: "Ornn",
        championImage: "Ornn.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad6",
        summonername: "It came to this",
        championName: "Master Yi",
        championImage: "MasterYi.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad7",
        summonername: "palAnabelle",
        championName: "Blitzcrank",
        championImage: "Blitzcrank.png",
        teamId: 200,
      },
    ],
  },
  {
    matchId: 440447836,
    gameMode: "Ranked Solo",
    gameCreation: 1620130000000,
    gameDuration: 1350,
    mapId: 11,
    championName: "Hecarim",
    championImage: "Hecarim.png",
    spell1: `SummonerBarrier.png`,
    spell2: `SummonerFlash.png`,
    win: true,
    item0: 6632,
    item1: 2031,
    item2: 3047,
    item3: 3110,
    item4: 1028,
    item5: 0,
    item6: 3364,
    kills: 2,
    deaths: 0,
    assists: 3,
    largestMultiKill: 3,
    visionScore: 21,
    neutralMinionsKilled: 161,
    totalMinionsKilled: 13,
    champLevel: 14,
    primaryRuneImage: "perk-images/Styles/Precision/Conqueror/Conqueror.png",
    secondaryRuneImage: "perk-images/Styles/7202_Sorcery.png",
    participants: [
      {
        _id: "60937d625e3ed3539c681ace",
        summonername: "1sttoplaner",
        championName: "Malzahar",
        championImage: "Malzahar.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681acf",
        summonername: "effectiveduck",
        championName: "Jinx",
        championImage: "Jinx.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad0",
        summonername: "Only Once",
        championName: "Hecarim",
        championImage: "Hecarim.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad1",
        summonername: "Bryce a Walker",
        championName: "Riven",
        championImage: "Riven.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad2",
        summonername: "Nuclear Fallout",
        championName: "Lulu",
        championImage: "Lulu.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad3",
        summonername: "AU Dogs",
        championName: "Vladimir",
        championImage: "Vladimir.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad4",
        summonername: "AU Maggots",
        championName: "Kai'Sa",
        championImage: "Kaisa.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad5",
        summonername: "Clarijean",
        championName: "Ornn",
        championImage: "Ornn.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad6",
        summonername: "It came to this",
        championName: "Master Yi",
        championImage: "MasterYi.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad7",
        summonername: "palAnabelle",
        championName: "Blitzcrank",
        championImage: "Blitzcrank.png",
        teamId: 200,
      },
    ],
  },
];

// this recent match has a game duration of '22:04'. We want to test if the 'ss' formatting works and doesn't display '22:4'
const recentMatch = [
  {
    matchId: 440447835,
    gameMode: "Ranked Solo",
    gameCreation: 1620196366053,
    gameDuration: 1324,
    mapId: 11,
    championName: "Hecarim",
    championImage: "Hecarim.png",
    spell1: `SummonerBarrier.png`,
    spell2: `SummonerFlash.png`,
    win: false,
    item0: 6632,
    item1: 2031,
    item2: 3047,
    item3: 3110,
    item4: 1028,
    item5: 0,
    item6: 3364,
    kills: 2,
    deaths: 0,
    assists: 3,
    largestMultiKill: 1,
    visionScore: 21,
    neutralMinionsKilled: 161,
    totalMinionsKilled: 13,
    champLevel: 14,
    primaryRuneImage: "perk-images/Styles/Precision/Conqueror/Conqueror.png",
    secondaryRuneImage: "perk-images/Styles/7202_Sorcery.png",
    participants: [
      {
        _id: "60937d625e3ed3539c681ace",
        summonername: "1sttoplaner",
        championName: "Malzahar",
        championImage: "Malzahar.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681acf",
        summonername: "effectiveduck",
        championName: "Jinx",
        championImage: "Jinx.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad0",
        summonername: "Only Once",
        championName: "Hecarim",
        championImage: "Hecarim.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad1",
        summonername: "Bryce a Walker",
        championName: "Riven",
        championImage: "Riven.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad2",
        summonername: "Nuclear Fallout",
        championName: "Lulu",
        championImage: "Lulu.png",
        teamId: 100,
      },
      {
        _id: "60937d625e3ed3539c681ad3",
        summonername: "AU Dogs",
        championName: "Vladimir",
        championImage: "Vladimir.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad4",
        summonername: "AU Maggots",
        championName: "Kai'Sa",
        championImage: "Kaisa.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad5",
        summonername: "Clarijean",
        championName: "Ornn",
        championImage: "Ornn.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad6",
        summonername: "It came to this",
        championName: "Master Yi",
        championImage: "MasterYi.png",
        teamId: 200,
      },
      {
        _id: "60937d625e3ed3539c681ad7",
        summonername: "palAnabelle",
        championName: "Blitzcrank",
        championImage: "Blitzcrank.png",
        teamId: 200,
      },
    ],
  },
];

it("expect default to appear when there are no recent matches", () => {
  render(<RecentMatches recentMatches={emptyRecentMatches} />);

  expect(screen.getByText("No data found!")).toBeInTheDocument();

  // expect the filter button to be there
  expect(screen.getByText("Filter By")).toBeInTheDocument();
});

it("expect correct components to appear with recent matches", () => {
  render(<RecentMatches recentMatches={twoRecentMatches} />);
  expect(screen.queryByText("No data found!")).toBeNull();

  // expect the filter button to be there
  expect(screen.getByText("Filter By")).toBeInTheDocument();

  // expect two matches
  expect(screen.getAllByText("Ranked Solo")).toHaveLength(2);

  // the test data has two matches with duplicated participants
  const { participants } = twoRecentMatches[0];
  participants.forEach((participant) => {
    expect(screen.getAllByText(participant.summonername)).toHaveLength(2);
  });

  // expect 1 win and 1 loss
  expect(screen.getByText("WIN")).toBeInTheDocument();
  expect(screen.getByText("LOSS")).toBeInTheDocument();

  // the largestMultiKill is 3 in the second match, should show Triple Kill
  expect(screen.getByText("Triple Kill")).toBeInTheDocument();
});

it("displays gametime in mm:ss format", () => {
  render(<RecentMatches recentMatches={recentMatch} />);

  // expect the time to be displayed correctly
  expect(screen.getByText("22:04")).toBeInTheDocument();
});
