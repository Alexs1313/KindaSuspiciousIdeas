import React, {useMemo, useState} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import {useSuspiciouskinddaIdeasParty} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeaspartyStore';

const SuspiciouskinddaIdeaspartyvote = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const {
    suspiciouskinddaPlayers,
    suspiciouskinddaCurrentPlayerIndex,
    suspiciouskinddaCurrentVoterIndex,
    suspiciouskinddaCurrentDefenderName,
    suspiciouskinddaSubmitVote,
    suspiciouskinddaVoterCount,
  } = useSuspiciouskinddaIdeasParty();

  const [suspiciouskinddaPercent, setSuspiciouskinddaPercent] = useState(70);
  const [suspiciouskinddaTrackWidth, setSuspiciouskinddaTrackWidth] = useState(0);

  const suspiciouskinddaVoters = useMemo(
    () =>
      suspiciouskinddaPlayers.filter(
        (_, suspiciouskinddaIndex) =>
          suspiciouskinddaIndex !== suspiciouskinddaCurrentPlayerIndex,
      ),
    [suspiciouskinddaCurrentPlayerIndex, suspiciouskinddaPlayers],
  );

  const suspiciouskinddaCurrentVoterName =
    suspiciouskinddaVoters[suspiciouskinddaCurrentVoterIndex] ?? '';
  const suspiciouskinddaDefenderName = suspiciouskinddaCurrentDefenderName();
  const suspiciouskinddaTotalVoters = suspiciouskinddaVoterCount();

  const suspiciouskinddaOnTrackLayout = (
    suspiciouskinddaEvent: LayoutChangeEvent,
  ) => {
    setSuspiciouskinddaTrackWidth(suspiciouskinddaEvent.nativeEvent.layout.width);
  };

  const suspiciouskinddaSetFromPosition = (suspiciouskinddaX: number) => {
    if (suspiciouskinddaTrackWidth <= 0) {
      return;
    }
    const suspiciouskinddaClamped = Math.max(
      0,
      Math.min(suspiciouskinddaX, suspiciouskinddaTrackWidth),
    );
    setSuspiciouskinddaPercent(
      Math.round((suspiciouskinddaClamped / suspiciouskinddaTrackWidth) * 100),
    );
  };

  const suspiciouskinddaOnNext = () => {
    const suspiciouskinddaFinished = suspiciouskinddaSubmitVote(
      suspiciouskinddaPercent,
    );
    setSuspiciouskinddaPercent(70);

    if (suspiciouskinddaFinished) {
      suspiciouskinddaNavigation.replace('SuspiciouskinddaIdeaspartyresults');
      return;
    }

    const suspiciouskinddaNextVoterIndex = suspiciouskinddaCurrentVoterIndex + 1;
    if (suspiciouskinddaNextVoterIndex >= suspiciouskinddaTotalVoters) {
      suspiciouskinddaNavigation.replace('SuspiciouskinddaIdeaspartyspin');
    }
  };

  const suspiciouskinddaThumbLeft =
    suspiciouskinddaTrackWidth > 0
      ? (suspiciouskinddaPercent / 100) * suspiciouskinddaTrackWidth - 12
      : 0;

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <Text style={styles.suspiciouskinddaTitle}>Vote</Text>
        <Text style={styles.suspiciouskinddaSubtitle}>
          How convincing was {suspiciouskinddaDefenderName}?
        </Text>

        <View style={styles.suspiciouskinddaProgressDots}>
          {Array.from({length: suspiciouskinddaTotalVoters}).map(
            (_, suspiciouskinddaIndex) => (
              <View
                key={suspiciouskinddaIndex}
                style={[
                  styles.suspiciouskinddaDot,
                  suspiciouskinddaIndex <= suspiciouskinddaCurrentVoterIndex &&
                    styles.suspiciouskinddaDotActive,
                ]}
              />
            ),
          )}
        </View>

        <Text style={styles.suspiciouskinddaVoterLabel}>
          Voter {suspiciouskinddaCurrentVoterIndex + 1} of{' '}
          {suspiciouskinddaTotalVoters}
        </Text>
        <Text style={styles.suspiciouskinddaVoterName}>
          {suspiciouskinddaCurrentVoterName}
        </Text>
        <Text style={styles.suspiciouskinddaPassHint}>Pass the phone</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.suspiciouskinddaSliderCard}>
          <View style={styles.suspiciouskinddaSliderCardInner}>
            <Text style={styles.suspiciouskinddaPercentValue}>
              {suspiciouskinddaPercent}
              <Text style={styles.suspiciouskinddaPercentSign}> %</Text>
            </Text>

            <Pressable
              onLayout={suspiciouskinddaOnTrackLayout}
              onPress={suspiciouskinddaEvent =>
                suspiciouskinddaSetFromPosition(
                  suspiciouskinddaEvent.nativeEvent.locationX,
                )
              }
              style={styles.suspiciouskinddaTrackWrap}>
              <LinearGradient
                colors={['#FF5A6E', '#F7C948', '#4ADE80']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.suspiciouskinddaTrack}
              />
              <View
                style={[
                  styles.suspiciouskinddaThumb,
                  {left: Math.max(0, suspiciouskinddaThumbLeft)},
                ]}
              />
            </Pressable>
          </View>
        </LinearGradient>

        <View style={styles.suspiciouskinddaPresetRow}>
          {[15, 50, 85].map(suspiciouskinddaPreset => (
            <Pressable
              key={suspiciouskinddaPreset}
              onPress={() => setSuspiciouskinddaPercent(suspiciouskinddaPreset)}
              style={styles.suspiciouskinddaPresetBtn}>
              <Text style={styles.suspiciouskinddaPresetText}>
                {suspiciouskinddaPreset} %
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={suspiciouskinddaOnNext}
          style={styles.suspiciouskinddaNextBtn}>
          <Text style={styles.suspiciouskinddaNextText}>Next</Text>
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
    paddingBottom: 44,
  },
  suspiciouskinddaTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  suspiciouskinddaSubtitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#2EB3FF',
    marginBottom: 20,
  },
  suspiciouskinddaProgressDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  suspiciouskinddaDot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1A2347',
  },
  suspiciouskinddaDotActive: {
    backgroundColor: '#2EB3FF',
  },
  suspiciouskinddaVoterLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    marginBottom: 4,
  },
  suspiciouskinddaVoterName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  suspiciouskinddaPassHint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#2EB3FF',
    marginBottom: 24,
  },
  suspiciouskinddaSliderCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    marginBottom: 16,
    overflow: 'hidden',
  },
  suspiciouskinddaSliderCardInner: {
    padding: 24,
  },
  suspiciouskinddaPercentValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 48,
    color: '#4ADE80',
    textAlign: 'center',
    marginBottom: 24,
  },
  suspiciouskinddaPercentSign: {
    fontSize: 28,
  },
  suspiciouskinddaTrackWrap: {
    height: 32,
    justifyContent: 'center',
  },
  suspiciouskinddaTrack: {
    height: 8,
    borderRadius: 4,
  },
  suspiciouskinddaThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2EB3FF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    top: 4,
  },
  suspiciouskinddaPresetRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  suspiciouskinddaPresetBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaPresetText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#E8EEFF',
  },
  suspiciouskinddaNextBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  suspiciouskinddaNextText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default SuspiciouskinddaIdeaspartyvote;
