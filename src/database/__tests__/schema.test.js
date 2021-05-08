import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { connectToLocalDatabase } from "../db-connect";
import { User, Match } from "../schema";

let mongodb;

const validUserWithAllFields = {
  username: "Plasmatops",
  sub: "test|0",
  summonerName: "Plasmatops",
  summonerId: "myid111",
  accountId: "UUUUU",
  region: "OCE",
  friends: [{ username: "mAGO32Lu1", summonerName: "mAGO32Lu1" }],
};

const validMatchWithAllFields = {
  sub: "test|0",
  matchId: 440447835,
  gameMode: "Ranked Solo",
  gameCreation: 1620196366053,
  gameDuration: 1350,
  mapId: 11,
  championName: "Sion",
  championImage: "Sion.png",
  spell1Image: "SummonerHaste.png",
  spell2Image: "SummonerSmite.png",
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
  largestMultiKill: 1,
  totalDamageDealt: 153734,
  totalDamageDealtToChampions: 4192,
  visionScore: 21,
  goldEarned: 9290,
  goldSpent: 7875,
  neutralMinionsKilled: 161,
  totalMinionsKilled: 13,
  champLevel: 14,
  firstBloodKill: 0,
  primaryRuneImage: "perk-images/Styles/Precision/Conqueror/Conqueror.png",
  secondaryRuneImage: "perk-images/Styles/7202_Sorcery.png",
  participants: [
    {
      summonername: "1sttoplaner",
      championName: "Malzahar",
      championImage: "Malzahar.png",
      teamId: 100,
    },
    {
      summonername: "effectiveduck",
      championName: "Jinx",
      championImage: "Jinx.png",
      teamId: 100,
    },
    {
      summonername: "Only Once",
      championName: "Hecarim",
      championImage: "Hecarim.png",
      teamId: 100,
    },
    {
      summonername: "Bryce a Walker",
      championName: "Riven",
      championImage: "Riven.png",
      teamId: 100,
    },
    {
      summonername: "Nuclear Fallout",
      championName: "Lulu",
      championImage: "Lulu.png",
      teamId: 100,
    },
    {
      summonername: "AU Dogs",
      championName: "Vladimir",
      championImage: "Vladimir.png",
      teamId: 200,
    },
    {
      summonername: "AU Maggots",
      championName: "Kai'Sa",
      championImage: "Kaisa.png",
      teamId: 200,
    },
    {
      summonername: "Clarijean",
      championName: "Ornn",
      championImage: "Ornn.png",
      teamId: 200,
    },
    {
      summonername: "It came to this",
      championName: "Master Yi",
      championImage: "MasterYi.png",
      teamId: 200,
    },
    {
      summonername: "palAnabelle",
      championName: "Blitzcrank",
      championImage: "Blitzcrank.png",
      teamId: 200,
    },
  ],
};

// Start database and server before any tests run
beforeAll(async () => {
  mongodb = new MongoMemoryServer();

  await mongodb.getUri().then((cs) => connectToLocalDatabase(cs));
});

// Clear database after each test
afterEach(async () => {
  await User.deleteMany({});
  await Match.deleteMany({});
});

// Stop db and server before we finish
afterAll(async () => {
  await mongoose.disconnect();
  await mongodb.stop();
});

it("valid user with all fields", async () => {
  const user = new User(validUserWithAllFields);
  await user.save();

  const {
    username,
    sub,
    summonerName,
    summonerId,
    accountId,
    region,
    friends,
  } = validUserWithAllFields;

  // eslint-disable-next-line no-underscore-dangle
  expect(user._id).toBeDefined();
  expect(user.username).toBe(username);
  expect(user.sub).toBe(sub);
  expect(user.summonerName).toBe(summonerName);
  expect(user.summonerId).toBe(summonerId);
  expect(user.accountId).toBe(accountId);
  expect(user.region).toBe(region);
  expect(user.friends).toHaveLength(1);
  expect(user.friends[0].username).toBe(friends[0].username);
  expect(user.friends[0].summonerName).toBe(friends[0].summonerName);
});

it("valid match with all fields", async () => {
  const match = new Match(validMatchWithAllFields);
  await match.save();

  const {
    sub,
    matchId,
    gameMode,
    gameCreation,
    gameDuration,
    mapId,
    championName,
    championImage,
    spell1Image,
    spell2Image,
    win,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    kills,
    deaths,
    assists,
    largestMultiKill,
    totalDamageDealt,
    totalDamageDealtToChampions,
    visionScore,
    goldEarned,
    goldSpent,
    neutralMinionsKilled,
    totalMinionsKilled,
    champLevel,
    firstBloodKill,
    primaryRuneImage,
    secondaryRuneImage,
  } = validMatchWithAllFields;

  // eslint-disable-next-line no-underscore-dangle
  expect(match._id).toBeDefined();
  expect(match.sub).toBe(sub);
  expect(match.matchId).toBe(matchId);
  expect(match.gameMode).toBe(gameMode);
  expect(match.gameCreation).toBe(gameCreation);
  expect(match.gameDuration).toBe(gameDuration);
  expect(match.mapId).toBe(mapId);
  expect(match.championName).toBe(championName);
  expect(match.championImage).toBe(championImage);
  expect(match.spell1Image).toBe(spell1Image);
  expect(match.spell2Image).toBe(spell2Image);
  expect(match.win).toBe(win);
  expect(match.item0).toBe(item0);
  expect(match.item1).toBe(item1);
  expect(match.item2).toBe(item2);
  expect(match.item3).toBe(item3);
  expect(match.item4).toBe(item4);
  expect(match.item5).toBe(item5);
  expect(match.item6).toBe(item6);
  expect(match.kills).toBe(kills);
  expect(match.deaths).toBe(deaths);
  expect(match.assists).toBe(assists);
  expect(match.largestMultiKill).toBe(largestMultiKill);
  expect(match.totalDamageDealt).toBe(totalDamageDealt);
  expect(match.totalDamageDealtToChampions).toBe(totalDamageDealtToChampions);
  expect(match.visionScore).toBe(visionScore);
  expect(match.goldEarned).toBe(goldEarned);
  expect(match.goldSpent).toBe(goldSpent);
  expect(match.neutralMinionsKilled).toBe(neutralMinionsKilled);
  expect(match.totalMinionsKilled).toBe(totalMinionsKilled);
  expect(match.champLevel).toBe(champLevel);
  expect(match.firstBloodKill).toBe(firstBloodKill);
  expect(match.primaryRuneImage).toBe(primaryRuneImage);
  expect(match.secondaryRuneImage).toBe(secondaryRuneImage);
  expect(match.participants).toHaveLength(10);
});
