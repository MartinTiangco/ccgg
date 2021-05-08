import express from "express";
import RiotRequest from "riot-lol-api";
import checkJwt from "../../auth/server";
import { retrieveUser } from "../../database/user-dao";
import { addMatches, retrieveMatches } from "../../database/match-dao";
import {
  getMostPlayedChamps,
  getPlayerMatchData,
} from "../../riot-util/riot-api-helpers";

import {
  regions,
  HTTP_NOT_FOUND,
  HTTP_NO_CONTENT,
  HTTP_OK,
  HTTP_INTERNAL_SERVER,
  RANKED_FLEX,
  RANKED_SOLO,
} from "../constants";

const router = express.Router();

/**
 * HTTP get to call the riot API in order to refresh the latest match data to be stored in our database
 * Possible status codes:
 * 204 - if match data is updated successfully
 * 401 - if the user is not authorised to perform this query
 * 500 - unexpected error within server occurs
 * inc any other codes thrown by the Riot Api
 */
router.get("/refreshMatches", checkJwt, async (req, res) => {
  try {
    const userSub = req.user.sub;
    const user = await retrieveUser(userSub);
    if (user == null) {
      res.status(HTTP_NOT_FOUND).send("User non-existent");
      return;
    }

    // Retrieve a list of the 90 latest match IDs
    const region = regions[user.region];
    const apiKey = process.env.RIOT_API_KEY;
    const { accountId } = user;
    const numOfMatches = 90;
    const riotRequest = new RiotRequest(apiKey);
    const matchArray = [];
    riotRequest.request(
      region,
      "match",
      `/lol/match/v4/matchlists/by-account/${accountId}?endIndex=${numOfMatches}`,
      async (err, matchResponse) => {
        if (!err) {
          await Promise.all(
            matchResponse.matches.map(async (match) => {
              matchArray.push(
                await getPlayerMatchData(
                  match.gameId,
                  accountId,
                  region,
                  riotRequest,
                  userSub
                )
              );
            })
          );
          await addMatches(userSub, matchArray);
          res.status(HTTP_NO_CONTENT).send();
        } else {
          res.status(err.statusCode).send();
        }
      }
    );
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER).send(error);
  }
});

/**
 * HTTP get to obtain data/information related to the account's LoL profile details
 * Possible status codes:
 * 200 - if summoner info is retrieved.
 * 401 - if the user is not authorised to perform this query
 * 500 - unexpected error within server occurs
 * inc any other codes thrown by the Riot Api
 */
router.get("/summonerinfo", checkJwt, async (req, res) => {
  try {
    const userSub = req.user.sub;
    // First retrieve stored user
    const user = await retrieveUser(userSub);
    if (user == null) {
      res.status(HTTP_NOT_FOUND).send("User non-existent");
      return;
    }

    const { summonerName } = user;
    const region = regions[user.region];
    const apiKey = process.env.RIOT_API_KEY;
    const riotRequest = new RiotRequest(apiKey);
    riotRequest.request(
      region,
      "summoner",
      `/lol/summoner/v4/summoners/by-name/${summonerName}`,
      (err, data) => {
        if (!err) {
          res
            .status(HTTP_OK)
            .send({ summonerName, profileId: data.profileIconId });
        } else {
          res.status(err.statusCode).send();
        }
      }
    );
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER).send(error);
  }
});

/**
 * HTTP GET to retrieve the ranked statistics of the person's account
 * Possible status codes:
 * 200 - if ranked stats are retrieved.
 * 401 - if the user is not authorised to perform this query
 * 500 - unexpected error within server occurs
 * inc any other codes thrown by the Riot Api
 */
router.get("/rankedSummonerStats", checkJwt, async (req, res) => {
  try {
    const userSub = req.user.sub;
    const user = await retrieveUser(userSub);
    if (user == null) {
      res.status(HTTP_NOT_FOUND).send("User non-existent");
      return;
    }

    const region = regions[user.region];
    const apiKey = process.env.RIOT_API_KEY;
    const summonerID = user.summonerId;
    const riotRequest = new RiotRequest(apiKey);
    riotRequest.request(
      region,
      "league",
      `/lol/league/v4/entries/by-summoner/${summonerID}`,
      (err, rankedData) => {
        if (!err) {
          const output = [];
          rankedData.forEach((element) => {
            const {
              queueType,
              tier,
              rank,
              summonerName,
              leaguePoints,
              wins,
              losses,
            } = element;
            const queueData = {
              queueType,
              tier,
              rank,
              summonerName,
              leaguePoints,
              wins,
              losses,
            };
            if (queueType === RANKED_SOLO || queueType === RANKED_FLEX) {
              output.push(queueData);
            }
          });
          res.status(HTTP_OK).send(output);
        } else {
          res.status(err.statusCode).send();
        }
      }
    );
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER).send(error);
  }
});

