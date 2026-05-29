import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import KinddSuspiccousIdeascasefls from './KinddSuspiccousIdeas/KinddSuspiccousIdeasscrn/KinddSuspiccousIdeascasefls';
import KinddSuspiccousIdestors from './KinddSuspiccousIdeas/KinddSuspiccousIdeasscrn/KinddSuspiccousIdestors';
import KinddSuspiccousIdeasparrt from './KinddSuspiccousIdeas/KinddSuspiccousIdeasscrn/KinddSuspiccousIdeasparrt';
import KinddSuspiccousIdeascipher from './KinddSuspiccousIdeas/KinddSuspiccousIdeasscrn/KinddSuspiccousIdeascipher';
import KinddSuspiccousIdeassttgs from './KinddSuspiccousIdeas/KinddSuspiccousIdeasscrn/KinddSuspiccousIdeassttgs';

const Tab = createBottomTabNavigator();

const kinddSuspiccousIdeasActiveColor = '#2EB3FF';
const kinddSuspiccousIdeasIdleColor = '#4A5478';

const kinddSuspiccousIdeasMakeTabIcon =
  (kinddSuspiccousIdeasSource: number, kinddSuspiccousIdeasLabel: string) =>
  ({focused}: {focused: boolean}) =>
    (
      <View style={styles.kinddSuspiccousIdeasTabItem}>
        <View style={styles.kinddSuspiccousIdeasIconWrap}>
          <Image
            source={kinddSuspiccousIdeasSource}
            style={[
              styles.kinddSuspiccousIdeasIcon,
              {
                tintColor: focused
                  ? kinddSuspiccousIdeasActiveColor
                  : kinddSuspiccousIdeasIdleColor,
              },
            ]}
          />
        </View>
        <Text
          style={[
            styles.kinddSuspiccousIdeasTabLabel,
            {
              color: focused
                ? kinddSuspiccousIdeasActiveColor
                : kinddSuspiccousIdeasIdleColor,
            },
          ]}>
          {kinddSuspiccousIdeasLabel}
        </Text>
      </View>
    );

const AnimatedTabButton = (props: Record<string, unknown>) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style as ViewStyle, styles.kinddSuspiccousIdeasTabButton]}
      {...rest}>
      <Animated.View
        style={[
          styles.kinddSuspiccousIdeasTabButtonInner,
          {transform: [{scale}]},
        ]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const kinddSuspiccousIdeasTabBarButton = (props: Record<string, unknown>) => (
  <AnimatedTabButton {...props} />
);

const KinddSuspiccousIdeasTabBarBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['#050714F2', '#050714F2']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.kinddSuspiccousIdeasTabBarTopBorder} />
    </View>
  );
};

const KinddSuspiccousIdeastab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.kinddSuspiccousIdeasTabBar,
        tabBarBackground: KinddSuspiccousIdeasTabBarBackground,
        tabBarButton: kinddSuspiccousIdeasTabBarButton,
      }}>
      <Tab.Screen
        name="KinddSuspiccousIdeascasefls"
        component={KinddSuspiccousIdeascasefls}
        options={{
          tabBarIcon: kinddSuspiccousIdeasMakeTabIcon(
            require('./assts/immgs/kinddsuspiccoonbrdicncasecards.png'),
            'Cases',
          ),
        }}
      />
      <Tab.Screen
        name="KinddSuspiccousIdestors"
        component={KinddSuspiccousIdestors}
        options={{
          tabBarIcon: kinddSuspiccousIdeasMakeTabIcon(
            require('./assts/immgs/kinddsuspiccoonbrdicnstories.png'),
            'Stories',
          ),
        }}
      />
      <Tab.Screen
        name="KinddSuspiccousIdeasparrt"
        component={KinddSuspiccousIdeasparrt}
        options={{
          tabBarIcon: kinddSuspiccousIdeasMakeTabIcon(
            require('./assts/immgs/kinddsuspiccoonbrdicnparty.png'),
            'Game',
          ),
        }}
      />
      <Tab.Screen
        name="KinddSuspiccousIdeascipher"
        component={KinddSuspiccousIdeascipher}
        options={{
          tabBarIcon: kinddSuspiccousIdeasMakeTabIcon(
            require('./assts/immgs/kinddsuspiccoonbrdicnciphers.png'),
            'Cipher',
          ),
        }}
      />
      <Tab.Screen
        name="KinddSuspiccousIdeassttgs"
        component={KinddSuspiccousIdeassttgs}
        options={{
          tabBarIcon: kinddSuspiccousIdeasMakeTabIcon(
            require('./assts/immgs/kinddsuspiccoonbrdicnsettings.png'),
            'Settings',
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  kinddSuspiccousIdeasTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 60,
  },
  kinddSuspiccousIdeasIconWrap: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kinddSuspiccousIdeasIcon: {},
  kinddSuspiccousIdeasTabLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  kinddSuspiccousIdeasTabBar: {
    elevation: 0,
    backgroundColor: 'transparent',
    height: 78,
    paddingTop: 18,
    borderTopWidth: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  kinddSuspiccousIdeasTabBarTopBorder: {
    height: 1,
    backgroundColor: '#1A2347',
  },
  kinddSuspiccousIdeasTabButton: {
    flex: 1,
  },
  kinddSuspiccousIdeasTabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default KinddSuspiccousIdeastab;
