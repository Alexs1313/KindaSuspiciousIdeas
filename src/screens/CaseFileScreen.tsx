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

import {BackgroundScreen} from '../components/BackgroundScreen';
import type {RootStackParamList} from '../navigation/types';
import {navigateRootScreen} from '../navigation/rootNavigation';
import {useCases, type Verdict} from '../context/CasesContext';

type CaseFileRoute = {
  key: string;
  name: 'CaseFile';
  params: RootStackParamList['CaseFile'];
};

export function CaseFileScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<CaseFileRoute>();
  const caseId = route.params.caseId;

  const {cases, progressById, submitVerdict} = useCases();

  const activeCase = useMemo(
    () => cases.find(c => c.caseId === caseId),
    [cases, caseId],
  );

  const progress = progressById[caseId];

  const [selectedVerdict, setSelectedVerdict] = useState<Verdict | null>(
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
    navigateRootScreen('CaseClosed', {
      caseId,
    });
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
              style={styles.backBtn}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <View style={styles.topTitles}>
              <Text style={styles.topTitle}>Case File</Text>
              <Text style={styles.topSubtitle}>
                #{activeCase.caseId} · {activeCase.tag}
              </Text>
            </View>
          </View>

          <View style={styles.cardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.cardGradient}>
              <View style={styles.cardContent}>
                <View style={styles.headerPillsRow}>
                  <View style={styles.caseFilePill}>
                    <Text style={styles.caseFilePillText}>CASE FILE</Text>
                  </View>
                  <Text style={styles.estText}>EST. 4 MIN</Text>
                </View>

                <Text style={styles.title}>{activeCase.title}</Text>
                <Text style={styles.caseSummary}>
                  {activeCase.mainQuestion}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.sectionLabel}>SITUATION</Text>
          <View style={styles.cardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.cardGradient}>
              <View style={styles.cardContent}>
                <Text style={styles.situationText}>
                  {activeCase.situationDescription}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.sectionLabel}>CLUES ON THE BOARD</Text>
          <View style={styles.cardWrap}>
            <LinearGradient
              colors={['#1A2347', '#0F1730'] as unknown as string[]}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              style={styles.cardGradient}>
              <View style={styles.cardContent}>
                {activeCase.clues.map((clue, index) => (
                  <View key={`clue_${index}`}>
                    <View style={styles.clueRow}>
                      <View style={styles.clueNumberPill}>
                        <Text style={styles.clueNumberText}>{index + 1}</Text>
                      </View>
                      <Text style={styles.clueText}>{clue}</Text>
                    </View>
                    {index < activeCase.clues.length - 1 ? (
                      <View style={styles.divider} />
                    ) : null}
                  </View>
                ))}
              </View>
            </LinearGradient>
          </View>

          <Text style={styles.sectionLabel}>STATEMENTS & POSITIONS</Text>
          {activeCase.statements.map((stmt, index) => (
            <View key={`stmt_${index}`} style={styles.statementCard}>
              <Text style={styles.statementSpeaker}>{stmt.speaker}</Text>
              <Text style={styles.statementText}>“{stmt.text}”</Text>
            </View>
          ))}

          <Text style={styles.sectionLabel}>YOUR TAKE (OPTIONAL)</Text>
          <View style={styles.noteBox}>
            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="What’s your gut saying? Jot a quick note before you call it ..."
              placeholderTextColor="#7D88AD"
              multiline
              style={styles.noteInput}
            />
          </View>

          <Text style={styles.sectionLabel}>YOUR VERDICT</Text>
          <View style={styles.verdictRow}>
            <Pressable
              onPress={() => setSelectedVerdict('suspicious')}
              style={[
                styles.verdictBtn,
                selectedVerdict === 'suspicious' &&
                  styles.verdictBtnSuspiciousActive,
              ]}>
              <Text
                style={[
                  styles.verdictText,
                  selectedVerdict === 'suspicious' &&
                    styles.verdictTextSuspiciousActive,
                ]}>
                SUSPICIOUS
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setSelectedVerdict('not_suspicious')}
              style={[
                styles.verdictBtn,
                selectedVerdict === 'not_suspicious' &&
                  styles.verdictBtnNotSuspiciousActive,
              ]}>
              <Text
                style={[
                  styles.verdictText,
                  selectedVerdict === 'not_suspicious' &&
                    styles.verdictTextNotSuspiciousActive,
                ]}>
                NOT SUSPICIOUS
              </Text>
            </Pressable>
          </View>

          {solved ? (
            <View
              style={[
                styles.realOutcomeCard,
                isCorrect
                  ? styles.realOutcomeCardCorrect
                  : styles.realOutcomeCardWrong,
              ]}>
              <Text style={styles.realOutcomeLabel}>REAL OUTCOME</Text>
              <Text style={styles.realOutcomeText}>
                {activeCase.realOutcome}
              </Text>
              <View style={styles.stampWrap}>
                <View
                  style={[
                    styles.stamp,
                    isCorrect ? styles.stampCorrect : styles.stampWrong,
                  ]}>
                  <Text
                    style={[
                      styles.stampText,
                      isCorrect
                        ? styles.stampTextCorrect
                        : styles.stampTextWrong,
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
            styles.submitWrap,
            !selectedVerdict && styles.submitWrapDisabled,
          ]}>
          <LinearGradient
            colors={['#3EC0FF', '#1B88D6'] as unknown as string[]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.submitGradient}>
            <View style={styles.submitHighlight} />
            <Text style={styles.submitText}>Submit Verdict</Text>
            <Text style={styles.submitArrow}>›</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1},
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 4,
    paddingHorizontal: 4,
  },
  backBtn: {
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
    color: '#E8EEFF',
    fontSize: 26,
    fontWeight: '700',
    marginTop: -2,
  },
  topTitles: {gap: 2},
  topTitle: {
    color: '#E8EEFF',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: 'SpaceGrotesk-Bold',
  },
  topSubtitle: {
    color: '#7D88AD',
    fontSize: 12,
    fontFamily: 'Manrope-Regular',
  },

  cardWrap: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.25)',
    overflow: 'hidden',
    marginBottom: 14,
    marginTop: 14,
  },
  cardGradient: {borderRadius: 20},
  cardContent: {padding: 19},

  headerPillsRow: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  caseFilePill: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(247,201,72,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(247,201,72,0.4)',
  },
  caseFilePillText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    textTransform: 'uppercase',
    color: '#F7C948',
  },
  estText: {
    fontFamily: 'JetBrainsMono-Regular',
    fontSize: 11,
    color: '#7D88AD',
    letterSpacing: 0.2,
  },
  title: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 26,
    letterSpacing: -0.26,
    color: '#E8EEFF',
    marginBottom: 6,
  },
  caseSummary: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 16.8,
    color: '#7D88AD',
  },

  sectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  situationText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },

  clueRow: {
    flexDirection: 'row',
    gap: 11,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  clueNumberPill: {
    width: 29,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(46,179,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(46,179,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clueNumberText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 11,
    letterSpacing: 0.44,
    color: '#2EB3FF',
  },
  clueText: {
    flex: 1,
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 16.8,
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },

  statementCard: {
    backgroundColor: '#0B1630',
    borderLeftWidth: 3,
    borderLeftColor: '#F7C948',
    borderRadius: 12,
    paddingLeft: 15,
    paddingRight: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  statementSpeaker: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 2,
  },
  statementText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    lineHeight: 18.2,
    color: '#FFFFFF',
  },

  noteBox: {
    backgroundColor: '#111D3C',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  noteInput: {
    minHeight: 74,
    color: '#7D88AD',
    fontSize: 15,
    lineHeight: 21,
    fontFamily: 'Manrope-Medium',
  },

  verdictRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  verdictBtn: {
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
  verdictBtnSuspiciousActive: {
    backgroundColor: 'rgba(255,90,110,0.1)',
    borderColor: '#FF5A6E',
  },
  verdictBtnNotSuspiciousActive: {
    backgroundColor: 'rgba(74,222,128,0.1)',
    borderColor: '#4ADE80',
  },
  verdictText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  verdictTextSuspiciousActive: {color: '#FF5A6E'},
  verdictTextNotSuspiciousActive: {color: '#4ADE80'},

  realOutcomeCard: {
    marginTop: 4,
    borderRadius: 20,
    padding: 19,
    borderWidth: 1,
  },
  realOutcomeCardCorrect: {
    backgroundColor: 'rgba(74,222,128,0.1)',
    borderColor: '#4ADE80',
  },
  realOutcomeCardWrong: {
    backgroundColor: 'rgba(255,90,110,0.1)',
    borderColor: '#FF5A6E',
  },
  realOutcomeLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
  },
  realOutcomeText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#FFFFFF',
  },
  stampWrap: {marginTop: 14, alignSelf: 'flex-start'},
  stamp: {
    borderWidth: 5,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    transform: [{rotate: '-6deg'}],
  },
  stampCorrect: {borderColor: '#4ADE80'},
  stampWrong: {borderColor: '#FF5A6E'},
  stampText: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 20,
    letterSpacing: 2.2,
  },
  stampTextCorrect: {color: '#4ADE80'},
  stampTextWrong: {color: '#FF5A6E'},

  submitWrap: {
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
  submitWrapDisabled: {opacity: 0.55},
  submitGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 16,
  },
  submitHighlight: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  submitText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#1A2347',
  },
  submitArrow: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1A2347',
    marginTop: -1,
  },
});
