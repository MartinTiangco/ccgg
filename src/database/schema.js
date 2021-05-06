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

// Creating the User Schema
const User = mongoose.model("User", userSchema);
export default User;
