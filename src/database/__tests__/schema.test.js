import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { connectToLocalDatabase } from "../db-connect";
import User from "../schema";

let mongodb;

const validUserWithAllFields = {
  username: "Plasmatops",
  sub: "test|0",
  summonerName: "Plasmatops",
  region: "OCE",
  friends: [{ username: "mAGO32Lu1", summonerName: "mAGO32Lu1" }],
};

// Start database and server before any tests run
beforeAll(async () => {
  mongodb = new MongoMemoryServer();

  await mongodb.getUri().then((cs) => connectToLocalDatabase(cs));
});

// Clear database after each test
afterEach(async () => {
  await User.deleteMany({});
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
    region,
    friends,
  } = validUserWithAllFields;

  // eslint-disable-next-line no-underscore-dangle
  expect(user._id).toBeDefined();
  expect(user.username).toBe(username);
  expect(user.sub).toBe(sub);
  expect(user.summonerName).toBe(summonerName);
  expect(user.region).toBe(region);
  expect(user.friends).toHaveLength(1);
  expect(user.friends[0].username).toBe(friends[0].username);
  expect(user.friends[0].summonerName).toBe(friends[0].summonerName);
});
