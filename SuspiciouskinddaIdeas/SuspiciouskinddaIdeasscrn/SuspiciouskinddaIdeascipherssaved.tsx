import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import {
  suspiciouskinddaIdeasFormatSavedDate,
  suspiciouskinddaIdeasLoadSavedCiphers,
  type SuspiciouskinddaIdeasSavedCipher,
} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeascipherStorage';
import {suspiciouskinddaIdeasCipherTypeLabels} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeascipherUtils';

const SuspiciouskinddaIdeascipherssaved = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const [suspiciouskinddaSavedCiphers, setSuspiciouskinddaSavedCiphers] =
    useState<SuspiciouskinddaIdeasSavedCipher[]>([]);

  useFocusEffect(
    useCallback(() => {
      let suspiciouskinddaIsActive = true;

      suspiciouskinddaIdeasLoadSavedCiphers().then(suspiciouskinddaItems => {
        if (suspiciouskinddaIsActive) {
          setSuspiciouskinddaSavedCiphers(suspiciouskinddaItems);
        }
      });

      return () => {
        suspiciouskinddaIsActive = false;
      };
    }, []),
  );

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <View style={styles.suspiciouskinddaHeaderRow}>
          <Pressable
            onPress={() => suspiciouskinddaNavigation.goBack()}
            style={styles.suspiciouskinddaBackBtn}>
            <Text style={styles.suspiciouskinddaBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.suspiciouskinddaHeaderTitle}>Solved Ciphers</Text>
        </View>

        {suspiciouskinddaSavedCiphers.length === 0 ? (
          <Text style={styles.suspiciouskinddaEmptyText}>
            No saved ciphers yet. Encode or decode something in Cipher Lab and tap
            Save.
          </Text>
        ) : (
          <View style={styles.suspiciouskinddaListContent}>
            {suspiciouskinddaSavedCiphers.map(suspiciouskinddaItem => (
              <View
                key={suspiciouskinddaItem.suspiciouskinddaCipherId}
                style={styles.suspiciouskinddaCard}>
                <View style={styles.suspiciouskinddaCardTopRow}>
                  <View style={styles.suspiciouskinddaTypePill}>
                    <Text style={styles.suspiciouskinddaTypePillText}>
                      {suspiciouskinddaIdeasCipherTypeLabels[
                        suspiciouskinddaItem.suspiciouskinddaCipherType
                      ]}{' '}
                      · {suspiciouskinddaItem.suspiciouskinddaCipherMode}
                    </Text>
                  </View>
                  <Text style={styles.suspiciouskinddaDateText}>
                    {suspiciouskinddaIdeasFormatSavedDate(
                      suspiciouskinddaItem.suspiciouskinddaCipherSavedAt,
                    )}
                  </Text>
                </View>

                <Text style={styles.suspiciouskinddaLineText} numberOfLines={2}>
                  <Text style={styles.suspiciouskinddaLineLabel}>Input: </Text>
                  <Text style={styles.suspiciouskinddaInputValue}>
                    {suspiciouskinddaItem.suspiciouskinddaCipherInput}
                  </Text>
                </Text>

                <Text style={styles.suspiciouskinddaLineText} numberOfLines={2}>
                  <Text style={styles.suspiciouskinddaLineLabel}>Output: </Text>
                  <Text style={styles.suspiciouskinddaOutputValue}>
                    {suspiciouskinddaItem.suspiciouskinddaCipherOutput}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </SuspiciouskinddaIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaRoot: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  suspiciouskinddaHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  suspiciouskinddaBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaBackIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
  },
  suspiciouskinddaHeaderTitle: {
    flex: 1,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
  },
  suspiciouskinddaListContent: {
    gap: 12,
    paddingBottom: 24,
  },
  suspiciouskinddaEmptyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#7D88AD',
    textAlign: 'center',
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  suspiciouskinddaCard: {
    backgroundColor: '#111A34',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  suspiciouskinddaCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  suspiciouskinddaTypePill: {
    backgroundColor: '#0E1A2E',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  suspiciouskinddaTypePillText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10,
    color: '#3B82F6',
  },
  suspiciouskinddaDateText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10,
    color: '#475569',
  },
  suspiciouskinddaLineText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  suspiciouskinddaLineLabel: {
    color: '#64748B',
  },
  suspiciouskinddaInputValue: {
    color: '#94A3B8',
  },
  suspiciouskinddaOutputValue: {
    color: '#F0F4FF',
  },
});

export default SuspiciouskinddaIdeascipherssaved;
