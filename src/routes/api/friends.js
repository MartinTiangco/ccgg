import express from "express";
import { HTTP_NO_CONTENT, HTTP_NOT_FOUND } from "../constants";
import {
  addFriend,
  deleteFriend,
  retrieveFriends,
} from "../../database/friends-dao";

const router = express.Router();

/**
 * Retrieves all friends of a user.
 * Possible status codes:
 * 200 - if the user exists. An array of friends is returned in the body, which can be empty.
 * 404 - if the user does not exist.
 */
router.get("/", async (req, res) => {
  const userSub = req.user ? req.user.sub : req.body.sub; // TODO: remove req.body.sub once authentication is implemented. The tests put a dummy userSub in req.body.sub for now.

  const friends = await retrieveFriends(userSub);

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
 * 404 - if the user you're trying to add a friend to, does not exist.
 */
router.put("/", async (req, res) => {
  const userSub = req.user ? req.user.sub : req.body.sub; // TODO: remove req.body.sub once authentication is implemented. The tests put a dummy userSub in req.body.sub for now.
  const { username, riotID } = req.body;

  // add friend
  const newFriend = { username, riotID };
  const result = await addFriend(userSub, newFriend);
  res.sendStatus(result);
});

/**
 * Deletes a friend from the user.
 * Possible status codes:
 * 204 - if friend is either deleted or cannot be found in the friends list.
 * 404 - if the user you're trying to delete friends from, does not exist.
 */
router.delete("/", async (req, res) => {
  const userSub = req.user ? req.user.sub : req.body.sub; // TODO: remove req.body.sub once authentication is implemented. The tests put a dummy userSub in req.body.sub for now.
  const { username, riotID } = req.body;

  const success = await deleteFriend(userSub, { username, riotID });
  res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

export default router;
