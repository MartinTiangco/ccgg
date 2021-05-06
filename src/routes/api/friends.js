import express from "express";
import { HTTP_NO_CONTENT, HTTP_NOT_FOUND } from "../constants";
import {
  addFriend,
  deleteFriend,
  retrieveFriends,
} from "../../database/friends-dao";
import checkJwt from "../../auth/server";

const router = express.Router();

/**
 * Retrieves all friends of a user.
 * Possible status codes:
 * 200 - if the user exists. An array of friends is returned in the body, which can be empty.
 * 401 - if the user is not authenticated
 * 404 - if the user does not exist.
 */
router.get("/", checkJwt, async (req, res) => {
  const friends = await retrieveFriends(req.user.sub);

  // user is not found
  if (!friends) {
    res.sendStatus(HTTP_NOT_FOUND);
    return;
  }

  res.json(friends);
});

/**
 * Adds a new friend to the user.
 * Possible status codes:
 * 204 - if friend is successfully added.
 * 400 - if trying to add a friend that is already in the friends list
 * 401 - if the user is not authenticated
 * 404 - if the user you're trying to add a friend to, does not exist.
 */
router.put("/", checkJwt, async (req, res) => {
  const { username, summonerName } = req.body;

  // add friend
  const newFriend = { username, summonerName };
  const result = await addFriend(req.user.sub, newFriend);
  res.sendStatus(result);
});

/**
 * Deletes a friend from the user.
 * Possible status codes:
 * 204 - if friend is either deleted or cannot be found in the friends list.
 * 401 - if the user is not authenticated
 * 404 - if the user you're trying to delete friends from, does not exist.
 */
router.delete("/", checkJwt, async (req, res) => {
  const { username, summonerName } = req.body;

  const success = await deleteFriend(req.user.sub, { username, summonerName });
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

export default router;
