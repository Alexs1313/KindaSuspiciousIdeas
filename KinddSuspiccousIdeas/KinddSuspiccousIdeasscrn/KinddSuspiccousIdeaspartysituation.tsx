import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import KinddSuspiccousIdeaspartyPause from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaspartyPause';
import {useKinddSuspiccousIdeasParty} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeaspartyStore';

const kinddSuspiccousIdeasDefenseSeconds = 60;

const KinddSuspiccousIdeaspartysituation = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const {
    kinddSuspiccousCurrentRound,
    kinddSuspiccousTotalRounds,
    kinddSuspiccousCurrentPlayerName,
    kinddSuspiccousCurrentCategory,
    kinddSuspiccousCurrentSituation,
    kinddSuspiccousResetGame,
  } = useKinddSuspiccousIdeasParty();

  const [kinddSuspiccousPauseVisible, setKinddSuspiccousPauseVisible] =
    useState(false);
  const [kinddSuspiccousSecondsLeft, setKinddSuspiccousSecondsLeft] = useState(
    kinddSuspiccousIdeasDefenseSeconds,
  );
  const kinddSuspiccousTimerRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  useEffect(() => {
    kinddSuspiccousTimerRef.current = setInterval(() => {
      setKinddSuspiccousSecondsLeft(kinddSuspiccousPrev => {
        if (kinddSuspiccousPrev <= 1) {
          if (kinddSuspiccousTimerRef.current) {
            clearInterval(kinddSuspiccousTimerRef.current);
          }
          return 0;
        }
        return kinddSuspiccousPrev - 1;
      });
    }, 1000);

    return () => {
      if (kinddSuspiccousTimerRef.current) {
        clearInterval(kinddSuspiccousTimerRef.current);
      }
    };
  }, []);

  if (!kinddSuspiccousCurrentCategory || !kinddSuspiccousCurrentSituation) {
    return null;
  }

  const kinddSuspiccousProgress =
    (kinddSuspiccousSecondsLeft / kinddSuspiccousIdeasDefenseSeconds) * 100;

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <View style={styles.kinddSuspiccousTopRow}>
          <Pressable
            onPress={() => setKinddSuspiccousPauseVisible(true)}
            style={styles.kinddSuspiccousPauseBtn}>
            <Text style={styles.kinddSuspiccousPauseIcon}>⏸</Text>
          </Pressable>
          <View style={styles.kinddSuspiccousTopCenter}>
            <Text style={styles.kinddSuspiccousRoundLabel}>
              ROUND {kinddSuspiccousCurrentRound} OF{' '}
              {kinddSuspiccousTotalRounds}
            </Text>
            <Text
              style={[
                styles.kinddSuspiccousCategoryTitle,
                {
                  color:
                    kinddSuspiccousCurrentCategory.kinddSuspiccousCategoryColor,
                },
              ]}>
              {kinddSuspiccousCurrentCategory.kinddSuspiccousCategoryLabel}
            </Text>
          </View>
          <View style={styles.kinddSuspiccousTopSpacer} />
        </View>

        <View style={styles.kinddSuspiccousProgressTrack}>
          <View
            style={[
              styles.kinddSuspiccousProgressFill,
              {width: `${kinddSuspiccousProgress}%`},
            ]}
          />
        </View>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.kinddSuspiccousCard}>
          <View style={styles.kinddSuspiccousCardInner}>
            <View style={styles.kinddSuspiccousTargetPill}>
              <Text style={styles.kinddSuspiccousTargetText}>
                Situation for {kinddSuspiccousCurrentPlayerName()}
              </Text>
            </View>
            <Text style={styles.kinddSuspiccousSituationText}>
              {kinddSuspiccousCurrentSituation}
            </Text>
            <Text style={styles.kinddSuspiccousHint}>
              Other players can interrogate. Defend yourself out loud.
            </Text>
            <Text style={styles.kinddSuspiccousTimer}>
              {kinddSuspiccousSecondsLeft}s remaining
            </Text>
          </View>
        </LinearGradient>

        <Pressable
          onPress={() =>
            kinddSuspiccousNavigation.navigate('KinddSuspiccousIdeaspartyvote')
          }
          style={styles.kinddSuspiccousVoteBtn}>
          <Text style={styles.kinddSuspiccousVoteBtnText}>Vote</Text>
        </Pressable>
      </View>

      <KinddSuspiccousIdeaspartyPause
        kinddSuspiccousVisible={kinddSuspiccousPauseVisible}
        kinddSuspiccousOnResume={() => setKinddSuspiccousPauseVisible(false)}
        kinddSuspiccousOnEndGame={() => {
          setKinddSuspiccousPauseVisible(false);
          kinddSuspiccousResetGame();
          kinddSuspiccousNavigation.reset({
            index: 0,
            routes: [{name: 'KinddSuspiccousIdeastab'}],
          });
        }}
      />
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
  kinddSuspiccousTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  kinddSuspiccousPauseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousPauseIcon: {
    fontSize: 14,
    color: '#E8EEFF',
  },
  kinddSuspiccousTopCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  kinddSuspiccousTopSpacer: {
    width: 40,
  },
  kinddSuspiccousRoundLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
  },
  kinddSuspiccousCategoryTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    textAlign: 'center',
  },
  kinddSuspiccousProgressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1A2347',
    marginBottom: 20,
    overflow: 'hidden',
  },
  kinddSuspiccousProgressFill: {
    height: '100%',
    backgroundColor: '#2EB3FF',
    borderRadius: 2,
  },
  kinddSuspiccousCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.35)',
    marginBottom: 20,
    overflow: 'hidden',
  },
  kinddSuspiccousCardInner: {
    flex: 1,
    padding: 24,
  },
  kinddSuspiccousTargetPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    marginBottom: 16,
  },
  kinddSuspiccousTargetText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  kinddSuspiccousSituationText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 16,
    flex: 1,
  },
  kinddSuspiccousHint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    lineHeight: 18,
    color: '#7D88AD',
    marginBottom: 12,
  },
  kinddSuspiccousTimer: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: '#2EB3FF',
    letterSpacing: 0.5,
  },
  kinddSuspiccousVoteBtn: {
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2EB3FF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  kinddSuspiccousVoteBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default KinddSuspiccousIdeaspartysituation;
