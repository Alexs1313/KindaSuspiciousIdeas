import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  KinddSuspiccousIdeasCipherMode,
  KinddSuspiccousIdeasCipherType,
} from './KinddSuspiccousIdeascipherUtils';

export type KinddSuspiccousIdeasSavedCipher = {
  kinddSuspiccousCipherId: string;
  kinddSuspiccousCipherType: KinddSuspiccousIdeasCipherType;
  kinddSuspiccousCipherMode: KinddSuspiccousIdeasCipherMode;
  kinddSuspiccousCipherInput: string;
  kinddSuspiccousCipherOutput: string;
  kinddSuspiccousCipherSavedAt: string;
};

const kinddSuspiccousIdeasStorageKey = 'kinddSuspiccousIdeasSavedCiphers';

export const kinddSuspiccousIdeasLoadSavedCiphers = async () => {
  const kinddSuspiccousRaw = await AsyncStorage.getItem(
    kinddSuspiccousIdeasStorageKey,
  );

  if (!kinddSuspiccousRaw) {
    return [] as KinddSuspiccousIdeasSavedCipher[];
  }

  try {
    return JSON.parse(
      kinddSuspiccousRaw,
    ) as KinddSuspiccousIdeasSavedCipher[];
  } catch {
    return [] as KinddSuspiccousIdeasSavedCipher[];
  }
};

export const kinddSuspiccousIdeasSaveCipher = async (
  kinddSuspiccousEntry: Omit<
    KinddSuspiccousIdeasSavedCipher,
    'kinddSuspiccousCipherId' | 'kinddSuspiccousCipherSavedAt'
  >,
) => {
  const kinddSuspiccousExisting = await kinddSuspiccousIdeasLoadSavedCiphers();
  const kinddSuspiccousNewEntry: KinddSuspiccousIdeasSavedCipher = {
    ...kinddSuspiccousEntry,
    kinddSuspiccousCipherId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kinddSuspiccousCipherSavedAt: new Date().toISOString(),
  };

  await AsyncStorage.setItem(
    kinddSuspiccousIdeasStorageKey,
    JSON.stringify([kinddSuspiccousNewEntry, ...kinddSuspiccousExisting]),
  );

  return kinddSuspiccousNewEntry;
};

export const kinddSuspiccousIdeasFormatSavedDate = (
  kinddSuspiccousIsoDate: string,
) => {
  const kinddSuspiccousDate = new Date(kinddSuspiccousIsoDate);
  return kinddSuspiccousDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};
