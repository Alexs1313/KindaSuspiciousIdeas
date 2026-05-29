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

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import {suspiciouskinddaIdeasStories} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeasstoriesData';
import type {SuspiciouskinddaIdeasRootParamList} from '../SuspiciouskinddaIdeasrout/SuspiciouskinddaIdeasrootParams';

type SuspiciouskinddaStoryDetailRoute = {
  key: string;
  name: 'SuspiciouskinddaIdeasstorydetail';
  params: SuspiciouskinddaIdeasRootParamList['SuspiciouskinddaIdeasstorydetail'];
};

const SuspiciouskinddaIdeasstorydetail = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const suspiciouskinddaRoute = useRoute<SuspiciouskinddaStoryDetailRoute>();
  const suspiciouskinddaStoryId =
    suspiciouskinddaRoute.params.suspiciouskinddaStoryId;

  const suspiciouskinddaStory = useMemo(
    () =>
      suspiciouskinddaIdeasStories.find(
        suspiciouskinddaItem =>
          suspiciouskinddaItem.suspiciouskinddaStoryId === suspiciouskinddaStoryId,
      ),
    [suspiciouskinddaStoryId],
  );

  if (!suspiciouskinddaStory) {
    return null;
  }

  const suspiciouskinddaAccent = suspiciouskinddaStory.suspiciouskinddaStoryAccent;

  const suspiciouskinddaShareStory = async () => {
    try {
      await Share.share({
        message: `${suspiciouskinddaStory.suspiciouskinddaStoryTitle}\n\n${suspiciouskinddaStory.suspiciouskinddaStoryBody}`,
      });
    } catch {
      // user dismissed share sheet
    }
  };

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <ScrollView
          contentContainerStyle={styles.suspiciouskinddaScrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.suspiciouskinddaTopBar}>
            <Pressable
              onPress={() => suspiciouskinddaNavigation.goBack()}
              style={styles.suspiciouskinddaIconBtn}>
              <Text style={styles.suspiciouskinddaBackIcon}>‹</Text>
            </Pressable>

            <Text style={styles.suspiciouskinddaTopTitle}>Strange Story</Text>

            <Pressable
              onPress={suspiciouskinddaShareStory}
              style={styles.suspiciouskinddaIconBtn}>
              <Text style={styles.suspiciouskinddaShareIcon}>↗</Text>
            </Pressable>
          </View>

          <View
            style={[
              styles.suspiciouskinddaTagPill,
              {
                backgroundColor: suspiciouskinddaAccent.suspiciouskinddaAccentBg,
                borderColor: suspiciouskinddaAccent.suspiciouskinddaAccentBorder,
              },
            ]}>
            <Text
              style={[
                styles.suspiciouskinddaTagText,
                {color: suspiciouskinddaAccent.suspiciouskinddaAccentColor},
              ]}>
              {suspiciouskinddaStory.suspiciouskinddaStoryTag}
            </Text>
          </View>

          <Text style={styles.suspiciouskinddaStoryTitle}>
            {suspiciouskinddaStory.suspiciouskinddaStoryTitle}
          </Text>

          <Text style={styles.suspiciouskinddaStoryBody}>
            {suspiciouskinddaStory.suspiciouskinddaStoryBody}
          </Text>
        </ScrollView>
      </View>
    </SuspiciouskinddaIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaRoot: {
    flex: 1,
    paddingTop: 64,
  },
  suspiciouskinddaScrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  suspiciouskinddaTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  suspiciouskinddaIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaBackIcon: {
    fontSize: 28,
    lineHeight: 28,
    color: '#E8EEFF',
    marginTop: -2,
    fontWeight: '300',
  },
  suspiciouskinddaShareIcon: {
    fontSize: 18,
    color: '#E8EEFF',
    fontWeight: '700',
  },
  suspiciouskinddaTopTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#E8EEFF',
  },
  suspiciouskinddaTagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 16,
  },
  suspiciouskinddaTagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  suspiciouskinddaStoryTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 26,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 20,
  },
  suspiciouskinddaStoryBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
});

export default SuspiciouskinddaIdeasstorydetail;
