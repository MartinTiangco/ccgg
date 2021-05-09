import express from "express";
import RiotRequest from "riot-lol-api";
import { updateUser, retrieveUser } from "../../database/user-dao";
import checkJwt from "../../auth/server";

import { regions, HTTP_NOT_FOUND, HTTP_NO_CONTENT } from "../constants";

const router = express.Router();

/**
 * Change user's associated summoner in the database if possible
 * Possible status codes:
 * 201 - if the summoner is changed
 * 401 - if the user is not authenticated.
 * 404 - if the summoner does not exist.
 */
router.put("/changeSummoner", checkJwt, async (req, res) => {
  const userSub = req.user.sub;
  const { summonerName } = req.body;

  const user = await retrieveUser(userSub);
  if (user == null) {
    res.status(HTTP_NOT_FOUND).send("User non-existent");
    return;
  }

  const region = regions[user.region];
  const apiKey = process.env.RIOT_API_KEY;
  const riotRequest = new RiotRequest(apiKey);
  riotRequest.request(
    region,
    "summoner",
    `/lol/summoner/v4/summoners/by-name/${summonerName}`,
    async (err, data) => {
      if (!err) {
        const changes = {
          summonerName: data.name,
          accountId: data.accountId,
          summonerId: data.id,
        };

        await updateUser(userSub, changes);
        res.status(HTTP_NO_CONTENT).send("Update successful");
      } else {
        res.status(err.statusCode).send();
      }
    }
  );
});

export default router;
