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

import {BackgroundScreen} from '../components/BackgroundScreen';
import {stories} from '../data/stories';
import type {RootStackParamList} from '../navigation/types';

type StoryDetailRoute = {
  key: string;
  name: 'StoryDetail';
  params: RootStackParamList['StoryDetail'];
};

export function StoryDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<StoryDetailRoute>();
  const storyId =
    route.params.storyId;

  const story = useMemo(
    () =>
      stories.find(
        item =>
          item.storyId === storyId,
      ),
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
    } catch {
      // user dismissed share sheet
    }
  };

  return (
    <BackgroundScreen scroll={false}>
      <View style={styles.root}>
        <ScrollView
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.iconBtn}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <Text style={styles.topTitle}>Strange Story</Text>

            <Pressable
              onPress={shareStory}
              style={styles.iconBtn}>
              <Text style={styles.shareIcon}>↗</Text>
            </Pressable>
          </View>

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
                {color: accent.color},
              ]}>
              {story.tag}
            </Text>
          </View>

          <Text style={styles.title}>
            {story.title}
          </Text>

          <Text style={styles.body}>
            {story.body}
          </Text>
        </ScrollView>
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
    fontWeight: '300',
  },
  shareIcon: {
    fontSize: 18,
    color: '#E8EEFF',
    fontWeight: '700',
  },
  topTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
  },
  tagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 16,
  },
  tagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 26,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 20,
  },
  body: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
});

