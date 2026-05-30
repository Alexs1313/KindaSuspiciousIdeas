import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {BackgroundScreen} from '../components/BackgroundScreen';
import {useCases} from '../context/CasesContext';
import {navigateRootScreen} from '../navigation/rootNavigation';

type CasesScreenSegment = 'active' | 'saved';

export function CasesScreen() {
  const navigation = useNavigation<any>();
  const [segment, setSegment] =
    useState<CasesScreenSegment>('active');

  const {cases, progressById} =
    useCases();

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
    <BackgroundScreen>
      <View style={styles.root}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Case Files</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text
              style={[
                styles.statValue,
                styles.statValueOpen,
              ]}>
              {openCount}
            </Text>
            <Text style={styles.statLabel}>OPEN</Text>
          </View>
          <View style={styles.statCard}>
            <Text
              style={[
                styles.statValue,
                styles.statValueSolved,
              ]}>
              {solvedCount}
            </Text>
            <Text style={styles.statLabel}>SOLVED</Text>
          </View>
          <View style={styles.statCard}>
            <Text
              style={[
                styles.statValue,
                styles.statValueAccuracy,
              ]}>
              {accuracyPercent}%
            </Text>
            <Text style={styles.statLabel}>ACCURACY</Text>
          </View>
        </View>

        <View style={styles.segmentOuter}>
          <Pressable
            onPress={() => setSegment('active')}
            style={[
              styles.segmentItem,
              segment === 'active' &&
                styles.segmentItemActive,
            ]}>
            <Text
              style={[
                styles.segmentText,
                segment === 'active' &&
                  styles.segmentTextActive,
              ]}>
              Active
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setSegment('saved')}
            style={[
              styles.segmentItem,
              segment === 'saved' &&
                styles.segmentItemActive,
            ]}>
            <Text
              style={[
                styles.segmentText,
                segment === 'saved' &&
                  styles.segmentTextActive,
              ]}>
              Saved
            </Text>
          </Pressable>
        </View>

        <View style={styles.cardList}>
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
                style={styles.caseCardWrap}>
                <LinearGradient
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={styles.caseCardGradient}>
                  <View style={styles.caseCardContent}>
                    <View style={styles.caseTopRow}>
                      <View style={styles.tagPill}>
                        <Text style={styles.tagText}>
                          {item.tag}
                        </Text>
                      </View>

                      {segment === 'saved' &&
                      solved ? (
                        <View
                          style={[
                            styles.resultPill,
                            correct
                              ? styles.resultPillCorrect
                              : styles.resultPillWrong,
                          ]}>
                          <Text
                            style={[
                              styles.resultPillText,
                              correct
                                ? styles.resultPillTextCorrect
                                : styles.resultPillTextWrong,
                            ]}>
                            {correct ? 'CORRECT' : 'WRONG'}
                          </Text>
                        </View>
                      ) : null}
                    </View>

                    <Text style={styles.title}>
                      {item.title}
                    </Text>
                    {segment === 'saved' &&
                    solved ? (
                      <Text style={styles.savedYourCall}>
                        Your call:{' '}
                        <Text
                          style={[
                            styles.savedYourCallValue,
                            progress?.yourVerdict ===
                            'not_suspicious'
                              ? styles.savedYourCallValueGreen
                              : styles.savedYourCallValueRed,
                          ]}>
                          {progress?.yourVerdict ===
                          'not_suspicious'
                            ? 'NOT SUSPICIOUS'
                            : 'SUSPICIOUS'}
                        </Text>
                      </Text>
                    ) : (
                      <Text style={styles.caseSummary}>
                        {item.mainQuestion}
                      </Text>
                    )}

                    <View style={styles.divider} />

                    <Pressable
                      onPress={() => {
                        navigateRootScreen('CaseFile', {
                          caseId: item.caseId,
                        });
                      }}
                      hitSlop={6}
                      style={styles.openRow}>
                      <Text style={styles.openText}>
                        OPEN CASE
                      </Text>
                      <Text style={styles.openArrow}>›</Text>
                    </Pressable>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </View>
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerRow: {
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  headerTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },

  statsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 18,
  },
  statCard: {
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
  statValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
  },
  statValueOpen: {color: '#2EB3FF'},
  statValueSolved: {color: '#F7C948'},
  statValueAccuracy: {color: '#2DB86B'},
  statLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },

  segmentOuter: {
    height: 53,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1A2347',
    backgroundColor: 'rgba(15,23,48,0.7)',
    flexDirection: 'row',
    padding: 6,
    marginBottom: 18,
  },
  segmentItem: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentItemActive: {
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  segmentText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#4A5478',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },

  cardList: {
    gap: 16,
    paddingBottom: 80,
  },
  caseCardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  caseCardGradient: {
    borderRadius: 20,
  },
  caseCardContent: {
    padding: 19,
  },
  caseTopRow: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  tagPill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
  },
  tagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  difficultyPill: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  difficultyText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
  },
  resultPill: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#141D3A',
    borderWidth: 1,
  },
  resultPillCorrect: {
    borderColor: '#4ADE80',
  },
  resultPillWrong: {
    borderColor: '#FF5A6E',
  },
  resultPillText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    textAlign: 'center',
  },
  resultPillTextCorrect: {color: '#4ADE80'},
  resultPillTextWrong: {color: '#FF5A6E'},
  title: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 6,
  },
  caseSummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
    marginBottom: 14,
  },
  savedYourCall: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
    marginBottom: 14,
  },
  savedYourCallValue: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
    letterSpacing: 0.4,
  },
  savedYourCallValueRed: {color: '#FF5A6E'},
  savedYourCallValueGreen: {color: '#4ADE80'},
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginBottom: 12,
  },
  openRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  openText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  openArrow: {
    fontSize: 18,
    fontWeight: '900',
    color: '#2EB3FF',
    marginTop: -1,
  },
});

