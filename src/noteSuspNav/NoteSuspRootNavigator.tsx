import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NoteSuspCasesProvider} from '../noteSuspCtx/NoteSuspCasesContext';
import {NoteSuspPartyProvider} from '../noteSuspCtx/NoteSuspPartyContext';
import {NoteSuspCaseClosedScreen} from '../noteSuspScrn/NoteSuspCaseClosedScreen';
import {NoteSuspCaseFileScreen} from '../noteSuspScrn/NoteSuspCaseFileScreen';
import {NoteSuspOnboardingScreen} from '../noteSuspScrn/NoteSuspOnboardingScreen';
import {NoteSuspPartyResultsScreen} from '../noteSuspScrn/NoteSuspPartyResultsScreen';
import {NoteSuspPartySetupScreen} from '../noteSuspScrn/NoteSuspPartySetupScreen';
import {NoteSuspPartySituationScreen} from '../noteSuspScrn/NoteSuspPartySituationScreen';
import {NoteSuspPartyCategoryPickerScreen} from '../noteSuspScrn/NoteSuspPartyCategoryPickerScreen';
import {NoteSuspPartyVoteScreen} from '../noteSuspScrn/NoteSuspPartyVoteScreen';
import {NoteSuspSavedCiphersScreen} from '../noteSuspScrn/NoteSuspSavedCiphersScreen';
import {NoteSuspSplashScreen} from '../noteSuspScrn/NoteSuspSplashScreen';
import {NoteSuspStoryDetailScreen} from '../noteSuspScrn/NoteSuspStoryDetailScreen';
import {noteSuspColors} from '../noteSuspThm/NoteSuspTheme';
import {NoteSuspMainTabs} from './NoteSuspMainTabs';
import {noteSuspNavigationRef} from './NoteSuspRootNavigation';
import {NoteSuspRootStackParamList} from './NoteSuspTypes';

const noteSuspStack = createNativeStackNavigator<NoteSuspRootStackParamList>();

const noteSuspNavTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: noteSuspColors.background,
    card: noteSuspColors.background,
    text: noteSuspColors.text,
    border: 'transparent',
    notification: noteSuspColors.accent,
  },
};

export function NoteSuspRootNavigator() {
  return (
    <NoteSuspCasesProvider>
      <NoteSuspPartyProvider>
        <NavigationContainer ref={noteSuspNavigationRef} theme={noteSuspNavTheme}>
          <noteSuspStack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              contentStyle: {backgroundColor: 'transparent'},
            }}>
            <noteSuspStack.Screen name="Splash" component={NoteSuspSplashScreen} />
            <noteSuspStack.Screen name="Onboarding" component={NoteSuspOnboardingScreen} />
            <noteSuspStack.Screen name="Main" component={NoteSuspMainTabs} />
            <noteSuspStack.Screen name="CaseFile" component={NoteSuspCaseFileScreen} />
            <noteSuspStack.Screen name="CaseFileScreen" component={NoteSuspCaseFileScreen} />
            <noteSuspStack.Screen name="CaseClosed" component={NoteSuspCaseClosedScreen} />
            <noteSuspStack.Screen name="CaseClosedScreen" component={NoteSuspCaseClosedScreen} />
            <noteSuspStack.Screen name="StoryDetail" component={NoteSuspStoryDetailScreen} />
            <noteSuspStack.Screen name="StoryDetailScreen" component={NoteSuspStoryDetailScreen} />
            <noteSuspStack.Screen name="PartySetup" component={NoteSuspPartySetupScreen} />
            <noteSuspStack.Screen name="PartySetupScreen" component={NoteSuspPartySetupScreen} />
            <noteSuspStack.Screen
              name="PartyCategoryPicker"
              component={NoteSuspPartyCategoryPickerScreen}
            />
            <noteSuspStack.Screen
              name="PartyCategoryPickerScreen"
              component={NoteSuspPartyCategoryPickerScreen}
            />
            <noteSuspStack.Screen
              name="PartySituation"
              component={NoteSuspPartySituationScreen}
            />
            <noteSuspStack.Screen
              name="PartySituationScreen"
              component={NoteSuspPartySituationScreen}
            />
            <noteSuspStack.Screen name="PartyVote" component={NoteSuspPartyVoteScreen} />
            <noteSuspStack.Screen name="PartyVoteScreen" component={NoteSuspPartyVoteScreen} />
            <noteSuspStack.Screen name="PartyResults" component={NoteSuspPartyResultsScreen} />
            <noteSuspStack.Screen
              name="PartyResultsScreen"
              component={NoteSuspPartyResultsScreen}
            />
            <noteSuspStack.Screen name="SavedCiphers" component={NoteSuspSavedCiphersScreen} />
            <noteSuspStack.Screen
              name="CipherScreenssaved"
              component={NoteSuspSavedCiphersScreen}
            />
          </noteSuspStack.Navigator>
        </NavigationContainer>
      </NoteSuspPartyProvider>
    </NoteSuspCasesProvider>
  );
}
