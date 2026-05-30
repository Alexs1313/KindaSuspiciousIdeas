import type {ReactNode} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../assets';

type BackgroundScreenProps = {
  children: ReactNode;
  scroll?: boolean;
  background?: ImageSourcePropType;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function BackgroundScreen({
  children,
  scroll = true,
  background = images.background,
  contentContainerStyle,
}: BackgroundScreenProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.content,
        {
          paddingTop: 54,
          paddingBottom: Math.max(insets.bottom, 16),
        },
        !scroll && styles.flex,
        contentContainerStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <View style={styles.root}>
      <Image
        source={background}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050714',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
});
