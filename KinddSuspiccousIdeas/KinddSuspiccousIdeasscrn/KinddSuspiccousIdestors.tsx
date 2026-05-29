import React from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import {kinddSuspiccousIdeasStories} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeasstoriesData';

const KinddSuspiccousIdestors = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();

  const kinddSuspiccousShareStory = async (
    kinddSuspiccousTitle: string,
    kinddSuspiccousSummary: string,
  ) => {
    try {
      await Share.share({
        message: `${kinddSuspiccousTitle}\n\n${kinddSuspiccousSummary}`,
      });
    } catch {}
  };

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <View style={styles.kinddSuspiccousHeaderRow}>
          <Text style={styles.kinddSuspiccousHeaderTitle}>Strange Stories</Text>
          <View style={styles.kinddSuspiccousHeaderIconBtn}>
            <Text style={styles.kinddSuspiccousHeaderIcon}>💡</Text>
          </View>
        </View>

        <View style={styles.kinddSuspiccousCardList}>
          {kinddSuspiccousIdeasStories.map(kinddSuspiccousItem => {
            const kinddSuspiccousAccent =
              kinddSuspiccousItem.kinddSuspiccousStoryAccent;

            return (
              <View
                key={kinddSuspiccousItem.kinddSuspiccousStoryId}
                style={[
                  styles.kinddSuspiccousStoryCardWrap,
                  {
                    borderLeftColor:
                      kinddSuspiccousAccent.kinddSuspiccousAccentColor,
                  },
                ]}>
                <LinearGradient
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={styles.kinddSuspiccousStoryCardGradient}>
                  <View style={styles.kinddSuspiccousStoryCardContent}>
                    <View
                      style={[
                        styles.kinddSuspiccousTagPill,
                        {
                          backgroundColor:
                            kinddSuspiccousAccent.kinddSuspiccousAccentBg,
                          borderColor:
                            kinddSuspiccousAccent.kinddSuspiccousAccentBorder,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.kinddSuspiccousTagText,
                          {
                            color:
                              kinddSuspiccousAccent.kinddSuspiccousAccentColor,
                          },
                        ]}>
                        {kinddSuspiccousItem.kinddSuspiccousStoryTag}
                      </Text>
                    </View>

                    <Text style={styles.kinddSuspiccousStoryTitle}>
                      {kinddSuspiccousItem.kinddSuspiccousStoryTitle}
                    </Text>
                    <Text style={styles.kinddSuspiccousStorySummary}>
                      {kinddSuspiccousItem.kinddSuspiccousStorySummary}
                    </Text>

                    <View style={styles.kinddSuspiccousDivider} />

                    <View style={styles.kinddSuspiccousFooterRow}>
                      <Pressable
                        onPress={() =>
                          kinddSuspiccousNavigation.navigate(
                            'KinddSuspiccousIdeasstorydetail',
                            {
                              kinddSuspiccousStoryId:
                                kinddSuspiccousItem.kinddSuspiccousStoryId,
                            },
                          )
                        }
                        hitSlop={6}
                        style={styles.kinddSuspiccousOpenRow}>
                        <Text
                          style={[
                            styles.kinddSuspiccousOpenText,
                            {
                              color:
                                kinddSuspiccousAccent.kinddSuspiccousAccentColor,
                            },
                          ]}>
                          Full story
                        </Text>
                        <Text
                          style={[
                            styles.kinddSuspiccousOpenArrow,
                            {
                              color:
                                kinddSuspiccousAccent.kinddSuspiccousAccentColor,
                            },
                          ]}>
                          ›
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() =>
                          kinddSuspiccousShareStory(
                            kinddSuspiccousItem.kinddSuspiccousStoryTitle,
                            kinddSuspiccousItem.kinddSuspiccousStorySummary,
                          )
                        }
                        style={styles.kinddSuspiccousShareBtn}>
                        <Text style={styles.kinddSuspiccousShareIcon}>↗</Text>
                      </Pressable>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </View>
      </View>
    </KinddSuspiccousIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousRoot: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 23,
  },
  kinddSuspiccousHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  kinddSuspiccousHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },
  kinddSuspiccousHeaderIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousHeaderIcon: {
    fontSize: 18,
  },
  kinddSuspiccousCardList: {
    gap: 16,
    paddingBottom: 80,
  },
  kinddSuspiccousStoryCardWrap: {
    borderRadius: 20,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  kinddSuspiccousStoryCardGradient: {
    borderRadius: 20,
  },
  kinddSuspiccousStoryCardContent: {
    paddingHorizontal: 22,
    paddingVertical: 18,
    gap: 11,
  },
  kinddSuspiccousTagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  kinddSuspiccousTagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  kinddSuspiccousStoryTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
    letterSpacing: -0.26,
    color: '#E8EEFF',
  },
  kinddSuspiccousStorySummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },
  kinddSuspiccousDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  kinddSuspiccousFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kinddSuspiccousOpenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  kinddSuspiccousOpenText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  kinddSuspiccousOpenArrow: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: -1,
  },
  kinddSuspiccousShareBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousShareIcon: {
    fontSize: 18,
    color: '#E8EEFF',
    fontWeight: '700',
  },
});

export default KinddSuspiccousIdestors;
