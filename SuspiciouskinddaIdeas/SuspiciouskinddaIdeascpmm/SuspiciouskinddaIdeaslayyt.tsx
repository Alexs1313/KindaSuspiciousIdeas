import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import type {ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';

type SuspiciouskinddaIdeaslayytProps = {
  children: ReactNode;
};

const SuspiciouskinddaIdeaslayyt = ({children}: SuspiciouskinddaIdeaslayytProps) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assts/immgs/kinddsuspiccoonbrdbg.png')}>
      <LinearGradient
        colors={['rgba(20,29,58,0.2)', 'rgba(10,15,34,0.2)']}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={[
          'rgba(5,7,20,0.4)',
          'rgba(5,7,20,0.6)',
          'rgba(5,7,20,0.95)',
        ]}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentInner}>{children}</View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  contentInner: {
    flexGrow: 1,
  },
});

export default SuspiciouskinddaIdeaslayyt;
