import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * This schema represents Users in the database.
 */
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    sub: {
      type: String,
      unique: true,
      required: true,
    },
    summonerName: {
      type: String,
      required: true,
    },
    summonerId: {
      type: String,
    },
    accountId: {
      type: String,
    },
    region: {
      type: String,
      enum: [
        "OCE",
        "NA",
        "KR",
        "JP",
        "EUW",
        "EUNE",
        "BR",
        "LAS",
        "LAN",
        "RU",
        "TR",
      ],
      required: true,
    },
    friends: [{ username: String, summonerName: String }],
  },
  {
    timestamps: {},
  }
);

/**
 * This schema represents game Matches in the database
 */
const matchSchema = new Schema(
  {
    sub: {
      type: String,
      required: true,
    },
    matchId: { type: Number, required: true, unique: true },
    gameMode: { type: String },
    gameCreation: { type: Number },
    gameDuration: { type: Number },
    mapId: { type: Number },
    championName: { type: String },
    championImage: { type: String },
    spell1Image: { type: String },
    spell2Image: { type: String },
    win: { type: Boolean },
    item0: { type: Number },
    item1: { type: Number },
    item2: { type: Number },
    item3: { type: Number },
    item4: { type: Number },
    item5: { type: Number },
    item6: { type: Number },
    kills: { type: Number },
    deaths: { type: Number },
    assists: { type: Number },
    largestMultiKill: { type: Number },
    totalDamageDealt: { type: Number },
    totalDamageDealtToChampions: { type: Number },
    visionScore: { type: Number },
    goldEarned: { type: Number },
    goldSpent: { type: Number },
    neutralMinionsKilled: { type: Number },
    totalMinionsKilled: { type: Number },
    champLevel: { type: Number },
    firstBloodKill: { type: Number },
    primaryRuneImage: { type: String },
    secondaryRuneImage: { type: String },
    participants: [
      {
        summonername: String,
        championName: String,
        championImage: String,
        teamId: Number,
      },
    ],
  },
  {
    timestamps: {},
  }
);

// Creating the Schemas
export const User = mongoose.model("User", userSchema);
export const Match = mongoose.model("Match", matchSchema);
