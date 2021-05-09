import { User } from "./schema";
import { HTTP_BAD_REQUEST, HTTP_NO_CONTENT } from "../routes/constants";

// add user
export const addUser = async (newUser) => {
  const user = await User.findOne({ sub: newUser.sub });

  if (user) {
    return HTTP_BAD_REQUEST;
  }

  await User.create({
    username: newUser.username,
    sub: newUser.sub,
    summonerName: newUser.summonerName,
    summonerId: newUser.summonerId,
    accountId: newUser.accountId,
    region: newUser.region,
  });
  return HTTP_NO_CONTENT;
};

// retrieve the User using the unique 'sub' identifier
export const retrieveUser = async (sub) => {
  const user = await User.findOne({ sub });
  return user;
};

// Update a user's details
export const updateUser = async (sub, changes) => {
  const newChanges = { $set: changes };
  await User.updateOne({ sub }, newChanges);
};
