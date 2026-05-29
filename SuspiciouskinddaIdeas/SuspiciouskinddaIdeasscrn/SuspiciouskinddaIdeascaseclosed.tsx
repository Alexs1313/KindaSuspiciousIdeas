import React, {useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import type {SuspiciouskinddaIdeasRootParamList} from '../SuspiciouskinddaIdeasrout/SuspiciouskinddaIdeasrootParams';
import {useSuspiciouskinddaIdeasCases} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeascasesStore';

type SuspiciouskinddaCaseClosedRoute = {
  key: string;
  name: 'SuspiciouskinddaIdeascaseclosed';
  params: SuspiciouskinddaIdeasRootParamList['SuspiciouskinddaIdeascaseclosed'];
};

const SuspiciouskinddaIdeascaseclosed = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const suspiciouskinddaRoute = useRoute<SuspiciouskinddaCaseClosedRoute>();
  const suspiciouskinddaCaseId =
    suspiciouskinddaRoute.params.suspiciouskinddaCaseId;

  const {suspiciouskinddaCases, suspiciouskinddaProgressById} =
    useSuspiciouskinddaIdeasCases();

  const suspiciouskinddaCase = useMemo(
    () =>
      suspiciouskinddaCases.find(
        c => c.suspiciouskinddaCaseId === suspiciouskinddaCaseId,
      ),
    [suspiciouskinddaCases, suspiciouskinddaCaseId],
  );
  const suspiciouskinddaProgress =
    suspiciouskinddaProgressById[suspiciouskinddaCaseId];

  if (!suspiciouskinddaCase || !suspiciouskinddaProgress) {
    return null;
  }

  const suspiciouskinddaYourVerdict =
    suspiciouskinddaProgress.suspiciouskinddaCaseYourVerdict;
  const suspiciouskinddaIsCorrect =
    suspiciouskinddaYourVerdict ===
    suspiciouskinddaCase.suspiciouskinddaCaseVerdict;

  const suspiciouskinddaStampText = suspiciouskinddaIsCorrect
    ? 'CORRECT'
    : 'WRONG';
  const suspiciouskinddaStampColor = suspiciouskinddaIsCorrect
    ? '#4ADE80'
    : '#FF5A6E';

  const suspiciouskinddaVerdictLabel = (v?: string) => {
    if (v === 'not_suspicious') {
      return 'NOT SUSPICIOUS';
    }
    if (v === 'suspicious') {
      return 'SUSPICIOUS';
    }
    return '';
  };

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <View style={styles.suspiciouskinddaTopBar}>
          <Pressable
            onPress={() => suspiciouskinddaNavigation.goBack()}
            style={styles.suspiciouskinddaBackBtn}>
            <Text style={styles.suspiciouskinddaBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.suspiciouskinddaTopTitle}>Case Closed</Text>
        </View>

        <View style={styles.suspiciouskinddaStampOuter}>
          <View
            style={[
              styles.suspiciouskinddaStamp,
              {borderColor: suspiciouskinddaStampColor},
            ]}>
            <Text
              style={[
                styles.suspiciouskinddaStampText,
                {color: suspiciouskinddaStampColor},
              ]}>
              {suspiciouskinddaStampText}
            </Text>
          </View>
        </View>

        <View style={styles.suspiciouskinddaCompareWrap}>
          <LinearGradient
            colors={['#141D3A', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.suspiciouskinddaCompareGradient}>
            <View style={styles.suspiciouskinddaCompareInner}>
              <View style={styles.suspiciouskinddaCompareRow}>
                <Text style={styles.suspiciouskinddaCompareLeft}>YOU SAID</Text>
                <Text
                  style={[
                    styles.suspiciouskinddaCompareRight,
                    {
                      color:
                        suspiciouskinddaYourVerdict === 'not_suspicious'
                          ? '#4ADE80'
                          : '#FF5A6E',
                    },
                  ]}>
                  {suspiciouskinddaVerdictLabel(suspiciouskinddaYourVerdict)}
                </Text>
              </View>
              <View style={styles.suspiciouskinddaCompareDivider} />
              <View style={styles.suspiciouskinddaCompareRow}>
                <Text style={styles.suspiciouskinddaCompareLeft}>
                  ACTUAL OUTCOME
                </Text>
                <Text
                  style={[
                    styles.suspiciouskinddaCompareRight,
                    {
                      color:
                        suspiciouskinddaCase.suspiciouskinddaCaseVerdict ===
                        'not_suspicious'
                          ? '#4ADE80'
                          : '#FF5A6E',
                    },
                  ]}>
                  {suspiciouskinddaVerdictLabel(
                    suspiciouskinddaCase.suspiciouskinddaCaseVerdict,
                  )}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.suspiciouskinddaSectionLabel}>
          WHAT ACTUALLY HAPPENED
        </Text>
        <View style={styles.suspiciouskinddaCardWrap}>
          <LinearGradient
            colors={['#1A2347', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.suspiciouskinddaCardGradient}>
            <View style={styles.suspiciouskinddaCardContent}>
              <Text style={styles.suspiciouskinddaBodyText}>
                {suspiciouskinddaCase.suspiciouskinddaCaseRealOutcome}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.suspiciouskinddaSectionLabel}>YOUR NOTES</Text>
        <View style={styles.suspiciouskinddaCardWrap}>
          <LinearGradient
            colors={['#1A2347', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.suspiciouskinddaCardGradient}>
            <View style={styles.suspiciouskinddaCardContent}>
              <Text style={styles.suspiciouskinddaNotesText}>
                {suspiciouskinddaProgress.suspiciouskinddaCaseYourNote || '—'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Pressable
          onPress={() => suspiciouskinddaNavigation.popToTop()}
          style={styles.suspiciouskinddaBackToCasesWrap}>
          <LinearGradient
            colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.suspiciouskinddaBackToCasesGradient}>
            <View style={styles.suspiciouskinddaBackToCasesHighlight} />
            <Text style={styles.suspiciouskinddaBackToCasesText}>
              Back to Case Files
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SuspiciouskinddaIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaRoot: {
    flex: 1,
    paddingTop: 59,
    paddingHorizontal: 16,
  },
  suspiciouskinddaTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
    paddingBottom: 16,
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
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },
  suspiciouskinddaTopTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
    fontWeight: '800',
  },

  suspiciouskinddaStampOuter: {
    height: 152,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
    marginTop: 20,
  },
  suspiciouskinddaStamp: {
    borderWidth: 5,
    borderRadius: 8,
    paddingHorizontal: 29,
    paddingVertical: 19,
    transform: [{rotate: '-6deg'}],
  },
  suspiciouskinddaStampText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 42,
    letterSpacing: 4.2,
  },

  suspiciouskinddaCompareWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    overflow: 'hidden',
    marginBottom: 14,
  },
  suspiciouskinddaCompareGradient: {borderRadius: 20},
  suspiciouskinddaCompareInner: {padding: 5},
  suspiciouskinddaCompareRow: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
  },
  suspiciouskinddaCompareDivider: {
    height: 1,
    backgroundColor: '#1A2347',
  },
  suspiciouskinddaCompareLeft: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },
  suspiciouskinddaCompareRight: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  suspiciouskinddaSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginTop: 6,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  suspiciouskinddaCardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
    marginBottom: 14,
  },
  suspiciouskinddaCardGradient: {borderRadius: 20},
  suspiciouskinddaCardContent: {padding: 19},
  suspiciouskinddaBodyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
  suspiciouskinddaNotesText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#7D88AD',
  },

  suspiciouskinddaBackToCasesWrap: {
    marginTop: 6,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 54,
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  suspiciouskinddaBackToCasesGradient: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaBackToCasesHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  suspiciouskinddaBackToCasesText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default SuspiciouskinddaIdeascaseclosed;
