import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {
  noteSuspFormatSavedDate,
  noteSuspLoadSavedCiphers,
  type NoteSuspSavedCipher,
} from '../noteSuspStrg/NoteSuspCipherStorage';
import {noteSuspCipherTypeLabels} from '../noteSuspData/NoteSuspCipherUtils';

export function NoteSuspSavedCiphersScreen() {
  const navigation = useNavigation<any>();
  const [savedCiphers, setSavedCiphers] =
    useState<NoteSuspSavedCipher[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      noteSuspLoadSavedCiphers().then(items => {
        if (isActive) {
          setSavedCiphers(items);
        }
      });

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <View style={styles.noteSuspHeaderRow}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.noteSuspBackBtn}>
            <Text style={styles.noteSuspBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.noteSuspHeaderTitle}>Solved Ciphers</Text>
        </View>

        {savedCiphers.length === 0 ? (
          <Text style={styles.noteSuspEmptyText}>
            No saved ciphers yet. Encode or decode something in Cipher Lab and tap
            Save.
          </Text>
        ) : (
          <View style={styles.noteSuspListContent}>
            {savedCiphers.map(item => (
              <View
                key={item.id}
                style={styles.noteSuspCard}>
                <View style={styles.noteSuspCardTopRow}>
                  <View style={styles.noteSuspTypePill}>
                    <Text style={styles.noteSuspTypePillText}>
                      {noteSuspCipherTypeLabels[
                        item.cipherType
                      ]}{' '}
                      · {item.mode}
                    </Text>
                  </View>
                  <Text style={styles.noteSuspDateText}>
                    {noteSuspFormatSavedDate(
                      item.savedAt,
                    )}
                  </Text>
                </View>

                <Text style={styles.noteSuspLineText} numberOfLines={2}>
                  <Text style={styles.noteSuspLineLabel}>Input: </Text>
                  <Text style={styles.noteSuspInputValue}>
                    {item.input}
                  </Text>
                </Text>

                <Text style={styles.noteSuspLineText} numberOfLines={2}>
                  <Text style={styles.noteSuspLineLabel}>Output: </Text>
                  <Text style={styles.noteSuspOutputValue}>
                    {item.output}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </NoteSuspBackgroundLayout>
  );
};

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  noteSuspHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  noteSuspBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspBackIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
  },
  noteSuspHeaderTitle: {
    flex: 1,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
  },
  noteSuspListContent: {
    gap: 12,
    paddingBottom: 24,
  },
  noteSuspEmptyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#7D88AD',
    textAlign: 'center',
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  noteSuspCard: {
    backgroundColor: '#111A34',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  noteSuspCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  noteSuspTypePill: {
    backgroundColor: '#0E1A2E',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  noteSuspTypePillText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10,
    color: '#3B82F6',
  },
  noteSuspDateText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10,
    color: '#475569',
  },
  noteSuspLineText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  noteSuspLineLabel: {
    color: '#64748B',
  },
  noteSuspInputValue: {
    color: '#94A3B8',
  },
  noteSuspOutputValue: {
    color: '#F0F4FF',
  },
});

