import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';

import {BackgroundScreen} from '../components/BackgroundScreen';
import {useCases} from '../context/CasesContext';
import {useParty} from '../context/PartyContext';
import {buildSettingsStats} from '../utils/statsUtils';

export function SettingsScreen() {
  const {cases, progressById} =
    useCases();
  const {
    partySessionsCount,
    reloadPartySessionsCount,
  } = useParty();

  const stats = useMemo(
    () =>
      buildSettingsStats(
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
    <BackgroundScreen>
      <View style={styles.root}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <Text style={styles.sectionLabel}>Statistics</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text
              style={[
                styles.statValue,
                styles.statValueBlue,
              ]}>
              {stats.casesSolved}
            </Text>
            <Text style={styles.statLabel}>Cases Solved</Text>
          </View>

          <View style={styles.statCard}>
            <Text
              style={[
                styles.statValue,
                styles.statValueYellow,
              ]}>
              {stats.suspicionAccuracy}%
            </Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>

          <View style={styles.statCard}>
            <Text
              style={[
                styles.statValue,
                styles.statValueGreen,
              ]}>
              {stats.clearAccuracy}%
            </Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
        </View>

        <View style={styles.accuracyCard}>
          <View style={styles.accuracyHeader}>
            <Text style={styles.accuracyLabel}>
              Suspicion Accuracy
            </Text>
            <Text style={styles.accuracyPercent}>
              {stats.suspicionAccuracy}%
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${stats.suspicionAccuracy}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.partyStatsCard}>
          <Text style={styles.partyStatsIcon}>🏁</Text>
          <View style={styles.partyStatsTextWrap}>
            <Text style={styles.partyStatsLabel}>
              Total Party Sessions
            </Text>
            <Text style={styles.partyStatsValue}>
              {partySessionsCount}
            </Text>
          </View>
        </View>

        <Text style={styles.aboutLabel}>About</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.aboutCard}>
          <View style={styles.aboutCardInner}>
            <Text style={styles.aboutText}>
              A detective notebook for the slightly-unhinged
              observations of modern life. Read cases. Try party mode. Crack codes.
              Trust your gut. Or don't.
            </Text>
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
    paddingBottom: 100,
  },
  headerRow: {
    paddingHorizontal: 4,
    marginBottom: 32,
  },
  headerTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
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
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statCard: {
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
  statValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
  },
  statValueBlue: {
    color: '#2EB3FF',
  },
  statValueYellow: {
    color: '#F7C948',
  },
  statValueGreen: {
    color: '#2DB86B',
  },
  statLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },
  accuracyCard: {
    backgroundColor: '#141D3A',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 16,
    marginBottom: 12,
    gap: 8,
  },
  accuracyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  accuracyLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#8892B0',
  },
  accuracyPercent: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    color: '#2EB3FF',
  },
  progressTrack: {
    height: 6,
    borderRadius: 4,
    backgroundColor: '#1A1F3A',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#2EB3FF',
  },
  partyStatsCard: {
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
  partyStatsIcon: {
    fontSize: 28,
    lineHeight: 42,
  },
  partyStatsTextWrap: {
    gap: 2,
  },
  partyStatsLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#8892B0',
  },
  partyStatsValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    lineHeight: 33,
    color: '#00B4FF',
  },
  aboutLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  aboutCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  aboutCardInner: {
    padding: 19,
  },
  aboutText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
});

