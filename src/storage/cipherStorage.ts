import AsyncStorage from '@react-native-async-storage/async-storage';

import type {CipherMode, CipherType} from '../data/cipherUtils';

export type SavedCipher = {
  id: string;
  cipherType: CipherType;
  mode: CipherMode;
  input: string;
  output: string;
  savedAt: string;
};

const SAVED_CIPHERS_KEY = 'ksi:saved-ciphers';
const LEGACY_SAVED_CIPHERS_KEY = 'suspiciouskinddaIdeasSavedCiphers';

type LegacySavedCipher = {
  suspiciouskinddaCipherId?: string;
  suspiciouskinddaCipherType?: CipherType;
  suspiciouskinddaCipherMode?: CipherMode;
  suspiciouskinddaCipherInput?: string;
  suspiciouskinddaCipherOutput?: string;
  suspiciouskinddaCipherSavedAt?: string;
};

function normalizeSavedCipher(entry: LegacySavedCipher): SavedCipher | null {
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

export const loadSavedCiphers = async () => {
  let raw = await AsyncStorage.getItem(SAVED_CIPHERS_KEY);

  if (!raw) {
    const legacyRaw = await AsyncStorage.getItem(LEGACY_SAVED_CIPHERS_KEY);
    if (!legacyRaw) {
      return [] as SavedCipher[];
    }

    try {
      const legacyEntries = JSON.parse(legacyRaw) as LegacySavedCipher[];
      const migrated = legacyEntries
        .map(normalizeSavedCipher)
        .filter((entry): entry is SavedCipher => entry != null);

      await AsyncStorage.setItem(SAVED_CIPHERS_KEY, JSON.stringify(migrated));
      await AsyncStorage.removeItem(LEGACY_SAVED_CIPHERS_KEY);
      return migrated;
    } catch {
      return [] as SavedCipher[];
    }
  }

  try {
    return JSON.parse(raw) as SavedCipher[];
  } catch {
    return [] as SavedCipher[];
  }
};

export const saveCipher = async (
  entry: Omit<SavedCipher, 'id' | 'savedAt'>,
) => {
  const existing = await loadSavedCiphers();
  const newEntry: SavedCipher = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(
    SAVED_CIPHERS_KEY,
    JSON.stringify([newEntry, ...existing]),
  );

  return newEntry;
};

export const formatSavedDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
