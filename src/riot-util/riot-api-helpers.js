import champions from "./data-files/champion.json";
import queues from "./data-files/queues.json";
import runes from "./data-files/runes.json";
import summonerSpells from "./data-files/summoner.json";

/**
 * Helper function used to retireve the name and image name of a specified champion based
 * on the given id
 */
export function getChampionData(championId) {
  let champInfo = {};
  // Grab the champion details of the matching champion id
  // eslint-disable-next-line no-restricted-syntax
  for (const [, value] of Object.entries(champions.data)) {
    if (value.key === championId.toString(10)) {
      champInfo = value;
      break;
    }
  }

  // Return only the name and full image name
  return {
    championName: champInfo.name,
    championImage: champInfo.image.full,
  };
}

/**
 * Helper function to retireve the primary rune path image and the secondary rune image name
 */
export function getRunes(primaryRuneId, primaryRunePathId, secondaryRuneId) {
  let primaryRuneData = null;
  let secondaryRuneImage = "";
  let primaryRuneImage = "";

  if (!primaryRuneId || !secondaryRuneId) {
    return {
      primaryRuneImage,
      secondaryRuneImage,
    };
  }
  // First retrieve primary rune data and the secondary rune image name
  // eslint-disable-next-line no-restricted-syntax
  for (const runeObject of runes) {
    if (runeObject.id === primaryRuneId) {
      primaryRuneData = runeObject.slots[0].runes;
    } else if (runeObject.id === secondaryRuneId) {
      secondaryRuneImage = runeObject.icon;
    }
  }

  // Then retrieve the specific primary rune image
  // eslint-disable-next-line no-restricted-syntax
  for (const specificRune of primaryRuneData) {
    if (specificRune.id === primaryRunePathId) {
      primaryRuneImage = specificRune.icon;
      break;
    }
  }

  return {
    primaryRuneImage,
    secondaryRuneImage,
  };
}

/**
 * Helper function to retrieve the game mode name
 */
export function getGameMode(queueId) {
  let matchingQueue = null;
  // eslint-disable-next-line no-restricted-syntax
  for (const queue of queues) {
    if (queue.queueId === queueId) {
      matchingQueue = queue;
      break;
    }
  }
  return matchingQueue.description;
}

/**
 * Helper function used to retrieve the summoner spell image name
 * based on the given spell id
 */
export function getSummonerSpell(summonerSpellId) {
  let summonerSpell = "";
  // eslint-disable-next-line no-restricted-syntax
  for (const [, value] of Object.entries(summonerSpells)) {
    if (value.key === summonerSpellId.toString(10)) {
      summonerSpell = value.image.full;
    }
  }

  return summonerSpell;
}

/**
 * Goes through all the participants of a match and returns their summoner names, champ info and their team id
 */
export function getMatchParticipants(participants, participantIdentities) {
  const allPlayers = [];

  // Grab champ and team data for each participant
  participants.forEach((player) => {
    const { championName, championImage } = getChampionData(player.championId);
    const { teamId } = player;
    let summonername = "";

    // Find the player's summoner name before adding it to the output array
    // eslint-disable-next-line no-restricted-syntax
    for (const identity of participantIdentities) {
      if (player.participantId === identity.participantId) {
        summonername = identity.player.summonerName;
        break;
      }
    }
    allPlayers.push({ summonername, championName, championImage, teamId });
  });

  return allPlayers;
}

/**
 * Helper function used to retrieve the player's data from a specific match
 */
