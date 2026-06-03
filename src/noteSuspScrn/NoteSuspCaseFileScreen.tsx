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

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import type {NoteSuspRootStackParamList} from '../noteSuspNav/NoteSuspTypes';
import {noteSuspNavigateRootScreen} from '../noteSuspNav/NoteSuspRootNavigation';
import {useNoteSuspCases, type NoteSuspVerdict} from '../noteSuspCtx/NoteSuspCasesContext';

type CaseFileRoute = {
  key: string;
  name: 'CaseFile';
  params: NoteSuspRootStackParamList['CaseFile'];
};

export function NoteSuspCaseFileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<CaseFileRoute>();
  const caseId = route.params.caseId;

  const {cases, progressById, submitVerdict} = useNoteSuspCases();

  const activeCase = useMemo(
    () => cases.find(c => c.caseId === caseId),
    [cases, caseId],
  );

  const progress = progressById[caseId];

  const [selectedVerdict, setSelectedVerdict] = useState<NoteSuspVerdict | null>(
    progress?.yourVerdict ?? null,
  );
  const [note, setNote] = useState(progress?.yourNote ?? '');

  if (!activeCase) {
    return null;
  }

  const solved = !!progress?.isSolved;
  const isCorrect = progress?.yourVerdict === activeCase.verdict;

  const onSubmit = () => {
    if (!selectedVerdict) {
      return;
    }
    submitVerdict({
      caseId,
      yourVerdict: selectedVerdict,
      note,
    });
    noteSuspNavigateRootScreen('CaseClosed', {
      caseId,
    });
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
              style={styles.noteSuspBackBtn}>
              <Text style={styles.noteSuspBackIcon}>‹</Text>
            </Pressable>

            <View style={styles.noteSuspTopTitles}>
              <Text style={styles.noteSuspTopTitle}>Case File</Text>
              <Text style={styles.noteSuspTopSubtitle}>
                #{activeCase.caseId} · {activeCase.tag}
              </Text>
            </View>
          </View>

          <View style={styles.noteSuspCardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.noteSuspCardGradient}>
              <View style={styles.noteSuspCardContent}>
                <View style={styles.noteSuspHeaderPillsRow}>
                  <View style={styles.noteSuspCaseFilePill}>
                    <Text style={styles.noteSuspCaseFilePillText}>CASE FILE</Text>
                  </View>
                  <Text style={styles.noteSuspEstText}>EST. 4 MIN</Text>
                </View>

                <Text style={styles.noteSuspTitle}>{activeCase.title}</Text>
                <Text style={styles.noteSuspCaseSummary}>
                  {activeCase.mainQuestion}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.noteSuspSectionLabel}>SITUATION</Text>
          <View style={styles.noteSuspCardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.noteSuspCardGradient}>
              <View style={styles.noteSuspCardContent}>
                <Text style={styles.noteSuspSituationText}>
                  {activeCase.situationDescription}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.noteSuspSectionLabel}>CLUES ON THE BOARD</Text>
          <View style={styles.noteSuspCardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.noteSuspCardGradient}>
              <View style={styles.noteSuspCardContent}>
                {activeCase.clues.map((clue, index) => (
                  <View key={`clue_${index}`}>
                    <View style={styles.noteSuspClueRow}>
                      <View style={styles.noteSuspClueNumberPill}>
                        <Text style={styles.noteSuspClueNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.noteSuspClueText}>{clue}</Text>
                    </View>
                    {index < activeCase.clues.length - 1 ? (
                      <View style={styles.noteSuspDivider} />
                    ) : null}
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.noteSuspSectionLabel}>STATEMENTS & POSITIONS</Text>
          {activeCase.statements.map((stmt, index) => (
            <View key={`stmt_${index}`} style={styles.noteSuspStatementCard}>
              <Text style={styles.noteSuspStatementSpeaker}>{stmt.speaker}</Text>
              <Text style={styles.noteSuspStatementText}>“{stmt.text}”</Text>
            </View>
          ))}

          <Text style={styles.noteSuspSectionLabel}>YOUR TAKE (OPTIONAL)</Text>
          <View style={styles.noteSuspNoteBox}>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="What’s your gut saying? Jot a quick note before you call it ..."
              placeholderTextColor="#7D88AD"
              multiline
              style={styles.noteSuspNoteInput}
            />
          </View>

          <Text style={styles.noteSuspSectionLabel}>YOUR VERDICT</Text>
          <View style={styles.noteSuspVerdictRow}>
            <Pressable
              onPress={() => setSelectedVerdict('suspicious')}
              style={[
                styles.noteSuspVerdictBtn,
                selectedVerdict === 'suspicious' &&
                  styles.noteSuspVerdictBtnSuspiciousActive,
              ]}>
              <Text
                style={[
                  styles.noteSuspVerdictText,
                  selectedVerdict === 'suspicious' &&
                    styles.noteSuspVerdictTextSuspiciousActive,
                ]}>
                SUSPICIOUS
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedVerdict('not_suspicious')}
              style={[
                styles.noteSuspVerdictBtn,
                selectedVerdict === 'not_suspicious' &&
                  styles.noteSuspVerdictBtnNotSuspiciousActive,
              ]}>
              <Text
                style={[
                  styles.noteSuspVerdictText,
                  selectedVerdict === 'not_suspicious' &&
                    styles.noteSuspVerdictTextNotSuspiciousActive,
                ]}>
                NOT SUSPICIOUS
              </Text>
            </Pressable>
          </View>

          {solved ? (
            <View
              style={[
                styles.noteSuspRealOutcomeCard,
                isCorrect
                  ? styles.noteSuspRealOutcomeCardCorrect
                  : styles.noteSuspRealOutcomeCardWrong,
              ]}>
              <Text style={styles.noteSuspRealOutcomeLabel}>REAL OUTCOME</Text>
              <Text style={styles.noteSuspRealOutcomeText}>
                {activeCase.realOutcome}
              </Text>
              <View style={styles.noteSuspStampWrap}>
                <View
                  style={[
                    styles.noteSuspStamp,
                    isCorrect ? styles.noteSuspStampCorrect : styles.noteSuspStampWrong,
                  ]}>
                  <Text
                    style={[
                      styles.noteSuspStampText,
                      isCorrect
                        ? styles.noteSuspStampTextCorrect
                        : styles.noteSuspStampTextWrong,
                    ]}>
                    {isCorrect ? 'CORRECT' : 'WRONG'}
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <View style={{height: 110}} />
        </ScrollView>

        <Pressable
          onPress={onSubmit}
          disabled={!selectedVerdict}
          style={[
            styles.noteSuspSubmitWrap,
            !selectedVerdict && styles.noteSuspSubmitWrapDisabled,
          ]}>
          <LinearGradient
            colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.noteSuspSubmitGradient}>
            <View style={styles.noteSuspSubmitHighlight} />
            <Text style={styles.noteSuspSubmitText}>Submit NoteSuspVerdict</Text>
            <Text style={styles.noteSuspSubmitArrow}>›</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </NoteSuspBackgroundLayout>
  );
}

