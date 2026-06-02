import React, {useRef, useState} from 'react';
import {images} from '../assets';
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

import {BackgroundScreen} from '../components/BackgroundScreen';
import {PartyPauseModal} from '../components/PartyPauseModal';
import {navigateRootScreen, resetToMain} from '../navigation/rootNavigation';
import {
  partyCategories,
  useParty,
} from '../context/PartyContext';
import type {PartyCategoryId} from '../data/partyCategories';

const PICKER_RING_SIZE = 280;
const segmentCount =
  partyCategories.length;
const segmentAngle = 360 / segmentCount;
const labelRadius = PICKER_RING_SIZE * 0.33;

export function PickerSegmentLabel({
  label,
  textColor,
  index,
}: {
  label: string;
  textColor: string;
  index: number;
}) {
  const angleDeg =
    index * segmentAngle +
    segmentAngle / 2;
  const flipLabel =
    angleDeg > 90 && angleDeg < 270;

  return (
    <View
      style={[
        styles.pickerSegmentSlot,
        {
          transform: [
            {rotate: `${angleDeg}deg`},
            {translateY: -labelRadius},
            {rotate: flipLabel ? '180deg' : '0deg'},
          ],
        },
      ]}>
      <Text
        numberOfLines={2}
        style={[
          styles.pickerSegmentText,
          {color: textColor},
        ]}>
        {label}
      </Text>
    </View>
  );
}

export function PartyCategoryPickerScreen() {
  const navigation = useNavigation<any>();
  const {
    currentRound,
    totalRounds,
    currentGuestName,
    pickCategory,
    currentCategory,
    resetParty,
  } = useParty();

  const [pauseVisible, setPauseVisible] =
    useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const rotation = useRef(new Animated.Value(0)).current;
  const rotationDeg = useRef(0);

  const runCategorySelection = () => {
    if (isSelecting) {
      return;
    }

    setIsSelecting(true);
    const targetIndex = Math.floor(
      Math.random() * segmentCount,
    );
    const extraRotations = 5;
    const targetAngle =
      rotationDeg.current +
      extraRotations * 360 +
      (segmentCount - targetIndex) *
        segmentAngle;

    Animated.timing(rotation, {
      toValue: targetAngle,
      duration: 3200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      rotationDeg.current = targetAngle;
      setSelectedIndex(targetIndex);
      setIsSelecting(false);
      pickCategory(
        partyCategories[targetIndex]
          .categoryId as PartyCategoryId,
      );
    });
  };

  const activeCategory =
    selectedIndex !== null
      ? partyCategories[selectedIndex]
      : currentCategory;

  const rotationInterpolate = rotation.interpolate({
    inputRange: [0, 36000],
    outputRange: ['0deg', '36000deg'],
  });

  return (
    <BackgroundScreen>
      <View style={styles.root}>
        <View style={styles.topRow}>
          <Pressable
            onPress={() => setPauseVisible(true)}
            style={styles.pauseBtn}>
            <Image source={images.pause} />
          </Pressable>
          <View style={styles.topCenter}>
            <Text style={styles.roundLabel}>
              ROUND {currentRound} OF{' '}
              {totalRounds}
            </Text>
            <Text style={styles.turnTitle}>
              {currentGuestName()}'s turn
            </Text>
          </View>
          <View style={styles.topSpacer} />
        </View>

        <Pressable
          onPress={runCategorySelection}
          disabled={isSelecting}
          style={styles.categoryPromptBtn}>
          <Text style={styles.categoryPromptText}>
            Pick a category
          </Text>
        </Pressable>

        <View style={styles.pickerRingWrap}>
          <Text style={styles.pointer}>▼</Text>
          <View style={styles.pickerRingStage}>
            <Animated.View
              style={[
                styles.pickerRingAnimated,
                {transform: [{rotate: rotationInterpolate}]},
              ]}>
              <Image
                source={images.categoryPickerRing}
                style={styles.pickerRingImage}
                resizeMode="contain"
              />
              <View
                pointerEvents="none"
                style={styles.pickerRingLabels}>
                {partyCategories.map(
                  (category, index) => (
                    <PickerSegmentLabel
                      key={category.categoryId}
                      index={index}
                      label={
                        category.label
                      }
                      textColor={
                        category.textColor
                      }
                    />
                  ),
                )}
              </View>
            </Animated.View>
            <Pressable
              onPress={runCategorySelection}
              disabled={
                isSelecting || !!activeCategory
              }
              style={[
                styles.pickerRingCenter,
                activeCategory &&
                  !isSelecting &&
                  styles.pickerRingCenterDone,
              ]}>
              {!isSelecting && !activeCategory ? (
                <Text style={styles.pickerRingCenterText}>PICK</Text>
              ) : null}
              {!isSelecting && activeCategory ? (
                <Text style={styles.pickerRingCenterCheck}>✓</Text>
              ) : null}
            </Pressable>
          </View>
        </View>

        {activeCategory ? (
          <View style={styles.categoryReveal}>
            <Text style={styles.label}>Category</Text>
            <Text
              style={[
                styles.categoryName,
                {
                  color:
                    activeCategory.color,
                },
              ]}>
              {activeCategory.label}
            </Text>
          </View>
        ) : (
          <Text style={styles.hint}>Tap the center to pick</Text>
        )}

        {activeCategory && !isSelecting ? (
          <Pressable
            onPress={() => navigateRootScreen('PartySituation')}
            style={styles.revealBtn}>
            <Text style={styles.revealBtnText}>
              Reveal Situation
            </Text>
          </Pressable>
        ) : null}
      </View>

      <PartyPauseModal
        visible={pauseVisible}
        onResume={() => setPauseVisible(false)}
        onEndParty={() => {
          setPauseVisible(false);
          resetParty();
          resetToMain();
        }}
      />
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 44,
    alignItems: 'center',
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
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
  turnTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  categoryPromptBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    marginBottom: 16,
    marginTop: 50,
  },
  categoryPromptText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  pickerRingWrap: {
    width: PICKER_RING_SIZE,
    alignItems: 'center',
    marginBottom: 20,
  },
  pointer: {
    fontSize: 32,
    color: '#F7C948',
    marginBottom: 4,
    zIndex: 2,
    top: 20,
  },
  pickerRingStage: {
    width: PICKER_RING_SIZE,
    height: PICKER_RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerRingAnimated: {
    width: PICKER_RING_SIZE,
    height: PICKER_RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerRingImage: {
    width: PICKER_RING_SIZE,
    height: PICKER_RING_SIZE,
  },
  pickerRingLabels: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerSegmentSlot: {
    position: 'absolute',
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerSegmentText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
  },
  pickerRingCenter: {
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
  pickerRingCenterDone: {
    backgroundColor: '#4ADE80',
  },
  pickerRingCenterText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
    color: '#1A2347',
  },
  pickerRingCenterCheck: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 22,
    color: '#1A2347',
  },
  categoryReveal: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    textTransform: 'uppercase',
  },
  categoryName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    textAlign: 'center',
  },
  hint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#7D88AD',
    marginBottom: 20,
  },
  revealBtn: {
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
  revealBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});
