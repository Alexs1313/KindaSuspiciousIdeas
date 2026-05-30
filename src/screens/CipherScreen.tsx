import React, {useMemo, useState} from 'react';
import {images} from '../assets';
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

import {BackgroundScreen} from '../components/BackgroundScreen';
import {navigateRootScreen} from '../navigation/rootNavigation';
import {
  cipherTypeLabels,
  transformCipher,
  type CipherMode,
  type CipherType,
} from '../data/cipherUtils';
import {saveCipher} from '../storage/cipherStorage';

const cipherTypes: CipherType[] = [
  'caesar',
  'rot13',
  'atbash',
  'binary',
];

export function CipherScreen() {
  const navigation = useNavigation<any>();
  const [mode, setMode] =
    useState<CipherMode>('encode');
  const [cipherType, setCipherType] =
    useState<CipherType>('caesar');
  const [input, setInput] = useState('');
  const [saving, setSaving] = useState(false);

  const output = useMemo(
    () =>
      transformCipher(
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
      await saveCipher({
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
    <BackgroundScreen scroll={false}>
      <View style={styles.root}>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Cipher Lab</Text>
          <Pressable
            onPress={() => navigateRootScreen('SavedCiphers')}
            style={styles.headerIconBtn}>
            <Image source={images.savedIcon} />
          </Pressable>
        </View>

        <View style={styles.modeToggle}>
          {(['encode', 'decode'] as CipherMode[]).map(
            option => {
              const isActive =
                mode === option;

              return (
                <Pressable
                  key={option}
                  onPress={() => setMode(option)}
                  style={[
                    styles.modeBtn,
                    isActive &&
                      styles.modeBtnActive,
                  ]}>
                  <Text
                    style={[
                      styles.modeBtnText,
                      isActive &&
                        styles.modeBtnTextActive,
                    ]}>
                    {option === 'encode' ? 'Encode' : 'Decode'}
                  </Text>
                </Pressable>
              );
            },
          )}
        </View>

        <Text style={styles.sectionLabel}>Cipher Type</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipScroll}
          contentContainerStyle={styles.chipRow}>
          {cipherTypes.map(type => {
            const isSelected =
              cipherType === type;

            return (
              <Pressable
                key={type}
                onPress={() =>
                  setCipherType(type)
                }
                style={[
                  styles.chip,
                  isSelected && styles.chipActive,
                ]}>
                <Text
                  style={[
                    styles.chipText,
                    isSelected &&
                      styles.chipTextActive,
                  ]}>
                  {cipherTypeLabels[type]}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.fieldLabel}>
          {inputLabel}
        </Text>
        <View style={styles.inputBox}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={inputPlaceholder}
            placeholderTextColor="#7D88AD"
            multiline
            style={styles.input}
          />
        </View>

        <Text style={styles.fieldLabel}>
          {outputLabel}
        </Text>
        <View style={styles.outputBox}>
          <Text
            style={[
              styles.outputText,
              !hasOutput &&
                styles.outputPlaceholder,
            ]}>
            {hasOutput
              ? output
              : outputPlaceholder}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <Pressable
            onPress={onCopy}
            disabled={!hasOutput}
            style={[
              styles.copyBtn,
              !hasOutput && styles.btnDisabled,
            ]}>
            <Text style={styles.copyIcon}>⧉</Text>
            <Text style={styles.copyText}>Copy</Text>
          </Pressable>

          <Pressable
            onPress={onSave}
            disabled={!hasOutput || saving}
            style={[
              styles.saveBtn,
              hasOutput && styles.saveBtnActive,
              (!hasOutput || saving) &&
                styles.btnDisabled,
            ]}>
            <Text
              style={[
                styles.saveIcon,
                hasOutput &&
                  styles.saveIconActive,
              ]}>
              🔖
            </Text>
            <Text
              style={[
                styles.saveText,
                hasOutput &&
                  styles.saveTextActive,
              ]}>
              Save
            </Text>
          </Pressable>
        </View>
      </View>
    </BackgroundScreen>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 28,
    letterSpacing: -0.28,
    color: '#FFFFFF',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(20,29,58,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    fontSize: 16,
  },
  modeToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15,23,48,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    borderRadius: 14,
    padding: 6,
    marginBottom: 24,
  },
  modeBtn: {
    flex: 1,
    height: 41,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeBtnActive: {
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  modeBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#4A5478',
  },
  modeBtnTextActive: {
    color: '#FFFFFF',
  },
  sectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  chipScroll: {
    flexGrow: 0,
    marginBottom: 24,
  },
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 4,
  },
  chip: {
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
  chipActive: {
    borderColor: 'rgba(46,179,255,0.4)',
  },
  chipText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: '#7D88AD',
    textAlign: 'center',
    includeFontPadding: false,
  },
  chipTextActive: {
    color: '#2EB3FF',
  },
  fieldLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
  },
  inputBox: {
    minHeight: 94,
    backgroundColor: '#111D3C',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    lineHeight: 21,
    color: '#E8EEFF',
    textAlignVertical: 'top',
    minHeight: 74,
    padding: 0,
  },
  outputBox: {
    minHeight: 94,
    backgroundColor: 'rgba(46,179,255,0.2)',
    borderWidth: 1,
    borderColor: '#2EB3FF',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginBottom: 24,
  },
  outputText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    lineHeight: 21,
    color: '#2EB3FF',
  },
  outputPlaceholder: {
    color: '#7D88AD',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  copyBtn: {
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
  copyIcon: {
    fontSize: 15,
    color: '#94A3B8',
  },
  copyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#94A3B8',
  },
  saveBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1A2035',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveBtnActive: {
    backgroundColor: '#2EB3FF',
  },
  saveIcon: {
    fontSize: 14,
    opacity: 0.5,
  },
  saveIconActive: {
    opacity: 1,
  },
  saveText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#475569',
  },
  saveTextActive: {
    color: '#0F1730',
  },
  btnDisabled: {
    opacity: 0.55,
  },
});

