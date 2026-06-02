import React from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {BackgroundScreen} from '../components/BackgroundScreen';
import {stories} from '../data/stories';
import {navigateRootScreen} from '../navigation/rootNavigation';

export function StoriesScreen() {
  const shareStory = async (title: string, summary: string) => {
    try {
      await Share.share({
        message: `${title}\n\n${summary}`,
      });
    } catch {}
  };

  return (
    <BackgroundScreen>
      <View style={styles.root}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Strange Stories</Text>
          <View style={styles.headerIconBtn}>
            <Text style={styles.headerIcon}>💡</Text>
          </View>
        </View>

        <View style={styles.cardList}>
          {stories.map(item => {
            const accent = item.accent;

            return (
              <View
                key={item.storyId}
                style={[
                  styles.storyCardWrap,
                  {
                    borderLeftColor: accent.color,
                  },
                ]}>
                <LinearGradient
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={styles.storyCardGradient}>
                  <View style={styles.storyCardContent}>
                    <View
                      style={[
                        styles.tagPill,
                        {
                          backgroundColor: accent.background,
                          borderColor: accent.border,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.tagText,
                          {
                            color: accent.color,
                          },
                        ]}>
                        {item.tag}
                      </Text>
                    </View>

                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.summary}>{item.summary}</Text>

                    <View style={styles.divider} />

                    <View style={styles.footerRow}>
                      <Pressable
                        onPress={() =>
                          navigateRootScreen('StoryDetail', {
                            storyId: item.storyId,
                          })
                        }
                        hitSlop={6}
                        style={styles.openRow}>
                        <Text
                          style={[
                            styles.openText,
                            {
                              color: accent.color,
                            },
                          ]}>
                          Full story
                        </Text>
                        <Text
                          style={[
                            styles.openArrow,
                            {
                              color: accent.color,
                            },
                          ]}>
                          ›
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() => shareStory(item.title, item.summary)}
                        style={styles.shareBtn}>
                        <Text style={styles.shareIcon}>↗</Text>
                      </Pressable>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </View>
      </View>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 23,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  headerTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 18,
  },
  cardList: {
    gap: 16,
    paddingBottom: 80,
  },
  storyCardWrap: {
    borderRadius: 20,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  storyCardGradient: {
    borderRadius: 20,
  },
  storyCardContent: {
    paddingHorizontal: 22,
    paddingVertical: 18,
    gap: 11,
  },
  tagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  tagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
    letterSpacing: -0.26,
    color: '#E8EEFF',
  },
  summary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  openRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  openText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  openArrow: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: -1,
  },
  shareBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareIcon: {
    fontSize: 18,
    color: '#E8EEFF',
    fontWeight: '700',
  },
});
