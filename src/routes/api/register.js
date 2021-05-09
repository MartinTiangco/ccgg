import express from "express";
import RiotRequest from "riot-lol-api";
import { addUser } from "../../database/user-dao";
import checkJwt from "../../auth/server";
import { HTTP_INTERNAL_SERVER, regions } from "../constants";

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
  let summonerId;
  let accountId;
  let newUser;

  try {
    const riotRegion = regions[region];
    const apiKey = process.env.RIOT_API_KEY;
    const riotRequest = new RiotRequest(apiKey);
    riotRequest.request(
      riotRegion,
      "summoner",
      `/lol/summoner/v4/summoners/by-name/${summonerName}`,
      async (err, data) => {
        if (!err) {
          summonerId = data.id;
          accountId = data.accountId;
          newUser = {
            username,
            sub,
            summonerName,
            summonerId,
            accountId,
            region,
          };
          const result = await addUser(newUser);
          res.sendStatus(result);
        } else {
          res.status(err.statusCode).send();
        }
      }
    );
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER).send(error);
  }
});

export default router;
