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

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import KinddSuspiccousIdeaspartyPause from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaspartyPause';
import {
  kinddSuspiccousIdeasPartyCategories,
  useKinddSuspiccousIdeasParty,
} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeaspartyStore';
import type {KinddSuspiccousIdeasPartyCategoryId} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeaspartyData';

const kinddSuspiccousIdeasWheelSize = 280;
const kinddSuspiccousIdeasSegmentCount =
  kinddSuspiccousIdeasPartyCategories.length;
const kinddSuspiccousIdeasSegmentAngle = 360 / kinddSuspiccousIdeasSegmentCount;
const kinddSuspiccousIdeasLabelRadius = kinddSuspiccousIdeasWheelSize * 0.33;

const KinddSuspiccousIdeasWheelLabel = ({
  kinddSuspiccousLabel,
  kinddSuspiccousTextColor,
  kinddSuspiccousIndex,
}: {
  kinddSuspiccousLabel: string;
  kinddSuspiccousTextColor: string;
  kinddSuspiccousIndex: number;
}) => {
  const kinddSuspiccousAngleDeg =
    kinddSuspiccousIndex * kinddSuspiccousIdeasSegmentAngle +
    kinddSuspiccousIdeasSegmentAngle / 2;
  const kinddSuspiccousFlipLabel =
    kinddSuspiccousAngleDeg > 90 && kinddSuspiccousAngleDeg < 270;

  return (
    <View
      style={[
        styles.kinddSuspiccousWheelLabelSlot,
        {
          transform: [
            {rotate: `${kinddSuspiccousAngleDeg}deg`},
            {translateY: -kinddSuspiccousIdeasLabelRadius},
            {rotate: kinddSuspiccousFlipLabel ? '180deg' : '0deg'},
          ],
        },
      ]}>
      <Text
        numberOfLines={2}
        style={[
          styles.kinddSuspiccousWheelLabelText,
          {color: kinddSuspiccousTextColor},
        ]}>
        {kinddSuspiccousLabel}
      </Text>
    </View>
  );
};

