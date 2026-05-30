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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '../assets';
import {CasesScreen} from '../screens/CasesScreen';
import {CipherScreen} from '../screens/CipherScreen';
import {PartyScreen} from '../screens/PartyScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {StoriesScreen} from '../screens/StoriesScreen';
import {colors} from '../theme/theme';
import {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const makeTabIcon =
  (source: number, label: string) =>
  ({focused}: {focused: boolean}) =>
    (
      <View style={styles.tabItem}>
        <View style={styles.iconWrap}>
          <Image
            source={source}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <Text
          style={[
            styles.tabLabel,
            {color: focused ? colors.accent : colors.tabIdle},
          ]}>
          {label}
        </Text>
      </View>
    );

function AnimatedTabButton(props: Record<string, unknown>) {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={() => {
        Animated.spring(scale, {
          toValue: 0.88,
          useNativeDriver: true,
          speed: 50,
          bounciness: 4,
        }).start();
      }}
      onPressOut={() => {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 8,
        }).start();
      }}
      style={[style as ViewStyle, styles.tabButton]}
      {...rest}>
      <Animated.View style={[styles.tabButtonInner, {transform: [{scale}]}]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
}

function TabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['#050714F2', '#050714F2']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.tabBarTopBorder} />
    </View>
  );
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: TabBarBackground,
        tabBarButton: props => <AnimatedTabButton {...props} />,
      }}>
      <Tab.Screen
        name="Cases"
        component={CasesScreen}
        options={{tabBarIcon: makeTabIcon(images.tabCases, 'Cases')}}
      />
      <Tab.Screen
        name="Stories"
        component={StoriesScreen}
        options={{tabBarIcon: makeTabIcon(images.tabStories, 'Stories')}}
      />
      <Tab.Screen
        name="Party"
        component={PartyScreen}
        options={{tabBarIcon: makeTabIcon(images.tabParty, 'Party')}}
      />
      <Tab.Screen
        name="Cipher"
        component={CipherScreen}
        options={{tabBarIcon: makeTabIcon(images.tabCiphers, 'Cipher')}}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{tabBarIcon: makeTabIcon(images.tabSettings, 'Settings')}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 60,
  },
  iconWrap: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
  tabLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  tabBar: {
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
  tabBarTopBorder: {
    height: 1,
    backgroundColor: colors.border,
  },
  tabButton: {flex: 1},
  tabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
