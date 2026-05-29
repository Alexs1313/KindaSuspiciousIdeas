import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import {useKinddSuspiccousIdeasCases} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeascasesStore';

type KinddSuspiccousIdeascaseflsSegment = 'active' | 'saved';

const KinddSuspiccousIdeascasefls = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const [kinddSuspiccousSegment, setKinddSuspiccousSegment] =
    useState<KinddSuspiccousIdeascaseflsSegment>('active');

  const {kinddSuspiccousCases, kinddSuspiccousProgressById} =
    useKinddSuspiccousIdeasCases();

  const kinddSuspiccousOpenCount = kinddSuspiccousCases.filter(
    kinddSuspiccousItem => {
      const kinddSuspiccousProgress =
        kinddSuspiccousProgressById[kinddSuspiccousItem.kinddSuspiccousCaseId];
      return (
        !kinddSuspiccousProgress?.kinddSuspiccousCaseIsSolved &&
        !kinddSuspiccousProgress?.kinddSuspiccousCaseIsSaved
      );
    },
  ).length;

  const kinddSuspiccousSolvedCases = kinddSuspiccousCases.filter(
    kinddSuspiccousItem =>
      kinddSuspiccousProgressById[kinddSuspiccousItem.kinddSuspiccousCaseId]
        ?.kinddSuspiccousCaseIsSolved,
  );
  const kinddSuspiccousSolvedCount = kinddSuspiccousSolvedCases.length;
  const kinddSuspiccousCorrectSolvedCount = kinddSuspiccousSolvedCases.filter(
    kinddSuspiccousItem => {
      const kinddSuspiccousProgress =
        kinddSuspiccousProgressById[kinddSuspiccousItem.kinddSuspiccousCaseId];
      return (
        kinddSuspiccousProgress?.kinddSuspiccousCaseYourVerdict ===
        kinddSuspiccousItem.kinddSuspiccousCaseVerdict
      );
    },
  ).length;
  const kinddSuspiccousAccuracyPercent =
    kinddSuspiccousSolvedCount > 0
      ? Math.round(
          (kinddSuspiccousCorrectSolvedCount / kinddSuspiccousSolvedCount) *
            100,
        )
      : 0;

  const kinddSuspiccousVisibleCases =
    kinddSuspiccousSegment === 'active'
      ? kinddSuspiccousCases.filter(kinddSuspiccousItem => {
          const kinddSuspiccousProgress =
            kinddSuspiccousProgressById[
              kinddSuspiccousItem.kinddSuspiccousCaseId
            ];
          return !kinddSuspiccousProgress?.kinddSuspiccousCaseIsSaved;
        })
      : kinddSuspiccousCases.filter(kinddSuspiccousItem => {
          const kinddSuspiccousProgress =
            kinddSuspiccousProgressById[
              kinddSuspiccousItem.kinddSuspiccousCaseId
            ];
          return !!kinddSuspiccousProgress?.kinddSuspiccousCaseIsSaved;
        });

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <View style={styles.kinddSuspiccousHeaderRow}>
          <Text style={styles.kinddSuspiccousHeaderTitle}>Case Files</Text>
        </View>

        <View style={styles.kinddSuspiccousStatsRow}>
          <View style={styles.kinddSuspiccousStatCard}>
            <Text
              style={[
                styles.kinddSuspiccousStatValue,
                styles.kinddSuspiccousStatValueOpen,
              ]}>
              {kinddSuspiccousOpenCount}
            </Text>
            <Text style={styles.kinddSuspiccousStatLabel}>OPEN</Text>
          </View>
          <View style={styles.kinddSuspiccousStatCard}>
            <Text
              style={[
                styles.kinddSuspiccousStatValue,
                styles.kinddSuspiccousStatValueSolved,
              ]}>
              {kinddSuspiccousSolvedCount}
            </Text>
            <Text style={styles.kinddSuspiccousStatLabel}>SOLVED</Text>
          </View>
          <View style={styles.kinddSuspiccousStatCard}>
            <Text
              style={[
                styles.kinddSuspiccousStatValue,
                styles.kinddSuspiccousStatValueAccuracy,
              ]}>
              {kinddSuspiccousAccuracyPercent}%
            </Text>
            <Text style={styles.kinddSuspiccousStatLabel}>ACCURACY</Text>
          </View>
        </View>

        <View style={styles.kinddSuspiccousSegmentOuter}>
          <Pressable
            onPress={() => setKinddSuspiccousSegment('active')}
            style={[
              styles.kinddSuspiccousSegmentItem,
              kinddSuspiccousSegment === 'active' &&
                styles.kinddSuspiccousSegmentItemActive,
            ]}>
            <Text
              style={[
                styles.kinddSuspiccousSegmentText,
                kinddSuspiccousSegment === 'active' &&
                  styles.kinddSuspiccousSegmentTextActive,
              ]}>
              Active
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setKinddSuspiccousSegment('saved')}
            style={[
              styles.kinddSuspiccousSegmentItem,
              kinddSuspiccousSegment === 'saved' &&
                styles.kinddSuspiccousSegmentItemActive,
            ]}>
            <Text
              style={[
                styles.kinddSuspiccousSegmentText,
                kinddSuspiccousSegment === 'saved' &&
                  styles.kinddSuspiccousSegmentTextActive,
              ]}>
              Saved
            </Text>
          </Pressable>
        </View>

        <View style={styles.kinddSuspiccousCardList}>
          {kinddSuspiccousVisibleCases.map(kinddSuspiccousItem => {
            const kinddSuspiccousProgress =
              kinddSuspiccousProgressById[
                kinddSuspiccousItem.kinddSuspiccousCaseId
              ];
            const kinddSuspiccousSolved =
              !!kinddSuspiccousProgress?.kinddSuspiccousCaseIsSolved;
            const kinddSuspiccousCorrect =
              kinddSuspiccousProgress?.kinddSuspiccousCaseYourVerdict ===
              kinddSuspiccousItem.kinddSuspiccousCaseVerdict;

            return (
              <View
                key={kinddSuspiccousItem.kinddSuspiccousCaseId}
                style={styles.kinddSuspiccousCaseCardWrap}>
                <LinearGradient
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={styles.kinddSuspiccousCaseCardGradient}>
                  <View style={styles.kinddSuspiccousCaseCardContent}>
                    <View style={styles.kinddSuspiccousCaseTopRow}>
                      <View style={styles.kinddSuspiccousTagPill}>
                        <Text style={styles.kinddSuspiccousTagText}>
                          {kinddSuspiccousItem.kinddSuspiccousCaseTag}
                        </Text>
                      </View>

                      {kinddSuspiccousSegment === 'saved' &&
                      kinddSuspiccousSolved ? (
                        <View
                          style={[
                            styles.kinddSuspiccousResultPill,
                            kinddSuspiccousCorrect
                              ? styles.kinddSuspiccousResultPillCorrect
                              : styles.kinddSuspiccousResultPillWrong,
                          ]}>
                          <Text
                            style={[
                              styles.kinddSuspiccousResultPillText,
                              kinddSuspiccousCorrect
                                ? styles.kinddSuspiccousResultPillTextCorrect
                                : styles.kinddSuspiccousResultPillTextWrong,
                            ]}>
                            {kinddSuspiccousCorrect ? 'CORRECT' : 'WRONG'}
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    <Text style={styles.kinddSuspiccousCaseTitle}>
                      {kinddSuspiccousItem.kinddSuspiccousCaseTitle}
                    </Text>
                    {kinddSuspiccousSegment === 'saved' &&
                    kinddSuspiccousSolved ? (
                      <Text style={styles.kinddSuspiccousSavedYourCall}>
                        Your call:{' '}
                        <Text
                          style={[
                            styles.kinddSuspiccousSavedYourCallValue,
                            kinddSuspiccousProgress?.kinddSuspiccousCaseYourVerdict ===
                            'not_suspicious'
                              ? styles.kinddSuspiccousSavedYourCallValueGreen
                              : styles.kinddSuspiccousSavedYourCallValueRed,
                          ]}>
                          {kinddSuspiccousProgress?.kinddSuspiccousCaseYourVerdict ===
                          'not_suspicious'
                            ? 'NOT SUSPICIOUS'
                            : 'SUSPICIOUS'}
                        </Text>
                      </Text>
                    ) : (
                      <Text style={styles.kinddSuspiccousCaseSummary}>
                        {kinddSuspiccousItem.kinddSuspiccousCaseMainQuestion}
                      </Text>
                    )}

                    <View style={styles.kinddSuspiccousDivider} />

                    <Pressable
                      onPress={() => {
                        kinddSuspiccousNavigation.navigate(
                          'KinddSuspiccousIdeascasefile',
                          {
                            kinddSuspiccousCaseId:
                              kinddSuspiccousItem.kinddSuspiccousCaseId,
                          },
                        );
                      }}
                      hitSlop={6}
                      style={styles.kinddSuspiccousOpenRow}>
                      <Text style={styles.kinddSuspiccousOpenText}>
                        OPEN CASE
                      </Text>
                      <Text style={styles.kinddSuspiccousOpenArrow}>›</Text>
                    </Pressable>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </View>
      </View>
    </KinddSuspiccousIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousRoot: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  kinddSuspiccousHeaderRow: {
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  kinddSuspiccousHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },

  kinddSuspiccousStatsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 18,
  },
  kinddSuspiccousStatCard: {
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
  kinddSuspiccousStatValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
  },
  kinddSuspiccousStatValueOpen: {color: '#2EB3FF'},
  kinddSuspiccousStatValueSolved: {color: '#F7C948'},
  kinddSuspiccousStatValueAccuracy: {color: '#2DB86B'},
  kinddSuspiccousStatLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },

  kinddSuspiccousSegmentOuter: {
    height: 53,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1A2347',
    backgroundColor: 'rgba(15,23,48,0.7)',
    flexDirection: 'row',
    padding: 6,
    marginBottom: 18,
  },
  kinddSuspiccousSegmentItem: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousSegmentItemActive: {
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  kinddSuspiccousSegmentText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#4A5478',
  },
  kinddSuspiccousSegmentTextActive: {
    color: '#FFFFFF',
  },

  kinddSuspiccousCardList: {
    gap: 16,
    paddingBottom: 80,
  },
  kinddSuspiccousCaseCardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  kinddSuspiccousCaseCardGradient: {
    borderRadius: 20,
  },
  kinddSuspiccousCaseCardContent: {
    padding: 19,
  },
  kinddSuspiccousCaseTopRow: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  kinddSuspiccousTagPill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
  },
  kinddSuspiccousTagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  kinddSuspiccousDifficultyPill: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  kinddSuspiccousDifficultyText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
  },
  kinddSuspiccousResultPill: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#141D3A',
    borderWidth: 1,
  },
  kinddSuspiccousResultPillCorrect: {
    borderColor: '#4ADE80',
  },
  kinddSuspiccousResultPillWrong: {
    borderColor: '#FF5A6E',
  },
  kinddSuspiccousResultPillText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  kinddSuspiccousResultPillTextCorrect: {color: '#4ADE80'},
  kinddSuspiccousResultPillTextWrong: {color: '#FF5A6E'},
  kinddSuspiccousCaseTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 6,
  },
  kinddSuspiccousCaseSummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
    marginBottom: 14,
  },
  kinddSuspiccousSavedYourCall: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
    marginBottom: 14,
  },
  kinddSuspiccousSavedYourCallValue: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
    letterSpacing: 0.4,
  },
  kinddSuspiccousSavedYourCallValueRed: {color: '#FF5A6E'},
  kinddSuspiccousSavedYourCallValueGreen: {color: '#4ADE80'},
  kinddSuspiccousDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12,
  },
  kinddSuspiccousOpenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  kinddSuspiccousOpenText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  kinddSuspiccousOpenArrow: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2EB3FF',
    marginTop: -1,
  },
});

export default KinddSuspiccousIdeascasefls;
