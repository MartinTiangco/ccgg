const mongoose = require("mongoose");

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
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("Connected to MongoDB");
      }
    );
  } catch (e) {
    throw new Error(`MongoDB connection error: ${e}`);
  }
}

module.exports = connectToDatabase;
