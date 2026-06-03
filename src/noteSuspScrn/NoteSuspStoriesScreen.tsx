import React from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {noteSuspStories} from '../noteSuspData/NoteSuspStories';
import {noteSuspNavigateRootScreen} from '../noteSuspNav/NoteSuspRootNavigation';

export function NoteSuspStoriesScreen() {
  const shareStory = async (title: string, summary: string) => {
    try {
      await Share.share({
        message: `${title}\n\n${summary}`,
      });
    } catch {}
  };

  return (
    <NoteSuspBackgroundLayout>
      <View style={styles.noteSuspRoot}>
        <View style={styles.noteSuspHeaderRow}>
          <Text style={styles.noteSuspHeaderTitle}>Strange Stories</Text>
          <View style={styles.noteSuspHeaderIconBtn}>
            <Text style={styles.noteSuspHeaderIcon}>💡</Text>
          </View>
        </View>

        <View style={styles.noteSuspCardList}>
          {noteSuspStories.map(item => {
            const accent = item.accent;

            return (
              <View
                key={item.storyId}
                style={[
                  styles.noteSuspStoryCardWrap,
                  {
                    borderLeftColor: accent.color,
                  },
                ]}>
                <LinearGradient
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={styles.noteSuspStoryCardGradient}>
                  <View style={styles.noteSuspStoryCardContent}>
                    <View
                      style={[
                        styles.noteSuspTagPill,
                        {
                          backgroundColor: accent.background,
                          borderColor: accent.border,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.noteSuspTagText,
                          {
                            color: accent.color,
                          },
                        ]}>
                        {item.tag}
                      </Text>
                    </View>

                    <Text style={styles.noteSuspTitle}>{item.title}</Text>
                    <Text style={styles.noteSuspSummary}>{item.summary}</Text>

                    <View style={styles.noteSuspDivider} />

                    <View style={styles.noteSuspFooterRow}>
                      <Pressable
                        onPress={() =>
                          noteSuspNavigateRootScreen('StoryDetail', {
                            storyId: item.storyId,
                          })
                        }
                        hitSlop={6}
                        style={styles.noteSuspOpenRow}>
                        <Text
                          style={[
                            styles.noteSuspOpenText,
                            {
                              color: accent.color,
                            },
                          ]}>
                          Full story
                        </Text>
                        <Text
                          style={[
                            styles.noteSuspOpenArrow,
                            {
                              color: accent.color,
                            },
                          ]}>
                          ›
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() => shareStory(item.title, item.summary)}
                        style={styles.noteSuspShareBtn}>
                        <Text style={styles.noteSuspShareIcon}>↗</Text>
                      </Pressable>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </View>
      </View>
    </NoteSuspBackgroundLayout>
  );
}

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 23,
  },
  noteSuspHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  noteSuspHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },
  noteSuspHeaderIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspHeaderIcon: {
    fontSize: 18,
  },
  noteSuspCardList: {
    gap: 16,
    paddingBottom: 80,
  },
  noteSuspStoryCardWrap: {
    borderRadius: 20,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  noteSuspStoryCardGradient: {
    borderRadius: 20,
  },
  noteSuspStoryCardContent: {
    paddingHorizontal: 22,
    paddingVertical: 18,
    gap: 11,
  },
  noteSuspTagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  noteSuspTagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  noteSuspTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
    letterSpacing: -0.26,
    color: '#E8EEFF',
  },
  noteSuspSummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },
  noteSuspDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  noteSuspFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noteSuspOpenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  noteSuspOpenText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  noteSuspOpenArrow: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: -1,
  },
  noteSuspShareBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspShareIcon: {
    fontSize: 18,
    color: '#E8EEFF',
    fontWeight: '700',
  },
});
