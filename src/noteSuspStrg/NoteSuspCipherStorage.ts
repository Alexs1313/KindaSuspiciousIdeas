import AsyncStorage from '@react-native-async-storage/async-storage';

import type {NoteSuspCipherMode, NoteSuspCipherType} from '../noteSuspData/NoteSuspCipherUtils';

export type NoteSuspSavedCipher = {
  id: string;
  cipherType: NoteSuspCipherType;
  mode: NoteSuspCipherMode;
  input: string;
  output: string;
  savedAt: string;
};

const noteSuspSavedCiphersKey = 'notesusp:saved-ciphers';
const noteSuspLegacyKindaCiphersKey = 'kinda:saved-ciphers';
const noteSuspLegacyArchivedCiphersKey = 'ksi:saved-ciphers';
const noteSuspLegacySavedCiphersKey = 'suspiciouskinddaIdeasSavedCiphers';

type NoteSuspLegacySavedCipher = {
  suspiciouskinddaCipherId?: string;
  suspiciouskinddaCipherType?: NoteSuspCipherType;
  suspiciouskinddaCipherMode?: NoteSuspCipherMode;
  suspiciouskinddaCipherInput?: string;
  suspiciouskinddaCipherOutput?: string;
  suspiciouskinddaCipherSavedAt?: string;
};

function noteSuspNormalizeSavedCipher(entry: NoteSuspLegacySavedCipher): NoteSuspSavedCipher | null {
  const id = entry.suspiciouskinddaCipherId;
  const cipherType = entry.suspiciouskinddaCipherType;
  const mode = entry.suspiciouskinddaCipherMode;
  const input = entry.suspiciouskinddaCipherInput;
  const output = entry.suspiciouskinddaCipherOutput;
  const savedAt = entry.suspiciouskinddaCipherSavedAt;

  if (!id || !cipherType || !mode || input == null || output == null || !savedAt) {
    return null;
  }

  return {id, cipherType, mode, input, output, savedAt};
}

export const noteSuspLoadSavedCiphers = async () => {
  let raw = await AsyncStorage.getItem(noteSuspSavedCiphersKey);

  if (!raw) {
    const legacyKindaRaw = await AsyncStorage.getItem(
      noteSuspLegacyKindaCiphersKey,
    );
    const legacyArchivedRaw = await AsyncStorage.getItem(
      noteSuspLegacyArchivedCiphersKey,
    );
    const legacyRaw =
      legacyKindaRaw ??
      legacyArchivedRaw ??
      (await AsyncStorage.getItem(noteSuspLegacySavedCiphersKey));
    if (!legacyRaw) {
      return [] as NoteSuspSavedCipher[];
    }

    try {
      const legacyEntries = JSON.parse(legacyRaw) as NoteSuspLegacySavedCipher[];
      const migrated = legacyEntries
        .map(noteSuspNormalizeSavedCipher)
        .filter((entry): entry is NoteSuspSavedCipher => entry != null);

      await AsyncStorage.setItem(noteSuspSavedCiphersKey, JSON.stringify(migrated));
      await AsyncStorage.multiRemove([
        noteSuspLegacyKindaCiphersKey,
        noteSuspLegacyArchivedCiphersKey,
        noteSuspLegacySavedCiphersKey,
      ]);
      return migrated;
    } catch {
      return [] as NoteSuspSavedCipher[];
    }
  }

  try {
    return JSON.parse(raw) as NoteSuspSavedCipher[];
  } catch {
    return [] as NoteSuspSavedCipher[];
  }
};

export const noteSuspSaveCipher = async (
  entry: Omit<NoteSuspSavedCipher, 'id' | 'savedAt'>,
) => {
  const existing = await noteSuspLoadSavedCiphers();
  const newEntry: NoteSuspSavedCipher = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(
    noteSuspSavedCiphersKey,
    JSON.stringify([newEntry, ...existing]),
  );

  return newEntry;
};

export const noteSuspFormatSavedDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
