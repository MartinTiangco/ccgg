import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { connectToLocalDatabase } from "../../../database/db-connect";
import routes from "../friends";
import { User } from "../../../database/schema";
import getToken from "./jwtMock";
import checkJwt from "../../../auth/server";

dotenv.config();

let mongodb;
let app;
let server;
const port = 3001;

// Dummy data
const user1 = {
  username: "Plasmatops",
  sub: "test|0",
  summonerName: "Plasmatops",
  region: "OCE",
  friends: [{ username: "mAGO32Lu1", summonerName: "mAGO32Lu1" }],
};
const user2 = {
  username: "mAGO32Lu1",
  sub: "test|1",
  summonerName: "mAGO32Lu1",
  region: "OCE",
  friends: [],
};

const user3 = {
  username: "Willll",
  sub: "test|2",
};

const token1 = getToken(user1);
const token2 = getToken(user2);
const token3 = getToken(user3);

const dummyUsers = [user1, user2];

// Start database and server before any tests run
// eslint-disable-next-line jest/no-done-callback
beforeAll(async (done) => {
  mongodb = new MongoMemoryServer();

  await mongodb.getUri().then((cs) => connectToLocalDatabase(cs));

  app = express();
  app.use(express.json());
  app.use("/api/friends", routes);
  app.use(checkJwt);

  server = app.listen(port, () => done());
});

// Populate database with dummy data before each test
beforeEach(async () => {
  await User.insertMany(dummyUsers);
});

// Clear database after each test
afterEach(async () => {
  await User.deleteMany({});
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

describe("GET endpoint", () => {
  it("throws 401 if unauhorized", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3001/api/friends",
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

  it("retrieves a list of friends", async () => {
    const response = await makeRequest({
      method: "get",
      url: "http://localhost:3001/api/friends",
      data: {},
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    });

    const { data, status } = response;

    const user1Friend = { username: "mAGO32Lu1", summonerName: "mAGO32Lu1" };

    expect(status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].username).toBe(user1Friend.username);
    expect(data[0].summonerName).toBe(user1Friend.summonerName);
  });

  it("retrieves an empty list of friends", async () => {
    const response = await makeRequest({
      method: "get",
      url: "http://localhost:3001/api/friends",
      data: {},
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    });

    const { data, status } = response;

    expect(status).toBe(200);
    expect(data).toHaveLength(0);
  });

  it("throws 404 if user is not found", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3001/api/friends",
      data: {},
      headers: {
        Authorization: `Bearer ${token3}`,
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(404);
    });
  });
});

describe("PUT endpoint", () => {
  it("adds a new friend", async () => {
    const response = await makeRequest({
      method: "put",
      url: "http://localhost:3001/api/friends",
      data: { username: user1.username, summonerName: user1.summonerName },
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    });

    const { status } = response;

    expect(status).toBe(204);

    // check updated friends list
    const dbUser = await User.findOne({
      sub: user2.sub,
    });
    expect(dbUser.friends).toHaveLength(1);
    expect(dbUser.friends[0].username).toBe(user1.username);
    expect(dbUser.friends[0].summonerName).toBe(user1.summonerName);
  });

  it("throws 404 if user is not found", async () => {
    await makeRequest({
      method: "put",
      url: "http://localhost:3001/api/friends",
      data: {},
      headers: {
        Authorization: `Bearer ${token3}`,
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(404);
    });
  });

  it("throws 400 if trying to add an already existing friend", async () => {
    await makeRequest({
      method: "put",
      url: "http://localhost:3001/api/friends",
      data: { username: user2.username, summonerName: user2.summonerName },
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(400);
    });

    // check that the friends list didn't update
    const dbUser = await User.findOne({
      sub: user1.sub,
    });
    expect(dbUser.friends).toHaveLength(1);
  });
});

describe("DELETE endpoint", () => {
  it("deletes a friend", async () => {
    const response = await makeRequest({
      method: "delete",
      url: "http://localhost:3001/api/friends",
      data: { username: user2.username, summonerName: user2.summonerName },
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    });

    const { status } = response;

    expect(status).toBe(204);

    // check updated friends list
    const dbUser = await User.findOne({
      sub: user1.sub,
    });
    expect(dbUser.friends).toHaveLength(0);
  });

  it("deletes a friend that is not in the user's friend list", async () => {
    const response = await makeRequest({
      method: "delete",
      url: "http://localhost:3001/api/friends",
      data: { username: "non-existent", summonerName: "non-existent" },
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    });

    const { status } = response;

    expect(status).toBe(204);

    // friends list should not be edited
    const dbUser = await User.findOne({
      sub: user1.sub,
    });
    expect(dbUser.friends).toHaveLength(1);
  });

  it("throws 404 if user is not found", async () => {
    await makeRequest({
      method: "delete",
      url: "http://localhost:3001/api/friends",
      data: {},
      headers: {
        Authorization: `Bearer ${token3}`,
      },
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(404);
    });
  });
});
