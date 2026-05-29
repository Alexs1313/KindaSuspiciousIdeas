import React, {useRef, useState} from 'react';
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import SuspiciouskinddaIdeaspartyPause from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaspartyPause';
import {
  suspiciouskinddaIdeasPartyCategories,
  useSuspiciouskinddaIdeasParty,
} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeaspartyStore';
import type {SuspiciouskinddaIdeasPartyCategoryId} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeaspartyData';

const suspiciouskinddaIdeasWheelSize = 280;
const suspiciouskinddaIdeasSegmentCount =
  suspiciouskinddaIdeasPartyCategories.length;
const suspiciouskinddaIdeasSegmentAngle = 360 / suspiciouskinddaIdeasSegmentCount;
const suspiciouskinddaIdeasLabelRadius = suspiciouskinddaIdeasWheelSize * 0.33;

const SuspiciouskinddaIdeasWheelLabel = ({
  suspiciouskinddaLabel,
  suspiciouskinddaTextColor,
  suspiciouskinddaIndex,
}: {
  suspiciouskinddaLabel: string;
  suspiciouskinddaTextColor: string;
  suspiciouskinddaIndex: number;
}) => {
  const suspiciouskinddaAngleDeg =
    suspiciouskinddaIndex * suspiciouskinddaIdeasSegmentAngle +
    suspiciouskinddaIdeasSegmentAngle / 2;
  const suspiciouskinddaFlipLabel =
    suspiciouskinddaAngleDeg > 90 && suspiciouskinddaAngleDeg < 270;

  return (
    <View
      style={[
        styles.suspiciouskinddaWheelLabelSlot,
        {
          transform: [
            {rotate: `${suspiciouskinddaAngleDeg}deg`},
            {translateY: -suspiciouskinddaIdeasLabelRadius},
            {rotate: suspiciouskinddaFlipLabel ? '180deg' : '0deg'},
          ],
        },
      ]}>
      <Text
        numberOfLines={2}
        style={[
          styles.suspiciouskinddaWheelLabelText,
          {color: suspiciouskinddaTextColor},
        ]}>
        {suspiciouskinddaLabel}
      </Text>
    </View>
  );
};

