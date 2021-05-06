import { retrieveUser } from "./user-dao";
import {
  HTTP_NOT_FOUND,
  HTTP_BAD_REQUEST,
  HTTP_NO_CONTENT,
} from "../routes/constants";

// We get the current user, and update to add a friend which consists of { username: String, summonerName: String }
const addFriend = async (userSub, newFriend) => {
  const user = await retrieveUser(userSub);
  const { username, summonerName } = newFriend;

  // not found
  if (!user) {
    return HTTP_NOT_FOUND;
  }

  const { friends } = user;

  // check if we're adding a friend that is already in the friends list
  if (
    friends.find(
      (friend) =>
        friend.username === username && friend.summonerName === summonerName
    )
  ) {
    return HTTP_BAD_REQUEST;
  }

  const updatedFriends = [...friends, newFriend];
  user.friends = updatedFriends;
  await user.save();
  return HTTP_NO_CONTENT;
};

/**
 * Retrieves friends of a user
 * @param {String} userSub
 * @returns null if user is not found, an array of friends otherwise. An empty array is returned if the user has no friends.
 */
const retrieveFriends = async (userSub) => {
  const user = await retrieveUser(userSub);
  if (!user) {
    return null;
  }

  return user.friends;
};

/**
 * Deletes a friend.
 * @param {*} userSub
 * @param {*} param1
 * @returns false if user is not found. Otherwise, true (even if the friend to be deleted is not found)
 */
const deleteFriend = async (userSub, { username, summonerName }) => {
  const user = await retrieveUser(userSub);
  if (!user) {
    return false;
  }

  const { friends } = user;
  const updatedFriends = friends.filter(
    (friend) =>
      friend.username !== username && friend.summonerName !== summonerName
  );

  user.friends = updatedFriends;
  await user.save();
  return true;
};

export { addFriend, retrieveFriends, deleteFriend };
