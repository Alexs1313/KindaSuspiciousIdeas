import React, {useMemo, useState} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {useNoteSuspParty} from '../noteSuspCtx/NoteSuspPartyContext';
import {noteSuspReplaceRootScreen} from '../noteSuspNav/NoteSuspRootNavigation';

export function NoteSuspPartyVoteScreen() {
  const {
    guests,
    currentGuestIndex,
    currentVoterIndex,
    currentDefenderName,
    submitVote,
    voterCount,
  } = useNoteSuspParty();

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
      noteSuspReplaceRootScreen('PartyResults');
      return;
    }

    const nextVoterIndex = currentVoterIndex + 1;
    if (nextVoterIndex >= totalVoters) {
      noteSuspReplaceRootScreen('PartyCategoryPicker');
    }
  };

  const thumbLeft = trackWidth > 0 ? (percent / 100) * trackWidth - 12 : 0;

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <Text style={styles.noteSuspTitle}>Vote</Text>
        <Text style={styles.noteSuspSubtitle}>How convincing was {defenderName}?</Text>

        <View style={styles.noteSuspProgressDots}>
          {Array.from({length: totalVoters}).map((_, index) => (
            <View
              key={index}
              style={[
                styles.noteSuspDot,
                index <= currentVoterIndex && styles.noteSuspDotActive,
              ]}
            />
          ))}
        </View>

        <Text style={styles.noteSuspVoterLabel}>
          Voter {currentVoterIndex + 1} of {totalVoters}
        </Text>
        <Text style={styles.noteSuspVoterName}>{currentVoterName}</Text>
        <Text style={styles.noteSuspPassHint}>Pass the phone</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.noteSuspSliderCard}>
          <View style={styles.noteSuspSliderCardInner}>
            <Text style={styles.noteSuspPercentValue}>
              {percent}
              <Text style={styles.noteSuspPercentSign}> %</Text>
            </Text>

            <Pressable
              onLayout={onTrackLayout}
              onPress={event => setFromPosition(event.nativeEvent.locationX)}
              style={styles.noteSuspTrackWrap}>
              <LinearGradient
                colors={['#FF5A6E', '#F7C948', '#4ADE80']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.noteSuspTrack}
              />
              <View style={[styles.noteSuspThumb, {left: Math.max(0, thumbLeft)}]} />
            </Pressable>
          </View>
        </LinearGradient>

        <View style={styles.noteSuspPresetRow}>
          {[15, 50, 85].map(preset => (
            <Pressable
              key={preset}
              onPress={() => setPercent(preset)}
              style={styles.noteSuspPresetBtn}>
              <Text style={styles.noteSuspPresetText}>{preset} %</Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={onNext} style={styles.noteSuspNextBtn}>
          <Text style={styles.noteSuspNextText}>Next</Text>
        </Pressable>
      </View>
    </NoteSuspBackgroundLayout>
  );
}

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 44,
  },
  noteSuspTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  noteSuspSubtitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#2EB3FF',
    marginBottom: 20,
  },
  noteSuspProgressDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  noteSuspDot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1A2347',
  },
  noteSuspDotActive: {
    backgroundColor: '#2EB3FF',
  },
  noteSuspVoterLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    marginBottom: 4,
  },
  noteSuspVoterName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  noteSuspPassHint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#2EB3FF',
    marginBottom: 24,
  },
  noteSuspSliderCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    marginBottom: 16,
    overflow: 'hidden',
  },
  noteSuspSliderCardInner: {
    padding: 24,
  },
  noteSuspPercentValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 48,
    color: '#4ADE80',
    textAlign: 'center',
    marginBottom: 24,
  },
  noteSuspPercentSign: {
    fontSize: 28,
  },
  noteSuspTrackWrap: {
    height: 32,
    justifyContent: 'center',
  },
  noteSuspTrack: {
    height: 8,
    borderRadius: 4,
  },
  noteSuspThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2EB3FF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    top: 4,
  },
  noteSuspPresetRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  noteSuspPresetBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspPresetText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#E8EEFF',
  },
  noteSuspNextBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  noteSuspNextText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});
