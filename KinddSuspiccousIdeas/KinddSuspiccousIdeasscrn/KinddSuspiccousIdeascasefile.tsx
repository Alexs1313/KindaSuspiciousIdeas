import React, {useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import type {KinddSuspiccousIdeasRootParamList} from '../KinddSuspiccousIdeasrout/KinddSuspiccousIdeasrootParams';
import {
  useKinddSuspiccousIdeasCases,
  type KinddSuspiccousIdeasVerdict,
} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeascasesStore';

type KinddSuspiccousCaseFileRoute = {
  key: string;
  name: 'KinddSuspiccousIdeascasefile';
  params: KinddSuspiccousIdeasRootParamList['KinddSuspiccousIdeascasefile'];
};

const KinddSuspiccousIdeascasefile = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const kinddSuspiccousRoute = useRoute<KinddSuspiccousCaseFileRoute>();
  const kinddSuspiccousCaseId = kinddSuspiccousRoute.params.kinddSuspiccousCaseId;

  const {kinddSuspiccousCases, kinddSuspiccousProgressById, kinddSuspiccousSubmitVerdict} =
    useKinddSuspiccousIdeasCases();

  const kinddSuspiccousCase = useMemo(
    () => kinddSuspiccousCases.find(c => c.kinddSuspiccousCaseId === kinddSuspiccousCaseId),
    [kinddSuspiccousCases, kinddSuspiccousCaseId],
  );

  const kinddSuspiccousProgress = kinddSuspiccousProgressById[kinddSuspiccousCaseId];

  const [kinddSuspiccousSelectedVerdict, setKinddSuspiccousSelectedVerdict] =
    useState<KinddSuspiccousIdeasVerdict | null>(
      kinddSuspiccousProgress?.kinddSuspiccousCaseYourVerdict ?? null,
    );
  const [kinddSuspiccousNote, setKinddSuspiccousNote] = useState(
    kinddSuspiccousProgress?.kinddSuspiccousCaseYourNote ?? '',
  );

  if (!kinddSuspiccousCase) {
    return null;
  }

  const kinddSuspiccousSolved = !!kinddSuspiccousProgress?.kinddSuspiccousCaseIsSolved;
  const kinddSuspiccousIsCorrect =
    kinddSuspiccousProgress?.kinddSuspiccousCaseYourVerdict ===
    kinddSuspiccousCase.kinddSuspiccousCaseVerdict;

  const kinddSuspiccousOnSubmit = () => {
    if (!kinddSuspiccousSelectedVerdict) {
      return;
    }
    kinddSuspiccousSubmitVerdict({
      kinddSuspiccousCaseId,
      kinddSuspiccousYourVerdict: kinddSuspiccousSelectedVerdict,
      kinddSuspiccousNote,
    });
    kinddSuspiccousNavigation.navigate('KinddSuspiccousIdeascaseclosed', {
      kinddSuspiccousCaseId,
    });
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
              style={styles.kinddSuspiccousBackBtn}>
              <Text style={styles.kinddSuspiccousBackIcon}>‹</Text>
            </Pressable>

            <View style={styles.kinddSuspiccousTopTitles}>
              <Text style={styles.kinddSuspiccousTopTitle}>Case File</Text>
              <Text style={styles.kinddSuspiccousTopSubtitle}>
                #{kinddSuspiccousCase.kinddSuspiccousCaseId} · {kinddSuspiccousCase.kinddSuspiccousCaseTag}
              </Text>
            </View>
          </View>

          <View style={styles.kinddSuspiccousCardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.kinddSuspiccousCardGradient}>
              <View style={styles.kinddSuspiccousCardContent}>
                <View style={styles.kinddSuspiccousHeaderPillsRow}>
                  <View style={styles.kinddSuspiccousCaseFilePill}>
                    <Text style={styles.kinddSuspiccousCaseFilePillText}>
                      CASE FILE
                    </Text>
                  </View>
                  <Text style={styles.kinddSuspiccousEstText}>EST. 4 MIN</Text>
                </View>

                <Text style={styles.kinddSuspiccousCaseTitle}>
                  {kinddSuspiccousCase.kinddSuspiccousCaseTitle}
                </Text>
                <Text style={styles.kinddSuspiccousCaseSummary}>
                  {kinddSuspiccousCase.kinddSuspiccousCaseMainQuestion}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.kinddSuspiccousSectionLabel}>SITUATION</Text>
          <View style={styles.kinddSuspiccousCardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.kinddSuspiccousCardGradient}>
              <View style={styles.kinddSuspiccousCardContent}>
                <Text style={styles.kinddSuspiccousSituationText}>
                  {kinddSuspiccousCase.kinddSuspiccousCaseSituationDescription}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.kinddSuspiccousSectionLabel}>CLUES ON THE BOARD</Text>
          <View style={styles.kinddSuspiccousCardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.kinddSuspiccousCardGradient}>
              <View style={styles.kinddSuspiccousCardContent}>
                {kinddSuspiccousCase.kinddSuspiccousCaseClues.map(
                  (kinddSuspiccousClue, kinddSuspiccousIndex) => (
                    <View key={`clue_${kinddSuspiccousIndex}`}>
                      <View style={styles.kinddSuspiccousClueRow}>
                        <View style={styles.kinddSuspiccousClueNumberPill}>
                          <Text style={styles.kinddSuspiccousClueNumberText}>
                            {kinddSuspiccousIndex + 1}
                          </Text>
                        </View>
                        <Text style={styles.kinddSuspiccousClueText}>
                          {kinddSuspiccousClue}
                        </Text>
                      </View>
                      {kinddSuspiccousIndex <
                      kinddSuspiccousCase.kinddSuspiccousCaseClues.length - 1 ? (
                        <View style={styles.kinddSuspiccousDivider} />
                      ) : null}
                    </View>
                  ),
                )}
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.kinddSuspiccousSectionLabel}>
            STATEMENTS & POSITIONS
          </Text>
          {kinddSuspiccousCase.kinddSuspiccousCaseStatements.map(
            (kinddSuspiccousStmt, kinddSuspiccousIndex) => (
              <View key={`stmt_${kinddSuspiccousIndex}`} style={styles.kinddSuspiccousStatementCard}>
                <Text style={styles.kinddSuspiccousStatementSpeaker}>
                  {kinddSuspiccousStmt.kinddSuspiccousSpeaker}
                </Text>
                <Text style={styles.kinddSuspiccousStatementText}>
                  “{kinddSuspiccousStmt.kinddSuspiccousText}”
                </Text>
              </View>
            ),
          )}

          <Text style={styles.kinddSuspiccousSectionLabel}>YOUR TAKE (OPTIONAL)</Text>
          <View style={styles.kinddSuspiccousNoteBox}>
            <TextInput
              value={kinddSuspiccousNote}
              onChangeText={setKinddSuspiccousNote}
              placeholder="What’s your gut saying? Jot a quick note before you call it ..."
              placeholderTextColor="#7D88AD"
              multiline
              style={styles.kinddSuspiccousNoteInput}
            />
          </View>

          <Text style={styles.kinddSuspiccousSectionLabel}>YOUR VERDICT</Text>
          <View style={styles.kinddSuspiccousVerdictRow}>
            <Pressable
              onPress={() => setKinddSuspiccousSelectedVerdict('suspicious')}
              style={[
                styles.kinddSuspiccousVerdictBtn,
                kinddSuspiccousSelectedVerdict === 'suspicious' &&
                  styles.kinddSuspiccousVerdictBtnSuspiciousActive,
              ]}>
              <Text
                style={[
                  styles.kinddSuspiccousVerdictText,
                  kinddSuspiccousSelectedVerdict === 'suspicious' &&
                    styles.kinddSuspiccousVerdictTextSuspiciousActive,
                ]}>
                SUSPICIOUS
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setKinddSuspiccousSelectedVerdict('not_suspicious')}
              style={[
                styles.kinddSuspiccousVerdictBtn,
                kinddSuspiccousSelectedVerdict === 'not_suspicious' &&
                  styles.kinddSuspiccousVerdictBtnNotSuspiciousActive,
              ]}>
              <Text
                style={[
                  styles.kinddSuspiccousVerdictText,
                  kinddSuspiccousSelectedVerdict === 'not_suspicious' &&
                    styles.kinddSuspiccousVerdictTextNotSuspiciousActive,
                ]}>
                NOT SUSPICIOUS
              </Text>
            </Pressable>
          </View>

          {kinddSuspiccousSolved ? (
            <View
              style={[
                styles.kinddSuspiccousRealOutcomeCard,
                kinddSuspiccousIsCorrect
                  ? styles.kinddSuspiccousRealOutcomeCardCorrect
                  : styles.kinddSuspiccousRealOutcomeCardWrong,
              ]}>
              <Text style={styles.kinddSuspiccousRealOutcomeLabel}>
                REAL OUTCOME
              </Text>
              <Text style={styles.kinddSuspiccousRealOutcomeText}>
                {kinddSuspiccousCase.kinddSuspiccousCaseRealOutcome}
              </Text>
              <View style={styles.kinddSuspiccousStampWrap}>
                <View
                  style={[
                    styles.kinddSuspiccousStamp,
                    kinddSuspiccousIsCorrect
                      ? styles.kinddSuspiccousStampCorrect
                      : styles.kinddSuspiccousStampWrong,
                  ]}>
                  <Text
                    style={[
                      styles.kinddSuspiccousStampText,
                      kinddSuspiccousIsCorrect
                        ? styles.kinddSuspiccousStampTextCorrect
                        : styles.kinddSuspiccousStampTextWrong,
                    ]}>
                    {kinddSuspiccousIsCorrect ? 'CORRECT' : 'WRONG'}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <View style={{height: 110}} />
        </ScrollView>

        <Pressable
          onPress={kinddSuspiccousOnSubmit}
          disabled={!kinddSuspiccousSelectedVerdict}
          style={[
            styles.kinddSuspiccousSubmitWrap,
            !kinddSuspiccousSelectedVerdict && styles.kinddSuspiccousSubmitWrapDisabled,
          ]}>
          <LinearGradient
            colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.kinddSuspiccousSubmitGradient}>
            <View style={styles.kinddSuspiccousSubmitHighlight} />
            <Text style={styles.kinddSuspiccousSubmitText}>Submit Verdict</Text>
            <Text style={styles.kinddSuspiccousSubmitArrow}>›</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </KinddSuspiccousIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousRoot: {flex: 1},
  kinddSuspiccousScrollContent: {
    paddingTop: 59,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  kinddSuspiccousTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 18,
    paddingHorizontal: 4,
  },
  kinddSuspiccousBackBtn: {
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
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },
  kinddSuspiccousTopTitles: {gap: 2},
  kinddSuspiccousTopTitle: {
    color: '#E8EEFF',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  kinddSuspiccousTopSubtitle: {
    color: '#7D88AD',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
  },

  kinddSuspiccousCardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
    marginBottom: 14,
  },
  kinddSuspiccousCardGradient: {borderRadius: 20},
  kinddSuspiccousCardContent: {padding: 19},

  kinddSuspiccousHeaderPillsRow: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  kinddSuspiccousCaseFilePill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(247,201,72,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(247,201,72,0.4)',
  },
  kinddSuspiccousCaseFilePillText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#F7C948',
  },
  kinddSuspiccousEstText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 11,
    color: '#7D88AD',
    letterSpacing: 0.2,
  },
  kinddSuspiccousCaseTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 26,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 6,
  },
  kinddSuspiccousCaseSummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },

  kinddSuspiccousSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  kinddSuspiccousSituationText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },

  kinddSuspiccousClueRow: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  kinddSuspiccousClueNumberPill: {
    width: 29,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousClueNumberText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    color: '#2EB3FF',
  },
  kinddSuspiccousClueText: {
    flex: 1,
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#FFFFFF',
  },
  kinddSuspiccousDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  kinddSuspiccousStatementCard: {
    backgroundColor: '#0B1630',
    borderLeftWidth: 3,
    borderLeftColor: '#F7C948',
    borderRadius: 12,
    paddingLeft: 15,
    paddingRight: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  kinddSuspiccousStatementSpeaker: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 2,
  },
  kinddSuspiccousStatementText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    lineHeight: 18.2,
    color: '#FFFFFF',
  },

  kinddSuspiccousNoteBox: {
    backgroundColor: '#111D3C',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  kinddSuspiccousNoteInput: {
    minHeight: 74,
    color: '#7D88AD',
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Manrope-Medium',
  },

  kinddSuspiccousVerdictRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  kinddSuspiccousVerdictBtn: {
    flex: 1,
    height: 79,
    borderRadius: 12,
    backgroundColor: '#111D3C',
    borderWidth: 2,
    borderColor: '#111D3C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  kinddSuspiccousVerdictBtnSuspiciousActive: {
    backgroundColor: 'rgba(255,90,110,0.1)',
    borderColor: '#FF5A6E',
  },
  kinddSuspiccousVerdictBtnNotSuspiciousActive: {
    backgroundColor: 'rgba(74,222,128,0.1)',
    borderColor: '#4ADE80',
  },
  kinddSuspiccousVerdictText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  kinddSuspiccousVerdictTextSuspiciousActive: {color: '#FF5A6E'},
  kinddSuspiccousVerdictTextNotSuspiciousActive: {color: '#4ADE80'},

  kinddSuspiccousRealOutcomeCard: {
    marginTop: 4,
    borderRadius: 20,
    padding: 19,
    borderWidth: 1,
  },
  kinddSuspiccousRealOutcomeCardCorrect: {
    backgroundColor: 'rgba(74,222,128,0.1)',
    borderColor: '#4ADE80',
  },
  kinddSuspiccousRealOutcomeCardWrong: {
    backgroundColor: 'rgba(255,90,110,0.1)',
    borderColor: '#FF5A6E',
  },
  kinddSuspiccousRealOutcomeLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
  },
  kinddSuspiccousRealOutcomeText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
  kinddSuspiccousStampWrap: {marginTop: 14, alignSelf: 'flex-start'},
  kinddSuspiccousStamp: {
    borderWidth: 5,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    transform: [{rotate: '-6deg'}],
  },
  kinddSuspiccousStampCorrect: {borderColor: '#4ADE80'},
  kinddSuspiccousStampWrong: {borderColor: '#FF5A6E'},
  kinddSuspiccousStampText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
    letterSpacing: 2.2,
  },
  kinddSuspiccousStampTextCorrect: {color: '#4ADE80'},
  kinddSuspiccousStampTextWrong: {color: '#FF5A6E'},

  kinddSuspiccousSubmitWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 51,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#2EB3FF',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 6},
  },
  kinddSuspiccousSubmitWrapDisabled: {opacity: 0.55},
  kinddSuspiccousSubmitGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 16,
  },
  kinddSuspiccousSubmitHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  kinddSuspiccousSubmitText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
  kinddSuspiccousSubmitArrow: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A2347',
    marginTop: -1,
  },
});

export default KinddSuspiccousIdeascasefile;

