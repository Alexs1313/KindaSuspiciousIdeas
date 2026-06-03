import React, {useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import type {NoteSuspRootStackParamList} from '../noteSuspNav/NoteSuspTypes';
import {useNoteSuspCases} from '../noteSuspCtx/NoteSuspCasesContext';

type CaseClosedRoute = {
  key: string;
  name: 'CaseClosed';
  params: NoteSuspRootStackParamList['CaseClosed'];
};

export function NoteSuspCaseClosedScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<CaseClosedRoute>();
  const caseId =
    route.params.caseId;

  const {cases, progressById} =
    useNoteSuspCases();

  const activeCase = useMemo(
    () =>
      cases.find(
        c => c.caseId === caseId,
      ),
    [cases, caseId],
  );
  const progress =
    progressById[caseId];

  if (!activeCase || !progress) {
    return null;
  }

  const yourVerdict =
    progress.yourVerdict;
  const isCorrect =
    yourVerdict ===
    activeCase.verdict;

  const stampText = isCorrect
    ? 'CORRECT'
    : 'WRONG';
  const stampColor = isCorrect
    ? '#4ADE80'
    : '#FF5A6E';

  const verdictLabel = (v?: string) => {
    if (v === 'not_suspicious') {
      return 'NOT SUSPICIOUS';
    }
    if (v === 'suspicious') {
      return 'SUSPICIOUS';
    }
    return '';
  };

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <View style={styles.noteSuspTopBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.noteSuspBackBtn}>
            <Text style={styles.noteSuspBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.noteSuspTopTitle}>Case Closed</Text>
        </View>

        <View style={styles.noteSuspStampOuter}>
          <View
            style={[
              styles.noteSuspStamp,
              {borderColor: stampColor},
            ]}>
            <Text
              style={[
                styles.noteSuspStampText,
                {color: stampColor},
              ]}>
              {stampText}
            </Text>
          </View>
        </View>

        <View style={styles.noteSuspCompareWrap}>
          <LinearGradient
            colors={['#141D3A', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.noteSuspCompareGradient}>
            <View style={styles.noteSuspCompareInner}>
              <View style={styles.noteSuspCompareRow}>
                <Text style={styles.noteSuspCompareLeft}>YOU SAID</Text>
                <Text
                  style={[
                    styles.noteSuspCompareRight,
                    {
                      color:
                        yourVerdict === 'not_suspicious'
                          ? '#4ADE80'
                          : '#FF5A6E',
                    },
                  ]}>
                  {verdictLabel(yourVerdict)}
                </Text>
              </View>
              <View style={styles.noteSuspCompareDivider} />
              <View style={styles.noteSuspCompareRow}>
                <Text style={styles.noteSuspCompareLeft}>
                  ACTUAL OUTCOME
                </Text>
                <Text
                  style={[
                    styles.noteSuspCompareRight,
                    {
                      color:
                        activeCase.verdict ===
                        'not_suspicious'
                          ? '#4ADE80'
                          : '#FF5A6E',
                    },
                  ]}>
                  {verdictLabel(
                    activeCase.verdict,
                  )}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.noteSuspSectionLabel}>
          WHAT ACTUALLY HAPPENED
        </Text>
        <View style={styles.noteSuspCardWrap}>
          <LinearGradient
            colors={['#1A2347', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.noteSuspCardGradient}>
            <View style={styles.noteSuspCardContent}>
              <Text style={styles.noteSuspBodyText}>
                {activeCase.realOutcome}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.noteSuspSectionLabel}>YOUR NOTES</Text>
        <View style={styles.noteSuspCardWrap}>
          <LinearGradient
            colors={['#1A2347', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.noteSuspCardGradient}>
            <View style={styles.noteSuspCardContent}>
              <Text style={styles.noteSuspNotesText}>
                {progress.yourNote || '—'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Pressable
          onPress={() => navigation.popToTop()}
          style={styles.noteSuspBackToCasesWrap}>
          <LinearGradient
            colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.noteSuspBackToCasesGradient}>
            <View style={styles.noteSuspBackToCasesHighlight} />
            <Text style={styles.noteSuspBackToCasesText}>
              Back to Case Files
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </NoteSuspBackgroundLayout>
  );
};

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
  },
  noteSuspTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
    paddingBottom: 16,
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
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },
  noteSuspTopTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
    fontWeight: '800',
  },

  noteSuspStampOuter: {
    height: 152,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
    marginTop: 20,
  },
  noteSuspStamp: {
    borderWidth: 5,
    borderRadius: 8,
    paddingHorizontal: 29,
    paddingVertical: 19,
    transform: [{rotate: '-6deg'}],
  },
  noteSuspStampText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 42,
    letterSpacing: 4.2,
  },

  noteSuspCompareWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    overflow: 'hidden',
    marginBottom: 14,
  },
  noteSuspCompareGradient: {borderRadius: 20},
  noteSuspCompareInner: {padding: 5},
  noteSuspCompareRow: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
  },
  noteSuspCompareDivider: {
    height: 1,
    backgroundColor: '#1A2347',
  },
  noteSuspCompareLeft: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },
  noteSuspCompareRight: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  noteSuspSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginTop: 6,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  noteSuspCardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
    marginBottom: 14,
  },
  noteSuspCardGradient: {borderRadius: 20},
  noteSuspCardContent: {padding: 19},
  noteSuspBodyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
  noteSuspNotesText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#7D88AD',
  },

  noteSuspBackToCasesWrap: {
    marginTop: 6,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 54,
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  noteSuspBackToCasesGradient: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspBackToCasesHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  noteSuspBackToCasesText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

