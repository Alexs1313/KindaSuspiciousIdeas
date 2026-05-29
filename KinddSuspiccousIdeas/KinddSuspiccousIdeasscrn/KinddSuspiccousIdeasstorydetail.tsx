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

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import {kinddSuspiccousIdeasStories} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeasstoriesData';
import type {KinddSuspiccousIdeasRootParamList} from '../KinddSuspiccousIdeasrout/KinddSuspiccousIdeasrootParams';

type KinddSuspiccousStoryDetailRoute = {
  key: string;
  name: 'KinddSuspiccousIdeasstorydetail';
  params: KinddSuspiccousIdeasRootParamList['KinddSuspiccousIdeasstorydetail'];
};

const KinddSuspiccousIdeasstorydetail = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const kinddSuspiccousRoute = useRoute<KinddSuspiccousStoryDetailRoute>();
  const kinddSuspiccousStoryId =
    kinddSuspiccousRoute.params.kinddSuspiccousStoryId;

  const kinddSuspiccousStory = useMemo(
    () =>
      kinddSuspiccousIdeasStories.find(
        kinddSuspiccousItem =>
          kinddSuspiccousItem.kinddSuspiccousStoryId === kinddSuspiccousStoryId,
      ),
    [kinddSuspiccousStoryId],
  );

  if (!kinddSuspiccousStory) {
    return null;
  }

  const kinddSuspiccousAccent = kinddSuspiccousStory.kinddSuspiccousStoryAccent;

  const kinddSuspiccousShareStory = async () => {
    try {
      await Share.share({
        message: `${kinddSuspiccousStory.kinddSuspiccousStoryTitle}\n\n${kinddSuspiccousStory.kinddSuspiccousStoryBody}`,
      });
    } catch {
      // user dismissed share sheet
    }
  };

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <ScrollView
          contentContainerStyle={styles.kinddSuspiccousScrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.kinddSuspiccousTopBar}>
            <Pressable
              onPress={() => kinddSuspiccousNavigation.goBack()}
              style={styles.kinddSuspiccousIconBtn}>
              <Text style={styles.kinddSuspiccousBackIcon}>‹</Text>
            </Pressable>

            <Text style={styles.kinddSuspiccousTopTitle}>Strange Story</Text>

            <Pressable
              onPress={kinddSuspiccousShareStory}
              style={styles.kinddSuspiccousIconBtn}>
              <Text style={styles.kinddSuspiccousShareIcon}>↗</Text>
            </Pressable>
          </View>

          <View
            style={[
              styles.kinddSuspiccousTagPill,
              {
                backgroundColor: kinddSuspiccousAccent.kinddSuspiccousAccentBg,
                borderColor: kinddSuspiccousAccent.kinddSuspiccousAccentBorder,
              },
            ]}>
            <Text
              style={[
                styles.kinddSuspiccousTagText,
                {color: kinddSuspiccousAccent.kinddSuspiccousAccentColor},
              ]}>
              {kinddSuspiccousStory.kinddSuspiccousStoryTag}
            </Text>
          </View>

          <Text style={styles.kinddSuspiccousStoryTitle}>
            {kinddSuspiccousStory.kinddSuspiccousStoryTitle}
          </Text>

          <Text style={styles.kinddSuspiccousStoryBody}>
            {kinddSuspiccousStory.kinddSuspiccousStoryBody}
          </Text>
        </ScrollView>
      </View>
    </KinddSuspiccousIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousRoot: {
    flex: 1,
    paddingTop: 64,
  },
  kinddSuspiccousScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  kinddSuspiccousTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  kinddSuspiccousIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousBackIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
    fontWeight: '300',
  },
  kinddSuspiccousShareIcon: {
    fontSize: 18,
    color: '#E8EEFF',
    fontWeight: '700',
  },
  kinddSuspiccousTopTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
  },
  kinddSuspiccousTagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 16,
  },
  kinddSuspiccousTagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  kinddSuspiccousStoryTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 26,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 20,
  },
  kinddSuspiccousStoryBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
});

export default KinddSuspiccousIdeasstorydetail;
