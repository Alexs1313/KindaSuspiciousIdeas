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
import {images} from '../assets';
import {RootStackParamList} from '../navigation/types';

export function SplashScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
    <View style={styles.root}>
      <Image
        source={images.background}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.logoWrap}>
          <Image
            source={Platform.OS === 'ios' ? images.loaderIcon : images.androidIcon}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.loaderWrap}>
          <View style={styles.loaderTrack}>
            <Animated.View style={[styles.loaderBar, {width: barWidth}]} />
          </View>
        </View>
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    borderRadius: 50,
  },
  loaderWrap: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  loaderTrack: {
    width: 130,
    height: 4,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
  },
  loaderBar: {
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#2EB3FF',
  },
});
