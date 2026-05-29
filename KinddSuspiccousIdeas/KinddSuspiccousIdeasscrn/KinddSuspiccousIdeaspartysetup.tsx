import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import {useKinddSuspiccousIdeasParty} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeaspartyStore';

const kinddSuspiccousIdeasMinPlayers = 2;
const kinddSuspiccousIdeasMaxPlayers = 8;

const KinddSuspiccousIdeaspartysetup = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const {
    kinddSuspiccousSetupPlayers,
    kinddSuspiccousSetupRounds,
    kinddSuspiccousStartGame,
  } = useKinddSuspiccousIdeasParty();

  const [kinddSuspiccousPlayerNames, setKinddSuspiccousPlayerNames] = useState([
    'Player 1',
    'Player 2',
    'Player 3',
  ]);
  const [kinddSuspiccousSelectedRounds, setKinddSuspiccousSelectedRounds] =
    useState(3);

  const kinddSuspiccousRoundOptions = useMemo(
    () =>
      Array.from(
        {length: kinddSuspiccousPlayerNames.length},
        (_, kinddSuspiccousIndex) => kinddSuspiccousIndex + 1,
      ),
    [kinddSuspiccousPlayerNames.length],
  );

  const kinddSuspiccousCanStart =
    kinddSuspiccousPlayerNames.length >= kinddSuspiccousIdeasMinPlayers &&
    kinddSuspiccousPlayerNames.every(
      kinddSuspiccousName => kinddSuspiccousName.trim().length > 0,
    );

  const kinddSuspiccousUpdateName = (
    kinddSuspiccousIndex: number,
    kinddSuspiccousValue: string,
  ) => {
    setKinddSuspiccousPlayerNames(kinddSuspiccousPrev =>
      kinddSuspiccousPrev.map((kinddSuspiccousName, kinddSuspiccousItemIndex) =>
        kinddSuspiccousItemIndex === kinddSuspiccousIndex
          ? kinddSuspiccousValue
          : kinddSuspiccousName,
      ),
    );
  };

  const kinddSuspiccousAddPlayer = () => {
    if (kinddSuspiccousPlayerNames.length >= kinddSuspiccousIdeasMaxPlayers) {
      return;
    }
    setKinddSuspiccousPlayerNames(kinddSuspiccousPrev => [
      ...kinddSuspiccousPrev,
      `Player ${kinddSuspiccousPrev.length + 1}`,
    ]);
  };

  const kinddSuspiccousRemovePlayer = (kinddSuspiccousIndex: number) => {
    if (kinddSuspiccousPlayerNames.length <= kinddSuspiccousIdeasMinPlayers) {
      return;
    }
    setKinddSuspiccousPlayerNames(kinddSuspiccousPrev =>
      kinddSuspiccousPrev.filter(
        (_, kinddSuspiccousItemIndex) =>
          kinddSuspiccousItemIndex !== kinddSuspiccousIndex,
      ),
    );
    setKinddSuspiccousSelectedRounds(kinddSuspiccousPrev =>
      Math.min(kinddSuspiccousPrev, kinddSuspiccousPlayerNames.length - 1),
    );
  };

  const kinddSuspiccousOnContinue = () => {
    if (!kinddSuspiccousCanStart) {
      return;
    }
    const kinddSuspiccousTrimmed = kinddSuspiccousPlayerNames.map(
      kinddSuspiccousName => kinddSuspiccousName.trim(),
    );
    kinddSuspiccousSetupPlayers(kinddSuspiccousTrimmed);
    kinddSuspiccousSetupRounds(kinddSuspiccousSelectedRounds);
    kinddSuspiccousStartGame();
    kinddSuspiccousNavigation.navigate('KinddSuspiccousIdeaspartyspin');
  };

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <View style={styles.kinddSuspiccousTopBar}>
          <Pressable
            onPress={() => kinddSuspiccousNavigation.goBack()}
            style={styles.kinddSuspiccousBackBtn}>
            <Text style={styles.kinddSuspiccousBackIcon}>‹</Text>
          </Pressable>
          <View style={styles.kinddSuspiccousTopTitles}>
            <Text style={styles.kinddSuspiccousTopTitle}>Who's Playing?</Text>
            <Text style={styles.kinddSuspiccousTopSubtitle}>2–8 players</Text>
          </View>
        </View>

        <View style={styles.kinddSuspiccousPlayerList}>
          {kinddSuspiccousPlayerNames.map(
            (kinddSuspiccousName, kinddSuspiccousIndex) => (
              <View
                key={`player-${kinddSuspiccousIndex}`}
                style={styles.kinddSuspiccousPlayerRow}>
                <LinearGradient
                  colors={['#2EB3FF', '#141D3A'] as unknown as string[]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.kinddSuspiccousPlayerBadge}>
                  <Text style={styles.kinddSuspiccousPlayerBadgeText}>
                    {kinddSuspiccousIndex + 1}
                  </Text>
                </LinearGradient>
                <TextInput
                  value={kinddSuspiccousName}
                  onChangeText={kinddSuspiccousValue =>
                    kinddSuspiccousUpdateName(
                      kinddSuspiccousIndex,
                      kinddSuspiccousValue,
                    )
                  }
                  placeholder={`Player ${kinddSuspiccousIndex + 1}`}
                  placeholderTextColor="#4A5478"
                  style={styles.kinddSuspiccousPlayerInput}
                />
                <Pressable
                  onPress={() =>
                    kinddSuspiccousRemovePlayer(kinddSuspiccousIndex)
                  }
                  style={styles.kinddSuspiccousRemoveBtn}>
                  <Text style={styles.kinddSuspiccousRemoveText}>−</Text>
                </Pressable>
              </View>
            ),
          )}
        </View>

        <Pressable
          onPress={kinddSuspiccousAddPlayer}
          style={styles.kinddSuspiccousAddBtn}>
          <Text style={styles.kinddSuspiccousAddText}>+</Text>
        </Pressable>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.kinddSuspiccousRoundsCard}>
          <View style={styles.kinddSuspiccousRoundsCardInner}>
            <Text style={styles.kinddSuspiccousRoundsLabel}>
              {kinddSuspiccousPlayerNames.length} PLAYERS · ROUNDS
            </Text>
            <Text style={styles.kinddSuspiccousRoundsValue}>
              {kinddSuspiccousSelectedRounds}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.kinddSuspiccousRoundPicker}>
          {kinddSuspiccousRoundOptions.map(kinddSuspiccousRound => (
            <Pressable
              key={kinddSuspiccousRound}
              onPress={() =>
                setKinddSuspiccousSelectedRounds(kinddSuspiccousRound)
              }
              style={[
                styles.kinddSuspiccousRoundBtn,
                kinddSuspiccousSelectedRounds === kinddSuspiccousRound &&
                  styles.kinddSuspiccousRoundBtnActive,
              ]}>
              <Text
                style={[
                  styles.kinddSuspiccousRoundBtnText,
                  kinddSuspiccousSelectedRounds === kinddSuspiccousRound &&
                    styles.kinddSuspiccousRoundBtnTextActive,
                ]}>
                {kinddSuspiccousRound}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={kinddSuspiccousOnContinue}
          disabled={!kinddSuspiccousCanStart}
          style={[
            styles.kinddSuspiccousContinueBtn,
            !kinddSuspiccousCanStart &&
              styles.kinddSuspiccousContinueBtnDisabled,
          ]}>
          <Text style={styles.kinddSuspiccousContinueText}>Start Game</Text>
        </Pressable>
      </View>
    </KinddSuspiccousIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousRoot: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  kinddSuspiccousTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  kinddSuspiccousBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousBackIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
  },
  kinddSuspiccousTopTitles: {
    gap: 2,
  },
  kinddSuspiccousTopTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    color: '#FFFFFF',
  },
  kinddSuspiccousTopSubtitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#7D88AD',
  },
  kinddSuspiccousPlayerList: {
    gap: 12,
    marginBottom: 16,
  },
  kinddSuspiccousPlayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  kinddSuspiccousPlayerBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousPlayerBadgeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  kinddSuspiccousPlayerInput: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    paddingHorizontal: 14,
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#E8EEFF',
  },
  kinddSuspiccousRemoveBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousRemoveText: {
    fontSize: 22,
    color: '#7D88AD',
    lineHeight: 22,
  },
  kinddSuspiccousAddBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F7C948',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    alignSelf: 'center',
    marginTop: 15,
  },
  kinddSuspiccousAddText: {
    fontSize: 24,
    lineHeight: 24,
    color: '#1A2347',
    fontWeight: '700',
  },
  kinddSuspiccousRoundsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    marginBottom: 16,
    overflow: 'hidden',
  },
  kinddSuspiccousRoundsCardInner: {
    padding: 19,
    gap: 11,
    alignItems: 'center',
  },
  kinddSuspiccousRoundsLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    marginBottom: 8,
  },
  kinddSuspiccousRoundsValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 56,
    color: '#2EB3FF',
    textShadowColor: 'rgba(46,179,255,0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 16,
  },
  kinddSuspiccousRoundPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  kinddSuspiccousRoundBtn: {
    flex: 1,
    height: 75,
    borderRadius: 20,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousRoundBtnActive: {
    borderColor: '#2EB3FF',
  },
  kinddSuspiccousRoundBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#7D88AD',
  },
  kinddSuspiccousRoundBtnTextActive: {
    color: '#2EB3FF',
  },
  kinddSuspiccousContinueBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  kinddSuspiccousContinueBtnDisabled: {
    opacity: 0.5,
  },
  kinddSuspiccousContinueText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default KinddSuspiccousIdeaspartysetup;
