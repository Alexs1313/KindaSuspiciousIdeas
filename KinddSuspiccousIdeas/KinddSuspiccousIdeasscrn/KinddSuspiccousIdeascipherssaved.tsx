import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import {
  kinddSuspiccousIdeasFormatSavedDate,
  kinddSuspiccousIdeasLoadSavedCiphers,
  type KinddSuspiccousIdeasSavedCipher,
} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeascipherStorage';
import {kinddSuspiccousIdeasCipherTypeLabels} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeascipherUtils';

const KinddSuspiccousIdeascipherssaved = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const [kinddSuspiccousSavedCiphers, setKinddSuspiccousSavedCiphers] =
    useState<KinddSuspiccousIdeasSavedCipher[]>([]);

  useFocusEffect(
    useCallback(() => {
      let kinddSuspiccousIsActive = true;

      kinddSuspiccousIdeasLoadSavedCiphers().then(kinddSuspiccousItems => {
        if (kinddSuspiccousIsActive) {
          setKinddSuspiccousSavedCiphers(kinddSuspiccousItems);
        }
      });

      return () => {
        kinddSuspiccousIsActive = false;
      };
    }, []),
  );

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <View style={styles.kinddSuspiccousHeaderRow}>
          <Pressable
            onPress={() => kinddSuspiccousNavigation.goBack()}
            style={styles.kinddSuspiccousBackBtn}>
            <Text style={styles.kinddSuspiccousBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.kinddSuspiccousHeaderTitle}>Solved Ciphers</Text>
        </View>

        {kinddSuspiccousSavedCiphers.length === 0 ? (
          <Text style={styles.kinddSuspiccousEmptyText}>
            No saved ciphers yet. Encode or decode something in Cipher Lab and tap
            Save.
          </Text>
        ) : (
          <View style={styles.kinddSuspiccousListContent}>
            {kinddSuspiccousSavedCiphers.map(kinddSuspiccousItem => (
              <View
                key={kinddSuspiccousItem.kinddSuspiccousCipherId}
                style={styles.kinddSuspiccousCard}>
                <View style={styles.kinddSuspiccousCardTopRow}>
                  <View style={styles.kinddSuspiccousTypePill}>
                    <Text style={styles.kinddSuspiccousTypePillText}>
                      {kinddSuspiccousIdeasCipherTypeLabels[
                        kinddSuspiccousItem.kinddSuspiccousCipherType
                      ]}{' '}
                      · {kinddSuspiccousItem.kinddSuspiccousCipherMode}
                    </Text>
                  </View>
                  <Text style={styles.kinddSuspiccousDateText}>
                    {kinddSuspiccousIdeasFormatSavedDate(
                      kinddSuspiccousItem.kinddSuspiccousCipherSavedAt,
                    )}
                  </Text>
                </View>

                <Text style={styles.kinddSuspiccousLineText} numberOfLines={2}>
                  <Text style={styles.kinddSuspiccousLineLabel}>Input: </Text>
                  <Text style={styles.kinddSuspiccousInputValue}>
                    {kinddSuspiccousItem.kinddSuspiccousCipherInput}
                  </Text>
                </Text>

                <Text style={styles.kinddSuspiccousLineText} numberOfLines={2}>
                  <Text style={styles.kinddSuspiccousLineLabel}>Output: </Text>
                  <Text style={styles.kinddSuspiccousOutputValue}>
                    {kinddSuspiccousItem.kinddSuspiccousCipherOutput}
                  </Text>
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </KinddSuspiccousIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousRoot: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  kinddSuspiccousHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  kinddSuspiccousBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousBackIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
  },
  kinddSuspiccousHeaderTitle: {
    flex: 1,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
  },
  kinddSuspiccousListContent: {
    gap: 12,
    paddingBottom: 24,
  },
  kinddSuspiccousEmptyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#7D88AD',
    textAlign: 'center',
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  kinddSuspiccousCard: {
    backgroundColor: '#111A34',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },
  kinddSuspiccousCardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  kinddSuspiccousTypePill: {
    backgroundColor: '#0E1A2E',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  kinddSuspiccousTypePillText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10,
    color: '#3B82F6',
  },
  kinddSuspiccousDateText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10,
    color: '#475569',
  },
  kinddSuspiccousLineText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  kinddSuspiccousLineLabel: {
    color: '#64748B',
  },
  kinddSuspiccousInputValue: {
    color: '#94A3B8',
  },
  kinddSuspiccousOutputValue: {
    color: '#F0F4FF',
  },
});

export default KinddSuspiccousIdeascipherssaved;
