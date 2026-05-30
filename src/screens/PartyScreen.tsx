import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {BackgroundScreen} from '../components/BackgroundScreen';
import {navigateRootScreen} from '../navigation/rootNavigation';

const roundSteps = [
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

export function PartyScreen() {
  const navigation = useNavigation<any>();

  return (
    <BackgroundScreen>
      <View style={styles.root}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Party Mode</Text>
          <View style={styles.headerIconBtn}>
            <Text style={styles.headerIcon}>👥</Text>
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
          style={styles.heroCard}>
          <View style={styles.heroCardInner}>
            <Text style={styles.heroTitle}>
              Defend Yourself, Out Loud
            </Text>
            <Text style={styles.heroBody}>
              Pick a scenario. Get a wildly suspicious situation. Talk your way
              out of it. The room votes on how convincing you were.
            </Text>
            <Pressable
              onPress={() => navigateRootScreen('PartySetup')}
              style={styles.startBtn}>
              <Text style={styles.startBtnText}>Start</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <Text style={styles.sectionLabel}>How a round works</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.stepsCard}>
          <View style={styles.stepsCardInner}>
            {roundSteps.map(
              (step, index) => (
                <View key={step.stepTitle}>
                  <View style={styles.stepRow}>
                    <View style={styles.stepBadge}>
                      <Text style={styles.stepBadgeText}>
                        {index + 1}
                      </Text>
                    </View>
                    <View style={styles.stepTextWrap}>
                      <Text style={styles.stepTitle}>
                        {step.stepTitle}
                      </Text>
                      <Text style={styles.stepBody}>
                        {step.stepBody}
                      </Text>
                    </View>
                  </View>
                  {index <
                    roundSteps.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ),
            )}
          </View>
        </LinearGradient>
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  headerTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 18,
  },
  heroCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.3)',
    marginBottom: 24,
    overflow: 'hidden',
  },
  heroCardInner: {
    padding: 25,
    gap: 20,
  },
  heroTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    letterSpacing: -0.26,
    color: '#E8EEFF',
  },
  heroBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },
  startBtn: {
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
  startBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
  sectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  stepsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  stepsCardInner: {
    padding: 19,
    gap: 11,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'flex-start',
  },
  stepBadge: {
    width: 29,
    height: 29,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    color: '#2EB3FF',
  },
  stepTextWrap: {
    flex: 1,
    gap: 2,
  },
  stepTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  stepBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#4A5478',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 11,
  },
});

