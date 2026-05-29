import React, {useMemo, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';

import SuspiciouskinddaIdeaslayyt from '../SuspiciouskinddaIdeascpmm/SuspiciouskinddaIdeaslayyt';
import {
  suspiciouskinddaIdeasCipherTypeLabels,
  suspiciouskinddaIdeasTransformCipher,
  type SuspiciouskinddaIdeasCipherMode,
  type SuspiciouskinddaIdeasCipherType,
} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeascipherUtils';
import {suspiciouskinddaIdeasSaveCipher} from '../SuspiciouskinddaIdeasdata/SuspiciouskinddaIdeascipherStorage';

const suspiciouskinddaIdeasCipherTypes: SuspiciouskinddaIdeasCipherType[] = [
  'caesar',
  'rot13',
  'atbash',
  'binary',
];

const SuspiciouskinddaIdeascipher = () => {
  const suspiciouskinddaNavigation = useNavigation<any>();
  const [suspiciouskinddaMode, setSuspiciouskinddaMode] =
    useState<SuspiciouskinddaIdeasCipherMode>('encode');
  const [suspiciouskinddaCipherType, setSuspiciouskinddaCipherType] =
    useState<SuspiciouskinddaIdeasCipherType>('caesar');
  const [suspiciouskinddaInput, setSuspiciouskinddaInput] = useState('');
  const [suspiciouskinddaSaving, setSuspiciouskinddaSaving] = useState(false);

  const suspiciouskinddaOutput = useMemo(
    () =>
      suspiciouskinddaIdeasTransformCipher(
        suspiciouskinddaInput,
        suspiciouskinddaCipherType,
        suspiciouskinddaMode,
      ),
    [suspiciouskinddaCipherType, suspiciouskinddaInput, suspiciouskinddaMode],
  );

  const suspiciouskinddaHasOutput = suspiciouskinddaOutput.trim().length > 0;

  const suspiciouskinddaInputLabel =
    suspiciouskinddaMode === 'encode' ? 'Plaintext Input' : 'Cipher Input';
  const suspiciouskinddaOutputLabel =
    suspiciouskinddaMode === 'encode' ? 'Encoded Output' : 'Decoded Output';
  const suspiciouskinddaInputPlaceholder =
    suspiciouskinddaMode === 'encode'
      ? 'Enter message to encode...'
      : 'Enter cipher text to decode...';
  const suspiciouskinddaOutputPlaceholder =
    suspiciouskinddaMode === 'encode'
      ? 'Encoded result appears here...'
      : 'Decoded result appears here...';

  const suspiciouskinddaOnCopy = () => {
    if (!suspiciouskinddaHasOutput) {
      return;
    }

    Clipboard.setString(suspiciouskinddaOutput);
    Alert.alert('Copied', 'Result copied to clipboard.');
  };

  const suspiciouskinddaOnSave = async () => {
    if (!suspiciouskinddaHasOutput || !suspiciouskinddaInput.trim()) {
      return;
    }

    setSuspiciouskinddaSaving(true);

    try {
      await suspiciouskinddaIdeasSaveCipher({
        suspiciouskinddaCipherType: suspiciouskinddaCipherType,
        suspiciouskinddaCipherMode: suspiciouskinddaMode,
        suspiciouskinddaCipherInput: suspiciouskinddaInput.trim(),
        suspiciouskinddaCipherOutput: suspiciouskinddaOutput,
      });
      Alert.alert('Saved', 'Cipher added to Solved Ciphers.');
    } catch {
      Alert.alert('Error', 'Could not save cipher.');
    } finally {
      setSuspiciouskinddaSaving(false);
    }
  };

  return (
    <SuspiciouskinddaIdeaslayyt>
      <View style={styles.suspiciouskinddaRoot}>
        <View style={styles.suspiciouskinddaHeaderRow}>
          <Text style={styles.suspiciouskinddaHeaderTitle}>Cipher Lab</Text>
          <Pressable
            onPress={() =>
              suspiciouskinddaNavigation.navigate(
                'SuspiciouskinddaIdeascipherssaved',
              )
            }
            style={styles.suspiciouskinddaHeaderIconBtn}>
            <Image source={require('../../assts/immgs/savedic.png')} />
          </Pressable>
        </View>

        <View style={styles.suspiciouskinddaModeToggle}>
          {(['encode', 'decode'] as SuspiciouskinddaIdeasCipherMode[]).map(
            suspiciouskinddaOption => {
              const suspiciouskinddaIsActive =
                suspiciouskinddaMode === suspiciouskinddaOption;

              return (
                <Pressable
                  key={suspiciouskinddaOption}
                  onPress={() => setSuspiciouskinddaMode(suspiciouskinddaOption)}
                  style={[
                    styles.suspiciouskinddaModeBtn,
                    suspiciouskinddaIsActive &&
                      styles.suspiciouskinddaModeBtnActive,
                  ]}>
                  <Text
                    style={[
                      styles.suspiciouskinddaModeBtnText,
                      suspiciouskinddaIsActive &&
                        styles.suspiciouskinddaModeBtnTextActive,
                    ]}>
                    {suspiciouskinddaOption === 'encode' ? 'Encode' : 'Decode'}
                  </Text>
                </Pressable>
              );
            },
          )}
        </View>

        <Text style={styles.suspiciouskinddaSectionLabel}>Cipher Type</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.suspiciouskinddaChipScroll}
          contentContainerStyle={styles.suspiciouskinddaChipRow}>
          {suspiciouskinddaIdeasCipherTypes.map(suspiciouskinddaType => {
            const suspiciouskinddaIsSelected =
              suspiciouskinddaCipherType === suspiciouskinddaType;

            return (
              <Pressable
                key={suspiciouskinddaType}
                onPress={() =>
                  setSuspiciouskinddaCipherType(suspiciouskinddaType)
                }
                style={[
                  styles.suspiciouskinddaChip,
                  suspiciouskinddaIsSelected && styles.suspiciouskinddaChipActive,
                ]}>
                <Text
                  style={[
                    styles.suspiciouskinddaChipText,
                    suspiciouskinddaIsSelected &&
                      styles.suspiciouskinddaChipTextActive,
                  ]}>
                  {suspiciouskinddaIdeasCipherTypeLabels[suspiciouskinddaType]}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.suspiciouskinddaFieldLabel}>
          {suspiciouskinddaInputLabel}
        </Text>
        <View style={styles.suspiciouskinddaInputBox}>
          <TextInput
            value={suspiciouskinddaInput}
            onChangeText={setSuspiciouskinddaInput}
            placeholder={suspiciouskinddaInputPlaceholder}
            placeholderTextColor="#7D88AD"
            multiline
            style={styles.suspiciouskinddaInput}
          />
        </View>

        <Text style={styles.suspiciouskinddaFieldLabel}>
          {suspiciouskinddaOutputLabel}
        </Text>
        <View style={styles.suspiciouskinddaOutputBox}>
          <Text
            style={[
              styles.suspiciouskinddaOutputText,
              !suspiciouskinddaHasOutput &&
                styles.suspiciouskinddaOutputPlaceholder,
            ]}>
            {suspiciouskinddaHasOutput
              ? suspiciouskinddaOutput
              : suspiciouskinddaOutputPlaceholder}
          </Text>
        </View>

        <View style={styles.suspiciouskinddaActionRow}>
          <Pressable
            onPress={suspiciouskinddaOnCopy}
            disabled={!suspiciouskinddaHasOutput}
            style={[
              styles.suspiciouskinddaCopyBtn,
              !suspiciouskinddaHasOutput && styles.suspiciouskinddaBtnDisabled,
            ]}>
            <Text style={styles.suspiciouskinddaCopyIcon}>⧉</Text>
            <Text style={styles.suspiciouskinddaCopyText}>Copy</Text>
          </Pressable>

          <Pressable
            onPress={suspiciouskinddaOnSave}
            disabled={!suspiciouskinddaHasOutput || suspiciouskinddaSaving}
            style={[
              styles.suspiciouskinddaSaveBtn,
              suspiciouskinddaHasOutput && styles.suspiciouskinddaSaveBtnActive,
              (!suspiciouskinddaHasOutput || suspiciouskinddaSaving) &&
                styles.suspiciouskinddaBtnDisabled,
            ]}>
            <Text
              style={[
                styles.suspiciouskinddaSaveIcon,
                suspiciouskinddaHasOutput &&
                  styles.suspiciouskinddaSaveIconActive,
              ]}>
              🔖
            </Text>
            <Text
              style={[
                styles.suspiciouskinddaSaveText,
                suspiciouskinddaHasOutput &&
                  styles.suspiciouskinddaSaveTextActive,
              ]}>
              Save
            </Text>
          </Pressable>
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
    paddingBottom: 100,
  },
  suspiciouskinddaHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 24,
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
    fontSize: 16,
  },
  suspiciouskinddaModeToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15,23,48,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    borderRadius: 14,
    padding: 6,
    marginBottom: 24,
  },
  suspiciouskinddaModeBtn: {
    flex: 1,
    height: 41,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaModeBtnActive: {
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  suspiciouskinddaModeBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#4A5478',
  },
  suspiciouskinddaModeBtnTextActive: {
    color: '#FFFFFF',
  },
  suspiciouskinddaSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  suspiciouskinddaChipScroll: {
    flexGrow: 0,
    marginBottom: 24,
  },
  suspiciouskinddaChipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 4,
  },
  suspiciouskinddaChip: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  suspiciouskinddaChipActive: {
    borderColor: 'rgba(46,179,255,0.4)',
  },
  suspiciouskinddaChipText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: '#7D88AD',
    textAlign: 'center',
    includeFontPadding: false,
  },
  suspiciouskinddaChipTextActive: {
    color: '#2EB3FF',
  },
  suspiciouskinddaFieldLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
  },
  suspiciouskinddaInputBox: {
    minHeight: 94,
    backgroundColor: '#111D3C',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
  },
  suspiciouskinddaInput: {
    flex: 1,
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    lineHeight: 21,
    color: '#E8EEFF',
    textAlignVertical: 'top',
    minHeight: 74,
    padding: 0,
  },
  suspiciouskinddaOutputBox: {
    minHeight: 94,
    backgroundColor: 'rgba(46,179,255,0.2)',
    borderWidth: 1,
    borderColor: '#2EB3FF',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginBottom: 24,
  },
  suspiciouskinddaOutputText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    lineHeight: 21,
    color: '#2EB3FF',
  },
  suspiciouskinddaOutputPlaceholder: {
    color: '#7D88AD',
  },
  suspiciouskinddaActionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  suspiciouskinddaCopyBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  suspiciouskinddaCopyIcon: {
    fontSize: 15,
    color: '#94A3B8',
  },
  suspiciouskinddaCopyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#94A3B8',
  },
  suspiciouskinddaSaveBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1A2035',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  suspiciouskinddaSaveBtnActive: {
    backgroundColor: '#2EB3FF',
  },
  suspiciouskinddaSaveIcon: {
    fontSize: 14,
    opacity: 0.5,
  },
  suspiciouskinddaSaveIconActive: {
    opacity: 1,
  },
  suspiciouskinddaSaveText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#475569',
  },
  suspiciouskinddaSaveTextActive: {
    color: '#0F1730',
  },
  suspiciouskinddaBtnDisabled: {
    opacity: 0.55,
  },
});

export default SuspiciouskinddaIdeascipher;
