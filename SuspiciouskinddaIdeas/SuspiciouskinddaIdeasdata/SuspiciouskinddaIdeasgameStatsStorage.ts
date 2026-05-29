import AsyncStorage from '@react-native-async-storage/async-storage';

const suspiciouskinddaIdeasGamesPlayedKey =
  'suspiciouskinddaIdeasTotalGamesPlayed';

export const suspiciouskinddaIdeasLoadGamesPlayed = async () => {
  const suspiciouskinddaRaw = await AsyncStorage.getItem(
    suspiciouskinddaIdeasGamesPlayedKey,
  );

  if (!suspiciouskinddaRaw) {
    return 0;
  }

  const suspiciouskinddaValue = Number.parseInt(suspiciouskinddaRaw, 10);
  return Number.isFinite(suspiciouskinddaValue) ? suspiciouskinddaValue : 0;
};

export const suspiciouskinddaIdeasIncrementGamesPlayed = async () => {
  const suspiciouskinddaCurrent = await suspiciouskinddaIdeasLoadGamesPlayed();
  const suspiciouskinddaNext = suspiciouskinddaCurrent + 1;

  await AsyncStorage.setItem(
    suspiciouskinddaIdeasGamesPlayedKey,
    String(suspiciouskinddaNext),
  );

  return suspiciouskinddaNext;
};