const styles = StyleSheet.create({
  noteSuspRoot: {flex: 1},
  noteSuspScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  noteSuspTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 4,
    paddingHorizontal: 4,
  },
  noteSuspBackBtn: {
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
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },
  noteSuspTopTitles: {gap: 2},
  noteSuspTopTitle: {
    color: '#E8EEFF',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  noteSuspTopSubtitle: {
    color: '#7D88AD',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
  },

  noteSuspCardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
    marginBottom: 14,
    marginTop: 14,
  },
  noteSuspCardGradient: {borderRadius: 20},
  noteSuspCardContent: {padding: 19},

  noteSuspHeaderPillsRow: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  noteSuspCaseFilePill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(247,201,72,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(247,201,72,0.4)',
  },
  noteSuspCaseFilePillText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#F7C948',
  },
  noteSuspEstText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 11,
    color: '#7D88AD',
    letterSpacing: 0.2,
  },
  noteSuspTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 26,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 6,
  },
  noteSuspCaseSummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },

  noteSuspSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  noteSuspSituationText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },

  noteSuspClueRow: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  noteSuspClueNumberPill: {
    width: 29,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspClueNumberText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    color: '#2EB3FF',
  },
  noteSuspClueText: {
    flex: 1,
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#FFFFFF',
  },
  noteSuspDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  noteSuspStatementCard: {
    backgroundColor: '#0B1630',
    borderLeftWidth: 3,
    borderLeftColor: '#F7C948',
    borderRadius: 12,
    paddingLeft: 15,
    paddingRight: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  noteSuspStatementSpeaker: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 2,
  },
  noteSuspStatementText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    lineHeight: 18.2,
    color: '#FFFFFF',
  },

  noteSuspNoteBox: {
    backgroundColor: '#111D3C',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  noteSuspNoteInput: {
    minHeight: 74,
    color: '#7D88AD',
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Manrope-Medium',
  },

  noteSuspVerdictRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  noteSuspVerdictBtn: {
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
  noteSuspVerdictBtnSuspiciousActive: {
    backgroundColor: 'rgba(255,90,110,0.1)',
    borderColor: '#FF5A6E',
  },
  noteSuspVerdictBtnNotSuspiciousActive: {
    backgroundColor: 'rgba(74,222,128,0.1)',
    borderColor: '#4ADE80',
  },
  noteSuspVerdictText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  noteSuspVerdictTextSuspiciousActive: {color: '#FF5A6E'},
  noteSuspVerdictTextNotSuspiciousActive: {color: '#4ADE80'},

  noteSuspRealOutcomeCard: {
    marginTop: 4,
    borderRadius: 20,
    padding: 19,
    borderWidth: 1,
  },
  noteSuspRealOutcomeCardCorrect: {
    backgroundColor: 'rgba(74,222,128,0.1)',
    borderColor: '#4ADE80',
  },
  noteSuspRealOutcomeCardWrong: {
    backgroundColor: 'rgba(255,90,110,0.1)',
    borderColor: '#FF5A6E',
  },
  noteSuspRealOutcomeLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
  },
  noteSuspRealOutcomeText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
  noteSuspStampWrap: {marginTop: 14, alignSelf: 'flex-start'},
  noteSuspStamp: {
    borderWidth: 5,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    transform: [{rotate: '-6deg'}],
  },
  noteSuspStampCorrect: {borderColor: '#4ADE80'},
  noteSuspStampWrong: {borderColor: '#FF5A6E'},
  noteSuspStampText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
    letterSpacing: 2.2,
  },
  noteSuspStampTextCorrect: {color: '#4ADE80'},
  noteSuspStampTextWrong: {color: '#FF5A6E'},

  noteSuspSubmitWrap: {
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
  noteSuspSubmitWrapDisabled: {opacity: 0.55},
  noteSuspSubmitGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 16,
  },
  noteSuspSubmitHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  noteSuspSubmitText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
  noteSuspSubmitArrow: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A2347',
    marginTop: -1,
  },
});
