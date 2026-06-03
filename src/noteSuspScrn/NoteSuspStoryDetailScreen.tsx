import React, {useMemo} from 'react';
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {noteSuspStories} from '../noteSuspData/NoteSuspStories';
import type {NoteSuspRootStackParamList} from '../noteSuspNav/NoteSuspTypes';

type StoryDetailRoute = {
  key: string;
  name: 'StoryDetail';
  params: NoteSuspRootStackParamList['StoryDetail'];
};

export function NoteSuspStoryDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<StoryDetailRoute>();
  const storyId = route.params.storyId;

  const story = useMemo(
    () => noteSuspStories.find(item => item.storyId === storyId),
    [storyId],
  );

  if (!story) {
    return null;
  }

  const accent = story.accent;

  const shareStory = async () => {
    try {
      await Share.share({
        message: `${story.title}\n\n${story.body}`,
      });
    } catch {}
  };

  return (
    <NoteSuspBackgroundLayout scroll={false}>
      <View style={styles.noteSuspRoot}>
        <ScrollView
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.noteSuspScrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.noteSuspTopBar}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.noteSuspIconBtn}>
              <Text style={styles.noteSuspBackIcon}>‹</Text>
            </Pressable>

            <Text style={styles.noteSuspTopTitle}>Strange Story</Text>

            <Pressable onPress={shareStory} style={styles.noteSuspIconBtn}>
              <Text style={styles.noteSuspShareIcon}>↗</Text>
            </Pressable>
          </View>

          <View
            style={[
              styles.noteSuspTagPill,
              {
                backgroundColor: accent.background,
                borderColor: accent.border,
              },
            ]}>
            <Text style={[styles.noteSuspTagText, {color: accent.color}]}>
              {story.tag}
            </Text>
          </View>

          <Text style={styles.noteSuspTitle}>{story.title}</Text>

          <Text style={styles.noteSuspBody}>{story.body}</Text>
        </ScrollView>
      </View>
    </NoteSuspBackgroundLayout>
  );
}

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
  },
  noteSuspScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  noteSuspTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  noteSuspIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspBackIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
    fontWeight: '300',
  },
  noteSuspShareIcon: {
    fontSize: 18,
    color: '#E8EEFF',
    fontWeight: '700',
  },
  noteSuspTopTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
  },
  noteSuspTagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 16,
  },
  noteSuspTagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  noteSuspTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 26,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 20,
  },
  noteSuspBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
});
