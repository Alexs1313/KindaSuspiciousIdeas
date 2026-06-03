import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {useNoteSuspParty} from '../noteSuspCtx/NoteSuspPartyContext';
import {noteSuspNavigateRootScreen} from '../noteSuspNav/NoteSuspRootNavigation';

const noteSuspMinGuests = 2;
const noteSuspMaxGuests = 8;

export function NoteSuspPartySetupScreen() {
  const navigation = useNavigation<any>();
  const {
    setupGuests,
    setupRounds,
    startParty,
  } = useNoteSuspParty();

  const [guestNames, setGuestNames] = useState([
    'Guest 1',
    'Guest 2',
    'Guest 3',
  ]);
  const [selectedRounds, setSelectedRounds] =
    useState(3);

  const roundOptions = useMemo(
    () =>
      Array.from(
        {length: guestNames.length},
        (_, index) => index + 1,
      ),
    [guestNames.length],
  );

  const canStart =
    guestNames.length >= noteSuspMinGuests &&
    guestNames.every(
      name => name.trim().length > 0,
    );

  const updateName = (
    index: number,
    value: string,
  ) => {
    setGuestNames(prev =>
      prev.map((name, itemIndex) =>
        itemIndex === index
          ? value
          : name,
      ),
    );
  };

  const addGuest = () => {
    if (guestNames.length >= noteSuspMaxGuests) {
      return;
    }
    setGuestNames(prev => [
      ...prev,
      `Guest ${prev.length + 1}`,
    ]);
  };

  const removeGuest = (index: number) => {
    if (guestNames.length <= noteSuspMinGuests) {
      return;
    }
    setGuestNames(prev =>
      prev.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    );
    setSelectedRounds(prev =>
      Math.min(prev, guestNames.length - 1),
    );
  };

  const onContinue = () => {
    if (!canStart) {
      return;
    }
    const trimmed = guestNames.map(
      name => name.trim(),
    );
    setupGuests(trimmed);
    setupRounds(selectedRounds);
    startParty();
    noteSuspNavigateRootScreen('PartyCategoryPicker');
  };

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <View style={styles.noteSuspTopBar}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.noteSuspBackBtn}>
            <Text style={styles.noteSuspBackIcon}>‹</Text>
          </Pressable>
          <View style={styles.noteSuspTopTitles}>
            <Text style={styles.noteSuspTopTitle}>Who's Joining?</Text>
            <Text style={styles.noteSuspTopSubtitle}>2–8 guests</Text>
          </View>
        </View>

        <View style={styles.noteSuspGuestList}>
          {guestNames.map(
            (name, index) => (
              <View
                key={`guest-${index}`}
                style={styles.noteSuspGuestRow}>
                <LinearGradient
                  colors={['#2EB3FF', '#141D3A'] as unknown as string[]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.noteSuspGuestBadge}>
                  <Text style={styles.noteSuspGuestBadgeText}>
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
                  style={styles.noteSuspGuestInput}
                />
                <Pressable
                  onPress={() =>
                    removeGuest(index)
                  }
                  style={styles.noteSuspRemoveBtn}>
                  <Text style={styles.noteSuspRemoveText}>−</Text>
                </Pressable>
              </View>
            ),
          )}
        </View>

        <Pressable
          onPress={addGuest}
          style={styles.noteSuspAddBtn}>
          <Text style={styles.noteSuspAddText}>+</Text>
        </Pressable>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.noteSuspRoundsCard}>
          <View style={styles.noteSuspRoundsCardInner}>
            <Text style={styles.noteSuspRoundsLabel}>
              {guestNames.length} GUESTS · ROUNDS
            </Text>
            <Text style={styles.noteSuspRoundsValue}>
              {selectedRounds}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.noteSuspRoundPicker}>
          {roundOptions.map(round => (
            <Pressable
              key={round}
              onPress={() =>
                setSelectedRounds(round)
              }
              style={[
                styles.noteSuspRoundBtn,
                selectedRounds === round &&
                  styles.noteSuspRoundBtnActive,
              ]}>
              <Text
                style={[
                  styles.noteSuspRoundBtnText,
                  selectedRounds === round &&
                    styles.noteSuspRoundBtnTextActive,
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
            styles.noteSuspContinueBtn,
            !canStart &&
              styles.noteSuspContinueBtnDisabled,
          ]}>
          <Text style={styles.noteSuspContinueText}>Start Party</Text>
        </Pressable>
      </View>
    </NoteSuspBackgroundLayout>
  );
};

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  noteSuspTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  noteSuspBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspBackIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
  },
  noteSuspTopTitles: {
    gap: 2,
  },
  noteSuspTopTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    color: '#FFFFFF',
  },
  noteSuspTopSubtitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#7D88AD',
  },
  noteSuspGuestList: {
    gap: 12,
    marginBottom: 16,
  },
  noteSuspGuestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  noteSuspGuestBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspGuestBadgeText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  noteSuspGuestInput: {
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
  noteSuspRemoveBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspRemoveText: {
    fontSize: 22,
    color: '#7D88AD',
    lineHeight: 22,
  },
  noteSuspAddBtn: {
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
  noteSuspAddText: {
    fontSize: 24,
    lineHeight: 24,
    color: '#1A2347',
    fontWeight: '700',
  },
  noteSuspRoundsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    marginBottom: 16,
    overflow: 'hidden',
  },
  noteSuspRoundsCardInner: {
    padding: 19,
    gap: 11,
    alignItems: 'center',
  },
  noteSuspRoundsLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    marginBottom: 8,
  },
  noteSuspRoundsValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 56,
    color: '#2EB3FF',
    textShadowColor: 'rgba(46,179,255,0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 16,
  },
  noteSuspRoundPicker: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  noteSuspRoundBtn: {
    flex: 1,
    height: 75,
    borderRadius: 20,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspRoundBtnActive: {
    borderColor: '#2EB3FF',
  },
  noteSuspRoundBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#7D88AD',
  },
  noteSuspRoundBtnTextActive: {
    color: '#2EB3FF',
  },
  noteSuspContinueBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  noteSuspContinueBtnDisabled: {
    opacity: 0.5,
  },
  noteSuspContinueText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

