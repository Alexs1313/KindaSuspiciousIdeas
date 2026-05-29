import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import {useKinddSuspiccousIdeasCases} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeascasesStore';
import {useKinddSuspiccousIdeasParty} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeaspartyStore';
import {kinddSuspiccousIdeasBuildSettingsStats} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeasstatsUtils';

const KinddSuspiccousIdeassttgs = () => {
  const {kinddSuspiccousCases, kinddSuspiccousProgressById} =
    useKinddSuspiccousIdeasCases();
  const {
    kinddSuspiccousGamesPlayedCount,
    kinddSuspiccousReloadGamesPlayedCount,
  } = useKinddSuspiccousIdeasParty();

  const kinddSuspiccousStats = useMemo(
    () =>
      kinddSuspiccousIdeasBuildSettingsStats(
        kinddSuspiccousCases,
        kinddSuspiccousProgressById,
      ),
    [kinddSuspiccousCases, kinddSuspiccousProgressById],
  );

  useFocusEffect(
    useCallback(() => {
      void kinddSuspiccousReloadGamesPlayedCount();
    }, [kinddSuspiccousReloadGamesPlayedCount]),
  );

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <View style={styles.kinddSuspiccousHeaderRow}>
          <Text style={styles.kinddSuspiccousHeaderTitle}>Settings</Text>
        </View>

        <Text style={styles.kinddSuspiccousSectionLabel}>Statistics</Text>

        <View style={styles.kinddSuspiccousStatsRow}>
          <View style={styles.kinddSuspiccousStatCard}>
            <Text
              style={[
                styles.kinddSuspiccousStatValue,
                styles.kinddSuspiccousStatValueBlue,
              ]}>
              {kinddSuspiccousStats.kinddSuspiccousCasesSolved}
            </Text>
            <Text style={styles.kinddSuspiccousStatLabel}>Cases Solved</Text>
          </View>

          <View style={styles.kinddSuspiccousStatCard}>
            <Text
              style={[
                styles.kinddSuspiccousStatValue,
                styles.kinddSuspiccousStatValueYellow,
              ]}>
              {kinddSuspiccousStats.kinddSuspiccousSuspicionAccuracy}%
            </Text>
            <Text style={styles.kinddSuspiccousStatLabel}>Accuracy</Text>
          </View>

          <View style={styles.kinddSuspiccousStatCard}>
            <Text
              style={[
                styles.kinddSuspiccousStatValue,
                styles.kinddSuspiccousStatValueGreen,
              ]}>
              {kinddSuspiccousStats.kinddSuspiccousClearAccuracy}%
            </Text>
            <Text style={styles.kinddSuspiccousStatLabel}>Accuracy</Text>
          </View>
        </View>

        <View style={styles.kinddSuspiccousAccuracyCard}>
          <View style={styles.kinddSuspiccousAccuracyHeader}>
            <Text style={styles.kinddSuspiccousAccuracyLabel}>
              Suspicion Accuracy
            </Text>
            <Text style={styles.kinddSuspiccousAccuracyPercent}>
              {kinddSuspiccousStats.kinddSuspiccousSuspicionAccuracy}%
            </Text>
          </View>
          <View style={styles.kinddSuspiccousProgressTrack}>
            <View
              style={[
                styles.kinddSuspiccousProgressFill,
                {
                  width: `${kinddSuspiccousStats.kinddSuspiccousSuspicionAccuracy}%`,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.kinddSuspiccousGamesCard}>
          <Text style={styles.kinddSuspiccousGamesIcon}>🏁</Text>
          <View style={styles.kinddSuspiccousGamesTextWrap}>
            <Text style={styles.kinddSuspiccousGamesLabel}>
              Total Games Played
            </Text>
            <Text style={styles.kinddSuspiccousGamesValue}>
              {kinddSuspiccousGamesPlayedCount}
            </Text>
          </View>
        </View>

        <Text style={styles.kinddSuspiccousAboutLabel}>About</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.kinddSuspiccousAboutCard}>
          <View style={styles.kinddSuspiccousAboutCardInner}>
            <Text style={styles.kinddSuspiccousAboutText}>
              A playful detective notebook for the slightly-unhinged
              observations of modern life. Read cases. Play party mode. Crack codes.
              Trust your gut. Or don't.
            </Text>
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
    paddingBottom: 100,
  },
  kinddSuspiccousHeaderRow: {
    paddingHorizontal: 4,
    marginBottom: 32,
  },
  kinddSuspiccousHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
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
  kinddSuspiccousStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  kinddSuspiccousStatCard: {
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
  kinddSuspiccousStatValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
  },
  kinddSuspiccousStatValueBlue: {
    color: '#2EB3FF',
  },
  kinddSuspiccousStatValueYellow: {
    color: '#F7C948',
  },
  kinddSuspiccousStatValueGreen: {
    color: '#2DB86B',
  },
  kinddSuspiccousStatLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
  },
  kinddSuspiccousAccuracyCard: {
    backgroundColor: '#141D3A',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 16,
    marginBottom: 12,
    gap: 8,
  },
  kinddSuspiccousAccuracyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kinddSuspiccousAccuracyLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#8892B0',
  },
  kinddSuspiccousAccuracyPercent: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    color: '#2EB3FF',
  },
  kinddSuspiccousProgressTrack: {
    height: 6,
    borderRadius: 4,
    backgroundColor: '#1A1F3A',
    overflow: 'hidden',
  },
  kinddSuspiccousProgressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#2EB3FF',
  },
  kinddSuspiccousGamesCard: {
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
  kinddSuspiccousGamesIcon: {
    fontSize: 28,
    lineHeight: 42,
  },
  kinddSuspiccousGamesTextWrap: {
    gap: 2,
  },
  kinddSuspiccousGamesLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#8892B0',
  },
  kinddSuspiccousGamesValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    lineHeight: 33,
    color: '#00B4FF',
  },
  kinddSuspiccousAboutLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  kinddSuspiccousAboutCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
  },
  kinddSuspiccousAboutCardInner: {
    padding: 19,
  },
  kinddSuspiccousAboutText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
});

export default KinddSuspiccousIdeassttgs;
