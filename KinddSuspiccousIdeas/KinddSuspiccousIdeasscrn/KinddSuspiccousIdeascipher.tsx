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

import KinddSuspiccousIdeaslayyt from '../KinddSuspiccousIdeascpmm/KinddSuspiccousIdeaslayyt';
import {
  kinddSuspiccousIdeasCipherTypeLabels,
  kinddSuspiccousIdeasTransformCipher,
  type KinddSuspiccousIdeasCipherMode,
  type KinddSuspiccousIdeasCipherType,
} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeascipherUtils';
import {kinddSuspiccousIdeasSaveCipher} from '../KinddSuspiccousIdeasdata/KinddSuspiccousIdeascipherStorage';

const kinddSuspiccousIdeasCipherTypes: KinddSuspiccousIdeasCipherType[] = [
  'caesar',
  'rot13',
  'atbash',
  'binary',
];

const KinddSuspiccousIdeascipher = () => {
  const kinddSuspiccousNavigation = useNavigation<any>();
  const [kinddSuspiccousMode, setKinddSuspiccousMode] =
    useState<KinddSuspiccousIdeasCipherMode>('encode');
  const [kinddSuspiccousCipherType, setKinddSuspiccousCipherType] =
    useState<KinddSuspiccousIdeasCipherType>('caesar');
  const [kinddSuspiccousInput, setKinddSuspiccousInput] = useState('');
  const [kinddSuspiccousSaving, setKinddSuspiccousSaving] = useState(false);

  const kinddSuspiccousOutput = useMemo(
    () =>
      kinddSuspiccousIdeasTransformCipher(
        kinddSuspiccousInput,
        kinddSuspiccousCipherType,
        kinddSuspiccousMode,
      ),
    [kinddSuspiccousCipherType, kinddSuspiccousInput, kinddSuspiccousMode],
  );

  const kinddSuspiccousHasOutput = kinddSuspiccousOutput.trim().length > 0;

  const kinddSuspiccousInputLabel =
    kinddSuspiccousMode === 'encode' ? 'Plaintext Input' : 'Cipher Input';
  const kinddSuspiccousOutputLabel =
    kinddSuspiccousMode === 'encode' ? 'Encoded Output' : 'Decoded Output';
  const kinddSuspiccousInputPlaceholder =
    kinddSuspiccousMode === 'encode'
      ? 'Enter message to encode...'
      : 'Enter cipher text to decode...';
  const kinddSuspiccousOutputPlaceholder =
    kinddSuspiccousMode === 'encode'
      ? 'Encoded result appears here...'
      : 'Decoded result appears here...';

  const kinddSuspiccousOnCopy = () => {
    if (!kinddSuspiccousHasOutput) {
      return;
    }

    Clipboard.setString(kinddSuspiccousOutput);
    Alert.alert('Copied', 'Result copied to clipboard.');
  };

  const kinddSuspiccousOnSave = async () => {
    if (!kinddSuspiccousHasOutput || !kinddSuspiccousInput.trim()) {
      return;
    }

    setKinddSuspiccousSaving(true);

    try {
      await kinddSuspiccousIdeasSaveCipher({
        kinddSuspiccousCipherType: kinddSuspiccousCipherType,
        kinddSuspiccousCipherMode: kinddSuspiccousMode,
        kinddSuspiccousCipherInput: kinddSuspiccousInput.trim(),
        kinddSuspiccousCipherOutput: kinddSuspiccousOutput,
      });
      Alert.alert('Saved', 'Cipher added to Solved Ciphers.');
    } catch {
      Alert.alert('Error', 'Could not save cipher.');
    } finally {
      setKinddSuspiccousSaving(false);
    }
  };

  return (
    <KinddSuspiccousIdeaslayyt>
      <View style={styles.kinddSuspiccousRoot}>
        <View style={styles.kinddSuspiccousHeaderRow}>
          <Text style={styles.kinddSuspiccousHeaderTitle}>Cipher Lab</Text>
          <Pressable
            onPress={() =>
              kinddSuspiccousNavigation.navigate(
                'KinddSuspiccousIdeascipherssaved',
              )
            }
            style={styles.kinddSuspiccousHeaderIconBtn}>
            <Image source={require('../../assts/immgs/savedic.png')} />
          </Pressable>
        </View>

        <View style={styles.kinddSuspiccousModeToggle}>
          {(['encode', 'decode'] as KinddSuspiccousIdeasCipherMode[]).map(
            kinddSuspiccousOption => {
              const kinddSuspiccousIsActive =
                kinddSuspiccousMode === kinddSuspiccousOption;

              return (
                <Pressable
                  key={kinddSuspiccousOption}
                  onPress={() => setKinddSuspiccousMode(kinddSuspiccousOption)}
                  style={[
                    styles.kinddSuspiccousModeBtn,
                    kinddSuspiccousIsActive &&
                      styles.kinddSuspiccousModeBtnActive,
                  ]}>
                  <Text
                    style={[
                      styles.kinddSuspiccousModeBtnText,
                      kinddSuspiccousIsActive &&
                        styles.kinddSuspiccousModeBtnTextActive,
                    ]}>
                    {kinddSuspiccousOption === 'encode' ? 'Encode' : 'Decode'}
                  </Text>
                </Pressable>
              );
            },
          )}
        </View>

        <Text style={styles.kinddSuspiccousSectionLabel}>Cipher Type</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.kinddSuspiccousChipScroll}
          contentContainerStyle={styles.kinddSuspiccousChipRow}>
          {kinddSuspiccousIdeasCipherTypes.map(kinddSuspiccousType => {
            const kinddSuspiccousIsSelected =
              kinddSuspiccousCipherType === kinddSuspiccousType;

            return (
              <Pressable
                key={kinddSuspiccousType}
                onPress={() =>
                  setKinddSuspiccousCipherType(kinddSuspiccousType)
                }
                style={[
                  styles.kinddSuspiccousChip,
                  kinddSuspiccousIsSelected && styles.kinddSuspiccousChipActive,
                ]}>
                <Text
                  style={[
                    styles.kinddSuspiccousChipText,
                    kinddSuspiccousIsSelected &&
                      styles.kinddSuspiccousChipTextActive,
                  ]}>
                  {kinddSuspiccousIdeasCipherTypeLabels[kinddSuspiccousType]}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.kinddSuspiccousFieldLabel}>
          {kinddSuspiccousInputLabel}
        </Text>
        <View style={styles.kinddSuspiccousInputBox}>
          <TextInput
            value={kinddSuspiccousInput}
            onChangeText={setKinddSuspiccousInput}
            placeholder={kinddSuspiccousInputPlaceholder}
            placeholderTextColor="#7D88AD"
            multiline
            style={styles.kinddSuspiccousInput}
          />
        </View>

        <Text style={styles.kinddSuspiccousFieldLabel}>
          {kinddSuspiccousOutputLabel}
        </Text>
        <View style={styles.kinddSuspiccousOutputBox}>
          <Text
            style={[
              styles.kinddSuspiccousOutputText,
              !kinddSuspiccousHasOutput &&
                styles.kinddSuspiccousOutputPlaceholder,
            ]}>
            {kinddSuspiccousHasOutput
              ? kinddSuspiccousOutput
              : kinddSuspiccousOutputPlaceholder}
          </Text>
        </View>

        <View style={styles.kinddSuspiccousActionRow}>
          <Pressable
            onPress={kinddSuspiccousOnCopy}
            disabled={!kinddSuspiccousHasOutput}
            style={[
              styles.kinddSuspiccousCopyBtn,
              !kinddSuspiccousHasOutput && styles.kinddSuspiccousBtnDisabled,
            ]}>
            <Text style={styles.kinddSuspiccousCopyIcon}>⧉</Text>
            <Text style={styles.kinddSuspiccousCopyText}>Copy</Text>
          </Pressable>

          <Pressable
            onPress={kinddSuspiccousOnSave}
            disabled={!kinddSuspiccousHasOutput || kinddSuspiccousSaving}
            style={[
              styles.kinddSuspiccousSaveBtn,
              kinddSuspiccousHasOutput && styles.kinddSuspiccousSaveBtnActive,
              (!kinddSuspiccousHasOutput || kinddSuspiccousSaving) &&
                styles.kinddSuspiccousBtnDisabled,
            ]}>
            <Text
              style={[
                styles.kinddSuspiccousSaveIcon,
                kinddSuspiccousHasOutput &&
                  styles.kinddSuspiccousSaveIconActive,
              ]}>
              🔖
            </Text>
            <Text
              style={[
                styles.kinddSuspiccousSaveText,
                kinddSuspiccousHasOutput &&
                  styles.kinddSuspiccousSaveTextActive,
              ]}>
              Save
            </Text>
          </Pressable>
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
    paddingBottom: 100,
  },
  kinddSuspiccousHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 24,
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
    fontSize: 16,
  },
  kinddSuspiccousModeToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(15,23,48,0.7)',
    borderWidth: 1,
    borderColor: '#1A2347',
    borderRadius: 14,
    padding: 6,
    marginBottom: 24,
  },
  kinddSuspiccousModeBtn: {
    flex: 1,
    height: 41,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousModeBtnActive: {
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
  },
  kinddSuspiccousModeBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#4A5478',
  },
  kinddSuspiccousModeBtnTextActive: {
    color: '#FFFFFF',
  },
  kinddSuspiccousSectionLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  kinddSuspiccousChipScroll: {
    flexGrow: 0,
    marginBottom: 24,
  },
  kinddSuspiccousChipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 4,
  },
  kinddSuspiccousChip: {
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
  kinddSuspiccousChipActive: {
    borderColor: 'rgba(46,179,255,0.4)',
  },
  kinddSuspiccousChipText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 12,
    color: '#7D88AD',
    textAlign: 'center',
    includeFontPadding: false,
  },
  kinddSuspiccousChipTextActive: {
    color: '#2EB3FF',
  },
  kinddSuspiccousFieldLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#7D88AD',
    marginBottom: 8,
  },
  kinddSuspiccousInputBox: {
    minHeight: 94,
    backgroundColor: '#111D3C',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
  },
  kinddSuspiccousInput: {
    flex: 1,
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    lineHeight: 21,
    color: '#E8EEFF',
    textAlignVertical: 'top',
    minHeight: 74,
    padding: 0,
  },
  kinddSuspiccousOutputBox: {
    minHeight: 94,
    backgroundColor: 'rgba(46,179,255,0.2)',
    borderWidth: 1,
    borderColor: '#2EB3FF',
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginBottom: 24,
  },
  kinddSuspiccousOutputText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
    lineHeight: 21,
    color: '#2EB3FF',
  },
  kinddSuspiccousOutputPlaceholder: {
    color: '#7D88AD',
  },
  kinddSuspiccousActionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  kinddSuspiccousCopyBtn: {
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
  kinddSuspiccousCopyIcon: {
    fontSize: 15,
    color: '#94A3B8',
  },
  kinddSuspiccousCopyText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#94A3B8',
  },
  kinddSuspiccousSaveBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1A2035',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  kinddSuspiccousSaveBtnActive: {
    backgroundColor: '#2EB3FF',
  },
  kinddSuspiccousSaveIcon: {
    fontSize: 14,
    opacity: 0.5,
  },
  kinddSuspiccousSaveIconActive: {
    opacity: 1,
  },
  kinddSuspiccousSaveText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: '#475569',
  },
  kinddSuspiccousSaveTextActive: {
    color: '#0F1730',
  },
  kinddSuspiccousBtnDisabled: {
    opacity: 0.55,
  },
});

export default KinddSuspiccousIdeascipher;
