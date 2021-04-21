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
    },
    password: {
      type: String,
      validate: {
        validator(v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$/.test(v);
        },
        message:
          "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number.",
      },
    },
    riotID: {
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
      required() {
        return this.riotID !== "";
      },
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
