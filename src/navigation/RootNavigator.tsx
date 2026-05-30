import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CasesProvider} from '../context/CasesContext';
import {PartyProvider} from '../context/PartyContext';
import {CaseClosedScreen} from '../screens/CaseClosedScreen';
import {CaseFileScreen} from '../screens/CaseFileScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {PartyResultsScreen} from '../screens/PartyResultsScreen';
import {PartySetupScreen} from '../screens/PartySetupScreen';
import {PartySituationScreen} from '../screens/PartySituationScreen';
import {PartySpinScreen} from '../screens/PartySpinScreen';
import {PartyVoteScreen} from '../screens/PartyVoteScreen';
import {SavedCiphersScreen} from '../screens/SavedCiphersScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {StoryDetailScreen} from '../screens/StoryDetailScreen';
import {colors} from '../theme/theme';
import {MainTabs} from './MainTabs';
import {navigationRef} from './rootNavigation';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    text: colors.text,
    border: 'transparent',
    notification: colors.accent,
  },
};

export function RootNavigator() {
  return (
    <CasesProvider>
      <PartyProvider>
        <NavigationContainer ref={navigationRef} theme={theme}>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              contentStyle: {backgroundColor: 'transparent'},
            }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="CaseFile" component={CaseFileScreen} />
            <Stack.Screen name="CaseFileScreen" component={CaseFileScreen} />
            <Stack.Screen name="CaseClosed" component={CaseClosedScreen} />
            <Stack.Screen name="CaseClosedScreen" component={CaseClosedScreen} />
            <Stack.Screen name="StoryDetail" component={StoryDetailScreen} />
            <Stack.Screen name="StoryDetailScreen" component={StoryDetailScreen} />
            <Stack.Screen name="PartySetup" component={PartySetupScreen} />
            <Stack.Screen name="PartySetupScreen" component={PartySetupScreen} />
            <Stack.Screen name="PartySpin" component={PartySpinScreen} />
            <Stack.Screen name="PartySpinScreen" component={PartySpinScreen} />
            <Stack.Screen
              name="PartySituation"
              component={PartySituationScreen}
            />
            <Stack.Screen
              name="PartySituationScreen"
              component={PartySituationScreen}
            />
            <Stack.Screen name="PartyVote" component={PartyVoteScreen} />
            <Stack.Screen name="PartyVoteScreen" component={PartyVoteScreen} />
            <Stack.Screen name="PartyResults" component={PartyResultsScreen} />
            <Stack.Screen
              name="PartyResultsScreen"
              component={PartyResultsScreen}
            />
            <Stack.Screen name="SavedCiphers" component={SavedCiphersScreen} />
            <Stack.Screen
              name="CipherScreenssaved"
              component={SavedCiphersScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PartyProvider>
    </CasesProvider>
  );
}
