import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';

const kinddSuspiccousIdeasRoundSteps = [
  {
    kinddSuspiccousStepTitle: 'Pick a category',
    kinddSuspiccousStepBody:
      'Pick a category — family drama, online crime, pet suspect…',
  },
  {
    kinddSuspiccousStepTitle: 'Get your situation',
    kinddSuspiccousStepBody:
      'A short, very-suspicious scenario drops onto the table.',
  },
  {
    kinddSuspiccousStepTitle: 'Talk it out',
    kinddSuspiccousStepBody:
      'Defend yourself for 60 seconds. Friends can interrogate.',
  },
  {
    kinddSuspiccousStepTitle: 'Get judged',
    kinddSuspiccousStepBody:
      'The other players score your defense 0–100%.',
  },
];

const KinddSuspiccousIdeasparrt = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <View style={styles.kinddSuspiccousHeaderRow}>
          <Text style={styles.kinddSuspiccousHeaderTitle}>Party Mode</Text>
          <View style={styles.kinddSuspiccousHeaderIconBtn}>
            <Text style={styles.kinddSuspiccousHeaderIcon}>👥</Text>
          </View>
        </View>

        <LinearGradient
          colors={[
            'rgba(46,179,255,0.18)',
            'rgba(247,201,72,0.1)',
            'rgba(15,23,48,0.95)',
          ]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.kinddSuspiccousHeroCard}>
          <View style={styles.kinddSuspiccousHeroCardInner}>
            <Text style={styles.kinddSuspiccousHeroTitle}>
              Defend Yourself, Out Loud
            </Text>
            <Text style={styles.kinddSuspiccousHeroBody}>
              Pick a scenario. Get a wildly suspicious situation. Talk your way
              out of it. The room votes on how convincing you were.
            </Text>
            <Pressable
              onPress={() =>
                kinddSuspiccousNavigation.navigate(
                  'KinddSuspiccousIdeaspartysetup',
                )
              }
              style={styles.kinddSuspiccousStartBtn}>
              <Text style={styles.kinddSuspiccousStartBtnText}>Start</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <Text style={styles.kinddSuspiccousSectionLabel}>How a round works</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.kinddSuspiccousStepsCard}>
          <View style={styles.kinddSuspiccousStepsCardInner}>
            {kinddSuspiccousIdeasRoundSteps.map(
              (kinddSuspiccousStep, kinddSuspiccousIndex) => (
                <View key={kinddSuspiccousStep.kinddSuspiccousStepTitle}>
                  <View style={styles.kinddSuspiccousStepRow}>
                    <View style={styles.kinddSuspiccousStepBadge}>
                      <Text style={styles.kinddSuspiccousStepBadgeText}>
                        {kinddSuspiccousIndex + 1}
                      </Text>
                    </View>
                    <View style={styles.kinddSuspiccousStepTextWrap}>
                      <Text style={styles.kinddSuspiccousStepTitle}>
                        {kinddSuspiccousStep.kinddSuspiccousStepTitle}
                      </Text>
                      <Text style={styles.kinddSuspiccousStepBody}>
                        {kinddSuspiccousStep.kinddSuspiccousStepBody}
                      </Text>
                    </View>
                  </View>
                  {kinddSuspiccousIndex <
                    kinddSuspiccousIdeasRoundSteps.length - 1 && (
                    <View style={styles.kinddSuspiccousDivider} />
                  )}
                </View>
              ),
            )}
          </View>
        </LinearGradient>
      </View>
    </KinddSuspiccousIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousRoot: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  kinddSuspiccousHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  kinddSuspiccousHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },
  kinddSuspiccousHeaderIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousHeaderIcon: {
    fontSize: 18,
  },
  kinddSuspiccousHeroCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.3)',
    marginBottom: 24,
    overflow: 'hidden',
  },
  kinddSuspiccousHeroCardInner: {
    padding: 25,
    gap: 20,
  },
  kinddSuspiccousHeroTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    letterSpacing: -0.26,
    color: '#E8EEFF',
  },
  kinddSuspiccousHeroBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },
  kinddSuspiccousStartBtn: {
    height: 49,
    borderRadius: 16,
    backgroundColor: '#F7C948',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F7C948',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  kinddSuspiccousStartBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
  kinddSuspiccousSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  kinddSuspiccousStepsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  kinddSuspiccousStepsCardInner: {
    padding: 19,
    gap: 11,
  },
  kinddSuspiccousStepRow: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'flex-start',
  },
  kinddSuspiccousStepBadge: {
    width: 29,
    height: 29,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousStepBadgeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    color: '#2EB3FF',
  },
  kinddSuspiccousStepTextWrap: {
    flex: 1,
    gap: 2,
  },
  kinddSuspiccousStepTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  kinddSuspiccousStepBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#4A5478',
  },
  kinddSuspiccousDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 11,
  },
});

export default KinddSuspiccousIdeasparrt;
