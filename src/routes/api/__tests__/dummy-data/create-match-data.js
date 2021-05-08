export function createMatches(numMatches, sub) {
  const matchArray = [];
  let gameCreation = 1600000000000;
  for (let i = 0; i < numMatches; i += 1) {
    gameCreation -= 1;
    matchArray.push({
      sub,
      matchId: i,
      gameMode: "Ranked Solo",
      gameCreation,
      gameDuration: 1300,
      mapId: 11,
      championName: "Hecarim",
      championImage: "Hecarim.png",
      spell1Image: "SummonerHaste.png",
      spell2Image: "SummonerSmite.png",
      win: true,
      item0: 1000,
      item1: 2000,
      item2: 3000,
      item3: 4000,
      item4: 5000,
      item5: 6000,
      item6: 7000,
      kills: 1,
      deaths: 1,
      assists: 1,
      largestMultiKill: 1,
      totalDamageDealt: 10000,
      totalDamageDealtToChampions: 5000,
      visionScore: 10,
      goldEarned: 1000,
      goldSpent: 800,
      neutralMinionsKilled: 100,
      totalMinionsKilled: 200,
      champLevel: 5,
      firstBloodKill: 0,
      primaryRuneImage: "perk-images/Styles/Precision/Conqueror/Conqueror.png",
      secondaryRuneImage: "perk-images/Styles/7202_Sorcery.png",
      participants: [],
    });
  }
  return matchArray;
}

export function createDiffDayMatches(numDays, sub) {
  const differentDays = [
    1620302400000,
    1620216000000,
    1620129600000,
    1619956800000,
    1619870400000,
    1619784000000,
    1619697600000,
    1619611200000,
    1619524800000,
    1619438400000,
    1619352000000,
  ];

  const matchArray = [];
  for (let index = 0; index < numDays; index += 1) {
    const date = differentDays[index];
    matchArray.push({
      sub,
      matchId: index,
      gameMode: "Ranked Solo",
      gameCreation: date,
      gameDuration: 1300,
      mapId: 11,
      championName: "Hecarim",
      championImage: "Hecarim.png",
      spell1Image: "SummonerHaste.png",
      spell2Image: "SummonerSmite.png",
      win: true,
      item0: 1000,
      item1: 2000,
      item2: 3000,
      item3: 4000,
      item4: 5000,
      item5: 6000,
      item6: 7000,
      kills: 1,
      deaths: 1,
      assists: 1,
      largestMultiKill: 1,
      totalDamageDealt: 10000,
      totalDamageDealtToChampions: 5000,
      visionScore: 10,
      goldEarned: 1000,
      goldSpent: 800,
      neutralMinionsKilled: 100,
      totalMinionsKilled: 200,
      champLevel: 5,
      firstBloodKill: 0,
      primaryRuneImage: "perk-images/Styles/Precision/Conqueror/Conqueror.png",
      secondaryRuneImage: "perk-images/Styles/7202_Sorcery.png",
      participants: [],
    });
  }

  return matchArray;
}

export function createChampMatches(sub) {
  const matchArray = [];
  const gameModes = ["Ranked Solo", "Ranked Flex", "Normal", "ARAM", "URF"];
  const champNames = ["Hecarim", "Sylas", "Lux", "Sona", "Rumble"];
  for (let index = 0; index < gameModes.length; index += 1) {
    matchArray.push({
      sub,
      matchId: index,
      gameMode: gameModes[index],
      gameCreation: 1619352000000,
      gameDuration: 1300,
      mapId: 11,
      championName: champNames[index],
      championImage: "Hecarim.png",
      spell1Image: "SummonerHaste.png",
      spell2Image: "SummonerSmite.png",
      win: true,
      item0: 1000,
      item1: 2000,
      item2: 3000,
      item3: 4000,
      item4: 5000,
      item5: 6000,
      item6: 7000,
      kills: 1,
      deaths: 1,
      assists: 1,
      largestMultiKill: 1,
      totalDamageDealt: 10000,
      totalDamageDealtToChampions: 5000,
      visionScore: 10,
      goldEarned: 1000,
      goldSpent: 800,
      neutralMinionsKilled: 100,
      totalMinionsKilled: 200,
      champLevel: 5,
      firstBloodKill: 0,
      primaryRuneImage: "perk-images/Styles/Precision/Conqueror/Conqueror.png",
      secondaryRuneImage: "perk-images/Styles/7202_Sorcery.png",
      participants: [],
    });
  }

  return matchArray;
}
