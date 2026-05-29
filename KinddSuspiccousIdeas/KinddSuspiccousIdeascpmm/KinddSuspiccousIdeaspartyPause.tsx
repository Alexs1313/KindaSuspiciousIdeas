import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';

type KinddSuspiccousIdeaspartyPauseProps = {
  kinddSuspiccousVisible: boolean;
  kinddSuspiccousOnResume: () => void;
  kinddSuspiccousOnEndGame: () => void;
};

const KinddSuspiccousIdeaspartyPause = ({
  kinddSuspiccousVisible,
  kinddSuspiccousOnResume,
  kinddSuspiccousOnEndGame,
}: KinddSuspiccousIdeaspartyPauseProps) => {
  return (
    <Modal
      visible={kinddSuspiccousVisible}
      transparent
      animationType="fade"
      onRequestClose={kinddSuspiccousOnResume}>
      <View style={styles.kinddSuspiccousOverlay}>
        <View style={styles.kinddSuspiccousCard}>
          <Text style={styles.kinddSuspiccousTitle}>Pause</Text>
          <Text style={styles.kinddSuspiccousBody}>
            Game on hold. Phone face down so no one peeks.
          </Text>
          <View style={styles.kinddSuspiccousActions}>
            <Pressable
              onPress={kinddSuspiccousOnEndGame}
              style={[
                styles.kinddSuspiccousBtn,
                styles.kinddSuspiccousBtnEnd,
              ]}>
              <Text style={styles.kinddSuspiccousBtnText}>End Game</Text>
            </Pressable>
            <Pressable
              onPress={kinddSuspiccousOnResume}
              style={[
                styles.kinddSuspiccousBtn,
                styles.kinddSuspiccousBtnResume,
              ]}>
              <Text style={styles.kinddSuspiccousBtnText}>Resume</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5,7,20,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  kinddSuspiccousCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#141D3A',
    borderWidth: 1,
    borderColor: '#1A2347',
    padding: 24,
    gap: 16,
  },
  kinddSuspiccousTitle: {
    fontFamily: 'BowlbyOne-Regular',
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  kinddSuspiccousBody: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 19.6,
    color: '#7D88AD',
    textAlign: 'center',
  },
  kinddSuspiccousActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  kinddSuspiccousBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousBtnEnd: {
    backgroundColor: '#FF5A6E',
  },
  kinddSuspiccousBtnResume: {
    backgroundColor: '#4ADE80',
  },
  kinddSuspiccousBtnText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default KinddSuspiccousIdeaspartyPause;