export async function getPlayerMatchData(
  matchId,
  accountId,
  region,
  rRequest,
  sub
) {
  return new Promise((resolve) => {
    let playerDetails = {};
    rRequest.request(
      region,
      "match",
      `/lol/match/v4/matches/${matchId}`,
      (err, matchData) => {
        if (!err) {
          // Find the specific account's participantID
          const playerID = matchData.participantIdentities.find(
            (p) => p.player.accountId === accountId
          );

          // retrieve DTO containing just this player's info
          const playerObject = matchData.participants.find(
            (player) => player.participantId === playerID.participantId
          );

          // Get all the necessary data from riots matchDTO
          const participants = getMatchParticipants(
            matchData.participants,
            matchData.participantIdentities
          );
          const { gameCreation, gameDuration, mapId, queueId } = matchData;
          const gameMode = getGameMode(queueId);
          const { championName, championImage } = getChampionData(
            playerObject.championId
          );
          const {
            spell1Id,
            spell2Id,
            stats: {
              win,
              item0,
              item1,
              item2,
              item3,
              item4,
              item5,
              item6,
              kills,
              deaths,
              assists,
              largestMultiKill,
              totalDamageDealt,
              totalDamageDealtToChampions,
              visionScore,
              goldEarned,
              goldSpent,
              neutralMinionsKilled,
              totalMinionsKilled,
              champLevel,
              firstBloodKill,
              perkPrimaryStyle,
              perk0,
              perkSubStyle,
            },
          } = playerObject;
          const { primaryRuneImage, secondaryRuneImage } = getRunes(
            perkPrimaryStyle,
            perk0,
            perkSubStyle
          );
          const spell1Image = getSummonerSpell(spell1Id);
          const spell2Image = getSummonerSpell(spell2Id);

          playerDetails = {
            sub,
            matchId,
            gameMode,
            gameCreation,
            gameDuration,
            mapId,
            championName,
            championImage,
            spell1Image,
            spell2Image,
            win,
            item0,
            item1,
            item2,
            item3,
            item4,
            item5,
            item6,
            kills,
            deaths,
            assists,
            largestMultiKill,
            totalDamageDealt,
            totalDamageDealtToChampions,
            visionScore,
            goldEarned,
            goldSpent,
            neutralMinionsKilled,
            totalMinionsKilled,
            champLevel,
            firstBloodKill,
            primaryRuneImage,
            secondaryRuneImage,
            participants,
          };

          resolve(playerDetails);
        }
      }
    );
  });
}

/**
 * Helper function used to sift through an array of matches and find the stats for the 10 most
 * played champs
 */
export function getMostPlayedChamps(matchArray) {
  // Map every champion played in the last 100 games to their match history
  const championMap = new Map();
  matchArray.forEach((match) => {
    if (championMap.has(match.championName)) {
      championMap.set(match.championName, [
        match,
        ...championMap.get(match.championName),
      ]);
    } else {
      championMap.set(match.championName, [match]);
    }
  });

  // Sort the champions by most played (most matches)
  const sortedChampionMap = new Map(
    [...championMap.entries()].sort((a, b) => b[1].length - a[1].length)
  );

  // Retrieve the first 10 most played champions and their stats
  const championArray = [];
  const sortedChampIterator = sortedChampionMap.entries();
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    const next = sortedChampIterator.next();
    if (next.done) {
      break;
    }
    // Retrieve the total kills, deaths, assists, total CS and wins per champion
    const [champName, champMatchArray] = next.value;
    const numMatches = champMatchArray.length;
    let totalKills = 0;
    let totalDeaths = 0;
    let totalAssists = 0;
    let totalCS = 0;
    let totalWins = 0;
    champMatchArray.forEach((match) => {
      totalKills += match.kills;
      totalDeaths += match.deaths;
      totalAssists += match.assists;
      totalCS += match.totalMinionsKilled + match.neutralMinionsKilled;
      totalWins += match.win ? 1 : 0;
    });

    // Return only the average of the stats
    championArray.push({
      championName: champName,
      championImage: champMatchArray[0].championImage,
      totalMatches: numMatches,
      avgKills: totalKills / numMatches,
      avgDeaths: totalDeaths / numMatches,
      avgAssists: totalAssists / numMatches,
      avgCS: totalCS / numMatches,
      winPercent: (totalWins * 100) / numMatches,
    });
  }

  return championArray;
}
