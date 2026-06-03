import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {useNoteSuspCases} from '../noteSuspCtx/NoteSuspCasesContext';
import {noteSuspNavigateRootScreen} from '../noteSuspNav/NoteSuspRootNavigation';

type CasesScreenSegment = 'active' | 'saved';

export function NoteSuspCasesScreen() {
  const navigation = useNavigation<any>();
  const [segment, setSegment] =
    useState<CasesScreenSegment>('active');

  const {cases, progressById} =
    useNoteSuspCases();

  const openCount = cases.filter(
    item => {
      const progress =
        progressById[item.caseId];
      return (
        !progress?.isSolved &&
        !progress?.isSaved
      );
    },
  ).length;

  const solvedCases = cases.filter(
    item =>
      progressById[item.caseId]
        ?.isSolved,
  );
  const solvedCount = solvedCases.length;
  const correctSolvedCount = solvedCases.filter(
    item => {
      const progress =
        progressById[item.caseId];
      return (
        progress?.yourVerdict ===
        item.verdict
      );
    },
  ).length;
  const accuracyPercent =
    solvedCount > 0
      ? Math.round(
          (correctSolvedCount / solvedCount) *
            100,
        )
      : 0;

  const visibleCases =
    segment === 'active'
      ? cases.filter(item => {
          const progress =
            progressById[
              item.caseId
            ];
          return !progress?.isSaved;
        })
      : cases.filter(item => {
          const progress =
            progressById[
              item.caseId
            ];
          return !!progress?.isSaved;
        });

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <View style={styles.noteSuspHeaderRow}>
          <Text style={styles.noteSuspHeaderTitle}>Case Files</Text>
        </View>

        <View style={styles.noteSuspStatsRow}>
          <View style={styles.noteSuspStatCard}>
            <Text
              style={[
                styles.noteSuspStatValue,
                styles.noteSuspStatValueOpen,
              ]}>
              {openCount}
            </Text>
            <Text style={styles.noteSuspStatLabel}>OPEN</Text>
          </View>
          <View style={styles.noteSuspStatCard}>
            <Text
              style={[
                styles.noteSuspStatValue,
                styles.noteSuspStatValueSolved,
              ]}>
              {solvedCount}
            </Text>
            <Text style={styles.noteSuspStatLabel}>SOLVED</Text>
          </View>
          <View style={styles.noteSuspStatCard}>
            <Text
              style={[
                styles.noteSuspStatValue,
                styles.noteSuspStatValueAccuracy,
              ]}>
              {accuracyPercent}%
            </Text>
            <Text style={styles.noteSuspStatLabel}>ACCURACY</Text>
          </View>
        </View>

        <View style={styles.noteSuspSegmentOuter}>
          <Pressable
            onPress={() => setSegment('active')}
            style={[
              styles.noteSuspSegmentItem,
              segment === 'active' &&
                styles.noteSuspSegmentItemActive,
            ]}>
            <Text
              style={[
                styles.noteSuspSegmentText,
                segment === 'active' &&
                  styles.noteSuspSegmentTextActive,
              ]}>
              Active
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSegment('saved')}
            style={[
              styles.noteSuspSegmentItem,
              segment === 'saved' &&
                styles.noteSuspSegmentItemActive,
            ]}>
            <Text
              style={[
                styles.noteSuspSegmentText,
                segment === 'saved' &&
                  styles.noteSuspSegmentTextActive,
              ]}>
              Saved
            </Text>
          </Pressable>
        </View>

        <View style={styles.noteSuspCardList}>
          {visibleCases.map(item => {
            const progress =
              progressById[
                item.caseId
              ];
            const solved =
              !!progress?.isSolved;
            const correct =
              progress?.yourVerdict ===
              item.verdict;

            return (
              <View
                key={item.caseId}
                style={styles.noteSuspCaseCardWrap}>
                <LinearGradient
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={styles.noteSuspCaseCardGradient}>
                  <View style={styles.noteSuspCaseCardContent}>
                    <View style={styles.noteSuspCaseTopRow}>
                      <View style={styles.noteSuspTagPill}>
                        <Text style={styles.noteSuspTagText}>
                          {item.tag}
                        </Text>
                      </View>

                      {segment === 'saved' &&
                      solved ? (
                        <View
                          style={[
                            styles.noteSuspResultPill,
                            correct
                              ? styles.noteSuspResultPillCorrect
                              : styles.noteSuspResultPillWrong,
                          ]}>
                          <Text
                            style={[
                              styles.noteSuspResultPillText,
                              correct
                                ? styles.noteSuspResultPillTextCorrect
                                : styles.noteSuspResultPillTextWrong,
                            ]}>
                            {correct ? 'CORRECT' : 'WRONG'}
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    <Text style={styles.noteSuspTitle}>
                      {item.title}
                    </Text>
                    {segment === 'saved' &&
                    solved ? (
                      <Text style={styles.noteSuspSavedYourCall}>
                        Your call:{' '}
                        <Text
                          style={[
                            styles.noteSuspSavedYourCallValue,
                            progress?.yourVerdict ===
                            'not_suspicious'
                              ? styles.noteSuspSavedYourCallValueGreen
                              : styles.noteSuspSavedYourCallValueRed,
                          ]}>
                          {progress?.yourVerdict ===
                          'not_suspicious'
                            ? 'NOT SUSPICIOUS'
                            : 'SUSPICIOUS'}
                        </Text>
                      </Text>
                    ) : (
                      <Text style={styles.noteSuspCaseSummary}>
                        {item.mainQuestion}
                      </Text>
                    )}

                    <View style={styles.noteSuspDivider} />

                    <Pressable
                      onPress={() => {
                        noteSuspNavigateRootScreen('CaseFile', {
                          caseId: item.caseId,
                        });
                      }}
                      hitSlop={6}
                      style={styles.noteSuspOpenRow}>
                      <Text style={styles.noteSuspOpenText}>
                        OPEN CASE
                      </Text>
                      <Text style={styles.noteSuspOpenArrow}>›</Text>
                    </Pressable>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </View>
      </View>
    </NoteSuspBackgroundLayout>
  );
};

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  noteSuspHeaderRow: {
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  noteSuspHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },

  noteSuspStatsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 18,
  },
  noteSuspStatCard: {
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
  noteSuspStatValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
  },
  noteSuspStatValueOpen: {color: '#2EB3FF'},
  noteSuspStatValueSolved: {color: '#F7C948'},
  noteSuspStatValueAccuracy: {color: '#2DB86B'},
  noteSuspStatLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },

  noteSuspSegmentOuter: {
    height: 53,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1A2347',
    backgroundColor: 'rgba(15,23,48,0.7)',
    flexDirection: 'row',
    padding: 6,
    marginBottom: 18,
  },
  noteSuspSegmentItem: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspSegmentItemActive: {
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  noteSuspSegmentText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#4A5478',
  },
  noteSuspSegmentTextActive: {
    color: '#FFFFFF',
  },

  noteSuspCardList: {
    gap: 16,
    paddingBottom: 80,
  },
  noteSuspCaseCardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  noteSuspCaseCardGradient: {
    borderRadius: 20,
  },
  noteSuspCaseCardContent: {
    padding: 19,
  },
  noteSuspCaseTopRow: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  noteSuspTagPill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
  },
  noteSuspTagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  noteSuspDifficultyPill: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  noteSuspDifficultyText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
  },
  noteSuspResultPill: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#141D3A',
    borderWidth: 1,
  },
  noteSuspResultPillCorrect: {
    borderColor: '#4ADE80',
  },
  noteSuspResultPillWrong: {
    borderColor: '#FF5A6E',
  },
  noteSuspResultPillText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  noteSuspResultPillTextCorrect: {color: '#4ADE80'},
  noteSuspResultPillTextWrong: {color: '#FF5A6E'},
  noteSuspTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 6,
  },
  noteSuspCaseSummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
    marginBottom: 14,
  },
  noteSuspSavedYourCall: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
    marginBottom: 14,
  },
  noteSuspSavedYourCallValue: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
    letterSpacing: 0.4,
  },
  noteSuspSavedYourCallValueRed: {color: '#FF5A6E'},
  noteSuspSavedYourCallValueGreen: {color: '#4ADE80'},
  noteSuspDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12,
  },
  noteSuspOpenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  noteSuspOpenText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  noteSuspOpenArrow: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2EB3FF',
    marginTop: -1,
  },
});

