import React, {useMemo, useState} from 'react';
import {noteSuspImages} from '../noteSuspAssts';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';

export function NoteSuspOnboardingScreen() {
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
        hero: noteSuspImages.onboardingHero1,
        heroResizeMode: 'cover' as const,
      },
      {
        id: 'stories',
        title: 'Strange & Funny\nStories',
        body:
          "A growing archive of slightly unhinged true-feeling noteSuspStories. Read 'em. Share 'em. Question reality.",
        ctaLabel: 'Next',
        hero: noteSuspImages.onboardingHero2,
        heroResizeMode: 'contain' as const,
      },
      {
        id: 'party',
        title: 'Party Mode with\nFriends',
        body:
          'Pick a scenario, defend yourself out loud — friends vote on how convincing you were',
        ctaLabel: 'Next',
        hero: noteSuspImages.onboardingHero3,
        heroResizeMode: 'contain' as const,
      },
      {
        id: 'ciphers',
        title: 'Ciphers & Decoder\nTools',
        body:
          'Crack coded messages or write your own.\nCaesar, Atbash, reversal, and more.',
        ctaLabel: 'Start Investigating',
        hero: noteSuspImages.onboardingHero4,
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
      <View style={styles.noteSuspSlide}>
        <View style={styles.noteSuspHeroWrap}>
          <View style={styles.noteSuspHeroImageWrap}>
            <Image
              source={item.hero}
              style={styles.noteSuspHeroImage}
              resizeMode={
                item.heroResizeMode ??
                'contain'
              }
            />
            <LinearGradient
              colors={['rgba(5,8,19,0)', '#050813']}
              style={styles.noteSuspHeroFade}
            />
          </View>
        </View>

        <View style={styles.noteSuspBottom}>
          <Text style={styles.noteSuspTitle}>
            {item.title}
          </Text>
          <Text style={styles.noteSuspBody}>
            {item.body}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <NoteSuspBackgroundLayout scroll={false}>
      <View style={styles.noteSuspSafe}>
        <View style={styles.noteSuspTopRow}>
          <View style={styles.noteSuspDotsRow}>
            {Array.from({length: 5}).map((_, i) => {
              const active =
                i === index;
              return (
                <View
                  key={`dot_${i}`}
                  style={[
                    styles.noteSuspDot,
                    active
                      ? styles.noteSuspDotActive
                      : styles.noteSuspDotIdle,
                  ]}
                />
              );
            })}
          </View>

          <Pressable onPress={onSkip} hitSlop={10}>
            <Text style={styles.noteSuspSkip}>Skip</Text>
          </Pressable>
        </View>

        {slides[index]
          ? renderStep(
              slides[index],
            )
          : null}

        <View style={styles.noteSuspCtaRow}>
          {index > 0 ? (
            <Pressable
              onPress={onBack}
              style={styles.noteSuspBackBtn}>
              <Text style={styles.noteSuspBackIcon}>‹</Text>
            </Pressable>
          ) : null}

          <Pressable
            onPress={onNext}
            style={[
              styles.noteSuspPrimaryWrap,
              index > 0
                ? styles.noteSuspPrimaryWidthWithBack
                : styles.noteSuspPrimaryWidthNoBack,
            ]}>
            <LinearGradient
              colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.noteSuspPrimary}>
              <View style={styles.noteSuspPrimaryHighlight} />
              <Text style={styles.noteSuspPrimaryText}>
                {slides[index]
                  ?.ctaLabel ?? 'Next'}
              </Text>
              <Text style={styles.noteSuspPrimaryArrow}>›</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </NoteSuspBackgroundLayout>
  );
};

const styles = StyleSheet.create({
  noteSuspRoot: {flex: 1},

  noteSuspSafe: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 50,
  },

  noteSuspTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  noteSuspDotsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  noteSuspDot: {borderRadius: 999},
  noteSuspDotIdle: {
    width: 6,
    height: 6,
    backgroundColor: '#1A2347',
  },
  noteSuspDotActive: {
    width: 22,
    height: 6,
    backgroundColor: '#2EB3FF',
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
  },
  noteSuspSkip: {color: '#7D88AD', fontSize: 13, fontWeight: '600'},

  noteSuspSlide: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    justifyContent: 'flex-end',
  },

  noteSuspHeroWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 28,
  },

  noteSuspHeroImageWrap: {
    width: 322,
    height: 382,
    borderRadius: 18,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  noteSuspHeroImage: {width: '100%', height: '100%'},
  noteSuspHeroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
  },

  noteSuspBottom: {
    paddingBottom: 126,
  },
  noteSuspTitle: {
    fontSize: 30,
    letterSpacing: -0.28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'BowlbyOne-Regular',
  },
  noteSuspBody: {
    color: '#7D88AD',
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'Manrope-Medium',
  },

  noteSuspCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  noteSuspBackBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1A2347',
    borderWidth: 1,
    borderColor: '#233063',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspBackIcon: {
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },

  noteSuspPrimaryWrap: {
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  noteSuspPrimary: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  noteSuspPrimaryWidthNoBack: {
    width: 361,
  },
  noteSuspPrimaryWidthWithBack: {
    width: 287,
  },
  noteSuspPrimaryHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  noteSuspPrimaryText: {
    color: '#1A2347',
    fontSize: 16,
    fontWeight: '800',
  },
  noteSuspPrimaryArrow: {
    color: '#1A2347',
    fontSize: 18,
    fontWeight: '900',
    marginTop: -1,
  },
});

