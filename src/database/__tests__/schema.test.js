import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import { connectToLocalDatabase } from "../db-connect";
import passwordValidationMessage from "../constants";
import User from "../schema";

let mongodb;

const validUserWithAllFields = {
  username: "Plasmatops",
  sub: "test|0",
  password: "123ABCabc",
  riotID: "Plasmatops",
  region: "OCE",
  friends: [{ username: "mAGO32Lu1", riotID: "mAGO32Lu1" }],
};
const userForPasswordValidation = {
  username: "Plasmatops",
  sub: "test|0",
  riotID: "Plasmatops",
  region: "OCE",
  friends: [],
};
const passwordWithFewerCharacters = {
  password: "123ABCa",
};
const passwordWithNoUppercase = {
  password: "123abcabc",
};
const passwordWithOneUppercase = {
  password: "123abcabC",
};
const passwordWithNoLowercase = {
  password: "123ABCABC",
};
const passwordWithOneLowercase = {
  password: "123ABCaBC",
};
const passwordWithNoNumbers = {
  password: "ABCabcABC",
};
const passwordWithOneNumber = {
  password: "1BCabcABC",
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
    password,
    sub,
    riotID,
    region,
    friends,
  } = validUserWithAllFields;

  // eslint-disable-next-line no-underscore-dangle
  expect(user._id).toBeDefined();
  expect(user.username).toBe(username);
  expect(user.password).toBe(password);
  expect(user.sub).toBe(sub);
  expect(user.riotID).toBe(riotID);
  expect(user.region).toBe(region);
  expect(user.friends).toHaveLength(1);
  expect(user.friends[0].username).toBe(friends[0].username);
  expect(user.friends[0].riotID).toBe(friends[0].riotID);
});

describe("password validation", () => {
  it("invalid with fewer than 8 characters", async () => {
    const user = new User({
      ...userForPasswordValidation,
      ...passwordWithFewerCharacters,
    });
    await user.save().catch((err) => {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.password.properties.message).toBe(
        passwordValidationMessage
      );
    });
  });

  it("invalid with no uppercase", async () => {
    const user = new User({
      ...userForPasswordValidation,
      ...passwordWithNoUppercase,
    });
    await user.save().catch((err) => {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.password.properties.message).toBe(
        passwordValidationMessage
      );
    });
  });

  it("invalid with no lowercase", async () => {
    const user = new User({
      ...userForPasswordValidation,
      ...passwordWithNoLowercase,
    });
    await user.save().catch((err) => {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.password.properties.message).toBe(
        passwordValidationMessage
      );
    });
  });

  it("invalid with no numbers", async () => {
    const user = new User({
      ...userForPasswordValidation,
      ...passwordWithNoNumbers,
    });
    await user.save().catch((err) => {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.password.properties.message).toBe(
        passwordValidationMessage
      );
    });
  });

  it("valid with one uppercase", async () => {
    const user = new User({
      ...userForPasswordValidation,
      ...passwordWithOneUppercase,
    });
    await user.save();

    const { username, sub, riotID, region } = userForPasswordValidation;
    const { password } = passwordWithOneUppercase;

    // eslint-disable-next-line no-underscore-dangle
    expect(user._id).toBeDefined();
    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
    expect(user.sub).toBe(sub);
    expect(user.riotID).toBe(riotID);
    expect(user.region).toBe(region);
    expect(user.friends).toHaveLength(0);
  });

  it("valid with one lowercase", async () => {
    const user = new User({
      ...userForPasswordValidation,
      ...passwordWithOneLowercase,
    });
    await user.save();

    const { username, sub, riotID, region } = userForPasswordValidation;
    const { password } = passwordWithOneLowercase;

    // eslint-disable-next-line no-underscore-dangle
    expect(user._id).toBeDefined();
    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
    expect(user.sub).toBe(sub);
    expect(user.riotID).toBe(riotID);
    expect(user.region).toBe(region);
    expect(user.friends).toHaveLength(0);
  });

  it("valid with one number", async () => {
    const user = new User({
      ...userForPasswordValidation,
      ...passwordWithOneNumber,
    });
    await user.save();

    const { username, sub, riotID, region } = userForPasswordValidation;
    const { password } = passwordWithOneNumber;

    // eslint-disable-next-line no-underscore-dangle
    expect(user._id).toBeDefined();
    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
    expect(user.sub).toBe(sub);
    expect(user.riotID).toBe(riotID);
    expect(user.region).toBe(region);
    expect(user.friends).toHaveLength(0);
  });
});
