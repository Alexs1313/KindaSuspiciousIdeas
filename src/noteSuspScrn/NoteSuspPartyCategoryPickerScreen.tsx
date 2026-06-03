import React, {useRef, useState} from 'react';
import {noteSuspImages} from '../noteSuspAssts';
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

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {NoteSuspPartyPauseModal} from '../noteSuspCpnnts/NoteSuspPartyPauseModal';
import {noteSuspNavigateRootScreen, noteSuspResetToMain} from '../noteSuspNav/NoteSuspRootNavigation';
import {
  noteSuspPartyCategories,
  useNoteSuspParty,
} from '../noteSuspCtx/NoteSuspPartyContext';
import type {NoteSuspPartyCategoryId} from '../noteSuspData/NoteSuspPartyCategories';

const noteSuspPickerRingSize = 280;
const noteSuspSegmentCount =
  noteSuspPartyCategories.length;
const noteSuspSegmentAngle = 360 / noteSuspSegmentCount;
const noteSuspLabelRadius = noteSuspPickerRingSize * 0.33;

export function NoteSuspPickerSegmentLabel({
  label,
  textColor,
  index,
}: {
  label: string;
  textColor: string;
  index: number;
}) {
  const angleDeg =
    index * noteSuspSegmentAngle +
    noteSuspSegmentAngle / 2;
  const flipLabel =
    angleDeg > 90 && angleDeg < 270;

  return (
    <View
      style={[
        styles.noteSuspPickerSegmentSlot,
        {
          transform: [
            {rotate: `${angleDeg}deg`},
            {translateY: -noteSuspLabelRadius},
            {rotate: flipLabel ? '180deg' : '0deg'},
          ],
        },
      ]}>
      <Text
        numberOfLines={2}
        style={[
          styles.noteSuspPickerSegmentText,
          {color: textColor},
        ]}>
        {label}
      </Text>
    </View>
  );
}

export function NoteSuspPartyCategoryPickerScreen() {
  const navigation = useNavigation<any>();
  const {
    currentRound,
    totalRounds,
    currentGuestName,
    pickCategory,
    currentCategory,
    resetParty,
  } = useNoteSuspParty();

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
      Math.random() * noteSuspSegmentCount,
    );
    const extraRotations = 5;
    const targetAngle =
      rotationDeg.current +
      extraRotations * 360 +
      (noteSuspSegmentCount - targetIndex) *
        noteSuspSegmentAngle;

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
        noteSuspPartyCategories[targetIndex]
          .categoryId as NoteSuspPartyCategoryId,
      );
    });
  };

  const activeCategory =
    selectedIndex !== null
      ? noteSuspPartyCategories[selectedIndex]
      : currentCategory;

  const rotationInterpolate = rotation.interpolate({
    inputRange: [0, 36000],
    outputRange: ['0deg', '36000deg'],
  });

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <View style={styles.noteSuspTopRow}>
          <Pressable
            onPress={() => setPauseVisible(true)}
            style={styles.noteSuspPauseBtn}>
            <Image source={noteSuspImages.pause} />
          </Pressable>
          <View style={styles.noteSuspTopCenter}>
            <Text style={styles.noteSuspRoundLabel}>
              ROUND {currentRound} OF{' '}
              {totalRounds}
            </Text>
            <Text style={styles.noteSuspTurnTitle}>
              {currentGuestName()}'s turn
            </Text>
          </View>
          <View style={styles.noteSuspTopSpacer} />
        </View>

        <Pressable
          onPress={runCategorySelection}
          disabled={isSelecting}
          style={styles.noteSuspCategoryPromptBtn}>
          <Text style={styles.noteSuspCategoryPromptText}>
            Pick a category
          </Text>
        </Pressable>

        <View style={styles.noteSuspPickerRingWrap}>
          <Text style={styles.noteSuspPointer}>▼</Text>
          <View style={styles.noteSuspPickerRingStage}>
            <Animated.View
              style={[
                styles.noteSuspPickerRingAnimated,
                {transform: [{rotate: rotationInterpolate}]},
              ]}>
              <Image
                source={noteSuspImages.categoryPickerRing}
                style={styles.noteSuspPickerRingImage}
                resizeMode="contain"
              />
              <View
                pointerEvents="none"
                style={styles.noteSuspPickerRingLabels}>
                {noteSuspPartyCategories.map(
                  (category, index) => (
                    <NoteSuspPickerSegmentLabel
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
                styles.noteSuspPickerRingCenter,
                activeCategory &&
                  !isSelecting &&
                  styles.noteSuspPickerRingCenterDone,
              ]}>
              {!isSelecting && !activeCategory ? (
                <Text style={styles.noteSuspPickerRingCenterText}>PICK</Text>
              ) : null}
              {!isSelecting && activeCategory ? (
                <Text style={styles.noteSuspPickerRingCenterCheck}>✓</Text>
              ) : null}
            </Pressable>
          </View>
        </View>

        {activeCategory ? (
          <View style={styles.noteSuspCategoryReveal}>
            <Text style={styles.noteSuspLabel}>Category</Text>
            <Text
              style={[
                styles.noteSuspCategoryName,
                {
                  color:
                    activeCategory.color,
                },
              ]}>
              {activeCategory.label}
            </Text>
          </View>
        ) : (
          <Text style={styles.noteSuspHint}>Tap the center to pick</Text>
        )}

        {activeCategory && !isSelecting ? (
          <Pressable
            onPress={() => noteSuspNavigateRootScreen('PartySituation')}
            style={styles.noteSuspRevealBtn}>
            <Text style={styles.noteSuspRevealBtnText}>
              Reveal Situation
            </Text>
          </Pressable>
        ) : null}
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
}

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 44,
    alignItems: 'center',
  },
  noteSuspTopRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
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
  noteSuspTurnTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  noteSuspCategoryPromptBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    marginBottom: 16,
    marginTop: 50,
  },
  noteSuspCategoryPromptText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#2EB3FF',
  },
  noteSuspPickerRingWrap: {
    width: noteSuspPickerRingSize,
    alignItems: 'center',
    marginBottom: 20,
  },
  noteSuspPointer: {
    fontSize: 32,
    color: '#F7C948',
    marginBottom: 4,
    zIndex: 2,
    top: 20,
  },
  noteSuspPickerRingStage: {
    width: noteSuspPickerRingSize,
    height: noteSuspPickerRingSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspPickerRingAnimated: {
    width: noteSuspPickerRingSize,
    height: noteSuspPickerRingSize,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspPickerRingImage: {
    width: noteSuspPickerRingSize,
    height: noteSuspPickerRingSize,
  },
  noteSuspPickerRingLabels: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspPickerSegmentSlot: {
    position: 'absolute',
    width: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspPickerSegmentText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
  },
  noteSuspPickerRingCenter: {
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
  noteSuspPickerRingCenterDone: {
    backgroundColor: '#4ADE80',
  },
  noteSuspPickerRingCenterText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
    color: '#1A2347',
  },
  noteSuspPickerRingCenterCheck: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 22,
    color: '#1A2347',
  },
  noteSuspCategoryReveal: {
    alignItems: 'center',
    gap: 4,
    marginBottom: 20,
  },
  noteSuspLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#7D88AD',
    textTransform: 'uppercase',
  },
  noteSuspCategoryName: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    textAlign: 'center',
  },
  noteSuspHint: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#7D88AD',
    marginBottom: 20,
  },
  noteSuspRevealBtn: {
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
  noteSuspRevealBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
});
