import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  SuspiciouskinddaIdeasCipherMode,
  SuspiciouskinddaIdeasCipherType,
} from './SuspiciouskinddaIdeascipherUtils';

export type SuspiciouskinddaIdeasSavedCipher = {
  suspiciouskinddaCipherId: string;
  suspiciouskinddaCipherType: SuspiciouskinddaIdeasCipherType;
  suspiciouskinddaCipherMode: SuspiciouskinddaIdeasCipherMode;
  suspiciouskinddaCipherInput: string;
  suspiciouskinddaCipherOutput: string;
  suspiciouskinddaCipherSavedAt: string;
};

const suspiciouskinddaIdeasStorageKey = 'suspiciouskinddaIdeasSavedCiphers';

export const suspiciouskinddaIdeasLoadSavedCiphers = async () => {
  const suspiciouskinddaRaw = await AsyncStorage.getItem(
    suspiciouskinddaIdeasStorageKey,
  );

  if (!suspiciouskinddaRaw) {
    return [] as SuspiciouskinddaIdeasSavedCipher[];
  }

  try {
    return JSON.parse(
      suspiciouskinddaRaw,
    ) as SuspiciouskinddaIdeasSavedCipher[];
  } catch {
    return [] as SuspiciouskinddaIdeasSavedCipher[];
  }
};

export const suspiciouskinddaIdeasSaveCipher = async (
  suspiciouskinddaEntry: Omit<
    SuspiciouskinddaIdeasSavedCipher,
    'suspiciouskinddaCipherId' | 'suspiciouskinddaCipherSavedAt'
  >,
) => {
  const suspiciouskinddaExisting = await suspiciouskinddaIdeasLoadSavedCiphers();
  const suspiciouskinddaNewEntry: SuspiciouskinddaIdeasSavedCipher = {
    ...suspiciouskinddaEntry,
    suspiciouskinddaCipherId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    suspiciouskinddaCipherSavedAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(
    suspiciouskinddaIdeasStorageKey,
    JSON.stringify([suspiciouskinddaNewEntry, ...suspiciouskinddaExisting]),
  );

  return suspiciouskinddaNewEntry;
};

export const suspiciouskinddaIdeasFormatSavedDate = (
  suspiciouskinddaIsoDate: string,
) => {
  const suspiciouskinddaDate = new Date(suspiciouskinddaIsoDate);
  return suspiciouskinddaDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
