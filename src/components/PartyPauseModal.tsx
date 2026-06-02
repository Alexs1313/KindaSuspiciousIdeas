import React from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, View} from 'react-native';

type PartyPauseModalProps = {
  visible: boolean;
  onResume: () => void;
  onEndParty: () => void;
};

export function PartyPauseModal({
  visible,
  onResume,
  onEndParty,
}: PartyPauseModalProps) {
  return (
    <Modal
      visible={visible}
      statusBarTranslucent={Platform.OS === 'android'}
      transparent
      animationType="fade"
      onRequestClose={onResume}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Pause</Text>
          <Text style={styles.body}>
            Round on hold. Phone face down so no one peeks.
          </Text>
          <View style={styles.actions}>
            <Pressable
              onPress={onEndParty}
              style={[styles.btn, styles.btnEnd]}>
              <Text style={styles.btnText}>End Round</Text>
            </Pressable>
            <Pressable
              onPress={onResume}
              style={[
                styles.btn,
                styles.btnResume,
              ]}>
              <Text style={styles.btnText}>Resume</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5,7,20,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    padding: 24,
    gap: 16,
  },
  title: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  body: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#7D88AD',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  btn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEnd: {
    backgroundColor: '#FF5A6E',
  },
  btnResume: {
    backgroundColor: '#4ADE80',
  },
  btnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});

