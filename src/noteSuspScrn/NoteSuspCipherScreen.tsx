import React, {useMemo, useState} from 'react';
import {noteSuspImages} from '../noteSuspAssts';
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

import {NoteSuspBackgroundLayout} from '../noteSuspCpnnts/NoteSuspBackgroundLayout';
import {noteSuspNavigateRootScreen} from '../noteSuspNav/NoteSuspRootNavigation';
import {
  noteSuspCipherTypeLabels,
  noteSuspTransformCipher,
  type NoteSuspCipherMode,
  type NoteSuspCipherType,
} from '../noteSuspData/NoteSuspCipherUtils';
import {noteSuspSaveCipher} from '../noteSuspStrg/NoteSuspCipherStorage';

const noteSuspCipherTypes: NoteSuspCipherType[] = [
  'caesar',
  'rot13',
  'atbash',
  'binary',
];

export function NoteSuspCipherScreen() {
  const navigation = useNavigation<any>();
  const [mode, setMode] =
    useState<NoteSuspCipherMode>('encode');
  const [cipherType, setCipherType] =
    useState<NoteSuspCipherType>('caesar');
  const [input, setInput] = useState('');
  const [saving, setSaving] = useState(false);

  const output = useMemo(
    () =>
      noteSuspTransformCipher(
        input,
        cipherType,
        mode,
      ),
    [cipherType, input, mode],
  );

  const hasOutput = output.trim().length > 0;

  const inputLabel =
    mode === 'encode' ? 'Plaintext Input' : 'Cipher Input';
  const outputLabel =
    mode === 'encode' ? 'Encoded Output' : 'Decoded Output';
  const inputPlaceholder =
    mode === 'encode'
      ? 'Enter message to encode...'
      : 'Enter cipher text to decode...';
  const outputPlaceholder =
    mode === 'encode'
      ? 'Encoded result appears here...'
      : 'Decoded result appears here...';

  const onCopy = () => {
    if (!hasOutput) {
      return;
    }

    Clipboard.setString(output);
    Alert.alert('Copied', 'Result copied to clipboard.');
  };

  const onSave = async () => {
    if (!hasOutput || !input.trim()) {
      return;
    }

    setSaving(true);

    try {
      await noteSuspSaveCipher({
        cipherType: cipherType,
        mode: mode,
        input: input.trim(),
        output: output,
      });
      Alert.alert('Saved', 'Cipher added to Solved Ciphers.');
    } catch {
      Alert.alert('Error', 'Could not save cipher.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <NoteSuspBackgroundLayout scroll={false}>
      <View style={styles.noteSuspRoot}>
        <View style={styles.noteSuspHeaderRow}>
          <Text style={styles.noteSuspHeaderTitle}>Cipher Lab</Text>
          <Pressable
            onPress={() => noteSuspNavigateRootScreen('SavedCiphers')}
            style={styles.noteSuspHeaderIconBtn}>
            <Image source={noteSuspImages.savedIcon} />
          </Pressable>
        </View>

        <View style={styles.noteSuspModeToggle}>
          {(['encode', 'decode'] as NoteSuspCipherMode[]).map(
            option => {
              const isActive =
                mode === option;

              return (
                <Pressable
                  key={option}
                  onPress={() => setMode(option)}
                  style={[
                    styles.noteSuspModeBtn,
                    isActive &&
                      styles.noteSuspModeBtnActive,
                  ]}>
                  <Text
                    style={[
                      styles.noteSuspModeBtnText,
                      isActive &&
                        styles.noteSuspModeBtnTextActive,
                    ]}>
                    {option === 'encode' ? 'Encode' : 'Decode'}
                  </Text>
                </Pressable>
              );
            },
          )}
        </View>

        <Text style={styles.noteSuspSectionLabel}>Cipher Type</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.noteSuspChipScroll}
          contentContainerStyle={styles.noteSuspChipRow}>
          {noteSuspCipherTypes.map(type => {
            const isSelected =
              cipherType === type;

            return (
              <Pressable
                key={type}
                onPress={() =>
                  setCipherType(type)
                }
                style={[
                  styles.noteSuspChip,
                  isSelected && styles.noteSuspChipActive,
                ]}>
                <Text
                  style={[
                    styles.noteSuspChipText,
                    isSelected &&
                      styles.noteSuspChipTextActive,
                  ]}>
                  {noteSuspCipherTypeLabels[type]}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.noteSuspFieldLabel}>
          {inputLabel}
        </Text>
        <View style={styles.noteSuspInputBox}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={inputPlaceholder}
            placeholderTextColor="#7D88AD"
            multiline
            style={styles.noteSuspInput}
          />
        </View>

        <Text style={styles.noteSuspFieldLabel}>
          {outputLabel}
        </Text>
        <View style={styles.noteSuspOutputBox}>
          <Text
            style={[
              styles.noteSuspOutputText,
              !hasOutput &&
                styles.noteSuspOutputPlaceholder,
            ]}>
            {hasOutput
              ? output
              : outputPlaceholder}
          </Text>
        </View>

        <View style={styles.noteSuspActionRow}>
          <Pressable
            onPress={onCopy}
            disabled={!hasOutput}
            style={[
              styles.noteSuspCopyBtn,
              !hasOutput && styles.noteSuspBtnDisabled,
            ]}>
            <Text style={styles.noteSuspCopyIcon}>⧉</Text>
            <Text style={styles.noteSuspCopyText}>Copy</Text>
          </Pressable>

          <Pressable
            onPress={onSave}
            disabled={!hasOutput || saving}
            style={[
              styles.noteSuspSaveBtn,
              hasOutput && styles.noteSuspSaveBtnActive,
              (!hasOutput || saving) &&
                styles.noteSuspBtnDisabled,
            ]}>
            <Text
              style={[
                styles.noteSuspSaveIcon,
                hasOutput &&
                  styles.noteSuspSaveIconActive,
              ]}>
              🔖
            </Text>
            <Text
              style={[
                styles.noteSuspSaveText,
                hasOutput &&
                  styles.noteSuspSaveTextActive,
              ]}>
              Save
            </Text>
          </Pressable>
        </View>
      </View>
    </NoteSuspBackgroundLayout>
  );
};

const styles = StyleSheet.create({
  noteSuspRoot: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  noteSuspHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  noteSuspHeaderTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },
  noteSuspHeaderIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspHeaderIcon: {
    fontSize: 16,
  },
  noteSuspModeToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15,23,48,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    borderRadius: 14,
    padding: 6,
    marginBottom: 24,
  },
  noteSuspModeBtn: {
    flex: 1,
    height: 41,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspModeBtnActive: {
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  noteSuspModeBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#4A5478',
  },
  noteSuspModeBtnTextActive: {
    color: '#FFFFFF',
  },
  noteSuspSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  noteSuspChipScroll: {
    flexGrow: 0,
    marginBottom: 24,
  },
  noteSuspChipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 4,
  },
  noteSuspChip: {
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
  noteSuspChipActive: {
    borderColor: 'rgba(46,179,255,0.4)',
  },
  noteSuspChipText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: '#7D88AD',
    textAlign: 'center',
    includeFontPadding: false,
  },
  noteSuspChipTextActive: {
    color: '#2EB3FF',
  },
  noteSuspFieldLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
  },
  noteSuspInputBox: {
    minHeight: 94,
    backgroundColor: '#111D3C',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
  },
  noteSuspInput: {
    flex: 1,
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    lineHeight: 21,
    color: '#E8EEFF',
    textAlignVertical: 'top',
    minHeight: 74,
    padding: 0,
  },
  noteSuspOutputBox: {
    minHeight: 94,
    backgroundColor: 'rgba(46,179,255,0.2)',
    borderWidth: 1,
    borderColor: '#2EB3FF',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginBottom: 24,
  },
  noteSuspOutputText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    lineHeight: 21,
    color: '#2EB3FF',
  },
  noteSuspOutputPlaceholder: {
    color: '#7D88AD',
  },
  noteSuspActionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  noteSuspCopyBtn: {
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
  noteSuspCopyIcon: {
    fontSize: 15,
    color: '#94A3B8',
  },
  noteSuspCopyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#94A3B8',
  },
  noteSuspSaveBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1A2035',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  noteSuspSaveBtnActive: {
    backgroundColor: '#2EB3FF',
  },
  noteSuspSaveIcon: {
    fontSize: 14,
    opacity: 0.5,
  },
  noteSuspSaveIconActive: {
    opacity: 1,
  },
  noteSuspSaveText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#475569',
  },
  noteSuspSaveTextActive: {
    color: '#0F1730',
  },
  noteSuspBtnDisabled: {
    opacity: 0.55,
  },
});

