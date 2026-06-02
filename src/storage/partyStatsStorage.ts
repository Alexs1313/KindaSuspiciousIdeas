import AsyncStorage from '@react-native-async-storage/async-storage';

const PARTY_SESSIONS_KEY = 'kinda:party-sessions';
const LEGACY_KSI_SESSIONS_KEY = 'ksi:games-played';
const LEGACY_GAMES_PLAYED_KEY = 'suspiciouskinddaIdeasTotalGamesPlayed';

export const loadPartySessionsCount = async () => {
  let raw = await AsyncStorage.getItem(PARTY_SESSIONS_KEY);

  if (!raw) {
    const legacyKsiRaw = await AsyncStorage.getItem(LEGACY_KSI_SESSIONS_KEY);
    const legacyRaw =
      legacyKsiRaw ??
      (await AsyncStorage.getItem(LEGACY_GAMES_PLAYED_KEY));
    if (!legacyRaw) {
      return 0;
    }

    const value = Number.parseInt(legacyRaw, 10);
    const count = Number.isFinite(value) ? value : 0;
    await AsyncStorage.setItem(PARTY_SESSIONS_KEY, String(count));
    await AsyncStorage.multiRemove([
      LEGACY_KSI_SESSIONS_KEY,
      LEGACY_GAMES_PLAYED_KEY,
    ]);
    return count;
  }

  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : 0;
};

export const incrementPartySessionsCount = async () => {
  const current = await loadPartySessionsCount();
  const next = current + 1;

  await AsyncStorage.setItem(PARTY_SESSIONS_KEY, String(next));

  return next;
};
