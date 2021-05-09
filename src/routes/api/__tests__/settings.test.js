import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { connectToLocalDatabase } from "../../../database/db-connect";
import routes from "../settings";
import { User } from "../../../database/schema";
// import getToken from "./jwtMock";
import checkJwt from "../../../auth/server";

dotenv.config();

let mongodb;
let app;
let server;
const port = 3003;

// Dummy data
const user1 = {
  username: "Plasmatops",
  sub: "test|0",
  summonerName: "Plasmatops",
  accountId: "12345",
  summonerId: "54321",
  region: "OCE",
  friends: [{ username: "mAGO32Lu1", summonerName: "mAGO32Lu1" }],
};

// const token1 = getToken(user1);

// Start database and server before any tests run
// eslint-disable-next-line jest/no-done-callback
beforeAll(async (done) => {
  mongodb = new MongoMemoryServer();

  await mongodb.getUri().then((cs) => connectToLocalDatabase(cs));

  app = express();
  app.use(express.json());
  app.use("/api/settings", routes);
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

describe("PUT /changeSummoner endpoint", () => {
  it("throws 401 if unauhorized", async () => {
    await makeRequest({
      method: "put",
      url: "http://localhost:3003/api/settings/changeSummoner",
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
