import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {noteSuspImages} from '../noteSuspAssts';
import {NoteSuspRootStackParamList} from '../noteSuspNav/NoteSuspTypes';

export function NoteSuspSplashScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<NoteSuspRootStackParamList>>();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 900,
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 900,
          useNativeDriver: false,
        }),
      ]),
    );

    animation.start();

    const timeout = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 5000);

    return () => {
      animation.stop();
      clearTimeout(timeout);
    };
  }, [navigation, progress]);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['20%', '100%'],
  });

  return (
    <View style={styles.noteSuspRoot}>
      <Image
        source={noteSuspImages.background}
        style={styles.noteSuspBackgroundImage}
        resizeMode="cover"
      />
      <View style={styles.noteSuspContent}>
        <View style={styles.noteSuspLogoWrap}>
          <Image
            source={Platform.OS === 'ios' ? noteSuspImages.loaderIcon : noteSuspImages.androidIcon}
            style={styles.noteSuspLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.noteSuspLoaderWrap}>
          <View style={styles.noteSuspLoaderTrack}>
            <Animated.View style={[styles.noteSuspLoaderBar, {width: barWidth}]} />
          </View>
        </View>
      </View>
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
  noteSuspContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteSuspLogoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspLogo: {
    width: 220,
    height: 220,
    borderRadius: 50,
  },
  noteSuspLoaderWrap: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  noteSuspLoaderTrack: {
    width: 130,
    height: 4,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  noteSuspLoaderBar: {
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#2EB3FF',
  },
});
