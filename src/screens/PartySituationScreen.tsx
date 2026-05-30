import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import {BackgroundScreen} from '../components/BackgroundScreen';
import {PartyPauseModal} from '../components/PartyPauseModal';
import {navigateRootScreen, resetToMain} from '../navigation/rootNavigation';
import {useParty} from '../context/PartyContext';

const DEFENSE_SECONDS = 60;

export function PartySituationScreen() {
  const navigation = useNavigation<any>();
  const {
    currentRound,
    totalRounds,
    currentPlayerName,
    currentCategory,
    currentSituation,
    resetGame,
  } = useParty();

  const [pauseVisible, setPauseVisible] =
    useState(false);
  const [secondsLeft, setSecondsLeft] = useState(
    DEFENSE_SECONDS,
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
    (secondsLeft / DEFENSE_SECONDS) * 100;

  return (
    <BackgroundScreen>
      <View style={styles.root}>
        <View style={styles.topRow}>
          <Pressable
            onPress={() => setPauseVisible(true)}
            style={styles.pauseBtn}>
            <Text style={styles.pauseIcon}>⏸</Text>
          </Pressable>
          <View style={styles.topCenter}>
            <Text style={styles.roundLabel}>
              ROUND {currentRound} OF{' '}
              {totalRounds}
            </Text>
            <Text
              style={[
                styles.categoryTitle,
                {
                  color:
                    currentCategory.color,
                },
              ]}>
              {currentCategory.label}
            </Text>
          </View>
          <View style={styles.topSpacer} />
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {width: `${progress}%`},
            ]}
          />
        </View>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.card}>
          <View style={styles.cardInner}>
            <View style={styles.targetPill}>
              <Text style={styles.targetText}>
                Situation for {currentPlayerName()}
              </Text>
            </View>
            <Text style={styles.situationText}>
              {currentSituation}
            </Text>
            <Text style={styles.hint}>
              Other guests can interrogate. Defend yourself out loud.
            </Text>
            <Text style={styles.timer}>
              {secondsLeft}s remaining
            </Text>
          </View>
        </LinearGradient>

        <Pressable
          onPress={() => navigateRootScreen('PartyVote')}
          style={styles.voteBtn}>
          <Text style={styles.voteBtnText}>Vote</Text>
        </Pressable>
      </View>

      <PartyPauseModal
        visible={pauseVisible}
        onResume={() => setPauseVisible(false)}
        onEndGame={() => {
          setPauseVisible(false);
          resetGame();
          resetToMain();
        }}
      />
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 44,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  pauseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseIcon: {
    fontSize: 14,
    color: '#E8EEFF',
  },
  topCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  topSpacer: {
    width: 40,
  },
  roundLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
  },
  categoryTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    textAlign: 'center',
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1A2347',
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2EB3FF',
    borderRadius: 2,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.35)',
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardInner: {
    flex: 1,
    padding: 24,
  },
  targetPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    marginBottom: 16,
  },
  targetText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  situationText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 16,
    flex: 1,
  },
  hint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    lineHeight: 18,
    color: '#7D88AD',
    marginBottom: 12,
  },
  timer: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: '#2EB3FF',
    letterSpacing: 0.5,
  },
  voteBtn: {
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
  voteBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

