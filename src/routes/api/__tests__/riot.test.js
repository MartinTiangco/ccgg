import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { connectToLocalDatabase } from "../../../database/db-connect";
import routes from "../riot";
import { User, Match } from "../../../database/schema";
import getToken from "./jwtMock";
import checkJwt from "../../../auth/server";
import {
  createMatches,
  createDiffDayMatches,
  createChampMatches,
} from "./dummy-data/create-match-data";

dotenv.config();

let mongodb;
let app;
let server;
const port = 3002;

// Dummy user
const user1 = {
  username: "Plasmatops",
  sub: "test|0",
  summonerId: "12345",
  accountId: "54321",
  summonerName: "Plasmatops",
  region: "OCE",
  friends: [{ username: "mAGO32Lu1", summonerName: "mAGO32Lu1" }],
};

const token = getToken(user1);

// Start database and server before any tests run
// eslint-disable-next-line jest/no-done-callback
beforeAll(async (done) => {
  mongodb = new MongoMemoryServer();

  await mongodb.getUri().then((cs) => connectToLocalDatabase(cs));

  app = express();
  app.use(express.json());
  app.use("/api/riot", routes);
  app.use(checkJwt);

  server = app.listen(port, () => done());
});

// Populate database with dummy data before each test
beforeEach(async () => {
  await User.create(user1);
});

// Clear database after each test
afterEach(async () => {
  await User.deleteMany({});
  await Match.deleteMany({});
});

// Stop db and server before we finish
// eslint-disable-next-line jest/no-done-callback
afterAll(async (done) => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
    done();
  });
});

const makeRequest = async ({ method, url, data, headers }) =>
  axios({ method, url, data, headers });

describe("GET /refreshMatches endpoint", () => {
  it("throws 401 if unauthorized", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/refreshMatches",
      data: {},
      headers: {
        Authorization: "Bearer ",
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(401);
    });
  });
});

describe("GET /summonerInfo endpoint", () => {
  it("throws 401 if unauthorized", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/summonerInfo",
      data: {},
      headers: {
        Authorization: "Bearer ",
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(401);
    });
  });
});

describe("GET /rankedSummonerStats endpoint", () => {
  it("throws 401 if unauthorized", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/rankedSummonerStats",
      data: {},
      headers: {
        Authorization: "Bearer ",
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(401);
    });
  });
});

describe("GET /match endpoint", () => {
  it("throws 401 if unauthorized", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/match",
      data: {},
      headers: {
        Authorization: "Bearer ",
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(401);
    });
  });

  it("throws 404 if no matches are in the DB", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/match",
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(404);
    });
  });

  it("retrieves 20 matches when more than 20 in DB", async () => {
    const fiftyMatches = createMatches(50, user1.sub);
    await Match.insertMany(fiftyMatches);
    const response = await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/match",
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, status } = response;

    // get the 20 (pre-sorted by latest) that should be returned
    const twentyMatches = fiftyMatches.slice(0, 20);
    twentyMatches.forEach((m) => {
      // eslint-disable-next-line no-param-reassign
      delete m.sub;
    });

    expect(status).toBe(200);
    expect(data).toHaveLength(20);
    expect(data).toStrictEqual(twentyMatches);
  });

  it("retrieves all matches when less than 20 in DB", async () => {
    const seventeenMatches = createMatches(17, user1.sub);
    await Match.insertMany(seventeenMatches);
    const response = await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/match",
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, status } = response;

    seventeenMatches.forEach((m) => {
      // eslint-disable-next-line no-param-reassign
      delete m.sub;
    });

    expect(status).toBe(200);
    expect(data).toHaveLength(17);
    expect(data).toStrictEqual(seventeenMatches);
  });
});

describe("GET /matchSummary endpoint", () => {
  it("throws 401 if unauthorized", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/matchSummary",
      data: {},
      headers: {
        Authorization: "Bearer ",
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(401);
    });
  });

  it("throws 404 if no matches are in the DB", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/matchSummary",
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(404);
    });
  });

  it("retrieves all matches for latest 10 days", async () => {
    const elevenDayMatches = createDiffDayMatches(11, user1.sub);
    await Match.insertMany(elevenDayMatches);
    const response = await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/matchSummary",
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, status } = response;
    const onlyTenDayMatches = elevenDayMatches.slice(0, 10);
    const matchOutput = [];

    onlyTenDayMatches.forEach((m) => {
      // eslint-disable-next-line
      delete m.sub;
      const matchDate = new Date(m.gameCreation);
      matchOutput.push({
        gameDate: matchDate.toLocaleDateString("en-NZ"),
        matches: [m],
      });
    });

    expect(status).toBe(200);
    expect(data).toHaveLength(10);
    expect(data).toStrictEqual(matchOutput);
  });

  it("retrieves all matches for latest days when DB has less than 10 days worth", async () => {
    const sixDayMatches = createDiffDayMatches(6, user1.sub);
    await Match.insertMany(sixDayMatches);
    const response = await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/matchSummary",
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, status } = response;
    const matchOutput = [];

    sixDayMatches.forEach((m) => {
      // eslint-disable-next-line no-param-reassign
      delete m.sub;
      const matchDate = new Date(m.gameCreation);
      matchOutput.push({
        gameDate: matchDate.toLocaleDateString("en-NZ"),
        matches: [m],
      });
    });

    expect(status).toBe(200);
    expect(data).toHaveLength(6);
    expect(data).toStrictEqual(matchOutput);
  });
});

describe("GET /recentChampions endpoint", () => {
  it("throws 401 if unauthorized", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/recentChampions",
      data: {},
      headers: {
        Authorization: "Bearer ",
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(401);
    });
  });

  it("return empty arrays if no matches are in the DB", async () => {
    const response = await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/recentChampions",
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, status } = response;

    const expectedArray = [
      { type: "ranked", champions: [] },
      { type: "normal", champions: [] },
      { type: "others", champions: [] },
    ];

    expect(status).toBe(200);
    expect(data).toHaveLength(3);
    expect(data).toStrictEqual(expectedArray);
  });

  it("retrieve champions by their queue types/game mode", async () => {
    const champMatches = createChampMatches(11, user1.sub);
    await Match.insertMany(champMatches);
    const response = await makeRequest({
      method: "get",
      url: "http://localhost:3002/api/riot/recentChampions",
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data, status } = response;

    // Prepare expected output
    const expectedOutput = [
      { type: "ranked", champions: [] },
      { type: "normal", champions: [] },
      { type: "others", champions: [] },
    ];
    for (let index = 0; index < champMatches; index += 1) {
      const champData = {
        championName: champMatches[index].championName,
        championImage: "Hecarim.png",
        totalMatches: 1,
        avgKills: 1,
        avgDeaths: 1,
        avgAssists: 1,
        avgCS: 300,
        winPercent: 100,
      };
      if (index < 2) {
        expectedOutput[0].champions.push(champData);
      } else if (index === 2) {
        expectedOutput[1].champions.push(champData);
      } else {
        expectedOutput[2].champions.push(champData);
      }
    }

    expect(status).toBe(200);
    expect(data).toHaveLength(3);
    expect(data).toStrictEqual(expectedOutput);
  });
});
