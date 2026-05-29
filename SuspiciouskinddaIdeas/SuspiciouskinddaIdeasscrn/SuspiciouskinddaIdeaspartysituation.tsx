import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import SuspiciouskinddaIdeaspartyPause from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaspartyPause';
import {useSuspiciouskinddaIdeasParty} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeaspartyStore';

const suspiciouskinddaIdeasDefenseSeconds = 60;

const SuspiciouskinddaIdeaspartysituation = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const {
    suspiciouskinddaCurrentRound,
    suspiciouskinddaTotalRounds,
    suspiciouskinddaCurrentPlayerName,
    suspiciouskinddaCurrentCategory,
    suspiciouskinddaCurrentSituation,
    suspiciouskinddaResetGame,
  } = useSuspiciouskinddaIdeasParty();

  const [suspiciouskinddaPauseVisible, setSuspiciouskinddaPauseVisible] =
    useState(false);
  const [suspiciouskinddaSecondsLeft, setSuspiciouskinddaSecondsLeft] = useState(
    suspiciouskinddaIdeasDefenseSeconds,
  );
  const suspiciouskinddaTimerRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  useEffect(() => {
    suspiciouskinddaTimerRef.current = setInterval(() => {
      setSuspiciouskinddaSecondsLeft(suspiciouskinddaPrev => {
        if (suspiciouskinddaPrev <= 1) {
          if (suspiciouskinddaTimerRef.current) {
            clearInterval(suspiciouskinddaTimerRef.current);
          }
          return 0;
        }
        return suspiciouskinddaPrev - 1;
      });
    }, 1000);

    return () => {
      if (suspiciouskinddaTimerRef.current) {
        clearInterval(suspiciouskinddaTimerRef.current);
      }
    };
  }, []);

  if (!suspiciouskinddaCurrentCategory || !suspiciouskinddaCurrentSituation) {
    return null;
  }

  const suspiciouskinddaProgress =
    (suspiciouskinddaSecondsLeft / suspiciouskinddaIdeasDefenseSeconds) * 100;

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <View style={styles.suspiciouskinddaTopRow}>
          <Pressable
            onPress={() => setSuspiciouskinddaPauseVisible(true)}
            style={styles.suspiciouskinddaPauseBtn}>
            <Text style={styles.suspiciouskinddaPauseIcon}>⏸</Text>
          </Pressable>
          <View style={styles.suspiciouskinddaTopCenter}>
            <Text style={styles.suspiciouskinddaRoundLabel}>
              ROUND {suspiciouskinddaCurrentRound} OF{' '}
              {suspiciouskinddaTotalRounds}
            </Text>
            <Text
              style={[
                styles.suspiciouskinddaCategoryTitle,
                {
                  color:
                    suspiciouskinddaCurrentCategory.suspiciouskinddaCategoryColor,
                },
              ]}>
              {suspiciouskinddaCurrentCategory.suspiciouskinddaCategoryLabel}
            </Text>
          </View>
          <View style={styles.suspiciouskinddaTopSpacer} />
        </View>

        <View style={styles.suspiciouskinddaProgressTrack}>
          <View
            style={[
              styles.suspiciouskinddaProgressFill,
              {width: `${suspiciouskinddaProgress}%`},
            ]}
          />
        </View>

        <LinearGradient
          colors={['#1A2347', '#0F1730'] as unknown as string[]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.suspiciouskinddaCard}>
          <View style={styles.suspiciouskinddaCardInner}>
            <View style={styles.suspiciouskinddaTargetPill}>
              <Text style={styles.suspiciouskinddaTargetText}>
                Situation for {suspiciouskinddaCurrentPlayerName()}
              </Text>
            </View>
            <Text style={styles.suspiciouskinddaSituationText}>
              {suspiciouskinddaCurrentSituation}
            </Text>
            <Text style={styles.suspiciouskinddaHint}>
              Other guests can interrogate. Defend yourself out loud.
            </Text>
            <Text style={styles.suspiciouskinddaTimer}>
              {suspiciouskinddaSecondsLeft}s remaining
            </Text>
          </View>
        </LinearGradient>

        <Pressable
          onPress={() =>
            suspiciouskinddaNavigation.navigate('SuspiciouskinddaIdeaspartyvote')
          }
          style={styles.suspiciouskinddaVoteBtn}>
          <Text style={styles.suspiciouskinddaVoteBtnText}>Vote</Text>
        </Pressable>
      </View>

      <SuspiciouskinddaIdeaspartyPause
        suspiciouskinddaVisible={suspiciouskinddaPauseVisible}
        suspiciouskinddaOnResume={() => setSuspiciouskinddaPauseVisible(false)}
        suspiciouskinddaOnEndGame={() => {
          setSuspiciouskinddaPauseVisible(false);
          suspiciouskinddaResetGame();
          suspiciouskinddaNavigation.reset({
            index: 0,
            routes: [{name: 'SuspiciouskinddaIdeastab'}],
          });
        }}
      />
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
  suspiciouskinddaTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  suspiciouskinddaPauseBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaPauseIcon: {
    fontSize: 14,
    color: '#E8EEFF',
  },
  suspiciouskinddaTopCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  suspiciouskinddaTopSpacer: {
    width: 40,
  },
  suspiciouskinddaRoundLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
  },
  suspiciouskinddaCategoryTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    textAlign: 'center',
  },
  suspiciouskinddaProgressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1A2347',
    marginBottom: 20,
    overflow: 'hidden',
  },
  suspiciouskinddaProgressFill: {
    height: '100%',
    backgroundColor: '#2EB3FF',
    borderRadius: 2,
  },
  suspiciouskinddaCard: {
    flex: 1,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.35)',
    marginBottom: 20,
    overflow: 'hidden',
  },
  suspiciouskinddaCardInner: {
    flex: 1,
    padding: 24,
  },
  suspiciouskinddaTargetPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    marginBottom: 16,
  },
  suspiciouskinddaTargetText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  suspiciouskinddaSituationText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    color: '#FFFFFF',
    marginBottom: 16,
    flex: 1,
  },
  suspiciouskinddaHint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    lineHeight: 18,
    color: '#7D88AD',
    marginBottom: 12,
  },
  suspiciouskinddaTimer: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: '#2EB3FF',
    letterSpacing: 0.5,
  },
  suspiciouskinddaVoteBtn: {
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
  suspiciouskinddaVoteBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default SuspiciouskinddaIdeaspartysituation;
