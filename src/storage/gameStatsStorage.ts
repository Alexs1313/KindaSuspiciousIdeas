import AsyncStorage from '@react-native-async-storage/async-storage';

const GAMES_PLAYED_KEY = 'ksi:games-played';
const LEGACY_GAMES_PLAYED_KEY = 'suspiciouskinddaIdeasTotalGamesPlayed';

export const loadGamesPlayed = async () => {
  let raw = await AsyncStorage.getItem(GAMES_PLAYED_KEY);

  if (!raw) {
    const legacyRaw = await AsyncStorage.getItem(LEGACY_GAMES_PLAYED_KEY);
    if (!legacyRaw) {
      return 0;
    }

    const value = Number.parseInt(legacyRaw, 10);
    const count = Number.isFinite(value) ? value : 0;
    await AsyncStorage.setItem(GAMES_PLAYED_KEY, String(count));
    await AsyncStorage.removeItem(LEGACY_GAMES_PLAYED_KEY);
    return count;
  }

  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : 0;
};

export const incrementGamesPlayed = async () => {
  const current = await loadGamesPlayed();
  const next = current + 1;

  await AsyncStorage.setItem(GAMES_PLAYED_KEY, String(next));

  return next;
};
