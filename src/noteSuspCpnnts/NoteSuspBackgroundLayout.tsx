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
import {noteSuspImages} from '../noteSuspAssts';

type NoteSuspBackgroundLayoutProps = {
  children: ReactNode;
  scroll?: boolean;
  background?: ImageSourcePropType;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function NoteSuspBackgroundLayout({
  children,
  scroll = true,
  background = noteSuspImages.background,
  contentContainerStyle,
}: NoteSuspBackgroundLayoutProps) {
  const insets = useSafeAreaInsets();

  const content = (
    <View
      style={[
        styles.noteSuspContent,
        {
          paddingTop: 54,
          paddingBottom: Math.max(insets.bottom, 16),
        },
        !scroll && styles.noteSuspFlex,
        contentContainerStyle,
      ]}>
      {children}
    </View>
  );

  return (
    <View style={styles.noteSuspRoot}>
      <Image
        source={background}
        style={styles.noteSuspBackgroundImage}
        resizeMode="cover"
      />
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          style={styles.noteSuspFlex}
          contentContainerStyle={styles.noteSuspScrollContent}
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
  noteSuspRoot: {
    flex: 1,
    backgroundColor: '#050714',
  },
  noteSuspBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  noteSuspScrollContent: {
    flexGrow: 1,
  },
  noteSuspContent: {
    flexGrow: 1,
  },
  noteSuspFlex: {
    flex: 1,
  },
});