const KinddSuspiccousIdeaspartyspin = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const {
    kinddSuspiccousCurrentRound,
    kinddSuspiccousTotalRounds,
    kinddSuspiccousCurrentPlayerName,
    kinddSuspiccousPickCategory,
    kinddSuspiccousCurrentCategory,
    kinddSuspiccousResetGame,
  } = useKinddSuspiccousIdeasParty();

  const [kinddSuspiccousPauseVisible, setKinddSuspiccousPauseVisible] =
    useState(false);
  const [kinddSuspiccousSpinning, setKinddSuspiccousSpinning] = useState(false);
  const [kinddSuspiccousSelectedIndex, setKinddSuspiccousSelectedIndex] =
    useState<number | null>(null);

  const kinddSuspiccousRotation = useRef(new Animated.Value(0)).current;
  const kinddSuspiccousRotationDeg = useRef(0);

  const kinddSuspiccousSpin = () => {
    if (kinddSuspiccousSpinning) {
      return;
    }

    setKinddSuspiccousSpinning(true);
    const kinddSuspiccousTargetIndex = Math.floor(
      Math.random() * kinddSuspiccousIdeasSegmentCount,
    );
    const kinddSuspiccousExtraSpins = 5;
    const kinddSuspiccousTargetAngle =
      kinddSuspiccousRotationDeg.current +
      kinddSuspiccousExtraSpins * 360 +
      (kinddSuspiccousIdeasSegmentCount - kinddSuspiccousTargetIndex) *
        kinddSuspiccousIdeasSegmentAngle;

    Animated.timing(kinddSuspiccousRotation, {
      toValue: kinddSuspiccousTargetAngle,
      duration: 3200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      kinddSuspiccousRotationDeg.current = kinddSuspiccousTargetAngle;
      setKinddSuspiccousSelectedIndex(kinddSuspiccousTargetIndex);
      setKinddSuspiccousSpinning(false);
      kinddSuspiccousPickCategory(
        kinddSuspiccousIdeasPartyCategories[kinddSuspiccousTargetIndex]
          .kinddSuspiccousCategoryId as KinddSuspiccousIdeasPartyCategoryId,
      );
    });
  };

  const kinddSuspiccousActiveCategory =
    kinddSuspiccousSelectedIndex !== null
      ? kinddSuspiccousIdeasPartyCategories[kinddSuspiccousSelectedIndex]
      : kinddSuspiccousCurrentCategory;

  const kinddSuspiccousSpinInterpolate = kinddSuspiccousRotation.interpolate({
    inputRange: [0, 36000],
    outputRange: ['0deg', '36000deg'],
  });

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <View style={styles.kinddSuspiccousTopRow}>
          <Pressable
            onPress={() => setKinddSuspiccousPauseVisible(true)}
            style={styles.kinddSuspiccousPauseBtn}>
            <Image source={require('../../assts/immgs/pause.png')} />
          </Pressable>
          <View style={styles.kinddSuspiccousTopCenter}>
            <Text style={styles.kinddSuspiccousRoundLabel}>
              ROUND {kinddSuspiccousCurrentRound} OF{' '}
              {kinddSuspiccousTotalRounds}
            </Text>
            <Text style={styles.kinddSuspiccousTurnTitle}>
              {kinddSuspiccousCurrentPlayerName()}'s turn
            </Text>
          </View>
          <View style={styles.kinddSuspiccousTopSpacer} />
        </View>

        <Pressable
          onPress={kinddSuspiccousSpin}
          disabled={kinddSuspiccousSpinning}
          style={styles.kinddSuspiccousSpinLabelBtn}>
          <Text style={styles.kinddSuspiccousSpinLabelText}>
            Spin for a category
          </Text>
        </Pressable>

        <View style={styles.kinddSuspiccousWheelWrap}>
          <Text style={styles.kinddSuspiccousPointer}>▼</Text>
          <View style={styles.kinddSuspiccousWheelStage}>
            <Animated.View
              style={[
                styles.kinddSuspiccousWheelRotate,
                {transform: [{rotate: kinddSuspiccousSpinInterpolate}]},
              ]}>
              <Image
                source={require('../../assts/immgs/whll.png')}
                style={styles.kinddSuspiccousWheelImage}
                resizeMode="contain"
              />
              <View
                pointerEvents="none"
                style={styles.kinddSuspiccousWheelLabels}>
                {kinddSuspiccousIdeasPartyCategories.map(
                  (kinddSuspiccousCategory, kinddSuspiccousIndex) => (
                    <KinddSuspiccousIdeasWheelLabel
                      key={kinddSuspiccousCategory.kinddSuspiccousCategoryId}
                      kinddSuspiccousIndex={kinddSuspiccousIndex}
                      kinddSuspiccousLabel={
                        kinddSuspiccousCategory.kinddSuspiccousCategoryLabel
                      }
                      kinddSuspiccousTextColor={
                        kinddSuspiccousCategory.kinddSuspiccousCategoryTextColor
                      }
                    />
                  ),
                )}
              </View>
            </Animated.View>
            <Pressable
              onPress={kinddSuspiccousSpin}
              disabled={
                kinddSuspiccousSpinning || !!kinddSuspiccousActiveCategory
              }
              style={[
                styles.kinddSuspiccousWheelCenter,
                kinddSuspiccousActiveCategory &&
                  !kinddSuspiccousSpinning &&
                  styles.kinddSuspiccousWheelCenterDone,
              ]}>
              {!kinddSuspiccousSpinning && !kinddSuspiccousActiveCategory ? (
                <Text style={styles.kinddSuspiccousWheelCenterText}>SPIN</Text>
              ) : null}
              {!kinddSuspiccousSpinning && kinddSuspiccousActiveCategory ? (
                <Text style={styles.kinddSuspiccousWheelCenterCheck}>✓</Text>
              ) : null}
            </Pressable>
          </View>
        </View>

        {kinddSuspiccousActiveCategory ? (
          <View style={styles.kinddSuspiccousCategoryReveal}>
            <Text style={styles.kinddSuspiccousCategoryLabel}>Category</Text>
            <Text
              style={[
                styles.kinddSuspiccousCategoryName,
                {
                  color:
                    kinddSuspiccousActiveCategory.kinddSuspiccousCategoryColor,
                },
              ]}>
              {kinddSuspiccousActiveCategory.kinddSuspiccousCategoryLabel}
            </Text>
          </View>
        ) : (
          <Text style={styles.kinddSuspiccousHint}>Tap the center to spin</Text>
        )}

        {kinddSuspiccousActiveCategory && !kinddSuspiccousSpinning ? (
          <Pressable
            onPress={() =>
              kinddSuspiccousNavigation.navigate(
                'KinddSuspiccousIdeaspartysituation',
              )
            }
            style={styles.kinddSuspiccousRevealBtn}>
            <Text style={styles.kinddSuspiccousRevealBtnText}>
              Reveal Situation
            </Text>
          </Pressable>
        ) : null}
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
    alignItems: 'center',
  },
  kinddSuspiccousTopRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
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
  kinddSuspiccousTurnTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  kinddSuspiccousSpinLabelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    marginBottom: 16,
    marginTop: 50,
  },
  kinddSuspiccousSpinLabelText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  kinddSuspiccousWheelWrap: {
    width: kinddSuspiccousIdeasWheelSize,
    alignItems: 'center',
    marginBottom: 20,
  },
  kinddSuspiccousPointer: {
    fontSize: 32,
    color: '#F7C948',
    marginBottom: 4,
    zIndex: 2,
    top: 20,
  },
  kinddSuspiccousWheelStage: {
    width: kinddSuspiccousIdeasWheelSize,
    height: kinddSuspiccousIdeasWheelSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousWheelRotate: {
    width: kinddSuspiccousIdeasWheelSize,
    height: kinddSuspiccousIdeasWheelSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousWheelImage: {
    width: kinddSuspiccousIdeasWheelSize,
    height: kinddSuspiccousIdeasWheelSize,
  },
  kinddSuspiccousWheelLabels: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousWheelLabelSlot: {
    position: 'absolute',
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousWheelLabelText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
  },
  kinddSuspiccousWheelCenter: {
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
  kinddSuspiccousWheelCenterDone: {
    backgroundColor: '#4ADE80',
  },
  kinddSuspiccousWheelCenterText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
    color: '#1A2347',
  },
  kinddSuspiccousWheelCenterCheck: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 22,
    color: '#1A2347',
  },
  kinddSuspiccousCategoryReveal: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 20,
  },
  kinddSuspiccousCategoryLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    textTransform: 'uppercase',
  },
  kinddSuspiccousCategoryName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    textAlign: 'center',
  },
  kinddSuspiccousHint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#7D88AD',
    marginBottom: 20,
  },
  kinddSuspiccousRevealBtn: {
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
  kinddSuspiccousRevealBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});

export default KinddSuspiccousIdeaspartyspin;
