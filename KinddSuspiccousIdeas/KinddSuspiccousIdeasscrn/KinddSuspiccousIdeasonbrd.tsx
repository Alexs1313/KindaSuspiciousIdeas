import React, {useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';

const KinddSuspiccousIdeasonbrd = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const [kinddSuspiccousIndex, setKinddSuspiccousIndex] = useState(0);

  const kinddSuspiccousSlides = useMemo(
    () => [
      {
        kinddSuspiccousIdeasId: 'caseCards',
        kinddSuspiccousIdeasTitle: 'Suspicious Case\nCards',
        kinddSuspiccousIdeasBody:
          'Read short real-world dilemmas. Spot the suspicious. Spot the innocent. Train your gut.',
        kinddSuspiccousIdeasCtaLabel: 'Next',
        kinddSuspiccousIdeasHero: require('../../assts/immgs/kinddsuspiccoonbrdhero1.png'),
        kinddSuspiccousIdeasHeroResizeMode: 'cover' as const,
      },
      {
        kinddSuspiccousIdeasId: 'stories',
        kinddSuspiccousIdeasTitle: 'Strange & Funny\nStories',
        kinddSuspiccousIdeasBody:
          "A growing archive of slightly unhinged true-feeling stories. Read 'em. Share 'em. Question reality.",
        kinddSuspiccousIdeasCtaLabel: 'Next',
        kinddSuspiccousIdeasHero: require('../../assts/immgs/kinddsuspiccoonbrdhero2.png'),
        kinddSuspiccousIdeasHeroResizeMode: 'contain' as const,
      },
      {
        kinddSuspiccousIdeasId: 'party',
        kinddSuspiccousIdeasTitle: 'Party Mode with\nFriends',
        kinddSuspiccousIdeasBody:
          'Pick a scenario, defend yourself out loud — friends vote on how convincing you were',
        kinddSuspiccousIdeasCtaLabel: 'Next',
        kinddSuspiccousIdeasHero: require('../../assts/immgs/kinddsuspiccoonbrdhero3.png'),
        kinddSuspiccousIdeasHeroResizeMode: 'contain' as const,
      },
      {
        kinddSuspiccousIdeasId: 'ciphers',
        kinddSuspiccousIdeasTitle: 'Ciphers & Decoder\nTools',
        kinddSuspiccousIdeasBody:
          'Crack coded messages or write your own.\nCaesar, Atbash, reversal, and more.',
        kinddSuspiccousIdeasCtaLabel: 'Start Investigating',
        kinddSuspiccousIdeasHero: require('../../assts/immgs/kinddsuspiccoonbrdhero4.png'),
        kinddSuspiccousIdeasHeroResizeMode: 'contain' as const,
      },
    ],
    [],
  );

  type KinddSuspiccousIdeasSlide = (typeof kinddSuspiccousSlides)[number];

  const kinddSuspiccousGoTo = (kinddSuspiccousNextIndex: number) => {
    const kinddSuspiccousClamped = Math.max(
      0,
      Math.min(kinddSuspiccousNextIndex, kinddSuspiccousSlides.length - 1),
    );
    setKinddSuspiccousIndex(kinddSuspiccousClamped);
  };

  const kinddSuspiccousOnSkip = () => {
    kinddSuspiccousNavigation.replace('KinddSuspiccousIdeastab');
  };

  const kinddSuspiccousOnNext = () => {
    if (kinddSuspiccousIndex >= kinddSuspiccousSlides.length - 1) {
      kinddSuspiccousOnSkip();
      return;
    }
    kinddSuspiccousGoTo(kinddSuspiccousIndex + 1);
  };

  const kinddSuspiccousOnBack = () => {
    kinddSuspiccousGoTo(kinddSuspiccousIndex - 1);
  };

  const kinddSuspiccousIdeasRenderStep = (
    kinddSuspiccousItem: KinddSuspiccousIdeasSlide,
  ) => {
    return (
      <View style={styles.kinddSuspiccousIdeasSlide}>
        <View style={styles.kinddSuspiccousIdeasHeroWrap}>
          <View style={styles.kinddSuspiccousIdeasHeroImageWrap}>
            <Image
              source={kinddSuspiccousItem.kinddSuspiccousIdeasHero}
              style={styles.kinddSuspiccousIdeasHeroImage}
              resizeMode={
                kinddSuspiccousItem.kinddSuspiccousIdeasHeroResizeMode ??
                'contain'
              }
            />
            <LinearGradient
              colors={['rgba(5,8,19,0)', '#050813']}
              style={styles.kinddSuspiccousIdeasHeroFade}
            />
          </View>
        </View>

        <View style={styles.kinddSuspiccousIdeasBottom}>
          <Text style={styles.kinddSuspiccousIdeasTitle}>
            {kinddSuspiccousItem.kinddSuspiccousIdeasTitle}
          </Text>
          <Text style={styles.kinddSuspiccousIdeasBody}>
            {kinddSuspiccousItem.kinddSuspiccousIdeasBody}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousIdeasSafe}>
        <View style={styles.kinddSuspiccousIdeasTopRow}>
          <View style={styles.kinddSuspiccousIdeasDotsRow}>
            {Array.from({length: 5}).map((_, kinddSuspiccousIdeasI) => {
              const kinddSuspiccousIdeasActive =
                kinddSuspiccousIdeasI === kinddSuspiccousIndex;
              return (
                <View
                  key={`dot_${kinddSuspiccousIdeasI}`}
                  style={[
                    styles.kinddSuspiccousIdeasDot,
                    kinddSuspiccousIdeasActive
                      ? styles.kinddSuspiccousIdeasDotActive
                      : styles.kinddSuspiccousIdeasDotIdle,
                  ]}
                />
              );
            })}
          </View>

          <Pressable onPress={kinddSuspiccousOnSkip} hitSlop={10}>
            <Text style={styles.kinddSuspiccousIdeasSkip}>Skip</Text>
          </Pressable>
        </View>

        {kinddSuspiccousSlides[kinddSuspiccousIndex]
          ? kinddSuspiccousIdeasRenderStep(
              kinddSuspiccousSlides[kinddSuspiccousIndex],
            )
          : null}

        <View style={styles.kinddSuspiccousIdeasCtaRow}>
          {kinddSuspiccousIndex > 0 ? (
            <Pressable
              onPress={kinddSuspiccousOnBack}
              style={styles.kinddSuspiccousIdeasBackBtn}>
              <Text style={styles.kinddSuspiccousIdeasBackIcon}>‹</Text>
            </Pressable>
          ) : null}

          <Pressable
            onPress={kinddSuspiccousOnNext}
            style={[
              styles.kinddSuspiccousIdeasPrimaryWrap,
              kinddSuspiccousIndex > 0
                ? styles.kinddSuspiccousIdeasPrimaryWidthWithBack
                : styles.kinddSuspiccousIdeasPrimaryWidthNoBack,
            ]}>
            <LinearGradient
              colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.kinddSuspiccousIdeasPrimary}>
              <View style={styles.kinddSuspiccousIdeasPrimaryHighlight} />
              <Text style={styles.kinddSuspiccousIdeasPrimaryText}>
                {kinddSuspiccousSlides[kinddSuspiccousIndex]
                  ?.kinddSuspiccousIdeasCtaLabel ?? 'Next'}
              </Text>
              <Text style={styles.kinddSuspiccousIdeasPrimaryArrow}>›</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </KinddSuspiccousIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousIdeasRoot: {flex: 1},

  kinddSuspiccousIdeasSafe: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 50,
  },

  kinddSuspiccousIdeasTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  kinddSuspiccousIdeasDotsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  kinddSuspiccousIdeasDot: {borderRadius: 999},
  kinddSuspiccousIdeasDotIdle: {
    width: 6,
    height: 6,
    backgroundColor: '#1A2347',
  },
  kinddSuspiccousIdeasDotActive: {
    width: 22,
    height: 6,
    backgroundColor: '#2EB3FF',
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
  },
  kinddSuspiccousIdeasSkip: {color: '#7D88AD', fontSize: 13, fontWeight: '600'},

  kinddSuspiccousIdeasSlide: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    justifyContent: 'flex-end',
  },

  kinddSuspiccousIdeasHeroWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 28,
  },

  kinddSuspiccousIdeasHeroImageWrap: {
    width: 322,
    height: 382,
    borderRadius: 18,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  kinddSuspiccousIdeasHeroImage: {width: '100%', height: '100%'},
  kinddSuspiccousIdeasHeroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
  },

  kinddSuspiccousIdeasBottom: {
    paddingBottom: 126,
  },
  kinddSuspiccousIdeasTitle: {
    fontSize: 30,
    letterSpacing: -0.28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'BowlbyOne-Regular',
  },
  kinddSuspiccousIdeasBody: {
    color: '#7D88AD',
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'Manrope-Medium',
  },

  kinddSuspiccousIdeasCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  kinddSuspiccousIdeasBackBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1A2347',
    borderWidth: 1,
    borderColor: '#233063',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousIdeasBackIcon: {
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },

  kinddSuspiccousIdeasPrimaryWrap: {
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  kinddSuspiccousIdeasPrimary: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  kinddSuspiccousIdeasPrimaryWidthNoBack: {
    width: 361,
  },
  kinddSuspiccousIdeasPrimaryWidthWithBack: {
    width: 287,
  },
  kinddSuspiccousIdeasPrimaryHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  kinddSuspiccousIdeasPrimaryText: {
    color: '#1A2347',
    fontSize: 16,
    fontWeight: '800',
  },
  kinddSuspiccousIdeasPrimaryArrow: {
    color: '#1A2347',
    fontSize: 18,
    fontWeight: '900',
    marginTop: -1,
  },
});

export default KinddSuspiccousIdeasonbrd;
