import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {NoteSuspPartyPauseModal} from '../noteSuspCpnnts/NoteSuspPartyPauseModal';
import {noteSuspNavigateRootScreen, noteSuspResetToMain} from '../noteSuspNav/NoteSuspRootNavigation';
import {useNoteSuspParty} from '../noteSuspCtx/NoteSuspPartyContext';

const noteSuspDefenseSeconds = 60;

export function NoteSuspPartySituationScreen() {
  const navigation = useNavigation<any>();
  const {
    currentRound,
    totalRounds,
    currentGuestName,
    currentCategory,
    currentSituation,
    resetParty,
  } = useNoteSuspParty();

  const [pauseVisible, setPauseVisible] =
    useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    noteSuspDefenseSeconds,
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (!currentCategory || !currentSituation) {
    return null;
  }

  const progress =
    (secondsLeft / noteSuspDefenseSeconds) * 100;

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <View style={styles.noteSuspTopRow}>
          <Pressable
            onPress={() => setPauseVisible(true)}
            style={styles.noteSuspPauseBtn}>
            <Text style={styles.noteSuspPauseIcon}>⏸</Text>
          </Pressable>
          <View style={styles.noteSuspTopCenter}>
            <Text style={styles.noteSuspRoundLabel}>
              ROUND {currentRound} OF{' '}
              {totalRounds}
            </Text>
            <Text
              style={[
                styles.noteSuspCategoryTitle,
                {
                  color:
                    currentCategory.color,
                },
              ]}>
              {currentCategory.label}
            </Text>
          </View>
          <View style={styles.noteSuspTopSpacer} />
        </View>

        <View style={styles.noteSuspProgressTrack}>
          <View
            style={[
              styles.noteSuspProgressFill,
              {width: `${progress}%`},
            ]}
          />
        </View>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.noteSuspCard}>
          <View style={styles.noteSuspCardInner}>
            <View style={styles.noteSuspTargetPill}>
              <Text style={styles.noteSuspTargetText}>
                Situation for {currentGuestName()}
              </Text>
            </View>
            <Text style={styles.noteSuspSituationText}>
              {currentSituation}
            </Text>
            <Text style={styles.noteSuspHint}>
              Other guests can interrogate. Defend yourself out loud.
            </Text>
            <Text style={styles.noteSuspTimer}>
              {secondsLeft}s remaining
            </Text>
          </View>
        </LinearGradient>

        <Pressable
          onPress={() => noteSuspNavigateRootScreen('PartyVote')}
          style={styles.noteSuspVoteBtn}>
          <Text style={styles.noteSuspVoteBtnText}>Vote</Text>
        </Pressable>
      </View>

      <NoteSuspPartyPauseModal
        visible={pauseVisible}
        onResume={() => setPauseVisible(false)}
        onEndParty={() => {
          setPauseVisible(false);
          resetParty();
          noteSuspResetToMain();
        }}
      />
    </NoteSuspBackgroundLayout>
  );
};

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 44,
  },
  noteSuspTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  noteSuspPauseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspPauseIcon: {
    fontSize: 14,
    color: '#E8EEFF',
  },
  noteSuspTopCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  noteSuspTopSpacer: {
    width: 40,
  },
  noteSuspRoundLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
  },
  noteSuspCategoryTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    textAlign: 'center',
  },
  noteSuspProgressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1A2347',
    marginBottom: 20,
    overflow: 'hidden',
  },
  noteSuspProgressFill: {
    height: '100%',
    backgroundColor: '#2EB3FF',
    borderRadius: 2,
  },
  noteSuspCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.35)',
    marginBottom: 20,
    overflow: 'hidden',
  },
  noteSuspCardInner: {
    flex: 1,
    padding: 24,
  },
  noteSuspTargetPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    marginBottom: 16,
  },
  noteSuspTargetText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  noteSuspSituationText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 16,
    flex: 1,
  },
  noteSuspHint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    lineHeight: 18,
    color: '#7D88AD',
    marginBottom: 12,
  },
  noteSuspTimer: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: '#2EB3FF',
    letterSpacing: 0.5,
  },
  noteSuspVoteBtn: {
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
  noteSuspVoteBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

