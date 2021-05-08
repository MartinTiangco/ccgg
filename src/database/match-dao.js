import { Match } from "./schema";

/**
 * Add all the matches in the given array to the database
 */
export const addMatches = async (sub, matchArray) => {
  // Existing matches
  const existingMatches = await Match.find({ sub }, { _id: false });

  // Only insert matches if they aren't in the DB already
  const matchesToAdd = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const match of matchArray) {
    if (
      !existingMatches.some(
        (existingMatch) => existingMatch.matchId === match.matchId
      )
    ) {
      matchesToAdd.push(match);
    }
  }

  await Match.insertMany(matchesToAdd);
};

/**
 * Get all the Matches (ordered by time descending) that belong to a particular user via their 'sub' identifier
 */
export const retrieveMatches = async (sub) => {
  const matches = await Match.find(
    { sub },
    { _id: false, sub: false, __v: false, updatedAt: false, createdAt: false }
  );
  return matches;
};
