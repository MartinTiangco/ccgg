import mongoose from "mongoose";
import passwordValidationMessage from "./constants";

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
    password: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(v);
        },
        message: passwordValidationMessage,
      },
    },
    riotID: {
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
    friends: [{ username: String, riotID: String }],
  },
  {
    timestamps: {},
  }
);

// Creating the User Schema
const User = mongoose.model("User", userSchema);
export default User;
