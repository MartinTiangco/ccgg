import express from "express";
import { addUser } from "../../database/user-dao";
import checkJwt from "../../auth/server";

const router = express.Router();

/**
 * Register user to database.
 * Possible status codes:
 * 200 - if the user is successfully registered.
 * 400 - if trying to add a user that is already in the database
 * 401 - if the user is not authenticated.
 * 404 - if the user does not exist.
 */
router.put("/", checkJwt, async (req, res) => {
  const { username, sub, summonerName, region } = req.body;

  // add User
  const newUser = { username, sub, summonerName, region };

  const result = await addUser(newUser);
  res.sendStatus(result);
});

export default router;