const SuspiciouskinddaIdeaspartyspin = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const {
    suspiciouskinddaCurrentRound,
    suspiciouskinddaTotalRounds,
    suspiciouskinddaCurrentPlayerName,
    suspiciouskinddaPickCategory,
    suspiciouskinddaCurrentCategory,
    suspiciouskinddaResetGame,
  } = useSuspiciouskinddaIdeasParty();

  const [suspiciouskinddaPauseVisible, setSuspiciouskinddaPauseVisible] =
    useState(false);
  const [suspiciouskinddaSpinning, setSuspiciouskinddaSpinning] = useState(false);
  const [suspiciouskinddaSelectedIndex, setSuspiciouskinddaSelectedIndex] =
    useState<number | null>(null);

  const suspiciouskinddaRotation = useRef(new Animated.Value(0)).current;
  const suspiciouskinddaRotationDeg = useRef(0);

  const suspiciouskinddaSpin = () => {
    if (suspiciouskinddaSpinning) {
      return;
    }

    setSuspiciouskinddaSpinning(true);
    const suspiciouskinddaTargetIndex = Math.floor(
      Math.random() * suspiciouskinddaIdeasSegmentCount,
    );
    const suspiciouskinddaExtraSpins = 5;
    const suspiciouskinddaTargetAngle =
      suspiciouskinddaRotationDeg.current +
      suspiciouskinddaExtraSpins * 360 +
      (suspiciouskinddaIdeasSegmentCount - suspiciouskinddaTargetIndex) *
        suspiciouskinddaIdeasSegmentAngle;

    Animated.timing(suspiciouskinddaRotation, {
      toValue: suspiciouskinddaTargetAngle,
      duration: 3200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      suspiciouskinddaRotationDeg.current = suspiciouskinddaTargetAngle;
      setSuspiciouskinddaSelectedIndex(suspiciouskinddaTargetIndex);
      setSuspiciouskinddaSpinning(false);
      suspiciouskinddaPickCategory(
        suspiciouskinddaIdeasPartyCategories[suspiciouskinddaTargetIndex]
          .suspiciouskinddaCategoryId as SuspiciouskinddaIdeasPartyCategoryId,
      );
    });
  };

  const suspiciouskinddaActiveCategory =
    suspiciouskinddaSelectedIndex !== null
      ? suspiciouskinddaIdeasPartyCategories[suspiciouskinddaSelectedIndex]
      : suspiciouskinddaCurrentCategory;

  const suspiciouskinddaSpinInterpolate = suspiciouskinddaRotation.interpolate({
    inputRange: [0, 36000],
    outputRange: ['0deg', '36000deg'],
  });

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <View style={styles.suspiciouskinddaTopRow}>
          <Pressable
            onPress={() => setSuspiciouskinddaPauseVisible(true)}
            style={styles.suspiciouskinddaPauseBtn}>
            <Image source={require('../../assts/immgs/pause.png')} />
          </Pressable>
          <View style={styles.suspiciouskinddaTopCenter}>
            <Text style={styles.suspiciouskinddaRoundLabel}>
              ROUND {suspiciouskinddaCurrentRound} OF{' '}
              {suspiciouskinddaTotalRounds}
            </Text>
            <Text style={styles.suspiciouskinddaTurnTitle}>
              {suspiciouskinddaCurrentPlayerName()}'s turn
            </Text>
          </View>
          <View style={styles.suspiciouskinddaTopSpacer} />
        </View>

        <Pressable
          onPress={suspiciouskinddaSpin}
          disabled={suspiciouskinddaSpinning}
          style={styles.suspiciouskinddaSpinLabelBtn}>
          <Text style={styles.suspiciouskinddaSpinLabelText}>
            Pick a category
          </Text>
        </Pressable>

        <View style={styles.suspiciouskinddaWheelWrap}>
          <Text style={styles.suspiciouskinddaPointer}>▼</Text>
          <View style={styles.suspiciouskinddaWheelStage}>
            <Animated.View
              style={[
                styles.suspiciouskinddaWheelRotate,
                {transform: [{rotate: suspiciouskinddaSpinInterpolate}]},
              ]}>
              <Image
                source={require('../../assts/immgs/whll.png')}
                style={styles.suspiciouskinddaWheelImage}
                resizeMode="contain"
              />
              <View
                pointerEvents="none"
                style={styles.suspiciouskinddaWheelLabels}>
                {suspiciouskinddaIdeasPartyCategories.map(
                  (suspiciouskinddaCategory, suspiciouskinddaIndex) => (
                    <SuspiciouskinddaIdeasWheelLabel
                      key={suspiciouskinddaCategory.suspiciouskinddaCategoryId}
                      suspiciouskinddaIndex={suspiciouskinddaIndex}
                      suspiciouskinddaLabel={
                        suspiciouskinddaCategory.suspiciouskinddaCategoryLabel
                      }
                      suspiciouskinddaTextColor={
                        suspiciouskinddaCategory.suspiciouskinddaCategoryTextColor
                      }
                    />
                  ),
                )}
              </View>
            </Animated.View>
            <Pressable
              onPress={suspiciouskinddaSpin}
              disabled={
                suspiciouskinddaSpinning || !!suspiciouskinddaActiveCategory
              }
              style={[
                styles.suspiciouskinddaWheelCenter,
                suspiciouskinddaActiveCategory &&
                  !suspiciouskinddaSpinning &&
                  styles.suspiciouskinddaWheelCenterDone,
              ]}>
              {!suspiciouskinddaSpinning && !suspiciouskinddaActiveCategory ? (
                <Text style={styles.suspiciouskinddaWheelCenterText}>PICK</Text>
              ) : null}
              {!suspiciouskinddaSpinning && suspiciouskinddaActiveCategory ? (
                <Text style={styles.suspiciouskinddaWheelCenterCheck}>✓</Text>
              ) : null}
            </Pressable>
          </View>
        </View>

        {suspiciouskinddaActiveCategory ? (
          <View style={styles.suspiciouskinddaCategoryReveal}>
            <Text style={styles.suspiciouskinddaCategoryLabel}>Category</Text>
            <Text
              style={[
                styles.suspiciouskinddaCategoryName,
                {
                  color:
                    suspiciouskinddaActiveCategory.suspiciouskinddaCategoryColor,
                },
              ]}>
              {suspiciouskinddaActiveCategory.suspiciouskinddaCategoryLabel}
            </Text>
          </View>
        ) : (
          <Text style={styles.suspiciouskinddaHint}>Tap the center to pick</Text>
        )}

        {suspiciouskinddaActiveCategory && !suspiciouskinddaSpinning ? (
          <Pressable
            onPress={() =>
              suspiciouskinddaNavigation.navigate(
                'SuspiciouskinddaIdeaspartysituation',
              )
            }
            style={styles.suspiciouskinddaRevealBtn}>
            <Text style={styles.suspiciouskinddaRevealBtnText}>
              Reveal Situation
            </Text>
          </Pressable>
        ) : null}
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
    alignItems: 'center',
  },
  suspiciouskinddaTopRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
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
  suspiciouskinddaTurnTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  suspiciouskinddaSpinLabelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    marginBottom: 16,
    marginTop: 50,
  },
  suspiciouskinddaSpinLabelText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  suspiciouskinddaWheelWrap: {
    width: suspiciouskinddaIdeasWheelSize,
    alignItems: 'center',
    marginBottom: 20,
  },
  suspiciouskinddaPointer: {
    fontSize: 32,
    color: '#F7C948',
    marginBottom: 4,
    zIndex: 2,
    top: 20,
  },
  suspiciouskinddaWheelStage: {
    width: suspiciouskinddaIdeasWheelSize,
    height: suspiciouskinddaIdeasWheelSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaWheelRotate: {
    width: suspiciouskinddaIdeasWheelSize,
    height: suspiciouskinddaIdeasWheelSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaWheelImage: {
    width: suspiciouskinddaIdeasWheelSize,
    height: suspiciouskinddaIdeasWheelSize,
  },
  suspiciouskinddaWheelLabels: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaWheelLabelSlot: {
    position: 'absolute',
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaWheelLabelText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
  },
  suspiciouskinddaWheelCenter: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(46,179,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  suspiciouskinddaWheelCenterDone: {
    backgroundColor: '#4ADE80',
  },
  suspiciouskinddaWheelCenterText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
    color: '#1A2347',
  },
  suspiciouskinddaWheelCenterCheck: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 22,
    color: '#1A2347',
  },
  suspiciouskinddaCategoryReveal: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 20,
  },
  suspiciouskinddaCategoryLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    textTransform: 'uppercase',
  },
  suspiciouskinddaCategoryName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    textAlign: 'center',
  },
  suspiciouskinddaHint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#7D88AD',
    marginBottom: 20,
  },
  suspiciouskinddaRevealBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
    backgroundColor: '#2EB3FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    shadowColor: '#2EB3FF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  suspiciouskinddaRevealBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default SuspiciouskinddaIdeaspartyspin;