/**
 * HTTP GET to obtain information on the player's game history
 * Possible status codes:
 * 200 - if ranked stats are retrieved.
 * 401 - if the user is not authorised to perform this query
 * 500 - unexpected error within server occurs
 * inc any other codes thrown by the Riot Api
 */
router.get("/match", checkJwt, async (req, res) => {
  const userSub = req.user.sub;
  const user = await retrieveUser(userSub);
  if (user == null) {
    res.status(HTTP_NOT_FOUND).send("User non-existent");
    return;
  }

  // Retrieve all of this user's matches
  const matches = await retrieveMatches(userSub);
  if (matches == null || matches.length === 0) {
    res.status(HTTP_NOT_FOUND).send("No matches");
    return;
  }
  // Otherwise sort the array to get latest matches
  matches.sort(
    (a, b) => parseFloat(b.gameCreation) - parseFloat(a.gameCreation)
  );

  // Return 20 matches max
  if (matches.length < 20) {
    res.status(HTTP_OK).send(matches);
  } else {
    res.status(HTTP_OK).send(matches.slice(0, 20));
  }
});

/**
 * HTTP GET to obtain information on the player's game history
 * Possible status codes:
 * 200 - if ranked stats are retrieved.
 * 401 - if the user is not authorised to perform this query
 * 500 - unexpected error within server occurs
 * inc any other codes thrown by the Riot Api
 */
router.get("/matchSummary", checkJwt, async (req, res) => {
  try {
    const userSub = req.user.sub;
    const user = await retrieveUser(userSub);
    if (user == null) {
      res.status(HTTP_NOT_FOUND).send("User non-existent");
      return;
    }

    // Retrieve all of this user's matches
    const matches = await retrieveMatches(userSub);
    if (matches == null || matches.length === 0) {
      res.status(HTTP_NOT_FOUND).send("No matches");
      return;
    }
    // Otherwise sort the array to get latest matches
    matches.sort(
      (a, b) => parseFloat(b.gameCreation) - parseFloat(a.gameCreation)
    );

    // get the most recent 10 days of games
    const matchDaysMap = new Map();
    matches.forEach((match) => {
      // try construct date of game to use as map key
      const matchDate = new Date(match.gameCreation);
      const dateString = matchDate.toLocaleDateString("en-NZ");
      if (matchDaysMap.has(dateString)) {
        matchDaysMap.set(dateString, [match, ...matchDaysMap.get(dateString)]);
      } else {
        matchDaysMap.set(dateString, [match]);
      }
    });

    const latestDaysOfMatches = [];
    const matchDaysIterator = matchDaysMap.entries();
    for (let i = 0; i < 10; i += 1) {
      const next = matchDaysIterator.next();
      if (next.done) {
        break;
      }
      const [date, matchArray] = next.value;
      latestDaysOfMatches.push({ gameDate: date, matches: matchArray });
    }
    res.status(HTTP_OK).send(latestDaysOfMatches);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER).send(error);
  }
});

/**
 * HTTP GET to extract the 10 most used champions by the player
 * Possible status codes:
 * 200 - if ranked stats are retrieved.
 * 401 - if the user is not authorised to perform this query
 * 500 - unexpected error within server occurs
 * inc any other codes thrown by the Riot Api
 */
router.get("/recentChampions", checkJwt, async (req, res) => {
  try {
    const userSub = req.user.sub;
    const user = await retrieveUser(userSub);
    if (user == null) {
      res.status(HTTP_NOT_FOUND).send("User non-existent");
      return;
    }

    // Retrieve all of this user's matches
    const matches = await retrieveMatches(userSub);
    if (matches == null || matches.length === 0) {
      res.status(HTTP_OK).send([
        { type: "ranked", champions: [] },
        { type: "normal", champions: [] },
        { type: "others", champions: [] },
      ]);
      return;
    }
    // Otherwise sort the array to get latest matches
    matches.sort(
      (a, b) => parseFloat(b.gameCreation) - parseFloat(a.gameCreation)
    );

    // Split the matches into three cateogories:
    // ranked = all ranked games
    // normal = normal games
    // other = every other gamemode (ARAM, URF etc.)
    const rankedMatches = [];
    const normalMatches = [];
    const otherMatches = [];
    matches.forEach((match) => {
      if (match.gameMode.includes("Ranked")) {
        rankedMatches.push(match);
      } else if (match.gameMode.includes("Normal")) {
        normalMatches.push(match);
      } else {
        otherMatches.push(match);
      }
    });

    const rankedChamps = getMostPlayedChamps(rankedMatches);
    const normalChamps = getMostPlayedChamps(normalMatches);
    const otherChamps = getMostPlayedChamps(otherMatches);

    const output = [
      { type: "ranked", champions: rankedChamps },
      { type: "normal", champions: normalChamps },
      { type: "others", champions: otherChamps },
    ];

    res.status(HTTP_OK).send(output);
  } catch (error) {
    res.status(HTTP_INTERNAL_SERVER).send(error);
  }
});

export default router;
