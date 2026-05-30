import React, {useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';

import {BackgroundScreen} from '../components/BackgroundScreen';
import type {RootStackParamList} from '../navigation/types';
import {useCases} from '../context/CasesContext';

type CaseClosedRoute = {
  key: string;
  name: 'CaseClosed';
  params: RootStackParamList['CaseClosed'];
};

export function CaseClosedScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<CaseClosedRoute>();
  const caseId =
    route.params.caseId;

  const {cases, progressById} =
    useCases();

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
    <BackgroundScreen>
      <View style={styles.root}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
          <Text style={styles.topTitle}>Case Closed</Text>
        </View>

        <View style={styles.stampOuter}>
          <View
            style={[
              styles.stamp,
              {borderColor: stampColor},
            ]}>
            <Text
              style={[
                styles.stampText,
                {color: stampColor},
              ]}>
              {stampText}
            </Text>
          </View>
        </View>

        <View style={styles.compareWrap}>
          <LinearGradient
            colors={['#141D3A', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.compareGradient}>
            <View style={styles.compareInner}>
              <View style={styles.compareRow}>
                <Text style={styles.compareLeft}>YOU SAID</Text>
                <Text
                  style={[
                    styles.compareRight,
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
              <View style={styles.compareDivider} />
              <View style={styles.compareRow}>
                <Text style={styles.compareLeft}>
                  ACTUAL OUTCOME
                </Text>
                <Text
                  style={[
                    styles.compareRight,
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

        <Text style={styles.sectionLabel}>
          WHAT ACTUALLY HAPPENED
        </Text>
        <View style={styles.cardWrap}>
          <LinearGradient
            colors={['#1A2347', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.cardGradient}>
            <View style={styles.cardContent}>
              <Text style={styles.bodyText}>
                {activeCase.realOutcome}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.sectionLabel}>YOUR NOTES</Text>
        <View style={styles.cardWrap}>
          <LinearGradient
            colors={['#1A2347', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.cardGradient}>
            <View style={styles.cardContent}>
              <Text style={styles.notesText}>
                {progress.yourNote || '—'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Pressable
          onPress={() => navigation.popToTop()}
          style={styles.backToCasesWrap}>
          <LinearGradient
            colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.backToCasesGradient}>
            <View style={styles.backToCasesHighlight} />
            <Text style={styles.backToCasesText}>
              Back to Case Files
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
    paddingBottom: 16,
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
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },
  topTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
    fontWeight: '800',
  },

  stampOuter: {
    height: 152,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
    marginTop: 20,
  },
  stamp: {
    borderWidth: 5,
    borderRadius: 8,
    paddingHorizontal: 29,
    paddingVertical: 19,
    transform: [{rotate: '-6deg'}],
  },
  stampText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 42,
    letterSpacing: 4.2,
  },

  compareWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    overflow: 'hidden',
    marginBottom: 14,
  },
  compareGradient: {borderRadius: 20},
  compareInner: {padding: 5},
  compareRow: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
  },
  compareDivider: {
    height: 1,
    backgroundColor: '#1A2347',
  },
  compareLeft: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },
  compareRight: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  sectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginTop: 6,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  cardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
    marginBottom: 14,
  },
  cardGradient: {borderRadius: 20},
  cardContent: {padding: 19},
  bodyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
  notesText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#7D88AD',
  },

  backToCasesWrap: {
    marginTop: 6,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 54,
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  backToCasesGradient: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backToCasesHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  backToCasesText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

