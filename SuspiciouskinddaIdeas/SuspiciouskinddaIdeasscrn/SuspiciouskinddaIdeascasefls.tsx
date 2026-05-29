import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import {useSuspiciouskinddaIdeasCases} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeascasesStore';

type SuspiciouskinddaIdeascaseflsSegment = 'active' | 'saved';

const SuspiciouskinddaIdeascasefls = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const [suspiciouskinddaSegment, setSuspiciouskinddaSegment] =
    useState<SuspiciouskinddaIdeascaseflsSegment>('active');

  const {suspiciouskinddaCases, suspiciouskinddaProgressById} =
    useSuspiciouskinddaIdeasCases();

  const suspiciouskinddaOpenCount = suspiciouskinddaCases.filter(
    suspiciouskinddaItem => {
      const suspiciouskinddaProgress =
        suspiciouskinddaProgressById[suspiciouskinddaItem.suspiciouskinddaCaseId];
      return (
        !suspiciouskinddaProgress?.suspiciouskinddaCaseIsSolved &&
        !suspiciouskinddaProgress?.suspiciouskinddaCaseIsSaved
      );
    },
  ).length;

  const suspiciouskinddaSolvedCases = suspiciouskinddaCases.filter(
    suspiciouskinddaItem =>
      suspiciouskinddaProgressById[suspiciouskinddaItem.suspiciouskinddaCaseId]
        ?.suspiciouskinddaCaseIsSolved,
  );
  const suspiciouskinddaSolvedCount = suspiciouskinddaSolvedCases.length;
  const suspiciouskinddaCorrectSolvedCount = suspiciouskinddaSolvedCases.filter(
    suspiciouskinddaItem => {
      const suspiciouskinddaProgress =
        suspiciouskinddaProgressById[suspiciouskinddaItem.suspiciouskinddaCaseId];
      return (
        suspiciouskinddaProgress?.suspiciouskinddaCaseYourVerdict ===
        suspiciouskinddaItem.suspiciouskinddaCaseVerdict
      );
    },
  ).length;
  const suspiciouskinddaAccuracyPercent =
    suspiciouskinddaSolvedCount > 0
      ? Math.round(
          (suspiciouskinddaCorrectSolvedCount / suspiciouskinddaSolvedCount) *
            100,
        )
      : 0;

  const suspiciouskinddaVisibleCases =
    suspiciouskinddaSegment === 'active'
      ? suspiciouskinddaCases.filter(suspiciouskinddaItem => {
          const suspiciouskinddaProgress =
            suspiciouskinddaProgressById[
              suspiciouskinddaItem.suspiciouskinddaCaseId
            ];
          return !suspiciouskinddaProgress?.suspiciouskinddaCaseIsSaved;
        })
      : suspiciouskinddaCases.filter(suspiciouskinddaItem => {
          const suspiciouskinddaProgress =
            suspiciouskinddaProgressById[
              suspiciouskinddaItem.suspiciouskinddaCaseId
            ];
          return !!suspiciouskinddaProgress?.suspiciouskinddaCaseIsSaved;
        });

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <View style={styles.suspiciouskinddaHeaderRow}>
          <Text style={styles.suspiciouskinddaHeaderTitle}>Case Files</Text>
        </View>

        <View style={styles.suspiciouskinddaStatsRow}>
          <View style={styles.suspiciouskinddaStatCard}>
            <Text
              style={[
                styles.suspiciouskinddaStatValue,
                styles.suspiciouskinddaStatValueOpen,
              ]}>
              {suspiciouskinddaOpenCount}
            </Text>
            <Text style={styles.suspiciouskinddaStatLabel}>OPEN</Text>
          </View>
          <View style={styles.suspiciouskinddaStatCard}>
            <Text
              style={[
                styles.suspiciouskinddaStatValue,
                styles.suspiciouskinddaStatValueSolved,
              ]}>
              {suspiciouskinddaSolvedCount}
            </Text>
            <Text style={styles.suspiciouskinddaStatLabel}>SOLVED</Text>
          </View>
          <View style={styles.suspiciouskinddaStatCard}>
            <Text
              style={[
                styles.suspiciouskinddaStatValue,
                styles.suspiciouskinddaStatValueAccuracy,
              ]}>
              {suspiciouskinddaAccuracyPercent}%
            </Text>
            <Text style={styles.suspiciouskinddaStatLabel}>ACCURACY</Text>
          </View>
        </View>

        <View style={styles.suspiciouskinddaSegmentOuter}>
          <Pressable
            onPress={() => setSuspiciouskinddaSegment('active')}
            style={[
              styles.suspiciouskinddaSegmentItem,
              suspiciouskinddaSegment === 'active' &&
                styles.suspiciouskinddaSegmentItemActive,
            ]}>
            <Text
              style={[
                styles.suspiciouskinddaSegmentText,
                suspiciouskinddaSegment === 'active' &&
                  styles.suspiciouskinddaSegmentTextActive,
              ]}>
              Active
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSuspiciouskinddaSegment('saved')}
            style={[
              styles.suspiciouskinddaSegmentItem,
              suspiciouskinddaSegment === 'saved' &&
                styles.suspiciouskinddaSegmentItemActive,
            ]}>
            <Text
              style={[
                styles.suspiciouskinddaSegmentText,
                suspiciouskinddaSegment === 'saved' &&
                  styles.suspiciouskinddaSegmentTextActive,
              ]}>
              Saved
            </Text>
          </Pressable>
        </View>

        <View style={styles.suspiciouskinddaCardList}>
          {suspiciouskinddaVisibleCases.map(suspiciouskinddaItem => {
            const suspiciouskinddaProgress =
              suspiciouskinddaProgressById[
                suspiciouskinddaItem.suspiciouskinddaCaseId
              ];
            const suspiciouskinddaSolved =
              !!suspiciouskinddaProgress?.suspiciouskinddaCaseIsSolved;
            const suspiciouskinddaCorrect =
              suspiciouskinddaProgress?.suspiciouskinddaCaseYourVerdict ===
              suspiciouskinddaItem.suspiciouskinddaCaseVerdict;

            return (
              <View
                key={suspiciouskinddaItem.suspiciouskinddaCaseId}
                style={styles.suspiciouskinddaCaseCardWrap}>
                <LinearGradient
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={styles.suspiciouskinddaCaseCardGradient}>
                  <View style={styles.suspiciouskinddaCaseCardContent}>
                    <View style={styles.suspiciouskinddaCaseTopRow}>
                      <View style={styles.suspiciouskinddaTagPill}>
                        <Text style={styles.suspiciouskinddaTagText}>
                          {suspiciouskinddaItem.suspiciouskinddaCaseTag}
                        </Text>
                      </View>

                      {suspiciouskinddaSegment === 'saved' &&
                      suspiciouskinddaSolved ? (
                        <View
                          style={[
                            styles.suspiciouskinddaResultPill,
                            suspiciouskinddaCorrect
                              ? styles.suspiciouskinddaResultPillCorrect
                              : styles.suspiciouskinddaResultPillWrong,
                          ]}>
                          <Text
                            style={[
                              styles.suspiciouskinddaResultPillText,
                              suspiciouskinddaCorrect
                                ? styles.suspiciouskinddaResultPillTextCorrect
                                : styles.suspiciouskinddaResultPillTextWrong,
                            ]}>
                            {suspiciouskinddaCorrect ? 'CORRECT' : 'WRONG'}
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    <Text style={styles.suspiciouskinddaCaseTitle}>
                      {suspiciouskinddaItem.suspiciouskinddaCaseTitle}
                    </Text>
                    {suspiciouskinddaSegment === 'saved' &&
                    suspiciouskinddaSolved ? (
                      <Text style={styles.suspiciouskinddaSavedYourCall}>
                        Your call:{' '}
                        <Text
                          style={[
                            styles.suspiciouskinddaSavedYourCallValue,
                            suspiciouskinddaProgress?.suspiciouskinddaCaseYourVerdict ===
                            'not_suspicious'
                              ? styles.suspiciouskinddaSavedYourCallValueGreen
                              : styles.suspiciouskinddaSavedYourCallValueRed,
                          ]}>
                          {suspiciouskinddaProgress?.suspiciouskinddaCaseYourVerdict ===
                          'not_suspicious'
                            ? 'NOT SUSPICIOUS'
                            : 'SUSPICIOUS'}
                        </Text>
                      </Text>
                    ) : (
                      <Text style={styles.suspiciouskinddaCaseSummary}>
                        {suspiciouskinddaItem.suspiciouskinddaCaseMainQuestion}
                      </Text>
                    )}

                    <View style={styles.suspiciouskinddaDivider} />

                    <Pressable
                      onPress={() => {
                        suspiciouskinddaNavigation.navigate(
                          'SuspiciouskinddaIdeascasefile',
                          {
                            suspiciouskinddaCaseId:
                              suspiciouskinddaItem.suspiciouskinddaCaseId,
                          },
                        );
                      }}
                      hitSlop={6}
                      style={styles.suspiciouskinddaOpenRow}>
                      <Text style={styles.suspiciouskinddaOpenText}>
                        OPEN CASE
                      </Text>
                      <Text style={styles.suspiciouskinddaOpenArrow}>›</Text>
                    </Pressable>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </View>
      </View>
    </SuspiciouskinddaIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaRoot: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  suspiciouskinddaHeaderRow: {
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  suspiciouskinddaHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },

  suspiciouskinddaStatsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 18,
  },
  suspiciouskinddaStatCard: {
    flex: 1,
    height: 58,
    paddingHorizontal: 13,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    justifyContent: 'center',
    gap: 2,
  },
  suspiciouskinddaStatValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
  },
  suspiciouskinddaStatValueOpen: {color: '#2EB3FF'},
  suspiciouskinddaStatValueSolved: {color: '#F7C948'},
  suspiciouskinddaStatValueAccuracy: {color: '#2DB86B'},
  suspiciouskinddaStatLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },

  suspiciouskinddaSegmentOuter: {
    height: 53,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1A2347',
    backgroundColor: 'rgba(15,23,48,0.7)',
    flexDirection: 'row',
    padding: 6,
    marginBottom: 18,
  },
  suspiciouskinddaSegmentItem: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaSegmentItemActive: {
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  suspiciouskinddaSegmentText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#4A5478',
  },
  suspiciouskinddaSegmentTextActive: {
    color: '#FFFFFF',
  },

  suspiciouskinddaCardList: {
    gap: 16,
    paddingBottom: 80,
  },
  suspiciouskinddaCaseCardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  suspiciouskinddaCaseCardGradient: {
    borderRadius: 20,
  },
  suspiciouskinddaCaseCardContent: {
    padding: 19,
  },
  suspiciouskinddaCaseTopRow: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  suspiciouskinddaTagPill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
  },
  suspiciouskinddaTagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  suspiciouskinddaDifficultyPill: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  suspiciouskinddaDifficultyText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
  },
  suspiciouskinddaResultPill: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#141D3A',
    borderWidth: 1,
  },
  suspiciouskinddaResultPillCorrect: {
    borderColor: '#4ADE80',
  },
  suspiciouskinddaResultPillWrong: {
    borderColor: '#FF5A6E',
  },
  suspiciouskinddaResultPillText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  suspiciouskinddaResultPillTextCorrect: {color: '#4ADE80'},
  suspiciouskinddaResultPillTextWrong: {color: '#FF5A6E'},
  suspiciouskinddaCaseTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 6,
  },
  suspiciouskinddaCaseSummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
    marginBottom: 14,
  },
  suspiciouskinddaSavedYourCall: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
    marginBottom: 14,
  },
  suspiciouskinddaSavedYourCallValue: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
    letterSpacing: 0.4,
  },
  suspiciouskinddaSavedYourCallValueRed: {color: '#FF5A6E'},
  suspiciouskinddaSavedYourCallValueGreen: {color: '#4ADE80'},
  suspiciouskinddaDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12,
  },
  suspiciouskinddaOpenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  suspiciouskinddaOpenText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  suspiciouskinddaOpenArrow: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2EB3FF',
    marginTop: -1,
  },
});

export default SuspiciouskinddaIdeascasefls;
