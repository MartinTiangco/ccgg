import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";

import { connectToLocalDatabase } from "../../../database/db-connect";
import routes from "../friends";
import User from "../../../database/schema";

let mongodb;
let app;
let server;
const port = 3000;

// Dummy data
const user1 = {
  username: "Plasmatops",
  sub: "test|0",
  password: "123ABCabc",
  riotID: "Plasmatops",
  region: "OCE",
  friends: [{ username: "mAGO32Lu1", riotID: "mAGO32Lu1" }],
};
const user2 = {
  username: "mAGO32Lu1",
  sub: "test|1",
  password: "123ABCabc",
  riotID: "mAGO32Lu1",
  region: "OCE",
  friends: [],
};
const dummyUsers = [user1, user2];

// Start database and server before any tests run
beforeAll(async () => {
  mongodb = new MongoMemoryServer();

  await mongodb.getUri().then((cs) => connectToLocalDatabase(cs));

  app = express();
  app.use(express.json());
  app.use("/api/friends", routes);

  server = app.listen(port);
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
afterAll(async () => {
  server.close(async () => {
    await mongoose.disconnect();
    await mongodb.stop();
  });
});

const makeRequest = async ({ method, url, data }) =>
  axios({ method, url, data });

describe("GET endpoint", () => {
  it("retrieves a list of friends", async () => {
    const response = await makeRequest({
      method: "get",
      url: "http://localhost:3000/api/friends",
      data: { sub: "test|0" }, // TODO: delete 'sub' after implementing auth
    });

    const { data, status } = response;

    const user1Friend = { username: "mAGO32Lu1", riotID: "mAGO32Lu1" };

    expect(status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].username).toBe(user1Friend.username);
    expect(data[0].riotID).toBe(user1Friend.riotID);
  });

  it("retrieves an empty list of friends", async () => {
    const response = await makeRequest({
      method: "get",
      url: "http://localhost:3000/api/friends",
      data: { sub: "test|1" }, // TODO: delete 'sub' after implementing auth
    });

    const { data, status } = response;

    expect(status).toBe(200);
    expect(data).toHaveLength(0);
  });

  it("throws 404 if user is not found", async () => {
    await makeRequest({
      method: "get",
      url: "http://localhost:3000/api/friends",
      data: { sub: "test|2" }, // TODO: delete 'sub' after implementing auth
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
      url: "http://localhost:3000/api/friends",
      data: { sub: "test|1", username: user1.username, riotID: user1.riotID }, // TODO: delete 'sub' after implementing auth
    });

    const { status } = response;

    expect(status).toBe(204);

    // check updated friends list
    const dbUser = await User.findOne({ sub: "test|1" });
    expect(dbUser.friends).toHaveLength(1);
    expect(dbUser.friends[0].username).toBe(user1.username);
    expect(dbUser.friends[0].riotID).toBe(user1.riotID);
  });

  it("throws 404 if user is not found", async () => {
    await makeRequest({
      method: "put",
      url: "http://localhost:3000/api/friends",
      data: { sub: "test|2" }, // TODO: delete 'sub' after implementing auth
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
      url: "http://localhost:3000/api/friends",
      data: { sub: "test|0", username: user2.username, riotID: user2.riotID }, // TODO: delete 'sub' after implementing auth
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(400);
    });

    // check that the friends list didn't update
    const dbUser = await User.findOne({ sub: "test|0" });
    expect(dbUser.friends).toHaveLength(1);
  });
});

describe("DELETE endpoint", () => {
  it("deletes a friend", async () => {
    const response = await makeRequest({
      method: "delete",
      url: "http://localhost:3000/api/friends",
      data: { sub: "test|0", username: user2.username, riotID: user2.riotID }, // TODO: delete 'sub' after implementing auth
    });

    const { status } = response;

    expect(status).toBe(204);

    // check updated friends list
    const dbUser = await User.findOne({ sub: "test|0" });
    expect(dbUser.friends).toHaveLength(0);
  });

  it("deletes a friend that is not in the user's friend list", async () => {
    const response = await makeRequest({
      method: "delete",
      url: "http://localhost:3000/api/friends",
      data: { sub: "test|0", username: "non-existent", riotID: "non-existent" }, // TODO: delete 'sub' after implementing auth
    });

    const { status } = response;

    expect(status).toBe(204);

    // friends list should not be edited
    const dbUser = await User.findOne({ sub: "test|0" });
    expect(dbUser.friends).toHaveLength(1);
  });

  it("throws 404 if user is not found", async () => {
    await makeRequest({
      method: "delete",
      url: "http://localhost:3000/api/friends",
      data: { sub: "test|2" }, // TODO: delete 'sub' after implementing auth
    }).catch((err) => {
      const {
        response: { status },
      } = err;
      expect(status).toBe(404);
    });
  });
});
