import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {useNoteSuspCases} from '../noteSuspCtx/NoteSuspCasesContext';
import {useNoteSuspParty} from '../noteSuspCtx/NoteSuspPartyContext';
import {noteSuspBuildSettingsStats} from '../noteSuspUtil/NoteSuspStatsUtils';

export function NoteSuspSettingsScreen() {
  const {cases, progressById} =
    useNoteSuspCases();
  const {
    partySessionsCount,
    reloadPartySessionsCount,
  } = useNoteSuspParty();

  const stats = useMemo(
    () =>
      noteSuspBuildSettingsStats(
        cases,
        progressById,
      ),
    [cases, progressById],
  );

  useFocusEffect(
    useCallback(() => {
      void reloadPartySessionsCount();
    }, [reloadPartySessionsCount]),
  );

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <View style={styles.noteSuspHeaderRow}>
          <Text style={styles.noteSuspHeaderTitle}>Settings</Text>
        </View>

        <Text style={styles.noteSuspSectionLabel}>Statistics</Text>

        <View style={styles.noteSuspStatsRow}>
          <View style={styles.noteSuspStatCard}>
            <Text
              style={[
                styles.noteSuspStatValue,
                styles.noteSuspStatValueBlue,
              ]}>
              {stats.casesSolved}
            </Text>
            <Text style={styles.noteSuspStatLabel}>Cases Solved</Text>
          </View>

          <View style={styles.noteSuspStatCard}>
            <Text
              style={[
                styles.noteSuspStatValue,
                styles.noteSuspStatValueYellow,
              ]}>
              {stats.suspicionAccuracy}%
            </Text>
            <Text style={styles.noteSuspStatLabel}>Accuracy</Text>
          </View>

          <View style={styles.noteSuspStatCard}>
            <Text
              style={[
                styles.noteSuspStatValue,
                styles.noteSuspStatValueGreen,
              ]}>
              {stats.clearAccuracy}%
            </Text>
            <Text style={styles.noteSuspStatLabel}>Accuracy</Text>
          </View>
        </View>

        <View style={styles.noteSuspAccuracyCard}>
          <View style={styles.noteSuspAccuracyHeader}>
            <Text style={styles.noteSuspAccuracyLabel}>
              Suspicion Accuracy
            </Text>
            <Text style={styles.noteSuspAccuracyPercent}>
              {stats.suspicionAccuracy}%
            </Text>
          </View>
          <View style={styles.noteSuspProgressTrack}>
            <View
              style={[
                styles.noteSuspProgressFill,
                {
                  width: `${stats.suspicionAccuracy}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.noteSuspPartyStatsCard}>
          <Text style={styles.noteSuspPartyStatsIcon}>🏁</Text>
          <View style={styles.noteSuspPartyStatsTextWrap}>
            <Text style={styles.noteSuspPartyStatsLabel}>
              Total Party Sessions
            </Text>
            <Text style={styles.noteSuspPartyStatsValue}>
              {partySessionsCount}
            </Text>
          </View>
        </View>

        <Text style={styles.noteSuspAboutLabel}>About</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.noteSuspAboutCard}>
          <View style={styles.noteSuspAboutCardInner}>
            <Text style={styles.noteSuspAboutText}>
              A detective notebook for the slightly-unhinged
              observations of modern life. Read cases. Try party mode. Crack codes.
              Trust your gut. Or don't.
            </Text>
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
    paddingBottom: 100,
  },
  noteSuspHeaderRow: {
    paddingHorizontal: 4,
    marginBottom: 32,
  },
  noteSuspHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
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
  noteSuspStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  noteSuspStatCard: {
    flex: 1,
    height: 84,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    justifyContent: 'center',
    gap: 8,
  },
  noteSuspStatValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
  },
  noteSuspStatValueBlue: {
    color: '#2EB3FF',
  },
  noteSuspStatValueYellow: {
    color: '#F7C948',
  },
  noteSuspStatValueGreen: {
    color: '#2DB86B',
  },
  noteSuspStatLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },
  noteSuspAccuracyCard: {
    backgroundColor: '#141D3A',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 16,
    marginBottom: 12,
    gap: 8,
  },
  noteSuspAccuracyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noteSuspAccuracyLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#8892B0',
  },
  noteSuspAccuracyPercent: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    color: '#2EB3FF',
  },
  noteSuspProgressTrack: {
    height: 6,
    borderRadius: 4,
    backgroundColor: '#1A1F3A',
    overflow: 'hidden',
  },
  noteSuspProgressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#2EB3FF',
  },
  noteSuspPartyStatsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: 'rgba(0,180,255,0.13)',
    borderRadius: 14,
    padding: 15,
    marginBottom: 32,
  },
  noteSuspPartyStatsIcon: {
    fontSize: 28,
    lineHeight: 42,
  },
  noteSuspPartyStatsTextWrap: {
    gap: 2,
  },
  noteSuspPartyStatsLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#8892B0',
  },
  noteSuspPartyStatsValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    lineHeight: 33,
    color: '#00B4FF',
  },
  noteSuspAboutLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  noteSuspAboutCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  noteSuspAboutCardInner: {
    padding: 19,
  },
  noteSuspAboutText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
});

