import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import {useKinddSuspiccousIdeasParty} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeaspartyStore';

const KinddSuspiccousIdeaspartyresults = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const {kinddSuspiccousScores, kinddSuspiccousResetGame} =
    useKinddSuspiccousIdeasParty();

  const kinddSuspiccousSortedScores = useMemo(
    () =>
      [...kinddSuspiccousScores].sort(
        (kinddSuspiccousA, kinddSuspiccousB) =>
          kinddSuspiccousB.kinddSuspiccousTotalPoints -
          kinddSuspiccousA.kinddSuspiccousTotalPoints,
      ),
    [kinddSuspiccousScores],
  );

  const kinddSuspiccousChampion = kinddSuspiccousSortedScores[0];
  const kinddSuspiccousChampionAvg =
    kinddSuspiccousChampion &&
    kinddSuspiccousChampion.kinddSuspiccousTurnCount > 0
      ? Math.round(
          kinddSuspiccousChampion.kinddSuspiccousVoteSum /
            kinddSuspiccousChampion.kinddSuspiccousTurnCount,
        )
      : 0;

  const kinddSuspiccousOnHome = () => {
    kinddSuspiccousResetGame();
    kinddSuspiccousNavigation.reset({
      index: 0,
      routes: [{name: 'KinddSuspiccousIdeastab'}],
    });
  };

  if (!kinddSuspiccousChampion) {
    return null;
  }

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <Image
          source={require('../../assts/immgs/result.png')}
          style={{marginBottom: 20}}
        />
        <Text style={styles.kinddSuspiccousChampionLabel}>
          Champion of Suspicion
        </Text>
        <Text style={styles.kinddSuspiccousChampionName}>
          {kinddSuspiccousChampion.kinddSuspiccousPlayerName}
        </Text>
        <Text style={styles.kinddSuspiccousChampionPoints}>
          {kinddSuspiccousChampion.kinddSuspiccousTotalPoints}
        </Text>
        <Text style={styles.kinddSuspiccousChampionMeta}>
          total points · {kinddSuspiccousChampionAvg}% avg defense
        </Text>

        <View style={styles.kinddSuspiccousLeaderboard}>
          {kinddSuspiccousSortedScores.map(
            (kinddSuspiccousItem, kinddSuspiccousIndex) => {
              const kinddSuspiccousAvg =
                kinddSuspiccousItem.kinddSuspiccousTurnCount > 0
                  ? Math.round(
                      kinddSuspiccousItem.kinddSuspiccousVoteSum /
                        kinddSuspiccousItem.kinddSuspiccousTurnCount,
                    )
                  : 0;
              const kinddSuspiccousIsFirst = kinddSuspiccousIndex === 0;

              return (
                <LinearGradient
                  key={kinddSuspiccousItem.kinddSuspiccousPlayerName}
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={[
                    styles.kinddSuspiccousRow,
                    kinddSuspiccousIsFirst && styles.kinddSuspiccousRowFirst,
                  ]}>
                  <View style={styles.kinddSuspiccousRowInner}>
                    <View
                      style={[
                        styles.kinddSuspiccousRankBadge,
                        kinddSuspiccousIsFirst
                          ? styles.kinddSuspiccousRankBadgeFirst
                          : styles.kinddSuspiccousRankBadgeOther,
                      ]}>
                      <Text
                        style={[
                          styles.kinddSuspiccousRankText,
                          kinddSuspiccousIsFirst &&
                            styles.kinddSuspiccousRankTextFirst,
                        ]}>
                        {kinddSuspiccousIndex + 1}
                      </Text>
                    </View>
                    <View style={styles.kinddSuspiccousRowInfo}>
                      <Text style={styles.kinddSuspiccousRowName}>
                        {kinddSuspiccousItem.kinddSuspiccousPlayerName}
                      </Text>
                      <Text style={styles.kinddSuspiccousRowMeta}>
                        {kinddSuspiccousItem.kinddSuspiccousTurnCount} turns ·{' '}
                        {kinddSuspiccousAvg}% avg
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.kinddSuspiccousRowScore,
                        kinddSuspiccousIsFirst &&
                          styles.kinddSuspiccousRowScoreFirst,
                      ]}>
                      {kinddSuspiccousItem.kinddSuspiccousTotalPoints}
                    </Text>
                  </View>
                </LinearGradient>
              );
            },
          )}
        </View>

        <Pressable
          onPress={kinddSuspiccousOnHome}
          style={styles.kinddSuspiccousHomeBtn}>
          <Text style={styles.kinddSuspiccousHomeText}>Home</Text>
        </Pressable>
      </View>
    </KinddSuspiccousIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousRoot: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
    paddingBottom: 44,
    alignItems: 'center',
  },
  kinddSuspiccousChampionIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  kinddSuspiccousChampionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  kinddSuspiccousChampionName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  kinddSuspiccousChampionPoints: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 48,
    color: '#F7C948',
    marginBottom: 4,
  },
  kinddSuspiccousChampionMeta: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#7D88AD',
    marginBottom: 32,
  },
  kinddSuspiccousLeaderboard: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  kinddSuspiccousRow: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A2347',
    overflow: 'hidden',
  },
  kinddSuspiccousRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  kinddSuspiccousRowFirst: {
    borderColor: '#F7C948',
  },
  kinddSuspiccousRankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousRankBadgeFirst: {
    backgroundColor: '#F7C948',
  },
  kinddSuspiccousRankBadgeOther: {
    backgroundColor: '#4A5478',
  },
  kinddSuspiccousRankText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  kinddSuspiccousRankTextFirst: {
    color: '#1A2347',
  },
  kinddSuspiccousRowInfo: {
    flex: 1,
    gap: 2,
  },
  kinddSuspiccousRowName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  kinddSuspiccousRowMeta: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#7D88AD',
  },
  kinddSuspiccousRowScore: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
  },
  kinddSuspiccousRowScoreFirst: {
    color: '#F7C948',
  },
  kinddSuspiccousHomeBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  kinddSuspiccousHomeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default KinddSuspiccousIdeaspartyresults;
