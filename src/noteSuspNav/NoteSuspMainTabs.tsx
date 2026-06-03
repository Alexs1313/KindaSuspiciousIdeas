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
import {noteSuspImages} from '../noteSuspAssts';
import {NoteSuspCasesScreen} from '../noteSuspScrn/NoteSuspCasesScreen';
import {NoteSuspCipherScreen} from '../noteSuspScrn/NoteSuspCipherScreen';
import {NoteSuspPartyScreen} from '../noteSuspScrn/NoteSuspPartyScreen';
import {NoteSuspSettingsScreen} from '../noteSuspScrn/NoteSuspSettingsScreen';
import {NoteSuspStoriesScreen} from '../noteSuspScrn/NoteSuspStoriesScreen';
import {noteSuspColors} from '../noteSuspThm/NoteSuspTheme';
import {NoteSuspMainTabParamList} from './NoteSuspTypes';

const noteSuspTab = createBottomTabNavigator<NoteSuspMainTabParamList>();

const noteSuspMakeTabIcon =
  (source: number, label: string) =>
  ({focused}: {focused: boolean}) =>
    (
      <View style={styles.noteSuspTabItem}>
        <View style={styles.noteSuspIconWrap}>
          <Image
            source={source}
            style={styles.noteSuspIcon}
            resizeMode="contain"
          />
        </View>
        <Text
          style={[
            styles.noteSuspTabLabel,
            {color: focused ? noteSuspColors.accent : noteSuspColors.tabIdle},
          ]}>
          {label}
        </Text>
      </View>
    );

function NoteSuspAnimatedTabButton(props: Record<string, unknown>) {
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
      style={[style as ViewStyle, styles.noteSuspTabButton]}
      {...rest}>
      <Animated.View style={[styles.noteSuspTabButtonInner, {transform: [{scale}]}]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
}

function NoteSuspTabBarBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['#050714F2', '#050714F2']}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.noteSuspTabBarTopBorder} />
    </View>
  );
}

export function NoteSuspMainTabs() {
  return (
    <noteSuspTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.noteSuspTabBar,
        tabBarBackground: NoteSuspTabBarBackground,
        tabBarButton: props => <NoteSuspAnimatedTabButton {...props} />,
      }}>
      <noteSuspTab.Screen
        name="Cases"
        component={NoteSuspCasesScreen}
        options={{tabBarIcon: noteSuspMakeTabIcon(noteSuspImages.tabCases, 'Cases')}}
      />
      <noteSuspTab.Screen
        name="Stories"
        component={NoteSuspStoriesScreen}
        options={{tabBarIcon: noteSuspMakeTabIcon(noteSuspImages.tabStories, 'Stories')}}
      />
      <noteSuspTab.Screen
        name="Party"
        component={NoteSuspPartyScreen}
        options={{tabBarIcon: noteSuspMakeTabIcon(noteSuspImages.tabParty, 'Party')}}
      />
      <noteSuspTab.Screen
        name="Cipher"
        component={NoteSuspCipherScreen}
        options={{tabBarIcon: noteSuspMakeTabIcon(noteSuspImages.tabCiphers, 'Cipher')}}
      />
      <noteSuspTab.Screen
        name="Settings"
        component={NoteSuspSettingsScreen}
        options={{tabBarIcon: noteSuspMakeTabIcon(noteSuspImages.tabSettings, 'Settings')}}
      />
    </noteSuspTab.Navigator>
  );
}

const styles = StyleSheet.create({
  noteSuspTabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 60,
  },
  noteSuspIconWrap: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteSuspIcon: {},
  noteSuspTabLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  noteSuspTabBar: {
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
  noteSuspTabBarTopBorder: {
    height: 1,
    backgroundColor: noteSuspColors.border,
  },
  noteSuspTabButton: {flex: 1},
  noteSuspTabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
