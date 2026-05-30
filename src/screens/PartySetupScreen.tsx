import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {BackgroundScreen} from '../components/BackgroundScreen';
import {useParty} from '../context/PartyContext';
import {navigateRootScreen} from '../navigation/rootNavigation';

const minPlayers = 2;
const maxPlayers = 8;

export function PartySetupScreen() {
  const navigation = useNavigation<any>();
  const {
    setupPlayers,
    setupRounds,
    startGame,
  } = useParty();

  const [playerNames, setPlayerNames] = useState([
    'Guest 1',
    'Guest 2',
    'Guest 3',
  ]);
  const [selectedRounds, setSelectedRounds] =
    useState(3);

  const roundOptions = useMemo(
    () =>
      Array.from(
        {length: playerNames.length},
        (_, index) => index + 1,
      ),
    [playerNames.length],
  );

  const canStart =
    playerNames.length >= minPlayers &&
    playerNames.every(
      name => name.trim().length > 0,
    );

  const updateName = (
    index: number,
    value: string,
  ) => {
    setPlayerNames(prev =>
      prev.map((name, itemIndex) =>
        itemIndex === index
          ? value
          : name,
      ),
    );
  };

  const addPlayer = () => {
    if (playerNames.length >= maxPlayers) {
      return;
    }
    setPlayerNames(prev => [
      ...prev,
      `Guest ${prev.length + 1}`,
    ]);
  };

  const removePlayer = (index: number) => {
    if (playerNames.length <= minPlayers) {
      return;
    }
    setPlayerNames(prev =>
      prev.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    );
    setSelectedRounds(prev =>
      Math.min(prev, playerNames.length - 1),
    );
  };

  const onContinue = () => {
    if (!canStart) {
      return;
    }
    const trimmed = playerNames.map(
      name => name.trim(),
    );
    setupPlayers(trimmed);
    setupRounds(selectedRounds);
    startGame();
    navigateRootScreen('PartySpin');
  };

  return (
    <BackgroundScreen>
      <View style={styles.root}>
        <View style={styles.topBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
          <View style={styles.topTitles}>
            <Text style={styles.topTitle}>Who's Playing?</Text>
            <Text style={styles.topSubtitle}>2–8 guests</Text>
          </View>
        </View>

        <View style={styles.playerList}>
          {playerNames.map(
            (name, index) => (
              <View
                key={`player-${index}`}
                style={styles.playerRow}>
                <LinearGradient
                  colors={['#2EB3FF', '#141D3A'] as unknown as string[]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.playerBadge}>
                  <Text style={styles.playerBadgeText}>
                    {index + 1}
                  </Text>
                </LinearGradient>
                <TextInput
                  value={name}
                  onChangeText={value =>
                    updateName(
                      index,
                      value,
                    )
                  }
                  placeholder={`Guest ${index + 1}`}
                  placeholderTextColor="#4A5478"
                  style={styles.playerInput}
                />
                <Pressable
                  onPress={() =>
                    removePlayer(index)
                  }
                  style={styles.removeBtn}>
                  <Text style={styles.removeText}>−</Text>
                </Pressable>
              </View>
            ),
          )}
        </View>

        <Pressable
          onPress={addPlayer}
          style={styles.addBtn}>
          <Text style={styles.addText}>+</Text>
        </Pressable>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.roundsCard}>
          <View style={styles.roundsCardInner}>
            <Text style={styles.roundsLabel}>
              {playerNames.length} GUESTS · ROUNDS
            </Text>
            <Text style={styles.roundsValue}>
              {selectedRounds}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.roundPicker}>
          {roundOptions.map(round => (
            <Pressable
              key={round}
              onPress={() =>
                setSelectedRounds(round)
              }
              style={[
                styles.roundBtn,
                selectedRounds === round &&
                  styles.roundBtnActive,
              ]}>
              <Text
                style={[
                  styles.roundBtnText,
                  selectedRounds === round &&
                    styles.roundBtnTextActive,
                ]}>
                {round}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={onContinue}
          disabled={!canStart}
          style={[
            styles.continueBtn,
            !canStart &&
              styles.continueBtnDisabled,
          ]}>
          <Text style={styles.continueText}>Start Party</Text>
        </Pressable>
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
  },
  topTitles: {
    gap: 2,
  },
  topTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    color: '#FFFFFF',
  },
  topSubtitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#7D88AD',
  },
  playerList: {
    gap: 12,
    marginBottom: 16,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playerBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerBadgeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  playerInput: {
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
  removeBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    fontSize: 22,
    color: '#7D88AD',
    lineHeight: 22,
  },
  addBtn: {
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
  addText: {
    fontSize: 24,
    lineHeight: 24,
    color: '#1A2347',
    fontWeight: '700',
  },
  roundsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    marginBottom: 16,
    overflow: 'hidden',
  },
  roundsCardInner: {
    padding: 19,
    gap: 11,
    alignItems: 'center',
  },
  roundsLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    marginBottom: 8,
  },
  roundsValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 56,
    color: '#2EB3FF',
    textShadowColor: 'rgba(46,179,255,0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 16,
  },
  roundPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  roundBtn: {
    flex: 1,
    height: 75,
    borderRadius: 20,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundBtnActive: {
    borderColor: '#2EB3FF',
  },
  roundBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#7D88AD',
  },
  roundBtnTextActive: {
    color: '#2EB3FF',
  },
  continueBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  continueBtnDisabled: {
    opacity: 0.5,
  },
  continueText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

