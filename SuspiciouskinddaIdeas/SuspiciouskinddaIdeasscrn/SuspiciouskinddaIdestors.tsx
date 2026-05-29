import React from 'react';
import {Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import {suspiciouskinddaIdeasStories} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeasstoriesData';

const SuspiciouskinddaIdestors = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();

  const suspiciouskinddaShareStory = async (
    suspiciouskinddaTitle: string,
    suspiciouskinddaSummary: string,
  ) => {
    try {
      await Share.share({
        message: `${suspiciouskinddaTitle}\n\n${suspiciouskinddaSummary}`,
      });
    } catch {}
  };

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <View style={styles.suspiciouskinddaHeaderRow}>
          <Text style={styles.suspiciouskinddaHeaderTitle}>Strange Stories</Text>
          <View style={styles.suspiciouskinddaHeaderIconBtn}>
            <Text style={styles.suspiciouskinddaHeaderIcon}>💡</Text>
          </View>
        </View>

        <View style={styles.suspiciouskinddaCardList}>
          {suspiciouskinddaIdeasStories.map(suspiciouskinddaItem => {
            const suspiciouskinddaAccent =
              suspiciouskinddaItem.suspiciouskinddaStoryAccent;

            return (
              <View
                key={suspiciouskinddaItem.suspiciouskinddaStoryId}
                style={[
                  styles.suspiciouskinddaStoryCardWrap,
                  {
                    borderLeftColor:
                      suspiciouskinddaAccent.suspiciouskinddaAccentColor,
                  },
                ]}>
                <LinearGradient
                  colors={['#1A2347', '#0F1730'] as unknown as string[]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={styles.suspiciouskinddaStoryCardGradient}>
                  <View style={styles.suspiciouskinddaStoryCardContent}>
                    <View
                      style={[
                        styles.suspiciouskinddaTagPill,
                        {
                          backgroundColor:
                            suspiciouskinddaAccent.suspiciouskinddaAccentBg,
                          borderColor:
                            suspiciouskinddaAccent.suspiciouskinddaAccentBorder,
                        },
                      ]}>
                      <Text
                        style={[
                          styles.suspiciouskinddaTagText,
                          {
                            color:
                              suspiciouskinddaAccent.suspiciouskinddaAccentColor,
                          },
                        ]}>
                        {suspiciouskinddaItem.suspiciouskinddaStoryTag}
                      </Text>
                    </View>

                    <Text style={styles.suspiciouskinddaStoryTitle}>
                      {suspiciouskinddaItem.suspiciouskinddaStoryTitle}
                    </Text>
                    <Text style={styles.suspiciouskinddaStorySummary}>
                      {suspiciouskinddaItem.suspiciouskinddaStorySummary}
                    </Text>

                    <View style={styles.suspiciouskinddaDivider} />

                    <View style={styles.suspiciouskinddaFooterRow}>
                      <Pressable
                        onPress={() =>
                          suspiciouskinddaNavigation.navigate(
                            'SuspiciouskinddaIdeasstorydetail',
                            {
                              suspiciouskinddaStoryId:
                                suspiciouskinddaItem.suspiciouskinddaStoryId,
                            },
                          )
                        }
                        hitSlop={6}
                        style={styles.suspiciouskinddaOpenRow}>
                        <Text
                          style={[
                            styles.suspiciouskinddaOpenText,
                            {
                              color:
                                suspiciouskinddaAccent.suspiciouskinddaAccentColor,
                            },
                          ]}>
                          Full story
                        </Text>
                        <Text
                          style={[
                            styles.suspiciouskinddaOpenArrow,
                            {
                              color:
                                suspiciouskinddaAccent.suspiciouskinddaAccentColor,
                            },
                          ]}>
                          ›
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() =>
                          suspiciouskinddaShareStory(
                            suspiciouskinddaItem.suspiciouskinddaStoryTitle,
                            suspiciouskinddaItem.suspiciouskinddaStorySummary,
                          )
                        }
                        style={styles.suspiciouskinddaShareBtn}>
                        <Text style={styles.suspiciouskinddaShareIcon}>↗</Text>
                      </Pressable>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            );
          })}
        </View>
      </View>
    </SuspiciouskinddaIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaRoot: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 23,
  },
  suspiciouskinddaHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingBottom: 12,
  },
  suspiciouskinddaHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },
  suspiciouskinddaHeaderIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaHeaderIcon: {
    fontSize: 18,
  },
  suspiciouskinddaCardList: {
    gap: 16,
    paddingBottom: 80,
  },
  suspiciouskinddaStoryCardWrap: {
    borderRadius: 20,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  suspiciouskinddaStoryCardGradient: {
    borderRadius: 20,
  },
  suspiciouskinddaStoryCardContent: {
    paddingHorizontal: 22,
    paddingVertical: 18,
    gap: 11,
  },
  suspiciouskinddaTagPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: 1,
  },
  suspiciouskinddaTagText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  suspiciouskinddaStoryTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
    letterSpacing: -0.26,
    color: '#E8EEFF',
  },
  suspiciouskinddaStorySummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },
  suspiciouskinddaDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  suspiciouskinddaFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  suspiciouskinddaOpenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  suspiciouskinddaOpenText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
  },
  suspiciouskinddaOpenArrow: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: -1,
  },
  suspiciouskinddaShareBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaShareIcon: {
    fontSize: 18,
    color: '#E8EEFF',
    fontWeight: '700',
  },
});

export default SuspiciouskinddaIdestors;
