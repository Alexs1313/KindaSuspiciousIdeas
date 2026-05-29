import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import {useSuspiciouskinddaIdeasParty} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeaspartyStore';

const suspiciouskinddaIdeasMinPlayers = 2;
const suspiciouskinddaIdeasMaxPlayers = 8;

const SuspiciouskinddaIdeaspartysetup = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const {
    suspiciouskinddaSetupPlayers,
    suspiciouskinddaSetupRounds,
    suspiciouskinddaStartGame,
  } = useSuspiciouskinddaIdeasParty();

  const [suspiciouskinddaPlayerNames, setSuspiciouskinddaPlayerNames] = useState([
    'Guest 1',
    'Guest 2',
    'Guest 3',
  ]);
  const [suspiciouskinddaSelectedRounds, setSuspiciouskinddaSelectedRounds] =
    useState(3);

  const suspiciouskinddaRoundOptions = useMemo(
    () =>
      Array.from(
        {length: suspiciouskinddaPlayerNames.length},
        (_, suspiciouskinddaIndex) => suspiciouskinddaIndex + 1,
      ),
    [suspiciouskinddaPlayerNames.length],
  );

  const suspiciouskinddaCanStart =
    suspiciouskinddaPlayerNames.length >= suspiciouskinddaIdeasMinPlayers &&
    suspiciouskinddaPlayerNames.every(
      suspiciouskinddaName => suspiciouskinddaName.trim().length > 0,
    );

  const suspiciouskinddaUpdateName = (
    suspiciouskinddaIndex: number,
    suspiciouskinddaValue: string,
  ) => {
    setSuspiciouskinddaPlayerNames(suspiciouskinddaPrev =>
      suspiciouskinddaPrev.map((suspiciouskinddaName, suspiciouskinddaItemIndex) =>
        suspiciouskinddaItemIndex === suspiciouskinddaIndex
          ? suspiciouskinddaValue
          : suspiciouskinddaName,
      ),
    );
  };

  const suspiciouskinddaAddPlayer = () => {
    if (suspiciouskinddaPlayerNames.length >= suspiciouskinddaIdeasMaxPlayers) {
      return;
    }
    setSuspiciouskinddaPlayerNames(suspiciouskinddaPrev => [
      ...suspiciouskinddaPrev,
      `Guest ${suspiciouskinddaPrev.length + 1}`,
    ]);
  };

  const suspiciouskinddaRemovePlayer = (suspiciouskinddaIndex: number) => {
    if (suspiciouskinddaPlayerNames.length <= suspiciouskinddaIdeasMinPlayers) {
      return;
    }
    setSuspiciouskinddaPlayerNames(suspiciouskinddaPrev =>
      suspiciouskinddaPrev.filter(
        (_, suspiciouskinddaItemIndex) =>
          suspiciouskinddaItemIndex !== suspiciouskinddaIndex,
      ),
    );
    setSuspiciouskinddaSelectedRounds(suspiciouskinddaPrev =>
      Math.min(suspiciouskinddaPrev, suspiciouskinddaPlayerNames.length - 1),
    );
  };

  const suspiciouskinddaOnContinue = () => {
    if (!suspiciouskinddaCanStart) {
      return;
    }
    const suspiciouskinddaTrimmed = suspiciouskinddaPlayerNames.map(
      suspiciouskinddaName => suspiciouskinddaName.trim(),
    );
    suspiciouskinddaSetupPlayers(suspiciouskinddaTrimmed);
    suspiciouskinddaSetupRounds(suspiciouskinddaSelectedRounds);
    suspiciouskinddaStartGame();
    suspiciouskinddaNavigation.navigate('SuspiciouskinddaIdeaspartyspin');
  };

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <View style={styles.suspiciouskinddaTopBar}>
          <Pressable
            onPress={() => suspiciouskinddaNavigation.goBack()}
            style={styles.suspiciouskinddaBackBtn}>
            <Text style={styles.suspiciouskinddaBackIcon}>‹</Text>
          </Pressable>
          <View style={styles.suspiciouskinddaTopTitles}>
            <Text style={styles.suspiciouskinddaTopTitle}>Who's Playing?</Text>
            <Text style={styles.suspiciouskinddaTopSubtitle}>2–8 guests</Text>
          </View>
        </View>

        <View style={styles.suspiciouskinddaPlayerList}>
          {suspiciouskinddaPlayerNames.map(
            (suspiciouskinddaName, suspiciouskinddaIndex) => (
              <View
                key={`player-${suspiciouskinddaIndex}`}
                style={styles.suspiciouskinddaPlayerRow}>
                <LinearGradient
                  colors={['#2EB3FF', '#141D3A'] as unknown as string[]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.suspiciouskinddaPlayerBadge}>
                  <Text style={styles.suspiciouskinddaPlayerBadgeText}>
                    {suspiciouskinddaIndex + 1}
                  </Text>
                </LinearGradient>
                <TextInput
                  value={suspiciouskinddaName}
                  onChangeText={suspiciouskinddaValue =>
                    suspiciouskinddaUpdateName(
                      suspiciouskinddaIndex,
                      suspiciouskinddaValue,
                    )
                  }
                  placeholder={`Guest ${suspiciouskinddaIndex + 1}`}
                  placeholderTextColor="#4A5478"
                  style={styles.suspiciouskinddaPlayerInput}
                />
                <Pressable
                  onPress={() =>
                    suspiciouskinddaRemovePlayer(suspiciouskinddaIndex)
                  }
                  style={styles.suspiciouskinddaRemoveBtn}>
                  <Text style={styles.suspiciouskinddaRemoveText}>−</Text>
                </Pressable>
              </View>
            ),
          )}
        </View>

        <Pressable
          onPress={suspiciouskinddaAddPlayer}
          style={styles.suspiciouskinddaAddBtn}>
          <Text style={styles.suspiciouskinddaAddText}>+</Text>
        </Pressable>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.suspiciouskinddaRoundsCard}>
          <View style={styles.suspiciouskinddaRoundsCardInner}>
            <Text style={styles.suspiciouskinddaRoundsLabel}>
              {suspiciouskinddaPlayerNames.length} GUESTS · ROUNDS
            </Text>
            <Text style={styles.suspiciouskinddaRoundsValue}>
              {suspiciouskinddaSelectedRounds}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.suspiciouskinddaRoundPicker}>
          {suspiciouskinddaRoundOptions.map(suspiciouskinddaRound => (
            <Pressable
              key={suspiciouskinddaRound}
              onPress={() =>
                setSuspiciouskinddaSelectedRounds(suspiciouskinddaRound)
              }
              style={[
                styles.suspiciouskinddaRoundBtn,
                suspiciouskinddaSelectedRounds === suspiciouskinddaRound &&
                  styles.suspiciouskinddaRoundBtnActive,
              ]}>
              <Text
                style={[
                  styles.suspiciouskinddaRoundBtnText,
                  suspiciouskinddaSelectedRounds === suspiciouskinddaRound &&
                    styles.suspiciouskinddaRoundBtnTextActive,
                ]}>
                {suspiciouskinddaRound}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={suspiciouskinddaOnContinue}
          disabled={!suspiciouskinddaCanStart}
          style={[
            styles.suspiciouskinddaContinueBtn,
            !suspiciouskinddaCanStart &&
              styles.suspiciouskinddaContinueBtnDisabled,
          ]}>
          <Text style={styles.suspiciouskinddaContinueText}>Start Party</Text>
        </Pressable>
      </View>
    </SuspiciouskinddaIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaRoot: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  suspiciouskinddaTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  suspiciouskinddaBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaBackIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
  },
  suspiciouskinddaTopTitles: {
    gap: 2,
  },
  suspiciouskinddaTopTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    color: '#FFFFFF',
  },
  suspiciouskinddaTopSubtitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#7D88AD',
  },
  suspiciouskinddaPlayerList: {
    gap: 12,
    marginBottom: 16,
  },
  suspiciouskinddaPlayerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  suspiciouskinddaPlayerBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaPlayerBadgeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  suspiciouskinddaPlayerInput: {
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
  suspiciouskinddaRemoveBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaRemoveText: {
    fontSize: 22,
    color: '#7D88AD',
    lineHeight: 22,
  },
  suspiciouskinddaAddBtn: {
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
  suspiciouskinddaAddText: {
    fontSize: 24,
    lineHeight: 24,
    color: '#1A2347',
    fontWeight: '700',
  },
  suspiciouskinddaRoundsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    marginBottom: 16,
    overflow: 'hidden',
  },
  suspiciouskinddaRoundsCardInner: {
    padding: 19,
    gap: 11,
    alignItems: 'center',
  },
  suspiciouskinddaRoundsLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    marginBottom: 8,
  },
  suspiciouskinddaRoundsValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 56,
    color: '#2EB3FF',
    textShadowColor: 'rgba(46,179,255,0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 16,
  },
  suspiciouskinddaRoundPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  suspiciouskinddaRoundBtn: {
    flex: 1,
    height: 75,
    borderRadius: 20,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaRoundBtnActive: {
    borderColor: '#2EB3FF',
  },
  suspiciouskinddaRoundBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#7D88AD',
  },
  suspiciouskinddaRoundBtnTextActive: {
    color: '#2EB3FF',
  },
  suspiciouskinddaContinueBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  suspiciouskinddaContinueBtnDisabled: {
    opacity: 0.5,
  },
  suspiciouskinddaContinueText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default SuspiciouskinddaIdeaspartysetup;
