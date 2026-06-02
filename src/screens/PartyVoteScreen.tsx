import React, {useMemo, useState} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {BackgroundScreen} from '../components/BackgroundScreen';
import {useParty} from '../context/PartyContext';
import {replaceRootScreen} from '../navigation/rootNavigation';

export function PartyVoteScreen() {
  const {
    guests,
    currentGuestIndex,
    currentVoterIndex,
    currentDefenderName,
    submitVote,
    voterCount,
  } = useParty();

  const [percent, setPercent] = useState(70);
  const [trackWidth, setTrackWidth] = useState(0);

  const voters = useMemo(
    () => guests.filter((_, index) => index !== currentGuestIndex),
    [currentGuestIndex, guests],
  );

  const currentVoterName = voters[currentVoterIndex] ?? '';
  const defenderName = currentDefenderName();
  const totalVoters = voterCount();

  const onTrackLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const setFromPosition = (x: number) => {
    if (trackWidth <= 0) {
      return;
    }
    const clamped = Math.max(0, Math.min(x, trackWidth));
    setPercent(Math.round((clamped / trackWidth) * 100));
  };

  const onNext = () => {
    const finished = submitVote(percent);
    setPercent(70);

    if (finished) {
      replaceRootScreen('PartyResults');
      return;
    }

    const nextVoterIndex = currentVoterIndex + 1;
    if (nextVoterIndex >= totalVoters) {
      replaceRootScreen('PartyCategoryPicker');
    }
  };

  const thumbLeft = trackWidth > 0 ? (percent / 100) * trackWidth - 12 : 0;

  return (
    <BackgroundScreen>
      <View style={styles.root}>
        <Text style={styles.title}>Vote</Text>
        <Text style={styles.subtitle}>How convincing was {defenderName}?</Text>

        <View style={styles.progressDots}>
          {Array.from({length: totalVoters}).map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index <= currentVoterIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <Text style={styles.voterLabel}>
          Voter {currentVoterIndex + 1} of {totalVoters}
        </Text>
        <Text style={styles.voterName}>{currentVoterName}</Text>
        <Text style={styles.passHint}>Pass the phone</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.sliderCard}>
          <View style={styles.sliderCardInner}>
            <Text style={styles.percentValue}>
              {percent}
              <Text style={styles.percentSign}> %</Text>
            </Text>

            <Pressable
              onLayout={onTrackLayout}
              onPress={event => setFromPosition(event.nativeEvent.locationX)}
              style={styles.trackWrap}>
              <LinearGradient
                colors={['#FF5A6E', '#F7C948', '#4ADE80']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.track}
              />
              <View style={[styles.thumb, {left: Math.max(0, thumbLeft)}]} />
            </Pressable>
          </View>
        </LinearGradient>

        <View style={styles.presetRow}>
          {[15, 50, 85].map(preset => (
            <Pressable
              key={preset}
              onPress={() => setPercent(preset)}
              style={styles.presetBtn}>
              <Text style={styles.presetText}>{preset} %</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={onNext} style={styles.nextBtn}>
          <Text style={styles.nextText}>Next</Text>
        </Pressable>
      </View>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 44,
  },
  title: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#2EB3FF',
    marginBottom: 20,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1A2347',
  },
  dotActive: {
    backgroundColor: '#2EB3FF',
  },
  voterLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    marginBottom: 4,
  },
  voterName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  passHint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#2EB3FF',
    marginBottom: 24,
  },
  sliderCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    marginBottom: 16,
    overflow: 'hidden',
  },
  sliderCardInner: {
    padding: 24,
  },
  percentValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 48,
    color: '#4ADE80',
    textAlign: 'center',
    marginBottom: 24,
  },
  percentSign: {
    fontSize: 28,
  },
  trackWrap: {
    height: 32,
    justifyContent: 'center',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  thumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2EB3FF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    top: 4,
  },
  presetRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  presetBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#E8EEFF',
  },
  nextBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  nextText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});
