import AsyncStorage from '@react-native-async-storage/async-storage';

const kinddSuspiccousIdeasGamesPlayedKey =
  'kinddSuspiccousIdeasTotalGamesPlayed';

export const kinddSuspiccousIdeasLoadGamesPlayed = async () => {
  const kinddSuspiccousRaw = await AsyncStorage.getItem(
    kinddSuspiccousIdeasGamesPlayedKey,
  );

  if (!kinddSuspiccousRaw) {
    return 0;
  }

  const kinddSuspiccousValue = Number.parseInt(kinddSuspiccousRaw, 10);
  return Number.isFinite(kinddSuspiccousValue) ? kinddSuspiccousValue : 0;
};

export const kinddSuspiccousIdeasIncrementGamesPlayed = async () => {
  const kinddSuspiccousCurrent = await kinddSuspiccousIdeasLoadGamesPlayed();
  const kinddSuspiccousNext = kinddSuspiccousCurrent + 1;

  await AsyncStorage.setItem(
    kinddSuspiccousIdeasGamesPlayedKey,
    String(kinddSuspiccousNext),
  );

  return kinddSuspiccousNext;
};
