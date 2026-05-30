import React, {useMemo, useState} from 'react';
import {images} from '../assets';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {BackgroundScreen} from '../components/BackgroundScreen';

export function OnboardingScreen() {
  const navigation = useNavigation<any>();
  const [index, setIndex] = useState(0);

  const slides = useMemo(
    () => [
      {
        id: 'caseCards',
        title: 'Suspicious Case\nCards',
        body:
          'Read short real-world dilemmas. Spot the suspicious. Spot the innocent. Train your gut.',
        ctaLabel: 'Next',
        hero: images.onboardingHero1,
        heroResizeMode: 'cover' as const,
      },
      {
        id: 'stories',
        title: 'Strange & Funny\nStories',
        body:
          "A growing archive of slightly unhinged true-feeling stories. Read 'em. Share 'em. Question reality.",
        ctaLabel: 'Next',
        hero: images.onboardingHero2,
        heroResizeMode: 'contain' as const,
      },
      {
        id: 'party',
        title: 'Party Mode with\nFriends',
        body:
          'Pick a scenario, defend yourself out loud — friends vote on how convincing you were',
        ctaLabel: 'Next',
        hero: images.onboardingHero3,
        heroResizeMode: 'contain' as const,
      },
      {
        id: 'ciphers',
        title: 'Ciphers & Decoder\nTools',
        body:
          'Crack coded messages or write your own.\nCaesar, Atbash, reversal, and more.',
        ctaLabel: 'Start Investigating',
        hero: images.onboardingHero4,
        heroResizeMode: 'contain' as const,
      },
    ],
    [],
  );

  type OnboardingSlide = (typeof slides)[number];

  const goTo = (nextIndex: number) => {
    const clamped = Math.max(
      0,
      Math.min(nextIndex, slides.length - 1),
    );
    setIndex(clamped);
  };

  const onSkip = () => {
    navigation.replace('Main');
  };

  const onNext = () => {
    if (index >= slides.length - 1) {
      onSkip();
      return;
    }
    goTo(index + 1);
  };

  const onBack = () => {
    goTo(index - 1);
  };

  const renderStep = (
    item: OnboardingSlide,
  ) => {
    return (
      <View style={styles.slide}>
        <View style={styles.heroWrap}>
          <View style={styles.heroImageWrap}>
            <Image
              source={item.hero}
              style={styles.heroImage}
              resizeMode={
                item.heroResizeMode ??
                'contain'
              }
            />
            <LinearGradient
              colors={['rgba(5,8,19,0)', '#050813']}
              style={styles.heroFade}
            />
          </View>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.body}>
            {item.body}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <BackgroundScreen scroll={false}>
      <View style={styles.safe}>
        <View style={styles.topRow}>
          <View style={styles.dotsRow}>
            {Array.from({length: 5}).map((_, i) => {
              const active =
                i === index;
              return (
                <View
                  key={`dot_${i}`}
                  style={[
                    styles.dot,
                    active
                      ? styles.dotActive
                      : styles.dotIdle,
                  ]}
                />
              );
            })}
          </View>

          <Pressable onPress={onSkip} hitSlop={10}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        </View>

        {slides[index]
          ? renderStep(
              slides[index],
            )
          : null}

        <View style={styles.ctaRow}>
          {index > 0 ? (
            <Pressable
              onPress={onBack}
              style={styles.backBtn}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
          ) : null}

          <Pressable
            onPress={onNext}
            style={[
              styles.primaryWrap,
              index > 0
                ? styles.primaryWidthWithBack
                : styles.primaryWidthNoBack,
            ]}>
            <LinearGradient
              colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.primary}>
              <View style={styles.primaryHighlight} />
              <Text style={styles.primaryText}>
                {slides[index]
                  ?.ctaLabel ?? 'Next'}
              </Text>
              <Text style={styles.primaryArrow}>›</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1},

  safe: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 50,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  dot: {borderRadius: 999},
  dotIdle: {
    width: 6,
    height: 6,
    backgroundColor: '#1A2347',
  },
  dotActive: {
    width: 22,
    height: 6,
    backgroundColor: '#2EB3FF',
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
  },
  skip: {color: '#7D88AD', fontSize: 13, fontWeight: '600'},

  slide: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    justifyContent: 'flex-end',
  },

  heroWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 28,
  },

  heroImageWrap: {
    width: 322,
    height: 382,
    borderRadius: 18,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  heroImage: {width: '100%', height: '100%'},
  heroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
  },

  bottom: {
    paddingBottom: 126,
  },
  title: {
    fontSize: 30,
    letterSpacing: -0.28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'BowlbyOne-Regular',
  },
  body: {
    color: '#7D88AD',
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'Manrope-Medium',
  },

  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  backBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1A2347',
    borderWidth: 1,
    borderColor: '#233063',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },

  primaryWrap: {
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  primary: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  primaryWidthNoBack: {
    width: 361,
  },
  primaryWidthWithBack: {
    width: 287,
  },
  primaryHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  primaryText: {
    color: '#1A2347',
    fontSize: 16,
    fontWeight: '800',
  },
  primaryArrow: {
    color: '#1A2347',
    fontSize: 18,
    fontWeight: '900',
    marginTop: -1,
  },
});

