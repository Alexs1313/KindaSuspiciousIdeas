import React, {useMemo} from 'react';
import {noteSuspImages} from '../noteSuspAssts';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {useNoteSuspParty} from '../noteSuspCtx/NoteSuspPartyContext';
import {noteSuspResetToMain} from '../noteSuspNav/NoteSuspRootNavigation';

export function NoteSuspPartyResultsScreen() {
  const navigation = useNavigation<any>();
  const {scores, resetParty} =
    useNoteSuspParty();

  const sortedScores = useMemo(
    () =>
      [...scores].sort(
        (a, b) =>
          b.totalPoints -
          a.totalPoints,
      ),
    [scores],
  );

  const topGuest = sortedScores[0];
  const topGuestAvg =
    topGuest &&
    topGuest.turnCount > 0
      ? Math.round(
          topGuest.voteSum /
            topGuest.turnCount,
        )
      : 0;

  const onHome = () => {
    resetParty();
    noteSuspResetToMain();
  };

  if (!topGuest) {
    return null;
  }

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <Image
          source={noteSuspImages.result}
          style={{marginBottom: 20}}
        />
        <Text style={styles.noteSuspTopGuestLabel}>
          Top Score
        </Text>
        <Text style={styles.noteSuspTopGuestName}>
          {topGuest.guestName}
        </Text>
        <Text style={styles.noteSuspTopGuestPoints}>
          {topGuest.totalPoints}
        </Text>
        <Text style={styles.noteSuspTopGuestMeta}>
          total points · {topGuestAvg}% avg defense
        </Text>

        <View style={styles.noteSuspLeaderboard}>
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
                  key={item.guestName}
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={[
                    styles.noteSuspRow,
                    isFirst && styles.noteSuspRowFirst,
                  ]}>
                  <View style={styles.noteSuspRowInner}>
                    <View
                      style={[
                        styles.noteSuspRankBadge,
                        isFirst
                          ? styles.noteSuspRankBadgeFirst
                          : styles.noteSuspRankBadgeOther,
                      ]}>
                      <Text
                        style={[
                          styles.noteSuspRankText,
                          isFirst &&
                            styles.noteSuspRankTextFirst,
                        ]}>
                        {index + 1}
                      </Text>
                    </View>
                    <View style={styles.noteSuspRowInfo}>
                      <Text style={styles.noteSuspRowName}>
                        {item.guestName}
                      </Text>
                      <Text style={styles.noteSuspRowMeta}>
                        {item.turnCount} turns ·{' '}
                        {avg}% avg
                      </Text>
                    </View>
                    <Text
                      style={[
                        styles.noteSuspRowScore,
                        isFirst &&
                          styles.noteSuspRowScoreFirst,
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
          style={styles.noteSuspHomeBtn}>
          <Text style={styles.noteSuspHomeText}>Home</Text>
        </Pressable>
      </View>
    </NoteSuspBackgroundLayout>
  );
};

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 44,
    alignItems: 'center',
  },
  noteSuspTopGuestLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  noteSuspTopGuestName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  noteSuspTopGuestPoints: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 48,
    color: '#F7C948',
    marginBottom: 4,
  },
  noteSuspTopGuestMeta: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#7D88AD',
    marginBottom: 32,
  },
  noteSuspLeaderboard: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  noteSuspRow: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1A2347',
    overflow: 'hidden',
  },
  noteSuspRowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  noteSuspRowFirst: {
    borderColor: '#F7C948',
  },
  noteSuspRankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspRankBadgeFirst: {
    backgroundColor: '#F7C948',
  },
  noteSuspRankBadgeOther: {
    backgroundColor: '#4A5478',
  },
  noteSuspRankText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  noteSuspRankTextFirst: {
    color: '#1A2347',
  },
  noteSuspRowInfo: {
    flex: 1,
    gap: 2,
  },
  noteSuspRowName: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  noteSuspRowMeta: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    color: '#7D88AD',
  },
  noteSuspRowScore: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
  },
  noteSuspRowScoreFirst: {
    color: '#F7C948',
  },
  noteSuspHomeBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  noteSuspHomeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

