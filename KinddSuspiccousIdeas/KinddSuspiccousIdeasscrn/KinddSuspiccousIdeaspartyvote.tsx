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

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import {useKinddSuspiccousIdeasParty} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeaspartyStore';

const KinddSuspiccousIdeaspartyvote = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const {
    kinddSuspiccousPlayers,
    kinddSuspiccousCurrentPlayerIndex,
    kinddSuspiccousCurrentVoterIndex,
    kinddSuspiccousCurrentDefenderName,
    kinddSuspiccousSubmitVote,
    kinddSuspiccousVoterCount,
  } = useKinddSuspiccousIdeasParty();

  const [kinddSuspiccousPercent, setKinddSuspiccousPercent] = useState(70);
  const [kinddSuspiccousTrackWidth, setKinddSuspiccousTrackWidth] = useState(0);

  const kinddSuspiccousVoters = useMemo(
    () =>
      kinddSuspiccousPlayers.filter(
        (_, kinddSuspiccousIndex) =>
          kinddSuspiccousIndex !== kinddSuspiccousCurrentPlayerIndex,
      ),
    [kinddSuspiccousCurrentPlayerIndex, kinddSuspiccousPlayers],
  );

  const kinddSuspiccousCurrentVoterName =
    kinddSuspiccousVoters[kinddSuspiccousCurrentVoterIndex] ?? '';
  const kinddSuspiccousDefenderName = kinddSuspiccousCurrentDefenderName();
  const kinddSuspiccousTotalVoters = kinddSuspiccousVoterCount();

  const kinddSuspiccousOnTrackLayout = (
    kinddSuspiccousEvent: LayoutChangeEvent,
  ) => {
    setKinddSuspiccousTrackWidth(kinddSuspiccousEvent.nativeEvent.layout.width);
  };

  const kinddSuspiccousSetFromPosition = (kinddSuspiccousX: number) => {
    if (kinddSuspiccousTrackWidth <= 0) {
      return;
    }
    const kinddSuspiccousClamped = Math.max(
      0,
      Math.min(kinddSuspiccousX, kinddSuspiccousTrackWidth),
    );
    setKinddSuspiccousPercent(
      Math.round((kinddSuspiccousClamped / kinddSuspiccousTrackWidth) * 100),
    );
  };

  const kinddSuspiccousOnNext = () => {
    const kinddSuspiccousFinished = kinddSuspiccousSubmitVote(
      kinddSuspiccousPercent,
    );
    setKinddSuspiccousPercent(70);

    if (kinddSuspiccousFinished) {
      kinddSuspiccousNavigation.replace('KinddSuspiccousIdeaspartyresults');
      return;
    }

    const kinddSuspiccousNextVoterIndex = kinddSuspiccousCurrentVoterIndex + 1;
    if (kinddSuspiccousNextVoterIndex >= kinddSuspiccousTotalVoters) {
      kinddSuspiccousNavigation.replace('KinddSuspiccousIdeaspartyspin');
    }
  };

  const kinddSuspiccousThumbLeft =
    kinddSuspiccousTrackWidth > 0
      ? (kinddSuspiccousPercent / 100) * kinddSuspiccousTrackWidth - 12
      : 0;

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <Text style={styles.kinddSuspiccousTitle}>Vote</Text>
        <Text style={styles.kinddSuspiccousSubtitle}>
          How convincing was {kinddSuspiccousDefenderName}?
        </Text>

        <View style={styles.kinddSuspiccousProgressDots}>
          {Array.from({length: kinddSuspiccousTotalVoters}).map(
            (_, kinddSuspiccousIndex) => (
              <View
                key={kinddSuspiccousIndex}
                style={[
                  styles.kinddSuspiccousDot,
                  kinddSuspiccousIndex <= kinddSuspiccousCurrentVoterIndex &&
                    styles.kinddSuspiccousDotActive,
                ]}
              />
            ),
          )}
        </View>

        <Text style={styles.kinddSuspiccousVoterLabel}>
          Voter {kinddSuspiccousCurrentVoterIndex + 1} of{' '}
          {kinddSuspiccousTotalVoters}
        </Text>
        <Text style={styles.kinddSuspiccousVoterName}>
          {kinddSuspiccousCurrentVoterName}
        </Text>
        <Text style={styles.kinddSuspiccousPassHint}>Pass the phone</Text>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.kinddSuspiccousSliderCard}>
          <View style={styles.kinddSuspiccousSliderCardInner}>
            <Text style={styles.kinddSuspiccousPercentValue}>
              {kinddSuspiccousPercent}
              <Text style={styles.kinddSuspiccousPercentSign}> %</Text>
            </Text>

            <Pressable
              onLayout={kinddSuspiccousOnTrackLayout}
              onPress={kinddSuspiccousEvent =>
                kinddSuspiccousSetFromPosition(
                  kinddSuspiccousEvent.nativeEvent.locationX,
                )
              }
              style={styles.kinddSuspiccousTrackWrap}>
              <LinearGradient
                colors={['#FF5A6E', '#F7C948', '#4ADE80']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.kinddSuspiccousTrack}
              />
              <View
                style={[
                  styles.kinddSuspiccousThumb,
                  {left: Math.max(0, kinddSuspiccousThumbLeft)},
                ]}
              />
            </Pressable>
          </View>
        </LinearGradient>

        <View style={styles.kinddSuspiccousPresetRow}>
          {[15, 50, 85].map(kinddSuspiccousPreset => (
            <Pressable
              key={kinddSuspiccousPreset}
              onPress={() => setKinddSuspiccousPercent(kinddSuspiccousPreset)}
              style={styles.kinddSuspiccousPresetBtn}>
              <Text style={styles.kinddSuspiccousPresetText}>
                {kinddSuspiccousPreset} %
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={kinddSuspiccousOnNext}
          style={styles.kinddSuspiccousNextBtn}>
          <Text style={styles.kinddSuspiccousNextText}>Next</Text>
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
    paddingBottom: 44,
  },
  kinddSuspiccousTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  kinddSuspiccousSubtitle: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#2EB3FF',
    marginBottom: 20,
  },
  kinddSuspiccousProgressDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  kinddSuspiccousDot: {
    width: 24,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1A2347',
  },
  kinddSuspiccousDotActive: {
    backgroundColor: '#2EB3FF',
  },
  kinddSuspiccousVoterLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    marginBottom: 4,
  },
  kinddSuspiccousVoterName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  kinddSuspiccousPassHint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#2EB3FF',
    marginBottom: 24,
  },
  kinddSuspiccousSliderCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1A2347',
    marginBottom: 16,
    overflow: 'hidden',
  },
  kinddSuspiccousSliderCardInner: {
    padding: 24,
  },
  kinddSuspiccousPercentValue: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 48,
    color: '#4ADE80',
    textAlign: 'center',
    marginBottom: 24,
  },
  kinddSuspiccousPercentSign: {
    fontSize: 28,
  },
  kinddSuspiccousTrackWrap: {
    height: 32,
    justifyContent: 'center',
  },
  kinddSuspiccousTrack: {
    height: 8,
    borderRadius: 4,
  },
  kinddSuspiccousThumb: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2EB3FF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    top: 4,
  },
  kinddSuspiccousPresetRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  kinddSuspiccousPresetBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousPresetText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#E8EEFF',
  },
  kinddSuspiccousNextBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  kinddSuspiccousNextText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default KinddSuspiccousIdeaspartyvote;
