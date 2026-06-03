import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {noteSuspNavigateRootScreen} from '../noteSuspNav/NoteSuspRootNavigation';

const noteSuspRoundSteps = [
  {
    stepTitle: 'Pick a category',
    stepBody:
      'Pick a category — family drama, online crime, pet suspect…',
  },
  {
    stepTitle: 'Get your situation',
    stepBody:
      'A short, very-suspicious scenario drops onto the table.',
  },
  {
    stepTitle: 'Talk it out',
    stepBody:
      'Defend yourself for 60 seconds. Friends can interrogate.',
  },
  {
    stepTitle: 'Get judged',
    stepBody:
      'The other guests score your defense 0–100%.',
  },
];

export function NoteSuspPartyScreen() {
  const navigation = useNavigation<any>();

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <View style={styles.noteSuspHeaderRow}>
          <Text style={styles.noteSuspHeaderTitle}>Party Mode</Text>
          <View style={styles.noteSuspHeaderIconBtn}>
            <Text style={styles.noteSuspHeaderIcon}>👥</Text>
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
          style={styles.noteSuspHeroCard}>
          <View style={styles.noteSuspHeroCardInner}>
            <Text style={styles.noteSuspHeroTitle}>
              Defend Yourself, Out Loud
            </Text>
            <Text style={styles.noteSuspHeroBody}>
              Pick a scenario. Get a wildly suspicious situation. Talk your way
              out of it. The room votes on how convincing you were.
            </Text>
            <Pressable
              onPress={() => noteSuspNavigateRootScreen('PartySetup')}
              style={styles.noteSuspStartBtn}>
              <Text style={styles.noteSuspStartBtnText}>Start</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <Text style={styles.noteSuspSectionLabel}>How a round works</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.noteSuspStepsCard}>
          <View style={styles.noteSuspStepsCardInner}>
            {noteSuspRoundSteps.map(
              (step, index) => (
                <View key={step.stepTitle}>
                  <View style={styles.noteSuspStepRow}>
                    <View style={styles.noteSuspStepBadge}>
                      <Text style={styles.noteSuspStepBadgeText}>
                        {index + 1}
                      </Text>
                    </View>
                    <View style={styles.noteSuspStepTextWrap}>
                      <Text style={styles.noteSuspStepTitle}>
                        {step.stepTitle}
                      </Text>
                      <Text style={styles.noteSuspStepBody}>
                        {step.stepBody}
                      </Text>
                    </View>
                  </View>
                  {index <
                    noteSuspRoundSteps.length - 1 && (
                    <View style={styles.noteSuspDivider} />
                  )}
                </View>
              ),
            )}
          </View>
        </LinearGradient>
      </View>
    </NoteSuspBackgroundLayout>
  );
};

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  noteSuspHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  noteSuspHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },
  noteSuspHeaderIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspHeaderIcon: {
    fontSize: 18,
  },
  noteSuspHeroCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.3)',
    marginBottom: 24,
    overflow: 'hidden',
  },
  noteSuspHeroCardInner: {
    padding: 25,
    gap: 20,
  },
  noteSuspHeroTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    letterSpacing: -0.26,
    color: '#E8EEFF',
  },
  noteSuspHeroBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },
  noteSuspStartBtn: {
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
  noteSuspStartBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
  noteSuspSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  noteSuspStepsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  noteSuspStepsCardInner: {
    padding: 19,
    gap: 11,
  },
  noteSuspStepRow: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'flex-start',
  },
  noteSuspStepBadge: {
    width: 29,
    height: 29,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspStepBadgeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    color: '#2EB3FF',
  },
  noteSuspStepTextWrap: {
    flex: 1,
    gap: 2,
  },
  noteSuspStepTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  noteSuspStepBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#4A5478',
  },
  noteSuspDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 11,
  },
});

