import React from 'react';
import {Modal, Platform, Pressable, StyleSheet, Text, View} from 'react-native';

type SuspiciouskinddaIdeaspartyPauseProps = {
  suspiciouskinddaVisible: boolean;
  suspiciouskinddaOnResume: () => void;
  suspiciouskinddaOnEndGame: () => void;
};

const SuspiciouskinddaIdeaspartyPause = ({
  suspiciouskinddaVisible,
  suspiciouskinddaOnResume,
  suspiciouskinddaOnEndGame,
}: SuspiciouskinddaIdeaspartyPauseProps) => {
  return (
    <Modal
      visible={suspiciouskinddaVisible}
      statusBarTranslucent={Platform.OS === 'android'}
      transparent
      animationType="fade"
      onRequestClose={suspiciouskinddaOnResume}>
      <View style={styles.suspiciouskinddaOverlay}>
        <View style={styles.suspiciouskinddaCard}>
          <Text style={styles.suspiciouskinddaTitle}>Pause</Text>
          <Text style={styles.suspiciouskinddaBody}>
            Round on hold. Phone face down so no one peeks.
          </Text>
          <View style={styles.suspiciouskinddaActions}>
            <Pressable
              onPress={suspiciouskinddaOnEndGame}
              style={[styles.suspiciouskinddaBtn, styles.suspiciouskinddaBtnEnd]}>
              <Text style={styles.suspiciouskinddaBtnText}>End Round</Text>
            </Pressable>
            <Pressable
              onPress={suspiciouskinddaOnResume}
              style={[
                styles.suspiciouskinddaBtn,
                styles.suspiciouskinddaBtnResume,
              ]}>
              <Text style={styles.suspiciouskinddaBtnText}>Resume</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5,7,20,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  suspiciouskinddaCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    padding: 24,
    gap: 16,
  },
  suspiciouskinddaTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  suspiciouskinddaBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#7D88AD',
    textAlign: 'center',
  },
  suspiciouskinddaActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  suspiciouskinddaBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaBtnEnd: {
    backgroundColor: '#FF5A6E',
  },
  suspiciouskinddaBtnResume: {
    backgroundColor: '#4ADE80',
  },
  suspiciouskinddaBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default SuspiciouskinddaIdeaspartyPause;
