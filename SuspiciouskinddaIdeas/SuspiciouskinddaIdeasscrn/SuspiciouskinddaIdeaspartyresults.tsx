import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import {useSuspiciouskinddaIdeasParty} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeaspartyStore';

const SuspiciouskinddaIdeaspartyresults = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const {suspiciouskinddaScores, suspiciouskinddaResetGame} =
    useSuspiciouskinddaIdeasParty();

  const suspiciouskinddaSortedScores = useMemo(
    () =>
      [...suspiciouskinddaScores].sort(
        (suspiciouskinddaA, suspiciouskinddaB) =>
          suspiciouskinddaB.suspiciouskinddaTotalPoints -
          suspiciouskinddaA.suspiciouskinddaTotalPoints,
      ),
    [suspiciouskinddaScores],
  );

  const suspiciouskinddaChampion = suspiciouskinddaSortedScores[0];
  const suspiciouskinddaChampionAvg =
    suspiciouskinddaChampion &&
    suspiciouskinddaChampion.suspiciouskinddaTurnCount > 0
      ? Math.round(
          suspiciouskinddaChampion.suspiciouskinddaVoteSum /
            suspiciouskinddaChampion.suspiciouskinddaTurnCount,
        )
      : 0;

  const suspiciouskinddaOnHome = () => {
    suspiciouskinddaResetGame();
    suspiciouskinddaNavigation.reset({
      index: 0,
      routes: [{name: 'SuspiciouskinddaIdeastab'}],
    });
  };

  if (!suspiciouskinddaChampion) {
    return null;
  }

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <Image
          source={require('../../assts/immgs/result.png')}
          style={{marginBottom: 20}}
        />
        <Text style={styles.suspiciouskinddaChampionLabel}>
          Champion of Suspicion
        </Text>
        <Text style={styles.suspiciouskinddaChampionName}>
          {suspiciouskinddaChampion.suspiciouskinddaPlayerName}
        </Text>
        <Text style={styles.suspiciouskinddaChampionPoints}>
          {suspiciouskinddaChampion.suspiciouskinddaTotalPoints}
        </Text>
        <Text style={styles.suspiciouskinddaChampionMeta}>
          total points · {suspiciouskinddaChampionAvg}% avg defense
        </Text>

        <View style={styles.suspiciouskinddaLeaderboard}>
          {suspiciouskinddaSortedScores.map(
            (suspiciouskinddaItem, suspiciouskinddaIndex) => {
              const suspiciouskinddaAvg =
                suspiciouskinddaItem.suspiciouskinddaTurnCount > 0
                  ? Math.round(
                      suspiciouskinddaItem.suspiciouskinddaVoteSum /
                        suspiciouskinddaItem.suspiciouskinddaTurnCount,
                    )
                  : 0;
              const suspiciouskinddaIsFirst = suspiciouskinddaIndex === 0;

              return (
                <LinearGradient
                  key={suspiciouskinddaItem.suspiciouskinddaPlayerName}
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={[
                    styles.suspiciouskinddaRow,
                    suspiciouskinddaIsFirst && styles.suspiciouskinddaRowFirst,
                  ]}>
                  <View style={styles.suspiciouskinddaRowInner}>
                    <View
                      style={[
                        styles.suspiciouskinddaRankBadge,
                        suspiciouskinddaIsFirst
                          ? styles.suspiciouskinddaRankBadgeFirst
                          : styles.suspiciouskinddaRankBadgeOther,
                      ]}>
                      <Text
                        style={[
                          styles.suspiciouskinddaRankText,
                          suspiciouskinddaIsFirst &&
                            styles.suspiciouskinddaRankTextFirst,
                        ]}>
                        {suspiciouskinddaIndex + 1}
                      </Text>
                    </View>
                    <View style={styles.suspiciouskinddaRowInfo}>
                      <Text style={styles.suspiciouskinddaRowName}>
                        {suspiciouskinddaItem.suspiciouskinddaPlayerName}
                      </Text>
                      <Text style={styles.suspiciouskinddaRowMeta}>
                        {suspiciouskinddaItem.suspiciouskinddaTurnCount} turns ·{' '}
                        {suspiciouskinddaAvg}% avg
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.suspiciouskinddaRowScore,
                        suspiciouskinddaIsFirst &&
                          styles.suspiciouskinddaRowScoreFirst,
                      ]}>
                      {suspiciouskinddaItem.suspiciouskinddaTotalPoints}
                    </Text>
                  </View>
                </LinearGradient>
              );
            },
          )}
        </View>

        <Pressable
          onPress={suspiciouskinddaOnHome}
          style={styles.suspiciouskinddaHomeBtn}>
          <Text style={styles.suspiciouskinddaHomeText}>Home</Text>
        </Pressable>
      </View>
    </SuspiciouskinddaIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaRoot: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    paddingBottom: 44,
    alignItems: 'center',
  },
  suspiciouskinddaChampionIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  suspiciouskinddaChampionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  suspiciouskinddaChampionName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  suspiciouskinddaChampionPoints: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 48,
    color: '#F7C948',
    marginBottom: 4,
  },
  suspiciouskinddaChampionMeta: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#7D88AD',
    marginBottom: 32,
  },
  suspiciouskinddaLeaderboard: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  suspiciouskinddaRow: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A2347',
    overflow: 'hidden',
  },
  suspiciouskinddaRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  suspiciouskinddaRowFirst: {
    borderColor: '#F7C948',
  },
  suspiciouskinddaRankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaRankBadgeFirst: {
    backgroundColor: '#F7C948',
  },
  suspiciouskinddaRankBadgeOther: {
    backgroundColor: '#4A5478',
  },
  suspiciouskinddaRankText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  suspiciouskinddaRankTextFirst: {
    color: '#1A2347',
  },
  suspiciouskinddaRowInfo: {
    flex: 1,
    gap: 2,
  },
  suspiciouskinddaRowName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  suspiciouskinddaRowMeta: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#7D88AD',
  },
  suspiciouskinddaRowScore: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
  },
  suspiciouskinddaRowScoreFirst: {
    color: '#F7C948',
  },
  suspiciouskinddaHomeBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  suspiciouskinddaHomeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default SuspiciouskinddaIdeaspartyresults;
