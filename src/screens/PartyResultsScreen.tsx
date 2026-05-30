import React, {useMemo} from 'react';
import {images} from '../assets';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {BackgroundScreen} from '../components/BackgroundScreen';
import {useParty} from '../context/PartyContext';
import {resetToMain} from '../navigation/rootNavigation';

export function PartyResultsScreen() {
  const navigation = useNavigation<any>();
  const {scores, resetGame} =
    useParty();

  const sortedScores = useMemo(
    () =>
      [...scores].sort(
        (a, b) =>
          b.totalPoints -
          a.totalPoints,
      ),
    [scores],
  );

  const champion = sortedScores[0];
  const championAvg =
    champion &&
    champion.turnCount > 0
      ? Math.round(
          champion.voteSum /
            champion.turnCount,
        )
      : 0;

  const onHome = () => {
    resetGame();
    resetToMain();
  };

  if (!champion) {
    return null;
  }

  return (
    <BackgroundScreen>
      <View style={styles.root}>
        <Image
          source={images.result}
          style={{marginBottom: 20}}
        />
        <Text style={styles.championLabel}>
          Champion of Suspicion
        </Text>
        <Text style={styles.championName}>
          {champion.playerName}
        </Text>
        <Text style={styles.championPoints}>
          {champion.totalPoints}
        </Text>
        <Text style={styles.championMeta}>
          total points · {championAvg}% avg defense
        </Text>

        <View style={styles.leaderboard}>
          {sortedScores.map(
            (item, index) => {
              const avg =
                item.turnCount > 0
                  ? Math.round(
                      item.voteSum /
                        item.turnCount,
                    )
                  : 0;
              const isFirst = index === 0;

              return (
                <LinearGradient
                  key={item.playerName}
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={[
                    styles.row,
                    isFirst && styles.rowFirst,
                  ]}>
                  <View style={styles.rowInner}>
                    <View
                      style={[
                        styles.rankBadge,
                        isFirst
                          ? styles.rankBadgeFirst
                          : styles.rankBadgeOther,
                      ]}>
                      <Text
                        style={[
                          styles.rankText,
                          isFirst &&
                            styles.rankTextFirst,
                        ]}>
                        {index + 1}
                      </Text>
                    </View>
                    <View style={styles.rowInfo}>
                      <Text style={styles.rowName}>
                        {item.playerName}
                      </Text>
                      <Text style={styles.rowMeta}>
                        {item.turnCount} turns ·{' '}
                        {avg}% avg
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.rowScore,
                        isFirst &&
                          styles.rowScoreFirst,
                      ]}>
                      {item.totalPoints}
                    </Text>
                  </View>
                </LinearGradient>
              );
            },
          )}
        </View>

        <Pressable
          onPress={onHome}
          style={styles.homeBtn}>
          <Text style={styles.homeText}>Home</Text>
        </Pressable>
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 44,
    alignItems: 'center',
  },
  championIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  championLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  championName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  championPoints: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 48,
    color: '#F7C948',
    marginBottom: 4,
  },
  championMeta: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#7D88AD',
    marginBottom: 32,
  },
  leaderboard: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  row: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A2347',
    overflow: 'hidden',
  },
  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  rowFirst: {
    borderColor: '#F7C948',
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBadgeFirst: {
    backgroundColor: '#F7C948',
  },
  rankBadgeOther: {
    backgroundColor: '#4A5478',
  },
  rankText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  rankTextFirst: {
    color: '#1A2347',
  },
  rowInfo: {
    flex: 1,
    gap: 2,
  },
  rowName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  rowMeta: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#7D88AD',
  },
  rowScore: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
  },
  rowScoreFirst: {
    color: '#F7C948',
  },
  homeBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  homeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

