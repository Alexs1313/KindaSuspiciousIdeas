import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import {useSuspiciouskinddaIdeasCases} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeascasesStore';
import {useSuspiciouskinddaIdeasParty} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeaspartyStore';
import {suspiciouskinddaIdeasBuildSettingsStats} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeasstatsUtils';

const SuspiciouskinddaIdeassttgs = () => {
  const {suspiciouskinddaCases, suspiciouskinddaProgressById} =
    useSuspiciouskinddaIdeasCases();
  const {
    suspiciouskinddaGamesPlayedCount,
    suspiciouskinddaReloadGamesPlayedCount,
  } = useSuspiciouskinddaIdeasParty();

  const suspiciouskinddaStats = useMemo(
    () =>
      suspiciouskinddaIdeasBuildSettingsStats(
        suspiciouskinddaCases,
        suspiciouskinddaProgressById,
      ),
    [suspiciouskinddaCases, suspiciouskinddaProgressById],
  );

  useFocusEffect(
    useCallback(() => {
      void suspiciouskinddaReloadGamesPlayedCount();
    }, [suspiciouskinddaReloadGamesPlayedCount]),
  );

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <View style={styles.suspiciouskinddaHeaderRow}>
          <Text style={styles.suspiciouskinddaHeaderTitle}>Settings</Text>
        </View>

        <Text style={styles.suspiciouskinddaSectionLabel}>Statistics</Text>

        <View style={styles.suspiciouskinddaStatsRow}>
          <View style={styles.suspiciouskinddaStatCard}>
            <Text
              style={[
                styles.suspiciouskinddaStatValue,
                styles.suspiciouskinddaStatValueBlue,
              ]}>
              {suspiciouskinddaStats.suspiciouskinddaCasesSolved}
            </Text>
            <Text style={styles.suspiciouskinddaStatLabel}>Cases Solved</Text>
          </View>

          <View style={styles.suspiciouskinddaStatCard}>
            <Text
              style={[
                styles.suspiciouskinddaStatValue,
                styles.suspiciouskinddaStatValueYellow,
              ]}>
              {suspiciouskinddaStats.suspiciouskinddaSuspicionAccuracy}%
            </Text>
            <Text style={styles.suspiciouskinddaStatLabel}>Accuracy</Text>
          </View>

          <View style={styles.suspiciouskinddaStatCard}>
            <Text
              style={[
                styles.suspiciouskinddaStatValue,
                styles.suspiciouskinddaStatValueGreen,
              ]}>
              {suspiciouskinddaStats.suspiciouskinddaClearAccuracy}%
            </Text>
            <Text style={styles.suspiciouskinddaStatLabel}>Accuracy</Text>
          </View>
        </View>

        <View style={styles.suspiciouskinddaAccuracyCard}>
          <View style={styles.suspiciouskinddaAccuracyHeader}>
            <Text style={styles.suspiciouskinddaAccuracyLabel}>
              Suspicion Accuracy
            </Text>
            <Text style={styles.suspiciouskinddaAccuracyPercent}>
              {suspiciouskinddaStats.suspiciouskinddaSuspicionAccuracy}%
            </Text>
          </View>
          <View style={styles.suspiciouskinddaProgressTrack}>
            <View
              style={[
                styles.suspiciouskinddaProgressFill,
                {
                  width: `${suspiciouskinddaStats.suspiciouskinddaSuspicionAccuracy}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.suspiciouskinddaGamesCard}>
          <Text style={styles.suspiciouskinddaGamesIcon}>🏁</Text>
          <View style={styles.suspiciouskinddaGamesTextWrap}>
            <Text style={styles.suspiciouskinddaGamesLabel}>
              Total Rounds Played
            </Text>
            <Text style={styles.suspiciouskinddaGamesValue}>
              {suspiciouskinddaGamesPlayedCount}
            </Text>
          </View>
        </View>

        <Text style={styles.suspiciouskinddaAboutLabel}>About</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.suspiciouskinddaAboutCard}>
          <View style={styles.suspiciouskinddaAboutCardInner}>
            <Text style={styles.suspiciouskinddaAboutText}>
              A playful detective notebook for the slightly-unhinged
              observations of modern life. Read cases. Try party mode. Crack codes.
              Trust your gut. Or don't.
            </Text>
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
    paddingBottom: 100,
  },
  suspiciouskinddaHeaderRow: {
    paddingHorizontal: 4,
    marginBottom: 32,
  },
  suspiciouskinddaHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
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
  suspiciouskinddaStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  suspiciouskinddaStatCard: {
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
  suspiciouskinddaStatValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
  },
  suspiciouskinddaStatValueBlue: {
    color: '#2EB3FF',
  },
  suspiciouskinddaStatValueYellow: {
    color: '#F7C948',
  },
  suspiciouskinddaStatValueGreen: {
    color: '#2DB86B',
  },
  suspiciouskinddaStatLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },
  suspiciouskinddaAccuracyCard: {
    backgroundColor: '#141D3A',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 16,
    marginBottom: 12,
    gap: 8,
  },
  suspiciouskinddaAccuracyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  suspiciouskinddaAccuracyLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#8892B0',
  },
  suspiciouskinddaAccuracyPercent: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    color: '#2EB3FF',
  },
  suspiciouskinddaProgressTrack: {
    height: 6,
    borderRadius: 4,
    backgroundColor: '#1A1F3A',
    overflow: 'hidden',
  },
  suspiciouskinddaProgressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#2EB3FF',
  },
  suspiciouskinddaGamesCard: {
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
  suspiciouskinddaGamesIcon: {
    fontSize: 28,
    lineHeight: 42,
  },
  suspiciouskinddaGamesTextWrap: {
    gap: 2,
  },
  suspiciouskinddaGamesLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#8892B0',
  },
  suspiciouskinddaGamesValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    lineHeight: 33,
    color: '#00B4FF',
  },
  suspiciouskinddaAboutLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  suspiciouskinddaAboutCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  suspiciouskinddaAboutCardInner: {
    padding: 19,
  },
  suspiciouskinddaAboutText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
});

export default SuspiciouskinddaIdeassttgs;
