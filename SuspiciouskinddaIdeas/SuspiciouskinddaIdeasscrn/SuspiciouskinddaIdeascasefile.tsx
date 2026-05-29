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

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import type {SuspiciouskinddaIdeasRootParamList} from '../SuspiciouskinddaIdeasrout/SuspiciouskinddaIdeasrootParams';
import {
  useSuspiciouskinddaIdeasCases,
  type SuspiciouskinddaIdeasVerdict,
} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeascasesStore';

type SuspiciouskinddaCaseFileRoute = {
  key: string;
  name: 'SuspiciouskinddaIdeascasefile';
  params: SuspiciouskinddaIdeasRootParamList['SuspiciouskinddaIdeascasefile'];
};

const SuspiciouskinddaIdeascasefile = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const suspiciouskinddaRoute = useRoute<SuspiciouskinddaCaseFileRoute>();
  const suspiciouskinddaCaseId = suspiciouskinddaRoute.params.suspiciouskinddaCaseId;

  const {suspiciouskinddaCases, suspiciouskinddaProgressById, suspiciouskinddaSubmitVerdict} =
    useSuspiciouskinddaIdeasCases();

  const suspiciouskinddaCase = useMemo(
    () => suspiciouskinddaCases.find(c => c.suspiciouskinddaCaseId === suspiciouskinddaCaseId),
    [suspiciouskinddaCases, suspiciouskinddaCaseId],
  );

  const suspiciouskinddaProgress = suspiciouskinddaProgressById[suspiciouskinddaCaseId];

  const [suspiciouskinddaSelectedVerdict, setSuspiciouskinddaSelectedVerdict] =
    useState<SuspiciouskinddaIdeasVerdict | null>(
      suspiciouskinddaProgress?.suspiciouskinddaCaseYourVerdict ?? null,
    );
  const [suspiciouskinddaNote, setSuspiciouskinddaNote] = useState(
    suspiciouskinddaProgress?.suspiciouskinddaCaseYourNote ?? '',
  );

  if (!suspiciouskinddaCase) {
    return null;
  }

  const suspiciouskinddaSolved = !!suspiciouskinddaProgress?.suspiciouskinddaCaseIsSolved;
  const suspiciouskinddaIsCorrect =
    suspiciouskinddaProgress?.suspiciouskinddaCaseYourVerdict ===
    suspiciouskinddaCase.suspiciouskinddaCaseVerdict;

  const suspiciouskinddaOnSubmit = () => {
    if (!suspiciouskinddaSelectedVerdict) {
      return;
    }
    suspiciouskinddaSubmitVerdict({
      suspiciouskinddaCaseId,
      suspiciouskinddaYourVerdict: suspiciouskinddaSelectedVerdict,
      suspiciouskinddaNote,
    });
    suspiciouskinddaNavigation.navigate('SuspiciouskinddaIdeascaseclosed', {
      suspiciouskinddaCaseId,
    });
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
              style={styles.suspiciouskinddaBackBtn}>
              <Text style={styles.suspiciouskinddaBackIcon}>‹</Text>
            </Pressable>

            <View style={styles.suspiciouskinddaTopTitles}>
              <Text style={styles.suspiciouskinddaTopTitle}>Case File</Text>
              <Text style={styles.suspiciouskinddaTopSubtitle}>
                #{suspiciouskinddaCase.suspiciouskinddaCaseId} · {suspiciouskinddaCase.suspiciouskinddaCaseTag}
              </Text>
            </View>
          </View>

          <View style={styles.suspiciouskinddaCardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.suspiciouskinddaCardGradient}>
              <View style={styles.suspiciouskinddaCardContent}>
                <View style={styles.suspiciouskinddaHeaderPillsRow}>
                  <View style={styles.suspiciouskinddaCaseFilePill}>
                    <Text style={styles.suspiciouskinddaCaseFilePillText}>
                      CASE FILE
                    </Text>
                  </View>
                  <Text style={styles.suspiciouskinddaEstText}>EST. 4 MIN</Text>
                </View>

                <Text style={styles.suspiciouskinddaCaseTitle}>
                  {suspiciouskinddaCase.suspiciouskinddaCaseTitle}
                </Text>
                <Text style={styles.suspiciouskinddaCaseSummary}>
                  {suspiciouskinddaCase.suspiciouskinddaCaseMainQuestion}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.suspiciouskinddaSectionLabel}>SITUATION</Text>
          <View style={styles.suspiciouskinddaCardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.suspiciouskinddaCardGradient}>
              <View style={styles.suspiciouskinddaCardContent}>
                <Text style={styles.suspiciouskinddaSituationText}>
                  {suspiciouskinddaCase.suspiciouskinddaCaseSituationDescription}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.suspiciouskinddaSectionLabel}>CLUES ON THE BOARD</Text>
          <View style={styles.suspiciouskinddaCardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.suspiciouskinddaCardGradient}>
              <View style={styles.suspiciouskinddaCardContent}>
                {suspiciouskinddaCase.suspiciouskinddaCaseClues.map(
                  (suspiciouskinddaClue, suspiciouskinddaIndex) => (
                    <View key={`clue_${suspiciouskinddaIndex}`}>
                      <View style={styles.suspiciouskinddaClueRow}>
                        <View style={styles.suspiciouskinddaClueNumberPill}>
                          <Text style={styles.suspiciouskinddaClueNumberText}>
                            {suspiciouskinddaIndex + 1}
                          </Text>
                        </View>
                        <Text style={styles.suspiciouskinddaClueText}>
                          {suspiciouskinddaClue}
                        </Text>
                      </View>
                      {suspiciouskinddaIndex <
                      suspiciouskinddaCase.suspiciouskinddaCaseClues.length - 1 ? (
                        <View style={styles.suspiciouskinddaDivider} />
                      ) : null}
                    </View>
                  ),
                )}
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.suspiciouskinddaSectionLabel}>
            STATEMENTS & POSITIONS
          </Text>
          {suspiciouskinddaCase.suspiciouskinddaCaseStatements.map(
            (suspiciouskinddaStmt, suspiciouskinddaIndex) => (
              <View key={`stmt_${suspiciouskinddaIndex}`} style={styles.suspiciouskinddaStatementCard}>
                <Text style={styles.suspiciouskinddaStatementSpeaker}>
                  {suspiciouskinddaStmt.suspiciouskinddaSpeaker}
                </Text>
                <Text style={styles.suspiciouskinddaStatementText}>
                  “{suspiciouskinddaStmt.suspiciouskinddaText}”
                </Text>
              </View>
            ),
          )}

          <Text style={styles.suspiciouskinddaSectionLabel}>YOUR TAKE (OPTIONAL)</Text>
          <View style={styles.suspiciouskinddaNoteBox}>
            <TextInput
              value={suspiciouskinddaNote}
              onChangeText={setSuspiciouskinddaNote}
              placeholder="What’s your gut saying? Jot a quick note before you call it ..."
              placeholderTextColor="#7D88AD"
              multiline
              style={styles.suspiciouskinddaNoteInput}
            />
          </View>

          <Text style={styles.suspiciouskinddaSectionLabel}>YOUR VERDICT</Text>
          <View style={styles.suspiciouskinddaVerdictRow}>
            <Pressable
              onPress={() => setSuspiciouskinddaSelectedVerdict('suspicious')}
              style={[
                styles.suspiciouskinddaVerdictBtn,
                suspiciouskinddaSelectedVerdict === 'suspicious' &&
                  styles.suspiciouskinddaVerdictBtnSuspiciousActive,
              ]}>
              <Text
                style={[
                  styles.suspiciouskinddaVerdictText,
                  suspiciouskinddaSelectedVerdict === 'suspicious' &&
                    styles.suspiciouskinddaVerdictTextSuspiciousActive,
                ]}>
                SUSPICIOUS
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSuspiciouskinddaSelectedVerdict('not_suspicious')}
              style={[
                styles.suspiciouskinddaVerdictBtn,
                suspiciouskinddaSelectedVerdict === 'not_suspicious' &&
                  styles.suspiciouskinddaVerdictBtnNotSuspiciousActive,
              ]}>
              <Text
                style={[
                  styles.suspiciouskinddaVerdictText,
                  suspiciouskinddaSelectedVerdict === 'not_suspicious' &&
                    styles.suspiciouskinddaVerdictTextNotSuspiciousActive,
                ]}>
                NOT SUSPICIOUS
              </Text>
            </Pressable>
          </View>

          {suspiciouskinddaSolved ? (
            <View
              style={[
                styles.suspiciouskinddaRealOutcomeCard,
                suspiciouskinddaIsCorrect
                  ? styles.suspiciouskinddaRealOutcomeCardCorrect
                  : styles.suspiciouskinddaRealOutcomeCardWrong,
              ]}>
              <Text style={styles.suspiciouskinddaRealOutcomeLabel}>
                REAL OUTCOME
              </Text>
              <Text style={styles.suspiciouskinddaRealOutcomeText}>
                {suspiciouskinddaCase.suspiciouskinddaCaseRealOutcome}
              </Text>
              <View style={styles.suspiciouskinddaStampWrap}>
                <View
                  style={[
                    styles.suspiciouskinddaStamp,
                    suspiciouskinddaIsCorrect
                      ? styles.suspiciouskinddaStampCorrect
                      : styles.suspiciouskinddaStampWrong,
                  ]}>
                  <Text
                    style={[
                      styles.suspiciouskinddaStampText,
                      suspiciouskinddaIsCorrect
                        ? styles.suspiciouskinddaStampTextCorrect
                        : styles.suspiciouskinddaStampTextWrong,
                    ]}>
                    {suspiciouskinddaIsCorrect ? 'CORRECT' : 'WRONG'}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <View style={{height: 110}} />
        </ScrollView>

        <Pressable
          onPress={suspiciouskinddaOnSubmit}
          disabled={!suspiciouskinddaSelectedVerdict}
          style={[
            styles.suspiciouskinddaSubmitWrap,
            !suspiciouskinddaSelectedVerdict && styles.suspiciouskinddaSubmitWrapDisabled,
          ]}>
          <LinearGradient
            colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.suspiciouskinddaSubmitGradient}>
            <View style={styles.suspiciouskinddaSubmitHighlight} />
            <Text style={styles.suspiciouskinddaSubmitText}>Submit Verdict</Text>
            <Text style={styles.suspiciouskinddaSubmitArrow}>›</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SuspiciouskinddaIdeaslayyt>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaRoot: {flex: 1},
  suspiciouskinddaScrollContent: {
    paddingTop: 59,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  suspiciouskinddaTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 18,
    paddingHorizontal: 4,
  },
  suspiciouskinddaBackBtn: {
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
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },
  suspiciouskinddaTopTitles: {gap: 2},
  suspiciouskinddaTopTitle: {
    color: '#E8EEFF',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  suspiciouskinddaTopSubtitle: {
    color: '#7D88AD',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
  },

  suspiciouskinddaCardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
    marginBottom: 14,
  },
  suspiciouskinddaCardGradient: {borderRadius: 20},
  suspiciouskinddaCardContent: {padding: 19},

  suspiciouskinddaHeaderPillsRow: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  suspiciouskinddaCaseFilePill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(247,201,72,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(247,201,72,0.4)',
  },
  suspiciouskinddaCaseFilePillText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#F7C948',
  },
  suspiciouskinddaEstText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 11,
    color: '#7D88AD',
    letterSpacing: 0.2,
  },
  suspiciouskinddaCaseTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 26,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 6,
  },
  suspiciouskinddaCaseSummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },

  suspiciouskinddaSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  suspiciouskinddaSituationText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },

  suspiciouskinddaClueRow: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  suspiciouskinddaClueNumberPill: {
    width: 29,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaClueNumberText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    color: '#2EB3FF',
  },
  suspiciouskinddaClueText: {
    flex: 1,
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#FFFFFF',
  },
  suspiciouskinddaDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  suspiciouskinddaStatementCard: {
    backgroundColor: '#0B1630',
    borderLeftWidth: 3,
    borderLeftColor: '#F7C948',
    borderRadius: 12,
    paddingLeft: 15,
    paddingRight: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  suspiciouskinddaStatementSpeaker: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 2,
  },
  suspiciouskinddaStatementText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    lineHeight: 18.2,
    color: '#FFFFFF',
  },

  suspiciouskinddaNoteBox: {
    backgroundColor: '#111D3C',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  suspiciouskinddaNoteInput: {
    minHeight: 74,
    color: '#7D88AD',
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Manrope-Medium',
  },

  suspiciouskinddaVerdictRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  suspiciouskinddaVerdictBtn: {
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
  suspiciouskinddaVerdictBtnSuspiciousActive: {
    backgroundColor: 'rgba(255,90,110,0.1)',
    borderColor: '#FF5A6E',
  },
  suspiciouskinddaVerdictBtnNotSuspiciousActive: {
    backgroundColor: 'rgba(74,222,128,0.1)',
    borderColor: '#4ADE80',
  },
  suspiciouskinddaVerdictText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  suspiciouskinddaVerdictTextSuspiciousActive: {color: '#FF5A6E'},
  suspiciouskinddaVerdictTextNotSuspiciousActive: {color: '#4ADE80'},

  suspiciouskinddaRealOutcomeCard: {
    marginTop: 4,
    borderRadius: 20,
    padding: 19,
    borderWidth: 1,
  },
  suspiciouskinddaRealOutcomeCardCorrect: {
    backgroundColor: 'rgba(74,222,128,0.1)',
    borderColor: '#4ADE80',
  },
  suspiciouskinddaRealOutcomeCardWrong: {
    backgroundColor: 'rgba(255,90,110,0.1)',
    borderColor: '#FF5A6E',
  },
  suspiciouskinddaRealOutcomeLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
  },
  suspiciouskinddaRealOutcomeText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
  suspiciouskinddaStampWrap: {marginTop: 14, alignSelf: 'flex-start'},
  suspiciouskinddaStamp: {
    borderWidth: 5,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    transform: [{rotate: '-6deg'}],
  },
  suspiciouskinddaStampCorrect: {borderColor: '#4ADE80'},
  suspiciouskinddaStampWrong: {borderColor: '#FF5A6E'},
  suspiciouskinddaStampText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
    letterSpacing: 2.2,
  },
  suspiciouskinddaStampTextCorrect: {color: '#4ADE80'},
  suspiciouskinddaStampTextWrong: {color: '#FF5A6E'},

  suspiciouskinddaSubmitWrap: {
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
  suspiciouskinddaSubmitWrapDisabled: {opacity: 0.55},
  suspiciouskinddaSubmitGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 16,
  },
  suspiciouskinddaSubmitHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  suspiciouskinddaSubmitText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
  suspiciouskinddaSubmitArrow: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A2347',
    marginTop: -1,
  },
});

export default SuspiciouskinddaIdeascasefile;

