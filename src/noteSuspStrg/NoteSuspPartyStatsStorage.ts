import AsyncStorage from '@react-native-async-storage/async-storage';

const noteSuspPartySessionsKey = 'notesusp:party-sessions';
const noteSuspLegacyKindaSessionsKey = 'kinda:party-sessions';
const noteSuspLegacyArchivedSessionsKey = 'ksi:games-played';
const noteSuspLegacyGamesPlayedKey = 'suspiciouskinddaIdeasTotalGamesPlayed';

export const noteSuspLoadPartySessionsCount = async () => {
  let raw = await AsyncStorage.getItem(noteSuspPartySessionsKey);

  if (!raw) {
    const legacyKindaRaw = await AsyncStorage.getItem(
      noteSuspLegacyKindaSessionsKey,
    );
    const legacyArchivedRaw = await AsyncStorage.getItem(
      noteSuspLegacyArchivedSessionsKey,
    );
    const legacyRaw =
      legacyKindaRaw ??
      legacyArchivedRaw ??
      (await AsyncStorage.getItem(noteSuspLegacyGamesPlayedKey));
    if (!legacyRaw) {
      return 0;
    }

    const value = Number.parseInt(legacyRaw, 10);
    const count = Number.isFinite(value) ? value : 0;
    await AsyncStorage.setItem(noteSuspPartySessionsKey, String(count));
    await AsyncStorage.multiRemove([
      noteSuspLegacyKindaSessionsKey,
      noteSuspLegacyArchivedSessionsKey,
      noteSuspLegacyGamesPlayedKey,
    ]);
    return count;
  }

  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) ? value : 0;
};

export const noteSuspIncrementPartySessionsCount = async () => {
  const current = await noteSuspLoadPartySessionsCount();
  const next = current + 1;

  await AsyncStorage.setItem(noteSuspPartySessionsKey, String(next));

  return next;
};
