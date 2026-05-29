import React, {useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';

const SuspiciouskinddaIdeasonbrd = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const [suspiciouskinddaIndex, setSuspiciouskinddaIndex] = useState(0);

  const suspiciouskinddaSlides = useMemo(
    () => [
      {
        suspiciouskinddaIdeasId: 'caseCards',
        suspiciouskinddaIdeasTitle: 'Suspicious Case\nCards',
        suspiciouskinddaIdeasBody:
          'Read short real-world dilemmas. Spot the suspicious. Spot the innocent. Train your gut.',
        suspiciouskinddaIdeasCtaLabel: 'Next',
        suspiciouskinddaIdeasHero: require('../../assts/immgs/kinddsuspiccoonbrdhero1.png'),
        suspiciouskinddaIdeasHeroResizeMode: 'cover' as const,
      },
      {
        suspiciouskinddaIdeasId: 'stories',
        suspiciouskinddaIdeasTitle: 'Strange & Funny\nStories',
        suspiciouskinddaIdeasBody:
          "A growing archive of slightly unhinged true-feeling stories. Read 'em. Share 'em. Question reality.",
        suspiciouskinddaIdeasCtaLabel: 'Next',
        suspiciouskinddaIdeasHero: require('../../assts/immgs/kinddsuspiccoonbrdhero2.png'),
        suspiciouskinddaIdeasHeroResizeMode: 'contain' as const,
      },
      {
        suspiciouskinddaIdeasId: 'party',
        suspiciouskinddaIdeasTitle: 'Party Mode with\nFriends',
        suspiciouskinddaIdeasBody:
          'Pick a scenario, defend yourself out loud — friends vote on how convincing you were',
        suspiciouskinddaIdeasCtaLabel: 'Next',
        suspiciouskinddaIdeasHero: require('../../assts/immgs/kinddsuspiccoonbrdhero3.png'),
        suspiciouskinddaIdeasHeroResizeMode: 'contain' as const,
      },
      {
        suspiciouskinddaIdeasId: 'ciphers',
        suspiciouskinddaIdeasTitle: 'Ciphers & Decoder\nTools',
        suspiciouskinddaIdeasBody:
          'Crack coded messages or write your own.\nCaesar, Atbash, reversal, and more.',
        suspiciouskinddaIdeasCtaLabel: 'Start Investigating',
        suspiciouskinddaIdeasHero: require('../../assts/immgs/kinddsuspiccoonbrdhero4.png'),
        suspiciouskinddaIdeasHeroResizeMode: 'contain' as const,
      },
    ],
    [],
  );

  type SuspiciouskinddaIdeasSlide = (typeof suspiciouskinddaSlides)[number];

  const suspiciouskinddaGoTo = (suspiciouskinddaNextIndex: number) => {
    const suspiciouskinddaClamped = Math.max(
      0,
      Math.min(suspiciouskinddaNextIndex, suspiciouskinddaSlides.length - 1),
    );
    setSuspiciouskinddaIndex(suspiciouskinddaClamped);
  };

  const suspiciouskinddaOnSkip = () => {
    suspiciouskinddaNavigation.replace('SuspiciouskinddaIdeastab');
  };

  const suspiciouskinddaOnNext = () => {
    if (suspiciouskinddaIndex >= suspiciouskinddaSlides.length - 1) {
      suspiciouskinddaOnSkip();
      return;
    }
    suspiciouskinddaGoTo(suspiciouskinddaIndex + 1);
  };

  const suspiciouskinddaOnBack = () => {
    suspiciouskinddaGoTo(suspiciouskinddaIndex - 1);
  };

  const suspiciouskinddaIdeasRenderStep = (
    suspiciouskinddaItem: SuspiciouskinddaIdeasSlide,
  ) => {
    return (
      <View style={styles.suspiciouskinddaIdeasSlide}>
        <View style={styles.suspiciouskinddaIdeasHeroWrap}>
          <View style={styles.suspiciouskinddaIdeasHeroImageWrap}>
            <Image
              source={suspiciouskinddaItem.suspiciouskinddaIdeasHero}
              style={styles.suspiciouskinddaIdeasHeroImage}
              resizeMode={
                suspiciouskinddaItem.suspiciouskinddaIdeasHeroResizeMode ??
                'contain'
              }
            />
            <LinearGradient
              colors={['rgba(5,8,19,0)', '#050813']}
              style={styles.suspiciouskinddaIdeasHeroFade}
            />
          </View>
        </View>

        <View style={styles.suspiciouskinddaIdeasBottom}>
          <Text style={styles.suspiciouskinddaIdeasTitle}>
            {suspiciouskinddaItem.suspiciouskinddaIdeasTitle}
          </Text>
          <Text style={styles.suspiciouskinddaIdeasBody}>
            {suspiciouskinddaItem.suspiciouskinddaIdeasBody}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaIdeasSafe}>
        <View style={styles.suspiciouskinddaIdeasTopRow}>
          <View style={styles.suspiciouskinddaIdeasDotsRow}>
            {Array.from({length: 5}).map((_, suspiciouskinddaIdeasI) => {
              const suspiciouskinddaIdeasActive =
                suspiciouskinddaIdeasI === suspiciouskinddaIndex;
              return (
                <View
                  key={`dot_${suspiciouskinddaIdeasI}`}
                  style={[
                    styles.suspiciouskinddaIdeasDot,
                    suspiciouskinddaIdeasActive
                      ? styles.suspiciouskinddaIdeasDotActive
                      : styles.suspiciouskinddaIdeasDotIdle,
                  ]}
                />
              );
            })}
          </View>

          <Pressable onPress={suspiciouskinddaOnSkip} hitSlop={10}>
            <Text style={styles.suspiciouskinddaIdeasSkip}>Skip</Text>
          </Pressable>
        </View>

        {suspiciouskinddaSlides[suspiciouskinddaIndex]
          ? suspiciouskinddaIdeasRenderStep(
              suspiciouskinddaSlides[suspiciouskinddaIndex],
            )
          : null}

        <View style={styles.suspiciouskinddaIdeasCtaRow}>
          {suspiciouskinddaIndex > 0 ? (
            <Pressable
              onPress={suspiciouskinddaOnBack}
              style={styles.suspiciouskinddaIdeasBackBtn}>
              <Text style={styles.suspiciouskinddaIdeasBackIcon}>‹</Text>
            </Pressable>
          ) : null}

          <Pressable
            onPress={suspiciouskinddaOnNext}
            style={[
              styles.suspiciouskinddaIdeasPrimaryWrap,
              suspiciouskinddaIndex > 0
                ? styles.suspiciouskinddaIdeasPrimaryWidthWithBack
                : styles.suspiciouskinddaIdeasPrimaryWidthNoBack,
            ]}>
            <LinearGradient
              colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.suspiciouskinddaIdeasPrimary}>
              <View style={styles.suspiciouskinddaIdeasPrimaryHighlight} />
              <Text style={styles.suspiciouskinddaIdeasPrimaryText}>
                {suspiciouskinddaSlides[suspiciouskinddaIndex]
                  ?.suspiciouskinddaIdeasCtaLabel ?? 'Next'}
              </Text>
              <Text style={styles.suspiciouskinddaIdeasPrimaryArrow}>›</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </SuspiciouskinddaIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaIdeasRoot: {flex: 1},

  suspiciouskinddaIdeasSafe: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 50,
  },

  suspiciouskinddaIdeasTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  suspiciouskinddaIdeasDotsRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  suspiciouskinddaIdeasDot: {borderRadius: 999},
  suspiciouskinddaIdeasDotIdle: {
    width: 6,
    height: 6,
    backgroundColor: '#1A2347',
  },
  suspiciouskinddaIdeasDotActive: {
    width: 22,
    height: 6,
    backgroundColor: '#2EB3FF',
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
  },
  suspiciouskinddaIdeasSkip: {color: '#7D88AD', fontSize: 13, fontWeight: '600'},

  suspiciouskinddaIdeasSlide: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
    justifyContent: 'flex-end',
  },

  suspiciouskinddaIdeasHeroWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 28,
  },

  suspiciouskinddaIdeasHeroImageWrap: {
    width: 322,
    height: 382,
    borderRadius: 18,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  suspiciouskinddaIdeasHeroImage: {width: '100%', height: '100%'},
  suspiciouskinddaIdeasHeroFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
  },

  suspiciouskinddaIdeasBottom: {
    paddingBottom: 126,
  },
  suspiciouskinddaIdeasTitle: {
    fontSize: 30,
    letterSpacing: -0.28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
    fontFamily: 'BowlbyOne-Regular',
  },
  suspiciouskinddaIdeasBody: {
    color: '#7D88AD',
    fontSize: 16,
    lineHeight: 19.2,
    fontWeight: '500',
    fontFamily: 'Manrope-Medium',
  },

  suspiciouskinddaIdeasCtaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  suspiciouskinddaIdeasBackBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#1A2347',
    borderWidth: 1,
    borderColor: '#233063',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaIdeasBackIcon: {
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },

  suspiciouskinddaIdeasPrimaryWrap: {
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  suspiciouskinddaIdeasPrimary: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  suspiciouskinddaIdeasPrimaryWidthNoBack: {
    width: 361,
  },
  suspiciouskinddaIdeasPrimaryWidthWithBack: {
    width: 287,
  },
  suspiciouskinddaIdeasPrimaryHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  suspiciouskinddaIdeasPrimaryText: {
    color: '#1A2347',
    fontSize: 16,
    fontWeight: '800',
  },
  suspiciouskinddaIdeasPrimaryArrow: {
    color: '#1A2347',
    fontSize: 18,
    fontWeight: '900',
    marginTop: -1,
  },
});

export default SuspiciouskinddaIdeasonbrd;
