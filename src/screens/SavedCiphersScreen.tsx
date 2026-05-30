import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {BackgroundScreen} from '../components/BackgroundScreen';
import {
  formatSavedDate,
  loadSavedCiphers,
  type SavedCipher,
} from '../storage/cipherStorage';
import {cipherTypeLabels} from '../data/cipherUtils';

export function SavedCiphersScreen() {
  const navigation = useNavigation<any>();
  const [savedCiphers, setSavedCiphers] =
    useState<SavedCipher[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      loadSavedCiphers().then(items => {
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
    <BackgroundScreen>
      <View style={styles.root}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Solved Ciphers</Text>
        </View>

        {savedCiphers.length === 0 ? (
          <Text style={styles.emptyText}>
            No saved ciphers yet. Encode or decode something in Cipher Lab and tap
            Save.
          </Text>
        ) : (
          <View style={styles.listContent}>
            {savedCiphers.map(item => (
              <View
                key={item.id}
                style={styles.card}>
                <View style={styles.cardTopRow}>
                  <View style={styles.typePill}>
                    <Text style={styles.typePillText}>
                      {cipherTypeLabels[
                        item.cipherType
                      ]}{' '}
                      · {item.mode}
                    </Text>
                  </View>
                  <Text style={styles.dateText}>
                    {formatSavedDate(
                      item.savedAt,
                    )}
                  </Text>
                </View>

                <Text style={styles.lineText} numberOfLines={2}>
                  <Text style={styles.lineLabel}>Input: </Text>
                  <Text style={styles.inputValue}>
                    {item.input}
                  </Text>
                </Text>

                <Text style={styles.lineText} numberOfLines={2}>
                  <Text style={styles.lineLabel}>Output: </Text>
                  <Text style={styles.outputValue}>
                    {item.output}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
  },
  listContent: {
    gap: 12,
    paddingBottom: 24,
  },
  emptyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#7D88AD',
    textAlign: 'center',
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: '#111A34',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  typePill: {
    backgroundColor: '#0E1A2E',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  typePillText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10,
    color: '#3B82F6',
  },
  dateText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10,
    color: '#475569',
  },
  lineText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  lineLabel: {
    color: '#64748B',
  },
  inputValue: {
    color: '#94A3B8',
  },
  outputValue: {
    color: '#F0F4FF',
  },
});

