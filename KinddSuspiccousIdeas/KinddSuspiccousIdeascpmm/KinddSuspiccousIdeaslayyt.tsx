import {ImageBackground, ScrollView, StyleSheet, View} from 'react-native';
import type {ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';

type KinddSuspiccousIdeaslayytProps = {
  children: ReactNode;
};

const KinddSuspiccousIdeaslayyt = ({
  children,
}: KinddSuspiccousIdeaslayytProps) => {
  return (
    <LinearGradient
      colors={['rgb(11, 1, 67)', 'rgb(0, 1, 15)']}
      style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentInner}>{children}</View>
      </ScrollView>
    </LinearGradient>
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

export default KinddSuspiccousIdeaslayyt;
