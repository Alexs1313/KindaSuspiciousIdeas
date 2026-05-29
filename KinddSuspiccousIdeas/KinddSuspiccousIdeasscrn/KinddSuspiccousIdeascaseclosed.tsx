import React, {useMemo} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import type {KinddSuspiccousIdeasRootParamList} from '../KinddSuspiccousIdeasrout/KinddSuspiccousIdeasrootParams';
import {useKinddSuspiccousIdeasCases} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeascasesStore';

type KinddSuspiccousCaseClosedRoute = {
  key: string;
  name: 'KinddSuspiccousIdeascaseclosed';
  params: KinddSuspiccousIdeasRootParamList['KinddSuspiccousIdeascaseclosed'];
};

const KinddSuspiccousIdeascaseclosed = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const kinddSuspiccousRoute = useRoute<KinddSuspiccousCaseClosedRoute>();
  const kinddSuspiccousCaseId =
    kinddSuspiccousRoute.params.kinddSuspiccousCaseId;

  const {kinddSuspiccousCases, kinddSuspiccousProgressById} =
    useKinddSuspiccousIdeasCases();

  const kinddSuspiccousCase = useMemo(
    () =>
      kinddSuspiccousCases.find(
        c => c.kinddSuspiccousCaseId === kinddSuspiccousCaseId,
      ),
    [kinddSuspiccousCases, kinddSuspiccousCaseId],
  );
  const kinddSuspiccousProgress =
    kinddSuspiccousProgressById[kinddSuspiccousCaseId];

  if (!kinddSuspiccousCase || !kinddSuspiccousProgress) {
    return null;
  }

  const kinddSuspiccousYourVerdict =
    kinddSuspiccousProgress.kinddSuspiccousCaseYourVerdict;
  const kinddSuspiccousIsCorrect =
    kinddSuspiccousYourVerdict ===
    kinddSuspiccousCase.kinddSuspiccousCaseVerdict;

  const kinddSuspiccousStampText = kinddSuspiccousIsCorrect
    ? 'CORRECT'
    : 'WRONG';
  const kinddSuspiccousStampColor = kinddSuspiccousIsCorrect
    ? '#4ADE80'
    : '#FF5A6E';

  const kinddSuspiccousVerdictLabel = (v?: string) => {
    if (v === 'not_suspicious') {
      return 'NOT SUSPICIOUS';
    }
    if (v === 'suspicious') {
      return 'SUSPICIOUS';
    }
    return '';
  };

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <View style={styles.kinddSuspiccousTopBar}>
          <Pressable
            onPress={() => kinddSuspiccousNavigation.goBack()}
            style={styles.kinddSuspiccousBackBtn}>
            <Text style={styles.kinddSuspiccousBackIcon}>‹</Text>
          </Pressable>
          <Text style={styles.kinddSuspiccousTopTitle}>Case Closed</Text>
        </View>

        <View style={styles.kinddSuspiccousStampOuter}>
          <View
            style={[
              styles.kinddSuspiccousStamp,
              {borderColor: kinddSuspiccousStampColor},
            ]}>
            <Text
              style={[
                styles.kinddSuspiccousStampText,
                {color: kinddSuspiccousStampColor},
              ]}>
              {kinddSuspiccousStampText}
            </Text>
          </View>
        </View>

        <View style={styles.kinddSuspiccousCompareWrap}>
          <LinearGradient
            colors={['#141D3A', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.kinddSuspiccousCompareGradient}>
            <View style={styles.kinddSuspiccousCompareInner}>
              <View style={styles.kinddSuspiccousCompareRow}>
                <Text style={styles.kinddSuspiccousCompareLeft}>YOU SAID</Text>
                <Text
                  style={[
                    styles.kinddSuspiccousCompareRight,
                    {
                      color:
                        kinddSuspiccousYourVerdict === 'not_suspicious'
                          ? '#4ADE80'
                          : '#FF5A6E',
                    },
                  ]}>
                  {kinddSuspiccousVerdictLabel(kinddSuspiccousYourVerdict)}
                </Text>
              </View>
              <View style={styles.kinddSuspiccousCompareDivider} />
              <View style={styles.kinddSuspiccousCompareRow}>
                <Text style={styles.kinddSuspiccousCompareLeft}>
                  ACTUAL OUTCOME
                </Text>
                <Text
                  style={[
                    styles.kinddSuspiccousCompareRight,
                    {
                      color:
                        kinddSuspiccousCase.kinddSuspiccousCaseVerdict ===
                        'not_suspicious'
                          ? '#4ADE80'
                          : '#FF5A6E',
                    },
                  ]}>
                  {kinddSuspiccousVerdictLabel(
                    kinddSuspiccousCase.kinddSuspiccousCaseVerdict,
                  )}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.kinddSuspiccousSectionLabel}>
          WHAT ACTUALLY HAPPENED
        </Text>
        <View style={styles.kinddSuspiccousCardWrap}>
          <LinearGradient
            colors={['#1A2347', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.kinddSuspiccousCardGradient}>
            <View style={styles.kinddSuspiccousCardContent}>
              <Text style={styles.kinddSuspiccousBodyText}>
                {kinddSuspiccousCase.kinddSuspiccousCaseRealOutcome}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Text style={styles.kinddSuspiccousSectionLabel}>YOUR NOTES</Text>
        <View style={styles.kinddSuspiccousCardWrap}>
          <LinearGradient
            colors={['#1A2347', '#0F1730'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.kinddSuspiccousCardGradient}>
            <View style={styles.kinddSuspiccousCardContent}>
              <Text style={styles.kinddSuspiccousNotesText}>
                {kinddSuspiccousProgress.kinddSuspiccousCaseYourNote || '—'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <Pressable
          onPress={() => kinddSuspiccousNavigation.popToTop()}
          style={styles.kinddSuspiccousBackToCasesWrap}>
          <LinearGradient
            colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.kinddSuspiccousBackToCasesGradient}>
            <View style={styles.kinddSuspiccousBackToCasesHighlight} />
            <Text style={styles.kinddSuspiccousBackToCasesText}>
              Back to Case Files
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </KinddSuspiccousIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousRoot: {
    flex: 1,
    paddingTop: 59,
    paddingHorizontal: 16,
  },
  kinddSuspiccousTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
    paddingBottom: 16,
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
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },
  kinddSuspiccousTopTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
    fontWeight: '800',
  },

  kinddSuspiccousStampOuter: {
    height: 152,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
    marginTop: 20,
  },
  kinddSuspiccousStamp: {
    borderWidth: 5,
    borderRadius: 8,
    paddingHorizontal: 29,
    paddingVertical: 19,
    transform: [{rotate: '-6deg'}],
  },
  kinddSuspiccousStampText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 42,
    letterSpacing: 4.2,
  },

  kinddSuspiccousCompareWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    overflow: 'hidden',
    marginBottom: 14,
  },
  kinddSuspiccousCompareGradient: {borderRadius: 20},
  kinddSuspiccousCompareInner: {padding: 5},
  kinddSuspiccousCompareRow: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 13,
  },
  kinddSuspiccousCompareDivider: {
    height: 1,
    backgroundColor: '#1A2347',
  },
  kinddSuspiccousCompareLeft: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },
  kinddSuspiccousCompareRight: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  kinddSuspiccousSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginTop: 6,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  kinddSuspiccousCardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
    marginBottom: 14,
  },
  kinddSuspiccousCardGradient: {borderRadius: 20},
  kinddSuspiccousCardContent: {padding: 19},
  kinddSuspiccousBodyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
  kinddSuspiccousNotesText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#7D88AD',
  },

  kinddSuspiccousBackToCasesWrap: {
    marginTop: 6,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 54,
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  kinddSuspiccousBackToCasesGradient: {
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousBackToCasesHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  kinddSuspiccousBackToCasesText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default KinddSuspiccousIdeascaseclosed;
