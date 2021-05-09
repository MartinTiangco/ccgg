import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_CONNECTION_STRING = "mongodb://localhost:27017/users";

// Connection URI to the MongoDB database
const password = process.env.DB_USER_PW;
const mongoDB = `mongodb+srv://dbuser:${password}@ccgg.qmdbv.mongodb.net/test?retryWrites=true&w=majority`;

/**
 * Function to connect to the database
 */
async function connectToDatabase() {
  try {
    // Connect to database
    return mongoose.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      () => {
        console.log("Connected to MongoDB");
      }
    );
  } catch (e) {
    throw new Error(`MongoDB connection error: ${e}`);
  }
}

export const connectToLocalDatabase = (
  connectionString = DEFAULT_CONNECTION_STRING
) =>
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

export default connectToDatabase;
