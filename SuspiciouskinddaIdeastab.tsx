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

import SuspiciouskinddaIdeascasefls from './SuspiciouskinddaIdeas/SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeascasefls';
import SuspiciouskinddaIdestors from './SuspiciouskinddaIdeas/SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdestors';
import SuspiciouskinddaIdeasparrt from './SuspiciouskinddaIdeas/SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeasparrt';
import SuspiciouskinddaIdeascipher from './SuspiciouskinddaIdeas/SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeascipher';
import SuspiciouskinddaIdeassttgs from './SuspiciouskinddaIdeas/SuspiciouskinddaIdeasscrn/SuspiciouskinddaIdeassttgs';

const Tab = createBottomTabNavigator();

const suspiciouskinddaIdeasActiveColor = '#2EB3FF';
const suspiciouskinddaIdeasIdleColor = '#4A5478';

const suspiciouskinddaIdeasMakeTabIcon =
  (suspiciouskinddaIdeasSource: number, suspiciouskinddaIdeasLabel: string) =>
  ({focused}: {focused: boolean}) =>
    (
      <View style={styles.suspiciouskinddaIdeasTabItem}>
        <View style={styles.suspiciouskinddaIdeasIconWrap}>
          <Image
            source={suspiciouskinddaIdeasSource}
            style={[
              styles.suspiciouskinddaIdeasIcon,
              {
                tintColor: focused
                  ? suspiciouskinddaIdeasActiveColor
                  : suspiciouskinddaIdeasIdleColor,
              },
            ]}
          />
        </View>
        <Text
          style={[
            styles.suspiciouskinddaIdeasTabLabel,
            {
              color: focused
                ? suspiciouskinddaIdeasActiveColor
                : suspiciouskinddaIdeasIdleColor,
            },
          ]}>
          {suspiciouskinddaIdeasLabel}
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
      style={[style as ViewStyle, styles.suspiciouskinddaIdeasTabButton]}
      {...rest}>
      <Animated.View
        style={[
          styles.suspiciouskinddaIdeasTabButtonInner,
          {transform: [{scale}]},
        ]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const suspiciouskinddaIdeasTabBarButton = (props: Record<string, unknown>) => (
  <AnimatedTabButton {...props} />
);

const SuspiciouskinddaIdeasTabBarBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['#050714F2', '#050714F2']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.suspiciouskinddaIdeasTabBarTopBorder} />
    </View>
  );
};

const SuspiciouskinddaIdeastab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.suspiciouskinddaIdeasTabBar,
        tabBarBackground: SuspiciouskinddaIdeasTabBarBackground,
        tabBarButton: suspiciouskinddaIdeasTabBarButton,
      }}>
      <Tab.Screen
        name="SuspiciouskinddaIdeascasefls"
        component={SuspiciouskinddaIdeascasefls}
        options={{
          tabBarIcon: suspiciouskinddaIdeasMakeTabIcon(
            require('./assts/immgs/kinddsuspiccoonbrdicncasecards.png'),
            'Cases',
          ),
        }}
      />
      <Tab.Screen
        name="SuspiciouskinddaIdestors"
        component={SuspiciouskinddaIdestors}
        options={{
          tabBarIcon: suspiciouskinddaIdeasMakeTabIcon(
            require('./assts/immgs/kinddsuspiccoonbrdicnstories.png'),
            'Stories',
          ),
        }}
      />
      <Tab.Screen
        name="SuspiciouskinddaIdeasparrt"
        component={SuspiciouskinddaIdeasparrt}
        options={{
          tabBarIcon: suspiciouskinddaIdeasMakeTabIcon(
            require('./assts/immgs/kinddsuspiccoonbrdicnparty.png'),
            'Party',
          ),
        }}
      />
      <Tab.Screen
        name="SuspiciouskinddaIdeascipher"
        component={SuspiciouskinddaIdeascipher}
        options={{
          tabBarIcon: suspiciouskinddaIdeasMakeTabIcon(
            require('./assts/immgs/kinddsuspiccoonbrdicnciphers.png'),
            'Cipher',
          ),
        }}
      />
      <Tab.Screen
        name="SuspiciouskinddaIdeassttgs"
        component={SuspiciouskinddaIdeassttgs}
        options={{
          tabBarIcon: suspiciouskinddaIdeasMakeTabIcon(
            require('./assts/immgs/kinddsuspiccoonbrdicnsettings.png'),
            'Settings',
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  suspiciouskinddaIdeasTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 60,
  },
  suspiciouskinddaIdeasIconWrap: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  suspiciouskinddaIdeasIcon: {},
  suspiciouskinddaIdeasTabLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  suspiciouskinddaIdeasTabBar: {
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
  suspiciouskinddaIdeasTabBarTopBorder: {
    height: 1,
    backgroundColor: '#1A2347',
  },
  suspiciouskinddaIdeasTabButton: {
    flex: 1,
  },
  suspiciouskinddaIdeasTabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SuspiciouskinddaIdeastab;
