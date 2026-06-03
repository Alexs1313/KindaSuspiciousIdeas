import React from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, View} from 'react-native';

type NoteSuspPartyPauseModalProps = {
  visible: boolean;
  onResume: () => void;
  onEndParty: () => void;
};

export function NoteSuspPartyPauseModal({
  visible,
  onResume,
  onEndParty,
}: NoteSuspPartyPauseModalProps) {
  return (
    <Modal
      visible={visible}
      statusBarTranslucent={Platform.OS === 'android'}
      transparent
      animationType="fade"
      onRequestClose={onResume}>
      <View style={styles.noteSuspOverlay}>
        <View style={styles.noteSuspCard}>
          <Text style={styles.noteSuspTitle}>Pause</Text>
          <Text style={styles.noteSuspBody}>
            Round on hold. Phone face down so no one peeks.
          </Text>
          <View style={styles.noteSuspActions}>
            <Pressable
              onPress={onEndParty}
              style={[styles.noteSuspBtn, styles.noteSuspBtnEnd]}>
              <Text style={styles.noteSuspBtnText}>End Round</Text>
            </Pressable>
            <Pressable
              onPress={onResume}
              style={[
                styles.noteSuspBtn,
                styles.noteSuspBtnResume,
              ]}>
              <Text style={styles.noteSuspBtnText}>Resume</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  noteSuspOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5,7,20,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  noteSuspCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    padding: 24,
    gap: 16,
  },
  noteSuspTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  noteSuspBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#7D88AD',
    textAlign: 'center',
  },
  noteSuspActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  noteSuspBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspBtnEnd: {
    backgroundColor: '#FF5A6E',
  },
  noteSuspBtnResume: {
    backgroundColor: '#4ADE80',
  },
  noteSuspBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});

