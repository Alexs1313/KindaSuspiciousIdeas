import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';

const suspiciouskinddaIdeasRoundSteps = [
  {
    suspiciouskinddaStepTitle: 'Pick a category',
    suspiciouskinddaStepBody:
      'Pick a category — family drama, online crime, pet suspect…',
  },
  {
    suspiciouskinddaStepTitle: 'Get your situation',
    suspiciouskinddaStepBody:
      'A short, very-suspicious scenario drops onto the table.',
  },
  {
    suspiciouskinddaStepTitle: 'Talk it out',
    suspiciouskinddaStepBody:
      'Defend yourself for 60 seconds. Friends can interrogate.',
  },
  {
    suspiciouskinddaStepTitle: 'Get judged',
    suspiciouskinddaStepBody:
      'The other guests score your defense 0–100%.',
  },
];

const SuspiciouskinddaIdeasparrt = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <View style={styles.suspiciouskinddaHeaderRow}>
          <Text style={styles.suspiciouskinddaHeaderTitle}>Party Mode</Text>
          <View style={styles.suspiciouskinddaHeaderIconBtn}>
            <Text style={styles.suspiciouskinddaHeaderIcon}>👥</Text>
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
          style={styles.suspiciouskinddaHeroCard}>
          <View style={styles.suspiciouskinddaHeroCardInner}>
            <Text style={styles.suspiciouskinddaHeroTitle}>
              Defend Yourself, Out Loud
            </Text>
            <Text style={styles.suspiciouskinddaHeroBody}>
              Pick a scenario. Get a wildly suspicious situation. Talk your way
              out of it. The room votes on how convincing you were.
            </Text>
            <Pressable
              onPress={() =>
                suspiciouskinddaNavigation.navigate(
                  'SuspiciouskinddaIdeaspartysetup',
                )
              }
              style={styles.suspiciouskinddaStartBtn}>
              <Text style={styles.suspiciouskinddaStartBtnText}>Start</Text>
            </Pressable>
          </View>
        </LinearGradient>

        <Text style={styles.suspiciouskinddaSectionLabel}>How a round works</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.suspiciouskinddaStepsCard}>
          <View style={styles.suspiciouskinddaStepsCardInner}>
            {suspiciouskinddaIdeasRoundSteps.map(
              (suspiciouskinddaStep, suspiciouskinddaIndex) => (
                <View key={suspiciouskinddaStep.suspiciouskinddaStepTitle}>
                  <View style={styles.suspiciouskinddaStepRow}>
                    <View style={styles.suspiciouskinddaStepBadge}>
                      <Text style={styles.suspiciouskinddaStepBadgeText}>
                        {suspiciouskinddaIndex + 1}
                      </Text>
                    </View>
                    <View style={styles.suspiciouskinddaStepTextWrap}>
                      <Text style={styles.suspiciouskinddaStepTitle}>
                        {suspiciouskinddaStep.suspiciouskinddaStepTitle}
                      </Text>
                      <Text style={styles.suspiciouskinddaStepBody}>
                        {suspiciouskinddaStep.suspiciouskinddaStepBody}
                      </Text>
                    </View>
                  </View>
                  {suspiciouskinddaIndex <
                    suspiciouskinddaIdeasRoundSteps.length - 1 && (
                    <View style={styles.suspiciouskinddaDivider} />
                  )}
                </View>
              ),
            )}
          </View>
        </LinearGradient>
      </View>
    </SuspiciouskinddaIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaRoot: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  suspiciouskinddaHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  suspiciouskinddaHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },
  suspiciouskinddaHeaderIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaHeaderIcon: {
    fontSize: 18,
  },
  suspiciouskinddaHeroCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.3)',
    marginBottom: 24,
    overflow: 'hidden',
  },
  suspiciouskinddaHeroCardInner: {
    padding: 25,
    gap: 20,
  },
  suspiciouskinddaHeroTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    letterSpacing: -0.26,
    color: '#E8EEFF',
  },
  suspiciouskinddaHeroBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },
  suspiciouskinddaStartBtn: {
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
  suspiciouskinddaStartBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
  suspiciouskinddaSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  suspiciouskinddaStepsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  suspiciouskinddaStepsCardInner: {
    padding: 19,
    gap: 11,
  },
  suspiciouskinddaStepRow: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'flex-start',
  },
  suspiciouskinddaStepBadge: {
    width: 29,
    height: 29,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaStepBadgeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    color: '#2EB3FF',
  },
  suspiciouskinddaStepTextWrap: {
    flex: 1,
    gap: 2,
  },
  suspiciouskinddaStepTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  suspiciouskinddaStepBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#4A5478',
  },
  suspiciouskinddaDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginVertical: 11,
  },
});

export default SuspiciouskinddaIdeasparrt;
