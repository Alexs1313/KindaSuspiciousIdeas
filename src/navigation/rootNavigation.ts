import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

import type {RootStackParamList} from './types';

export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

const legacyRouteNames: Record<string, keyof RootStackParamList> = {
  CaseFileScreen: 'CaseFile',
  CaseClosedScreen: 'CaseClosed',
  StoryDetailScreen: 'StoryDetail',
  PartySetupScreen: 'PartySetup',
  PartySpinScreen: 'PartyCategoryPicker',
  PartySpin: 'PartyCategoryPicker',
  PartyCategoryPickerScreen: 'PartyCategoryPicker',
  PartySituationScreen: 'PartySituation',
  PartyVoteScreen: 'PartyVote',
  PartyResultsScreen: 'PartyResults',
  CipherScreenssaved: 'SavedCiphers',
};

function resolveRouteName(
  screen: keyof RootStackParamList | string,
): keyof RootStackParamList {
  return (
    legacyRouteNames[screen] ??
    (screen as keyof RootStackParamList)
  );
}

export function navigateRootScreen<
  RouteName extends keyof RootStackParamList,
>(
  screen: RouteName | string,
  params?: RootStackParamList[RouteName],
) {
  if (!navigationRef.isReady()) {
    return;
  }

  const routeName = resolveRouteName(screen);
  navigationRef.navigate(
    routeName as never,
    params as never,
  );
}

export function replaceRootScreen<
  RouteName extends keyof RootStackParamList,
>(
  screen: RouteName | string,
  params?: RootStackParamList[RouteName],
) {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.dispatch(
    StackActions.replace(
      resolveRouteName(screen),
      params,
    ),
  );
}

export function resetToMain() {
  if (!navigationRef.isReady()) {
    return;
  }

  navigationRef.reset({
    index: 0,
    routes: [{name: 'Main'}],
  });
}
